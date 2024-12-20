import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';

export const usePriceAnalysis = (dealId) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!dealId) {
      setLoading(false);
      return;
    }

    try {
      const historyRef = collection(db, 'price_history');
      const predictionRef = doc(db, 'price_predictions', dealId);

      const historyQuery = query(historyRef, where('dealId', '==', dealId));

      const unsubHistory = onSnapshot(historyQuery, (snapshot) => {
        const history = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        }));
        setPriceHistory(history);
      }, (err) => setError(err));

      const unsubPrediction = onSnapshot(predictionRef, (doc) => {
        if (doc.exists()) {
          setPrediction({
            ...doc.data(),
            predictionDate: doc.data().predictionDate?.toDate() || new Date()
          });
        }
        setLoading(false);
      }, (err) => setError(err));

      return () => {
        unsubHistory();
        unsubPrediction();
      };
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [dealId]);

  return { priceHistory, prediction, loading, error };
};

export default usePriceAnalysis;