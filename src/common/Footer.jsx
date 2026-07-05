import { Link } from "react-router-dom";

const LOGO_SRC = "/logo1.png";

const ArrowSVG = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path d="M4.1 11.9L11.9 4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.1 4.1H11.9V11.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const NAV_LINKS = [
  { label: "Accommodation",  to: "/accommodation" },
  { label: "Service",        to: "/services" },
  { label: "Safari Booking", to: "/safari-booking" },
  { label: "About",          to: "/about" },
  { label: "Gallery",        to: "/gallery" },
  { label: "Contact",        to: "/contact" },
];

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
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },

];

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(170deg, #041106 0%, #0a1f0d 55%, #041106 100%)", color: "#c9d4cb", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .ft-link {
          font-size: 15px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 600;
          color: rgba(201,212,203,.45);
          text-decoration: none;
          display: block;
          padding: 5px 0;
          letter-spacing: 0.02em;
          transition: color .25s, padding-left .25s;
        }
        .ft-link:hover { color: #c9d4cb; padding-left: 5px; }

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
          min-width: 0;
          height: 46px;
          background: rgba(201,212,203,.07);
          border: 1px solid rgba(201,212,203,.15);
          border-right: none;
          color: #c9d4cb;
          font-size: 14px;
          padding: 0 16px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          outline: none;
          transition: border-color .25s;
        }
        .ft-input::placeholder { color: rgba(201,212,203,.33); }
        .ft-input:focus { border-color: rgba(201,212,203,.42); }

        .ft-sub-btn {
          height: 46px;
          padding: 0 22px;
          background: #c9d4cb;
          border: none;
          color: #041106;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Cormorant Garamond', Georgia, serif;
          display: flex; align-items: center; gap: 8px;
          transition: background .25s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ft-sub-btn:hover { background: #dde6df; }

        .ft-main {
          max-width: 1380px;
          margin: 0 auto;
          padding: 64px 48px 52px;
        }
        .ft-cols {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 48px;
        }

        .ft-logo-circle {
          width: 52px; height: 52px;
          border-radius: 50%;
          border: 1px solid rgba(201,212,203,.25);
          background: rgba(201,212,203,.08);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .ft-logo-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 50%;
        }

        .ft-divider { height: 1px; background: rgba(201,212,203,.1); }
        .ft-bottom-wrap { max-width: 1380px; margin: 0 auto; padding: 22px 48px; }
        .ft-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
        .ft-bottom-links { display: flex; gap: 24px; flex-wrap: wrap; }
        .ft-bottom-link {
          font-size: 12px;
          font-family: 'Cormorant Garamond', serif;
          color: rgba(201,212,203,.35);
          text-decoration: none;
          transition: color .2s;
          white-space: nowrap;
        }
        .ft-bottom-link:hover { color: rgba(201,212,203,.75); }

        @media (max-width: 1023px) {
          .ft-cols { grid-template-columns: 1fr 1fr; gap: 36px; }
          .ft-brand-col { grid-column: 1 / -1; }
        }
        @media (max-width: 900px) {
          .ft-newsletter { padding: 36px 28px; }
          .ft-main { padding: 48px 28px 40px; }
          .ft-bottom-wrap { padding: 20px 28px; }
        }
        @media (max-width: 639px) {
          .ft-newsletter { padding: 30px 20px; gap: 20px; }
          .ft-newsletter-form { max-width: 100%; flex: 1 1 100%; }
          .ft-main { padding: 36px 20px 32px; }
          .ft-cols { grid-template-columns: 1fr; gap: 28px; }
          .ft-brand-col { grid-column: 1; }
          .ft-bottom-wrap { padding: 18px 20px; }
          .ft-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
          .ft-bottom-links { gap: 16px; }
        }
        @media (max-width: 379px) {
          .ft-sub-btn { padding: 0 14px; font-size: 10px; }
          .ft-sub-btn svg { display: none; }
        }
      `}</style>

      {/* ── Newsletter strip ── */}


      {/* ── Main columns ── */}
      <div className="ft-main">
        <div className="ft-cols">

          {/* Brand col */}
          <div className="ft-brand-col">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div className="ft-logo-circle">
                <img src={LOGO_SRC} alt="The Forest View Logo" className="ft-logo-img" />
              </div>
              <div>
                <p style={{ fontSize: "clamp(18px, 2vw, 22px)", color: "#c9d4cb", fontWeight: 700, letterSpacing: ".04em", margin: 0 }}>
                  THE FOREST VIEW
                </p>
                <p style={{ fontSize: 10, color: "rgba(201,212,203,.4)", letterSpacing: ".18em", textTransform: "uppercase", margin: 0, fontFamily: "system-ui, sans-serif" }}>
                  Resort &amp; Safari
                </p>
              </div>
            </div>

            <p style={{ fontSize: 15, lineHeight: 1.82, color: "rgba(201,212,203,.45)", marginBottom: 28, maxWidth: 300 }}>
              Experience the wild heart of India — from Bengal tigers in Ranthambore to the dense forests of Bandhavgarh and the serene Ken River valley of Panna.
            </p>

            <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
              {SOCIALS.map(s => (
                <a key={s.label} href="#" className="ft-social" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h5 style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(201,212,203,.4)", marginBottom: 20, marginTop: 0, fontFamily: "system-ui, sans-serif" }}>
              Quick Links
            </h5>
            {NAV_LINKS.map(l => (
              <Link key={l.label} to={l.to} className="ft-link">{l.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h5 style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(201,212,203,.4)", marginBottom: 20, marginTop: 0, fontFamily: "system-ui, sans-serif" }}>
              Contact Us
            </h5>
            {[
              { icon: "📞", value: "+91 7014764053" },
              { icon: "✉️", value: "theforestviewresortswm@gmail.com" },
              { icon: "📍", value: "Ranthambore Road, Sawai Madhopur" },
            ].map(({ icon, value }) => (
              <div key={value} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 13, marginTop: 3, flexShrink: 0 }}>{icon}</span>
                <span style={{ fontSize: 14, color: "rgba(201,212,203,.45)", lineHeight: 1.5 }}>{value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-divider" />
      <div className="ft-bottom-wrap">
        <div className="ft-bottom">
          <p style={{ fontSize: 13, color: "rgba(201,212,203,.32)", margin: 0 }}>
            © {new Date().getFullYear()} THE FOREST VIEW. All rights reserved. Designed with ♥ for wildlife lovers.
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