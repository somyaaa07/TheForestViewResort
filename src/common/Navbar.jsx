import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

// ── Logo ──────────────────────────────────────────────────────────────────
const Logo = () => (
  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm shrink-0">
    <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
      <polygon points="10,34 20,18 30,34" fill="none" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
      <polygon points="22,34 32,16 42,34" fill="none" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
      <polygon points="24,20 28,28 20,28" fill="white" opacity="0.9"/>
      <rect x="23" y="28" width="2" height="4" fill="white" opacity="0.9"/>
      <circle cx="36" cy="16" r="3.5" fill="none" stroke="white" strokeWidth="1.5"/>
      <path d="M8 36 Q24 30 40 36" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  </div>
);

// ── Nav Config ────────────────────────────────────────────────────────────
const navItems = [
  { label: "Home",          to: "/"              },
  { label: "Accommodation", to: "/accommodation" },
  { label: "Service",       to: "/services"       },
  // { label: "Blog",          to: "/blog"          },
  { label: "About",         to: "/about"         },
  { label: "Contact",       to: "/contact"       },
];

// ── Component ────────────────────────────────────────────────────────────
export default function HotelNavbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const textColor = scrolled ? "#1a3d2b" : "#ffffff";

  return (
    <>
      {/* ─────────────── Navbar ─────────────── */}
      <div className="fixed top-0 left-0 w-full z-[9999] pt-3 sm:pt-4 pb-2 flex justify-center pointer-events-none">
        <nav
          className="w-[95%] max-w-7xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between rounded-full pointer-events-auto transition-all duration-300"
          style={{
            background: scrolled ? "rgba(201,212,203,0.32)" : "rgba(201,212,203,0.18)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(201,212,203,0.25)",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(201,212,203,0.3)"
              : "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(201,212,203,0.25)",
          }}
        >
          {/* Logo */}
          <Link to="/" aria-label="Home">
            <Logo />
          </Link>

          {/* Desktop Links — shown on lg+ */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-1 px-3 xl:px-4 py-2 rounded-full transition-all duration-200 hover:bg-black/5 select-none"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  fontSize: "15px",
                  letterSpacing: "0.03em",
                  color: textColor,
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Book Now — hidden on mobile */}
            <Link
              to="/booking"
              className="hidden sm:flex items-center px-4 xl:px-6 py-2 xl:py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.92)",
                color: "#041106",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "0.12em",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,255,255,0.6)",
                textDecoration: "none",
              }}
            >
              Book Now
            </Link>

            {/* Hamburger — always visible */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-200 hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.2)" }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </div>

      {/* ─────────────── Backdrop ─────────────── */}
      <div
        onClick={() => setDrawerOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: drawerOpen ? "blur(3px)" : "none",
          WebkitBackdropFilter: drawerOpen ? "blur(3px)" : "none",
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
          transition: "opacity 0.4s ease, backdrop-filter 0.4s ease",
        }}
      />

      {/* ─────────────── Right Drawer ─────────────── */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "min(360px, 90vw)",
          zIndex: 10001,
          background: "linear-gradient(160deg, #0d2418 0%, #1a3d2b 55%, #0d2418 100%)",
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.45s cubic-bezier(0.77,0,0.175,1)",
          boxShadow: drawerOpen ? "-20px 0 60px rgba(0,0,0,0.4)" : "none",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 24px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0 }}>
              <svg viewBox="0 0 48 48" width="22" height="22" fill="none">
                <polygon points="10,34 20,18 30,34" fill="none" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
                <polygon points="22,34 32,16 42,34" fill="none" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
                <polygon points="24,20 28,28 20,28" fill="white" opacity="0.9"/>
                <rect x="23" y="28" width="2" height="4" fill="white" opacity="0.9"/>
                <circle cx="36" cy="16" r="3.5" fill="none" stroke="white" strokeWidth="1.5"/>
                <path d="M8 36 Q24 30 40 36" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: "700", color: "#fff", letterSpacing: "0.04em", margin: 0 }}>
                Grand Sereno
              </p>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>
                Luxury Hotel &amp; Resort
              </p>
            </div>
          </div>

          <button
            onClick={() => setDrawerOpen(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.65)", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Thin divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)", margin: "0 24px" }} />

        {/* Hotel Image */}
        <div style={{ margin: "20px 24px 0", borderRadius: "16px", overflow: "hidden", height: "160px", flexShrink: 0, position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&auto=format&fit=crop&q=80"
            alt="Grand Sereno Hotel"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,36,24,0.65) 0%, transparent 55%)", borderRadius: "16px" }} />
          <p style={{ position: "absolute", bottom: "12px", left: "14px", margin: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: "rgba(255,255,255,0.8)", letterSpacing: "0.06em" }}>
            Malibu, California
          </p>
        </div>

        
        {/* Book Now CTA */}
        <div style={{ padding: "16px 24px 0" }}>
          <Link
            to="/booking"
            onClick={() => setDrawerOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              background: "#041106",
              color: "#fff",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
          
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Reserve Your Stay
          </Link>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", margin: "20px 24px 0" }} />

        {/* Contact Info */}
        <div style={{ padding: "16px 24px 32px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>
            Contact Us
          </p>

          {[
            { icon: <PhoneIcon />, label: "Phone",   value: "+1 800 123 456",           href: "tel:+1800123456"              },
            { icon: <MailIcon />,  label: "Email",   value: "hello@grandsereno.com",    href: "mailto:hello@grandsereno.com" },
            { icon: <MapPinIcon />,label: "Address", value: "24 Serene Blvd, Malibu",  href: null                           },
          ].map(({ icon, label, value, href }) => {
            const inner = (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(200,169,110,0.14)", border: "1px solid rgba(200,169,110,0.28)", color: "#c8a96e", flexShrink: 0 }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.38)", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>{label}</p>
                  <p style={{ fontSize: "14px", color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontWeight: "600", margin: 0 }}>{value}</p>
                </div>
              </div>
            );
            return href
              ? <a key={label} href={href} style={{ textDecoration: "none" }}>{inner}</a>
              : <div key={label}>{inner}</div>;
          })}
        </div>
      </aside>
    </>
  );
}