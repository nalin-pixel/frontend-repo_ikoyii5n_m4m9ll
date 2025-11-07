import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black"></div>

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.h1
            className="pointer-events-auto text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Own your creativity on-chain
          </motion.h1>
          <motion.p
            className="pointer-events-auto mt-6 text-lg leading-8 text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            ChainFolio is your portfolio and licensing hub powered by Story Protocol. Register works, prove provenance, and let others license directly on-chain.
          </motion.p>
          <motion.div
            className="pointer-events-auto mt-10 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="#dashboard"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 ring-1 ring-white/20 transition hover:brightness-110"
            >
              Get started
            </a>
            <a
              href="#explore"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/15"
            >
              Explore creators
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
