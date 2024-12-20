import { useState, useEffect } from 'react';
import { userService } from '@/lib/firebase/userService';
import { useAuth } from './useAuth';

export const useSavedDeals = () => {
  const [savedDeals, setSavedDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setSavedDeals([]);
      setLoading(false);
      return;
    }

    const loadSavedDeals = async () => {
      try {
        setLoading(true);
        const deals = await userService.getSavedDeals(user.uid);
        setSavedDeals(deals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSavedDeals();
  }, [user]);

  const saveDeal = async (dealId) => {
    if (!user) return false;

    try {
      await userService.saveDeal(user.uid, dealId);
      setSavedDeals(prev => [...prev, dealId]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const unsaveDeal = async (dealId) => {
    if (!user) return false;

    try {
      await userService.unsaveDeal(user.uid, dealId);
      setSavedDeals(prev => prev.filter(id => id !== dealId));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { savedDeals, loading, error, saveDeal, unsaveDeal };
};