import { useState, useEffect, useCallback } from "react";

const BG    = "#c9d4cb";
const DARK  = "#041106";
const SHADE = "#d4ddd6";
const MID   = "#6b8a6e";
const LIGHT = "#e8ede9";

const images = [
  { id: 1,  src: "/1.jpeg",  label: "Forest Suite",        desc: "Immersed in ancient pines with a private deck overlooking the canopy.", tall: true  },
  { id: 2,  src: "/2.jpeg",  label: "Grand Lobby",         desc: "Stone and timber welcome you into the warmth of the resort's heart.", tall: false },
  { id: 3,  src: "/3.jpeg",  label: "Lakeside Terrace",    desc: "Dine at the water's edge as mist rises over the morning lake.", tall: false },
  { id: 4,  src: "/4.jpeg",  label: "Canopy Villa",        desc: "A private villa suspended among the treetops — silence, perfected.", tall: true  },
  { id: 5,  src: "/5.jpeg",  label: "Spa & Wellness",      desc: "Botanically inspired treatments rooted in centuries of forest lore.", tall: false },
  { id: 6,  src: "/6.jpeg",  label: "Garden Room",         desc: "Wake to wildflowers and birdsong through floor-to-ceiling glass.", tall: false  },
  { id: 7,  src: "/7.jpeg",  label: "The Stone Table",     desc: "Fine dining sourced entirely from our surrounding forest and farms.", tall: true },
  { id: 8,  src: "/8.jpeg",  label: "Firepit Lounge",      desc: "Evenings gathered around open fire beneath an endless sky.", tall: false },
  { id: 9,  src: "/9.jpeg",  label: "Birchwood Suite",     desc: "Pale birch panels, hand-stitched linens, and deep forest views.", tall: true  },
  { id: 10, src: "/10.jpeg", label: "Morning Trail",       desc: "Guided dawn walks through old-growth forest — solitary or accompanied.", tall: false },
  { id: 11, src: "/11.jpeg", label: "The Reflecting Pool", desc: "An infinity pool that dissolves seamlessly into the treeline horizon.", tall: true  },
  { id: 12, src: "/12.jpeg", label: "Creek Cottage",       desc: "A secluded stone cottage perched above a whispering mountain creek.", tall: true},
   { id: 9,  src: "/13.jpeg",  label: "Birchwood Suite",     desc: "Pale birch panels, hand-stitched linens, and deep forest views.", tall: false },
  { id: 10, src: "/14.jpeg", label: "Morning Trail",       desc: "Guided dawn walks through old-growth forest — solitary or accompanied.", tall: true },
  { id: 11, src: "/15.jpeg", label: "The Reflecting Pool", desc: "An infinity pool that dissolves seamlessly into the treeline horizon.", tall: true },
  { id: 12, src: "/16.jpeg", label: "Creek Cottage",       desc: "A secluded stone cottage perched above a whispering mountain creek.", tall: false },
];

