'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Wrench, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (email === 'demo@gmail.com' && password === 'demo123') {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Try demo@gmail.com / demo123');
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#09090b' }}>
      {/* Ambient glow */}
      <div className="absolute rounded-full pointer-events-none" style={{ top: '-200px', left: '20%', width: '500px', height: '500px', background: 'rgba(245,158,11,0.05)', filter: 'blur(120px)' }} />
      <div className="absolute rounded-full pointer-events-none" style={{ bottom: '-100px', right: '10%', width: '400px', height: '400px', background: 'rgba(245,158,11,0.03)', filter: 'blur(100px)' }} />

      {/* Left - Image */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex relative overflow-hidden"
        style={{ width: '55%' }}
      >
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right, transparent, transparent 60%, #09090b)' }} />
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, #09090b, transparent, transparent)', opacity: 0.6 }} />
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, #09090b, transparent, transparent)', opacity: 0.4 }} />

        <img
          src="https://images.unsplash.com/photo-1767274859042-b0f619b8bc36?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Motorcycle"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 flex flex-col justify-end p-12 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-box icon-box-amber" style={{ width: 40, height: 40 }}>
                <Wrench className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-amber-400 font-semibold tracking-wide text-sm uppercase" style={{ fontFamily: 'var(--font-heading)' }}>MotoMate</span>
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Smart Service.<br /><span className="text-amber-400">Smarter Repairs.</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-md leading-relaxed">AI-powered diagnostics and fleet management for the modern workshop.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex items-center justify-center p-8 lg:p-16 relative z-10"
      >
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="icon-box icon-box-amber" style={{ width: 40, height: 40 }}>
              <Wrench className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-amber-400 font-bold tracking-wide text-lg" style={{ fontFamily: 'var(--font-heading)' }}>MotoMate</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Welcome back</h2>
            <p className="text-zinc-500 mb-10" style={{ fontSize: 15 }}>Sign in to access your workshop dashboard</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-zinc-400 text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@gmail.com" required
                  className="input-field w-full px-4"
                  style={{ padding: '14px 16px', fontSize: 15, borderRadius: 12 }}
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••" required
                    className="input-field w-full"
                    style={{ padding: '14px 48px 14px 16px', fontSize: 15, borderRadius: 12 }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">
                    {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-amber-500" />
                  <span className="text-zinc-400 text-sm">Remember me</span>
                </label>
                <button type="button" className="text-amber-500 text-sm hover:text-amber-400 transition-colors cursor-pointer">Forgot password?</button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="badge-red flex items-center gap-2.5 p-3.5 rounded-xl text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl transition-all flex items-center justify-center gap-2.5 disabled:opacity-70 mt-2 cursor-pointer group"
                style={{ fontSize: 15 }}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>Signing in...
                  </div>
                ) : (<>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>)}
              </motion.button>
            </form>

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--border-secondary)' }}>
              <p className="text-zinc-600 text-sm text-center">
                Demo credentials: <span className="text-zinc-400">demo@gmail.com</span> / <span className="text-zinc-400">demo123</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
