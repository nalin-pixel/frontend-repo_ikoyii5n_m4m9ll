import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ExploreGrid from './components/ExploreGrid.jsx';
import Dashboard from './components/Dashboard.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main className="relative">
        <Hero />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          <ExploreGrid />
          <Dashboard />
        </section>
      </main>
    </div>
  );
}
