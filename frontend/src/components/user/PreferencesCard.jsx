// src/components/user/PreferencesCard.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Bell, Mail, DollarSign, Tag } from 'lucide-react';

const PreferencesCard = () => {
  const { preferences, loading, updatePreferences } = useUserPreferences();
  const [localPrefs, setLocalPrefs] = useState(preferences);

  const handleSave = async () => {
    await updatePreferences(localPrefs);
  };

  if (loading) return <div>Loading preferences...</div>;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <Label htmlFor="price-alerts">Price Drop Alerts</Label>
            </div>
            <Switch
              id="price-alerts"
              checked={localPrefs.priceAlerts}
              onCheckedChange={(checked) => 
                setLocalPrefs(prev => ({ ...prev, priceAlerts: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            <Switch
              id="email-notifications"
              checked={localPrefs.emailNotifications}
              onCheckedChange={(checked) => 
                setLocalPrefs(prev => ({ ...prev, emailNotifications: checked }))
              }
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <Label>Minimum Discount Percentage</Label>
            </div>
            <Slider
              value={[localPrefs.minDiscountPercent || 0]}
              max={100}
              step={5}
              onValueChange={([value]) => 
                setLocalPrefs(prev => ({ ...prev, minDiscountPercent: value }))
              }
            />
            <div className="text-right text-sm text-gray-500">
              {localPrefs.minDiscountPercent}%
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5" />
              <Label>Preferred Categories</Label>
            </div>
            {/* Add category selection here */}
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesCard;