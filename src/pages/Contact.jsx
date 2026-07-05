import { useState, useRef, useEffect } from "react";

const G = {
  bg: "#c9d4cb", ink: "#041106",
  border: "rgba(4,17,6,0.1)", muted: "rgba(4,17,6,0.45)",
};

const IMGS = {
  hero:     "/16.jpeg",
  mountains:"https://i.pinimg.com/736x/3d/fd/fd/3dfdfda5edea7b1d6e643f4cf03911bf.jpg",
  beach:    "https://i.pinimg.com/736x/36/c4/03/36c4032d0ffe8c8f4973d9458b3ac584.jpg",
  forest:   "https://i.pinimg.com/1200x/6f/66/49/6f66495d5029ce2f5e6458fec4886d38.jpg",
  city:     "https://i.pinimg.com/736x/21/7d/75/217d75f7c859dd935af667519d0c4edf.jpg",
  india:    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
  team:     "/2.jpeg",
};

const OFFICE_LAT = 26.0173;
const OFFICE_LNG = 76.3773;
const MAP_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${OFFICE_LNG-0.015}%2C${OFFICE_LAT-0.01}%2C${OFFICE_LNG+0.015}%2C${OFFICE_LAT+0.01}&layer=mapnik&marker=${OFFICE_LAT}%2C${OFFICE_LNG}`;

/* ─── GLOBAL STYLES ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: ${G.bg};
      font-family: 'Jost', sans-serif;
      color: ${G.ink};
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    img { max-width: 100%; display: block; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: rgba(4,17,6,0.2); border-radius: 3px; }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
    @keyframes spin     { to   { transform:rotate(360deg); } }
    @keyframes breathe  { 0%,100%{transform:scale(1);} 50%{transform:scale(1.12);} }
    @keyframes panLeft  { from{transform:scale(1.08) translateX(0);} to{transform:scale(1.08) translateX(-2%);} }

    .reveal { opacity:0; transform:translateY(30px); transition:opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
    .reveal.vis { opacity:1; transform:translateY(0); }

    /* ── Form elements ── */
    .fi {
      width:100%; background:transparent; border:none;
      border-bottom:1.5px solid rgba(4,17,6,.18);
      padding:11px 0 9px;
      font-family:'Jost',sans-serif; font-size:15px; font-weight:300;
      color:${G.ink}; outline:none; transition:border-color .25s; border-radius:0;
      min-height: 44px;
    }
    .fi::placeholder { color:rgba(4,17,6,.3); }
    .fi:focus { border-bottom-color:${G.ink}; }
    textarea.fi { resize:none; min-height:88px; line-height:1.7; padding-top: 8px; }
    select.fi { cursor:pointer; appearance:none; }
    .fl { display:block; font-size:10px; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:rgba(4,17,6,.42); margin-bottom:4px; }

    /* ── Chips ── */
    .chip {
      padding:8px 14px; border:1px solid rgba(4,17,6,.14); background:transparent;
      font-family:'Jost',sans-serif; font-size:12px; font-weight:400;
      color:rgba(4,17,6,.55); cursor:pointer; transition:all .2s;
      letter-spacing:.03em; border-radius:999px;
      min-height: 36px; white-space: nowrap;
    }
    .chip:hover { color:${G.ink}; border-color:rgba(4,17,6,.4); }
    .chip.on { background:${G.ink}; color:${G.bg}; border-color:${G.ink}; }

    /* ── Buttons ── */
    .btn-p {
      position:relative; overflow:hidden;
      display:inline-flex; align-items:center; gap:10px;
      background:${G.ink}; color:${G.bg}; border:none;
      padding:14px 28px;
      font-family:'Jost',sans-serif; font-size:12px; font-weight:500;
      letter-spacing:.1em; text-transform:uppercase; cursor:pointer;
      transition:transform .22s, box-shadow .22s;
      white-space:nowrap; min-height: 48px;
    }
    .btn-p:hover { transform:translateY(-2px); box-shadow:0 12px 36px rgba(4,17,6,.22); }
    .btn-p:active { transform:scale(.97); }
    .btn-p:disabled { opacity:.5; cursor:not-allowed; transform:none; }

    .btn-g {
      display:inline-flex; align-items:center; gap:8px;
      background:transparent; border:1px solid rgba(4,17,6,.22);
      padding:10px 20px;
      font-family:'Jost',sans-serif; font-size:12px; font-weight:500;
      letter-spacing:.08em; text-transform:uppercase;
      color:${G.ink}; cursor:pointer; transition:all .22s;
      text-decoration:none; white-space:nowrap; min-height: 44px;
    }
    .btn-g:hover { background:${G.ink}; color:${G.bg}; }

    /* ── Info tiles ── */
    .itile {
      display:flex; align-items:flex-start; gap:16px;
      padding:18px 20px;
      border:1px solid rgba(4,17,6,.09); background:rgba(255,255,255,.5);
      transition:all .25s; border-radius:14px;
    }
    .itile:hover { background:rgba(255,255,255,.82); border-color:rgba(4,17,6,.2); transform:translateX(4px); }

    /* ── FAQ ── */
    .faq-row { border-top:1px solid rgba(4,17,6,.1); }
    .faq-btn {
      width:100%; background:none; border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:space-between;
      padding:18px 0; gap:16px; text-align:left;
      font-family:'Jost',sans-serif; font-size:14px; font-weight:400; color:${G.ink};
      min-height: 44px;
    }
    .faq-body { overflow:hidden; transition:max-height .42s cubic-bezier(.22,1,.36,1); }
    .faq-text { padding-bottom:18px; font-size:13px; line-height:1.8; color:rgba(4,17,6,.6); font-weight:300; }

    /* ── Destination cards ── */
    .dest { position:relative; overflow:hidden; cursor:pointer; border-radius:16px; }
    .dest img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .6s ease; }
    .dest:hover img { transform:scale(1.07); }
    .dest-over { position:absolute; inset:0; background:linear-gradient(to top, rgba(4,17,6,.65) 0%, transparent 55%); }
    .dest-label { position:absolute; bottom:0; left:0; right:0; padding:14px 16px; }

    /* ── Map ── */
    .map-iframe-wrap { position:relative; border:1px solid ${G.border}; overflow:hidden; border-radius:16px 16px 0 0; }
    .map-iframe-wrap iframe { width:100%; height:420px; border:none; display:block; filter:sepia(20%) contrast(95%) brightness(102%); }

    /* Stats always stay in a horizontal row */
    .hero-stats { display: flex; flex-direction: row !important; flex-wrap: wrap; justify-content: center; }
    .hero-stat-item { display: flex; flex-direction: column; gap: 3px; }
    .hero-stat-item + .hero-stat-item { padding-left: 24px; border-left: 1px solid rgba(4,17,6,.15); }
    .container { max-width:1280px; margin:0 auto; padding:0 48px; width:100%; }

    /* ── Layout: Section vertical spacing ── */
    .section-pad   { padding-top: 80px; }
    .section-pad-b { padding-bottom: 88px; }
    .section-pad-both { padding-top: 80px; padding-bottom: 88px; }

    /* ── Layout: Grids ── */
    .grid-2       { display:grid; grid-template-columns:1fr 1fr; gap:0 28px; }
    .grid-3       { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
    .grid-4       { display:grid; grid-template-columns:repeat(4,1fr); gap:3px; }
    .grid-contact { display:grid; grid-template-columns:1.25fr 1fr; gap:52px; align-items:start; }
    .grid-faq     { display:grid; grid-template-columns:1fr 1.8fr; gap:80px; align-items:start; }
    .grid-footer  { display:grid; grid-template-columns:1fr auto auto auto; gap:40px; }

    /* Prevent grid overflow */
    .grid-2 > *, .grid-3 > *, .grid-4 > *,
    .grid-contact > *, .grid-faq > *, .grid-footer > * { min-width: 0; }

    /* ── Destination strip ── */
    .dest-strip-wrap { display:grid; grid-template-columns:repeat(4,1fr); gap:3px; }

    /* ── Map strip ── */
    .map-strip {
      display:flex; flex-wrap:wrap;
      border:1px solid ${G.border}; border-top:none;
      background:rgba(255,255,255,.48);
      border-radius: 0 0 16px 16px;
      overflow: hidden;
    }
    .map-strip-item {
      flex:1 1 180px; display:flex; align-items:center; gap:14px;
      padding:16px 24px;
    }
    .map-strip-item + .map-strip-item { border-left:1px solid ${G.border}; }

    /* ── Subsection header row ── */
    .sub-row { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
    .why-row { display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap; }

    /* ─── RESPONSIVE ─── */

    /* ── 1024px ── */
    @media (max-width: 1024px) {
      .container { padding: 0 36px; }
      .grid-faq  { gap: 48px; }
      .grid-footer { grid-template-columns: 1fr auto auto auto; gap: 28px; }
    }

    /* ── 900px ── */
    @media (max-width: 900px) {
      .container { padding: 0 28px; }

      .section-pad      { padding-top: 60px; }
      .section-pad-b    { padding-bottom: 64px; }
      .section-pad-both { padding-top: 60px; padding-bottom: 64px; }

      .grid-3       { grid-template-columns: 1fr 1fr; }
      .grid-4       { grid-template-columns: 1fr 1fr; }
      .grid-contact { grid-template-columns: 1fr; gap: 40px; }
      .grid-faq     { grid-template-columns: 1fr; gap: 36px; }
      .grid-footer  { grid-template-columns: 1fr 1fr; gap: 32px; }

      .dest-strip-wrap { grid-template-columns: 1fr 1fr; }
      .dest-item   { height: 280px !important; }

      .hero-content { padding: 100px 28px 64px !important; }
      .hero-title   { font-size: clamp(3rem,10vw,5.5rem) !important; }
      .hero-stats   { gap: 28px !important; }

      .map-iframe-wrap iframe { height: 360px !important; }
      .map-strip-item + .map-strip-item { border-left: none; border-top: 1px solid ${G.border}; }

      .why-img { height: 240px !important; }
      .faq-img { height: 200px !important; }
      .info-image { height: 180px !important; }

      .form-header   { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
      .contact-form  { padding: 28px 24px !important; }
    }

    /* ── 768px ── */
    @media (max-width: 768px) {
      .grid-2 { grid-template-columns: 1fr; row-gap: 20px; }
      .grid-contact { gap: 36px; }

      .map-badge { display: none !important; }
      .faq-text-block { display: none; }
      .faq-btn-block  { display: none !important; }
      .why-desc { display: none !important; }
    }

    /* ── 640px ── */
    @media (max-width: 640px) {
      .container { padding: 0 18px; }

      .section-pad      { padding-top: 44px; }
      .section-pad-b    { padding-bottom: 48px; }
      .section-pad-both { padding-top: 44px; padding-bottom: 56px; }

      .grid-3      { grid-template-columns: 1fr; }
      .grid-footer { grid-template-columns: 1fr 1fr; gap: 24px; }

      .dest-strip-wrap { grid-template-columns: 1fr; }
      .dest-item { height: 220px !important; }

      .hero-content { padding: 88px 18px 48px !important; }
      .hero-title   { font-size: clamp(2.6rem,13vw,4rem) !important; line-height: 0.95 !important; }
      .hero-p       { font-size: 14px !important; max-width: 100% !important; }
      .hero-stats   { gap: 20px 0 !important; margin-top: 36px !important; }
      .hero-stat-item + .hero-stat-item { padding-left: 18px !important; }
      .hero-stat-num { font-size: 1.8rem !important; }

      .contact-form { padding: 24px 18px !important; }
      .form-chips   { gap: 6px !important; flex-wrap: wrap !important; }
      .form-submit-row { flex-direction: column !important; align-items: flex-start !important; }
      .form-submit-btn { width: 100% !important; justify-content: center !important; }

      .info-image  { height: 160px !important; }
      .info-title  { font-size: 1.5rem !important; }
      .itile       { padding: 14px 14px; }

      .why-title   { font-size: clamp(1.7rem,7vw,2.2rem) !important; }
      .why-img     { height: 200px !important; }
      .why-cards   { grid-template-columns: 1fr !important; gap: 8px !important; }

      .map-iframe-wrap iframe { height: 260px !important; }
      .map-strip-item { padding: 14px 18px; }
      .map-strip-item + .map-strip-item { border-left: none; border-top: 1px solid ${G.border}; }

      .faq-section  { padding-top: 44px !important; padding-bottom: 56px !important; }
      .faq-q        { font-size: 13px !important; }
      .faq-img      { height: 160px !important; }

      .footer-brand { grid-column: 1 / -1 !important; }
      .footer-pad   { padding: 36px 18px 24px !important; }
      .footer-bottom { flex-direction: column !important; gap: 8px !important; text-align: center !important; }

      .section-heading { font-size: 18px !important; }
      .sub-row { gap: 10px; }
    }

    /* ── 480px ── */
    @media (max-width: 480px) {
      .grid-footer { grid-template-columns: 1fr 1fr; gap: 20px; }
      .chip { font-size: 11px; padding: 7px 11px; }
      .btn-p { padding: 13px 22px; font-size: 11px; }
      /* Keep stats in a row — never stack them */
      .hero-stats { flex-direction: row !important; flex-wrap: wrap; gap: 20px 28px !important; }
    }

    /* ── 380px ── */
    @media (max-width: 380px) {
      .grid-4 { grid-template-columns: 1fr; }
      .hero-title { font-size: 2.4rem !important; }
      .container { padding: 0 14px; }
      .contact-form { padding: 20px 14px !important; }
      .map-strip-item { flex-direction: column; align-items: flex-start; gap: 6px; }
    }
  `}</style>
);

