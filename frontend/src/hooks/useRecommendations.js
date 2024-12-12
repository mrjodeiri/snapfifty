// src/hooks/useRecommendations.js
import { useState, useEffect } from 'react';
import { RecommendationEngine } from '@/lib/recommendation';
import { useAuth } from '@/hooks/useAuth';

export const useRecommendations = () => {
  const [personalizedDeals, setPersonalizedDeals] = useState([]);
  const [trendingDeals, setTrendingDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  
  const recommendationEngine = new RecommendationEngine();

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true);
        const [personalized, trending] = await Promise.all([
          user ? recommendationEngine.getPersonalizedRecommendations(user.uid) : [],
          recommendationEngine.getTrendingDeals()
        ]);

        setPersonalizedDeals(personalized);
        setTrendingDeals(trending);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [user]);

  return {
    personalizedDeals,
    trendingDeals,
    loading,
    error
  };
};

// src/hooks/useSimilarDeals.js
import { useState, useEffect } from 'react';
import { RecommendationEngine } from '@/lib/recommendation';

export const useSimilarDeals = (dealId) => {
  const [similarDeals, setSimilarDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const recommendationEngine = new RecommendationEngine();

  useEffect(() => {
    const loadSimilarDeals = async () => {
      try {
        setLoading(true);
        const deals = await recommendationEngine.getSimilarDeals(dealId);
        setSimilarDeals(deals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (dealId) {
      loadSimilarDeals();
    }
  }, [dealId]);

  return {
    similarDeals,
    loading,
    error
  };
};

// src/components/recommendations/RecommendedDeals.jsx
import { useRecommendations } from '@/hooks/useRecommendations';
import DealCard from '@/components/deals/DealCard';

export const RecommendedDeals = () => {
  const { personalizedDeals, loading, error } = useRecommendations();

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personalizedDeals.map(deal => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
};

// src/components/recommendations/TrendingDeals.jsx
import { useRecommendations } from '@/hooks/useRecommendations';
import DealCard from '@/components/deals/DealCard';

export const TrendingDeals = () => {
  const { trendingDeals, loading, error } = useRecommendations();

  if (loading) return <div>Loading trending deals...</div>;
  if (error) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Trending Deals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingDeals.map(deal => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
};