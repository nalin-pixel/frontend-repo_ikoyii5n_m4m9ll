import { motion } from 'framer-motion';

const sample = [
  { id: 1, title: 'Neon Skyline', author: '0x12...34ab', type: 'Artwork', rights: ['View', 'Remix'], badge: 'Verified' },
  { id: 2, title: 'Lo‑fi Track', author: '0x98...77df', type: 'Audio', rights: ['Listen'], badge: 'KYC' },
  { id: 3, title: 'Shader Pack', author: '0xab...11cd', type: 'Code', rights: ['Use', 'Commercial'], badge: 'Trusted' },
  { id: 4, title: 'Short Film', author: '0x45...22aa', type: 'Video', rights: ['View'], badge: 'Verified' },
];

export default function ExploreGrid() {
  return (
    <section id="explore" className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">Explore</h2>
            <p className="text-white/70">Discover registered works and their licensed rights.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sample.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl p-4 bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-300/20">{item.badge}</span>
                <span className="text-xs text-white/60">{item.type}</span>
              </div>
              <h3 className="text-white font-medium truncate">{item.title}</h3>
              <p className="text-white/60 text-sm">by {item.author}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.rights.map((r) => (
                  <span key={r} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white border border-white/10">{r}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
