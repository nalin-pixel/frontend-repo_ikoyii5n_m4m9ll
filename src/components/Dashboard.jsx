import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [form, setForm] = useState({ title: '', type: 'Image', license: 'All Rights Reserved', url: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSuccess(true);
  };

  return (
    <section id="dashboard" className="py-16 bg-neutral-950 border-t border-neutral-900/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-neutral-100 text-2xl font-semibold mb-6">Register a work</h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Title</label>
              <input name="title" value={form.title} onChange={onChange} required className="w-full rounded-md bg-neutral-900/60 border border-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" placeholder="e.g. Neon Metropolis" />
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Type</label>
              <select name="type" value={form.type} onChange={onChange} className="w-full rounded-md bg-neutral-900/60 border border-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none">
                <option>Image</option>
                <option>Music</option>
                <option>Video</option>
                <option>3D</option>
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-300 mb-1">License</label>
              <select name="license" value={form.license} onChange={onChange} className="w-full rounded-md bg-neutral-900/60 border border-neutral-800 px-3 py-2 text-neutral-100 focus:outline-none">
                <option>All Rights Reserved</option>
                <option>CC BY</option>
                <option>CC BY-NC</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-1">File URL</label>
              <input name="url" value={form.url} onChange={onChange} required className="w-full rounded-md bg-neutral-900/60 border border-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" placeholder="https://..." />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={submitting} className="rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 text-white px-5 py-2.5 text-sm font-medium shadow-lg shadow-emerald-500/20 disabled:opacity-60">{submitting ? 'Submitting...' : 'Register'}</button>
          </div>
        </form>

        {success && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3 rounded-lg border border-emerald-700/40 bg-emerald-900/20 p-4 text-emerald-200">
            <CheckCircle2 />
            <span>Registration submitted. Provenance entry will appear once confirmed on-chain.</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
