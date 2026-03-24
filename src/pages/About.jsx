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
const IconGlobe     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);
const IconPhone     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const IconMail      = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>);
const IconPin       = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
const IconCheck     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><polyline points="20 6 9 17 4 12"/></svg>);
const IconArrow     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>);
const IconSend      = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);
const IconStar      = () => (<svg viewBox="0 0 24 24" fill="currentColor" style={{width:14,height:14}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
const IconFire      = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>);
const IconTent      = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><path d="M3.5 21 14 3"/><path d="M20.5 21 10 3"/><path d="M15.5 21 12 15l-3.5 6"/><path d="M2 21h20"/></svg>);
const IconPlane     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>);

/* Social icons */
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

const MARQUEE = [
  { Icon: IconFire, text:"Go Beyond the Map" },
  { Icon: IconTent, text:"Adventure Knows No Limits" },
  { Icon: IconPlane,text:"Travel Smarter, Live Better" },
];

const CONTACT_ITEMS = [
  { Icon: IconGlobe, text:"www.example.com" },
  { Icon: IconPhone, text:"+41 22 345 77 89" },
  { Icon: IconMail,  text:"info@theforestview.com" },
  { Icon: IconPin,   text:"Cedarbrook Rd. Tucson, Arizona" },
];

export default function SafarAboutPage() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % TESTIMONIALS.length), 4200);
    return () => clearInterval(t);
  }, []);

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
  useEffect(() => {

    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ background: BG, color: DARK, fontFamily: "'Jost', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Marcellus&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
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

        /* ── Nav ── */
        .desktop-nav { display:flex; }
        .mobile-menu-btn { display:none; }
        .mobile-nav { display:none; }

        /* ── About 3col ── */
        .about-3col { grid-template-columns: 380px 1fr 340px !important; }
        .about-img1 { display:block; }

        /* ── Why grid ── */
        .why-grid {
          display:grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
        }
        .why-heading { grid-column: 1 / 3; grid-row: 1 / 2; }
        .card01      { grid-column: 3 / 4; grid-row: 1 / 2; }
        .why-avatars { grid-column: 1 / 2; grid-row: 2 / 3; align-self:center; }
        .card02      { grid-column: 2 / 3; grid-row: 2 / 3; }
        .circ1       { grid-column: 3 / 4; grid-row: 2 / 3; display:flex; align-items:center; justify-content:center; }
        .card03      { grid-column: 1 / 2; grid-row: 3 / 4; }
        .circ2       { grid-column: 2 / 3; grid-row: 3 / 4; display:flex; align-items:center; justify-content:center; }
        .card04      { grid-column: 3 / 4; grid-row: 3 / 4; }

        /* ── Steps ── */
        .steps-4col { grid-template-columns: repeat(4,1fr) !important; }
        .step-item  { border-right: 1px solid rgba(4,17,6,.11); }
        .step-item:last-child { border-right:none; }

        /* ── Restaurant ── */
        .rest-3col { grid-template-columns: 1fr 1.2fr 1fr !important; }

        /* ── Testimonials ── */
        .testi-3col { grid-template-columns: repeat(3,1fr) !important; }

        /* ── Footer ── */
        .fc-grid { grid-template-columns: 1.9fr 1fr 1fr 1.1fr !important; }
        .footer-col { padding: 56px 0 50px 52px !important; }
        .footer-col-first { padding: 56px 80px 50px 0 !important; }

        /* ═══════ 1200px ═══════ */
        @media (max-width: 1200px) {
          .about-3col { grid-template-columns: 1fr 1fr !important; }
          .about-img1 { display:none !important; }
          .fc-grid    { grid-template-columns: 1fr 1fr !important; }
          .footer-col-first { padding: 56px 40px 50px 0 !important; border-right: none !important; }
          .footer-col { padding: 40px 0 40px 32px !important; }
        }

        /* ═══════ 1024px ═══════ */
        @media (max-width: 1024px) {
          .desktop-nav { display:none !important; }
          .mobile-menu-btn { display:flex !important; }

          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .why-heading { grid-column: 1 / 3 !important; grid-row: 1 / 2 !important; }
          .why-avatars { grid-column: 1 / 2 !important; grid-row: 2 / 3 !important; }
          .card01      { grid-column: 2 / 3 !important; grid-row: 2 / 3 !important; }
          .card02      { grid-column: 1 / 2 !important; grid-row: 3 / 4 !important; }
          .circ1       { grid-column: 2 / 3 !important; grid-row: 3 / 4 !important; }
          .card03      { grid-column: 1 / 2 !important; grid-row: 4 / 5 !important; }
          .circ2       { grid-column: 2 / 3 !important; grid-row: 4 / 5 !important; }
          .card04      { grid-column: 1 / 2 !important; grid-row: 5 / 6 !important; }

          .steps-4col { grid-template-columns: repeat(2,1fr) !important; }
          .step-item  { border-right: none !important; border-bottom: 1px solid rgba(4,17,6,.11); }
          .step-item:nth-child(odd) { border-right: 1px solid rgba(4,17,6,.11) !important; }
          .step-item:last-child { border-bottom: none; }
          .step-item:nth-last-child(2) { border-bottom: none; }

          .rest-3col  { grid-template-columns: 1fr 1fr !important; }
          .rest-col3  { grid-column: 1 / 3 !important; }

          .testi-3col { grid-template-columns: 1fr 1fr !important; }
          .testi-hide { display:none !important; }
        }

        /* ═══════ 768px ═══════ */
        @media (max-width: 768px) {
          .section-pad { padding: 70px 0 !important; }
          .section-inner { padding: 0 24px !important; }
          .hero-text { padding: 0 24px 60px !important; }
          .hero-h1 { font-size: clamp(36px,8vw,70px) !important; }

          .about-3col { grid-template-columns: 1fr !important; }

          .why-grid { grid-template-columns: 1fr !important; }
          .why-heading { grid-column: 1 !important; }
          .why-avatars { grid-column: 1 !important; grid-row: auto !important; }
          .card01 { grid-column: 1 !important; grid-row: auto !important; }
          .card02 { grid-column: 1 !important; grid-row: auto !important; }
          .circ1  { grid-column: 1 !important; grid-row: auto !important; }
          .card03 { grid-column: 1 !important; grid-row: auto !important; }
          .circ2  { grid-column: 1 !important; grid-row: auto !important; }
          .card04 { grid-column: 1 !important; grid-row: auto !important; }

          .steps-4col { grid-template-columns: 1fr !important; }
          .step-item  { border-right: none !important; border-bottom: 1px solid rgba(4,17,6,.11); }
          .step-item:nth-child(odd) { border-right: none !important; }

          .rest-3col { grid-template-columns: 1fr !important; }
          .rest-col3 { grid-column: 1 !important; }

          .testi-3col { grid-template-columns: 1fr !important; }
          .testi-hide { display:none !important; }
          .testi-hide2 { display:none !important; }

          .fc-grid { grid-template-columns: 1fr !important; }
          .footer-col { padding: 32px 0 !important; border-right: none !important; border-bottom: 1px solid rgba(201,212,203,.08) !important; }
          .footer-col-first { padding: 40px 0 !important; border-right: none !important; border-bottom: 1px solid rgba(201,212,203,.08) !important; }

          .newsletter-row { flex-direction: column !important; align-items: flex-start !important; }
          .newsletter-input { width: 100% !important; }
          .counter-row { gap: 32px !important; }
          .stat-num { font-size: 48px !important; }
        }

        /* ═══════ 480px ═══════ */
        @media (max-width: 480px) {
          .section-inner { padding: 0 16px !important; }
          .hero-text { padding: 0 16px 48px !important; }
          .marquee-text { font-size: clamp(36px,10vw,60px) !important; }
        }

        /* Mobile nav */
        .mobile-nav.open {
          display:flex !important;
          flex-direction:column;
          gap:0;
          position:fixed; top:0; left:0; right:0; bottom:0;
          background:${BG};
          z-index:999;
          padding:80px 32px 32px;
          animation: fadeIn .25s ease;
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .mobile-nav-link {
          font-size:32px; font-weight:500; color:${DARK};
          text-decoration:none; padding:18px 0;
          border-bottom:1px solid rgba(4,17,6,.1);
          font-family:'Marcellus',serif;
        }
        .mobile-close {
          position:absolute; top:24px; right:24px;
          background:none; border:none; cursor:pointer;
          font-size:28px; color:${DARK};
        }
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section style={{
        position:"relative", minHeight:"70vh",
        backgroundImage:"url('/5.jpeg')",
        backgroundSize:"cover", backgroundPosition:"center",
        display:"flex", alignItems:"flex-end", paddingTop:90,
      }}>
        <div style={{position:"absolute",inset:0,background:"rgba(4,17,6,.70)"}}/>
        <div className="hero-text section-inner" style={{position:"relative",zIndex:2,maxWidth:1400,margin:"0 auto",padding:"0 48px 90px",width:"100%"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18,fontSize:13,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(201,212,203,.5)"}}>
              <a href="/" style={{color:"rgba(201,212,203,.5)",textDecoration:"none"}}>HOME</a>
              <span>—</span>
              <span style={{color:BG}}>ABOUT US</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="marc hero-h1" style={{fontSize:"clamp(44px,7vw,90px)",color:BG,fontWeight:400,lineHeight:1.08,marginBottom:22}}>
              Crafting Unforgettable Stays
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p style={{color:"rgba(255,255,255,.72)",fontSize:"clamp(15px,2vw,19px)",maxWidth:560,lineHeight:1.8}}>
              We connect travelers with exceptional hotels and experiences, ensuring comfort, quality, and memorable moments every step of the journey.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mobile nav overlay */}
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        {["Home","About","Accommodation","Destinations","Contact"].map(l => (
          <a key={l} href="#" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
      </div>

      {/* ══════════ ABOUT ══════════ */}
      <section className="section-pad" style={{padding:"110px 0",background:BG}}>
        <div className="section-inner" style={{maxWidth:1400,margin:"0 auto",padding:"0 48px"}}>
          <div className="about-3col" style={{display:"grid",gridTemplateColumns:"380px 1fr 340px",gap:56,alignItems:"start"}}>

            <Reveal className="about-img1">
              <img src="/sher.jpg"
                alt="" style={{width:"100%",height:560,objectFit:"cover",display:"block",borderRadius:4}}/>
            </Reveal>

            <div style={{paddingTop:10}}>
              <Reveal>
                <p style={{fontSize:"clamp(15px,1.5vw,18px)",lineHeight:1.85,opacity:.65,marginBottom:32}}>
                  Planning your next getaway has never been easier with our seamless hotel booking experience. Whether you seek a luxurious resort, a cozy boutique stay
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
                <div className="counter-row" style={{display:"flex",gap:64,flexWrap:"wrap"}}>
                  <div>
                    <div className="marc stat-num" style={{fontSize:"clamp(44px,5vw,60px)",color:DARK,lineHeight:1}}><Counter target={146} suffix="+"/></div>
                    <p style={{fontSize:12,letterSpacing:".2em",textTransform:"uppercase",marginTop:9,opacity:.48}}>HOTEL AND RESORT</p>
                  </div>
                  <div>
                    <div className="marc stat-num" style={{fontSize:"clamp(44px,5vw,60px)",color:DARK,lineHeight:1}}><Counter target={28} suffix="k+"/></div>
                    <p style={{fontSize:12,letterSpacing:".2em",textTransform:"uppercase",marginTop:9,opacity:.48}}>SATISFIED VISITORS</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div style={{position:"relative"}}>
                <img src="https://i.pinimg.com/736x/cf/e5/8b/cfe58b98e9d414807f69baeadc70d858.jpg"
                  alt="" style={{width:"100%",height:500,objectFit:"cover",objectPosition:"top",display:"block",borderRadius:4}}/>
                <div className="spin" style={{
                  position:"absolute",bottom:-30,right:-18,
                  width:130,height:130,borderRadius:"50%",
                  background:DARK,display:"flex",alignItems:"center",justifyContent:"center",
                }}>
                  <svg viewBox="0 0 130 130" style={{position:"absolute",width:130,height:130}}>
                    <path id="sp2" d="M65,65 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" fill="none"/>
                    <text style={{fontSize:10,fill:BG,letterSpacing:3}}>
                      <textPath href="#sp2">THE FOREST VIEW STORY • ABOUT US • 2012 •</textPath>
                    </text>
                  </svg>
                  <span style={{color:BG,fontSize:22}}>✦</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ WHY SAFAR SPECIAL ══════════ */}
      <section className="section-pad" style={{padding:"110px 0",background:SHADE}}>
        <div className="section-inner" style={{maxWidth:1400,margin:"0 auto",padding:"0 48px"}}>
          <div className="why-grid">

            <Reveal style={{}} className="why-heading">
              <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",color:DARK,opacity:.42,display:"block",marginBottom:18}}>
                WHY THE FOREST VIEW SPECIAL?
              </span>
              <h2 className="marc" style={{fontSize:"clamp(28px,3.5vw,58px)",fontWeight:400,lineHeight:1.2,color:DARK}}>
                Experience Comfort<br/>
                Convenience Your Perfect<br/>
                Accommodation Awaits
              </h2>
            </Reveal>

            <Reveal delay={80} className="card01">
              <div style={cardWhite}>
                <span className="marc" style={{position:"absolute",top:18,right:22,fontSize:46,fontWeight:400,color:"rgba(4,17,6,.07)",lineHeight:1}}>01</span>
                <div style={iconCircle()}><IconMap/></div>
                <h3 className="marc" style={{fontSize:23,fontWeight:400,color:DARK,marginBottom:12}}>Flexible Search</h3>
                <p style={{fontSize:15,lineHeight:1.78,color:DARK,opacity:.58,marginBottom:20}}>
                  Travel is the ultimate way to explore the world, embrace new cultures, and create unforgettable memories.
                </p>
                <a href="#" className="read-more" style={{color:DARK}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

            <Reveal delay={60} className="why-avatars">
              <div style={{display:"flex",alignItems:"center",marginBottom:20}}>
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
                  }}/>
                ))}
              </div>
              <p style={{fontSize:16,color:DARK,opacity:.62,lineHeight:1.75}}>
                Unleash Your Inner Explorer.<br/>
                Discover Your Next Destination.<br/>
                Your Next Adventure
              </p>
            </Reveal>

            <Reveal delay={120} className="card02">
              <div style={cardDark}>
                <span className="marc" style={{position:"absolute",top:18,right:22,fontSize:46,fontWeight:400,color:"rgba(201,212,203,.1)",lineHeight:1}}>02</span>
                <div style={iconCircle(true)}><IconBuilding/></div>
                <h3 className="marc" style={{fontSize:23,fontWeight:400,color:BG,marginBottom:12}}>Trusted Listings</h3>
                <p style={{fontSize:15,lineHeight:1.78,color:BG,opacity:.62,marginBottom:20}}>
                  Hotels and resorts across countless destinations wherever you travel, we're already there it's a story.
                </p>
                <a href="#" className="read-more" style={{color:BG}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

            <Reveal delay={160} className="circ1">
              <div style={{width:"100%",maxWidth:260,aspectRatio:"1/1",borderRadius:"50%",overflow:"hidden",margin:"0 auto",boxShadow:"0 4px 32px rgba(4,17,6,.15)"}}>
                <img src="/3.jpeg"
                  alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
            </Reveal>

            <Reveal delay={100} className="card03">
              <div style={cardWhite}>
                <span className="marc" style={{position:"absolute",top:18,right:22,fontSize:46,fontWeight:400,color:"rgba(4,17,6,.07)",lineHeight:1}}>03</span>
                <div style={iconCircle()}><IconMountain/></div>
                <h3 className="marc" style={{fontSize:23,fontWeight:400,color:DARK,marginBottom:12}}>Beautiful View</h3>
                <p style={{fontSize:15,lineHeight:1.78,color:DARK,opacity:.58,marginBottom:20}}>
                  Wake up to breathtaking scenery every morning — our hotels are located in some of the world's most stunning locations.
                </p>
                <a href="#" className="read-more" style={{color:DARK}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

            <Reveal delay={140} className="circ2">
              <div style={{width:"100%",maxWidth:260,aspectRatio:"1/1",borderRadius:"50%",overflow:"hidden",margin:"0 auto",boxShadow:"0 4px 32px rgba(4,17,6,.15)"}}>
                <img src="/4.jpeg"
                  alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
            </Reveal>

            <Reveal delay={180} className="card04">
              <div style={cardWhite}>
                <span className="marc" style={{position:"absolute",top:18,right:22,fontSize:46,fontWeight:400,color:"rgba(4,17,6,.07)",lineHeight:1}}>04</span>
                <div style={iconCircle()}><IconPaw/></div>
                <h3 className="marc" style={{fontSize:23,fontWeight:400,color:DARK,marginBottom:12}}>Pet Friendly Hotels</h3>
                <p style={{fontSize:15,lineHeight:1.78,color:DARK,opacity:.58,marginBottom:20}}>
                  Our pet-friendly hotels are designed to welcome every member of your family including your pets.
                </p>
                <a href="#" className="read-more" style={{color:DARK}}>READ MORE <IconArrow/></a>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════ BOOKING PROCESS ══════════ */}
      <section className="section-pad" style={{padding:"110px 0",background:BG}}>
        <div className="section-inner" style={{maxWidth:1400,margin:"0 auto",padding:"0 48px"}}>
          <Reveal>
            <div style={{marginBottom:64}}>
              <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",opacity:.4,display:"block",marginBottom:12}}>HOW DOES IT WORK</span>
              <h2 className="marc" style={{fontSize:"clamp(28px,4.5vw,62px)",fontWeight:400}}>Our Booking Process</h2>
            </div>
          </Reveal>
          <div className="steps-4col" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
            {STEPS.map((s,i)=>(
              <Reveal key={s.step} delay={i*80}>
                <div className="step-item" style={{padding:"clamp(24px,3vw,44px) clamp(20px,2.5vw,36px)"}}>
                  <span style={{display:"inline-block",fontSize:11,fontWeight:700,letterSpacing:".2em",
                    color:DARK,background:"rgba(4,17,6,.07)",padding:"5px 14px",
                    marginBottom:24,textTransform:"uppercase"}}>{s.step}</span>
                  <div style={{width:44,height:44,color:DARK,marginBottom:16}}><s.Icon/></div>
                  <h3 className="marc" style={{fontSize:"clamp(18px,1.8vw,24px)",fontWeight:400,marginBottom:12}}>{s.title}</h3>
                  <p style={{fontSize:"clamp(13px,1.2vw,16px)",lineHeight:1.78,opacity:.56}}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ RESTAURANT & BARS ══════════ */}
      <section className="section-pad" style={{padding:"110px 0",background:DARK}}>
        <div className="section-inner" style={{maxWidth:1400,margin:"0 auto",padding:"0 48px"}}>
          <Reveal>
            <div style={{marginBottom:64}}>
              <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",color:"rgba(201,212,203,.38)",display:"block",marginBottom:12}}>RESTAURANT AND BARS</span>
              <h2 className="marc" style={{fontSize:"clamp(24px,3.5vw,58px)",color:BG,fontWeight:400,lineHeight:1.2}}>Create Memories Across The Globe</h2>
              <h2 className="marc" style={{fontSize:"clamp(24px,3.5vw,58px)",color:"rgba(201,212,203,.2)",fontWeight:400,lineHeight:1.2}}>with Journeys Designed Around You</h2>
            </div>
          </Reveal>
          <div className="rest-3col" style={{display:"grid",gridTemplateColumns:"1fr 1.2fr 1fr",gap:36,alignItems:"start"}}>
            <Reveal delay={80}>
              <div style={{background:"rgba(201,212,203,.05)",border:"1px solid rgba(201,212,203,.08)",padding:"40px 32px",borderRadius:8}}>
                <div style={{width:44,height:44,color:BG,marginBottom:16,opacity:.7}}><IconUtensils/></div>
                <h3 className="marc" style={{fontSize:"clamp(20px,2vw,26px)",color:BG,fontWeight:400,marginBottom:14}}>Passion On Plate</h3>
                <p style={{fontSize:"clamp(14px,1.4vw,16px)",color:"rgba(201,212,203,.52)",lineHeight:1.8,marginBottom:28}}>
                  Safe payments and instant confirmations — trust and reliability built into every reservation.
                </p>
                <a href="#" style={{display:"inline-flex",alignItems:"center",gap:8,color:BG,
                  border:"1px solid rgba(201,212,203,.28)",padding:"12px 26px",
                  fontSize:12,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",textDecoration:"none"}}>DISCOVER MORE ›</a>
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
                <img src="/6.jpeg"
                  alt="" style={{width:"100%",height:240,objectFit:"cover",display:"block",borderRadius:4}}/>
              </div>
            </Reveal>
            <Reveal delay={240} className="rest-col3">
              <div>
                <img src="/7.jpeg"
                  alt="" style={{width:"100%",height:220,objectFit:"cover",display:"block",marginBottom:24,borderRadius:4}}/>
                <h4 className="marc" style={{fontSize:"clamp(20px,2vw,24px)",color:BG,fontWeight:400,marginBottom:14}}>Passion On Plate</h4>
                <p style={{fontSize:"clamp(14px,1.4vw,16px)",color:"rgba(201,212,203,.52)",lineHeight:1.8,marginBottom:22}}>
                  Experience travel as it's meant to be—immersive, inspiring, unforgettable. From dream to destination, we bring the world to your doorstep.
                </p>
                <a href="#" style={{display:"inline-flex",alignItems:"center",gap:6,color:BG,
                  border:"1px solid rgba(201,212,203,.28)",padding:"12px 26px",
                  fontSize:12,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",textDecoration:"none"}}>› DINING EXPERIENCE</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="section-pad" style={{padding:"110px 0",background:BG}}>
        <div className="section-inner" style={{maxWidth:1400,margin:"0 auto",padding:"0 48px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:60,flexWrap:"wrap",gap:20}}>
            <Reveal>
              <div>
                <span style={{fontSize:12,letterSpacing:".28em",textTransform:"uppercase",opacity:.4,display:"block",marginBottom:12}}>CUSTOMERS FEEDBACK</span>
                <h2 className="marc" style={{fontSize:"clamp(24px,3.5vw,58px)",fontWeight:400}}>What Our Clients Say</h2>
              </div>
            </Reveal>
            <div style={{display:"flex",gap:12}}>
              <button onClick={()=>setSlide(p=>(p-1+TESTIMONIALS.length)%TESTIMONIALS.length)}
                style={{width:52,height:52,border:"1.5px solid rgba(4,17,6,.18)",background:"none",cursor:"pointer",fontSize:20,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
              <button onClick={()=>setSlide(p=>(p+1)%TESTIMONIALS.length)}
                style={{width:52,height:52,border:`1.5px solid ${DARK}`,background:DARK,color:BG,cursor:"pointer",fontSize:20,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center"}}>→</button>
            </div>
          </div>
          <div className="testi-3col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
            {[0,1,2].map(offset=>{
              const t = TESTIMONIALS[(slide+offset)%TESTIMONIALS.length];
              const mid = offset===1;
              return (
                <div key={offset} className={offset===2?"testi-hide":offset===0?"testi-hide2":""} style={{
                  background:mid?DARK:"rgba(4,17,6,.04)",
                  border:"1px solid rgba(4,17,6,.08)",
                  padding:"38px 34px",transition:"all .5s",borderRadius:8,
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
                    <img src={t.img} alt={t.name} style={{width:56,height:56,borderRadius:"50%",objectFit:"cover"}}/>
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