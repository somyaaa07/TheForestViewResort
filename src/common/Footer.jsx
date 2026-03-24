const BG   = "#c9d4cb";
const DARK  = "#041106";

const ArrowSVG = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path d="M4.1 11.9L11.9 4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.1 4.1H11.9V11.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FOOTER_LINKS = {
  Company: ["About Us", "Our Team", "Careers", "Press & Media", "Sustainability"],
  Explore: ["Luxury Hotels", "Boutique Hotels", "Resort Hotels", "Business Hotels", "Eco Hotels"],
  Support: ["Help Center", "Booking Policy", "Cancellation", "Privacy Policy", "Terms of Service"],
};

const SOCIALS = [
  {
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4.5"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: DARK, color: BG, fontFamily: "'Jost', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Marcellus&display=swap');

        /* ── Reset & base ── */
        *, *::before, *::after { box-sizing: border-box; }
        .marc { font-family: 'Marcellus', serif; }

        .ft-link {
          font-size: 14px;
          color: rgba(201,212,203,.5);
          text-decoration: none;
          display: block;
          padding: 5px 0;
          transition: color .25s, padding-left .25s;
        }
        .ft-link:hover { color: #c9d4cb; padding-left: 4px; }

        .ft-social {
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(201,212,203,.18);
          display: flex; align-items: center; justify-content: center;
          color: rgba(201,212,203,.55);
          cursor: pointer;
          transition: background .25s, color .25s, border-color .25s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .ft-social:hover {
          background: rgba(201,212,203,.12);
          color: #c9d4cb;
          border-color: rgba(201,212,203,.45);
        }

        /* ── Newsletter strip ── */
        .ft-newsletter {
          border-bottom: 1px solid rgba(201,212,203,.1);
          padding: 44px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 28px;
          max-width: 1380px;
          margin: 0 auto;
        }
        .ft-newsletter-text { flex: 1 1 280px; }
        .ft-newsletter-form {
          display: flex;
          width: 100%;
          max-width: 440px;
          flex: 1 1 280px;
        }

        .ft-input {
          flex: 1;
          min-width: 0;         /* prevents overflow in flex */
          height: 46px;
          background: rgba(201,212,203,.07);
          border: 1px solid rgba(201,212,203,.15);
          border-right: none;
          color: #c9d4cb;
          font-size: 13px;
          padding: 0 16px;
          font-family: 'Jost', sans-serif;
          outline: none;
          transition: border-color .25s;
        }
        .ft-input::placeholder { color: rgba(201,212,203,.33); }
        .ft-input:focus { border-color: rgba(201,212,203,.42); }

        .ft-sub-btn {
          height: 46px;
          padding: 0 22px;
          background: rgba(201,212,203,.13);
          border: 1px solid rgba(201,212,203,.22);
          color: rgba(201,212,203,.85);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          display: flex; align-items: center; gap: 8px;
          transition: background .25s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ft-sub-btn:hover { background: rgba(201,212,203,.22); }

        /* ── Main columns grid ── */
        .ft-main {
          max-width: 1380px;
          margin: 0 auto;
          padding: 64px 48px 52px;
        }
        .ft-cols {
          display: grid;
          grid-template-columns: 1.6fr repeat(3, 1fr);
          gap: 48px;
        }

        /* ── Stats strip ── */
        .ft-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(201,212,203,.07);
          border-radius: 8px;
          overflow: hidden;
          margin-top: 52px;
        }
        .ft-stat-cell {
          padding: 28px 24px;
          background: rgba(201,212,203,.04);
          text-align: center;
        }
        .ft-stat-cell:not(:last-child) {
          border-right: 1px solid rgba(201,212,203,.08);
        }

        /* ── Bottom bar ── */
        .ft-divider { height: 1px; background: rgba(201,212,203,.1); }
        .ft-bottom-wrap {
          max-width: 1380px;
          margin: 0 auto;
          padding: 22px 48px;
        }
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }
        .ft-bottom-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .ft-bottom-link {
          font-size: 12px;
          color: rgba(201,212,203,.35);
          text-decoration: none;
          transition: color .2s;
          white-space: nowrap;
        }
        .ft-bottom-link:hover { color: rgba(201,212,203,.75); }

        /* ════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ════════════════════════════════ */

        /* md — tablets 768–1023px */
        @media (max-width: 1023px) {
          .ft-cols {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
          /* Brand col spans full width on its own row */
          .ft-brand-col {
            grid-column: 1 / -1;
          }
          .ft-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .ft-stats .ft-stat-cell:nth-child(2) {
            border-right: none;
          }
          .ft-stats .ft-stat-cell:nth-child(1),
          .ft-stats .ft-stat-cell:nth-child(2) {
            border-bottom: 1px solid rgba(201,212,203,.08);
          }
        }

        /* sm — tablets 768px exactly */
        @media (max-width: 900px) {
          .ft-newsletter { padding: 36px 28px; }
          .ft-main       { padding: 48px 28px 40px; }
          .ft-bottom-wrap{ padding: 20px 28px; }
        }

        /* xs — phones < 640px */
        @media (max-width: 639px) {
          .ft-newsletter {
            padding: 30px 20px;
            gap: 20px;
          }
          .ft-newsletter-form {
            max-width: 100%;
            flex: 1 1 100%;
          }

          .ft-main { padding: 36px 20px 32px; }

          .ft-cols {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .ft-brand-col { grid-column: 1; }

          /* 2-column stats on phone */
          .ft-stats {
            grid-template-columns: repeat(2, 1fr);
            margin-top: 32px;
          }
          .ft-stat-cell { padding: 20px 12px; }
          .ft-stats .ft-stat-cell:nth-child(2) { border-right: none; }
          .ft-stats .ft-stat-cell:nth-child(4) { border-right: none; }
          .ft-stats .ft-stat-cell:nth-child(1),
          .ft-stats .ft-stat-cell:nth-child(2) {
            border-bottom: 1px solid rgba(201,212,203,.08);
          }

          .ft-bottom-wrap { padding: 18px 20px; }
          .ft-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
          .ft-bottom-links { gap: 16px; }
        }

        /* xxs — very small phones < 380px */
        @media (max-width: 379px) {
          .ft-sub-btn { padding: 0 14px; font-size: 10px; letter-spacing: .08em; }
          .ft-sub-btn svg { display: none; }
          .ft-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* ── Newsletter strip ── */}
      <div className="ft-newsletter">
        <div className="ft-newsletter-text">
          <p style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(201,212,203,.35)", marginBottom: 8 }}>
            STAY IN THE LOOP
          </p>
          <h3 className="marc" style={{ fontSize: "clamp(18px, 2.6vw, 34px)", fontWeight: 400, color: "rgba(201,212,203,.88)", lineHeight: 1.22, margin: 0 }}>
            Get Exclusive Deals &amp; Travel Stories
          </h3>
        </div>
        <div className="ft-newsletter-form">
          <input className="ft-input" type="email" placeholder="Your email address" />
          <button className="ft-sub-btn">
            SUBSCRIBE <ArrowSVG />
          </button>
        </div>
      </div>

      {/* ── Main columns ── */}
      <div className="ft-main">
        <div className="ft-cols">

          {/* Brand col */}
          <div className="ft-brand-col">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(201,212,203,.12)", border: "1px solid rgba(201,212,203,.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, flexShrink: 0,
              }}>✦</div>
              <span className="marc" style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "#c9d4cb", fontWeight: 400, letterSpacing: ".04em" }}>
                THE FOREST VIEW
              </span>
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.82, color: "rgba(201,212,203,.48)", marginBottom: 28, maxWidth: 300 }}>
              Discover the world's finest hotels and resorts through seamless, effortless booking. Your journey begins with a single click.
            </p>

            <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
              {SOCIALS.map(s => (
                <a key={s.label} href="#" className="ft-social" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "rgba(201,212,203,.06)", border: "1px solid rgba(201,212,203,.12)",
              borderRadius: 6, padding: "12px 16px",
            }}>
              <span style={{ fontSize: 22 }}>🏆</span>
              <div>
                <p style={{ fontSize: 11, color: "rgba(201,212,203,.85)", fontWeight: 600, letterSpacing: ".06em", margin: 0 }}>BEST HOTEL APP 2024</p>
                <p style={{ fontSize: 11, color: "rgba(201,212,203,.38)", marginTop: 2, marginBottom: 0 }}>Travel Awards, Global</p>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h5 style={{
                fontSize: 11, fontWeight: 700, letterSpacing: ".18em",
                textTransform: "uppercase", color: "rgba(201,212,203,.55)",
                marginBottom: 20, marginTop: 0,
              }}>
                {heading}
              </h5>
              {links.map(l => (
                <a key={l} href="#" className="ft-link">{l}</a>
              ))}
            </div>
          ))}
        </div>

        {/* ── Stats strip ── */}
        <div className="ft-stats">
          {[
            { num: "146+", label: "Hotels & Resorts" },
            { num: "28k+", label: "Happy Travelers"  },
            { num: "56",   label: "Countries Covered" },
            { num: "4.9★", label: "Average Rating"   },
          ].map((s, i) => (
            <div key={i} className="ft-stat-cell">
              <div className="marc" style={{ fontSize: "clamp(24px, 3vw, 40px)", color: "rgba(201,212,203,.82)", lineHeight: 1, marginBottom: 8 }}>
                {s.num}
              </div>
              <p style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(201,212,203,.35)", margin: 0 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-divider" />
      <div className="ft-bottom-wrap">
        <div className="ft-bottom">
          <p style={{ fontSize: 13, color: "rgba(201,212,203,.32)", margin: 0 }}>
            © {new Date().getFullYear()} THE FOREST VIEW. All rights reserved. Designed with ♥ for travellers.
          </p>
          <div className="ft-bottom-links">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map(l => (
              <a key={l} href="#" className="ft-bottom-link">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}