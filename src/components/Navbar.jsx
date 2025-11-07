import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Wallet } from 'lucide-react';

export default function Navbar() {
  const [connected, setConnected] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500/60 to-indigo-600/60 shadow-lg shadow-cyan-500/20 ring-1 ring-white/20 grid place-items-center">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">ChainFolio</span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#explore" className="text-white/80 hover:text-white transition">Explore</a>
            <a href="#how" className="text-white/80 hover:text-white transition">How it works</a>
            <a href="#dashboard" className="text-white/80 hover:text-white transition">Dashboard</a>
          </nav>

          <motion.button
            onClick={() => setConnected((c) => !c)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${
              connected
                ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30 hover:bg-emerald-500/30'
                : 'bg-white/5 text-white border-white/20 hover:bg-white/10'
            }`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            aria-label={connected ? 'Wallet connected' : 'Connect wallet'}
          >
            <Wallet className="h-4 w-4" />
            {connected ? '0xA3...F1C' : 'Connect Wallet'}
          </motion.button>
        </div>

        <div className="md:hidden mt-3 mb-3 flex items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-white/80">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
            On-chain verified profiles
          </span>
        </div>
      </div>
    </header>
  );
}
