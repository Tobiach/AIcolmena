import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight, Mic, Brain, TrendingUp, Play,
  CheckCircle2, Target, Users, Shield,
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────
// Nada acá es una estadística de mercado ni un testimonio — producto
// pre-lanzamiento, 0 usuarios. La honestidad es el diseño.

const STEPS = [
  { num: '01', label: 'Le hablás', desc: 'Como a un amigo, en tu español. Tareas, gastos, reuniones, ideas — sin tipear nada.' },
  { num: '02', label: 'Colmena recuerda', desc: 'Cada cosa queda en su lugar, sin que toques nada. Con el tiempo, también recuerda quién aparece en lo que contás.' },
  { num: '03', label: 'Con el tiempo, pregunta', desc: '"Che, ¿notaste que...?" — Vos decidís si tiene razón. Nunca una afirmación, siempre una pregunta abierta.' },
];

const FEATURES = [
  { icon: Mic,        label: 'Voz, no formularios',  desc: 'Dictás tareas, gastos y reuniones en tu español. Sin tipear.' },
  { icon: Brain,      label: 'Memoria emocional',     desc: 'Aprende de las personas y patrones que mencionás, con el tiempo.' },
  { icon: Users,      label: 'Gente que te importa',  desc: 'Un lugar para la gente de tu vida — trabajo y personal, sin mezclarlos.' },
  { icon: TrendingUp, label: 'Tu plata, clara',       desc: 'Balance, ingresos y gastos. Todo visible de un vistazo.' },
  { icon: Target,     label: 'Hábitos que sostenés',  desc: 'Rutinas y racha, sin vueltas.' },
  { icon: Shield,     label: 'Tus datos, tuyos',      desc: 'Vive en tu teléfono. Lo sensible se activa solo si vos querés.' },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Landing() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      setSent(true);
      setEmail('');
    } catch {}
    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>

      {/* ── STICKY NAV ── */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(18,14,8,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 560, color: 'var(--text-primary)' }}>
            colmena
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden sm:block text-[13px] font-medium text-white/40 hover:text-white/70 transition-colors"
            >
              Sumarme
            </button>
            <button
              onClick={() => navigate('/onboarding')}
              className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
              style={{ background: 'var(--honey-ghost)', color: 'var(--honey-bright)', border: '1px solid var(--honey-border)' }}
            >
              Entrar
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-14 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="chip-state mb-6">Beta abierta</span>

            <h1 className="text-4xl sm:text-5xl tracking-tight leading-[1.15] mb-5" style={{ fontFamily: 'var(--font-display)', fontWeight: 560 }}>
              Un <span className="hl-memory">segundo cerebro</span><br />
              que se acuerda de<br />
              lo que te importa.
            </h1>

            <p className="text-white/55 text-base leading-relaxed mb-8 max-w-md">
              Le contás tu día por voz — tareas, gastos, ideas, con quién estuviste, cómo venís.
              Colmena lo guarda, lo ordena y, con el tiempo, te muestra patrones que solo no ves.
              Siempre como pregunta. Nunca como sentencia.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/onboarding')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm"
                style={{ background: 'var(--honey-core)', color: 'var(--text-on-honey)', boxShadow: 'var(--glow-honey)' }}
              >
                Quiero probarlo <ArrowRight size={14} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm text-white/60"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
              >
                <Play size={13} /> Ver cómo funciona
              </motion.button>
            </div>
          </motion.div>

          {/* PHONE MOCKUP — una hipótesis real de ejemplo, no testimonios inventados */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div
                className="relative rounded-[2.5rem] overflow-hidden"
                style={{
                  width: 260, height: 520,
                  border: '2px solid var(--honey-border)',
                  background: 'var(--bg-surface)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
                }}
              >
                <div className="p-5 pt-10 h-full flex flex-col gap-3">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 560, color: 'var(--text-primary)' }}>
                    colmena
                  </span>

                  <div className="bm-card p-4 mt-2" style={{ border: '1px solid var(--memory-border)' }}>
                    <span className="chip-question">Colmena se pregunta</span>
                    <p className="mt-3 text-[13px] leading-relaxed" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                      Las últimas semanas, los días que hablás de <span className="hl-memory">laburo</span> también
                      aparece <span className="hl-memory">Rocío</span>. ¿Lo venís notando vos?
                    </p>
                    <div className="flex gap-2 mt-3">
                      <div className="flex-1 py-2 rounded-lg text-center text-[11px] font-semibold" style={{ background: 'var(--memory-ghost)', color: 'var(--memory-soft)' }}>Puede ser</div>
                      <div className="flex-1 py-2 rounded-lg text-center text-[11px] font-semibold" style={{ background: 'var(--bg-elevated)', color: 'var(--text-tertiary)' }}>No va por ahí</div>
                    </div>
                  </div>

                  <div className="flex-1" />

                  <div className="flex justify-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--honey-core)', boxShadow: 'var(--glow-honey)' }}
                    >
                      <Mic size={18} style={{ color: 'var(--text-on-honey)' }} />
                    </div>
                  </div>
                  <p className="text-center text-[11px]" style={{ color: 'var(--text-tertiary)' }}>Dale, contame.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="hud-sep mb-10" />
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)', fontWeight: 560 }}>
            Tres pasos. Sin fricción.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map(({ num, label, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.14 }}
              className="bm-card p-7"
            >
              <div className="text-4xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 560, color: 'var(--border-default)' }}>{num}</div>
              <p className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 560, color: 'var(--honey-soft)' }}>{label}</p>
              <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── LO QUE NO ES — bloque de confianza ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bm-card p-8 sm:p-10"
          style={{ border: '1px solid var(--memory-border)' }}
        >
          <span className="chip-question mb-4">Lo que Colmena no es</span>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed mt-4 max-w-2xl">
            No es terapia, no diagnostica, no opina de tu vida. Es memoria.
            Tus datos viven en tu teléfono y las cosas sensibles se activan solo si vos querés.
          </p>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)', fontWeight: 560 }}>
            Un sistema completo, no una app más.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bm-card p-6"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'var(--honey-ghost)', border: '1px solid var(--honey-border)' }}
              >
                <Icon size={18} style={{ color: 'var(--honey-core)' }} />
              </div>
              <p className="font-bold text-sm text-white mb-1.5">{label}</p>
              <p className="text-[12px] text-white/40 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)', fontWeight: 560 }}>
            Mirá cómo funciona.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden aspect-video flex items-center justify-center cursor-pointer"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}
          onClick={() => navigate('/onboarding')}
        >
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'var(--honey-ghost)', border: '1.5px solid var(--honey-border)' }}
            >
              <Play size={28} style={{ color: 'var(--honey-core)' }} />
            </div>
            <div className="text-center">
              <p className="font-bold text-white/70 text-sm mb-1">Probá en vivo →</p>
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Gratis, sin tarjeta</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── EMAIL CTA ── */}
      <section id="waitlist" className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bm-card p-10 text-center space-y-7"
          style={{ border: '1px solid var(--honey-border)' }}
        >
          <div>
            <h2 className="text-2xl sm:text-3xl tracking-tight mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 560 }}>
              Entrá gratis, mientras dure la beta.
            </h2>
            <p className="text-white/40 text-sm max-w-sm mx-auto leading-relaxed">
              Dejanos tu mail si querés que te avisemos de novedades. No hace falta para entrar ahora.
            </p>
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 py-6"
              style={{ color: 'var(--success)' }}
            >
              <CheckCircle2 size={22} />
              <span className="font-semibold text-sm">Anotado. Te contactamos pronto.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 rounded-xl px-5 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition-all"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
              />
              <button
                type="submit" disabled={loading}
                className="px-7 py-3.5 rounded-xl font-bold text-sm transition-all shrink-0 active:scale-95"
                style={{ background: 'var(--honey-core)', color: 'var(--text-on-honey)', boxShadow: 'var(--glow-honey)' }}
              >
                {loading ? '...' : 'Anotarme'}
              </button>
            </form>
          )}

          <p className="text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
            ¿Ya tenés acceso?{' '}
            <button
              onClick={() => navigate('/onboarding')}
              className="underline hover:opacity-70 transition-opacity"
              style={{ color: 'var(--honey-soft)' }}
            >
              Entrá directo →
            </button>
          </p>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 max-w-5xl mx-auto px-6 pb-10">
        <div className="hud-sep mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 560, color: 'var(--text-primary)' }}>
            colmena
          </span>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            © 2026 · hecho para emprendedores de LATAM
          </p>
        </div>
      </footer>
    </div>
  );
}
