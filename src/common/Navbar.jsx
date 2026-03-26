import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9,18 15,12 9,6"/>
  </svg>
);

// ── Logo Config — apna image URL yahan daalo ──────────────────────────────
const LOGO_SRC = "/logo.jpg";

// ── Navbar Logo (circular, small) ─────────────────────────────────────────
const Logo = () => (
  <div className="logo-circle">
    <img
      src={LOGO_SRC}
      alt="Grand Sereno Logo"
      className="logo-img"
    />
  </div>
);

// ── Sidebar/Drawer Logo (slightly larger) ─────────────────────────────────
const SidebarLogo = ({ size = 80 }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      background: "rgba(201,212,203,0.08)",
      border: "1px solid rgba(201,212,203,0.2)",
      flexShrink: 0,
      overflow: "hidden",
    }}
  >
    <img
      src={LOGO_SRC}
      alt="Grand Sereno Logo"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        borderRadius: "50%",
      }}
    />
  </div>
);

// ── Nav Config ────────────────────────────────────────────────────────────
const navItems = [
  { label: "Home",           to: "/"               },
  { label: "Accommodation",  to: "/accommodation"  },
  { label: "Service",        to: "/services"       },
  { label: "Safari Booking", to: "/safari-booking" },
  { label: "About",          to: "/about"          },
  { label: "Contact",        to: "/contact"        },
];

// ── Booking Popup ────────────────────────────────────────────────────────
function BookingPopup({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState("room");
  const [form, setForm] = useState({
    checkIn: "", checkOut: "", guests: "2", rooms: "1",
    firstName: "", lastName: "", email: "", phone: "",
    safariType: "game-drive", specialRequests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) { setStep(1); setSubmitted(false); }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid rgba(201,212,203,0.15)",
    background: "rgba(201,212,203,0.06)",
    color: "#c9d4cb",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    color: "rgba(201,212,203,0.45)",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: "6px",
    fontFamily: "system-ui, sans-serif",
  };

  const handleSubmit = () => { setSubmitted(true); };

  return (
    <>
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        style={{
          position: "fixed", inset: 0, zIndex: 20000,
          background: "rgba(0,0,0,0.72)",
          backdropFilter: isOpen ? "blur(8px)" : "none",
          WebkitBackdropFilter: isOpen ? "blur(8px)" : "none",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.35s ease, backdrop-filter 0.35s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "100%", maxWidth: "540px",
            background: "linear-gradient(155deg, #041106 0%, #0a1f0d 60%, #041106 100%)",
            borderRadius: "24px",
            border: "1px solid rgba(201,212,203,0.18)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,212,203,0.04)",
            transform: isOpen ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
            opacity: isOpen ? 1 : 0,
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease",
            maxHeight: "92vh",
            overflowY: "auto",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {submitted ? (
            <div style={{ padding: "60px 44px", textAlign: "center" }}>
              <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "rgba(201,212,203,0.1)", border: "1.5px solid rgba(201,212,203,0.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c9d4cb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "#c9d4cb", fontWeight: "700", margin: "0 0 10px" }}>Reservation Confirmed</p>
              <p style={{ fontSize: "16px", color: "rgba(201,212,203,0.5)", lineHeight: "1.6", margin: "0 0 36px" }}>
                Thank you, {form.firstName}! We've received your request and will send a confirmation to <span style={{ color: "#c9d4cb" }}>{form.email}</span>.
              </p>
              <button
                onClick={onClose}
                style={{ padding: "14px 40px", borderRadius: "50px", background: "rgba(201,212,203,0.12)", border: "1.5px solid rgba(201,212,203,0.35)", color: "#c9d4cb", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ padding: "30px 30px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", fontWeight: "700", color: "#c9d4cb", margin: "0 0 5px", letterSpacing: "0.02em" }}>
                    {step === 1 ? "Book Your Stay" : "Your Details"}
                  </p>
                  <p style={{ fontSize: "13px", color: "rgba(201,212,203,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
                  The Forest View Resort
                  </p>
                </div>
                <button
                  onClick={onClose}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", border: "1px solid rgba(201,212,203,0.15)", background: "transparent", color: "rgba(201,212,203,0.55)", cursor: "pointer", flexShrink: 0, marginTop: "2px" }}
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Step Indicator */}
              <div style={{ padding: "22px 30px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                {[1, 2].map((s) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px", flex: s < 2 ? 1 : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "30px", height: "30px", borderRadius: "50%",
                        background: step >= s ? "rgba(201,212,203,0.15)" : "rgba(201,212,203,0.05)",
                        border: `1.5px solid ${step >= s ? "rgba(201,212,203,0.5)" : "rgba(201,212,203,0.12)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "13px", color: step >= s ? "#c9d4cb" : "rgba(201,212,203,0.3)",
                        fontFamily: "system-ui, sans-serif", fontWeight: "600",
                        transition: "all 0.3s",
                      }}>{s}</div>
                      <span style={{ fontSize: "12px", color: step >= s ? "rgba(201,212,203,0.7)" : "rgba(201,212,203,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>
                        {s === 1 ? "Details" : "Guest Info"}
                      </span>
                    </div>
                    {s < 2 && <div style={{ flex: 1, height: "1px", background: step > 1 ? "rgba(201,212,203,0.35)" : "rgba(201,212,203,0.1)", transition: "background 0.3s" }} />}
                  </div>
                ))}
              </div>

              <div style={{ padding: "22px 30px 30px" }}>
                {step === 1 ? (
                  <>
                    {/* Booking Type Tabs */}
                    <div style={{ display: "flex", gap: "8px", marginBottom: "24px", background: "rgba(201,212,203,0.04)", borderRadius: "12px", padding: "4px" }}>
                      {[{ id: "room", label: "Room" }, { id: "safari", label: "Safari" }, { id: "package", label: "Package" }].map(({ id, label }) => (
                        <button key={id} onClick={() => setBookingType(id)}
                          style={{
                            flex: 1, padding: "11px 8px", borderRadius: "9px", cursor: "pointer",
                            background: bookingType === id ? "rgba(201,212,203,0.14)" : "transparent",
                            color: bookingType === id ? "#c9d4cb" : "rgba(201,212,203,0.4)",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "16px", fontWeight: bookingType === id ? "700" : "600",
                            letterSpacing: "0.05em",
                            border: bookingType === id ? "1px solid rgba(201,212,203,0.3)" : "1px solid transparent",
                            transition: "all 0.25s",
                          }}
                        >{label}</button>
                      ))}
                    </div>

                    {/* Date Row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <label style={labelStyle}>Check In</label>
                        <input type="date" value={form.checkIn} onChange={e => setForm({ ...form, checkIn: e.target.value })} style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = "rgba(201,212,203,0.45)"; e.target.style.background = "rgba(201,212,203,0.09)"; }}
                          onBlur={e => { e.target.style.borderColor = "rgba(201,212,203,0.15)"; e.target.style.background = "rgba(201,212,203,0.06)"; }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Check Out</label>
                        <input type="date" value={form.checkOut} onChange={e => setForm({ ...form, checkOut: e.target.value })} style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = "rgba(201,212,203,0.45)"; e.target.style.background = "rgba(201,212,203,0.09)"; }}
                          onBlur={e => { e.target.style.borderColor = "rgba(201,212,203,0.15)"; e.target.style.background = "rgba(201,212,203,0.06)"; }}
                        />
                      </div>
                    </div>

                    {/* Guests & Rooms */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <label style={labelStyle}>Guests</label>
                        <select value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                          {[1,2,3,4,5,6].map(n => <option key={n} value={n} style={{ background: "#041106" }}>{n} Guest{n > 1 ? "s" : ""}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>{bookingType === "safari" ? "Safari Type" : "Rooms"}</label>
                        {bookingType === "safari" ? (
                          <select value={form.safariType} onChange={e => setForm({ ...form, safariType: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                            {["Game Drive", "Bush Walk", "Night Safari", "Full Day"].map(t => <option key={t} value={t.toLowerCase().replace(" ", "-")} style={{ background: "#041106" }}>{t}</option>)}
                          </select>
                        ) : (
                          <select value={form.rooms} onChange={e => setForm({ ...form, rooms: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                            {[1,2,3,4].map(n => <option key={n} value={n} style={{ background: "#041106" }}>{n} Room{n > 1 ? "s" : ""}</option>)}
                          </select>
                        )}
                      </div>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <label style={labelStyle}>Special Requests</label>
                      <textarea value={form.specialRequests} onChange={e => setForm({ ...form, specialRequests: e.target.value })}
                        placeholder="Any special requirements..." rows={3}
                        style={{ ...inputStyle, resize: "none", lineHeight: "1.5" }}
                        onFocus={e => { e.target.style.borderColor = "rgba(201,212,203,0.45)"; e.target.style.background = "rgba(201,212,203,0.09)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(201,212,203,0.15)"; e.target.style.background = "rgba(201,212,203,0.06)"; }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <label style={labelStyle}>First Name</label>
                        <input type="text" placeholder="James" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = "rgba(201,212,203,0.45)"; e.target.style.background = "rgba(201,212,203,0.09)"; }}
                          onBlur={e => { e.target.style.borderColor = "rgba(201,212,203,0.15)"; e.target.style.background = "rgba(201,212,203,0.06)"; }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Last Name</label>
                        <input type="text" placeholder="Montgomery" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = "rgba(201,212,203,0.45)"; e.target.style.background = "rgba(201,212,203,0.09)"; }}
                          onBlur={e => { e.target.style.borderColor = "rgba(201,212,203,0.15)"; e.target.style.background = "rgba(201,212,203,0.06)"; }}
                        />
                      </div>
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={labelStyle}>Email Address</label>
                      <input type="email" placeholder="james@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = "rgba(201,212,203,0.45)"; e.target.style.background = "rgba(201,212,203,0.09)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(201,212,203,0.15)"; e.target.style.background = "rgba(201,212,203,0.06)"; }}
                      />
                    </div>
                    <div style={{ marginBottom: "24px" }}>
                      <label style={labelStyle}>Phone Number</label>
                      <input type="tel" placeholder="+1 800 000 0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = "rgba(201,212,203,0.45)"; e.target.style.background = "rgba(201,212,203,0.09)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(201,212,203,0.15)"; e.target.style.background = "rgba(201,212,203,0.06)"; }}
                      />
                    </div>

                    {/* Summary Card */}
                    <div style={{ padding: "18px", borderRadius: "14px", background: "rgba(201,212,203,0.06)", border: "1px solid rgba(201,212,203,0.15)", marginBottom: "24px" }}>
                      <p style={{ fontSize: "11px", color: "rgba(201,212,203,0.55)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 12px", fontFamily: "system-ui, sans-serif" }}>Booking Summary</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                        {[
                          { label: "Type", value: bookingType.charAt(0).toUpperCase() + bookingType.slice(1) },
                          { label: "Check In", value: form.checkIn || "—" },
                          { label: "Check Out", value: form.checkOut || "—" },
                          { label: "Guests", value: `${form.guests} Guest${form.guests > 1 ? "s" : ""}` },
                        ].map(({ label, value }) => (
                          <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "13px", color: "rgba(201,212,203,0.4)", fontFamily: "system-ui, sans-serif" }}>{label}</span>
                            <span style={{ fontSize: "15px", color: "#c9d4cb", fontFamily: "'Cormorant Garamond', serif", fontWeight: "600" }}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* CTA Buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  {step === 2 && (
                    <button onClick={() => setStep(1)}
                      style={{ flex: "0 0 auto", padding: "15px 22px", borderRadius: "12px", border: "1px solid rgba(201,212,203,0.18)", background: "transparent", color: "rgba(201,212,203,0.6)", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.05em" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,212,203,0.06)"; e.currentTarget.style.color = "#c9d4cb"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(201,212,203,0.6)"; }}
                    >← Back</button>
                  )}
                  <button onClick={() => step === 1 ? setStep(2) : handleSubmit()}
                    style={{
                      flex: 1, padding: "15px", borderRadius: "12px",
                      background: "#c9d4cb",
                      border: "none", color: "#041106",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "16px", fontWeight: "700",
                      letterSpacing: "0.14em", textTransform: "uppercase",
                      cursor: "pointer",
                      boxShadow: "0 8px 24px rgba(201,212,203,0.2)",
                      transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = "#dde6df"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(201,212,203,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "#c9d4cb"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(201,212,203,0.2)"; }}
                  >
                    {step === 1 ? "Continue →" : "Confirm Reservation"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ── Main Navbar Component ─────────────────────────────────────────────────
export default function HotelNavbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [drawerOpen,    setDrawerOpen]    = useState(false);
  const [bookingOpen,   setBookingOpen]   = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (drawerOpen || mobileNavOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen, mobileNavOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');

        .logo-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 2px solid rgba(201,212,203,0.35);
          background: rgba(201,212,203,0.08);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          flex-shrink: 0;
          overflow: hidden;
          width: 40px;
          height: 40px;
          transition: width 0.3s, height 0.3s;
        }

        .logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 50%;
        }

        @media (min-width: 640px) {
          .logo-circle { width: 46px; height: 46px; }
        }
        @media (min-width: 1024px) {
          .logo-circle { width: 50px; height: 50px; }
        }
        @media (min-width: 1280px) {
          .logo-circle { width: 52px; height: 52px; }
        }

        .nav-link-item {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 16px;
          letter-spacing: 0.04em;
          color: #c9d4cb;
          font-weight: 700;
          text-decoration: none;
          padding: 9px 15px;
          border-radius: 50px;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
          display: block;
        }
        .nav-link-item:hover {
          background: rgba(201,212,203,0.1);
          color: #fff;
        }

        .mobile-sidebar-backdrop {
          position: fixed;
          inset: 0;
          z-index: 19000;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          transition: opacity 0.35s ease;
        }
        .mobile-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: min(320px, 88vw);
          z-index: 19001;
          background: linear-gradient(170deg, #041106 0%, #091a0b 55%, #041106 100%);
          border-right: 1px solid rgba(201,212,203,0.12);
          box-shadow: 8px 0 40px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          transition: transform 0.42s cubic-bezier(0.77,0,0.175,1);
        }

        .sidebar-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 22px;
          border-radius: 12px;
          text-decoration: none;
          color: rgba(201,212,203,0.82);
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: 0.04em;
          transition: background 0.2s, color 0.2s;
          margin: 1px 0;
        }
        .sidebar-nav-link:hover {
          background: rgba(201,212,203,0.07);
          color: #fff;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .book-btn-text { font-size: 13px; }
        @media (min-width: 1024px) { .book-btn-text { font-size: 14px; } }
        @media (min-width: 1280px) { .book-btn-text { font-size: 15px; } }

        .drawer-nav-link {
          display: flex;
          align-items: center;
          padding: 13px 18px;
          border-radius: 12px;
          text-decoration: none;
          color: rgba(201,212,203,0.82);
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.04em;
          transition: background 0.2s, color 0.2s;
        }
        .drawer-nav-link:hover {
          background: rgba(201,212,203,0.07);
          color: #c9d4cb;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,212,203,0.2); border-radius: 4px; }
      `}</style>

      {/* ─────────────── Navbar ─────────────── */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, width: "100%",
          zIndex: 9999,
          paddingTop: "clamp(8px, 1.5vw, 16px)",
          paddingBottom: "8px",
          display: "flex", justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <nav
          style={{
            width: "min(96%, 1380px)",
            padding: "clamp(8px, 1.2vw, 14px) clamp(10px, 2vw, 20px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "clamp(8px, 1.5vw, 16px)",
            borderRadius: "9999px",
            pointerEvents: "auto",
            position: "relative",
            background: scrolled ? "rgba(4,17,6,0.88)" : "rgba(4,17,6,0.55)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            border: "1px solid rgba(201,212,203,0.18)",
            boxShadow: scrolled
              ? "0 14px 44px rgba(0,0,0,0.45), inset 0 1px 0 rgba(201,212,203,0.1)"
              : "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(201,212,203,0.07)",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        >
          {/* ── Logo ── */}
          <Link to="/" aria-label="Home" style={{ flexShrink: 0 }}>
            <Logo />
          </Link>

          {/* ── Desktop nav links (lg+) ── */}
          <div
            className="hidden lg:flex"
            style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: "2px", overflow: "hidden" }}
          >
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} className="nav-link-item">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1vw, 12px)", flexShrink: 0 }}>

            {/* ── Mobile/Tablet menu button ── */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                style={{
                  display: "flex", alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  background: "rgba(201,212,203,0.08)",
                  border: "1px solid rgba(201,212,203,0.2)",
                  color: "#c9d4cb",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "15px", fontWeight: "700",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  whiteSpace: "nowrap",
                }}
                aria-label="Open navigation"
              >
                <MenuIcon />
                <span className="sm:inline" style={{ display: "none" }}>Menu</span>
              </button>
            </div>

            {/* ── Book Now button — desktop ── */}
            <button
              onClick={() => setBookingOpen(true)}
              className="hidden lg:flex"
              style={{
                alignItems: "center",
                padding: "10px 26px",
                borderRadius: "9999px",
                background: "#c9d4cb",
                border: "none",
                color: "#041106",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: "0.12em",
                fontWeight: "700",
                textTransform: "uppercase",
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(201,212,203,0.2)",
                transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.background = "#dde6df"; e.currentTarget.style.boxShadow = "0 8px 26px rgba(201,212,203,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "#c9d4cb"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(201,212,203,0.2)"; }}
            >
              <span className="book-btn-text">Book Now</span>
            </button>
          </div>
        </nav>
      </div>

      {/* ─────────────── Mobile Sidebar Backdrop ─────────────── */}
      {mobileNavOpen && (
        <div
          className="mobile-sidebar-backdrop"
          onClick={() => setMobileNavOpen(false)}
          style={{ opacity: mobileNavOpen ? 1 : 0, animation: "fadeIn 0.3s ease forwards" }}
        />
      )}

      {/* ─────────────── Mobile Left Sidebar ─────────────── */}
      <aside
        className="mobile-sidebar"
        style={{
          transform: mobileNavOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Sidebar Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 20px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <SidebarLogo size={40} />
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: "700", color: "#c9d4cb", letterSpacing: "0.04em", margin: 0 }}>Grand Sereno</p>
              <p style={{ fontSize: "10px", color: "rgba(201,212,203,0.4)", letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>Luxury Hotel</p>
            </div>
          </div>
          <button
            onClick={() => setMobileNavOpen(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", background: "transparent", border: "1px solid rgba(201,212,203,0.15)", color: "rgba(201,212,203,0.55)", cursor: "pointer", flexShrink: 0 }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(201,212,203,0.12), transparent)", margin: "0 20px 10px" }} />

        {/* Hotel Image */}
        <div style={{ margin: "4px 20px 16px", borderRadius: "16px", overflow: "hidden", height: "140px", flexShrink: 0, position: "relative" }}>
          <img
            src="/logo.jpg"
            alt="Grand Sereno Hotel"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: "0 12px" }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="sidebar-nav-link"
              onClick={() => setMobileNavOpen(false)}
            >
              <span>{item.label}</span>
              <span style={{ color: "rgba(201,212,203,0.3)" }}><ChevronRight /></span>
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(201,212,203,0.12), transparent)", margin: "10px 20px" }} />

        {/* Book Now CTA */}
        <div style={{ padding: "0 20px" }}>
          <button
            onClick={() => { setMobileNavOpen(false); setBookingOpen(true); }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "100%", padding: "16px", borderRadius: "14px",
              background: "#c9d4cb",
              border: "none", color: "#041106",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "16px", fontWeight: "700",
              letterSpacing: "0.18em", textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(201,212,203,0.15)",
            }}
          >
            Reserve Your Stay
          </button>
        </div>

        {/* Contact Info */}
        <div style={{ padding: "18px 20px 32px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <p style={{ fontSize: "10px", color: "rgba(201,212,203,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Contact</p>
          {[
            { icon: <PhoneIcon />, value: "+1 800 123 456",         to: "tel:+1800123456",              isExternal: true },
            { icon: <MailIcon />,  value: "hello@grandsereno.com",  to: "mailto:hello@grandsereno.com", isExternal: true },
            { icon: <MapPinIcon />,value: "24 Serene Blvd, Malibu", to: null,                           isExternal: false },
          ].map(({ icon, value, to, isExternal }, i) => {
            const inner = (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(201,212,203,0.08)", border: "1px solid rgba(201,212,203,0.18)", color: "#c9d4cb", flexShrink: 0 }}>{icon}</div>
                <p style={{ fontSize: "14px", color: "rgba(201,212,203,0.7)", fontFamily: "'Cormorant Garamond', serif", fontWeight: "600", margin: 0 }}>{value}</p>
              </div>
            );
            // tel: and mailto: are external protocols — use <a> for these, not <Link>
            return to
              ? <a key={i} href={to} style={{ textDecoration: "none" }}>{inner}</a>
              : <div key={i}>{inner}</div>;
          })}
        </div>
      </aside>

      {/* ─────────────── Right Drawer Backdrop ─────────────── */}
      <div
        onClick={() => setDrawerOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 10000,
          background: "rgba(0,0,0,0.5)",
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
          position: "fixed", top: 0, right: 0, height: "100%",
          width: "min(380px, 92vw)", zIndex: 10001,
          background: "linear-gradient(160deg, #041106 0%, #0a1f0d 55%, #041106 100%)",
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.45s cubic-bezier(0.77,0,0.175,1)",
          boxShadow: drawerOpen ? "-20px 0 60px rgba(0,0,0,0.4)" : "none",
          overflowY: "auto", display: "flex", flexDirection: "column",
          borderLeft: "1px solid rgba(201,212,203,0.12)",
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "26px 26px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <SidebarLogo size={44} />
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: "700", color: "#c9d4cb", letterSpacing: "0.04em", margin: 0 }}>Grand Sereno</p>
              <p style={{ fontSize: "11px", color: "rgba(201,212,203,0.4)", letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>Luxury Hotel &amp; Resort</p>
            </div>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "transparent", border: "1px solid rgba(201,212,203,0.15)", color: "rgba(201,212,203,0.65)", cursor: "pointer", flexShrink: 0 }}
          >
            <CloseIcon />
          </button>
        </div>

        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,212,203,0.15), transparent)", margin: "0 26px" }} />

        {/* Hotel Image */}
        <div style={{ margin: "22px 26px 0", borderRadius: "18px", overflow: "hidden", height: "170px", flexShrink: 0, position: "relative" }}>
          <img
            src="/logo.jpg"
            alt="The Forest view resort"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Book Now CTA */}
        <div style={{ padding: "18px 26px 0" }}>
          <button
            onClick={() => { setDrawerOpen(false); setBookingOpen(true); }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "100%", padding: "16px", borderRadius: "14px",
              background: "#c9d4cb",
              border: "none", color: "#041106",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "16px", fontWeight: "700",
              letterSpacing: "0.18em", textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(201,212,203,0.15)",
            }}
          >
            Reserve Your Stay
          </button>
        </div>

        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,212,203,0.12), transparent)", margin: "22px 26px 0" }} />

        {/* Contact Info */}
        <div style={{ padding: "18px 26px 36px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ fontSize: "11px", color: "rgba(201,212,203,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Contact Us</p>
          {[
            { icon: <PhoneIcon />, label: "Phone",   value: "+1 800 123 456",         to: "tel:+1800123456",              isExternal: true },
            { icon: <MailIcon />,  label: "Email",   value: "hello@grandsereno.com",  to: "mailto:hello@grandsereno.com", isExternal: true },
            { icon: <MapPinIcon />,label: "Address", value: "24 Serene Blvd, Malibu", to: null,                           isExternal: false },
          ].map(({ icon, label, value, to, isExternal }) => {
            const inner = (
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "rgba(201,212,203,0.08)", border: "1px solid rgba(201,212,203,0.2)", color: "#c9d4cb", flexShrink: 0 }}>{icon}</div>
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(201,212,203,0.38)", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>{label}</p>
                  <p style={{ fontSize: "16px", color: "#c9d4cb", fontFamily: "'Cormorant Garamond', serif", fontWeight: "600", margin: 0 }}>{value}</p>
                </div>
              </div>
            );
            // tel: and mailto: are external protocols — use <a> for these, not <Link>
            return to
              ? <a key={label} href={to} style={{ textDecoration: "none" }}>{inner}</a>
              : <div key={label}>{inner}</div>;
          })}
        </div>
      </aside>

      {/* ─────────────── Booking Popup ─────────────── */}
      <BookingPopup isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}