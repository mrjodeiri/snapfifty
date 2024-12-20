// src/components/user/SavedDeals.jsx
import React from 'react';
import { useSavedDeals } from '@/hooks/useSavedDeals';
import DealCard from '../price/DealCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookmarkX } from 'lucide-react';

const SavedDeals = () => {
  const { savedDeals, loading, unsaveDeal } = useSavedDeals();

  if (loading) return <div>Loading saved deals...</div>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Saved Deals</CardTitle>
      </CardHeader>
      <CardContent>
        {savedDeals.length === 0 ? (
          <div className="text-center py-8">
            <BookmarkX className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">No saved deals yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[600px] pr-4">
            <div className="grid grid-cols-1 gap-6">
              {savedDeals.map(deal => (
                <div key={deal.id} className="relative">
                  <DealCard deal={deal} />
                  <button
                    onClick={() => unsaveDeal(deal.id)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100"
                  >
                    <BookmarkX className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedDeals;