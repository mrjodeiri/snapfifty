// hooks/usePriceAnalysis.js
import { useState, useEffect } from 'react';

export const usePriceAnalysis = (dealId) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        setLoading(true);
        
        // Fetch price history
        const historyResponse = await fetch(`/api/price-analysis/${dealId}/history`);
        if (!historyResponse.ok) throw new Error('Failed to fetch price history');
        const historyData = await historyResponse.json();
        
        // Fetch prediction
        const predictionResponse = await fetch(`/api/price-analysis/${dealId}/prediction`);
        if (!predictionResponse.ok) throw new Error('Failed to fetch prediction');
        const predictionData = await predictionResponse.json();

        setPriceHistory(historyData);
        setPrediction(predictionData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (dealId) {
      fetchPriceData();
    }
  }, [dealId]);

  const updatePrediction = async () => {
    try {
      const response = await fetch(`/api/price-analysis/${dealId}/update-prediction`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to update prediction');
      const newPrediction = await response.json();
      setPrediction(newPrediction);
      return newPrediction;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    priceHistory,
    prediction,
    loading,
    error,
    updatePrediction
  };
};