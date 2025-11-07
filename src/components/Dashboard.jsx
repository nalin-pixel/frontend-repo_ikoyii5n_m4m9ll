import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Artwork');
  const [fileUrl, setFileUrl] = useState('');
  const [license, setLicense] = useState('Standard License');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Simulate registration
      await new Promise((r) => setTimeout(r, 800));
      setSuccess(true);
      setTitle('');
      setFileUrl('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="dashboard" className="relative py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">Register Your Work</h2>

        <form onSubmit={onSubmit} className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Neon Skyline" className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none">
                <option>Artwork</option>
                <option>Audio</option>
                <option>Video</option>
                <option>Code</option>
                <option>Document</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">License</label>
              <select value={license} onChange={(e) => setLicense(e.target.value)} className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none">
                <option>Standard License</option>
                <option>CC BY‑NC</option>
                <option>CC BY‑SA</option>
                <option>Custom</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">File URL</label>
            <input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="https://..." className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-medium disabled:opacity-60">
              {submitting ? 'Registering…' : 'Register'}
            </button>
          </div>
        </form>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-200 px-4 py-3"
          >
            Work registered (simulated). In the full app, this would mint a license NFT and broadcast an event.
          </motion.div>
        )}
      </div>
    </section>
  );
}
