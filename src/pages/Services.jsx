import { useState, useEffect, useRef } from "react";

const IMGS = {
  hero:      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80&fit=crop",
  suite:     "/3.png",
  spa:       "/2.png",
  dining:    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop",
  events:    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80&fit=crop",
  trails:    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80&fit=crop",
  concierge: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&fit=crop",
  cta:       "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=80&fit=crop",
};

const SERVICES = [
  { 
    num:"01", 
    label:"Stay",      
    title:"Food & Dining / Cafe",  
    img:IMGS.suite,     
    desc:"A vibrant dining space serving freshly prepared meals, artisan coffee, and seasonal delights. From relaxed breakfasts to cozy evening bites, every dish is crafted to comfort and inspire.", 
    tags:["Cafe seating","Multi-cuisine","Fresh bakery","Beverages"],      
    price:"Avg ₹500–₹1,500 / person" 
  },

  { 
    num:"02", 
    label:"Restore",   
    title:"Guest Services",        
    img:IMGS.spa,       
    desc:"Thoughtful services designed to make your stay seamless and comfortable. From 24/7 assistance to personalized arrangements, we ensure every guest feels cared for.",              
    tags:["24/7 support","Room service","Housekeeping","Travel desk"],       
    price:"Included with stay" 
  },

  { 
    num:"03", 
    label:"Taste",     
    title:"Swimming Pool",     
    img:IMGS.dining,    
    desc:"A serene poolside escape perfect for relaxation and leisure. Enjoy refreshing dips, lounge by the water, or unwind with scenic surroundings.",                                 
    tags:["Outdoor pool","Kids area","Poolside seating","Clean & safe"], 
    price:"Included / Guest access" 
  },

  { 
    num:"04", 
    label:"Gather",    
    title:"Banquet Hall",      
    img:IMGS.events,    
    desc:"A spacious and elegant venue ideal for celebrations, meetings, and special occasions. Designed to host everything from intimate gatherings to grand events.",                       
    tags:["Weddings","Corporate events","AC hall","Catering"],           
    price:"Custom pricing" 
  },

  { 
    num:"05", 
    label:"Wander",    
    title:"Facilities & Convenience / Parking",       
    img:IMGS.trails,    
    desc:"Convenient on-site facilities including secure parking and essential amenities to ensure a hassle-free experience for all guests.",                    
    tags:["Free parking","24/7 security","Easy access","Spacious area"],   
    price:"Free for guests" 
  },
];
const STATS = [
  { v:"25+", l:"Years of Excellence" },
  { v:"120",  l:"Forest Suites" },
  { v:"4.9★", l:"Guest Rating" },
  { v:"18",   l:"Industry Awards" },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 60) { setInView(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []); // eslint-disable-line
  return inView;
}

