import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/igThmltzmqv5hkWo/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/60 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-semibold tracking-tight text-neutral-50"
          >
            Showcase your on-chain creativity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-neutral-300 text-lg"
          >
            ChainFolio helps creators prove provenance, license their work, and build trust — all in a refined, glassy dark interface.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 flex items-center gap-3"
          >
            <a href="#explore" className="rounded-md bg-neutral-100 text-neutral-900 hover:bg-white px-5 py-3 text-sm font-medium transition-colors">Explore works</a>
            <a href="#dashboard" className="rounded-md bg-neutral-800/80 hover:bg-neutral-700/70 text-neutral-100 border border-neutral-700 px-5 py-3 text-sm transition-colors">Register a work</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
