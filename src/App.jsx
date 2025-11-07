import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreGrid from './components/ExploreGrid';
import Dashboard from './components/Dashboard';

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('bg-neutral-950');
  }, []);

  return (
    <div className="min-h-screen text-neutral-200">
      <Navbar />
      <Hero />
      <ExploreGrid />
      <Dashboard />
      <footer className="border-t border-neutral-900/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-sm text-neutral-400">© {new Date().getFullYear()} ChainFolio. All rights reserved.</p>
          <div className="text-sm text-neutral-400">Built with ❤️ for creators.</div>
        </div>
      </footer>
    </div>
  );
}
