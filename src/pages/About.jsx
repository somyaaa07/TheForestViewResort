import { useState, useEffect, useRef } from "react";

const BG    = "#c9d4cb";
const DARK  = "#041106";
const SHADE = "#d4ddd6";

function useReveal(thr = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: thr });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, style = {}, className = "" }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(32px)",
      transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let n = 0; const step = target / 55;
        const t = setInterval(() => {
          n += step;
          if (n >= target) { setVal(target); clearInterval(t); }
          else setVal(Math.floor(n));
        }, 22);
        o.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── SVG Icons ── */
const IconMap       = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>);
const IconBuilding  = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 22V12h6v10"/><path d="M9 7h1"/><path d="M14 7h1"/><path d="M9 11h1"/><path d="M14 11h1"/></svg>);
const IconMountain  = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>);
const IconPaw       = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>);
const IconBackpack  = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.9a2 2 0 0 1-1.8-1.1 2 2 0 0 0-3.6 0A2 2 0 0 1 9.9 6H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"/><path d="M8 7v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7"/><path d="M12 12v4"/><path d="M10 14h4"/></svg>);
const IconClock     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const IconRocket    = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>);
const IconUtensils  = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>);
const IconCoffee    = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>);
const IconCheck     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><polyline points="20 6 9 17 4 12"/></svg>);
const IconArrow     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>);
const IconStar      = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);

const IconFacebook  = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:15,height:15}}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const IconX         = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:15,height:15}}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.737l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);
const IconLinkedin  = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:15,height:15}}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>);
const IconInsta     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>);

