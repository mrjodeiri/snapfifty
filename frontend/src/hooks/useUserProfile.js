import { useState, useEffect } from 'react';
import { userService } from '@/lib/firebase/userService';
import { useAuth } from './useAuth';

export const useUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        setLoading(true);
        const userProfile = await userService.getUserProfile(user.uid);
        setProfile(userProfile);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const updateProfile = async (profileData) => {
    if (!user) return;
    
    try {
      await userService.updateUserProfile(user.uid, profileData);
      setProfile(prev => ({ ...prev, ...profileData }));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { profile, loading, error, updateProfile };
};