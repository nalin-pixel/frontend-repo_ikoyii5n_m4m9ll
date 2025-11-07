import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileCheck, Link2, Shield, Loader2 } from 'lucide-react';
import WorkTimeline from './WorkTimeline';

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'art', file: null, license: 'cc-by', url: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Mock upload to IPFS + register to Story Protocol (placeholder behaviors for now)
    await new Promise((r) => setTimeout(r, 1200));
    setOpen(true);
    setSubmitting(false);
  };

  return (
    <section id="dashboard" className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
          <p className="mt-1 text-white/70">Register new works, manage licenses, and track provenance.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur lg:col-span-2">
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-white/80">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  placeholder="Name your creation"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-white/80">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  >
                    <option value="art">Art</option>
                    <option value="music">Music</option>
                    <option value="code">Code</option>
                    <option value="writing">Writing</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-white/80">Reference URL (optional)</label>
                  <input
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                    placeholder="https://"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-white/80">Upload media</label>
                  <div className="mt-1 flex items-center justify-between rounded-xl border border-dashed border-white/20 bg-black/40 p-4">
                    <div className="flex items-center gap-3 text-white/80">
                      <Upload className="h-5 w-5" />
                      <span>{form.file ? form.file.name : 'Drag & drop or choose file'}</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      id="file-input"
                      onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
                    />
                    <label htmlFor="file-input" className="cursor-pointer rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15">Browse</label>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-white/80">License</label>
                  <select
                    value={form.license}
                    onChange={(e) => setForm({ ...form, license: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  >
                    <option value="cc-by">CC BY</option>
                    <option value="cc-by-sa">CC BY-SA</option>
                    <option value="cc-by-nd">CC BY-ND</option>
                    <option value="all-rights-reserved">All Rights Reserved</option>
                  </select>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 ring-1 ring-white/20 transition hover:brightness-110 disabled:opacity-60"
                whileTap={{ scale: 0.98 }}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileCheck className="h-4 w-4" />}
                {submitting ? 'Registering…' : 'Register work'}
              </motion.button>
            </form>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-cyan-300" />
              <div>
                <h3 className="font-medium text-white">Provenance & Licensing</h3>
                <p className="text-sm text-white/70">Every registration is anchored on-chain via Story Protocol.</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>• Immutable record of ownership</li>
              <li>• License templates for common use-cases</li>
              <li>• IPFS-backed media storage</li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <WorkTimeline />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.06] p-6 text-white backdrop-blur"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            >
              <div className="mb-4 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-emerald-300" />
                <h4 className="font-semibold">Work registered</h4>
              </div>
              <p className="text-sm text-white/80">Your work has been uploaded to IPFS and registered on-chain with a {form.license.toUpperCase()} license. View it on your profile.</p>
              <div className="mt-6 flex justify-end gap-3">
                <a href="#profile" className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">Go to profile</a>
                <button onClick={() => setOpen(false)} className="rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:brightness-110">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
