import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RatingInput, ReviewForm, ReviewList, DealRating } from '@/components/reviews';
import DealCard from '@/components/price/DealCard';

export default function DealPage() {
  const router = useRouter();
  const { id } = router.query;

  // Add this to handle SSG
  if (!id) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DealCard id={id} />
          
          <Card className="mt-8">
            <Tabs defaultValue="details">
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
                  <ReviewForm dealId={id} />
                  <ReviewList dealId={id} />
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Add this for static generation
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps() {
  return {
    props: {}
  };
}