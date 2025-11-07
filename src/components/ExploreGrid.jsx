import { BadgeCheck, Image as ImageIcon, Music2, Film, Shield } from 'lucide-react';

const items = [
  { id: 1, title: 'Neon Metropolis', type: 'Image', icon: ImageIcon, rights: ['CC BY-NC', 'No Derivatives'], badges: ['Verified'] },
  { id: 2, title: 'Echoes of Dawn', type: 'Music', icon: Music2, rights: ['All Rights Reserved'], badges: ['Trusted'] },
  { id: 3, title: 'Quantum Drift', type: 'Video', icon: Film, rights: ['Custom License'], badges: ['Verified', 'Creator Pro'] },
  { id: 4, title: 'Glassy Night', type: 'Image', icon: ImageIcon, rights: ['CC BY'], badges: [] },
];

export default function ExploreGrid() {
  return (
    <section id="explore" className="py-14 border-t border-neutral-900/60 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-neutral-100 text-2xl font-semibold">Explore</h2>
          <button className="text-sm text-neutral-300 hover:text-white">View all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-4 hover:bg-neutral-900/70 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400/70 to-cyan-400/70 flex items-center justify-center">
                    <item.icon className="text-neutral-950" size={20} />
                  </div>
                  <div>
                    <h3 className="text-neutral-100 font-medium">{item.title}</h3>
                    <p className="text-neutral-400 text-sm flex items-center gap-1"><Shield size={14} /> {item.type}</p>
                  </div>
                </div>
                {item.badges.includes('Verified') && (
                  <span className="inline-flex items-center gap-1 text-emerald-300 text-xs"><BadgeCheck size={16} /> Verified</span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.rights.map((r) => (
                  <span key={r} className="text-xs px-2 py-1 rounded-md bg-neutral-800/80 text-neutral-300 border border-neutral-700/70">{r}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