export default function ServicesPage() {
  const [active, setActive]       = useState(0);
  const [imgLoaded, setImgLoaded] = useState({});
  const [menuOpen, setMenuOpen]   = useState(false);
  const [isMobile, setIsMobile]   = useState(false);

  const heroRef  = useRef(null);
  const gridRef  = useRef(null);
  const ctaRef   = useRef(null);
  const stripRef = useRef(null);
  const hsTrack  = useRef(null);
  const heroIn   = useInView(heroRef);
  const gridIn   = useInView(gridRef);
  const ctaIn    = useInView(ctaRef);
  const stripIn  = useInView(stripRef);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const onMouseDown  = (e) => { drag.current = { active:true, startX: e.pageX - hsTrack.current.offsetLeft, scrollLeft: hsTrack.current.scrollLeft }; hsTrack.current.style.cursor = "grabbing"; };
  const onMouseLeave = ()  => { drag.current.active = false; if (hsTrack.current) hsTrack.current.style.cursor = "grab"; };
  const onMouseUp    = ()  => { drag.current.active = false; if (hsTrack.current) hsTrack.current.style.cursor = "grab"; };
  const onMouseMove  = (e) => { if (!drag.current.active) return; e.preventDefault(); const x = e.pageX - hsTrack.current.offsetLeft; hsTrack.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.4; };

  const svc = SERVICES[active];
  const markLoaded = (key) => setImgLoaded(p => ({ ...p, [key]: true }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Marcellus+SC&display=swap');
      
        html { scroll-behavior: smooth; }

        :root {
          --bg:    #c9d4cb;
          --dark:  #1a3d2b;
          --mid:   #2d5a3d;
          --muted: rgba(26,61,43,0.45);
          --font:  'Marcellus', serif;
          --fontsc:'Marcellus SC', serif;
          --pad-x: clamp(20px, 5vw, 72px);
        }

        body { background: var(--bg); overflow-x: hidden; }

        .page {
          font-family: var(--font);
          background: var(--bg);
          color: var(--dark);
          overflow-x: hidden;
        }

        /* ── NAV ─────────────────────────────────── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px var(--pad-x);
          background: transparent;
          transition: background .3s, backdrop-filter .3s;
        }
        .nav.scrolled {
          background: rgba(10,28,18,.85);
          backdrop-filter: blur(12px);
        }
        .nav-brand { font-family: var(--fontsc); font-size: 18px; color: #c9d4cb; letter-spacing: .06em; }
        .nav-links { display: flex; gap: 32px; }
        .nav-link {
          font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
          color: rgba(201,212,203,.7); text-decoration: none; transition: color .2s;
        }
        .nav-link:hover { color: #c9d4cb; }
        .nav-cta {
          padding: 10px 24px; background: rgba(201,212,203,.15);
          border: 1px solid rgba(201,212,203,.3); border-radius: 9999px;
          font-family: var(--font); font-size: 11px; letter-spacing: .14em;
          text-transform: uppercase; color: #c9d4cb; cursor: pointer;
          transition: all .2s;
        }
        .nav-cta:hover { background: rgba(201,212,203,.25); }
        .nav-burger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .nav-burger span {
          display: block; width: 24px; height: 1.5px;
          background: rgba(201,212,203,.8); transition: all .25s;
        }
        .mobile-menu {
          display: none; position: fixed; inset: 0; z-index: 200;
          background: var(--dark); flex-direction: column;
          align-items: flex-start; justify-content: center;
          padding: clamp(40px,10vw,80px);
          gap: 0;
        }
        .mobile-menu.open { display: flex; animation: fadeInMenu .25s ease; }
        @keyframes fadeInMenu { from{opacity:0} to{opacity:1} }
        .mm-close {
          position: absolute; top: 24px; right: var(--pad-x);
          background: none; border: none; cursor: pointer;
          font-size: 28px; color: rgba(201,212,203,.7); line-height: 1;
        }
        .mm-link {
          font-family: var(--fontsc); font-size: clamp(28px,6vw,48px);
          color: rgba(201,212,203,.6); text-decoration: none;
          padding: 16px 0; border-bottom: 1px solid rgba(201,212,203,.08);
          width: 100%; transition: color .2s;
        }
        .mm-link:hover { color: #c9d4cb; }

        /* ── HERO ─────────────────────────────────── */
        .hero {
          position: relative; height: 100svh; min-height: 580px;
          overflow: hidden; display: flex; align-items: flex-end;
        }
        .hero-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          transform: scale(1.08);
          transition: transform 8s ease;
          filter: brightness(0.45);
        }
        .hero-img.loaded { transform: scale(1); }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,28,18,.92) 0%, rgba(10,28,18,.50) 45%, rgba(10,28,18,.10) 100%);
        }
        .hero-content {
          position: relative; z-index: 2;
          padding: 0 var(--pad-x) clamp(48px,8vh,80px);
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-end;
          gap: 48px;
          opacity: 0; transform: translateY(28px);
          transition: opacity .85s ease .2s, transform .85s ease .2s;
        }
        .hero-content.in { opacity: 1; transform: translateY(0); }
        .hero-eyebrow {
          font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
          color: rgba(201,212,203,.55);
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 22px;
        }
        .hero-eyebrow::before { content:''; width:36px; height:1px; background:rgba(201,212,203,.4); }
        .hero-h1 {
          font-size: clamp(40px,6vw,88px); color:#c9d4cb;
          line-height: 1.0; font-weight:400; margin-bottom:28px;
        }
        .hero-h1 em { font-style:italic; color:rgba(201,212,203,.4); }
        .hero-p {
          font-size: clamp(14px,1.5vw,16px); color:rgba(201,212,203,.65);
          line-height:1.9; max-width:380px; margin-bottom:44px;
        }
        .hero-btns { display:flex; gap:14px; flex-wrap:wrap; }
        .btn-light {
          padding: 13px 28px; background:#c9d4cb; color:var(--dark);
          border:none; border-radius:9999px; font-family:var(--font);
          font-size:12px; letter-spacing:.15em; text-transform:uppercase;
          cursor:pointer; transition:opacity .2s; white-space:nowrap;
        }
        .btn-light:hover { opacity:.82; }
        .btn-ghost {
          padding: 13px 28px; background:transparent;
          color:rgba(201,212,203,.75);
          border:1px solid rgba(201,212,203,.28); border-radius:9999px;
          font-family:var(--font); font-size:12px;
          letter-spacing:.15em; text-transform:uppercase;
          cursor:pointer; transition:all .2s; white-space:nowrap;
        }
        .btn-ghost:hover { border-color:rgba(201,212,203,.55); color:#c9d4cb; }
        .hero-stats { display:flex; flex-direction:column; align-self:flex-end; }
        .hstat {
          display:flex; justify-content:space-between; align-items:baseline;
          border-bottom:1px solid rgba(201,212,203,.10); padding:18px 0;
        }
        .hstat:first-child { border-top:1px solid rgba(201,212,203,.10); }
        .hstat-v { font-size:clamp(26px,3vw,44px); color:#c9d4cb; line-height:1; }
        .hstat-l { font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:rgba(201,212,203,.38); }

        /* ── MARQUEE ──────────────────────────────── */
        .marquee { overflow:hidden; background:var(--dark); padding:20px 0; }
        .mtrack { display:flex; width:max-content; animation:mq 28s linear infinite; }
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .mitem {
          display:flex; align-items:center; gap:28px; padding:0 28px;
          font-size:11px; letter-spacing:.24em; text-transform:uppercase;
          color:rgba(201,212,203,.38); white-space:nowrap;
        }
        .mdot { width:3px; height:3px; border-radius:50%; background:rgba(201,212,203,.2); flex-shrink:0; }

        /* ── SELECTOR ─────────────────────────────── */
        .selector {
          display:grid; grid-template-columns:400px 1fr; min-height:85vh;
        }
        .sel-list {
          background:var(--bg);
          border-right:1px solid rgba(26,61,43,.10);
          padding:64px 0; overflow-y:auto;
        }
        .sel-head {
          font-size:10px; letter-spacing:.24em; text-transform:uppercase;
          color:var(--muted); padding:0 52px 28px;
          border-bottom:1px solid rgba(26,61,43,.07); margin-bottom:8px;
        }
        .sel-row {
          display:flex; align-items:center; gap:18px;
          padding:20px 52px; cursor:pointer;
          border-left:3px solid transparent; transition:all .28s;
        }
        .sel-row.on { border-left-color:var(--dark); background:rgba(26,61,43,.05); }
        .sel-row:hover:not(.on) { background:rgba(26,61,43,.03); }
        .sr-num { font-family:var(--fontsc); font-size:12px; color:rgba(26,61,43,.28); width:18px; flex-shrink:0; transition:color .28s; }
        .sel-row.on .sr-num { color:rgba(26,61,43,.5); }
        .sr-lbl { font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:rgba(26,61,43,.35); width:56px; flex-shrink:0; transition:color .28s; }
        .sel-row.on .sr-lbl { color:rgba(26,61,43,.55); }
        .sr-title { font-size:19px; color:rgba(26,61,43,.48); transition:all .28s; }
        .sel-row.on .sr-title { color:var(--dark); font-size:21px; }

        /* Mobile accordion selector */
        .mobile-selector { display:none; }
        .mob-sel-item {
          border-bottom:1px solid rgba(26,61,43,.08);
        }
        .mob-sel-header {
          display:flex; align-items:center; gap:14px;
          padding:18px var(--pad-x); cursor:pointer;
          background:transparent; border:none; width:100%;
          text-align:left; transition:background .2s;
        }
        .mob-sel-header.on { background:rgba(26,61,43,.06); }
        .mob-sel-panel {
          overflow:hidden; max-height:0; transition:max-height .4s ease;
          background:var(--dark);
        }
        .mob-sel-panel.open { max-height:600px; }
        .mob-panel-inner {
          padding:32px var(--pad-x);
        }

        .sel-panel {
          position:relative; overflow:hidden; background:var(--dark);
          display:flex; flex-direction:column; justify-content:flex-end;
          min-height:500px;
        }
        .panel-img {
          position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
          transition:opacity .6s ease, transform .6s ease;
          opacity:0; transform:scale(1.04);
        }
        .panel-img.loaded { opacity:1; transform:scale(1); }
        .panel-grad {
          position:absolute; inset:0;
          background:linear-gradient(to top, rgba(10,28,18,.95) 0%, rgba(10,28,18,.5) 50%, rgba(10,28,18,.1) 100%);
          z-index:1;
        }
        .panel-body {
          position:relative; z-index:2;
          padding:clamp(28px,4vw,56px) clamp(24px,5vw,60px);
          display:flex; flex-direction:column;
        }
        .panel-num {
          position:absolute; top:32px; right:40px;
          font-family:var(--fontsc); font-size:clamp(60px,10vw,120px);
          color:rgba(201,212,203,.04); line-height:1; pointer-events:none;
        }
        .p-lbl { font-size:10px; letter-spacing:.26em; text-transform:uppercase; color:rgba(201,212,203,.42); margin-bottom:14px; }
        .p-title { font-size:clamp(28px,3.5vw,54px); color:#c9d4cb; font-weight:400; line-height:1.05; margin-bottom:20px; }
        .p-desc { font-size:clamp(13px,1.4vw,15px); color:rgba(201,212,203,.65); line-height:1.9; max-width:420px; margin-bottom:28px; }
        .p-tags { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px; }
        .p-tag { padding:6px 14px; border:1px solid rgba(201,212,203,.18); border-radius:9999px; font-size:10px; letter-spacing:.10em; text-transform:uppercase; color:rgba(201,212,203,.5); }
        .p-price { font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:rgba(201,212,203,.35); margin-bottom:32px; }
        .p-cta {
          display:inline-flex; align-items:center; gap:10px;
          padding:13px 30px; background:#c9d4cb; border:none;
          border-radius:9999px; font-family:var(--font); font-size:12px;
          letter-spacing:.14em; text-transform:uppercase;
          color:var(--dark); cursor:pointer; width:fit-content;
          transition:opacity .2s;
        }
        .p-cta:hover { opacity:.85; }

        /* ── MOSAIC GRID ─────────────────────────── */
        .mosaic-section {
          padding: clamp(48px,8vw,100px) var(--pad-x);
          opacity:0; transform:translateY(22px);
          transition:opacity .85s ease, transform .85s ease;
        }
        .mosaic-section.in { opacity:1; transform:translateY(0); }
        .mosaic-hdr { text-align:center; margin-bottom:64px; }
        .mosaic-eyebrow { font-size:10px; letter-spacing:.26em; text-transform:uppercase; color:var(--muted); margin-bottom:16px; }
        .mosaic-h2 { font-size:clamp(28px,4vw,56px); color:var(--dark); font-weight:400; line-height:1.1; margin-bottom:20px; }
        .mosaic-line { width:48px; height:1px; background:var(--dark); margin:0 auto; opacity:.25; }
        .mosaic-grid {
          display:grid;
          grid-template-columns: repeat(3,1fr);
          grid-template-rows: 320px 320px;
          gap:20px;
        }
        .mcard {
          position:relative; border-radius:20px; overflow:hidden;
          cursor:pointer; transition:transform .35s ease, box-shadow .35s ease;
        }
        .mcard:hover { transform:scale(1.02); box-shadow:0 24px 56px rgba(26,61,43,.22); }
        .mcard.big { grid-column:span 2; }
        .mcard-img {
          width:100%; height:100%; object-fit:cover;
          transition:transform .6s ease; filter:brightness(.62);
        }
        .mcard:hover .mcard-img { transform:scale(1.06); filter:brightness(.72); }
        .mcard-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(10,28,18,.88) 0%, transparent 55%); }
        .mcard-body { position:absolute; bottom:0; left:0; right:0; padding:28px 32px; }
        .mc-num { font-family:var(--fontsc); font-size:11px; letter-spacing:.18em; color:rgba(201,212,203,.45); margin-bottom:6px; }
        .mc-title { font-size:22px; color:#c9d4cb; line-height:1.15; margin-bottom:8px; }
        .mcard.big .mc-title { font-size:clamp(20px,2.5vw,30px); }
        .mc-lbl { font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:rgba(201,212,203,.45); }
        .mc-hover { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity .3s; }
        .mcard:hover .mc-hover { opacity:1; }
        .mc-hover-btn {
          padding:11px 26px; background:rgba(201,212,203,.15);
          border:1px solid rgba(201,212,203,.35); border-radius:9999px;
          font-family:var(--font); font-size:11px; letter-spacing:.14em;
          text-transform:uppercase; color:#c9d4cb; backdrop-filter:blur(8px);
        }

        /* ── STRIP ────────────────────────────────── */
        .strip {
          position:relative; height:clamp(300px,50vw,500px); overflow:hidden;
          display:flex; align-items:center; justify-content:center;
        }
        .strip-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(.38); }
        .strip-overlay { position:absolute; inset:0; background:rgba(10,28,18,.35); }
        .strip-content {
          position:relative; z-index:2; text-align:center; padding:0 var(--pad-x);
          opacity:0; transform:translateY(20px);
          transition:opacity .85s ease, transform .85s ease;
        }
        .strip-content.in { opacity:1; transform:translateY(0); }
        .strip-eyebrow { font-size:10px; letter-spacing:.28em; text-transform:uppercase; color:rgba(201,212,203,.45); margin-bottom:20px; }
        .strip-h2 { font-size:clamp(28px,5vw,72px); color:#c9d4cb; font-weight:400; line-height:1.05; margin-bottom:32px; }
        .strip-h2 em { font-style:italic; color:rgba(201,212,203,.45); }

        /* ── HSCROLL ──────────────────────────────── */
        .hscroll { padding:clamp(48px,8vw,96px) 0 clamp(48px,8vw,96px) var(--pad-x); overflow:hidden; }
        .hs-hdr {
          display:flex; align-items:flex-end; justify-content:space-between;
          padding-right:var(--pad-x); margin-bottom:40px; flex-wrap:wrap; gap:20px;
        }
        .hs-h2 { font-size:clamp(24px,3vw,44px); color:var(--dark); font-weight:400; line-height:1.1; }
        .hs-hint { font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); display:flex; align-items:center; gap:8px; }
        .hs-controls { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
        .hs-btn {
          width:42px; height:42px; border-radius:50%;
          border:1px solid rgba(26,61,43,.2); background:transparent;
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          color:var(--dark); transition:all .2s; flex-shrink:0;
        }
        .hs-btn:hover { background:rgba(26,61,43,.08); }
        .hs-track {
          display:flex; gap:20px;
          overflow-x:scroll; -webkit-overflow-scrolling:touch;
          padding-right:var(--pad-x); padding-bottom:12px;
          scrollbar-width:none; scroll-snap-type:x mandatory; cursor:grab;
        }
        .hs-track::-webkit-scrollbar { display:none; }
        .hcard {
          scroll-snap-align:start; flex-shrink:0;
          width:clamp(260px,80vw,320px); border-radius:18px; overflow:hidden;
          position:relative; cursor:pointer;
          transition:transform .35s, box-shadow .35s;
          box-shadow:0 4px 20px rgba(26,61,43,.08);
        }
        .hcard:hover { transform:translateY(-8px); box-shadow:0 24px 48px rgba(26,61,43,.2); }
        .hcard-img { width:100%; height:220px; object-fit:cover; transition:transform .5s; filter:brightness(.75); }
        .hcard:hover .hcard-img { transform:scale(1.06); }
        .hcard-body { padding:28px 28px 32px; background:rgba(255,255,255,.55); backdrop-filter:blur(8px); }
        .hc-lbl { font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-bottom:8px; }
        .hc-title { font-size:21px; color:var(--dark); margin-bottom:10px; }
        .hc-price { font-size:12px; letter-spacing:.10em; text-transform:uppercase; color:var(--muted); margin-bottom:16px; }
        .hc-arrow { font-size:18px; color:var(--dark); opacity:.4; transition:opacity .2s; }
        .hcard:hover .hc-arrow { opacity:1; }

        /* ── CTA ──────────────────────────────────── */
        .cta-section {
          position:relative; overflow:hidden;
          height:clamp(400px,60vw,560px); display:flex; align-items:center; justify-content:center;
          opacity:0; transform:translateY(20px);
          transition:opacity .85s ease, transform .85s ease;
        }
        .cta-section.in { opacity:1; transform:translateY(0); }
        .cta-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(.32); }
        .cta-overlay { position:absolute; inset:0; background:rgba(10,28,18,.42); }
        .cta-body { position:relative; z-index:2; text-align:center; padding:0 var(--pad-x); max-width:700px; }
        .cta-eyebrow { font-size:10px; letter-spacing:.28em; text-transform:uppercase; color:rgba(201,212,203,.42); margin-bottom:20px; }
        .cta-h2 { font-size:clamp(28px,5vw,64px); color:#c9d4cb; font-weight:400; line-height:1.08; margin-bottom:22px; }
        .cta-p { font-size:clamp(13px,1.4vw,15px); color:rgba(201,212,203,.58); line-height:1.9; margin-bottom:44px; }
        .cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

        /* ── FOOTER ───────────────────────────────── */
        .footer {
          background:var(--dark);
          display:grid; grid-template-columns:1fr 1fr 1fr;
          padding:clamp(40px,6vw,64px) var(--pad-x);
          gap:clamp(24px,4vw,40px);
          border-top:1px solid rgba(201,212,203,.06);
        }
        .ft-brand { font-family:var(--fontsc); font-size:22px; color:rgba(201,212,203,.7); letter-spacing:.06em; margin-bottom:14px; }
        .ft-sub { font-size:13px; color:rgba(201,212,203,.35); line-height:1.8; max-width:220px; }
        .ft-col-title { font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:rgba(201,212,203,.35); margin-bottom:20px; }
        .ft-link { display:block; font-size:15px; color:rgba(201,212,203,.55); margin-bottom:12px; cursor:pointer; transition:color .2s; text-decoration:none; }
        .ft-link:hover { color:#c9d4cb; }
        .ft-bottom {
          background:var(--dark); padding:20px var(--pad-x);
          display:flex; justify-content:space-between; align-items:center;
          border-top:1px solid rgba(201,212,203,.06); flex-wrap:wrap; gap:8px;
        }
        .ft-copy { font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:rgba(201,212,203,.22); }

        /* ════════ BREAKPOINTS ════════ */

        /* 1024px */
        @media (max-width:1024px) {
          .nav-links { display:none; }
          .nav-cta   { display:none; }
          .nav-burger{ display:flex; }
          .hero-content { grid-template-columns:1fr; }
          .hero-stats { display:none; }
          .selector {
            grid-template-columns:1fr;
            min-height:auto;
          }
          .sel-list  { display:none; }
          .mobile-selector { display:block; }
          .sel-panel { min-height:420px; }
          .mosaic-grid {
            grid-template-columns:1fr 1fr;
            grid-template-rows:auto;
          }
          .mcard.big { grid-column:span 2; }
          .footer { grid-template-columns:1fr 1fr; }
        }

        /* 768px */
        @media (max-width:768px) {
          .mosaic-grid {
            grid-template-columns:1fr;
            grid-template-rows:auto;
          }
          .mcard.big { grid-column:span 1; }
          .mcard { border-radius:14px; height:240px; }
          .mcard.big { height:280px; }
          .footer { grid-template-columns:1fr; }
          .ft-bottom { flex-direction:column; text-align:center; }
          .hero-btns { flex-direction:column; align-items:flex-start; }
          .hero-btns .btn-light,
          .hero-btns .btn-ghost { width:100%; text-align:center; justify-content:center; }
          .cta-btns { flex-direction:column; align-items:center; }
          .cta-btns .btn-light,
          .cta-btns .btn-ghost { width:100%; max-width:280px; text-align:center; justify-content:center; }
        }

        /* 480px */
        @media (max-width:480px) {
          .mosaic-hdr { margin-bottom:40px; }
          .hs-hint { display:none; }
          .hcard { width:min(280px,85vw); }
          .strip-h2 { margin-bottom:24px; }
        }
      `}</style>

 

      <div className="page">

   

        {/* ── HERO ── */}
        <section className="hero" ref={heroRef}>
          <img src={IMGS.hero} alt="luxury resort" className={`hero-img${imgLoaded.hero?" loaded":""}`} onLoad={() => markLoaded("hero")}/>
          <div className="hero-overlay"/>
          <div className={`hero-content${heroIn?" in":""}`}>
            <div>
              <div className="hero-eyebrow">The Forest Retreat · Services</div>
              <h1 className="hero-h1">Every detail,<br/><em>considered.</em></h1>
              <p className="hero-p">Six pillars of experience, each designed to dissolve the boundary between guest and place — until you feel you have always belonged here.</p>
              <div className="hero-btns">
                <button className="btn-light">Explore Services</button>
                <button className="btn-ghost">Plan Your Stay</button>
              </div>
            </div>
            <div className="hero-stats">
              {STATS.map(s => (
                <div className="hstat" key={s.l}>
                  <span className="hstat-v">{s.v}</span>
                  <span className="hstat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee">
          <div className="mtrack">
            {[...Array(2)].map((_,i) =>
              ["Luxury Stay","Forest Spa","Fine Dining","Wild Trails","Private Events","24/7 Concierge","Heritage Retreat"].map(t => (
                <div className="mitem" key={`${i}${t}`}>{t}<span className="mdot"/></div>
              ))
            )}
          </div>
        </div>

        {/* ── DESKTOP SELECTOR ── */}
        <section className="selector">
          <div className="sel-list">
            <div className="sel-head">Our Services</div>
            {SERVICES.map((s,i) => (
              <div key={s.num} className={`sel-row${active===i?" on":""}`} onClick={() => setActive(i)}>
                <span className="sr-num">{s.num}</span>
                <span className="sr-lbl">{s.label}</span>
                <span className="sr-title">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="sel-panel">
            <img key={svc.img} src={svc.img} alt={svc.title} className={`panel-img${imgLoaded[svc.num]?" loaded":""}`} onLoad={() => markLoaded(svc.num)}/>
            <div className="panel-grad"/>
            <div className="panel-body">
              <div className="panel-num">{svc.num}</div>
              <div className="p-lbl">{svc.label}</div>
              <h2 className="p-title">{svc.title}</h2>
              <p className="p-desc">{svc.desc}</p>
              <div className="p-tags">{svc.tags.map(t => <span className="p-tag" key={t}>{t}</span>)}</div>
              <div className="p-price">{svc.price}</div>
              <button className="p-cta">Learn More <ArrowRight/></button>
            </div>
          </div>
        </section>

        {/* ── MOBILE ACCORDION SELECTOR ── */}
        <div className="mobile-selector">
          {SERVICES.map((s,i) => (
            <MobileAccordion key={s.num} s={s} open={active===i} onClick={() => setActive(active===i ? -1 : i)} imgLoaded={imgLoaded} markLoaded={markLoaded}/>
          ))}
        </div>

        {/* ── MOSAIC GRID ── */}
        <section className={`mosaic-section${gridIn?" in":""}`} ref={gridRef}>
          <div className="mosaic-hdr">
            <div className="mosaic-eyebrow">All Experiences</div>
            <h2 className="mosaic-h2">Six Ways to Feel<br/>Entirely Alive</h2>
            <div className="mosaic-line"/>
          </div>
          <div className="mosaic-grid">
            {SERVICES.map((s,i) => (
              <div className={`mcard${i===0?" big":""}`} key={s.num}>
                <img src={s.img} alt={s.title} className="mcard-img" onLoad={() => markLoaded(`m${s.num}`)}/>
                <div className="mcard-overlay"/>
                <div className="mcard-body">
                  <div className="mc-num">{s.num}</div>
                  <div className="mc-title">{s.title}</div>
                  <div className="mc-lbl">{s.label}</div>
                </div>
                <div className="mc-hover"><div className="mc-hover-btn">Discover</div></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── STRIP ── */}
        <div className="strip" ref={stripRef}>
          <img src={IMGS.spa} alt="spa" className="strip-img"/>
          <div className="strip-overlay"/>
          <div className={`strip-content${stripIn?" in":""}`}>
            <div className="strip-eyebrow">The Retreat Experience</div>
            <h2 className="strip-h2">Arrive as a guest.<br/><em>Leave as yourself.</em></h2>
            <button className="btn-light">Book a Stay</button>
          </div>
        </div>

        {/* ── HORIZONTAL SCROLL ── */}
        <section className="hscroll">
          <div className="hs-hdr">
            <h2 className="hs-h2">Browse<br/>All Services</h2>
            <div className="hs-controls">
              <button className="hs-btn" onClick={() => hsTrack.current.scrollBy({left:-340,behavior:"smooth"})}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <button className="hs-btn" onClick={() => hsTrack.current.scrollBy({left:340,behavior:"smooth"})}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <div className="hs-hint">Drag to scroll</div>
            </div>
          </div>
          <div className="hs-track" ref={hsTrack} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
            {SERVICES.map(s => (
              <div className="hcard" key={s.num}>
                <img src={s.img} alt={s.title} className="hcard-img"/>
                <div className="hcard-body">
                  <div className="hc-lbl">{s.label}</div>
                  <div className="hc-title">{s.title}</div>
                  <div className="hc-price">{s.price}</div>
                  <div className="hc-arrow">→</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={`cta-section${ctaIn?" in":""}`} ref={ctaRef}>
          <img src={IMGS.cta} alt="resort" className="cta-bg"/>
          <div className="cta-overlay"/>
          <div className="cta-body">
            <div className="cta-eyebrow">Begin Your Journey</div>
            <h2 className="cta-h2">Ready to arrive<br/>and exhale?</h2>
            <p className="cta-p">Our reservations team is awake whenever you are. Write to us, call us, or simply show up — we will be ready.</p>
            <div className="cta-btns">
              <button className="btn-light">Reserve a Suite</button>
              <button className="btn-ghost">Contact Us</button>
            </div>
          </div>
        </section>

     

      </div>
    </>
  );
}



function MobileAccordion({ s, open, onClick, imgLoaded, markLoaded }) {
  return (
    <div className="mob-sel-item">
      <button className={`mob-sel-header${open?" on":""}`} onClick={onClick}>
        <span style={{fontFamily:"'Marcellus SC',serif",fontSize:12,color:"rgba(26,61,43,.35)",width:20,flexShrink:0}}>{s.num}</span>
        <span style={{fontSize:11,letterSpacing:".16em",textTransform:"uppercase",color:"rgba(26,61,43,.4)",width:60,flexShrink:0}}>{s.label}</span>
        <span style={{fontSize:18,color:open?"#1a3d2b":"rgba(26,61,43,.5)",fontFamily:"'Marcellus',serif",flex:1,textAlign:"left"}}>{s.title}</span>
        <span style={{fontSize:18,color:"rgba(26,61,43,.4)",transform:open?"rotate(90deg)":"rotate(0)",transition:"transform .3s",flexShrink:0}}>›</span>
      </button>
      <div className={`mob-sel-panel${open?" open":""}`}>
        <div style={{position:"relative",height:260,overflow:"hidden"}}>
          <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(.55)"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,28,18,.8) 0%,transparent 60%)"}}/>
        </div>
        <div className="mob-panel-inner">
          <div className="p-lbl" style={{marginBottom:10}}>{s.label}</div>
          <h3 className="p-title" style={{fontSize:"clamp(22px,5vw,32px)",marginBottom:16}}>{s.title}</h3>
          <p className="p-desc" style={{marginBottom:20}}>{s.desc}</p>
          <div className="p-tags" style={{marginBottom:12}}>
            {s.tags.map(t => <span className="p-tag" key={t}>{t}</span>)}
          </div>
          <div className="p-price" style={{marginBottom:24}}>{s.price}</div>
          <button className="p-cta">Learn More <ArrowRight/></button>
        </div>
      </div>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a3d2b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}