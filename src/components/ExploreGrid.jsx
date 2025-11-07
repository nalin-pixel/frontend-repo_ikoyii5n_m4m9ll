import { motion } from 'framer-motion';
import { User, Music, Code, Image, PenTool } from 'lucide-react';

const dummyWorks = [
  { id: '1', title: 'Astral Voyager', type: 'art', creator: '0xA3...F1C', tags: ['art', '3D'], icon: Image },
  { id: '2', title: 'Neon Beats EP', type: 'music', creator: '0xBC...9D2', tags: ['music'], icon: Music },
  { id: '3', title: 'Solidity Utils', type: 'code', creator: '0x77...11A', tags: ['code', 'library'], icon: Code },
  { id: '4', title: 'Cipher Poem', type: 'writing', creator: '0x42...C7E', tags: ['writing'], icon: PenTool },
];

export default function ExploreGrid() {
  return (
    <section id="explore" className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Trending works</h2>
            <p className="mt-1 text-white/70">Discover on-chain creations registered with Story Protocol.</p>
          </div>
          <button className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dummyWorks.map((w, i) => (
            <motion.a
              key={w.id}
              href={`#work-${w.id}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5 backdrop-blur transition hover:border-cyan-400/30"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium leading-tight">{w.title}</h3>
                    <p className="text-xs text-white/60">by {w.creator}</p>
                  </div>
                </div>
                <User className="h-4 w-4 text-white/50" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {w.tags.map((t) => (
                  <span key={t} className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-xs text-cyan-200 ring-1 ring-cyan-500/30">{t}</span>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(34,211,238,0.15), transparent 40%)' }} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
