import { useEffect, useMemo, useState } from 'react';
import { FileText, Link2, Shield, Clock, Search, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function loadUploads() {
  try {
    const raw = localStorage.getItem('chainfolio_uploads');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function Profile() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(loadUploads());
    const onStorage = (e) => {
      if (e.key === 'chainfolio_uploads') setItems(loadUploads());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      [it.title, it.type, it.license, it.fileName, it.url]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [items, query]);

  return (
    <section id="profile" className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-white">Your Profile</h2>
            <p className="mt-1 text-white/70">Review your previously registered works and documents.</p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, type, license…"
              className="w-full rounded-full border border-white/15 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>
        </div>

        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid place-items-center rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur"
            >
              <Image className="mb-3 h-8 w-8 text-white/50" />
              <h3 className="text-white/90">No uploads yet</h3>
              <p className="mt-1 max-w-md text-sm text-white/70">After you register a work in the dashboard, it will appear here with license and timestamp details.</p>
            </motion.div>
          ) : (
            <motion.ul
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((item) => (
                <li key={item.id} className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.06] p-5 text-white backdrop-blur transition-shadow hover:shadow-[0_8px_40px_rgba(0,255,255,0.15)]">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-cyan-300" />
                      <h4 className="line-clamp-1 font-medium">{item.title}</h4>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80 ring-1 ring-white/15">{item.type}</span>
                  </div>
                  <div className="space-y-2 text-sm text-white/80">
                    {item.fileName && (
                      <div className="flex items-center gap-2">
                        <Image className="h-4 w-4 opacity-80" />
                        <span className="truncate">{item.fileName}</span>
                      </div>
                    )}
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan-300 hover:underline">
                        <Link2 className="h-4 w-4" />
                        <span className="truncate">{item.url}</span>
                      </a>
                    )}
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-emerald-300" />
                      <span>License: {item.license?.toUpperCase?.() || '—'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-white/70" />
                      <span>{new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
