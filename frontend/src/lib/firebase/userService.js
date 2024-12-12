// src/lib/firebase/userService.js
import { db } from './firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  arrayUnion,
  arrayRemove,
  orderBy,
  limit,
  serverTimestamp 
} from 'firebase/firestore';

export class UserService {
  // User Profile Management
  async getUserProfile(userId) {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
  }

  async updateUserProfile(userId, profileData) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    });
  }

  // Saved Deals
  async saveDeal(userId, dealId) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      savedDeals: arrayUnion(dealId),
      updatedAt: serverTimestamp()
    });
  }

  async unsaveDeal(userId, dealId) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      savedDeals: arrayRemove(dealId),
      updatedAt: serverTimestamp()
    });
  }

  async getSavedDeals(userId) {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const savedDealIds = userDoc.data()?.savedDeals || [];

    const dealsRef = collection(db, 'deals');
    const savedDeals = await Promise.all(
      savedDealIds.map(async (dealId) => {
        const dealDoc = await getDoc(doc(dealsRef, dealId));
        return dealDoc.exists() ? { id: dealDoc.id, ...dealDoc.data() } : null;
      })
    );

    return savedDeals.filter(Boolean);
  }

  // Browsing History
  async addToBrowsingHistory(userId, dealId) {
    const historyRef = collection(db, 'browsing_history');
    await setDoc(doc(historyRef), {
      userId,
      dealId,
      viewedAt: serverTimestamp()
    });
  }

  async getBrowsingHistory(userId, limit = 50) {
    const historyRef = collection(db, 'browsing_history');
    const historyQuery = query(
      historyRef,
      where('userId', '==', userId),
      orderBy('viewedAt', 'desc'),
      limit(limit)
    );

    const historySnap = await getDocs(historyQuery);
    const dealsRef = collection(db, 'deals');

    const history = await Promise.all(
      historySnap.docs.map(async (doc) => {
        const dealDoc = await getDoc(doc(dealsRef, doc.data().dealId));
        return dealDoc.exists() 
          ? {
              id: dealDoc.id,
              ...dealDoc.data(),
              viewedAt: doc.data().viewedAt
            }
          : null;
      })
    );

    return history.filter(Boolean);
  }

  // User Preferences
  async updatePreferences(userId, preferences) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      preferences,
      updatedAt: serverTimestamp()
    });
  }

  async getPreferences(userId) {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.data()?.preferences || {};
  }

  // User Reviews/Ratings
  async addReview(userId, dealId, review) {
    const reviewRef = collection(db, 'reviews');
    await setDoc(doc(reviewRef), {
      userId,
      dealId,
      rating: review.rating,
      comment: review.comment,
      createdAt: serverTimestamp()
    });

    // Update deal's average rating
    const dealRef = doc(db, 'deals', dealId);
    const dealDoc = await getDoc(dealRef);
    const currentRating = dealDoc.data()?.averageRating || 0;
    const totalReviews = dealDoc.data()?.totalReviews || 0;

    await updateDoc(dealRef, {
      averageRating: ((currentRating * totalReviews) + review.rating) / (totalReviews + 1),
      totalReviews: totalReviews + 1
    });
  }

  async getReviews(dealId) {
    const reviewsRef = collection(db, 'reviews');
    const reviewsQuery = query(
      reviewsRef,
      where('dealId', '==', dealId),
      orderBy('createdAt', 'desc')
    );

    const reviewsSnap = await getDocs(reviewsQuery);
    const usersRef = collection(db, 'users');

    return Promise.all(
      reviewsSnap.docs.map(async (doc) => {
        const userData = await getDoc(doc(usersRef, doc.data().userId));
        return {
          id: doc.id,
          ...doc.data(),
          user: {
            id: userData.id,
            name: userData.data()?.name || 'Anonymous',
            avatar: userData.data()?.avatar
          }
        };
      })
    );
  }
}

// Initialize the service
export const userService = new UserService();