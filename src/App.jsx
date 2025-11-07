import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreGrid from './components/ExploreGrid';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,150,255,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_80%_10%,rgba(99,102,241,0.12),transparent)]" />
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,.4), transparent 30%)' }} />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
        <ExploreGrid />
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
