// src/pages/deals/[id].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RatingInput, ReviewForm, ReviewList, DealRating } from '@/components/reviews';
import DealCard from '@/components/deals/DealCard';
import { useAuth } from '@/hooks/useAuth';

export default function DealPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DealCard id={id} />
          
          <Card className="mt-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <CardContent>
                  {/* Deal details content */}
                </CardContent>
              </TabsContent>

              <TabsContent value="reviews">
                <CardContent className="space-y-6">
                  <DealRating dealId={id} />
                  
                  {user && <ReviewForm dealId={id} />}
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                    <ReviewList dealId={id} />
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div>
          {/* Similar deals section */}
        </div>
      </div>
    </div>
  );
}