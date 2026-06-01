import { useState, useMemo, useEffect } from "react";
import { rooms } from "./data";
import RoomDetail from "./RoomDetail";
import { Link } from "react-router-dom";
const DARK = "#041106";
const BG = "#c9d4cb";
const ROOMS_PER_PAGE = 6;

const BedIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M2 7a2 2 0 012-2h16a2 2 0 012 2v3H2V7zm0 5h20v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5zm6-3a1 1 0 100 2 1 1 0 000-2z" />
  </svg>
);
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);
const ArrowUpRight = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 inline" fill={filled ? DARK : "none"} stroke={DARK} strokeWidth="1.2">
    <path d="M10 1l2.39 4.84L18 6.74l-4 3.9.94 5.5L10 13.77l-4.94 2.37.94-5.5L2 6.74l5.61-.9L10 1z" />
  </svg>
);
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

const FACILITY_HIGHLIGHTS = [
  { icon: "🏊", label: "Outdoor Pool", note: "Free · Open all year" },
  { icon: "🅿️", label: "Free Parking", note: "On-site parking" },
  { icon: "📶", label: "Free WiFi", note: "Public areas" },
  { icon: "🍽️", label: "Restaurant", note: "Breakfast in room" },
  { icon: "🔒", label: "24hr Security", note: "CCTV & alarms" },
  { icon: "🛎️", label: "Concierge", note: "24-hr front desk" },
  { icon: "❄️", label: "Air Conditioning", note: "All rooms" },
  { icon: "🚗", label: "Airport Shuttle", note: "Additional charge" },
];

