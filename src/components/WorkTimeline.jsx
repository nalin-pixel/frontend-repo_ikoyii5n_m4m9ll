import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Link2, UserCircle2, Clock } from 'lucide-react';

const defaultProvenance = [
  {
    id: 'reg',
    stage: 'Registered',
    ts: '2025-05-12 14:22 UTC',
    tx: '0x9a3c...fa21',
    collaborator: '0xA3...F1C',
    color: 'from-cyan-400 to-indigo-500',
  },
  {
    id: 'lic',
    stage: 'Licensed',
    ts: '2025-06-01 10:08 UTC',
    tx: '0x51bd...88c4',
    collaborator: '0x7B...90E',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'rem',
    stage: 'Remixed',
    ts: '2025-06-15 19:47 UTC',
    tx: '0xd2e1...3f9a',
    collaborator: '0x44...AF2',
    color: 'from-fuchsia-400 to-violet-500',
  },
];

export default function WorkTimeline({ provenance = defaultProvenance }) {
  const [hovered, setHovered] = useState(null);

  const floatTransition = useMemo(
    () => ({ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }),
    []
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-white font-semibold">Work History</h3>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs text-white/70">
          <Clock className="h-3.5 w-3.5" />
          Provenance
        </span>
      </div>

      <div className="relative mx-auto grid max-w-4xl grid-cols-3 gap-6">
        {/* Animated connecting line */}
        <svg className="pointer-events-none absolute left-0 top-16 h-1/2 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
          <defs>
            <linearGradient id="glowA" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
            </filter>
          </defs>
          <path d="M2 5 H98" stroke="url(#glowA)" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" filter="url(#blur)" />
        </svg>

        {provenance.map((n, idx) => (
          <motion.div
            key={n.id}
            onHoverStart={() => setHovered(n.id)}
            onHoverEnd={() => setHovered(null)}
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            {/* Node container with subtle continuous float and hover glow instead of scale */}
            <motion.div
              className={`relative grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br ${n.color} p-[2px] shadow-[0_0_40px_rgba(34,211,238,0.25)]`}
              animate={{ y: [0, -4, 0] }}
              transition={floatTransition}
            >
              <motion.div
                className="relative h-full w-full rounded-2xl bg-black/60 backdrop-blur grid place-items-center"
                whileHover={{ y: -2, boxShadow: '0 0 24px rgba(99,102,241,0.45)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                {/* Pulsing ring */}
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0.25, scale: 0.98 }}
                  animate={{ opacity: hovered === n.id ? [0.25, 0.6, 0.25] : 0.25, scale: hovered === n.id ? [0.98, 1.04, 0.98] : 0.98 }}
                  transition={{ duration: 1.6, repeat: hovered === n.id ? Infinity : 0 }}
                  style={{ boxShadow: '0 0 28px rgba(34,211,238,0.35)' }}
                />
                <CheckCircle2 className="h-8 w-8 text-white" />
              </motion.div>
            </motion.div>

            <div className="mt-3 text-center">
              <div className="text-sm font-medium text-white">{n.stage}</div>
              <div className="text-xs text-white/70">{n.ts}</div>
            </div>

            <motion.div
              className="mt-3 w-full max-w-[220px] rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/80"
              animate={{ opacity: hovered === n.id ? 1 : 0.9, y: hovered === n.id ? -2 : 0 }}
            >
              <div className="mb-1 flex items-center gap-2">
                <UserCircle2 className="h-4 w-4 text-white/80" />
                <span>Collab: {n.collaborator}</span>
              </div>
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-white/80" />
                <span className="truncate" title={n.tx}>Tx: {n.tx}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
