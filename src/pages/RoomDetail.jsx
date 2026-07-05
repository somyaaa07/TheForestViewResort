import { useState } from "react";
import { rooms } from "./data";

const D = "#041106";
const BG = "#c9d4cb";

/* ---------- tiny icons ---------- */
const ChevL = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);
const ChevR = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);
const ArrowUR = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M7 17L17 7M17 7H7M17 7v10"/>
  </svg>
);

/* ---- Availability Calendar component ---- */
const CAL_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const CAL_DAYS   = ["Mo","Tu","We","Th","Fr","Sa","Su"];

const BOOKED_APRIL  = new Set([3,4,5,8,9,15,16,22,23]);
const BOOKED_MAY    = new Set([1,2,6,7,11,12,13,18,19,20,25,26]);

function calCells(year, month) {
  const dow = new Date(year, month, 1).getDay();
  const off = dow === 0 ? 6 : dow - 1;
  const tot = new Date(year, month + 1, 0).getDate();
  const out = [];
  for (let i = 0; i < off; i++) out.push(null);
  for (let d = 1; d <= tot; d++) out.push(d);
  return out;
}

function CalMonth({ year, month, booked }) {
  const cells = calCells(year, month);
  return (
    <div style={{ flex:1, minWidth:0, border:"1px solid rgba(4,17,6,.12)", overflowX:"auto" }}>
      <div style={{ background:D, color:BG, padding:"9px 12px", fontSize:14, fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
        {CAL_MONTHS[month]}
        <span style={{ fontSize:10, opacity:.7 }}>▼</span>
        &nbsp;{year}
        <span style={{ fontSize:10, opacity:.7 }}>▼</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", background:"#f5f3ef", borderBottom:"1px solid rgba(4,17,6,.08)" }}>
        {CAL_DAYS.map(d => (
          <div key={d} style={{ fontSize:11, fontWeight:600, color:"rgba(4,17,6,.45)", textAlign:"center", padding:"6px 2px" }}>{d}</div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", background:"#fff" }}>
        {cells.map((d, i) => {
          const isBooked = d && booked.has(d);
          const isToday  = d === 7 && month === 3;
          return (
            <div key={i} style={{
              fontSize:12, textAlign:"center", padding:"6px 2px",
              color:     isBooked ? "#fff" : d ? D : "transparent",
              background:isBooked ? D : isToday ? "rgba(4,17,6,.12)" : "transparent",
              cursor:    d ? "pointer" : "default",
              fontWeight:isToday ? 700 : 400,
              transition:"background .15s",
            }}
            onMouseEnter={e=>{ if(d && !isBooked) e.currentTarget.style.background="rgba(4,17,6,.08)"; }}
            onMouseLeave={e=>{ if(d && !isBooked) e.currentTarget.style.background="transparent"; }}
            >{d || ""}</div>
          );
        })}
      </div>
    </div>
  );
}

function AvailabilityCalendar() {
  const [offset, setOffset] = useState(0);
  const base = new Date(2026, 3 + offset, 1);
  const m1 = base.getMonth();
  const y1 = base.getFullYear();
  const d2 = new Date(y1, m1 + 1, 1);
  const m2 = d2.getMonth();
  const y2 = d2.getFullYear();
  const booked1 = offset === 0 ? BOOKED_APRIL : new Set();
  const booked2 = offset === 0 ? BOOKED_MAY   : new Set();
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12, gap:8 }}>
        <button onClick={()=>setOffset(o=>o-1)}
          style={{ background:D, color:BG, border:"none", padding:"8px 14px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Jost',sans-serif" }}>
          ‹ Prev
        </button>
        <span style={{ fontSize:13, fontWeight:600, color:D, padding:"8px 16px", background:"rgba(4,17,6,.08)", borderRadius:2 }}>
          Today
        </span>
        <button onClick={()=>setOffset(o=>o+1)}
          style={{ background:D, color:BG, border:"none", padding:"8px 14px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Jost',sans-serif" }}>
          Next ›
        </button>
      </div>
      {/* Stack calendars vertically on mobile */}
      <div className="cal-grid">
        <CalMonth year={y1} month={m1} booked={booked1} />
        <CalMonth year={y2} month={m2} booked={booked2} />
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
        <span style={{ fontSize:13, color:"rgba(4,17,6,.45)" }}>Select dates</span>
        <button style={{ background:"none", border:"none", color:D, fontSize:13, fontWeight:600, cursor:"pointer", textDecoration:"underline", fontFamily:"'Jost',sans-serif" }}>
          Clear
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", cursor:"pointer", gap:14 }}
    >
      <div style={{ position:"relative", width:110, height:110, flexShrink:0 }}>
        <svg viewBox="0 0 130 130" style={{ position:"absolute", inset:0, width:"100%", height:"100%", transform:hovered?"rotate(90deg)":"rotate(0deg)", transition:"transform .6s ease" }}>
          <circle cx="65" cy="65" r="60" fill="none" stroke="#041106" strokeWidth="1.5" strokeDasharray="8 6" opacity={hovered?"0.75":"0.35"} style={{ transition:"opacity .3s ease" }}/>
        </svg>
        <div style={{ position:"absolute", inset:8, borderRadius:"50%", overflow:"hidden", background:"#dde4dd", transform:hovered?"scale(1.06)":"scale(1)", transition:"transform .4s ease" }}>
          <img src={service.img} alt={service.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} onError={e=>{e.target.style.display="none";}}/>
        </div>
      </div>
      <p style={{ fontFamily:"'Marcellus', serif", fontSize:15, fontWeight:400, color:"#041106", lineHeight:1.3, margin:0 }}>{service.title}</p>
      <p style={{ fontSize:11, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(4,17,6,.4)", margin:"-8px 0 0" }}>Hotel Facility</p>
    </div>
  );
}

export default function RoomDetail({ roomId, onBack, onExplore }) {
  const room = rooms.find(r => r.id === roomId) || rooms[0];
  const related = rooms.filter(r => r.id !== room.id);

  const [activeImg, setActiveImg]   = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [shareOpen, setShareOpen]   = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [relIdx, setRelIdx]         = useState(0);

  // ── Contact form ("LET'S CONNECT WITH US") state ──
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  // ── Reservation Form ("Check Availability") state ──
  const [resForm, setResForm] = useState({ checkIn: "", checkOut: "" });
  const [resStatus, setResStatus] = useState("idle"); // idle | sending | sent

  // Responsive: show 1 on mobile, 2 on tablet, 3 on desktop
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
    }
    return 3;
  };
  const [visibleCount] = useState(getVisibleCount);
  const visible = related.slice(relIdx, relIdx + visibleCount);

  const handleRelatedExplore = (id) => {
    if (onExplore) onExplore(id);
  };

  // ── Sends the "LET'S CONNECT WITH US" form to the PHP/SMTP backend ──
  const sendContactMail = async () => {
    if (!contactForm.name || !contactForm.email) return;
    setSending(true);
    try {
      const res = await fetch("https://theforestviewresort.com/send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_type: "Room Enquiry", room: room.name, ...contactForm }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setContactForm({ name: "", phone: "", email: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  // ── Sends the Reservation Form ("Check Availability") to the PHP/SMTP backend ──
  const checkAvailability = async () => {
    setResStatus("sending");
    try {
      const res = await fetch("https://theforestviewresort.com/send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_type: "Room Availability Check", room: room.name, ...resForm }),
      });
      const data = await res.json();
      setResStatus(data.success ? "sent" : "idle");
    } catch (e) {
      console.error(e);
      setResStatus("idle");
    }
  };

  return (
    <div style={{ background:BG, color:D, fontFamily:"'Jost',sans-serif", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Marcellus&display=swap');

        /* ── Reset & base ── */
        *, *::before, *::after { box-sizing: border-box; }

        .nl { position:relative; text-decoration:none; color:${D}; font-size:15px; font-weight:500; }
        .nl::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:2px; background:${D}; transition:width .3s; }
        .nl:hover::after { width:100%; }
        .bc { background: linear-gradient(rgba(4,17,6,.68),rgba(4,17,6,.68)), url('/16.jpeg') center/cover no-repeat; }
        .th { opacity:.5; cursor:pointer; transition:opacity .2s; overflow:hidden; }
        .th:hover { opacity:1; }
        .th.act { opacity:1; outline:2.5px solid ${D}; }
        .mb { display:inline-flex; align-items:center; gap:7px; padding:8px 14px; border:1.5px solid rgba(4,17,6,.18); font-size:13px; font-weight:500; cursor:pointer; background:transparent; color:${D}; transition:all .2s; white-space:nowrap; }
        .mb:hover, .mb.on { background:${D}; color:${BG}; border-color:${D}; }
        .sh { font-family:'Marcellus',serif; font-size:22px; font-weight:400; color:${D}; margin:0 0 18px; padding-bottom:12px; border-bottom:1.5px solid rgba(4,17,6,.1); }
        .ib { display:flex; align-items:flex-start; gap:12px; padding:14px; background:rgba(255,255,255,.6); border:1px solid rgba(4,17,6,.09); transition:box-shadow .2s; }
        .ib:hover { box-shadow:0 6px 18px rgba(4,17,6,.09); }
        .si { width:100%; background:#fff; border:1.5px solid rgba(4,17,6,.14); padding:11px 14px; font-size:15px; color:${D}; outline:none; font-family:'Jost',sans-serif; box-sizing:border-box; transition:border-color .2s; }
        .si:focus { border-color:${D}; }
        .si::placeholder { color:rgba(4,17,6,.38); }
        .bd { display:block; width:100%; background:${D}; color:${BG}; border:none; padding:13px; font-size:13px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; cursor:pointer; font-family:'Jost',sans-serif; transition:background .2s; }
        .bd:hover { background:#1e3a20; }
        .bd:disabled { opacity:.6; cursor:not-allowed; }
        .bo { background:transparent; border:1.5px solid ${D}; color:${D}; padding:9px 18px; font-size:12px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; cursor:pointer; font-family:'Jost',sans-serif; transition:all .2s; white-space:nowrap; }
        .bo:hover { background:${D}; color:${BG}; }
        .rc { background:rgba(255,255,255,.6); border:1px solid rgba(4,17,6,.09); overflow:hidden; transition:transform .3s,box-shadow .3s; cursor:pointer; }
        .rc:hover { transform:translateY(-4px); box-shadow:0 14px 36px rgba(4,17,6,.12); }
        .rc-img { transition:transform .5s; }
        .rc:hover .rc-img { transform:scale(1.05); }
        .ea { display:inline-flex; align-items:center; gap:5px; font-size:13px; font-weight:600; letter-spacing:.07em; border-bottom:1.5px solid ${D}; padding-bottom:2px; cursor:pointer; color:${D}; background:none; border-top:none; border-left:none; border-right:none; transition:opacity .2s; }
        .ea:hover { opacity:.55; }
        .ar { display:flex; justify-content:space-between; align-items:flex-start; padding:9px 0; border-bottom:1px solid rgba(4,17,6,.07); gap:10px; }
        .tp { display:inline-block; padding:5px 12px; font-size:13px; border:1px solid rgba(4,17,6,.2); cursor:pointer; transition:all .2s; margin:3px; }
        .tp:hover { background:${D}; color:${BG}; }
        .ab { width:40px; height:40px; display:flex; align-items:center; justify-content:center; border:1.5px solid rgba(4,17,6,.2); cursor:pointer; background:transparent; transition:all .2s; flex-shrink:0; }
        .ab:hover { background:${D}; color:${BG}; }
        .dot { width:9px; height:9px; border-radius:50%; background:${D}; flex-shrink:0; margin-top:5px; }

        /* ── Layout: main two-column ── */
        .rd-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }
        .rd-main { flex: 1; min-width: 0; }
        .rd-sidebar {
          width: 300px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: sticky;
          top: 88px;
          align-self: flex-start;
        }

        /* ── Thumbnail grid ── */
        .thumb-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 22px;
        }

        /* ── Features grid ── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        /* ── Amenities grid ── */
        .amenities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px 40px;
        }

        /* ── Services grid ── */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px 24px;
        }

        /* ── Includes grid ── */
        .includes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px 40px;
          margin-bottom: 32px;
        }

        /* ── Rating breakdown ── */
        .rating-breakdown {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 32px;
        }

        /* ── Review form fields ── */
        .review-form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 14px;
        }
        .review-rating-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 14px;
        }

        /* ── Meta action bar ── */
        .meta-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(4,17,6,.1);
        }

        /* ── Related rooms grid ── */
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* ── Calendar grid ── */
        .cal-grid {
          display: flex;
          gap: 14px;
        }

        /* ─────────── TABLET (max 1024px) ─────────── */
        @media (max-width: 1024px) {
          .rd-layout { flex-direction: column; gap: 32px; }
          .rd-sidebar {
            width: 100%;
            position: static;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .rd-sidebar > *:first-child { grid-column: 1 / -1; }
          .related-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ─────────── MOBILE (max 640px) ─────────── */
        @media (max-width: 640px) {
          .bc { padding: 80px 16px !important; }
          .rd-layout { gap: 24px; }
          .rd-sidebar { grid-template-columns: 1fr; }
          .rd-sidebar > *:first-child { grid-column: auto; }

          .thumb-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; }

          .features-grid { grid-template-columns: 1fr; gap: 10px; }
          .amenities-grid { grid-template-columns: 1fr; gap: 4px 0; }
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: 20px 16px; }
          .includes-grid { grid-template-columns: 1fr; gap: 2px 0; }
          .rating-breakdown { grid-template-columns: 1fr; gap: 4px; }
          .review-form-grid { grid-template-columns: 1fr; }
          .review-rating-grid { grid-template-columns: 1fr 1fr; }
          .related-grid { grid-template-columns: 1fr; }
          .cal-grid { flex-direction: column; }

          .meta-bar { gap: 8px; }
          .meta-bar .mb { font-size: 12px; padding: 7px 11px; }

          .sh { font-size: 18px; }
        }

        /* ─────────── XS (max 400px) ─────────── */
        @media (max-width: 400px) {
          .services-grid { grid-template-columns: 1fr; }
          .review-rating-grid { grid-template-columns: 1fr; }
          .thumb-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      `}</style>

      {/* BREADCRUMB */}
      <div className="bc" style={{ padding:"140px 24px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <h1 style={{ fontFamily:"Marcellus,serif", color:"#fff", fontSize:"clamp(22px,4vw,48px)", fontWeight:400, marginBottom:10 }}>
            {room.name}
          </h1>
          <nav style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:8, fontSize:13, color:"rgba(255,255,255,.6)" }}>
            <a href="#" style={{ color:"rgba(255,255,255,.6)", textDecoration:"none" }}>Home</a>
            <span>/</span>
            <button onClick={onBack} style={{ background:"none", border:"none", color:"rgba(255,255,255,.6)", cursor:"pointer", fontSize:13, padding:0 }}>
              Accommodation Type
            </button>
            <span>/</span>
            <span style={{ color:"#fff" }}>{room.name}</span>
          </nav>
        </div>
      </div>

      {/* MAIN BODY */}
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"clamp(24px,5vw,48px) clamp(16px,4vw,24px)" }}>
        <div className="rd-layout">

          {/* LEFT CONTENT */}
          <div className="rd-main">

            {/* MAIN GALLERY IMAGE */}
            <div style={{ position:"relative", background:"rgba(4,17,6,.06)", marginBottom:8 }}>
              <div style={{ position:"relative", paddingBottom:"65%" }}>
                <img
                  src={room.gallery[activeImg]} alt={room.name}
                  style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                  onError={e=>{ e.target.src=`https://placehold.co/830x600/${BG.replace("#","")}/041106?text=${encodeURIComponent(room.name)}`; }}
                />
                <button onClick={()=>setActiveImg(i=>(i-1+room.gallery.length)%room.gallery.length)}
                  style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", width:38, height:38, background:"rgba(201,212,203,.9)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ChevL />
                </button>
                <button onClick={()=>setActiveImg(i=>(i+1)%room.gallery.length)}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", width:38, height:38, background:"rgba(201,212,203,.9)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ChevR />
                </button>
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="thumb-grid">
              {room.gallery.map((img, i) => (
                <div key={i} onClick={()=>setActiveImg(i)} className={`th ${activeImg===i?"act":""}`} style={{ paddingBottom:"65%", position:"relative" }}>
                  <img src={img} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
                </div>
              ))}
            </div>

            {/* META ACTION BAR */}
            <div className="meta-bar">
              {/* intentionally left as in original */}
            </div>

            {/* ROOM DESCRIPTION */}
            <section style={{ marginBottom:36 }}>
              <h4 style={{ fontFamily:"Marcellus,serif", fontSize:"clamp(18px,3vw,22px)", fontWeight:400, color:D, marginBottom:14 }}>Details Here About Our Room</h4>
              <p style={{ fontSize:"clamp(14px,2vw,16px)", lineHeight:1.78, color:"rgba(4,17,6,.68)", marginBottom:28 }}>{room.fullDesc}</p>
              <h4 style={{ fontFamily:"Marcellus,serif", fontSize:"clamp(16px,2.5vw,20px)", fontWeight:400, color:D, marginBottom:18 }}>What Included in This Room Packages?</h4>
              <div className="includes-grid">
                {[...room.includes, ...room.includes2].map((item,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"7px 0" }}>
                    <div className="dot"></div>
                    <span style={{ fontSize:"clamp(13px,1.8vw,15px)", lineHeight:1.6, color:"rgba(4,17,6,.72)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="features-grid">
                {room.features.map((f,i)=>(
                  <div key={i} className="ib">
                    <span style={{ fontSize:24, flexShrink:0 }}>{f.icon}</span>
                    <div>
                      <h5 style={{ fontSize:14, fontWeight:600, color:D, margin:"0 0 4px" }}>{f.title}</h5>
                      <p style={{ fontSize:12, color:"rgba(4,17,6,.5)", margin:0, lineHeight:1.55 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AMENITIES */}
            <section style={{ marginBottom:36 }}>
              <h2 className="sh">Room Amenities</h2>
              <div className="amenities-grid">
                {room.amenities.map((a,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid rgba(4,17,6,.07)" }}>
                    <span style={{ fontSize:22, flexShrink:0, width:32, textAlign:"center" }}>{a.icon}</span>
                    <span style={{ fontSize:"clamp(13px,1.8vw,15px)", color:D, fontWeight:500 }}>{a.title}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* AROUND THE HOTEL */}
            <section style={{ marginBottom:36 }}>
              <h2 className="sh">Around The Hotel</h2>
              <div className="services-grid">
                {room.services.map((s,i)=><ServiceCard key={i} service={s}/>)}
              </div>
            </section>

          </div>
          {/* END LEFT */}

          {/* RIGHT SIDEBAR */}
          <div className="rd-sidebar">

            <div style={{ background:"rgba(255,255,255,.58)", border:"1px solid rgba(4,17,6,.09)", padding:"20px 22px" }}>
              <h2 style={{ fontFamily:"Marcellus,serif", fontSize:18, fontWeight:400, color:D, marginBottom:14, paddingBottom:10, borderBottom:"1px solid rgba(4,17,6,.08)" }}>Details</h2>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {[
                  ["Guests", `${room.details.guests}`],
                  ["Amenities", room.amenities.map(a=>a.title).join(", ")],
                  ["View", room.details.view],
                  ["Size", room.details.size],
                  ["Bed Type", room.details.bedType],
                  ["Categories", room.details.category],
                  ["Bedrooms", `${room.details.bedrooms}`],
                  ["Bathrooms", `${room.details.bathrooms}`],
                  ["Location", room.details.location],
                ].map(([k,v])=>(
                  <li key={k} className="ar">
                    <span style={{ fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:".07em", color:"rgba(4,17,6,.45)", whiteSpace:"nowrap", flexShrink:0 }}>{k}:</span>
                    <span style={{ fontSize:13, color:D, textAlign:"right", lineHeight:1.5 }}>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background:"rgba(255,255,255,.58)", border:"1px solid rgba(4,17,6,.09)", padding:"18px 22px" }}>
              <p style={{ fontSize:12, fontWeight:600, textTransform:"uppercase", letterSpacing:".1em", color:"rgba(4,17,6,.45)", marginBottom:6 }}>Prices Start At</p>
              <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
                <span style={{ fontFamily:"Marcellus,serif", fontSize:"clamp(32px,5vw,42px)", color:D, lineHeight:1 }}>₹{room.price}</span>
                <span style={{ fontSize:14, color:"rgba(4,17,6,.45)" }}>Per Night</span>
              </div>
            </div>

            <div style={{ background:"rgba(255,255,255,.58)", border:"1px solid rgba(4,17,6,.09)", padding:"20px 22px" }}>
              <h2 style={{ fontFamily:"Marcellus,serif", fontSize:18, fontWeight:400, color:D, marginBottom:14 }}>Reservation Form</h2>
              <p style={{ fontSize:13, color:"rgba(4,17,6,.4)", marginBottom:14 }}>Required fields are followed by <abbr title="required" style={{ color:D }}>*</abbr></p>
              <label style={{ fontSize:13, fontWeight:500, color:D, display:"block", marginBottom:5 }}>Check-in Date <span style={{ color:D }}>*</span></label>
              <input
                type="date" className="si" style={{ marginBottom:14 }}
                value={resForm.checkIn}
                onChange={e=>setResForm({ ...resForm, checkIn:e.target.value })}
              />
              <label style={{ fontSize:13, fontWeight:500, color:D, display:"block", marginBottom:5 }}>Check-out Date <span style={{ color:D }}>*</span></label>
              <input
                type="date" className="si" style={{ marginBottom:16 }}
                value={resForm.checkOut}
                onChange={e=>setResForm({ ...resForm, checkOut:e.target.value })}
              />
              <button className="bd" onClick={checkAvailability} disabled={resStatus==="sending"}>
                {resStatus==="sending" ? "Checking..." : resStatus==="sent" ? "Request Sent ✓" : "Check Availability"}
              </button>
            </div>

            <div style={{ background:"rgba(255,255,255,.58)", border:"1px solid rgba(4,17,6,.09)", padding:"20px 22px" }}>
              <h2 style={{ fontFamily:"Marcellus,serif", fontSize:16, fontWeight:400, color:D, marginBottom:16, letterSpacing:".03em" }}>LET'S CONNECT WITH US</h2>

              <div style={{ position:"relative", marginBottom:12 }}>
                <input
                  type="text" placeholder="Enter your name" className="si" style={{ paddingLeft:40 }}
                  value={contactForm.name}
                  onChange={e=>setContactForm({ ...contactForm, name:e.target.value })}
                />
                <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", fontSize:15, color:"rgba(4,17,6,.35)" }}>👤</span>
              </div>

              <div style={{ position:"relative", marginBottom:12 }}>
                <input
                  type="tel" placeholder="Phone Number" className="si" style={{ paddingLeft:40 }}
                  value={contactForm.phone}
                  onChange={e=>setContactForm({ ...contactForm, phone:e.target.value })}
                />
                <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", fontSize:15, color:"rgba(4,17,6,.35)" }}>📞</span>
              </div>

              <div style={{ position:"relative", marginBottom:12 }}>
                <input
                  type="email" placeholder="Enter your email" className="si" style={{ paddingLeft:40 }}
                  value={contactForm.email}
                  onChange={e=>setContactForm({ ...contactForm, email:e.target.value })}
                />
                <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", fontSize:15, color:"rgba(4,17,6,.35)" }}>✉</span>
              </div>

              <textarea
                placeholder="Write your message . . ." rows={4} className="si" style={{ resize:"vertical", marginBottom:14 }}
                value={contactForm.message}
                onChange={e=>setContactForm({ ...contactForm, message:e.target.value })}
              />

              <button
                className="bd"
                onClick={sendContactMail}
                disabled={sending}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
              >
                {sending ? "Sending..." : sent ? "Sent ✓" : <>Send Message Now <ArrowUR /></>}
              </button>
            </div>

            <div style={{ background:"rgba(255,255,255,.58)", border:"1px solid rgba(4,17,6,.09)", padding:"18px 22px" }}>
              {[
                { icon:"📞", label:"Customer Support", val:"91 7014764053" },
                { icon:"✉", label:"Need Live Support?", val:"theforestviewresortswm@gmail.com" },
              ].map((c,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:14, marginTop:i>0?14:0, paddingTop:i>0?14:0, borderTop:i>0?"1px solid rgba(4,17,6,.07)":"none" }}>
                  <div style={{ width:42, height:42, background:D, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>{c.icon}</div>
                  <div>
                    <p style={{ fontSize:12, color:"rgba(4,17,6,.45)", margin:"0 0 3px" }}>{c.label}</p>
                    <a href="#" style={{ fontSize:13, fontWeight:600, color:D, textDecoration:"none" }}>{c.val}</a>
                  </div>
                </div>
              ))}
            </div>

          </div>
          {/* END SIDEBAR */}
        </div>

        {/* RELATED ROOMS */}
        <div style={{ marginTop:48, paddingTop:32, borderTop:"1.5px solid rgba(4,17,6,.1)" }}>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:12, marginBottom:24 }}>
            <h3 style={{ fontFamily:"Marcellus,serif", fontSize:"clamp(20px,3vw,26px)", fontWeight:400, color:D, margin:0 }}>Browse Similar Escape</h3>
            <div style={{ display:"flex", gap:8 }}>
              <button className="ab" onClick={()=>setRelIdx(i=>Math.max(0,i-1))}><ChevL /></button>
              <button className="ab" onClick={()=>setRelIdx(i=>Math.min(related.length-visibleCount,i+1))}><ChevR /></button>
            </div>
          </div>

          <div className="related-grid">
            {visible.map(r=>(
              <div key={r.id} className="rc" onClick={()=>handleRelatedExplore(r.id)}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px 10px" }}>
                  <div style={{ display:"flex", gap:16 }}>
                    <span style={{ fontSize:13, fontWeight:500, color:D }}>🛏 {r.type}</span>
                    <span style={{ fontSize:13, fontWeight:500, color:D }}>👤 {r.persons}</span>
                  </div>
                </div>
                <div style={{ fontSize:13, color:"rgba(4,17,6,.45)", padding:"0 16px 10px" }}>
                  From <strong style={{ fontFamily:"Marcellus,serif", fontSize:18, color:D }}>₹{r.price}</strong>
                  <span style={{ marginLeft:4, fontSize:12 }}>per night</span>
                </div>
                <div style={{ height:200, overflow:"hidden" }}>
                  <img src={r.img} alt={r.name} className="rc-img" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                    onError={e=>{e.target.src=`https://placehold.co/830x600/c9d4cb/041106?text=${encodeURIComponent(r.name)}`;}}/>
                </div>
                <div style={{ padding:16 }}>
                  <h2 style={{ fontFamily:"Marcellus,serif", fontSize:17, fontWeight:400, color:D, margin:"0 0 8px" }}>{r.name}</h2>
                  <p style={{ fontSize:13, lineHeight:1.65, color:"rgba(4,17,6,.58)", margin:"0 0 14px" }}>{r.desc}</p>
                  <button className="ea" onClick={e=>{ e.stopPropagation(); handleRelatedExplore(r.id); }}>
                    EXPLORE NOW <ArrowUR />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}