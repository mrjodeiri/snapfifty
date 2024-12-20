import { useState, useEffect } from 'react';
import { userService } from '@/lib/firebase/userService';
import { useAuth } from './useAuth';

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setPreferences({});
      setLoading(false);
      return;
    }

    const loadPreferences = async () => {
      try {
        setLoading(true);
        const userPreferences = await userService.getPreferences(user.uid);
        setPreferences(userPreferences);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [user]);

  const updatePreferences = async (newPreferences) => {
    if (!user) return false;

    try {
      await userService.updatePreferences(user.uid, newPreferences);
      setPreferences(prev => ({ ...prev, ...newPreferences }));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { preferences, loading, error, updatePreferences };
};