const amenitiesMap = [
  ["Forest View", "Private Deck", "King Bed"],
  ["Fireplace", "Concierge", "Bar Access"],
  ["Spa Access", "Breakfast Incl.", "Lake View"],
  ["Private Pool", "Butler Service", "Forest View"],
  ["Steam Room", "Aromatherapy", "Couples Suite"],
  ["Garden View", "Glass Walls", "Rain Shower"],
  ["Chef's Table", "Wine Pairing", "Private Dining"],
  ["Open Fire", "Night Sky View", "Hot Tub"],
  ["Birch Panels", "Linen Service", "Forest View"],
  ["Dawn Guide", "Trail Map", "Packed Lunch"],
  ["Infinity Pool", "Panoramic View", "Sundeck"],
  ["Creek View", "Stone Bath", "Private Access"],
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${BG}; }

  .root {
    min-height: 100vh;
    background: ${BG};
    font-family: 'Jost', sans-serif;
    color: ${DARK};
  }

  /* ── BANNER ── */
  .banner {
    position: relative;
    width: 100%; height: 94vh; min-height: 580px;
    overflow: hidden;
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-end;
    padding-bottom: 5.5rem;
  }
  .banner-bg {
    position: absolute; inset: 0;
    background-image: url('https://picsum.photos/id/37/1600/900');
    background-size: cover; background-position: center;
    transform: scale(1.06);
    animation: slowZoom 20s ease forwards;
  }
  @keyframes slowZoom { to { transform: scale(1); } }
  .banner-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(4,17,6,0.25) 0%,
      rgba(4,17,6,0.04) 30%,
      rgba(4,17,6,0.52) 72%,
      rgba(4,17,6,0.82) 100%
    );
  }

  .banner-top {
    position: absolute; top: 0; left: 0; right: 0;
    padding: 2.2rem 3.5rem;
    display: flex; align-items: center; justify-content: space-between;
    z-index: 3;
  }
  .banner-logo {
    font-family: 'Marcellus', serif;
    font-size: 13.5px; letter-spacing: 0.26em; text-transform: uppercase;
    color: rgba(232,237,233,0.88);
  }
  .banner-nav {
    display: flex; gap: 2.2rem;
    font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(232,237,233,0.5); font-weight: 300;
  }
  .banner-nav a {
    color: inherit; text-decoration: none;
    cursor: pointer; transition: color 0.2s;
  }
  .banner-nav a:hover { color: ${LIGHT}; }

  .banner-content {
    position: relative; z-index: 2; text-align: center; padding: 0 2rem;
  }
  .banner-eyebrow {
    font-size: 10.5px; letter-spacing: 0.38em; text-transform: uppercase;
    color: ${MID}; margin-bottom: 1.5rem;
    display: flex; align-items: center; justify-content: center; gap: 14px;
  }
  .banner-eyebrow::before, .banner-eyebrow::after {
    content: ''; display: block; width: 38px; height: 1px; background: ${MID};
  }
  .banner-title {
    font-family: 'Marcellus', serif;
    font-size: clamp(2.8rem, 7vw, 6.6rem);
    line-height: 1.0; color: ${LIGHT};
    letter-spacing: 0.01em; margin-bottom: 1.4rem;
  }
  .banner-sub {
    font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(232,237,233,0.42); font-weight: 300; margin-bottom: 3rem;
  }
  .banner-cta {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 13px 34px;
    border: 1px solid rgba(232,237,233,0.32);
    font-size: 10.5px; letter-spacing: 0.24em; text-transform: uppercase;
    color: ${LIGHT}; cursor: pointer; background: transparent;
    font-family: 'Jost', sans-serif; transition: all 0.28s;
  }
  .banner-cta:hover {
    background: rgba(232,237,233,0.1);
    border-color: rgba(232,237,233,0.62);
  }

  .banner-scroll {
    position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    font-size: 9.5px; letter-spacing: 0.24em; text-transform: uppercase;
    color: rgba(232,237,233,0.3); z-index: 2;
  }
  .scroll-line {
    width: 1px; height: 38px; background: rgba(232,237,233,0.18);
    animation: scrollPulse 2.2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%,100% { opacity: 0.25; transform: scaleY(0.85); }
    50%      { opacity: 0.85; transform: scaleY(1.15); }
  }

  /* ── SECTION HEADER ── */
  .section-header {
    position: relative; z-index: 2;
    padding: 4rem 3.5rem 2rem;
    display: flex; align-items: flex-end; justify-content: space-between;
    border-bottom: 1px solid rgba(4,17,6,0.1);
  }
  .section-label {
    font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase;
    color: ${MID}; margin-bottom: 0.7rem;
    display: flex; align-items: center; gap: 10px;
  }
  .section-label::before {
    content: ''; display: block; width: 22px; height: 1px; background: ${MID};
  }
  .section-title {
    font-family: 'Marcellus', serif;
    font-size: clamp(1.6rem, 3vw, 2.5rem);
    color: ${DARK}; line-height: 1.1;
  }
  .section-count {
    font-size: 11px; letter-spacing: 0.1em; color: ${MID}; font-weight: 300;
  }

  /* ── GALLERY ── */
  .gallery-grid {
    position: relative; z-index: 2;
    padding: 2rem 3.5rem 5rem;
    columns: 3 260px; column-gap: 1rem;
  }

  .gallery-item {
    break-inside: avoid; margin-bottom: 1rem;
    position: relative; overflow: hidden; cursor: pointer;
    border-radius: 5px; background: ${SHADE};
    opacity: 0; transform: translateY(20px);
    animation: fadeUp 0.55s ease forwards;
  }
  @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

  .skeleton {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, ${SHADE} 25%, #dce5de 50%, ${SHADE} 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    z-index: 1;
  }
  @keyframes shimmer { to { background-position: -200% 0; } }

  .gallery-item img {
    display: block; width: 100%; object-fit: cover; position: relative; z-index: 2;
    transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease;
    opacity: 0;
  }
  .gallery-item img.ready { opacity: 1; }
  .gallery-item:hover img { transform: scale(1.05); }

  .item-vignette {
    position: absolute; inset: 0; z-index: 3;
    background: rgba(4,17,6,0);
    transition: background 0.35s ease;
  }
  .gallery-item:hover .item-vignette { background: rgba(4,17,6,0.16); }

  /* ── LIGHTBOX ── */
  .lightbox {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(4,17,6,0.95);
    display: flex; align-items: center; justify-content: center; padding: 2rem;
    animation: lbIn 0.28s ease;
  }
  @keyframes lbIn { from { opacity: 0 } to { opacity: 1 } }

  .lb-inner {
    position: relative; max-width: 1060px; width: 100%;
    display: grid; grid-template-columns: 1fr 265px;
    gap: 3rem; align-items: center;
  }
  .lb-img-wrap {
    border-radius: 6px; overflow: hidden;
    box-shadow: 0 48px 96px rgba(0,0,0,0.5);
  }
  .lb-img-wrap img {
    display: block; width: 100%; max-height: 78vh; object-fit: cover;
  }
  .lb-info { color: ${LIGHT}; }
  .lb-eyebrow {
    font-size: 10px; letter-spacing: 0.3em; color: ${MID};
    text-transform: uppercase; margin-bottom: 2.2rem;
    display: flex; align-items: center; gap: 10px;
  }
  .lb-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: ${MID}; }
  .lb-room {
    font-family: 'Marcellus', serif;
    font-size: 2.1rem; line-height: 1.08;
    color: ${LIGHT}; margin-bottom: 1.4rem;
  }
  .lb-sep { width: 28px; height: 1px; background: rgba(201,212,203,0.15); margin-bottom: 1.4rem; }
  .lb-desc {
    font-size: 13px; line-height: 2; color: rgba(201,212,203,0.48);
    font-weight: 300; margin-bottom: 2.2rem;
  }
  .lb-amenities {
    display: flex; flex-direction: column; gap: 9px;
    font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(201,212,203,0.32);
  }
  .lb-amenities span { display: flex; align-items: center; gap: 9px; }
  .lb-amenities span::before {
    content: ''; display: block; width: 4px; height: 4px;
    border-radius: 50%; background: ${MID}; flex-shrink: 0;
  }
  .lb-nav { display: flex; gap: 0.7rem; margin-top: 2.4rem; }
  .lb-nav-btn {
    width: 40px; height: 40px; border-radius: 50%;
    border: 1px solid rgba(201,212,203,0.18);
    background: transparent; color: ${LIGHT};
    cursor: pointer; font-size: 17px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .lb-nav-btn:hover { background: rgba(201,212,203,0.08); border-color: rgba(201,212,203,0.4); }
  .lb-close {
    position: absolute; top: -2rem; right: 0;
    font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(201,212,203,0.32); cursor: pointer;
    border: none; background: transparent;
    font-family: 'Jost', sans-serif;
    display: flex; align-items: center; gap: 8px; transition: color 0.2s;
  }
  .lb-close:hover { color: ${LIGHT}; }
  .lb-close::after { content: '×'; font-size: 20px; font-weight: 200; }

  /* ── FOOTER ── */
  .footer {
    position: relative; z-index: 2;
    padding: 2rem 3.5rem;
    border-top: 1px solid rgba(4,17,6,0.1);
    display: flex; align-items: center; justify-content: space-between;
    font-size: 10.5px; letter-spacing: 0.1em; color: ${MID};
  }
  .footer-brand {
    font-family: 'Marcellus', serif; font-size: 12px; letter-spacing: 0.2em;
  }

  @media (max-width: 760px) {
    .banner-nav { display: none; }
    .banner-top { padding: 1.5rem; }
    .banner-title { font-size: 2.6rem; }
    .section-header { padding: 2.5rem 1.5rem 1.5rem; flex-direction: column; align-items: flex-start; gap: 0.4rem; }
    .gallery-grid { padding: 1.5rem 1.5rem 3rem; columns: 2 130px; }
    .lb-inner { grid-template-columns: 1fr; }
    .lb-info { display: none; }
    .footer { padding: 1.5rem; flex-direction: column; gap: 0.4rem; text-align: center; }
  }
`;

export default function ForestviewGallery() {
  const [selected,  setSelected]  = useState(null);
  const [imgLoaded, setImgLoaded] = useState({});

  const open     = useCallback((img) => setSelected(img), []);
  const close    = useCallback(() => setSelected(null), []);
  const navigate = useCallback((dir) => {
    if (!selected) return;
    const idx  = images.findIndex(i => i.id === selected.id);
    setSelected(images[(idx + dir + images.length) % images.length]);
  }, [selected]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft")  navigate(-1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [close, navigate]);

  const markLoaded = useCallback((id) => {
    setImgLoaded(p => ({ ...p, [id]: true }));
  }, []);

  const selIdx = selected ? images.findIndex(i => i.id === selected.id) : -1;

  return (
    <>
      <style>{css}</style>
      <div className="root">

        {/* BANNER */}
        <section className="banner">
          <div className="banner-bg" />
          <div className="banner-overlay" />

          <div className="banner-top">
            <div className="banner-logo">The Forestview Resort</div>
            <nav className="banner-nav">
              <a>Rooms</a>
              <a>Dining</a>
              <a>Spa</a>
              <a>Reserve</a>
            </nav>
          </div>

          <div className="banner-content">
            <div className="banner-eyebrow">Est. 1962 · Forest & Lake District</div>
            <h1 className="banner-title">The Forestview<br />Resort</h1>
            <p className="banner-sub">Where the forest meets refinement</p>
            <button className="banner-cta">Explore the Property &rarr;</button>
          </div>

          <div className="banner-scroll">
            <div className="scroll-line" />
            Scroll
          </div>
        </section>

        {/* SECTION HEADER */}
        <div className="section-header">
          <div>
            <div className="section-label">Photo Gallery</div>
            <h2 className="section-title">Rooms, Spaces & Experiences</h2>
          </div>
          <div className="section-count">{images.length} spaces</div>
        </div>

        {/* GALLERY */}
        <div className="gallery-grid">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="gallery-item"
              style={{ animationDelay: `${i * 0.055}s` }}
              onClick={() => open(img)}
            >
              {!imgLoaded[img.id] && <div className="skeleton" />}
              <img
                src={img.src}
                alt={img.label}
                className={imgLoaded[img.id] ? "ready" : ""}
                style={{ height: img.tall ? "400px" : "262px" }}
                onLoad={() => markLoaded(img.id)}
                decoding="async"
              />
              <div className="item-vignette" />
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <span className="footer-brand">The Forestview Resort</span>
          <span>Forest &amp; Lake District · Est. 1962</span>
          <span>&copy; 2026 All rights reserved</span>
        </footer>

        {/* LIGHTBOX */}
        {selected && (
          <div className="lightbox" onClick={close}>
            <div className="lb-inner" onClick={e => e.stopPropagation()}>
              <button className="lb-close" onClick={close}>Close</button>

              <div className="lb-img-wrap">
                <img src={selected.src} alt={selected.label} />
              </div>

              <div className="lb-info">
                <div className="lb-eyebrow">
                  {String(selIdx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </div>
                <div className="lb-room">{selected.label}</div>
                <div className="lb-sep" />
                <div className="lb-desc">{selected.desc}</div>
                <div className="lb-amenities">
                  {(amenitiesMap[selected.id - 1] || []).map(a => (
                    <span key={a}>{a}</span>
                  ))}
                </div>
                <div className="lb-nav">
                  <button className="lb-nav-btn" onClick={() => navigate(-1)}>&#8592;</button>
                  <button className="lb-nav-btn" onClick={() => navigate(1)}>&#8594;</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}