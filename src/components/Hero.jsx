import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[88vh] w-full overflow-hidden" id="home">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/5C9XQjP0G1wim5F1/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white"
        >
          On‑chain Provenance for Every Creative Work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 max-w-2xl text-white/80"
        >
          Register, license, and showcase your creations with verifiable trust badges and rights‑aware discovery.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-3"
        >
          <a href="#dashboard" className="pointer-events-auto inline-flex items-center justify-center rounded-xl px-5 py-3 bg-white text-black font-medium hover:bg-white/90 transition">Get Started</a>
          <a href="#explore" className="pointer-events-auto inline-flex items-center justify-center rounded-xl px-5 py-3 bg-white/10 text-white border border-white/10 hover:bg-white/15 transition">Explore Works</a>
        </motion.div>
      </div>
    </section>
  );
}
