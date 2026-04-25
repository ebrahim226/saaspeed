import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Palette,
  Sparkles,
  Filter,
  ArrowUpRight,
  Check,
  Mail,
  Phone,
  Menu,
  X,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
} from "lucide-react";

// ---------- Logo asset (mark only, transparent bg). Base64 inlined for the artifact.
// For deployment, swap LOGO_SRC to a real path like "/saaspeed-logo.png".
const LOGO_SRC = "data:image/png;base64,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";

// ---------- Global styles ----------
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --bg-0: #050505;
      --bg-1: #0A0A0A;
      --bg-2: #111111;
      --bg-3: #151515;
      --text-primary: #FFFFFF;
      --text-secondary: #B3B3B3;
      --text-muted: #6B6B6B;
      --border-default: rgba(255,255,255,0.08);
      --border-hover: rgba(255,255,255,0.18);
      --silver: #C0C0C0;
      --accent: #FF3B30;
      --accent-glow: rgba(255,59,48,0.5);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { background: var(--bg-0); color: var(--text-primary); }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    .font-display { font-family: 'Montserrat', sans-serif; letter-spacing: -0.02em; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }

    /* SaaSpeed wordmark: Saa bold + Speed light */
    .wordmark-saa { font-family: 'Montserrat', sans-serif; font-weight: 800; letter-spacing: -0.02em; }
    .wordmark-speed { font-family: 'Montserrat', sans-serif; font-weight: 300; letter-spacing: -0.01em; }

    /* Grid backgrounds */
    .grid-bg {
      background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 64px 64px;
    }
    .grid-bg-fine {
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    /* Silver text gradient */
    .silver-text {
      background: linear-gradient(180deg, #FFFFFF 0%, #D8D8D8 40%, #8A8A8A 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    /* Card */
    .card {
      background: var(--bg-2);
      border: 1px solid var(--border-default);
      transition: border-color 220ms ease, background 220ms ease, transform 220ms ease;
      position: relative;
    }
    .card:hover {
      border-color: var(--border-hover);
      background: var(--bg-3);
    }

    /* Primary CTA */
    .cta-pill {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      border-radius: 999px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #FFFFFF;
      background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
      border: 1px solid rgba(192,192,192,0.35);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      cursor: pointer;
      transition: all 240ms ease;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
      text-decoration: none;
      overflow: hidden;
    }
    .cta-pill:hover {
      border-color: rgba(192,192,192,0.75);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.14),
        0 0 40px rgba(192,192,192,0.22),
        0 0 0 1px rgba(192,192,192,0.12);
      transform: translateY(-1px);
    }
    .cta-pill .shine {
      position: absolute; inset: 0;
      border-radius: 999px;
      background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.14) 50%, transparent 70%);
      background-size: 200% 100%;
      background-position: 100% 0;
      transition: background-position 650ms ease;
      pointer-events: none;
    }
    .cta-pill:hover .shine { background-position: -100% 0; }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 22px;
      border-radius: 8px;
      border: 1px solid var(--border-default);
      background: transparent;
      color: var(--text-secondary);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 200ms ease;
      text-decoration: none;
    }
    .btn-ghost:hover { color: #fff; border-color: var(--border-hover); background: rgba(255,255,255,0.02); }

    .dot { width: 6px; height: 6px; border-radius: 999px; display: inline-block; }
    .dot.live { background: var(--accent); box-shadow: 0 0 10px var(--accent-glow); animation: pulse 2s ease-in-out infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }

    /* Negative delta — red, used in Evidence cards when metric direction is bad */
    .delta-down { color: var(--accent) !important; border-color: rgba(255,59,48,0.35) !important; }

    /* Registration mark — small red glyph in section labels (technical drawing feel) */
    .reg-mark { color: var(--accent); font-family: 'JetBrains Mono', monospace; font-size: 10px; opacity: 0.85; }

    /* Form error state */
    .field-error input, .field-error textarea { border-color: rgba(255,59,48,0.5) !important; }
    .field-error-msg { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--accent); margin-top: 6px; letter-spacing: 0.04em; }

    html { scroll-behavior: smooth; }
    section { scroll-margin-top: 80px; }

    input, textarea { background: transparent; border: none; outline: none; color: #fff; font-family: inherit; }
    input::placeholder, textarea::placeholder { color: var(--text-muted); }

    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .marquee-track { display: flex; width: max-content; animation: marquee 45s linear infinite; }

    @keyframes scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }

    .metric-card { position: relative; overflow: hidden; }
    .metric-card::before {
      content: "";
      position: absolute;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(192,192,192,0.1), transparent 40%);
      opacity: 0;
      transition: opacity 400ms ease;
      pointer-events: none;
    }
    .metric-card:hover::before { opacity: 1; }

    .footer-link { font-size: 13px; color: var(--text-muted); text-decoration: none; transition: color 180ms ease; }
    .footer-link:hover { color: #fff; }
  `}</style>
);

// ---------- Logo + Wordmark ----------
const LogoMark = ({ size = 28 }) => (
  <img src="/logo.png" alt="" width={size} height={size} style={{ display: "block", objectFit: "contain" }} />
);

const Wordmark = ({ fontSize = 17 }) => (
  <span style={{ fontSize, lineHeight: 1, color: "#fff" }}>
    <span className="wordmark-saa">Saa</span>
    <span className="wordmark-speed">Speed</span>
  </span>
);

const LogoLockup = ({ markSize = 28, fontSize = 17 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <LogoMark size={markSize} />
    <Wordmark fontSize={fontSize} />
  </div>
);

// ---------- Count-up ----------
const CountUp = ({ end, prefix = "", suffix = "", duration = 1.8 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, end, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {Math.round(value).toLocaleString()}
      {suffix}
    </span>
  );
};

// ---------- Smooth scroll helper (works inside iframes / artifact sandbox) ----------
const smoothScrollTo = (hash) => (e) => {
  e.preventDefault();
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    const offset = 72; // account for fixed nav
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  } else if (hash === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// ---------- Nav ----------
const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { label: "Home", href: "#home" },
    { label: "How It Works", href: "#how" },
    { label: "Evidence", href: "#evidence" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: "all 240ms ease",
        borderBottom: `1px solid ${scrolled ? "var(--border-default)" : "transparent"}`,
        background: scrolled ? "rgba(5,5,5,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#home"
          onClick={smoothScrollTo("#home")}
          style={{ textDecoration: "none", color: "#fff", cursor: "pointer" }}
        >
          <LogoLockup markSize={28} fontSize={17} />
        </a>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={smoothScrollTo(l.href)}
              style={{
                color: "var(--text-secondary)",
                fontSize: 13,
                fontWeight: 500,
                padding: "8px 14px",
                borderRadius: 6,
                textDecoration: "none",
                transition: "color 180ms ease, background 180ms ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a
            href="https://calendly.com/saaspeed"
            target="_blank"
            rel="noreferrer"
            className="cta-pill desktop-cta"
          >
            <span className="dot live" />
            <span>Book a Call</span>
            <span className="shine" />
          </a>
          <button
            className="mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            style={{
              background: "transparent",
              border: "1px solid var(--border-default)",
              color: "#fff",
              borderRadius: 8,
              padding: 8,
              cursor: "pointer",
              display: "none",
            }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              borderTop: "1px solid var(--border-default)",
              background: "rgba(5,5,5,0.95)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div style={{ padding: "12px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => {
                    setOpen(false);
                    smoothScrollTo(l.href)(e);
                  }}
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 14,
                    padding: "12px 4px",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--border-default)",
                    cursor: "pointer",
                  }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://calendly.com/saaspeed"
                target="_blank"
                rel="noreferrer"
                className="cta-pill"
                style={{ marginTop: 16, justifyContent: "center" }}
              >
                <span className="dot live" />
                <span>Book a Call</span>
                <span className="shine" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </nav>
  );
};

// ---------- 1 · HERO ----------
// Compact pipeline mini-preview shown to the right of the hero content
const HeroPipelinePreview = () => {
  const stages = [
    { code: "01", title: "Audit" },
    { code: "02", title: "Strategy" },
    { code: "03", title: "Execution" },
    { code: "04", title: "Scale" },
  ];
  const [active, setActive] = useState(2);
  useEffect(() => {
    const t = setInterval(() => setActive((s) => (s + 1) % stages.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 12,
        border: "1px solid var(--border-default)",
        background: "var(--bg-2)",
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          padding: "10px 16px",
          borderBottom: "1px solid var(--border-default)",
          background: "var(--bg-3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: 10,
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            letterSpacing: "0.1em",
          }}
        >
          <span className="dot live" />
          PIPELINE · LIVE
        </div>
        <div className="font-mono" style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          {active + 1}/{stages.length}
        </div>
      </div>
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {stages.map((s, i) => {
          const isActive = i === active;
          const passed = i < active;
          return (
            <div
              key={s.code}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 8,
                border: `1px solid ${isActive ? "rgba(192,192,192,0.35)" : "var(--border-default)"}`,
                background: isActive ? "rgba(192,192,192,0.04)" : "var(--bg-1)",
                transition: "all 350ms ease",
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: 10,
                  color: passed ? "#C0C0C0" : isActive ? "#fff" : "var(--text-muted)",
                  letterSpacing: "0.1em",
                  minWidth: 18,
                }}
              >
                {s.code}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: isActive || passed ? "#fff" : "var(--text-secondary)",
                  fontFamily: "Montserrat, sans-serif",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {s.title}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: "var(--bg-3)",
                  borderRadius: 2,
                  overflow: "hidden",
                  maxWidth: 80,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: passed ? "100%" : isActive ? "65%" : "0%",
                    background: "linear-gradient(90deg, #6B6B6B, #C0C0C0)",
                    transition: "width 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </div>
              {passed && <Check size={11} color="#C0C0C0" />}
              {isActive && <span className="dot live" />}
            </div>
          );
        })}
        <div
          style={{
            marginTop: 8,
            paddingTop: 12,
            borderTop: "1px solid var(--border-default)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="font-mono" style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            MRR
          </span>
          <span
            className="font-display"
            style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", color: "#C0C0C0" }}
          >
            +220%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => (
  <section
    id="home"
    style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      background: "var(--bg-0)",
    }}
  >
    <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.8 }} />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 800px 500px at 25% 40%, rgba(192,192,192,0.07), transparent 70%)",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: 160,
        background: "linear-gradient(180deg, var(--bg-0), transparent)",
        pointerEvents: "none",
      }}
    />

    <div className="hero-grid">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 14px",
            borderRadius: 999,
            border: "1px solid var(--border-default)",
            background: "rgba(255,255,255,0.02)",
            fontSize: 11,
            color: "var(--text-secondary)",
            marginBottom: 28,
          }}
          className="font-mono"
        >
          <span className="dot live" />
          <span style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Accepting new SaaS partners · 2026
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 48,
            height: 1,
            background: "var(--accent)",
            opacity: 0.6,
            transformOrigin: "left",
            marginBottom: 20,
          }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display silver-text"
          style={{
            fontSize: "clamp(40px, 6.5vw, 78px)",
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            marginBottom: 28,
          }}
        >
          Scale SaaS Revenue at<br />Terminal Velocity.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(15px, 1.5vw, 17px)",
            color: "var(--text-secondary)",
            maxWidth: 540,
            lineHeight: 1.6,
            marginBottom: 36,
          }}
        >
          5 SaaS partners. $200K+ ARR added. 47% lower CAC. One team that owns acquisition,
          branding, funnels, and creatives end-to-end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}
        >
          <a href="https://calendly.com/saaspeed" target="_blank" rel="noreferrer" className="cta-pill">
            <span>Get Started</span>
            <ArrowUpRight size={15} />
            <span className="shine" />
          </a>
          <a href="#how" onClick={smoothScrollTo("#how")} className="btn-ghost">
            See how it works
          </a>
        </motion.div>
      </div>

      <div className="hero-preview">
        <HeroPipelinePreview />
      </div>
    </div>

    <style>{`
      .hero-grid {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        padding: 140px 24px 100px;
        width: 100%;
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
        gap: 64px;
        align-items: center;
      }
      @media (max-width: 960px) {
        .hero-grid { grid-template-columns: 1fr; gap: 48px; padding: 110px 24px 80px; }
        .hero-preview { max-width: 480px; }
      }
    `}</style>
  </section>
);

// ---------- 2 · PROOF METRICS ----------
const ProofMetrics = () => {
  const metrics = [
    { label: "Growth Delivered", value: 220, suffix: "%+", icon: TrendingUp, note: "Avg MRR lift" },
    { label: "SaaS Companies Scaled", value: 5, suffix: "+", icon: Users, note: "Active partners" },
    { label: "ARR Generated", value: 200, prefix: "$", suffix: "K+", icon: DollarSign, note: "Revenue added" },
    { label: "Avg CAC Reduction", value: 47, suffix: "%", icon: Activity, note: "Across deployments" },
  ];

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="proof"
      style={{
        background: "var(--bg-1)",
        borderTop: "1px solid var(--border-default)",
        borderBottom: "1px solid var(--border-default)",
        padding: "72px 24px",
        position: "relative",
      }}
    >
      <div className="grid-bg-fine" style={{ position: "absolute", inset: 0, opacity: 0.25 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
          }}
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={handleMouseMove}
              className="card metric-card"
              style={{
                borderRadius: 12,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 18,
                minHeight: 180,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "linear-gradient(135deg, rgba(192,192,192,0.14), rgba(192,192,192,0.02))",
                    border: "1px solid var(--border-default)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <m.icon size={16} color="#C0C0C0" />
                </div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {m.note}
                </span>
              </div>
              <div
                className="font-display silver-text"
                style={{
                  fontSize: "clamp(36px, 4.5vw, 48px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                }}
              >
                <CountUp end={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  paddingTop: 14,
                  borderTop: "1px solid var(--border-default)",
                  marginTop: "auto",
                }}
              >
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Section label ----------
const SectionLabel = ({ kicker, title, description }) => (
  <div style={{ marginBottom: 56, maxWidth: 760 }}>
    <div
      className="font-mono"
      style={{
        fontSize: 11,
        color: "#C0C0C0",
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }} aria-hidden>
        <circle cx="5" cy="5" r="3.5" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.85" />
        <line x1="5" y1="0" x2="5" y2="3" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
        <line x1="5" y1="7" x2="5" y2="10" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
        <line x1="0" y1="5" x2="3" y2="5" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
        <line x1="7" y1="5" x2="10" y2="5" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
      </svg>
      <span
        style={{
          width: 18,
          height: 1,
          background: "linear-gradient(90deg, transparent, #C0C0C0)",
          display: "inline-block",
        }}
      />
      {kicker}
    </div>
    <h2
      className="font-display"
      style={{
        fontSize: "clamp(30px, 4.5vw, 48px)",
        fontWeight: 700,
        lineHeight: 1.08,
        letterSpacing: "-0.025em",
        marginBottom: 18,
      }}
    >
      {title}
    </h2>
    {description && (
      <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6 }}>{description}</p>
    )}
  </div>
);

// ---------- 3 · HOW IT WORKS ----------
const HowItWorks = () => {
  const steps = [
    { code: "01", title: "Audit", desc: "We look at your funnel, ads, and channels to find what's leaking revenue.", duration: "Week 1" },
    { code: "02", title: "Strategy", desc: "A clear plan: channels, offer, targets. Nothing ships without a map.", duration: "Week 1" },
    { code: "03", title: "Execution", desc: "Ads, branding, funnels, and creatives deployed in parallel by one team.", duration: "Week 2+" },
    { code: "04", title: "Scale", desc: "We double down on what works. Compound growth month over month.", duration: "Ongoing" },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const pipelineRef = useRef(null);
  const inView = useInView(pipelineRef, { margin: "-100px" });

  useEffect(() => {
    if (!inView || paused) return;
    const t = setInterval(() => setActiveStep((s) => (s + 1) % steps.length), 2600);
    return () => clearInterval(t);
  }, [inView, paused]);

  const services = [
    {
      icon: Megaphone,
      title: "Social Media Marketing",
      desc: "Organic and paid social that builds audience, trust, and pipeline.",
    },
    {
      icon: Palette,
      title: "Branding",
      desc: "Identity systems that make your SaaS feel premium and memorable.",
    },
    {
      icon: Filter,
      title: "Funnels",
      desc: "Landing pages, onboarding, and lifecycle flows built to convert.",
    },
    {
      icon: Sparkles,
      title: "Creatives",
      desc: "Ad creatives, videos, and visuals at the speed of experimentation.",
    },
  ];

  return (
    <section
      id="how"
      style={{
        background: "var(--bg-0)",
        padding: "120px 24px",
        position: "relative",
        borderTop: "1px solid var(--border-default)",
      }}
    >
      <div className="grid-bg-fine" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <SectionLabel
          kicker="[ 01 ] · How It Works"
          title="A simple four-stage system."
          description="Every engagement runs through the same pipeline. Clear milestones, clear outputs, clear ownership."
        />

        {/* Pipeline */}
        <div
          ref={pipelineRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            borderRadius: 12,
            border: "1px solid var(--border-default)",
            background: "var(--bg-2)",
            overflow: "hidden",
            marginBottom: 80,
          }}
        >
          <div
            style={{
              padding: "12px 20px",
              borderBottom: "1px solid var(--border-default)",
              background: "var(--bg-3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                letterSpacing: "0.08em",
              }}
            >
              <span className="dot live" /> PIPELINE · {paused ? "PAUSED" : "LIVE"}
            </div>
            <div className="font-mono" style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em" }}>
              STAGE {activeStep + 1} / {steps.length}
            </div>
          </div>

          <div style={{ padding: 28 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
              {steps.map((s, i) => {
                const active = i === activeStep;
                const passed = i < activeStep;
                return (
                  <div
                    key={s.code}
                    onClick={() => setActiveStep(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveStep(i); }}
                    style={{
                      padding: 20,
                      borderRadius: 10,
                      border: `1px solid ${active ? "rgba(192,192,192,0.4)" : "var(--border-default)"}`,
                      background: active ? "rgba(192,192,192,0.04)" : "var(--bg-1)",
                      transition: "all 400ms ease",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    {active && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0, bottom: 0,
                          width: "30%",
                          left: 0,
                          background: "linear-gradient(90deg, transparent, rgba(192,192,192,0.08), transparent)",
                          animation: "scan 2s linear infinite",
                        }}
                      />
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: 11,
                          color: passed ? "#C0C0C0" : active ? "#fff" : "var(--text-muted)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {s.code}
                      </span>
                      {passed && <Check size={12} color="#C0C0C0" />}
                      {active && <span className="dot live" />}
                    </div>
                    <h4
                      className="font-display"
                      style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.01em" }}
                    >
                      {s.title}
                    </h4>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: 16 }}>
                      {s.desc}
                    </p>
                    <div
                      style={{
                        height: 2,
                        background: "var(--bg-3)",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: passed ? "100%" : active ? "65%" : "0%",
                          background: "linear-gradient(90deg, #6B6B6B, #C0C0C0)",
                          transition: "width 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      />
                    </div>
                    <div
                      className="font-mono"
                      style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 10, letterSpacing: "0.1em" }}
                    >
                      {s.duration.toUpperCase()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Services */}
        <div style={{ marginBottom: 40 }}>
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: 14,
            }}
          >
            What we build for you.
          </h3>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 640, lineHeight: 1.6 }}>
            Four services, one team. Everything runs in sync — no agency handoffs.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="card"
              style={{
                borderRadius: 12,
                padding: 26,
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, rgba(192,192,192,0.14), rgba(192,192,192,0.02))",
                  border: "1px solid var(--border-default)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <s.icon size={18} color="#C0C0C0" />
              </div>
              <h4 className="font-display" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em" }}>
                {s.title}
              </h4>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- 4 · EVIDENCE ----------
const Evidence = () => {
  const results = [
    {
      client: "acme-saas",
      metric: "MRR",
      before: "$6K",
      after: "$19K",
      delta: "+216%",
      window: "90 days",
      windowDays: 90,
      chart: [6, 7, 9, 11, 12, 14, 15, 17, 18, 19],
      isNegativeDelta: false,
    },
    {
      client: "quantform.io",
      metric: "Paid CAC",
      before: "$410",
      after: "$148",
      delta: "−64%",
      window: "120 days",
      windowDays: 120,
      chart: [40, 38, 35, 30, 28, 24, 20, 18, 16, 14],
      isNegativeDelta: true,
    },
    {
      client: "nodecrate",
      metric: "Trial → Paid",
      before: "4.1%",
      after: "11.8%",
      delta: "+188%",
      window: "60 days",
      windowDays: 60,
      chart: [4, 5, 6, 7, 8, 8, 9, 10, 11, 12],
      isNegativeDelta: false,
    },
  ];

  const proofStrip = [
    { name: "Quantform", metric: "−64% CAC", window: "120d" },
    { name: "Nodecrate", metric: "+188% T→P", window: "60d" },
    { name: "Shiptide", metric: "+220% MRR", window: "90d" },
    { name: "Parallax", metric: "+140% Pipeline", window: "75d" },
    { name: "Meridian", metric: "+95% Activation", window: "45d" },
  ];

  const MiniChart = ({ data, windowDays = 90, negative = false }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const w = 240;
    const h = 64;
    const points = data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / range) * h;
        return `${x},${y}`;
      })
      .join(" ");
    const id = `g-${data.join("-")}`;
    const stroke = negative ? "var(--accent)" : "#C0C0C0";
    const stopColor = negative ? "#FF3B30" : "#C0C0C0";
    const midDay = Math.round(windowDays / 2);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: "block" }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stopColor} stopOpacity={negative ? "0.28" : "0.35"} />
              <stop offset="100%" stopColor={stopColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,${h} ${points} ${w},${h}`} fill={`url(#${id})`} />
          <polyline points={points} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <div
          className="font-mono"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 9,
            color: "var(--text-muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            paddingTop: 6,
            borderTop: "1px solid var(--border-default)",
          }}
        >
          <span>Day 0</span>
          <span>Day {midDay}</span>
          <span>Day {windowDays}</span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="evidence"
      style={{
        background: "var(--bg-1)",
        padding: "120px 24px",
        borderTop: "1px solid var(--border-default)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel
          kicker="[ 02 ] · Evidence"
          title="Shipped outcomes."
          description="A snapshot of what we've delivered for SaaS partners. Every number ties to a real deployment and real revenue impact."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
            marginBottom: 80,
          }}
        >
          {results.map((r, i) => (
            <motion.div
              key={r.client}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card"
              style={{ borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="font-mono" style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em" }}>
                  /{r.client}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    color: "#C0C0C0",
                    letterSpacing: "0.1em",
                    padding: "4px 8px",
                    border: "1px solid rgba(192,192,192,0.25)",
                    borderRadius: 4,
                  }}
                >
                  {r.window.toUpperCase()}
                </span>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>{r.metric}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                  <span className="font-display" style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>
                    {r.after}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "line-through" }}>
                    {r.before}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: r.isNegativeDelta ? "var(--accent)" : "#C0C0C0",
                      padding: "3px 8px",
                      border: `1px solid ${r.isNegativeDelta ? "rgba(255,59,48,0.35)" : "rgba(192,192,192,0.3)"}`,
                      borderRadius: 4,
                      background: r.isNegativeDelta ? "rgba(255,59,48,0.04)" : "transparent",
                    }}
                    className="font-mono"
                  >
                    {r.delta}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: "auto" }}>
                <MiniChart data={r.chart} windowDays={r.windowDays} negative={r.isNegativeDelta} />
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p
            className="font-mono"
            style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.14em", textTransform: "uppercase" }}
          >
            Trusted by high-growth SaaS companies
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 1,
            background: "var(--border-default)",
            border: "1px solid var(--border-default)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {proofStrip.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                background: "var(--bg-1)",
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  className="font-display"
                  style={{ fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}
                >
                  {p.name}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    padding: "2px 6px",
                    border: "1px solid var(--border-default)",
                    borderRadius: 3,
                  }}
                >
                  {p.window.toUpperCase()}
                </span>
              </div>
              <span
                className="font-mono"
                style={{
                  fontSize: 13,
                  color: "#C0C0C0",
                  letterSpacing: "0.02em",
                }}
              >
                {p.metric}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- 5 · TESTIMONIALS ----------