export default function App() {
  const [activePage, setActivePage] = useState("listing");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [priceRange, setPriceRange] = useState(4000);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [ratings, setRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [activeSearch, setActiveSearch] = useState({ checkIn: "", checkOut: "", adults: "1", children: "0" });
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleRating = (r) => {
    setRatings(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
    setCurrentPage(1);
  };

  const handlePriceChange = (val) => { setPriceRange(val); setCurrentPage(1); };

  const handleSearch = () => {
    setActiveSearch({ checkIn, checkOut, adults, children });
    setSearchTriggered(true);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setRatings([]); setPriceRange(4000); setCheckIn(""); setCheckOut("");
    setAdults("1"); setChildren("0"); setSearchTriggered(false);
    setActiveSearch({ checkIn: "", checkOut: "", adults: "1", children: "0" });
    setCurrentPage(1);
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      if (room.price > priceRange) return false;
      if (ratings.length > 0) {
        const rounded = Math.round(room.rating?.overall || 0);
        if (!ratings.includes(rounded)) return false;
      }
      if (searchTriggered) {
        const totalGuests = parseInt(activeSearch.adults) + parseInt(activeSearch.children);
        if (room.maxGuests && totalGuests > room.maxGuests) return false;
      }
      return true;
    });
  }, [priceRange, ratings, searchTriggered, activeSearch]);

  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE);
  const paginatedRooms = filteredRooms.slice((currentPage - 1) * ROOMS_PER_PAGE, currentPage * ROOMS_PER_PAGE);

  const handlePageChange = (p) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleExplore = (roomId) => {
    setSelectedRoomId(roomId); setActivePage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => { setActivePage("listing"); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const getPaginationPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 4) pages.push(1, 2, 3, 4, 5, "...", totalPages);
    else if (currentPage >= totalPages - 3) pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    else pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    return pages;
  };

  if (activePage === "detail") {
    return <RoomDetail roomId={selectedRoomId} onBack={handleBack} onExplore={handleExplore} />;
  }

  const activeFilterCount = (priceRange < 4000 ? 1 : 0) + ratings.length + (searchTriggered ? 1 : 0);
  const startResult = filteredRooms.length === 0 ? 0 : (currentPage - 1) * ROOMS_PER_PAGE + 1;
  const endResult = Math.min(currentPage * ROOMS_PER_PAGE, filteredRooms.length);

  return (
    <div style={{ backgroundColor: BG, color: DARK, fontFamily: "'Jost', sans-serif" }} className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Marcellus&display=swap');

        .nav-link { position:relative; }
        .nav-link::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:2px; background:#041106; transition:width 0.3s; }
        .nav-link:hover::after { width:100%; }

        .room-card { transition:transform 0.3s, box-shadow 0.3s; }
        .room-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(4,17,6,0.14); }
        .room-img { transition:transform 0.6s ease; }
        .room-card:hover .room-img { transform:scale(1.07); }

        .btn-primary { background:#041106; color:#c9d4cb; transition:background 0.2s,transform 0.15s; }
        .btn-primary:hover { background:#1a3a1e; transform:translateY(-1px); }
        .btn-outline { border:1.5px solid #041106; color:#041106; transition:all 0.2s; }
        .btn-outline:hover { background:#041106; color:#c9d4cb; }
        .explore-btn { display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:600; letter-spacing:0.08em; color:#041106; border-bottom:1.5px solid #041106; padding-bottom:2px; transition:opacity 0.2s,gap 0.2s; cursor:pointer; background:none; border-top:none; border-left:none; border-right:none; }
        .explore-btn:hover { opacity:0.55; gap:10px; }

        .search-input { width:100%; background:#fff; border:1.5px solid rgba(4,17,6,0.12); padding:11px 14px; font-size:14px; color:#041106; outline:none; transition:border-color 0.2s; font-family:'Jost',sans-serif; }
        .search-input:focus { border-color:#041106; }

        .filter-panel { background:rgba(255,255,255,0.72); border:1px solid rgba(4,17,6,0.1); backdrop-filter:blur(8px); }
        .price-slider { -webkit-appearance:none; appearance:none; width:100%; height:4px; border-radius:2px; outline:none; cursor:pointer; }
        .price-slider::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#041106; cursor:pointer; border:2px solid #c9d4cb; box-shadow:0 0 0 2px #041106; }
        .checkbox-custom { appearance:none; -webkit-appearance:none; width:16px; height:16px; border:1.5px solid rgba(4,17,6,0.4); cursor:pointer; flex-shrink:0; transition:background 0.2s; }
        .checkbox-custom:checked { background:#041106; border-color:#041106; background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e"); background-size:100% 100%; }

        .facility-pill { display:flex; align-items:center; gap:10px; padding:12px 14px; background:rgba(255,255,255,0.55); border:1px solid rgba(4,17,6,0.09); transition:box-shadow 0.2s,transform 0.2s; }
        .facility-pill:hover { box-shadow:0 6px 16px rgba(4,17,6,0.1); transform:translateY(-2px); }

        .breadcrumb-area { background:linear-gradient(rgba(4,17,6,0.68),rgba(4,17,6,0.68)), url('/16.jpeg') center/cover no-repeat; }

        .page-btn { display:inline-flex; align-items:center; justify-content:center; min-width:36px; height:36px; font-size:14px; border:1.5px solid rgba(4,17,6,0.2); transition:all 0.2s; cursor:pointer; background:transparent; padding:0 6px; }
        .page-btn:hover, .page-btn.active { background:#041106; color:#c9d4cb !important; border-color:#041106; }
        .page-btn:disabled { opacity:0.35; cursor:not-allowed; pointer-events:none; }

        .filter-badge { display:inline-flex; align-items:center; gap:4px; background:rgba(4,17,6,0.08); border:1px solid rgba(4,17,6,0.15); padding:3px 10px; font-size:11px; font-weight:600; color:#041106; border-radius:2px; }

        .tag-strip { display:flex; gap:8px; flex-wrap:wrap; }
        .tag-chip { padding:5px 14px; font-size:11px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; border:1px solid rgba(4,17,6,0.2); cursor:pointer; transition:all 0.2s; }
        .tag-chip:hover, .tag-chip.on { background:#041106; color:#c9d4cb; border-color:#041106; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .room-card { animation:fadeUp 0.35s ease forwards; opacity:0; }
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .filter-slide { animation:slideDown 0.25s ease forwards; }

        @media (max-width: 640px) {
          .rooms-grid { grid-template-columns:1fr !important; }
          .search-bar-grid { grid-template-columns:1fr 1fr !important; }
          .facility-grid { grid-template-columns:1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .search-bar-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* BREADCRUMB HERO */}
      <div className="breadcrumb-area" style={{ padding: "clamp(60px,10vw,120px) clamp(16px,5vw,48px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,212,203,0.7)", marginBottom: 14 }}>
            THE FOREST VIEW RESORT · RANTHAMBORE
          </p>
          <h1 style={{ fontFamily: "Marcellus,serif", color: "#fff", fontSize: "clamp(26px,5vw,54px)", fontWeight: 400, marginBottom: 14, lineHeight: 1.15 }}>
            Luxury Ranthambore Stays &<br />
            <span style={{ color: "rgba(201,212,203,0.8)" }}>Premium Accommodation</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(13px,1.8vw,16px)", maxWidth: 560, lineHeight: 1.7, marginBottom: 20 }}>
            Discover premium stays at The Forest View Resort — deluxe rooms, luxury tents, forest views, modern amenities, and peaceful nature surroundings near Ranthambore National Park.
          </p>
          <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Home</a>
            <span>/</span>
            <span style={{ color: "#fff" }}>Accommodation</span>
          </nav>
        </div>
      </div>

      {/* FACILITY HIGHLIGHTS STRIP */}
      <div style={{ background: DARK, overflowX: "auto" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>
          <div style={{ display: "flex", gap: 0 }}>
            {FACILITY_HIGHLIGHTS.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px", borderRight: "1px solid rgba(201,212,203,0.1)", whiteSpace: "nowrap", flexShrink: 0 }}>
                <span style={{ fontSize: 18 }}>{f.icon}</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: BG, margin: 0, letterSpacing: ".04em" }}>{f.label}</p>
                  <p style={{ fontSize: 10, color: "rgba(201,212,203,0.5)", margin: 0 }}>{f.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH + FILTER BAR */}
      <div style={{ background: "rgba(255,255,255,0.45)", borderBottom: "1px solid rgba(4,17,6,0.08)", position: "sticky", top: 0, zIndex: 40, backdropFilter: "blur(12px)" }}>
       
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(24px,5vw,48px) clamp(16px,4vw,48px)" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: "Marcellus,serif", fontSize: "clamp(20px,3vw,28px)", fontWeight: 400, color: DARK, margin: 0 }}>
              {searchTriggered ? "Available Rooms" : "All Accommodations"}
            </h2>
            <p style={{ fontSize: 13, color: "rgba(4,17,6,0.5)", marginTop: 4 }}>
              {filteredRooms.length === 0
                ? "No rooms match your criteria"
                : <>Showing <strong style={{ color: DARK }}>{startResult}–{endResult}</strong> of <strong style={{ color: DARK }}>{filteredRooms.length}</strong> results</>
              }
            </p>
          </div>
          <div className="tag-strip">
            <span className="tag-chip on">All Rooms</span>
            <span className="tag-chip">Deluxe</span>
            <span className="tag-chip">Suites</span>
            <span className="tag-chip">Jungle View</span>
          </div>
        </div>

        {filteredRooms.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "rgba(255,255,255,0.5)", border: "1px solid rgba(4,17,6,0.08)" }}>
            <p style={{ fontFamily: "Marcellus,serif", fontSize: 26, color: DARK, marginBottom: 10 }}>No Rooms Found</p>
            <p style={{ fontSize: 14, color: "rgba(4,17,6,0.5)", marginBottom: 24 }}>Try adjusting your filters to see available rooms.</p>
            <button className="btn-primary" style={{ padding: "13px 32px", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", border: "none", cursor: "pointer" }} onClick={handleClear}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "clamp(16px,3vw,28px)" }} className="rooms-grid">
              {paginatedRooms.map((room, idx) => (
                <div key={room.id} className="room-card" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(4,17,6,0.07)", overflow: "hidden", animationDelay: `${idx * 0.06}s` }}>

                  <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                    <img
                      src={room.img} alt={room.name}
                      className="room-img"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={e => { e.target.src = `https://placehold.co/830x600/c9d4cb/041106?text=${encodeURIComponent(room.name)}`; }}
                    />
                    <button
                      onClick={() => toggleWishlist(room.id)}
                      style={{ position: "absolute", top: 12, right: 12, width: 36, height: 36, background: "rgba(201,212,203,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill={wishlist.includes(room.id) ? DARK : "none"} stroke={DARK} strokeWidth="1.5">
                        <path d="M12 21C12 21 3 14 3 8.5A5.5 5.5 0 0112 5a5.5 5.5 0 019 3.5C21 14 12 21 12 21z" />
                      </svg>
                    </button>
                    {/* Price badge — already in ₹, no conversion needed */}
                    <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(4,17,6,0.88)", padding: "7px 14px" }}>
                      <span style={{ fontFamily: "Marcellus,serif", fontSize: 20, color: BG }}>₹{room.price.toLocaleString()}</span>
                      <span style={{ fontSize: 11, color: "rgba(201,212,203,0.7)", marginLeft: 4 }}>/ night</span>
                    </div>
                  </div>

                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", gap: 16 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 500, color: "rgba(4,17,6,0.6)" }}>
                          <BedIcon />{room.type}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 500, color: "rgba(4,17,6,0.6)" }}>
                          <PersonIcon />{room.persons}
                        </span>
                      </div>
                      {room.rating?.overall && (
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(room.rating.overall)} />)}
                          <span style={{ fontSize: 11, color: "rgba(4,17,6,0.5)", marginLeft: 3 }}>{room.rating.overall}</span>
                        </div>
                      )}
                    </div>

                    <h2 style={{ fontFamily: "Marcellus,serif", fontSize: "clamp(16px,2vw,19px)", fontWeight: 400, color: DARK, marginBottom: 8 }}>
                      <button onClick={() => handleExplore(room.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", color: "inherit", textAlign: "left", padding: 0 }}>{room.name}</button>
                    </h2>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(4,17,6,0.6)", marginBottom: 16 }}>{room.desc}</p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                      {(room.includes || []).slice(0, 4).map(a => (
                        <span key={a} style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".06em", padding: "3px 9px", border: "1px solid rgba(4,17,6,0.15)", color: "rgba(4,17,6,0.55)", textTransform: "uppercase" }}>{a}</span>
                      ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(4,17,6,0.07)", paddingTop: 14 }}>
                      <button onClick={() => handleExplore(room.id)} className="explore-btn">
                        EXPLORE NOW <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <span style={{ fontSize: 11, color: "rgba(4,17,6,0.4)", fontStyle: "italic" }}>Free cancellation</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
                  <button className="page-btn" style={{ color: DARK, padding: "0 10px", gap: 4, display: "flex" }} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeft /><span style={{ fontSize: 12 }}>Prev</span>
                  </button>
                  {getPaginationPages().map((p, i) =>
                    p === "..." ? (
                      <span key={`e-${i}`} style={{ color: "rgba(4,17,6,0.4)", fontSize: 14, padding: "0 4px" }}>…</span>
                    ) : (
                      <button key={p} className={`page-btn${currentPage === p ? " active" : ""}`} style={{ color: currentPage === p ? BG : DARK }} onClick={() => handlePageChange(p)}>{p}</button>
                    )
                  )}
                  <button className="page-btn" style={{ color: DARK, padding: "0 10px", gap: 4, display: "flex" }} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <span style={{ fontSize: 12 }}>Next</span><ChevronRight />
                  </button>
                </div>
                <p style={{ fontSize: 12, color: "rgba(4,17,6,0.4)" }}>Page {currentPage} of {totalPages}</p>
              </div>
            )}
          </>
        )}

        {/* Property Facilities */}
        <div style={{ marginTop: 72, paddingTop: 48, borderTop: "1.5px solid rgba(4,17,6,0.1)" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(4,17,6,0.45)", marginBottom: 8 }}>What We Offer</p>
              <h2 style={{ fontFamily: "Marcellus,serif", fontSize: "clamp(22px,4vw,34px)", fontWeight: 400, color: DARK, margin: 0 }}>Property Facilities</h2>
            </div>
            <p style={{ fontSize: 14, color: "rgba(4,17,6,0.55)", maxWidth: 360, lineHeight: 1.65, margin: 0 }}>
              Designed for wildlife enthusiasts and leisure travellers alike — every amenity curated for comfort in the jungle.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }} className="facility-grid">
            {[
              { icon: "🏊", title: "Outdoor Swimming Pool", desc: "Free · All ages · Water slide · Open all year" },
              { icon: "🌿", title: "Garden & Outdoor Areas", desc: "Outdoor fireplace, furniture, picnic area, terrace" },
              { icon: "🍽️", title: "Food & Drink", desc: "Restaurant, room service, breakfast in room, tea/coffee maker" },
              { icon: "🔒", title: "Safety & Security", desc: "24hr security, CCTV, fire extinguishers, smoke alarms, safety deposit" },
              { icon: "🛎️", title: "Reception Services", desc: "24hr front desk, concierge, tour desk, express check-in/out" },
              { icon: "👨‍👩‍👧", title: "Family Friendly", desc: "Family rooms, indoor play area, children's playground, water park" },
              { icon: "🚿", title: "Private Bathroom", desc: "Free toiletries, extra long beds (> 2 metres)" },
              { icon: "❄️", title: "General Amenities", desc: "Air conditioning, room service, pet-friendly on request, car hire" },
              { icon: "📶", title: "Internet", desc: "Free WiFi available in all public areas" },
              { icon: "🅿️", title: "Parking", desc: "Free private parking on site, accessible parking available" },
              { icon: "🧹", title: "Cleaning Services", desc: "Daily housekeeping included" },
              { icon: "🌄", title: "Views", desc: "City view, mountain view, pool view, garden view, landmark view" },
            ].map((f, i) => (
              <div key={i} className="facility-pill">
                <span style={{ fontSize: 26, flexShrink: 0, width: 36, textAlign: "center" }}>{f.icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: DARK, margin: "0 0 3px" }}>{f.title}</p>
                  <p style={{ fontSize: 11, color: "rgba(4,17,6,0.5)", margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ marginTop: 64, background: DARK, padding: "clamp(32px,5vw,56px) clamp(24px,5vw,64px)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(201,212,203,0.5)", marginBottom: 10 }}>The Forest View Resort</p>
            <h3 style={{ fontFamily: "Marcellus,serif", fontSize: "clamp(20px,3vw,30px)", color: BG, fontWeight: 400, margin: "0 0 10px" }}>Ready for Your Jungle Escape?</h3>
            <p style={{ fontSize: 14, color: "rgba(201,212,203,0.65)", margin: 0 }}>Book direct for best rates · Free cancellation · No prepayment needed</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/gallery">
            <button style={{ padding: "13px 28px", background: BG, color: DARK, border: "none", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Jost',sans-serif", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.target.style.opacity = "0.85"} onMouseLeave={e => e.target.style.opacity = "1"}>
              Visit Gallery
            </button>
            </Link>
            <Link to="/contact">
            <button style={{ padding: "13px 28px", background: "transparent", color: BG, border: "1.5px solid rgba(201,212,203,0.35)", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Jost',sans-serif", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.target.style.borderColor = BG} onMouseLeave={e => e.target.style.borderColor = "rgba(201,212,203,0.35)"}>
              Contact Us
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}