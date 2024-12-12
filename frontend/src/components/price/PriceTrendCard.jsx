import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ArrowUpCircle, ArrowDownCircle, MinusCircle, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PriceTrendCard = ({ dealId, priceHistory, prediction }) => {
  const getTrendIcon = () => {
    switch (prediction?.trendDirection) {
      case 'UP':
        return <ArrowUpCircle className="h-6 w-6 text-red-500" />;
      case 'DOWN':
        return <ArrowDownCircle className="h-6 w-6 text-green-500" />;
      default:
        return <MinusCircle className="h-6 w-6 text-gray-500" />;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getConfidenceLevel = (score) => {
    if (score >= 0.7) return 'High';
    if (score >= 0.4) return 'Medium';
    return 'Low';
  };

  const getConfidenceColor = (score) => {
    if (score >= 0.7) return 'text-green-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Price Trend Analysis</span>
          {getTrendIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Price History Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Price History</h3>
          <div className="w-full h-64">
            <LineChart
              width={600}
              height={240}
              data={priceHistory}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatPrice(value)}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                name="Historical Price"
              />
            </LineChart>
          </div>
        </div>

        {/* Prediction Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Predicted Price</h4>
              <p className="text-2xl font-bold">{formatPrice(prediction?.predictedPrice)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Price Volatility</h4>
              <p className="text-2xl font-bold">
                {(prediction?.priceVolatility * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Prediction Confidence:</span>
            <span className={`font-bold ${getConfidenceColor(prediction?.confidenceScore)}`}>
              {getConfidenceLevel(prediction?.confidenceScore)}
            </span>
          </div>

          {/* Warning for low confidence */}
          {prediction?.confidenceScore < 0.4 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This prediction has low confidence due to limited historical data or high price volatility.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceTrendCard;