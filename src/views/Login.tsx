import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, accountExists } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailNext = () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Ingresá un email válido');
      return;
    }
    if (!accountExists(trimmed)) {
      setError('Ese email no me suena. ¿Será otro, o es tu primera vez?');
      return;
    }
    setError('');
    setStep('password');
  };

  const handleLogin = () => {
    setLoading(true);
    const result = login(email.trim().toLowerCase(), password);
    setLoading(false);
    if (result === 'ok') {
      window.location.href = '/';
    } else if (result === 'wrong_password') {
      setError('Esa contraseña no coincide. Probá de nuevo.');
    }
  };

  return (
    <div className="fixed inset-0 text-white flex items-center justify-center px-6" style={{ background: 'var(--bg-primary)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm space-y-8"
      >
        {/* Logo */}
        <div className="text-center">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 560, color: 'var(--text-primary)' }}>
            colmena
          </span>
          <h1 className="text-2xl tracking-tight mt-4 mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 560 }}>Qué bueno verte de vuelta</h1>
          <p className="text-white/40 text-sm">Entrá y seguimos donde dejamos.</p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-3 rounded-xl text-sm font-medium text-center"
            style={{ background: 'rgba(232,131,123,0.1)', border: '1px solid rgba(232,131,123,0.3)', color: 'var(--danger)' }}
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <div className="space-y-3">
          {step === 'email' ? (
            <>
              <input
                autoFocus
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleEmailNext()}
                placeholder="tu@email.com"
                className="w-full rounded-xl px-5 py-4 text-base text-white placeholder-white/30 focus:outline-none transition-all"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
              />
              <button
                onClick={handleEmailNext}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm"
                style={{ background: 'var(--honey-core)', color: 'var(--text-on-honey)', boxShadow: 'var(--glow-honey)' }}
              >
                Continuar <ArrowRight size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setStep('email'); setError(''); setPassword(''); }}
                className="text-[13px] font-medium text-white/40 hover:text-white/70 transition-colors mb-1 block"
              >
                ← {email}
              </button>
              <div className="relative">
                <input
                  autoFocus
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && !loading && password && handleLogin()}
                  placeholder="Contraseña"
                  className="w-full rounded-xl px-5 py-4 text-base text-white placeholder-white/30 focus:outline-none transition-all pr-12"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <button
                onClick={handleLogin}
                disabled={loading || !password}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all active:scale-95"
                style={{
                  background: loading || !password ? 'var(--honey-ghost)' : 'var(--honey-core)',
                  color: 'var(--text-on-honey)',
                  boxShadow: loading || !password ? 'none' : 'var(--glow-honey)',
                }}
              >
                {loading ? 'Verificando...' : <>Entrar <ArrowRight size={14} /></>}
              </button>
            </>
          )}
        </div>

        {/* Links */}
        <p className="text-center text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
          ¿Primera vez?{' '}
          <button
            onClick={() => navigate('/landing')}
            className="underline hover:opacity-70 transition-opacity"
            style={{ color: 'var(--honey-soft)' }}
          >
            Crear cuenta →
          </button>
        </p>
      </motion.div>
    </div>
  );
}
