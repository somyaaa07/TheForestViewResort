import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
/* ─── Design tokens (same as parent) ─── */
const BG    = "#c9d4cb";
const DARK  = "#041106";

/* ─── Helpers ─── */
function useReveal(thr = 0.08) {
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
    <div ref={ref} className={className}
      style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(28px)",
        transition:`opacity .65s ease ${delay}ms,transform .65s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

const Ico = {
  arrow: <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4.1 11.9L11.9 4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M4.1 4.1H11.9V11.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg>,
  bed:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13"><path d="M2 9L2 20"/><path d="M22 9L22 20"/><path d="M2 14L22 14"/><rect x="2" y="9" width="9" height="5" rx="1"/><rect x="13" y="9" width="9" height="5" rx="1"/></svg>,
  user:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  size:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>,
  alert: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width="12" height="12"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  star:  <svg viewBox="0 0 24 24" fill="rgba(201,212,203,.75)" width="11" height="11"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  heart: (filled) => <svg viewBox="0 0 24 24" fill={filled?"#c73d2a":"none"} stroke={filled?"#c73d2a":"rgba(4,17,6,.45)"} strokeWidth="1.5" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
};

const ROOMS = [
  {
    title: "Deluxe Double Room",
    type: "2 Single Beds",
    size: "20 m²",
    persons: "2 Persons",
    rating: 4.4,
    reviews: 139,
    tag: "Popular",
    img: "/9.jpeg",
    urgency: "Only 4 left!",
    amenities: ["Free toiletries","Clothes rack","Dining area","Balcony","Garden view","Pool view","Mountain view"],
    policies: ["Free cancellation before 17 May 2026","No prepayment needed – pay at the property","No credit card needed"],
    plans: [
      { name:"Flexible",             price:2300, tax:115, includes:""                        },
      { name:"With Breakfast",       price:2800, tax:140, includes:"Breakfast included"       },
      { name:"Half Board",           price:3300, tax:165, includes:"Breakfast & lunch"        },
    ],
  },
  {
    title: "Standard King Room",
    type: "1 King Bed",
    size: "18 m²",
    persons: "2 Persons",
    rating: 4.4,
    reviews: 139,
    tag: "Standard",
    img: "/10.jpeg",
    urgency: null,
    amenities: ["Free toiletries","Clothes rack","Dining area","Garden view","Pool view","Free WiFi"],
    policies: ["Free cancellation before 17 May 2026","No prepayment needed – pay at the property","No credit card needed"],
    plans: [
      { name:"Flexible",             price:2500, tax:125, includes:""                        },
      { name:"With Breakfast",       price:3000, tax:150, includes:"Breakfast included"       },
    ],
  },
];

/* ══════════════════════════════════════════════
   ROOM CARD — horizontal layout
══════════════════════════════════════════════ */
function RoomCard({ r, i, wishlist, toggleWish }) {
  const [planIdx, setPlanIdx] = useState(0);
  const plan = r.plans[planIdx];
  const wished = wishlist.has(i);

  return (
    <Reveal delay={i * 100}>
      <article className="rc-card">

        {/* ── Left: Image ── */}
        <div className="rc-img-wrap">
          <img src={r.img} alt={r.title} className="rc-img" />
          <div className="rc-img-overlay" />

          <span className="rc-badge">{r.tag}</span>

          <button type="button" className="rc-wish" onClick={() => toggleWish(i)} aria-label="Wishlist">
            {Ico.heart(wished)}
          </button>

          {r.urgency && (
            <div className="rc-urgency">
              {Ico.alert}
              <span>{r.urgency}</span>
            </div>
          )}

          {/* Vertical label stripe */}
          <div className="rc-stripe">
            <span>{r.title}</span>
          </div>
        </div>

        {/* ── Right: Content ── */}
        <div className="rc-body">

          {/* Title + Rating */}
          <div className="rc-title-row">
            <h3 className="marc rc-title">{r.title}</h3>
            <div className="rc-rating-block">
              <div className="rc-rating-pill">
                {Ico.star}
                <span>{r.rating}</span>
              </div>
              <p className="rc-review-count">{r.reviews} reviews</p>
            </div>
          </div>

          {/* Meta chips */}
          <div className="rc-meta-row">
            {[
              { ico: Ico.bed,  label: r.type    },
              { ico: Ico.user, label: r.persons },
              { ico: Ico.size, label: r.size    },
            ].map(({ ico, label }) => (
              <span key={label} className="rc-chip">
                {ico}{label}
              </span>
            ))}
          </div>

          {/* Amenity tags */}
          <div className="rc-amenities">
            {r.amenities.slice(0, 5).map(a => (
              <span key={a} className="rc-amenity">{a}</span>
            ))}
            {r.amenities.length > 5 && (
              <span className="rc-amenity rc-amenity--more">+{r.amenities.length - 5} more</span>
            )}
          </div>

          <div className="rc-divider" />

          {/* Plan selector */}
          <p className="rc-plans-label">SELECT PLAN</p>
          <div className="rc-plans">
            {r.plans.map((p, pi) => (
              <button
                key={p.name}
                type="button"
                className={`rc-plan${planIdx === pi ? " rc-plan--active" : ""}`}
                onClick={() => setPlanIdx(pi)}
              >
                <div className="rc-plan-left">
                  <span className="rc-plan-name">{p.name}</span>
                  {p.includes
                    ? <span className="rc-plan-inc">✓ {p.includes}</span>
                    : <span className="rc-plan-inc rc-plan-inc--dim">Room only</span>
                  }
                </div>
                <div className="rc-plan-right">
                  <span className="marc rc-plan-price">₹{p.price.toLocaleString()}</span>
                  <span className="rc-plan-tax">+₹{p.tax} tax</span>
                </div>
              </button>
            ))}
          </div>

          {/* Policies */}
          <div className="rc-policies">
            {r.policies.map(pol => (
              <div key={pol} className="rc-policy">
                {Ico.check}
                <span>{pol}</span>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="rc-cta-row">
            <a href="#" className="rc-explore">EXPLORE {Ico.arrow}</a>
            <button type="button" className="rc-reserve">
              Reserve Now —&nbsp;
              <span className="marc" style={{ fontSize: 16 }}>₹{plan.price.toLocaleString()}</span>
            </button>
          </div>

        </div>
      </article>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════
   ROOMS SECTION — drop this in place of the old one
══════════════════════════════════════════════ */
export default function RoomsSection({ wishlist, toggleWish }) {
  return (
    <section className="section-rooms" style={{ padding: "clamp(56px,8vw,92px) 0" }}>
      <style>{`
        /* ── ROOMS SECTION STYLES ── */
        .section-rooms { background: linear-gradient(165deg,#0f1f13 0%,#1b3322 52%,#102015 100%); }

        /* Card layout */
        .rc-card {
          display: grid;
          grid-template-columns: 380px 1fr;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(201,212,203,.1);
          border-radius: 18px;
          overflow: hidden;
          transition: border-color .3s, transform .3s, box-shadow .3s;
          margin-bottom: clamp(16px,2vw,24px);
        }
        .rc-card:last-child { margin-bottom: 0; }
        .rc-card:hover {
          border-color: rgba(201,212,203,.24);
          transform: translateY(-4px);
          box-shadow: 0 24px 64px rgba(0,0,0,.35);
        }

        /* Image */
        .rc-img-wrap {
          position: relative;
          overflow: hidden;
          min-height: 320px;
        }
        .rc-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform .7s;
        }
        .rc-card:hover .rc-img { transform: scale(1.06); }
        .rc-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(4,17,6,.08), rgba(4,17,6,.42));
          pointer-events: none;
        }
        .rc-badge {
          position: absolute; top: 16px; left: 16px;
          background: #041106; color: #c9d4cb;
          font-size: 9px; font-weight: 800;
          letter-spacing: .14em; text-transform: uppercase;
          padding: 5px 12px;
          border: 1px solid rgba(201,212,203,.2);
        }
        .rc-wish {
          position: absolute; top: 16px; right: 16px;
          width: 36px; height: 36px;
          background: rgba(255,255,255,.92); border: none;
          border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all .25s; box-shadow: 0 2px 10px rgba(0,0,0,.15);
        }
        .rc-wish:hover { background: #fff; transform: scale(1.1); }
        .rc-urgency {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: rgba(199,61,42,.88);
          padding: 8px 14px;
          display: flex; align-items: center; gap: 7px;
          z-index: 2;
        }
        .rc-urgency span {
          font-size: 10px; font-weight: 700;
          color: #fff; letter-spacing: .1em; text-transform: uppercase;
        }
        /* Vertical label stripe on the image */
        .rc-stripe {
          position: absolute;
          bottom: 20px; left: -2px;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-size: 10px; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase;
          color: rgba(201,212,203,.38);
          pointer-events: none;
          display: flex; align-items: center; gap: 8px;
        }

        /* Body */
        .rc-body {
          padding: clamp(22px,2.5vw,32px) clamp(20px,2.5vw,30px) clamp(20px,2vw,26px);
          display: flex; flex-direction: column;
          background: linear-gradient(180deg, rgba(201,212,203,.03) 0%, rgba(201,212,203,.01) 100%);
        }

        /* Title row */
        .rc-title-row {
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 12px;
          margin-bottom: 12px;
        }
        .rc-title {
          font-size: clamp(18px,2.2vw,24px);
          font-weight: 400; color: #eef7f0;
          line-height: 1.2; margin: 0; flex: 1; min-width: 0;
        }
        .rc-rating-block { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }
        .rc-rating-pill {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(201,212,203,.1);
          border: 1px solid rgba(201,212,203,.18);
          padding: 5px 10px; border-radius: 8px;
        }
        .rc-rating-pill span { font-size: 13px; font-weight: 700; color: #eef7f0; }
        .rc-review-count { font-size: 11px; color: rgba(201,212,203,.38); font-weight: 500; }

        /* Meta chips */
        .rc-meta-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .rc-chip {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; color: rgba(201,212,203,.5);
          background: rgba(201,212,203,.06);
          border: 1px solid rgba(201,212,203,.1);
          padding: 4px 10px; border-radius: 20px;
        }

        /* Amenities */
        .rc-amenities { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .rc-amenity {
          font-size: 10px; font-weight: 600;
          letter-spacing: .06em; text-transform: uppercase;
          padding: 4px 9px;
          background: rgba(201,212,203,.05);
          border: 1px solid rgba(201,212,203,.1);
          color: rgba(201,212,203,.45);
          border-radius: 4px;
        }
        .rc-amenity--more { color: rgba(201,212,203,.3); border-style: dashed; }

        .rc-divider { height: 1px; background: rgba(201,212,203,.08); margin: 4px 0 16px; }

        /* Plans */
        .rc-plans-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
          color: rgba(201,212,203,.3); margin-bottom: 8px;
        }
        .rc-plans { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
        .rc-plan {
          flex: 1; min-width: 110px;
          padding: 10px 12px;
          border: 1.5px solid rgba(201,212,203,.12);
          background: rgba(255,255,255,.02);
          border-radius: 10px; cursor: pointer;
          text-align: left; font-family: 'Jost',sans-serif;
          transition: all .2s;
          display: flex; justify-content: space-between;
          align-items: center; gap: 8px;
        }
        .rc-plan:hover:not(.rc-plan--active) { border-color: rgba(201,212,203,.25); }
        .rc-plan--active {
          border-color: rgba(201,212,203,.52);
          background: rgba(201,212,203,.07);
        }
        .rc-plan-left { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .rc-plan-name { font-size: 12px; font-weight: 600; color: #c9d4cb; }
        .rc-plan-inc { font-size: 10px; color: #5fcf7c; font-weight: 500; }
        .rc-plan-inc--dim { color: rgba(201,212,203,.28) !important; }
        .rc-plan-right { text-align: right; flex-shrink: 0; }
        .rc-plan-price { font-size: 17px; color: #eef7f0; line-height: 1; display: block; }
        .rc-plan-tax { font-size: 10px; color: rgba(201,212,203,.32); margin-top: 2px; display: block; }

        /* Policies */
        .rc-policies { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-bottom: 16px; }
        .rc-policy {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; color: #5fcf7c; font-weight: 500;
        }

        /* CTA */
        .rc-cta-row {
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
          padding-top: 14px;
          border-top: 1px solid rgba(201,212,203,.08);
          margin-top: auto; flex-wrap: wrap;
        }
        .rc-explore {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 700;
          letter-spacing: .12em; text-transform: uppercase;
          color: rgba(201,212,203,.5); text-decoration: none;
          border: 1.5px solid rgba(201,212,203,.15);
          padding: 9px 14px; border-radius: 8px;
          transition: all .2s;
        }
        .rc-explore:hover {
          color: #c9d4cb;
          border-color: rgba(201,212,203,.35);
          background: rgba(201,212,203,.05);
        }
        .rc-reserve {
          display: flex; align-items: center; gap: 8px;
          background: #c9d4cb; color: #041106;
          border: none; padding: 11px 22px;
          font-size: 11px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          cursor: pointer; font-family: 'Jost',sans-serif;
          border-radius: 10px; transition: all .2s; white-space: nowrap;
        }
        .rc-reserve:hover { background: #e8f0e9; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,212,203,.18); }

        /* Responsive */
        @media(max-width:900px){
          .rc-card { grid-template-columns: 1fr !important; }
          .rc-img-wrap { min-height: 220px !important; }
          .rc-stripe { display: none !important; }
        }
        @media(max-width:600px){
          .rc-plans { flex-direction: column !important; }
          .rc-plan { min-width: 0 !important; }
        }
      `}</style>

      <div className="sec-wrap">
        <Reveal>
          <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(232,240,233,.5)", marginBottom:10 }}>
            03 _ ROOMS &amp; SUITES
          </p>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20, marginBottom:40 }}>
            <div>
              <h2 className="marc" style={{ fontSize:"clamp(20px,4.2vw,50px)", fontWeight:400, color:"#eef7f0", lineHeight:1.15, marginBottom:8 }}>
                Comfortable Jungle Stays For You
              </h2>
              <p style={{ fontSize:"clamp(13px,1.4vw,15px)", color:"rgba(201,212,203,.5)", maxWidth:520, lineHeight:1.65 }}>
                Real rooms, real pricing — select your preferred plan and book directly. All rates include flexible cancellation, no prepayment required.
              </p>
            </div>
            <Link to="/accommodation" style={{
              display:"inline-flex", alignItems:"center", gap:8,
              color:"rgba(201,212,203,.65)", border:"1.5px solid rgba(201,212,203,.22)",
              padding:"11px 22px", fontSize:10, fontWeight:700,
              letterSpacing:".12em", textTransform:"uppercase",
              textDecoration:"none", whiteSpace:"nowrap", flexShrink:0,
            }}>
              VIEW ALL ROOMS
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4.1 11.9L11.9 4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M4.1 4.1H11.9V11.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </Link>
          </div>
        </Reveal>

        <div>
          {ROOMS.map((r, i) => (
            <RoomCard key={r.title} r={r} i={i} wishlist={wishlist} toggleWish={toggleWish} />
          ))}
        </div>
      </div>
    </section>
  );
}