function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.classList.add("reveal");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("vis"), delay); io.disconnect(); }
    }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

const ArrowR  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const ArrowUR = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>;
const Spin    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation:"spin .8s linear infinite"}}><circle cx="12" cy="12" r="10" strokeOpacity=".2"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>;
const Check   = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4caf80" strokeWidth="2.2" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>;
const Plus    = ({on}) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{transform:on?"rotate(45deg)":"none",transition:"transform .3s"}}><path d="M12 5v14M5 12h14"/></svg>;
const PinIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9d4cb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;

/* ─── HERO ─── */
function Hero() {
  const r1 = useReveal(0), r2 = useReveal(140), r3 = useReveal(300);
  return (
    <section style={{ position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0 }}>
        <img src={IMGS.hero} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", animation:"panLeft 18s ease-in-out infinite alternate" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(0,0,0,.52) 0%, rgba(0,0,0,.4) 55%, rgba(0,0,0,.2) 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,.78) 0%, transparent 55%)" }} />
      </div>

      <div className="hero-content" style={{ position:"relative", maxWidth:1280, margin:"0 auto", padding:"120px 48px 90px", width:"100%", textAlign:"center" }}>
        <div ref={r1} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24, flexWrap:"wrap", justifyContent:"center" }}>
          <div style={{ width:32, height:1, background:"white", opacity:.4 }} />
          <span style={{ fontSize:"10px", fontWeight:500, letterSpacing:".2em", textTransform:"uppercase", color:"white" }}>Contact Us</span>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#4caf80", display:"inline-block", animation:"breathe 2.2s ease-in-out infinite" }} />
          <span style={{ fontSize:"11px", color:"#4caf80", fontWeight:500 }}>Available Now</span>
        </div>

        <div ref={r2}>
          <h1 className="hero-title" style={{ fontFamily:"'Marcellus',serif", fontSize:"clamp(3.2rem,8vw,8rem)", fontWeight:400, lineHeight:.9, color:"white", letterSpacing:"-.01em", marginBottom:24 }}>
            Say Hello,<br />Let's Explore
          </h1>
          <p className="hero-p" style={{ fontSize:"1rem", fontWeight:300, color:"white", maxWidth:"100%", margin:"0 auto 30px", lineHeight:1.8 }}>
            Whether you're dreaming of a mountain retreat or a coastal escape — our travel experts are ready to craft your perfect journey.
          </p>
          <div style={{ display:"flex", justifyContent:"center" }}>
            <a href="#contact" className="btn-p">Get In Touch <ArrowR /></a>
          </div>
        </div>

        <div ref={r3} className="hero-stats" style={{ gap:40, marginTop:48 }}>
          {[["12k+","Happy Travellers"],["98%","Satisfaction Rate"],["24/7","Expert Support"]].map(([n,l]) => (
            <div key={l} className="hero-stat-item">
              <span className="hero-stat-num" style={{ fontFamily:"'Marcellus',serif", fontSize:"2.2rem", fontWeight:400, color:"white", lineHeight:1 }}>{n}</span>
              <span style={{ fontSize:"10px", fontWeight:400, letterSpacing:".1em", textTransform:"uppercase", color:"white" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── DESTINATIONS STRIP ─── */
function DestStrip() {
  const ref = useReveal(60);
  const dests = [
    { img: IMGS.mountains, name:"Himalayas", tag:"Mountain Escapes" },
    { img: IMGS.beach,     name:"Goa",       tag:"Coastal Retreats" },
    { img: IMGS.india,     name:"Rajasthan", tag:"Heritage Trails"  },
    { img: IMGS.city,      name:"Mumbai",    tag:"City Breaks"      },
  ];
  return (
    <section className="section-pad">
      <div className="container">
        <div ref={ref} className="sub-row" style={{ marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:28, height:1, background:G.ink, opacity:.25 }} />
            <span className="section-heading" style={{ fontFamily:"'Marcellus',serif", fontSize:"22px", fontWeight:400, color:G.ink }}>Popular Destinations</span>
          </div>
          <a href="#" className="btn-g" style={{ fontSize:"11px" }}>View All <ArrowUR /></a>
        </div>
      </div>

      <div className="dest-strip-wrap">
        {dests.map((d) => (
          <div key={d.name} className="dest dest-item" style={{ height:320 }}>
            <img src={d.img} alt={d.name} />
            <div className="dest-over" />
            <div className="dest-label">
              <p style={{ fontSize:"10px", fontWeight:500, letterSpacing:".16em", textTransform:"uppercase", color:"rgba(201,212,203,.65)", marginBottom:3 }}>{d.tag}</p>
              <p style={{ fontFamily:"'Marcellus',serif", fontSize:"20px", fontWeight:400, color:"#fff", lineHeight:1.1 }}>{d.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CONTACT FORM ─── */
const TOPICS = ["Trip Planning","Custom Package","Group Booking","Honeymoon","Adventure Tour","Corporate","Other"];

function ContactForm() {
  const ref = useReveal(80);
  const [form, setForm] = useState({ name:"", email:"", phone:"", destination:"", budget:"", message:"" });
  const [topic, setTopic] = useState("Trip Planning");
  const [status, setStatus] = useState("idle");
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

const submit = async e => {
  e.preventDefault(); setStatus("loading");
  try {
    const res = await fetch("https://theforestviewresort.com/send-mail.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form_type: "Contact Page", topic, ...form }),
    });
    const data = await res.json();
    if (data.success) {
      setStatus("success");
      setTimeout(() => { setStatus("idle"); setForm({ name:"",email:"",phone:"",destination:"",budget:"",message:"" }); }, 4000);
    } else { setStatus("idle"); }
  } catch (err) { setStatus("idle"); }
};

  if (status === "success") return (
    <div ref={ref} className="contact-form" style={{ padding:"64px 40px", background:"rgba(255,255,255,.6)", border:`1px solid ${G.border}`, borderRadius:20, display:"flex", flexDirection:"column", alignItems:"center", gap:16, textAlign:"center", animation:"fadeUp .5s ease" }}>
      <div style={{ width:72, height:72, border:"1.5px solid rgba(76,175,128,.4)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}><Check /></div>
      <h3 style={{ fontFamily:"'Marcellus',serif", fontSize:"2rem", fontWeight:400, color:G.ink }}>Message Sent!</h3>
      <p style={{ fontSize:"14px", fontWeight:300, color:"rgba(4,17,6,.55)", maxWidth:300, lineHeight:1.75 }}>Our travel experts will reach out within 24 hours with everything you need.</p>
    </div>
  );

  return (
    <div id="contact" ref={ref} className="contact-form" style={{ background:"rgba(255,255,255,.62)", border:`1px solid ${G.border}`, padding:"40px 40px", borderRadius:20 }}>

      {/* Header */}
      <div className="form-header" style={{ display:"flex", gap:0, marginBottom:28, paddingBottom:24, borderBottom:`1px solid ${G.border}`, alignItems:"flex-start", justifyContent:"space-between" }}>
        <div style={{ flex:1, minWidth:0 }}>
          <h2 style={{ fontFamily:"'Marcellus',serif", fontSize:"1.8rem", fontWeight:400, color:G.ink, lineHeight:1.1, marginBottom:6 }}>Send a Message</h2>
          <p style={{ fontSize:"13px", fontWeight:300, color:"rgba(4,17,6,.5)" }}>Typically replies within a few hours</p>
        </div>
        <div style={{ display:"flex", gap:4, alignItems:"center", flexShrink:0 }}>
    
        </div>
      </div>

      {/* Topic chips */}
      <div style={{ marginBottom:28 }}>
        <p style={{ fontSize:"10px", fontWeight:500, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(4,17,6,.4)", marginBottom:10 }}>I'm enquiring about</p>
        <div className="form-chips" style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
          {TOPICS.map(t => <button key={t} className={`chip ${topic===t?"on":""}`} onClick={()=>setTopic(t)} type="button">{t}</button>)}
        </div>
      </div>

      <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:22 }}>
        <div className="grid-2">
          <div><label className="fl">Full Name *</label><input className="fi" placeholder="Aryan Sharma" value={form.name} onChange={set("name")} required /></div>
          <div><label className="fl">Email Address *</label><input className="fi" type="email" placeholder="aryan@email.com" value={form.email} onChange={set("email")} required /></div>
        </div>
        <div className="grid-2">
          <div><label className="fl">Phone Number</label><input className="fi" placeholder="+91 7014764053" value={form.phone} onChange={set("phone")} /></div>
          <div><label className="fl">Dream Destination</label><input className="fi" placeholder="Manali, Bali, Paris…" value={form.destination} onChange={set("destination")} /></div>
        </div>
        <div>
          <label className="fl">Budget Range (Per Person)</label>
          <select className="fi" value={form.budget} onChange={set("budget")}>
            <option value="">Select your budget</option>
            <option>Under ₹25,000</option>
            <option>₹25,000 – ₹50,000</option>
            <option>₹50,000 – ₹1,00,000</option>
            <option>₹1,00,000 – ₹2,00,000</option>
            <option>₹2,00,000+</option>
          </select>
        </div>
        <div>
          <label className="fl">Your Message *</label>
          <textarea className="fi" placeholder="Tell us about your dream trip — travel dates, group size, special requirements…" value={form.message} onChange={set("message")} required />
        </div>
        <div className="form-submit-row" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14, paddingTop:8, borderTop:`1px solid ${G.border}` }}>
          <p style={{ fontSize:"12px", fontWeight:300, color:"rgba(4,17,6,.28)", lineHeight:1.6, maxWidth:220 }}>By submitting you agree to our Privacy Policy.</p>
          <button type="submit" className="btn-p form-submit-btn" disabled={status==="loading"} style={{ minWidth:160 }}>
            {status==="loading" ? <><Spin /> Sending…</> : <>Send Message <ArrowR /></>}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── CONTACT INFO ─── */
const INFO = [
  { icon:"📍", label:"Visit Our Office",  lines:["Ranthambhore Rd, near Wild Dragon","Saptar, Sawai Madhopur","Bhuderda, Rajasthan 322001"],      cta:"Get Directions →" },
  { icon:"📞", label:"Call Us Anytime",   lines:["+91 7014764053","Mon–Sat, 9 AM – 7 PM IST"],              cta:"Call Now →"       },
  { icon:"✉",  label:"Email Us",           lines:["theforestviewresortswm@gmail.com"], cta:"Send Email →"     },
];

function ContactInfo() {
  const refs = [useReveal(60), useReveal(180), useReveal(300)];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
      <div className="info-image" style={{ position:"relative", height:210, overflow:"hidden", marginBottom:24, borderRadius:16 }}>
        <img src={IMGS.team} alt="Travel" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"rgba(4,17,6,.48)" }} />
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"20px 24px" }}>
          <p style={{ fontFamily:"'Marcellus',serif", fontSize:"17px", fontWeight:400, color:"#fff", lineHeight:1.45, marginBottom:6 }}>
            "Every great journey begins with a single conversation."
          </p>
          <p style={{ fontSize:"10px", fontWeight:400, letterSpacing:".1em", color:"rgba(255,255,255,.55)", textTransform:"uppercase" }}>— Our Travel Philosophy</p>
        </div>
      </div>

      <div style={{ marginBottom:18 }}>
        <h2 className="info-title" style={{ fontFamily:"'Marcellus',serif", fontSize:"1.7rem", fontWeight:400, color:G.ink, marginBottom:5 }}>Contact Details</h2>
        <p style={{ fontSize:"13px", fontWeight:300, color:"rgba(4,17,6,.5)", lineHeight:1.7 }}>Multiple ways to connect with our travel experts.</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
        {INFO.map((item, i) => (
          <div ref={refs[i]} key={item.label} className="itile">
            <div style={{ width:40, height:40, background:G.ink, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:16 }}>
              {item.icon}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:"10px", fontWeight:500, letterSpacing:".16em", textTransform:"uppercase", color:"rgba(4,17,6,.42)", marginBottom:4 }}>{item.label}</p>
              {item.lines.map(l => <p key={l} style={{ fontSize:"14px", fontWeight:300, color:G.ink, lineHeight:1.55, wordBreak:"break-word" }}>{l}</p>)}
              <a href="#" style={{ display:"inline-block", marginTop:6, fontSize:"11px", fontWeight:500, color:"rgba(4,17,6,.5)", textDecoration:"none", letterSpacing:".08em", borderBottom:"1px solid rgba(4,17,6,.2)", paddingBottom:"1px", transition:"color .2s,border-color .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.color=G.ink;e.currentTarget.style.borderColor=G.ink;}}
                onMouseLeave={e=>{e.currentTarget.style.color="rgba(4,17,6,.5)";e.currentTarget.style.borderColor="rgba(4,17,6,.2)";}}>
                {item.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── WHY US ─── */
function WhyUs() {
  const ref = useReveal(80);
  const feats = [
    { img: IMGS.mountains, title:"Expert Guides",    sub:"Local knowledge, global standards" },
    { img: IMGS.beach,     title:"Curated Stays",    sub:"Handpicked boutique properties"    },
    { img: IMGS.forest,    title:"Seamless Booking", sub:"Plan, book and travel with ease"   },
  ];
  return (
    <section className="section-pad">
      <div className="container">
        <div ref={ref} className="why-row" style={{ marginBottom:30 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
              <div style={{ width:28, height:1, background:G.ink, opacity:.25 }} />
              <span style={{ fontSize:"10px", fontWeight:500, letterSpacing:".2em", textTransform:"uppercase", color:"rgba(4,17,6,.4)" }}>Why THE FOREST VIEW</span>
            </div>
            <h2 className="why-title" style={{ fontFamily:"'Marcellus',serif", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:400, color:G.ink, lineHeight:1.1 }}>
              Crafting Journeys<br />Worth Remembering
            </h2>
          </div>
          <p className="why-desc" style={{ fontSize:"14px", fontWeight:300, color:"rgba(4,17,6,.55)", maxWidth:280, lineHeight:1.8 }}>
            From the Himalayas to coastal Kerala — every trip we design is personal, considered, and extraordinary.
          </p>
        </div>

        <div className="why-cards grid-3">
          {feats.map((f, i) => (
            <div key={f.title} style={{ position:"relative", overflow:"hidden", cursor:"pointer", borderRadius:16 }}
              onMouseEnter={e => e.currentTarget.querySelector("img").style.transform = "scale(1.07)"}
              onMouseLeave={e => e.currentTarget.querySelector("img").style.transform = "scale(1)"}>
              <div className="why-img" style={{ height:280, overflow:"hidden" }}>
                <img src={f.img} alt={f.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .5s ease" }} />
              </div>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(4,17,6,.72) 0%, transparent 55%)" }} />
              <div style={{ position:"absolute", top:14, left:14, width:32, height:32, background:"rgba(255,255,255,.18)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:"'Marcellus',serif", fontSize:"14px", color:"#fff", fontWeight:400 }}>0{i+1}</span>
              </div>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 18px" }}>
                <p style={{ fontFamily:"'Marcellus',serif", fontSize:"18px", fontWeight:400, color:"#fff", marginBottom:3 }}>{f.title}</p>
                <p style={{ fontSize:"12px", fontWeight:300, color:"rgba(255,255,255,.65)", letterSpacing:".04em" }}>{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MAP SECTION ─── */
function MapSection() {
  const headRef = useReveal(80);
  return (
    <section className="section-pad">
      <div className="container">
        <div ref={headRef} className="sub-row" style={{ marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:28, height:1, background:G.ink, opacity:.25 }} />
            <span className="section-heading" style={{ fontFamily:"'Marcellus',serif", fontSize:"22px", fontWeight:400, color:G.ink }}>Find Us</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#4caf80", flexShrink:0 }} />
            <span style={{ fontSize:"11px", color:"rgba(4,17,6,.48)", fontWeight:300, letterSpacing:".02em", whiteSpace:"nowrap" }}>
              26.0173° N, 76.3773° E · Sawai Madhopur, Rajasthan
            </span>
          </div>
        </div>

        {/* Map iframe */}
        <div className="map-iframe-wrap">
          <iframe
            title="THE FOREST VIEW Travel Office Location"
            src={MAP_EMBED}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ width:"100%", height:420, border:"none", display:"block", filter:"sepia(15%) contrast(96%) brightness(103%)" }}
          />

          {/* Brand badge */}
          <div className="map-badge" style={{
            position:"absolute", top:16, left:16, zIndex:10,
            background:G.bg, border:`1px solid ${G.border}`,
            padding:"10px 16px", pointerEvents:"none",
            boxShadow:"0 2px 12px rgba(4,17,6,.12)",
          }}>
            <p style={{ fontFamily:"'Marcellus',serif", fontSize:"13px", fontWeight:400, color:G.ink, margin:"0 0 2px", lineHeight:1.2 }}>THE FOREST VIEW Travel Co.</p>
            <p style={{ fontSize:"10px", fontWeight:300, color:"rgba(4,17,6,.5)", margin:0, letterSpacing:".03em" }}>Ranthambhore Rd · Sawai Madhopur</p>
          </div>

          {/* Open full map */}
          <a
            href={`https://www.openstreetmap.org/?mlat=${OFFICE_LAT}&mlon=${OFFICE_LNG}#map=16/${OFFICE_LAT}/${OFFICE_LNG}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              position:"absolute", bottom:16, right:16, zIndex:10,
              display:"inline-flex", alignItems:"center", gap:6,
              background:G.ink, color:G.bg,
              padding:"9px 16px", fontSize:"11px", fontWeight:500,
              letterSpacing:".1em", textTransform:"uppercase",
              textDecoration:"none", boxShadow:"0 4px 16px rgba(4,17,6,.28)",
              transition:"opacity .2s",
            }}
            onMouseEnter={e=>e.currentTarget.style.opacity=".82"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}
          >
            <PinIcon /> Open Full Map
          </a>
        </div>

        {/* Info strip */}
        <div className="map-strip">
          {[
            { icon:"🕘", label:"Office Hours", val:"Mon – Sat, 9 AM – 7 PM IST" },
            { icon:"📞", label:"Phone",        val:"+91 7014764053" },
            { icon:"✉",  label:"Email",        val:"hello@theforestview.travel" },
          ].map((item, i) => (
            <div key={i} className="map-strip-item">
              <span style={{ fontSize:20, flexShrink:0 }}>{item.icon}</span>
              <div style={{ minWidth:0 }}>
                <p style={{ fontSize:"9px", fontWeight:500, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(4,17,6,.38)", margin:"0 0 3px" }}>{item.label}</p>
                <p style={{ fontSize:"13px", fontWeight:300, color:G.ink, margin:0, wordBreak:"break-all" }}>{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
const FAQS = [
  { q:"How early should I plan my trip?",    a:"We recommend booking at least 4–6 weeks in advance for domestic trips, and 8–12 weeks for international travel to secure the best rates and availability." },
  { q:"Do you offer customised packages?",   a:"Absolutely! Every trip we design is fully customised to your preferences, budget, and travel style. Just reach out and our experts will craft the perfect itinerary." },
  { q:"Is travel insurance included?",        a:"Travel insurance is optional but highly recommended. We partner with leading providers to offer comprehensive coverage at competitive rates." },
  { q:"What payment methods do you accept?", a:"We accept all major credit/debit cards, UPI, net banking, and EMI options through our secure payment gateway." },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  const ref = useReveal(80);
  return (
    <section className="faq-section section-pad-both">
      <div className="container">
        <div ref={ref} className="grid-faq">
          <div>
            <div className="faq-img" style={{ position:"relative", height:240, overflow:"hidden", marginBottom:24, borderRadius:16 }}>
              <img src={IMGS.city} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              <div style={{ position:"absolute", inset:0, background:"rgba(4,17,6,.35)" }} />
              <div style={{ position:"absolute", bottom:18, left:18 }}>
                <p style={{ fontFamily:"'Marcellus',serif", fontSize:"clamp(1.4rem,3vw,1.8rem)", fontWeight:400, color:"#fff", lineHeight:1.1 }}>Got<br />Questions?</p>
              </div>
            </div>
            <p className="faq-text-block" style={{ fontSize:"13px", fontWeight:300, color:"rgba(4,17,6,.55)", lineHeight:1.8, marginBottom:20 }}>
              Can't find what you're looking for? Drop us a message and we'll respond promptly.
            </p>
            <button className="btn-p faq-btn-block" style={{ fontSize:"11px", padding:"12px 24px" }} onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}>
              Ask a Question <ArrowR />
            </button>
          </div>

          <div style={{ borderBottom:`1px solid ${G.border}` }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-row">
                <button className="faq-btn" onClick={() => setOpen(open===i?-1:i)}>
                  <span className="faq-q" style={{ fontSize:"14px", fontWeight: open===i?500:400, lineHeight:1.4 }}>{faq.q}</span>
                  <div style={{ width:28, height:28, border:`1.5px solid ${open===i?G.ink:"rgba(4,17,6,.2)"}`, background: open===i?G.ink:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .25s" }}>
                    <Plus on={open===i} />
                  </div>
                </button>
                <div className="faq-body" style={{ maxHeight: open===i ? 200:0 }}>
                  <p className="faq-text">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ borderTop:`1px solid ${G.border}`, background:"rgba(4,17,6,.03)" }}>
      <div className="container footer-pad" style={{ padding:"44px 48px 32px" }}>
        <div className="grid-footer" style={{ marginBottom:40 }}>
          <div className="footer-brand" style={{ maxWidth:240 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ width:30, height:30, background:G.ink, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1L10.5 6H14L11 9.5L12.5 14.5L8 12L3.5 14.5L5 9.5L2 6H5.5L8 1Z" fill="#c9d4cb"/></svg>
              </div>
              <span style={{ fontFamily:"'Marcellus',serif", fontSize:"1.3rem", fontWeight:400, color:G.ink }}>THE FOREST VIEW</span>
            </div>
            <p style={{ fontSize:"13px", fontWeight:300, color:"rgba(4,17,6,.5)", lineHeight:1.75 }}>
              Crafting unforgettable journeys across India and beyond since 2015.
            </p>
          </div>
          {[["Company",["About","Careers","Press","Blog"]],["Services",["Packages","Custom Tours","Group Travel","Corporate"]],["Support",["Contact","FAQ","Privacy","Terms"]]].map(([t,ls]) => (
            <div key={t}>
              <p style={{ fontSize:"10px", fontWeight:500, letterSpacing:".18em", textTransform:"uppercase", color:G.ink, marginBottom:14 }}>{t}</p>
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {ls.map(l => (
                  <a key={l} href="#" style={{ fontSize:"13px", fontWeight:300, color:"rgba(4,17,6,.5)", textDecoration:"none", transition:"color .2s" }}
                    onMouseEnter={e=>e.target.style.color=G.ink}
                    onMouseLeave={e=>e.target.style.color="rgba(4,17,6,.5)"}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height:1, background:G.border, marginBottom:20 }} />
        <div className="footer-bottom" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <p style={{ fontSize:"12px", fontWeight:300, color:"rgba(4,17,6,.3)" }}>© 2025 THE FOREST VIEW Travel Co. All rights reserved.</p>
          <p style={{ fontSize:"12px", fontWeight:300, color:"rgba(4,17,6,.3)" }}>Crafted with care in Rajasthan, India</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ─── */
export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight:"100vh", background:G.bg }}>
        <Hero />

        <section className="section-pad">
          <div className="container">
            <div className="grid-contact">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </section>

        <WhyUs />
        <MapSection />
        <FAQ />
     
      </div>
    </>
  );
}