const TESTIMONIALS = [
  { name: "Samuel Smith",  role: "Heritage Hunter",      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Olivia Brown",  role: "Vacation Planner",     img: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face" },
  { name: "James Miller",  role: "Corporate Guest",      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { name: "Lucas Moore",   role: "Travel Photographer",  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { name: "Ava Johnson",   role: "Lifestyle Influencer", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
];

const STEPS = [
  { step:"STEP 01", Icon: IconMap,      title:"Choose Destination",       desc:"Standing at the edge of a towering cliff, gazing at a vast desert under the open sky." },
  { step:"STEP 02", Icon: IconBackpack, title:"Select Your Package",       desc:"Listening to the rhythmic waves of the ocean can be deeply humbling and serene." },
  { step:"STEP 03", Icon: IconClock,    title:"Customize Your Itinerary", desc:"These moments remind us of the planet's beauty and the importance of preservation." },
  { step:"STEP 04", Icon: IconRocket,   title:"Book & Get Ready to Go",    desc:"Savoring new flavors creates memories that stay with you long after the trip." },
];

export default function SafarAboutPage() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % TESTIMONIALS.length), 4200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const cardWhite = {
    background: "#fff",
    borderRadius: 10,
    padding: "36px 30px",
    position: "relative",
    boxShadow: "0 2px 20px rgba(4,17,6,.07)",
    height: "100%",
    boxSizing: "border-box",
  };
  const cardDark = {
    background: DARK,
    borderRadius: 10,
    padding: "36px 30px",
    position: "relative",
    boxShadow: "0 6px 32px rgba(4,17,6,.28)",
    height: "100%",
    boxSizing: "border-box",
  };
  const iconCircle = (dark = false) => ({
    width: 52, height: 52, borderRadius: "50%",
    border: `1.5px solid ${dark ? "rgba(201,212,203,.25)" : "rgba(4,17,6,.18)"}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: 18, padding: 14, boxSizing: "border-box",
    color: dark ? BG : DARK,
  });

  return (
    <div style={{ background: BG, color: DARK, fontFamily: "'Jost', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Marcellus&display=swap');

     
        html { -webkit-text-size-adjust: 100%; }
        body { overflow-x: hidden; margin: 0; }
        img { max-width: 100%; display: block; }

        .marc { font-family: 'Marcellus', serif; }

        @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        .spin { animation: spin 8s linear infinite; }
        @keyframes mq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .mq-track { display:flex; animation:mq 28s linear infinite; width:max-content; }

        /* ── Buttons ── */
        .btn-p {
          display:inline-flex; align-items:center; gap:10px;
          background:${DARK}; color:${BG};
          border:1.5px solid ${DARK};
          padding:14px 32px; font-size:13px; font-weight:700;
          letter-spacing:.12em; text-transform:uppercase;
          cursor:pointer; transition:all .3s; text-decoration:none;
          font-family:'Jost',sans-serif;
        }
        .btn-p:hover { background:transparent; color:${DARK}; }

        /* ── Nav links ── */
        .nav-a {
          color:${DARK}; font-size:16px; font-weight:500;
          text-decoration:none; padding-bottom:2px;
          border-bottom:1.5px solid transparent; transition:border-color .25s;
        }
        .nav-a:hover { border-color:${DARK}; }

        /* ── Check rows ── */
        .ck-row {
          display:flex; align-items:center; gap:16px;
          background:rgba(4,17,6,.05); padding:16px 22px;
          transition:all .3s; margin-bottom:12px; cursor:default;
          border-radius:4px;
        }
        .ck-row:hover { background:${DARK}; color:${BG}; }
        .ck-row:hover .ck-icon svg { stroke:${BG}; }

        .read-more {
          display:inline-flex; align-items:center; gap:6px;
          font-size:12px; font-weight:700; letter-spacing:.14em;
          text-transform:uppercase; text-decoration:none;
          transition:opacity .25s; font-family:'Jost',sans-serif;
        }
        .read-more:hover { opacity:.6; }

        .dot { border:none; cursor:pointer; transition:all .3s; }
        .soc-icon { transition:background .25s !important; }
        .soc-icon:hover { background:rgba(201,212,203,.18) !important; }
        input::placeholder { color:rgba(201,212,203,.38); }
        input:focus { outline:none; }
        a { cursor:pointer; }

        /* ══════════════════════════════
           SECTION WRAPPER UTILITIES
        ══════════════════════════════ */
        .sec { padding: 110px 0; }
        .inner { max-width:1400px; margin:0 auto; padding:0 48px; }

        /* ══════════════════════════════
           NAVBAR
           — force GPU compositing layer so animated elements
             in page content never interfere with backdrop-filter
        ══════════════════════════════ */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 72px;
          background: rgba(201,212,203,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(4,17,6,.08);
          /* FIX: own compositing layer — prevents page animations bleeding in */
          transform: translateZ(0);
          will-change: transform;
        }
        .navbar-logo {
          font-family: 'Marcellus', serif;
          font-size: 20px; color: ${DARK}; text-decoration: none;
          letter-spacing: .04em; flex-shrink: 0;
        }
        .desktop-nav { display: flex; align-items: center; gap: 36px; }

        /* ══════════════════════════════
           HERO
        ══════════════════════════════ */
        .hero {
          position:relative; min-height:80vh;
          background-image:url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80');
          background-size:cover; background-position:center;
          display:flex; align-items:flex-end; padding-top:72px;
        }
        .hero-overlay { position:absolute;inset:0;background:rgba(4,17,6,.70); }
        .hero-content {
          position:relative; z-index:2;
          max-width:1400px; margin:0 auto;
          padding:0 48px 90px; width:100%;
        }
        .hero-h1 {
          font-size:clamp(32px,7vw,90px);
          color:${BG}; font-weight:400; line-height:1.08; margin-bottom:22px;
        }

        /* ══════════════════════════════
           ABOUT SECTION
           — isolation: isolate creates a stacking context
             so the spin badge is always contained within
             this section and NEVER floats above the navbar
        ══════════════════════════════ */
        .about-section {
          position: relative;
          z-index: 0;
          isolation: isolate;
        }
        .about-grid {
          display:grid;
          grid-template-columns: 360px 1fr 320px;
          gap:56px;
          align-items:start;
        }
        /* always visible — only hidden on small screens via media queries below */
        .about-img1 { display:block; }

        /* ── Spin badge wrapper: clips overflow so the badge
              never escapes the image column on any screen size ── */
        .spin-img-wrap {
          position: relative;
          /* Padding at bottom accommodates the badge overflow visually
             without letting it escape the stacking context */
          padding-bottom: 34px;
        }

        /* ══════════════════════════════
           SPIN BADGE
           — z-index 2 keeps it above the image but below navbar (999)
             isolation on .about-section ensures it never escapes
        ══════════════════════════════ */
        .spin-badge {
          position:absolute; bottom: 4px; right:-18px;
          width:clamp(80px,12vw,110px); height:clamp(80px,12vw,110px);
          border-radius:50%; background:${DARK};
          display:flex; align-items:center; justify-content:center;
          z-index: 2;
        }
        .spin-badge svg { position:absolute; width:100%; height:100%; }

        /* ══════════════════════════════
           WHY GRID  (3-column base)
        ══════════════════════════════ */
        .why-grid {
          display:grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap:24px;
        }
        .why-heading { grid-column:1/3; grid-row:1/2; }
        .card01      { grid-column:3/4; grid-row:1/2; }
        .why-avatars { grid-column:1/2; grid-row:2/3; align-self:center; }
        .card02      { grid-column:2/3; grid-row:2/3; }
        .circ1       { grid-column:3/4; grid-row:2/3; display:flex; align-items:center; justify-content:center; }
        .card03      { grid-column:1/2; grid-row:3/4; }
        .circ2       { grid-column:2/3; grid-row:3/4; display:flex; align-items:center; justify-content:center; }
        .card04      { grid-column:3/4; grid-row:3/4; }

        /* ══════════════════════════════
           STEPS
        ══════════════════════════════ */
        .steps-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        .step-item { border-right:1px solid rgba(4,17,6,.11); }
        .step-item:last-child { border-right:none; }

        /* ══════════════════════════════
           RESTAURANT
        ══════════════════════════════ */
        .rest-grid { display:grid; grid-template-columns:1fr 1.2fr 1fr; gap:36px; align-items:start; }

        /* ══════════════════════════════
           TESTIMONIALS
        ══════════════════════════════ */
        .testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }

        /* ══════════════════════════════
           COUNTER ROW
        ══════════════════════════════ */
        .counter-row { display:flex; gap:64px; flex-wrap:wrap; }
        .stat-num { font-size:clamp(44px,5vw,60px); color:${DARK}; line-height:1; }

        /* ══════════════════════════════
           MOBILE MENU BUTTON
        ══════════════════════════════ */
        .mobile-menu-btn {
          display:none;
          background:none; border:1.5px solid rgba(4,17,6,.25);
          width:44px; height:44px; cursor:pointer;
          border-radius:4px; align-items:center; justify-content:center;
          flex-direction:column; gap:5px; padding:10px;
          position:relative; z-index:1001; flex-shrink:0;
        }
        .mobile-menu-btn span {
          display:block; width:22px; height:2px;
          background:${DARK}; transition:all .3s;
        }
        .mobile-menu-btn.open span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
        .mobile-menu-btn.open span:nth-child(2) { opacity:0; }
        .mobile-menu-btn.open span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }

        /* ══════════════════════════════
           MOBILE NAV OVERLAY
        ══════════════════════════════ */
        .mobile-nav {
          display:none;
          position:fixed; inset:0; z-index:1000;
          background:${BG};
          flex-direction:column;
          padding:88px 32px 40px;
          overflow-y:auto;
        }
        .mobile-nav.open { display:flex; animation:fadeIn .25s ease; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        .mobile-nav-link {
          font-size:28px; font-weight:500; color:${DARK};
          text-decoration:none; padding:18px 0;
          border-bottom:1px solid rgba(4,17,6,.1);
          font-family:'Marcellus',serif;
          display:block;
        }
        .mobile-nav-link:last-child { border-bottom:none; }

        /* ══════════════════════════════
           RESPONSIVE — 1280px
           Only adjust padding/spacing, keep full layout intact
        ══════════════════════════════ */
        @media (max-width:1280px) {
          .inner { padding:0 40px; }
          .navbar { padding:0 40px; }
          .hero-content { padding:0 40px 80px; }
          /* Slightly tighter columns — still 3-col */
          .about-grid { grid-template-columns: 300px 1fr 280px; gap:40px; }
        }

        /* ══════════════════════════════
           RESPONSIVE — 1024px
           ★ KEEP FULL 1440px LAYOUT ★
           Only reduce paddings, fonts, column widths.
           NO grid-column-count changes here.
        ══════════════════════════════ */
        @media (max-width:1024px) {
          .inner { padding:0 32px; }
          .navbar { padding:0 32px; }
          .hero-content { padding:0 32px 72px; }
          .sec { padding:88px 0; }
          .desktop-nav { gap:20px; }
          .nav-a { font-size:14px; }

          /* About — narrower 3-col, still all 3 columns visible */
          .about-grid { grid-template-columns: 220px 1fr 220px; gap:28px; }
          /* Ensure the first image column is still shown */
          .about-img1 { display:block !important; }

          /* Why grid keeps 3 columns */
          .why-grid { grid-template-columns: 1fr 1fr 1fr; }
          /* Why grid positions unchanged (already set above) */

          /* Steps keep 4 columns */
          .steps-grid { grid-template-columns:repeat(4,1fr); }

          /* Restaurant keep 3 columns */
          .rest-grid { grid-template-columns:1fr 1.2fr 1fr; gap:28px; }

          /* Testimonials keep 3 columns */
          .testi-grid { grid-template-columns:repeat(3,1fr); }
        }

        /* ══════════════════════════════
           RESPONSIVE — 768px  (tablet portrait)
           Start simplifying layout here
        ══════════════════════════════ */
        @media (max-width:768px) {
          .sec { padding:64px 0; }
          .inner { padding:0 24px; }
          .navbar { padding:0 24px; height:64px; }
          .hero-content { padding:0 24px 56px; }
          .hero { min-height:60vh; padding-top:64px; }

          /* Nav — switch to hamburger */
          .desktop-nav { display:none !important; }
          .mobile-menu-btn { display:flex !important; }

          /* About — 2-column, hide first image col */
          .about-grid { grid-template-columns:1fr 1fr; gap:28px; }
          .about-img1 { display:none !important; }

          /* ★ HIDE circle images on tablet & mobile ★ */
          .circ1 { display:none !important; }
          .circ2 { display:none !important; }

          /* Why grid — 2 cols (circles hidden so reflow naturally) */
          .why-grid { grid-template-columns:1fr 1fr; gap:20px; }
          .why-heading { grid-column:1/3; grid-row:1/2; }
          .card01      { grid-column:2/3; grid-row:2/3; }
          .why-avatars { grid-column:1/2; grid-row:2/3; }
          .card02      { grid-column:1/2; grid-row:3/4; }
          .card03      { grid-column:2/3; grid-row:3/4; }
          .card04      { grid-column:1/2; grid-row:4/5; }

          /* Steps — 2 cols */
          .steps-grid { grid-template-columns:repeat(2,1fr); }
          .step-item { border-right:none; border-bottom:1px solid rgba(4,17,6,.11); }
          .step-item:nth-child(odd) { border-right:1px solid rgba(4,17,6,.11) !important; }
          .step-item:last-child { border-bottom:none !important; }
          .step-item:nth-last-child(2) { border-bottom:none; }

          /* Restaurant — 2 cols */
          .rest-grid { grid-template-columns:1fr 1fr; gap:24px; }
          .rest-col3 { grid-column:1/3; }

          /* Testimonials — 2 cols */
          .testi-grid { grid-template-columns:1fr 1fr; gap:20px; }
          .testi-col3 { display:none !important; }

          /* Counter */
          .counter-row { gap:32px; }

          /* Spin badge — tighter */
          .spin-badge { bottom:8px; right:-10px; }
        }

        /* ══════════════════════════════
           RESPONSIVE — 480px  (phone)
        ══════════════════════════════ */
        @media (max-width:480px) {
          .inner { padding:0 16px; }
          .navbar { padding:0 16px; height:60px; }
          .hero-content { padding:0 16px 44px; }
          .hero { min-height:72vh; padding-top:60px; }
          .sec { padding:56px 0; }

          .hero-h1 { font-size: clamp(28px, 8vw, 44px); }

          /* About — single column */
          .about-grid { grid-template-columns:1fr; gap:24px; }
          .about-img1 { display:none !important; }

          /* ★ circ1/circ2 already hidden from 768px rule ★ */

          /* Why — 1 col */
          .why-grid { grid-template-columns:1fr; gap:16px; }
          .why-heading,
          .card01, .card02, .card03, .card04,
          .why-avatars {
            grid-column:1 !important;
            grid-row:auto !important;
          }

          /* Counter stack */
          .counter-row { gap:24px; flex-direction:column; }

          /* Check rows */
          .ck-row { padding:12px 14px; gap:12px; }

          /* Spin badge */
          .spin-badge { width:72px; height:72px; bottom:8px; right:-8px; }

          /* Steps padding */
          .step-item { padding: 24px 16px !important; }

          /* Steps — 1 col on very small screens */
          .steps-grid { grid-template-columns:1fr; }
          .step-item {
            border-right:none !important;
            border-bottom:1px solid rgba(4,17,6,.11);
          }
          .step-item:last-child { border-bottom:none !important; }

          /* Restaurant — 1 col */
          .rest-grid { grid-template-columns:1fr; gap:20px; }
          .rest-col3 { grid-column:1 !important; }

          /* Testimonials — 1 col */
          .testi-grid { grid-template-columns:1fr; }
          .testi-col2, .testi-col3 { display:none !important; }

          /* Testimonial nav buttons */
          .testi-nav-btn { width:44px !important; height:44px !important; font-size:17px !important; }
        }

        /* ══════════════════════════════
           RESPONSIVE — 360px  (very small phones)
        ══════════════════════════════ */
        @media (max-width:360px) {
          .inner { padding:0 12px; }
          .navbar { padding:0 12px; }
          .hero-content { padding:0 12px 36px; }
          .sec { padding:48px 0; }
          .mobile-nav { padding:72px 20px 32px; }
          .mobile-nav-link { font-size:22px; padding:14px 0; }
          .navbar-logo { font-size:16px; }
          .counter-row { gap:20px; }
        }

        /* ══════════════════════════════
           TOUCH-DEVICE OPTIMISATIONS
        ══════════════════════════════ */
        @media (hover:none) {
          .ck-row:hover { background:rgba(4,17,6,.05); color:${DARK}; }
          .ck-row:hover .ck-icon svg { stroke:${DARK}; }
          .btn-p:hover { background:${DARK}; color:${BG}; }
        }

        /* ══════════════════════════════
           LANDSCAPE PHONES
        ══════════════════════════════ */
        @media (max-width:768px) and (orientation:landscape) {
          .hero { min-height:80vh; }
          .about-grid { grid-template-columns:1fr 1fr; }
        }

        /* ══════════════════════════════
           LARGE DISPLAYS (2K / 4K)
        ══════════════════════════════ */
        @media (min-width:1800px) {
          .inner { max-width:1600px; }
          .navbar { max-width:100%; }
        }
      `}</style>

    

      {/* ══════════ HERO ══════════ */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <Reveal>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18,fontSize:13,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(201,212,203,.5)"}}>
              <a href="/" style={{color:"rgba(201,212,203,.5)",textDecoration:"none"}}>HOME</a>
              <span>—</span>
              <span style={{color:BG}}>ABOUT US</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="marc hero-h1">
              Crafting Unforgettable Stays
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p style={{color:"rgba(255,255,255,.72)",fontSize:"clamp(14px,2vw,19px)",maxWidth:560,lineHeight:1.8,margin:0}}>
              We connect travelers with exceptional hotels and experiences, ensuring comfort, quality, and memorable moments every step of the journey.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      {/*
        .about-section has isolation:isolate + z-index:0
        This creates a CONTAINED stacking context — the spinning badge
        lives inside it and can never paint above z-index:999 navbar.
      */}
      <section className="sec about-section" style={{background:BG}}>
        <div className="inner">
          <div className="about-grid">

            {/* Col 1 — visible down to 768px (hidden at 768px via CSS) */}
            <Reveal className="about-img1">
              <img
                src="/sher.jpg"
                alt="Hotel exterior"
                style={{width:"100%",height:560,objectFit:"cover",display:"block",borderRadius:4}}
              />
            </Reveal>

            {/* Col 2 — main content */}
            <div style={{paddingTop:10}}>
              <Reveal>
                <p style={{fontSize:"clamp(15px,1.5vw,18px)",lineHeight:1.85,opacity:.65,marginBottom:32}}>
                  Planning your next getaway has never been easier with our seamless hotel booking experience. Whether you seek a luxurious resort, a cozy boutique stay.
                </p>
              </Reveal>
              <Reveal delay={90}>
                <div style={{marginBottom:30}}>
                  {[
                    "Your perfect hotel experience starts right here",
                    "Discover new destinations through easy hotel booking",
                    "Simple hotel booking for unforgettable travel moments",
                  ].map(item=>(
                    <div key={item} className="ck-row">
                      <span className="ck-icon" style={{color:DARK,flexShrink:0,display:"flex",alignItems:"center"}}><IconCheck/></span>
                      <span style={{fontSize:"clamp(14px,1.5vw,17px)",fontWeight:500}}>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <div style={{height:1,background:"rgba(4,17,6,.13)",margin:"28px 0"}}/>
              <Reveal delay={180}>
                <div className="counter-row">
                  <div>
                    <div className="marc stat-num"><Counter target={146} suffix="+"/></div>
                    <p style={{fontSize:12,letterSpacing:".2em",textTransform:"uppercase",marginTop:9,opacity:.48,margin:"9px 0 0"}}>HOTEL AND RESORT</p>
                  </div>
                  <div>
                    <div className="marc stat-num"><Counter target={28} suffix="k+"/></div>
                    <p style={{fontSize:12,letterSpacing:".2em",textTransform:"uppercase",marginTop:9,opacity:.48,margin:"9px 0 0"}}>SATISFIED VISITORS</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Col 3 — image with spin badge
                .spin-img-wrap has padding-bottom:34px so the badge
                (bottom:4px) is fully inside the column's paint area */}
            <Reveal delay={150}>
              <div className="spin-img-wrap">
                <img
                  src="https://i.pinimg.com/1200x/4e/59/71/4e59719a8e187ce05f944451a5c0ba4b.jpg"
                  alt="Luxury hotel room"
                  style={{width:"100%",height:"clamp(300px,45vw,500px)",objectFit:"cover",objectPosition:"top",display:"block",borderRadius:4}}
                />
              
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ WHY SPECIAL ══════════ */}
      <section className="sec" style={{background:SHADE}}>
        <div className="inner">
          <div className="why-grid">

            <Reveal className="why-heading">
              <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",color:DARK,opacity:.42,display:"block",marginBottom:18}}>
                WHY THE FOREST VIEW SPECIAL?
              </span>
              <h2 className="marc" style={{fontSize:"clamp(24px,3.5vw,58px)",fontWeight:400,lineHeight:1.2,color:DARK,margin:0}}>
                Experience Comfort<br/>
                Convenience Your Perfect<br/>
                Accommodation Awaits
              </h2>
            </Reveal>

            <Reveal delay={80} className="card01">
              <div className="why-card-inner" style={cardWhite}>
                <span className="marc" style={{position:"absolute",top:18,right:22,fontSize:46,fontWeight:400,color:"rgba(4,17,6,.07)",lineHeight:1}}>01</span>
                <div style={iconCircle()}><IconMap/></div>
                <h3 className="marc" style={{fontSize:"clamp(19px,2vw,23px)",fontWeight:400,color:DARK,marginBottom:12}}>Flexible Search</h3>
                <p style={{fontSize:"clamp(13px,1.3vw,15px)",lineHeight:1.78,color:DARK,opacity:.58,marginBottom:20}}>
                  Travel is the ultimate way to explore the world, embrace new cultures, and create unforgettable memories.
                </p>
                <a href="#" className="read-more" style={{color:DARK}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

            <Reveal delay={60} className="why-avatars">
              <div style={{display:"flex",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:4}}>
                {[
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=70&h=70&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=70&h=70&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=70&h=70&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=70&h=70&fit=crop&crop=face",
                ].map((src,i)=>(
                  <img key={i} src={src} alt="" style={{
                    width:54,height:54,borderRadius:"50%",objectFit:"cover",
                    border:`3px solid ${SHADE}`,
                    marginLeft:i>0?-14:0,
                    zIndex:4-i,position:"relative",
                    flexShrink:0,
                  }}/>
                ))}
              </div>
              <p style={{fontSize:"clamp(14px,1.4vw,16px)",color:DARK,opacity:.62,lineHeight:1.75,margin:0}}>
                Unleash Your Inner Explorer.<br/>
                Discover Your Next Destination.<br/>
                Your Next Adventure
              </p>
            </Reveal>

            <Reveal delay={120} className="card02">
              <div className="why-card-inner" style={cardDark}>
                <span className="marc" style={{position:"absolute",top:18,right:22,fontSize:46,fontWeight:400,color:"rgba(201,212,203,.1)",lineHeight:1}}>02</span>
                <div style={iconCircle(true)}><IconBuilding/></div>
                <h3 className="marc" style={{fontSize:"clamp(19px,2vw,23px)",fontWeight:400,color:BG,marginBottom:12}}>Trusted Listings</h3>
                <p style={{fontSize:"clamp(13px,1.3vw,15px)",lineHeight:1.78,color:BG,opacity:.62,marginBottom:20}}>
                  Hotels and resorts across countless destinations wherever you travel, we're already there it's a story.
                </p>
                <a href="#" className="read-more" style={{color:BG}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

            {/*
              circ1 — hidden at ≤768px via CSS (.circ1 { display:none !important })
              Visible only on 1024px+ (looks exactly like 1440px)
            */}
            <Reveal delay={160} className="circ1">
              <div style={{width:"100%",maxWidth:260,aspectRatio:"1/1",borderRadius:"50%",overflow:"hidden",margin:"0 auto",boxShadow:"0 4px 32px rgba(4,17,6,.15)"}}>
                <img
                  src="/7.jpeg"
                  alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}
                />
              </div>
            </Reveal>

            <Reveal delay={100} className="card03">
              <div className="why-card-inner" style={cardWhite}>
                <span className="marc" style={{position:"absolute",top:18,right:22,fontSize:46,fontWeight:400,color:"rgba(4,17,6,.07)",lineHeight:1}}>03</span>
                <div style={iconCircle()}><IconMountain/></div>
                <h3 className="marc" style={{fontSize:"clamp(19px,2vw,23px)",fontWeight:400,color:DARK,marginBottom:12}}>Beautiful View</h3>
                <p style={{fontSize:"clamp(13px,1.3vw,15px)",lineHeight:1.78,color:DARK,opacity:.58,marginBottom:20}}>
                  Wake up to breathtaking scenery every morning — our hotels are located in some of the world's most stunning locations.
                </p>
                <a href="#" className="read-more" style={{color:DARK}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

            {/*
              circ2 — hidden at ≤768px via CSS (.circ2 { display:none !important })
              Visible only on 1024px+ (looks exactly like 1440px)
            */}
            <Reveal delay={140} className="circ2">
              <div style={{width:"100%",maxWidth:260,aspectRatio:"1/1",borderRadius:"50%",overflow:"hidden",margin:"0 auto",boxShadow:"0 4px 32px rgba(4,17,6,.15)"}}>
                <img
                  src="/2.jpeg"
                  alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}
                />
              </div>
            </Reveal>

            <Reveal delay={180} className="card04">
              <div className="why-card-inner" style={cardWhite}>
                <span className="marc" style={{position:"absolute",top:18,right:22,fontSize:46,fontWeight:400,color:"rgba(4,17,6,.07)",lineHeight:1}}>04</span>
                <div style={iconCircle()}><IconPaw/></div>
                <h3 className="marc" style={{fontSize:"clamp(19px,2vw,23px)",fontWeight:400,color:DARK,marginBottom:12}}>Pet Friendly Hotels</h3>
                <p style={{fontSize:"clamp(13px,1.3vw,15px)",lineHeight:1.78,color:DARK,opacity:.58,marginBottom:20}}>
                  Our pet-friendly hotels are designed to welcome every member of your family including your pets.
                </p>
                <a href="#" className="read-more" style={{color:DARK}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════ BOOKING PROCESS ══════════ */}
      <section className="sec" style={{background:BG}}>
        <div className="inner">
          <Reveal>
            <div style={{marginBottom:"clamp(36px,5vw,64px)"}}>
              <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",opacity:.4,display:"block",marginBottom:12}}>HOW DOES IT WORK</span>
              <h2 className="marc" style={{fontSize:"clamp(24px,4.5vw,62px)",fontWeight:400,margin:0}}>Our Booking Process</h2>
            </div>
          </Reveal>
          <div className="steps-grid">
            {STEPS.map((s,i)=>(
              <Reveal key={s.step} delay={i*80}>
                <div className="step-item" style={{padding:"clamp(20px,3vw,44px) clamp(16px,2.5vw,36px)"}}>
                  <span style={{display:"inline-block",fontSize:11,fontWeight:700,letterSpacing:".2em",
                    color:DARK,background:"rgba(4,17,6,.07)",padding:"5px 14px",
                    marginBottom:24,textTransform:"uppercase"}}>{s.step}</span>
                  <div style={{width:44,height:44,color:DARK,marginBottom:16}}><s.Icon/></div>
                  <h3 className="marc" style={{fontSize:"clamp(17px,1.8vw,24px)",fontWeight:400,marginBottom:12}}>{s.title}</h3>
                  <p style={{fontSize:"clamp(13px,1.2vw,16px)",lineHeight:1.78,opacity:.56,margin:0}}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ RESTAURANT & BARS ══════════ */}
      <section className="sec" style={{background:DARK}}>
        <div className="inner">
          <Reveal>
            <div style={{marginBottom:"clamp(36px,5vw,64px)"}}>
              <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",color:"rgba(201,212,203,.38)",display:"block",marginBottom:12}}>RESTAURANT AND BARS</span>
              <h2 className="marc" style={{fontSize:"clamp(20px,3.5vw,58px)",color:BG,fontWeight:400,lineHeight:1.2,margin:0}}>
                Create Memories Across The Globe
              </h2>
              <h2 className="marc" style={{fontSize:"clamp(20px,3.5vw,58px)",color:"rgba(201,212,203,.2)",fontWeight:400,lineHeight:1.2,margin:0}}>
                with Journeys Designed Around You
              </h2>
            </div>
          </Reveal>
          <div className="rest-grid">
            <Reveal delay={80}>
              <div style={{background:"rgba(201,212,203,.05)",border:"1px solid rgba(201,212,203,.08)",padding:"clamp(24px,4vw,40px) clamp(20px,3vw,32px)",borderRadius:8}}>
                <div style={{width:44,height:44,color:BG,marginBottom:16,opacity:.7}}><IconUtensils/></div>
                <h3 className="marc" style={{fontSize:"clamp(18px,2vw,26px)",color:BG,fontWeight:400,marginBottom:14}}>Passion On Plate</h3>
                <p style={{fontSize:"clamp(14px,1.4vw,16px)",color:"rgba(201,212,203,.52)",lineHeight:1.8,marginBottom:28}}>
                  Safe payments and instant confirmations — trust and reliability built into every reservation.
                </p>
                <a href="#" style={{display:"inline-flex",alignItems:"center",gap:8,color:BG,
                  border:"1px solid rgba(201,212,203,.28)",padding:"12px 26px",
                  fontSize:12,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",textDecoration:"none"}}>
                  DISCOVER MORE ›
                </a>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div>
                <div style={{background:"rgba(201,212,203,.05)",border:"1px solid rgba(201,212,203,.08)",padding:"22px 26px",marginBottom:16,borderRadius:8}}>
                  {[
                    {Icon:IconUtensils, text:"Luxurious Accommodations"},
                    {Icon:IconCoffee,   text:"Exceptional Service"},
                  ].map(({Icon:Ic,text})=>(
                    <div key={text} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",color:BG,fontSize:"clamp(14px,1.5vw,17px)",fontWeight:500,borderBottom:"1px solid rgba(201,212,203,.05)"}}>
                      <span style={{width:20,height:20,opacity:.6,flexShrink:0}}><Ic/></span>{text}
                    </div>
                  ))}
                </div>
                <img
                  src="/16.jpeg"
                  alt="Restaurant dining"
                  style={{width:"100%",height:240,objectFit:"cover",display:"block",borderRadius:4}}
                />
              </div>
            </Reveal>
            <Reveal delay={240} className="rest-col3">
              <div>
                <img
                  src="/7.jpeg"
                  alt="Hotel bar"
                  style={{width:"100%",height:220,objectFit:"cover",display:"block",marginBottom:24,borderRadius:4}}
                />
                <h4 className="marc" style={{fontSize:"clamp(18px,2vw,24px)",color:BG,fontWeight:400,marginBottom:14}}>Passion On Plate</h4>
                <p style={{fontSize:"clamp(14px,1.4vw,16px)",color:"rgba(201,212,203,.52)",lineHeight:1.8,marginBottom:22}}>
                  Experience travel as it's meant to be — immersive, inspiring, unforgettable. From dream to destination, we bring the world to your doorstep.
                </p>
                <a href="#" style={{display:"inline-flex",alignItems:"center",gap:6,color:BG,
                  border:"1px solid rgba(201,212,203,.28)",padding:"12px 26px",
                  fontSize:12,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",textDecoration:"none"}}>
                  › DINING EXPERIENCE
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="sec" style={{background:BG}}>
        <div className="inner">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"clamp(36px,5vw,60px)",flexWrap:"wrap",gap:20}}>
            <Reveal>
              <div>
                <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",opacity:.4,display:"block",marginBottom:12}}>CUSTOMERS FEEDBACK</span>
                <h2 className="marc" style={{fontSize:"clamp(22px,3.5vw,58px)",fontWeight:400,margin:0}}>What Our Clients Say</h2>
              </div>
            </Reveal>
            <div style={{display:"flex",gap:12}}>
              <button className="testi-nav-btn" onClick={()=>setSlide(p=>(p-1+TESTIMONIALS.length)%TESTIMONIALS.length)}
                style={{width:52,height:52,border:"1.5px solid rgba(4,17,6,.18)",background:"none",cursor:"pointer",fontSize:20,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
              <button className="testi-nav-btn" onClick={()=>setSlide(p=>(p+1)%TESTIMONIALS.length)}
                style={{width:52,height:52,border:`1.5px solid ${DARK}`,background:DARK,color:BG,cursor:"pointer",fontSize:20,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center"}}>→</button>
            </div>
          </div>

          <div className="testi-grid">
            {[0,1,2].map((offset) => {
              const t = TESTIMONIALS[(slide+offset)%TESTIMONIALS.length];
              const mid = offset === 1;
              const extraClass = offset === 0 ? "" : offset === 1 ? "testi-col2" : "testi-col3";
              return (
                <div key={offset} className={extraClass} style={{
                  background: mid ? DARK : "rgba(4,17,6,.04)",
                  border:"1px solid rgba(4,17,6,.08)",
                  padding:"clamp(24px,4vw,38px) clamp(20px,3vw,34px)",
                  transition:"all .5s",
                  borderRadius:8,
                }}>
                  <div style={{display:"flex",gap:4,marginBottom:18}}>
                    {[...Array(5)].map((_,i)=>(
                      <span key={i} style={{color:mid?"rgba(201,212,203,.6)":DARK,opacity:.5,display:"flex",alignItems:"center"}}><IconStar/></span>
                    ))}
                  </div>
                  <p style={{fontSize:"clamp(14px,1.5vw,17px)",lineHeight:1.82,marginBottom:26,color:mid?BG:DARK,opacity:mid?.84:.66,fontStyle:"italic"}}>
                    "Our recent trip was flawless, thanks to THE FOREST VIEW. Their expert planning and personalized service made it truly unforgettable!"
                  </p>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <img src={t.img} alt={t.name} style={{width:56,height:56,borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>
                    <div>
                      <h4 style={{fontSize:17,fontWeight:600,color:mid?BG:DARK,marginBottom:3}}>{t.name}</h4>
                      <span style={{fontSize:14,color:mid?"rgba(201,212,203,.44)":"rgba(4,17,6,.4)"}}>{t.role}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:36}}>
            {TESTIMONIALS.map((_,i)=>(
              <button key={i} className="dot" onClick={()=>setSlide(i)} style={{
                width:i===slide?30:10,height:10,borderRadius:5,
                background:i===slide?DARK:"rgba(4,17,6,.16)",
              }}/>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}