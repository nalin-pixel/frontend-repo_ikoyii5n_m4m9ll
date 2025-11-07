import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreGrid from './components/ExploreGrid';
import Dashboard from './components/Dashboard';

function useTheme() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('bg-neutral-950');
  }, []);
}

export default function App() {
  useTheme();
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <ExploreGrid />
        <Dashboard />
        <footer id="about" className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-12 text-white/60 text-sm">
            © {new Date().getFullYear()} ChainFolio — Building provenance, licensing, and trust for the creative internet.
          </div>
        </footer>
      </main>
    </div>
  );
}
