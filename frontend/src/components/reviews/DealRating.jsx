import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import RatingInput from './RatingInput';
import { userService } from '@/lib/firebase/userService';

const DealRating = ({ dealId }) => {
  const [ratings, setRatings] = useState({
    average: 0,
    total: 0,
    distribution: {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    }
  });

  useEffect(() => {
    const loadRatings = async () => {
      const reviews = await userService.getReviews(dealId);
      const distribution = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {});

      const total = reviews.length;
      const average = total > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / total
        : 0;

      setRatings({
        average,
        total,
        distribution
      });
    };

    loadRatings();
  }, [dealId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="text-4xl font-bold">{ratings.average.toFixed(1)}</div>
        <div>
          <RatingInput value={Math.round(ratings.average)} size="lg" />
          <p className="text-sm text-gray-500">{ratings.total} reviews</p>
        </div>
      </div>
      
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center space-x-2">
            <span className="w-4">{star}</span>
            <Star className="h-4 w-4 text-yellow-400" />
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400"
                style={{
                  width: `${(ratings.distribution[star] / ratings.total) * 100 || 0}%`
                }}
              />
            </div>
            <span className="text-sm text-gray-500">
              {ratings.distribution[star] || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealRating;