import React from 'react';
import DealCard from '@/components/price/DealCard';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to SnapFifty</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Deals will be mapped here */}
      </div>
    </main>
  );
}