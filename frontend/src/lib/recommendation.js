// src/lib/recommendation.js
import { db } from './firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit,
  documentId
} from 'firebase/firestore';

export class RecommendationEngine {
  async getUserPreferences(userId) {
    const viewsRef = collection(db, 'user_views');
    const purchasesRef = collection(db, 'user_purchases');
    
    const viewsQuery = query(
      viewsRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(50)
    );
    
    const purchasesQuery = query(
      purchasesRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(20)
    );
    
    const [viewsSnap, purchasesSnap] = await Promise.all([
      getDocs(viewsQuery),
      getDocs(purchasesQuery)
    ]);
    
    const viewedCategories = {};
    const purchasedCategories = {};
    
    viewsSnap.forEach(doc => {
      const category = doc.data().category;
      viewedCategories[category] = (viewedCategories[category] || 0) + 1;
    });
    
    purchasesSnap.forEach(doc => {
      const category = doc.data().category;
      purchasedCategories[category] = (purchasedCategories[category] || 0) + 1;
    });
    
    return {
      viewedCategories,
      purchasedCategories,
      totalViews: viewsSnap.size,
      totalPurchases: purchasesSnap.size
    };
  }

  async getSimilarDeals(dealId) {
    const dealRef = collection(db, 'deals');
    const dealSnap = await getDocs(query(dealRef, where(documentId(), '==', dealId)));
    
    if (dealSnap.empty) return [];
    
    const sourceDeal = dealSnap.docs[0].data();
    
    const similarQuery = query(
      dealRef,
      where('category', '==', sourceDeal.category),
      where(documentId(), '!=', dealId),
      orderBy(documentId()),
      limit(5)
    );
    
    const similarSnap = await getDocs(similarQuery);
    return similarSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async getTrendingDeals() {
    const trendsRef = collection(db, 'deal_trends');
    const trendsSnap = await getDocs(query(
      trendsRef,
      orderBy('viewCount', 'desc'),
      limit(10)
    ));
    
    const trendingDealIds = trendsSnap.docs.map(doc => doc.data().dealId);
    
    const dealsRef = collection(db, 'deals');
    const dealsSnap = await getDocs(query(
      dealsRef,
      where(documentId(), 'in', trendingDealIds)
    ));
    
    return dealsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  calculateDealScore(deal, userPreferences) {
    const categoryWeight = userPreferences.viewedCategories[deal.category] || 0;
    const purchaseWeight = userPreferences.purchasedCategories[deal.category] || 0;
    
    const discountPercentage = 
      ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100;
    
    return (
      (categoryWeight * 0.3) +
      (purchaseWeight * 0.4) +
      (discountPercentage * 0.3)
    );
  }

  async getPersonalizedRecommendations(userId) {
    const userPreferences = await this.getUserPreferences(userId);
    const dealsRef = collection(db, 'deals');
    const dealsSnap = await getDocs(query(dealsRef, limit(50)));
    
    const scoredDeals = dealsSnap.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        score: this.calculateDealScore(doc.data(), userPreferences)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    return scoredDeals;
  }
}

// src/lib/tracking.js
export const trackUserView = async (userId, dealId, category) => {
  try {
    await addDoc(collection(db, 'user_views'), {
      userId,
      dealId,
      category,
      timestamp: new Date()
    });
    
    // Update deal trends
    const trendRef = doc(db, 'deal_trends', dealId);
    await setDoc(trendRef, {
      viewCount: increment(1),
      lastViewed: new Date()
    }, { merge: true });
  } catch (error) {
    console.error('Error tracking view:', error);
  }
};

export const trackPurchase = async (userId, dealId, category, amount) => {
  try {
    await addDoc(collection(db, 'user_purchases'), {
      userId,
      dealId,
      category,
      amount,
      timestamp: new Date()
    });
    
    // Update deal trends
    const trendRef = doc(db, 'deal_trends', dealId);
    await setDoc(trendRef, {
      purchaseCount: increment(1),
      lastPurchased: new Date()
    }, { merge: true });
  } catch (error) {
    console.error('Error tracking purchase:', error);
  }
};