const Testimonials = () => {
  const items = [
    {
      quote:
        "SaaSpeed felt like hiring an in-house growth team overnight. They shipped in weeks what we couldn't unlock in a year.",
      name: "Alex Moreno",
      role: "Co-Founder, Quantform",
    },
    {
      quote:
        "The audit alone was worth the engagement. Clear plan, fast execution, revenue followed.",
      name: "Priya Shah",
      role: "Head of Growth, Nodecrate",
    },
    {
      quote:
        "We stopped guessing on ads. CAC is down 64% and we finally trust our numbers.",
      name: "Marcus Reid",
      role: "Founder, Shiptide",
    },
  ];
  return (
    <section
      id="testimonials"
      style={{
        background: "var(--bg-0)",
        padding: "120px 24px",
        borderTop: "1px solid var(--border-default)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel kicker="[ 03 ] · Testimonials" title="From the founders we work with." />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card"
              style={{ borderRadius: 12, padding: 28, display: "flex", flexDirection: "column", gap: 20, minHeight: 240 }}
            >
              <div className="font-display" style={{ fontSize: 32, color: "#C0C0C0", lineHeight: 1, opacity: 0.6 }}>
                &#8220;
              </div>
              <p style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.55, flex: 1 }}>
                {t.quote}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  paddingTop: 18,
                  borderTop: "1px solid var(--border-default)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    background: "linear-gradient(135deg, #2a2a2a, #111)",
                    border: "1px solid var(--border-default)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C0C0C0",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  className="font-display"
                >
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- 6 · CONTACT ----------
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", company: "", message: "" });
    setErrors({});
  };

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  return (
    <section
      id="contact"
      style={{
        background: "var(--bg-1)",
        padding: "120px 24px",
        borderTop: "1px solid var(--border-default)",
        position: "relative",
      }}
    >
      <div className="grid-bg-fine" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <SectionLabel
          kicker="[ 04 ] · Contact"
          title="Let's build your growth system."
          description="Book a call or send a message. Every inquiry is reviewed within 24 hours."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
            gap: 20,
          }}
          className="contact-grid"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              className="card"
              style={{
                borderRadius: 12,
                padding: 26,
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
            >
              <a href="mailto:info@saaspeed.com" style={{ textDecoration: "none", color: "#fff" }}>
                <div
                  className="font-mono"
                  style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.14em", marginBottom: 6 }}
                >
                  EMAIL
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15 }}>
                  <Mail size={15} color="#C0C0C0" />
                  info@saaspeed.com
                </div>
              </a>
              <a href="tel:+31684545705" style={{ textDecoration: "none", color: "#fff" }}>
                <div
                  className="font-mono"
                  style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.14em", marginBottom: 6 }}
                >
                  PHONE
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15 }}>
                  <Phone size={15} color="#C0C0C0" />
                  +31 6 84545705
                </div>
              </a>
              <div>
                <div
                  className="font-mono"
                  style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.14em", marginBottom: 10 }}
                >
                  RESPONSE TIME
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
                  <span className="dot live" />
                  &lt; 24 hours
                </div>
              </div>
            </div>

            <a
              href="https://calendly.com/saaspeed"
              target="_blank"
              rel="noreferrer"
              className="cta-pill"
              style={{ justifyContent: "center", padding: "14px 22px" }}
            >
              <span>Book a Call on Calendly</span>
              <ArrowUpRight size={15} />
              <span className="shine" />
            </a>
          </div>

          <div
            className="card"
            style={{ borderRadius: 12, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-row">
              <Field
                label="NAME"
                value={form.name}
                onChange={(v) => updateField("name", v)}
                placeholder="Your name"
                error={errors.name}
              />
              <Field
                label="EMAIL"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                placeholder="you@company.com"
                error={errors.email}
              />
            </div>
            <Field
              label="COMPANY"
              value={form.company}
              onChange={(v) => updateField("company", v)}
              placeholder="Your SaaS"
            />
            <div className={errors.message ? "field-error" : ""}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.14em" }}
                >
                  MESSAGE
                </span>
                {errors.message && (
                  <span className="font-mono field-error-msg" style={{ margin: 0 }}>
                    {errors.message.toUpperCase()}
                  </span>
                )}
              </div>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder="Tell us about your product and what you're trying to unlock."
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "var(--bg-1)",
                  border: `1px solid ${errors.message ? "rgba(255,59,48,0.5)" : "var(--border-default)"}`,
                  borderRadius: 8,
                  fontSize: 14,
                  color: "#fff",
                  resize: "vertical",
                  fontFamily: "inherit",
                  transition: "border-color 180ms ease",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = errors.message ? "rgba(255,59,48,0.7)" : "var(--border-hover)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.message ? "rgba(255,59,48,0.5)" : "var(--border-default)")}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="cta-pill"
              style={{ alignSelf: "flex-start", border: "1px solid rgba(192,192,192,0.5)" }}
            >
              <span>{submitted ? "Sent · we'll be in touch" : "Send Message"}</span>
              {submitted ? <Check size={15} /> : <ArrowUpRight size={15} />}
              <span className="shine" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

const Field = ({ label, value, onChange, placeholder, error }) => (
  <div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
      }}
    >
      <span
        className="font-mono"
        style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.14em" }}
      >
        {label}
      </span>
      {error && (
        <span className="font-mono field-error-msg" style={{ margin: 0 }}>
          {error.toUpperCase()}
        </span>
      )}
    </div>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "12px 14px",
        background: "var(--bg-1)",
        border: `1px solid ${error ? "rgba(255,59,48,0.5)" : "var(--border-default)"}`,
        borderRadius: 8,
        fontSize: 14,
        color: "#fff",
        transition: "border-color 180ms ease",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = error ? "rgba(255,59,48,0.7)" : "var(--border-hover)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = error ? "rgba(255,59,48,0.5)" : "var(--border-default)")}
    />
  </div>
);

