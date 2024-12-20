import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import RatingInput from './RatingInput';
import { userService } from '@/lib/firebase/userService';

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

export default ReviewList;