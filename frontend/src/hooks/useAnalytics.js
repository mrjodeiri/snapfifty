// src/hooks/useAnalytics.js
import { useEffect, useCallback } from 'react';
import { db } from '../config/firebase';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';

export const useAnalytics = () => {
 const trackDealClick = useCallback(async (dealId) => {
   const dealRef = doc(db, 'deals', dealId);
   await updateDoc(dealRef, {
     clicks: increment(1),
     clickHistory: arrayUnion({
       timestamp: new Date().toISOString(),
       type: 'click'
     })
   });
 }, []);

 const trackPageView = useCallback(async (pageId) => {
   const analyticsRef = doc(db, 'analytics', 'pageViews');
   await updateDoc(analyticsRef, {
     [pageId]: increment(1)
   });
 }, []);

 return { trackDealClick, trackPageView };
};

// Update HomePage.js to include analytics
const HomePage = () => {
 const { trackPageView } = useAnalytics();

 useEffect(() => {
   trackPageView('home');
 }, [trackPageView]);

 // ... rest of HomePage code
};

// Update DealCard component
const DealCard = ({ deal }) => {
 const { trackDealClick } = useAnalytics();

 const handleClick = async () => {
   await trackDealClick(deal.id);
   window.open(deal.storeUrl, '_blank');
 };

 return (
   <div className="deal-card">
     {/* ... existing card content ... */}
     <button onClick={handleClick}>Get Deal</button>
   </div>
 );
};