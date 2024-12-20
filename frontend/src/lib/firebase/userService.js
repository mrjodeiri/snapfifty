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
import { db } from '../firebase';

class UserService {
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

    if (savedDealIds.length === 0) return [];

    const dealsRef = collection(db, 'deals');
    const chunks = [];
    for (let i = 0; i < savedDealIds.length; i += 10) {
      chunks.push(savedDealIds.slice(i, i + 10));
    }

    const allDeals = [];
    for (const chunk of chunks) {
      const q = query(dealsRef, where('__name__', 'in', chunk));
      const snapshot = await getDocs(q);
      allDeals.push(...snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    }

    return allDeals;
  }

  async getPreferences(userId) {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.data()?.preferences || {};
  }

  async updatePreferences(userId, preferences) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      preferences,
      updatedAt: serverTimestamp()
    });
  }

  async createInitialUserProfile(userId, userData) {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      savedDeals: [],
      preferences: {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
}

export const userService = new UserService();