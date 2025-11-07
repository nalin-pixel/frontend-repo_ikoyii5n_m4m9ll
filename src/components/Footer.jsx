import { motion } from 'framer-motion';
import { Github, Twitter, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/60">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-cyan-500/60 to-indigo-600/60" />
              <span className="text-white font-semibold">ChainFolio</span>
            </div>
            <p className="mt-2 max-w-md text-sm text-white/70">A portfolio and licensing hub for on-chain creators. Built with a futuristic, glassy interface and smooth motion.</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" /> Story Protocol enabled
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="rounded-full border border-white/15 bg-white/5 p-2 text-white/80 hover:bg-white/10">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-full border border-white/15 bg-white/5 p-2 text-white/80 hover:bg-white/10">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-xs text-white/50">© {new Date().getFullYear()} ChainFolio. All rights reserved.</div>
      </div>
    </footer>
  );
}
