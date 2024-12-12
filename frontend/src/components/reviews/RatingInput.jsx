// src/components/reviews/RatingInput.jsx
import React from 'react';
import { Star } from 'lucide-react';

const RatingInput = ({ value, onChange, size = "md" }) => {
  const starSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className="focus:outline-none"
        >
          <Star
            className={`${starSizes[size]} ${
              rating <= value
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

// src/components/reviews/ReviewForm.jsx
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/lib/firebase/userService';

const ReviewForm = ({ dealId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await userService.addReview(user.uid, dealId, {
        rating,
        comment
      });
      setRating(0);
      setComment('');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <RatingInput value={rating} onChange={setRating} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Review</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this deal..."
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading || !rating}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

// src/components/reviews/ReviewList.jsx
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

const ReviewList = ({ dealId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const dealReviews = await userService.getReviews(dealId);
        setReviews(dealReviews);
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [dealId]);

  if (loading) return <div>Loading reviews...</div>;

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No reviews yet. Be the first to review this deal!
          </p>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{review.user.name}</p>
                      <RatingInput value={review.rating} size="sm" />
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(review.createdAt.toDate(), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

// src/components/reviews/DealRating.jsx
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

export { RatingInput, ReviewForm, ReviewList, DealRating };