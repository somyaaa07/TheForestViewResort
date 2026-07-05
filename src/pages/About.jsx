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
const IconHeart     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>);
const IconLeaf      = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>);
const IconUsers     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const IconCamera    = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:"100%",height:"100%"}}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>);

const TESTIMONIALS = [
  { name: "Samuel Smith",  role: "Wildlife Enthusiast",    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Olivia Brown",  role: "Family Traveler",        img: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face" },
  { name: "James Miller",  role: "Nature Explorer",        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { name: "Lucas Moore",   role: "Travel Photographer",    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { name: "Ava Johnson",   role: "Adventure Seeker",       img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
];

const STEPS = [
  { step:"STEP 01", Icon: IconMap,      title:"Choose Your Stay",         desc:"Explore our comfortable rooms and select the accommodation that perfectly matches your travel style." },
  { step:"STEP 02", Icon: IconBackpack, title:"Book Your Experience",     desc:"Enjoy a smooth and secure Ranthambore hotel booking process designed for convenience." },
  { step:"STEP 03", Icon: IconClock,    title:"Plan Your Safari",         desc:"Add exciting jungle safaris and local experiences to make your Ranthambore visit truly memorable." },
  { step:"STEP 04", Icon: IconRocket,   title:"Arrive & Relax",           desc:"Check in, unwind, and immerse yourself in the natural beauty of Ranthambore." },
];

const FOUNDER_HIGHLIGHTS = [
  { num: "01", Icon: IconHeart,    title: "Passion For Hospitality" },
  { num: "02", Icon: IconLeaf,     title: "Nature Inspired Vision" },
  { num: "03", Icon: IconUsers,    title: "Guest First Experience" },
  { num: "04", Icon: IconCamera,   title: "Memorable Wildlife Stays" },
];

export default function ForestViewAboutPage() {
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

        .nav-a {
          color:${DARK}; font-size:16px; font-weight:500;
          text-decoration:none; padding-bottom:2px;
          border-bottom:1.5px solid transparent; transition:border-color .25s;
        }
        .nav-a:hover { border-color:${DARK}; }

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

        .sec { padding: 110px 0; }
        .inner { max-width:1400px; margin:0 auto; padding:0 48px; }

        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 72px;
          background: rgba(201,212,203,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(4,17,6,.08);
          transform: translateZ(0);
          will-change: transform;
        }
        .navbar-logo {
          font-family: 'Marcellus', serif;
          font-size: 20px; color: ${DARK}; text-decoration: none;
          letter-spacing: .04em; flex-shrink: 0;
        }
        .desktop-nav { display: flex; align-items: center; gap: 36px; }

        .hero {
          position:relative; min-height:80vh;
          background-image:url('/18.jpeg');
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
        .about-img1 { display:block; }

        .spin-img-wrap {
          position: relative;
          padding-bottom: 34px;
        }

        .spin-badge {
          position:absolute; bottom: 4px; right:-18px;
          width:clamp(80px,12vw,110px); height:clamp(80px,12vw,110px);
          border-radius:50%; background:${DARK};
          display:flex; align-items:center; justify-content:center;
          z-index: 2;
        }
        .spin-badge svg { position:absolute; width:100%; height:100%; }

        /* ── FOUNDER SECTION ── */
        .founder-section {
          position: relative;
          z-index: 0;
          isolation: isolate;
        }
        .founder-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: start;
        }
        .founder-highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 32px;
        }
        .founder-highlight-card {
          background: rgba(4,17,6,.05);
          border-radius: 8px;
          padding: 20px 22px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: all .3s;
          cursor: default;
        }
        .founder-highlight-card:hover {
          background: ${DARK};
          color: ${BG};
        }
        .founder-highlight-card:hover .fh-icon { color: ${BG}; }
        .founder-quote-block {
          border-left: 3px solid ${DARK};
          padding: 20px 28px;
          margin: 32px 0;
          background: rgba(4,17,6,.04);
          border-radius: 0 8px 8px 0;
        }

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

        .steps-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        .step-item { border-right:1px solid rgba(4,17,6,.11); }
        .step-item:last-child { border-right:none; }

        .rest-grid { display:grid; grid-template-columns:1fr 1.2fr 1fr; gap:36px; align-items:start; }

        .testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }

        .counter-row { display:flex; gap:64px; flex-wrap:wrap; }
        .stat-num { font-size:clamp(44px,5vw,60px); color:${DARK}; line-height:1; }

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

        @media (max-width:1280px) {
          .inner { padding:0 40px; }
          .navbar { padding:0 40px; }
          .hero-content { padding:0 40px 80px; }
          .about-grid { grid-template-columns: 300px 1fr 280px; gap:40px; }
        }

        @media (max-width:1024px) {
          .inner { padding:0 32px; }
          .navbar { padding:0 32px; }
          .hero-content { padding:0 32px 72px; }
          .sec { padding:88px 0; }
          .desktop-nav { gap:20px; }
          .nav-a { font-size:14px; }
          .about-grid { grid-template-columns: 220px 1fr 220px; gap:28px; }
          .about-img1 { display:block !important; }
          .why-grid { grid-template-columns: 1fr 1fr 1fr; }
          .steps-grid { grid-template-columns:repeat(4,1fr); }
          .rest-grid { grid-template-columns:1fr 1.2fr 1fr; gap:28px; }
          .testi-grid { grid-template-columns:repeat(3,1fr); }
          .founder-grid { gap: 48px; }
        }

        @media (max-width:768px) {
          .sec { padding:64px 0; }
          .inner { padding:0 24px; }
          .navbar { padding:0 24px; height:64px; }
          .hero-content { padding:0 24px 56px; }
          .hero { min-height:60vh; padding-top:64px; }
          .desktop-nav { display:none !important; }
          .mobile-menu-btn { display:flex !important; }
          .about-grid { grid-template-columns:1fr 1fr; gap:28px; }
          .about-img1 { display:none !important; }
          .circ1 { display:none !important; }
          .circ2 { display:none !important; }
          .why-grid { grid-template-columns:1fr 1fr; gap:20px; }
          .why-heading { grid-column:1/3; grid-row:1/2; }
          .card01      { grid-column:2/3; grid-row:2/3; }
          .why-avatars { grid-column:1/2; grid-row:2/3; }
          .card02      { grid-column:1/2; grid-row:3/4; }
          .card03      { grid-column:2/3; grid-row:3/4; }
          .card04      { grid-column:1/2; grid-row:4/5; }
          .steps-grid { grid-template-columns:repeat(2,1fr); }
          .step-item { border-right:none; border-bottom:1px solid rgba(4,17,6,.11); }
          .step-item:nth-child(odd) { border-right:1px solid rgba(4,17,6,.11) !important; }
          .step-item:last-child { border-bottom:none !important; }
          .step-item:nth-last-child(2) { border-bottom:none; }
          .rest-grid { grid-template-columns:1fr 1fr; gap:24px; }
          .rest-col3 { grid-column:1/3; }
          .testi-grid { grid-template-columns:1fr 1fr; gap:20px; }
          .testi-col3 { display:none !important; }
          .counter-row { gap:32px; }
          .spin-badge { bottom:8px; right:-10px; }
          /* Founder responsive */
          .founder-grid { grid-template-columns: 1fr; gap: 40px; }
          .founder-highlights-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width:480px) {
          .inner { padding:0 16px; }
          .navbar { padding:0 16px; height:60px; }
          .hero-content { padding:0 16px 44px; }
          .hero { min-height:72vh; padding-top:60px; }
          .sec { padding:56px 0; }
          .hero-h1 { font-size: clamp(28px, 8vw, 44px); }
          .about-grid { grid-template-columns:1fr; gap:24px; }
          .about-img1 { display:none !important; }
          .why-grid { grid-template-columns:1fr; gap:16px; }
          .why-heading,
          .card01, .card02, .card03, .card04,
          .why-avatars {
            grid-column:1 !important;
            grid-row:auto !important;
          }
          .counter-row { gap:24px; flex-direction:column; }
          .ck-row { padding:12px 14px; gap:12px; }
          .spin-badge { width:72px; height:72px; bottom:8px; right:-8px; }
          .step-item { padding: 24px 16px !important; }
          .steps-grid { grid-template-columns:1fr; }
          .step-item {
            border-right:none !important;
            border-bottom:1px solid rgba(4,17,6,.11);
          }
          .step-item:last-child { border-bottom:none !important; }
          .rest-grid { grid-template-columns:1fr; gap:20px; }
          .rest-col3 { grid-column:1 !important; }
          .testi-grid { grid-template-columns:1fr; }
          .testi-col2, .testi-col3 { display:none !important; }
          .testi-nav-btn { width:44px !important; height:44px !important; font-size:17px !important; }
          /* Founder responsive */
          .founder-highlights-grid { grid-template-columns: 1fr; }
        }

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

        @media (hover:none) {
          .ck-row:hover { background:rgba(4,17,6,.05); color:${DARK}; }
          .ck-row:hover .ck-icon svg { stroke:${DARK}; }
          .btn-p:hover { background:${DARK}; color:${BG}; }
          .founder-highlight-card:hover { background: rgba(4,17,6,.05); color: ${DARK}; }
          .founder-highlight-card:hover .fh-icon { color: ${DARK}; }
        }

        @media (max-width:768px) and (orientation:landscape) {
          .hero { min-height:80vh; }
          .about-grid { grid-template-columns:1fr 1fr; }
        }

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
              Welcome Back<br/>To The Wild
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p style={{color:"rgba(255,255,255,.72)",fontSize:"clamp(14px,2vw,19px)",maxWidth:650,lineHeight:1.8,margin:0}}>
              At The Forest View Resort, we don't just host guests—we create unforgettable experiences. Located near the breathtaking Ranthambore National Park, our resort combines modern comfort, personalized hospitality, and the beauty of nature to create memorable stays for every traveler.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <section className="sec about-section" style={{background:BG}}>
        <div className="inner">
          <div className="about-grid">

            {/* Col 1 */}
            <Reveal className="about-img1">
              <img
                src="/sher.jpg"
                alt="Forest View Resort Ranthambore"
                style={{width:"100%",height:560,objectFit:"cover",display:"block",borderRadius:4}}
              />
            </Reveal>

            {/* Col 2 — main content */}
            <div style={{paddingTop:10}}>
              <Reveal>
                <p style={{fontSize:"clamp(15px,1.5vw,18px)",lineHeight:1.85,opacity:.65,marginBottom:32}}>
                  Welcome to The Forest View Resort, where comfort and nature come together in the heart of Ranthambore. Surrounded by the natural beauty of Rajasthan and located close to Ranthambore National Park, our resort offers an escape from the ordinary. Whether you're visiting for thrilling wildlife safaris, peaceful family vacations, romantic getaways, or relaxing retreats, every stay is designed to leave you with unforgettable memories.
                </p>
              </Reveal>
              <Reveal delay={90}>
                <div style={{marginBottom:30}}>
                  {[
                    "Prime Location Near Ranthambore National Park",
                    "Comfortable Nature-Inspired Accommodations",
                    "Personalized Hospitality & Guest Care",
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
                    <div className="marc stat-num"><Counter target={35} suffix="+"/></div>
                    <p style={{fontSize:12,letterSpacing:".2em",textTransform:"uppercase",marginTop:9,opacity:.48,margin:"9px 0 0"}}>LUXURY ROOMS &amp; SUITES</p>
                  </div>
                  <div>
                    <div className="marc stat-num"><Counter target={12000} suffix="+"/></div>
                    <p style={{fontSize:12,letterSpacing:".2em",textTransform:"uppercase",marginTop:9,opacity:.48,margin:"9px 0 0"}}>HAPPY GUESTS WELCOMED</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Col 3 */}
            <Reveal delay={150}>
              <div className="spin-img-wrap">
                <img
                  src="https://i.pinimg.com/1200x/4e/59/71/4e59719a8e187ce05f944451a5c0ba4b.jpg"
                  alt="Luxury Resort Near Ranthambore National Park"
                  style={{width:"100%",height:"clamp(300px,45vw,500px)",objectFit:"cover",objectPosition:"top",display:"block",borderRadius:4}}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ FOUNDER SECTION ══════════ */}
      <section className="sec founder-section" style={{background:SHADE}}>
        <div className="inner">
          <Reveal>
            <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",color:DARK,opacity:.42,display:"block",marginBottom:18}}>
              FOUNDER'S MESSAGE
            </span>
          </Reveal>
          <div className="founder-grid">

            {/* Left — Founder Image */}
            <Reveal>
              <div style={{position:"relative"}}>
                <img
                  src="/founder.jpeg"
                  alt="Manu Srivastava Founder of The Forest View Resort"
                  style={{width:"100%",height:"clamp(400px,55vw,620px)",objectFit:"cover",objectPosition:"top",display:"block",borderRadius:8,boxShadow:"0 8px 48px rgba(4,17,6,.18)"}}
                />
                {/* Accent badge */}
                <div style={{
                  position:"absolute",bottom:28,left:-20,
                  background:DARK,color:BG,
                  padding:"18px 28px",borderRadius:6,
                  boxShadow:"0 4px 24px rgba(4,17,6,.22)",
                  minWidth:200,
                }}>
                  <div className="marc" style={{fontSize:"clamp(18px,2vw,22px)",fontWeight:400,marginBottom:4}}>Manu Srivastava</div>
                  <div style={{fontSize:12,letterSpacing:".18em",textTransform:"uppercase",opacity:.52}}>Founder &amp; Host</div>
                </div>
              </div>
            </Reveal>

            {/* Right — Content */}
            <div>
              <Reveal>
                <h2 className="marc" style={{fontSize:"clamp(24px,3.5vw,52px)",fontWeight:400,lineHeight:1.2,color:DARK,marginBottom:28,marginTop:0}}>
                  Meet The Vision Behind<br/>
                  The Forest View Resort
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p style={{fontSize:"clamp(14px,1.5vw,17px)",lineHeight:1.85,opacity:.66,marginBottom:20}}>
                  Hospitality isn't just a profession for me—it's a passion. When I envisioned The Forest View Resort, my goal was to create a destination where guests could reconnect with nature without compromising on comfort.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p style={{fontSize:"clamp(14px,1.5vw,17px)",lineHeight:1.85,opacity:.66,marginBottom:20}}>
                  Every corner of our resort has been thoughtfully designed to provide warmth, relaxation, and authentic hospitality. Located near the incredible Ranthambore National Park, we welcome wildlife enthusiasts, families, couples, and travelers seeking memorable experiences surrounded by nature.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p style={{fontSize:"clamp(14px,1.5vw,17px)",lineHeight:1.85,opacity:.66,marginBottom:0}}>
                  My vision has always been simple: create a place where comfort feels natural, service feels personal, and every guest leaves with memories worth cherishing. Every visitor who stays with us becomes part of our extended family, and we are honored to be a part of your Ranthambore journey.
                </p>
              </Reveal>

              {/* Quote Block */}
              <Reveal delay={200}>
                <div className="founder-quote-block">
                  <p className="marc" style={{fontSize:"clamp(16px,1.8vw,21px)",fontWeight:400,lineHeight:1.7,color:DARK,margin:"0 0 14px",fontStyle:"italic"}}>
                    "Hospitality is the art of making people feel at home while they explore something extraordinary."
                  </p>
                  <span style={{fontSize:12,letterSpacing:".18em",textTransform:"uppercase",opacity:.48}}>— Manu Srivastava</span>
                </div>
              </Reveal>

              {/* Founder Highlights */}
              <Reveal delay={240}>
                <div className="founder-highlights-grid">
                  {FOUNDER_HIGHLIGHTS.map((h, i) => (
                    <div key={h.num} className="founder-highlight-card">
                      <span style={{
                        fontFamily:"'Marcellus',serif",
                        fontSize:28,fontWeight:400,
                        color:DARK,opacity:.15,
                        lineHeight:1,flexShrink:0,
                        minWidth:36,
                      }}>{h.num}</span>
                      <span className="fh-icon" style={{width:24,height:24,color:DARK,flexShrink:0}}><h.Icon/></span>
                      <span style={{fontSize:"clamp(13px,1.3vw,15px)",fontWeight:500,lineHeight:1.4}}>{h.title}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal delay={280}>
                <div style={{marginTop:36}}>
                  <a href="/contact" className="btn-p">PLAN YOUR STAY <IconArrow/></a>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section className="sec" style={{background:BG}}>
        <div className="inner">
          <div className="why-grid">

            <Reveal className="why-heading">
              <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",color:DARK,opacity:.42,display:"block",marginBottom:18}}>
                WHY CHOOSE THE FOREST VIEW RESORT
              </span>
              <h2 className="marc" style={{fontSize:"clamp(24px,3.5vw,58px)",fontWeight:400,lineHeight:1.2,color:DARK,margin:0}}>
                Experience Ranthambore<br/>
                Like Never Before
              </h2>
            </Reveal>

            <Reveal delay={80} className="card01">
              <div className="why-card-inner" style={cardWhite}>
                <span className="marc" style={{position:"absolute",top:18,right:22,fontSize:46,fontWeight:400,color:"rgba(4,17,6,.07)",lineHeight:1}}>01</span>
                <div style={iconCircle()}><IconMap/></div>
                <h3 className="marc" style={{fontSize:"clamp(19px,2vw,23px)",fontWeight:400,color:DARK,marginBottom:12}}>Perfect Location</h3>
                <p style={{fontSize:"clamp(13px,1.3vw,15px)",lineHeight:1.78,color:DARK,opacity:.58,marginBottom:20}}>
                  Located close to Ranthambore National Park, our resort offers convenient access to safari zones while providing a peaceful retreat surrounded by nature.
                </p>
                <a href="#" className="read-more" style={{color:DARK}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

            <Reveal delay={60} className="why-avatars">
              <div style={{display:"flex",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:4}}>
              
              </div>
              <p style={{fontSize:"clamp(14px,3.4vw,30px)",color:DARK,opacity:.62,lineHeight:1.75,margin:0}}>
                Wildlife Adventures.<br/>
                Nature Inspired Luxury.<br/>
                Memories That Last Forever.
              </p>
            </Reveal>

            <Reveal delay={120} className="card02">
              <div className="why-card-inner" style={cardDark}>
                <span className="marc" style={{position:"absolute",top:18,right:22,fontSize:46,fontWeight:400,color:"rgba(201,212,203,.1)",lineHeight:1}}>02</span>
                <div style={iconCircle(true)}><IconBuilding/></div>
                <h3 className="marc" style={{fontSize:"clamp(19px,2vw,23px)",fontWeight:400,color:BG,marginBottom:12}}>Personalized Hospitality</h3>
                <p style={{fontSize:"clamp(13px,1.3vw,15px)",lineHeight:1.78,color:BG,opacity:.62,marginBottom:20}}>
                  Our team believes in genuine hospitality. Every guest receives personalized attention and service that makes every stay comfortable and memorable.
                </p>
                <a href="#" className="read-more" style={{color:BG}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

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
                <h3 className="marc" style={{fontSize:"clamp(19px,2vw,23px)",fontWeight:400,color:DARK,marginBottom:12}}>Nature &amp; Comfort</h3>
                <p style={{fontSize:"clamp(13px,1.3vw,15px)",lineHeight:1.78,color:DARK,opacity:.58,marginBottom:20}}>
                  Wake up to beautiful views, fresh air, and the sounds of nature while enjoying modern amenities and relaxing accommodations.
                </p>
                <a href="#" className="read-more" style={{color:DARK}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

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
                <h3 className="marc" style={{fontSize:"clamp(19px,2vw,23px)",fontWeight:400,color:DARK,marginBottom:12}}>Family &amp; Wildlife Retreat</h3>
                <p style={{fontSize:"clamp(13px,1.3vw,15px)",lineHeight:1.78,color:DARK,opacity:.58,marginBottom:20}}>
                  Whether you're planning a family vacation, romantic escape, or wildlife expedition, The Forest View Resort is designed to create unforgettable experiences.
                </p>
                <a href="#" className="read-more" style={{color:DARK}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════ BOOKING PROCESS ══════════ */}
      <section className="sec" style={{background:SHADE}}>
        <div className="inner">
          <Reveal>
            <div style={{marginBottom:"clamp(36px,5vw,64px)"}}>
              <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",opacity:.4,display:"block",marginBottom:12}}>HOW DOES IT WORK</span>
              <h2 className="marc" style={{fontSize:"clamp(24px,4.5vw,62px)",fontWeight:400,margin:0}}>Your Journey To Ranthambore Begins Here</h2>
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

      {/* ══════════ DINING ══════════ */}
      {/* <section className="sec" style={{background:DARK}}>
        <div className="inner">
          <Reveal>
            <div style={{marginBottom:"clamp(36px,5vw,64px)"}}>
              <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",color:"rgba(201,212,203,.38)",display:"block",marginBottom:12}}>DINING EXPERIENCE</span>
              <h2 className="marc" style={{fontSize:"clamp(20px,3.5vw,58px)",color:BG,fontWeight:400,lineHeight:1.2,margin:0}}>
                Savor Every Moment<br/>At The Forest View Resort
              </h2>
              <h2 className="marc" style={{fontSize:"clamp(20px,3.5vw,58px)",color:"rgba(201,212,203,.2)",fontWeight:400,lineHeight:1.2,margin:0}}>
                Authentic Flavors Inspired By Nature
              </h2>
            </div>
          </Reveal>
          <div className="rest-grid">
            <Reveal delay={80}>
              <div style={{background:"rgba(201,212,203,.05)",border:"1px solid rgba(201,212,203,.08)",padding:"clamp(24px,4vw,40px) clamp(20px,3vw,32px)",borderRadius:8}}>
                <div style={{width:44,height:44,color:BG,marginBottom:16,opacity:.7}}><IconUtensils/></div>
                <h3 className="marc" style={{fontSize:"clamp(18px,2vw,26px)",color:BG,fontWeight:400,marginBottom:14}}>Delicious Dining</h3>
                <p style={{fontSize:"clamp(14px,1.4vw,16px)",color:"rgba(201,212,203,.52)",lineHeight:1.8,marginBottom:28}}>
                  Enjoy freshly prepared meals, regional specialties, and carefully crafted dining experiences designed to complement your stay in Ranthambore.
                </p>
                <div style={{marginBottom:20}}>
                  {["Authentic Local Cuisine","Freshly Prepared Meals"].map(f=>(
                    <div key={f} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",color:BG,fontSize:"clamp(13px,1.3vw,15px)",borderBottom:"1px solid rgba(201,212,203,.06)"}}>
                      <span style={{width:16,height:16,opacity:.5,flexShrink:0,display:"flex",alignItems:"center"}}><IconCheck/></span>{f}
                    </div>
                  ))}
                </div>
                <a href="#" style={{display:"inline-flex",alignItems:"center",gap:8,color:BG,
                  border:"1px solid rgba(201,212,203,.28)",padding:"12px 26px",
                  fontSize:12,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",textDecoration:"none"}}>
                  EXPLORE DINING ›
                </a>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div>
                <div style={{background:"rgba(201,212,203,.05)",border:"1px solid rgba(201,212,203,.08)",padding:"22px 26px",marginBottom:16,borderRadius:8}}>
                  {[
                    {Icon:IconUtensils, text:"Traditional Rajasthani Flavors"},
                    {Icon:IconCoffee,   text:"Family Friendly Dining"},
                  ].map(({Icon:Ic,text})=>(
                    <div key={text} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",color:BG,fontSize:"clamp(14px,1.5vw,17px)",fontWeight:500,borderBottom:"1px solid rgba(201,212,203,.05)"}}>
                      <span style={{width:20,height:20,opacity:.6,flexShrink:0}}><Ic/></span>{text}
                    </div>
                  ))}
                </div>
                <img
                  src="/16.jpeg"
                  alt="Restaurant at Forest View Resort"
                  style={{width:"100%",height:240,objectFit:"cover",display:"block",borderRadius:4}}
                />
              </div>
            </Reveal>
            <Reveal delay={240} className="rest-col3">
              <div>
                <img
                  src="/7.jpeg"
                  alt="Dining Experience in Ranthambore"
                  style={{width:"100%",height:220,objectFit:"cover",display:"block",marginBottom:24,borderRadius:4}}
                />
                <h4 className="marc" style={{fontSize:"clamp(18px,2vw,24px)",color:BG,fontWeight:400,marginBottom:14}}>Taste The Essence Of Ranthambore</h4>
                <p style={{fontSize:"clamp(14px,1.4vw,16px)",color:"rgba(201,212,203,.52)",lineHeight:1.8,marginBottom:22}}>
                  From traditional delicacies to comforting favorites, every meal is served with warmth, care, and exceptional hospitality.
                </p>
                <a href="#" style={{display:"inline-flex",alignItems:"center",gap:6,color:BG,
                  border:"1px solid rgba(201,212,203,.28)",padding:"12px 26px",
                  fontSize:12,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",textDecoration:"none"}}>
                  › VIEW DINING
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section> */}

      {/* ══════════ TESTIMONIALS ══════════ */}
      {/* <section className="sec" style={{background:BG}}>
        <div className="inner">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"clamp(36px,5vw,60px)",flexWrap:"wrap",gap:20}}>
            <Reveal>
              <div>
                <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",opacity:.4,display:"block",marginBottom:12}}>GUEST EXPERIENCES</span>
                <h2 className="marc" style={{fontSize:"clamp(22px,3.5vw,58px)",fontWeight:400,margin:0}}>What Our Guests Say</h2>
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
                    "Our stay at The Forest View Resort exceeded every expectation. The warm hospitality, peaceful atmosphere, excellent service, and close proximity to Ranthambore National Park made our vacation truly unforgettable."
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
      </section> */}

    </div>
  );
}