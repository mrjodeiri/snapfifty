// src/pages/dashboard.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import ProfileCard from '@/components/user/ProfileCard';
import SavedDeals from '@/components/user/SavedDeals';
import PreferencesCard from '@/components/user/PreferencesCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="saved">Saved Deals</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileCard />
        </TabsContent>

        <TabsContent value="saved">
          <SavedDeals />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferencesCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
