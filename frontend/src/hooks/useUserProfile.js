// src/hooks/useUserProfile.js
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

// src/hooks/useSavedDeals.js
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

// src/hooks/useUserPreferences.js
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