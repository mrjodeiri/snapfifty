import React from 'react';
import DealCard from '@/components/price/DealCard';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Today's Best Deals</h1>
        <p className="text-gray-600">Discover incredible savings up to 50% off!</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* We'll add real deals here later */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-gray-600">Amazing deals are on their way!</p>
        </div>
      </section>
    </main>
  );
}