// ---------- Footer ----------
const Footer = () => (
  <footer
    style={{
      background: "var(--bg-0)",
      borderTop: "1px solid var(--border-default)",
      padding: "72px 24px 32px",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -1,
        left: "50%",
        transform: "translateX(-50%)",
        width: 64,
        height: 1,
        background: "var(--accent)",
        opacity: 0.5,
      }}
    />
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr)",
          gap: 40,
          marginBottom: 48,
        }}
        className="footer-grid"
      >
        <div>
          <LogoLockup markSize={26} fontSize={17} />
          <p
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginTop: 18,
              maxWidth: 320,
            }}
          >
            A growth system for SaaS founders. Acquisition, branding, funnels, and creatives —
            run by one team.
          </p>
        </div>

        <div>
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              color: "var(--text-muted)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Navigate
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="#how" onClick={smoothScrollTo("#how")} className="footer-link">How It Works</a>
            <a href="#evidence" onClick={smoothScrollTo("#evidence")} className="footer-link">Evidence</a>
            <a href="#testimonials" onClick={smoothScrollTo("#testimonials")} className="footer-link">Testimonials</a>
            <a href="#contact" onClick={smoothScrollTo("#contact")} className="footer-link">Contact</a>
          </div>
        </div>

        <div>
          <div
            className="font-mono"
            style={{
              fontSize: 10,
              color: "var(--text-muted)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Reach Us
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="mailto:info@saaspeed.com" className="footer-link">info@saaspeed.com</a>
            <a href="tel:+31684545705" className="footer-link">+31 6 84545705</a>
            <a href="https://calendly.com/saaspeed" target="_blank" rel="noreferrer" className="footer-link">
              Book a call ↗
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          paddingTop: 24,
          borderTop: "1px solid var(--border-default)",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="font-mono" style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
          © 2026 SaaSpeed · All systems operational
        </span>
        <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          <a href="#" className="footer-link" style={{ fontSize: 12 }}>Privacy</a>
          <a href="#" className="footer-link" style={{ fontSize: 12 }}>Terms</a>
          <span
            className="font-mono"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
            }}
          >
            <span className="dot live" /> ONLINE
          </span>
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 720px) {
        .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      }
    `}</style>
  </footer>
);

// ---------- Root ----------
export default function SaaSpeed() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <main>
        <Hero />
        <ProofMetrics />
        <HowItWorks />
        <Evidence />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
