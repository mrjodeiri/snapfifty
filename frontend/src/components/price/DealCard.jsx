import React, { useState } from 'react';
import PriceAlertDialog from '@/components/notifications/PriceAlertDialog';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePriceAnalysis } from '@/hooks/usePriceAnalysis';
const DealCard = ({ deal }) => {
  const { prediction, loading } = usePriceAnalysis(deal.id);
  const [showTrendModal, setShowTrendModal] = useState(false);

  const getTrendBadge = () => {
    if (loading) return null;
    
    const badges = {
      UP: { icon: ArrowUpCircle, color: 'text-red-500', bg: 'bg-red-50' },
      DOWN: { icon: ArrowDownCircle, color: 'text-green-500', bg: 'bg-green-50' },
      STABLE: { icon: MinusCircle, color: 'text-gray-500', bg: 'bg-gray-50' }
    };

    const badge = badges[prediction?.trendDirection || 'STABLE'];
    const Icon = badge.icon;

    return (
      <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${badge.bg}`}>
        <Icon className={`h-4 w-4 ${badge.color}`} />
        <span className={`text-sm font-medium ${badge.color}`}>
          {prediction?.trendDirection}
        </span>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{deal.title}</span>
          {getTrendBadge()}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">
              ${deal.discountedPrice}
            </span>
            <span className="text-gray-500 line-through">
              ${deal.originalPrice}
            </span>
          </div>
          
          <p className="text-gray-600">{deal.description}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Dialog open={showTrendModal} onOpenChange={setShowTrendModal}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              View Price Trends
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <PriceTrendCard dealId={deal.id} />
          </DialogContent>
        </Dialog>
        
        <Button onClick={() => window.open(deal.storeUrl, '_blank')}>
          Get Deal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DealCard;