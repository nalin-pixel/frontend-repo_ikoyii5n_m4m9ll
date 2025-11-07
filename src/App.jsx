import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ExploreGrid from './components/ExploreGrid.jsx';
import Dashboard from './components/Dashboard.jsx';
import Profile from './components/Profile.jsx';

export default function App() {
  // Bridge: when a registration succeeds, persist to localStorage so Profile can render history
  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.type === 'REGISTERED_WORK') {
        const storeKey = 'chainfolio_uploads';
        const existing = JSON.parse(localStorage.getItem(storeKey) || '[]');
        const next = [e.detail.payload, ...existing].slice(0, 200);
        localStorage.setItem(storeKey, JSON.stringify(next));
      }
    };
    window.addEventListener('chainfolio:event', handler);
    return () => window.removeEventListener('chainfolio:event', handler);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main className="relative">
        <Hero />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          <ExploreGrid />
          <Dashboard />
          <Profile />
        </section>
      </main>
    </div>
  );
}
