import { useState, useMemo } from "react";
import { rooms } from "./data";
import RoomDetail from "./RoomDetail";

const DARK = "#041106";
const BG = "#c9d4cb";
const ROOMS_PER_PAGE = 6;

const BedIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M2 7a2 2 0 012-2h16a2 2 0 012 2v3H2V7zm0 5h20v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5zm6-3a1 1 0 100 2 1 1 0 000-2z" /></svg>
);
const PersonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
);
const ArrowUpRight = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
);
const StarIcon = ({ filled }) => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 inline" fill={filled ? DARK : "none"} stroke={DARK} strokeWidth="1.2">
    <path d="M10 1l2.39 4.84L18 6.74l-4 3.9.94 5.5L10 13.77l-4.94 2.37.94-5.5L2 6.74l5.61-.9L10 1z" />
  </svg>
);
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
);

export default function App() {
  const [activePage, setActivePage] = useState("listing");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [priceRange, setPriceRange] = useState(300); // max price in data is $280, slider max is $300
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [ratings, setRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [activeSearch, setActiveSearch] = useState({ checkIn: "", checkOut: "", adults: "1", children: "0" });

  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleRating = (r) => {
    setRatings(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
    setCurrentPage(1);
  };

  const handlePriceChange = (val) => {
    setPriceRange(val);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setActiveSearch({ checkIn, checkOut, adults, children });
    setSearchTriggered(true);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setRatings([]);
    setPriceRange(300);
    setCheckIn("");
    setCheckOut("");
    setAdults("1");
    setChildren("0");
    setSearchTriggered(false);
    setActiveSearch({ checkIn: "", checkOut: "", adults: "1", children: "0" });
    setCurrentPage(1);
  };

  // Filter rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Price filter
      if (room.price > priceRange) return false;
      // Rating filter — rating is { overall, total }
      if (ratings.length > 0) {
        const overall = room.rating?.overall || 0;
        const rounded = Math.round(overall); // e.g. 4.6 → 5, 4.4 → 4
        if (!ratings.includes(rounded)) return false;
      }
      // Guests filter — maxGuests field, applied only after Search clicked
      if (searchTriggered) {
        const totalGuests = parseInt(activeSearch.adults) + parseInt(activeSearch.children);
        if (room.maxGuests && totalGuests > room.maxGuests) return false;
      }
      return true;
    });
  }, [priceRange, ratings, searchTriggered, activeSearch]);

  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE);
  const paginatedRooms = filteredRooms.slice((currentPage - 1) * ROOMS_PER_PAGE, currentPage * ROOMS_PER_PAGE);

  const handlePageChange = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExplore = (roomId) => {
    setSelectedRoomId(roomId);
    setActivePage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActivePage("listing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build pagination pages array
  const getPaginationPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  if (activePage === "detail") {
    return <RoomDetail roomId={selectedRoomId} onBack={handleBack} onExplore={handleExplore} />;
  }

  const startResult = filteredRooms.length === 0 ? 0 : (currentPage - 1) * ROOMS_PER_PAGE + 1;
  const endResult = Math.min(currentPage * ROOMS_PER_PAGE, filteredRooms.length);
 
  return (
    <div style={{ backgroundColor: BG, color: DARK, fontFamily: "'Jost', sans-serif" }} className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Marcellus&display=swap');
        .nav-link { position: relative; }
        .nav-link::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:2px; background:#041106; transition:width 0.3s; }
        .nav-link:hover::after { width:100%; }
        .room-card { transition:transform 0.3s, box-shadow 0.3s; }
        .room-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(4,17,6,0.12); }
        .room-img { transition:transform 0.5s; }
        .room-card:hover .room-img { transform:scale(1.05); }
        .btn-primary { background:#041106; color:#c9d4cb; transition:background 0.2s; }
        .btn-primary:hover { background:#1a3a1e; }
        .btn-outline { border:1.5px solid #041106; color:#041106; transition:all 0.2s; }
        .btn-outline:hover { background:#041106; color:#c9d4cb; }
        .explore-btn { display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:600; letter-spacing:0.08em; color:#041106; border-bottom:1.5px solid #041106; padding-bottom:2px; transition:opacity 0.2s; cursor:pointer; background:none; border-top:none; border-left:none; border-right:none; }
        .explore-btn:hover { opacity:0.55; }
        .sidebar-input { width:100%; background:#fff; border:1.5px solid rgba(4,17,6,0.15); padding:10px 14px; font-size:14px; color:#041106; outline:none; transition:border-color 0.2s; font-family:'Jost',sans-serif; }
        .sidebar-input:focus { border-color:#041106; }
        .price-slider { -webkit-appearance:none; appearance:none; width:100%; height:4px; border-radius:2px; outline:none; cursor:pointer; }
        .price-slider::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:18px; height:18px; border-radius:50%; background:#041106; cursor:pointer; border:2px solid #c9d4cb; box-shadow:0 0 0 2px #041106; }
        .footer-bg { background:#041106; }
        .breadcrumb-area { background:linear-gradient(rgba(4,17,6,0.65),rgba(4,17,6,0.65)), url('/16.jpeg') center/cover no-repeat; }
        .page-btn { display:inline-flex; align-items:center; justify-content:center; min-width:36px; height:36px; font-size:14px; border:1.5px solid rgba(4,17,6,0.2); transition:all 0.2s; cursor:pointer; background:transparent; padding:0 6px; }
        .page-btn:hover, .page-btn.active { background:#041106; color:#c9d4cb !important; border-color:#041106; }
        .page-btn:disabled { opacity:0.35; cursor:not-allowed; pointer-events:none; }
        .checkbox-custom { appearance:none; -webkit-appearance:none; width:16px; height:16px; border:1.5px solid rgba(4,17,6,0.4); cursor:pointer; flex-shrink:0; transition:background 0.2s; }
        .checkbox-custom:checked { background:#041106; border-color:#041106; background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e"); background-size:100% 100%; }
        .filter-badge { display:inline-flex; align-items:center; gap:4px; background:rgba(4,17,6,0.08); border:1px solid rgba(4,17,6,0.15); padding:3px 10px; font-size:11px; font-weight:600; color:#041106; border-radius:2px; }
        .empty-state { text-align:center; padding:60px 20px; }
        @media (max-width: 640px) {
          .room-grid { grid-template-columns: 1fr !important; }
          .pagination-wrap { flex-wrap:wrap; gap:6px !important; }
        }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .room-card { animation: fadeIn 0.3s ease forwards; }
      `}</style>

      {/* BREADCRUMB */}
      <div className="breadcrumb-area py-46 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily: "Marcellus,serif", color: "#fff", fontSize: "clamp(24px,5vw,52px)", fontWeight: 400, marginBottom: 12 }}>
            Archives: <span style={{ color: "rgba(201,212,203,0.85)" }}>Accommodation Types</span>
          </h1>
          <nav className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            <a href="#" style={{ color: "rgba(255,255,255,0.7)" }}>Home</a>
            <span>/</span>
            <span style={{ color: "#fff" }}>Accommodation Type</span>
          </nav>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* SIDEBAR */}
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 order-first lg:order-last flex flex-col gap-5 lg:self-start lg:sticky lg:top-24">

            {/* Active Filters Badge */}
            {(ratings.length > 0 || priceRange < 300 || searchTriggered) && (
              <div className="flex flex-wrap gap-2">
                {priceRange < 300 && <span className="filter-badge">Max ${priceRange}/night</span>}
                {ratings.map(r => <span key={r} className="filter-badge">{r}★ rated</span>)}
                {searchTriggered && (
                  <span className="filter-badge">
                    {parseInt(activeSearch.adults) + parseInt(activeSearch.children)} guest{parseInt(activeSearch.adults) + parseInt(activeSearch.children) > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            )}

            {/* Room Search */}
            <div style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(4,17,6,0.1)", padding: 20 }}>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: DARK }}>Room Search</h3>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "rgba(4,17,6,0.6)" }}>Check-in <span style={{ color: DARK }}>*</span></label>
                  <input type="date" className="sidebar-input" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "rgba(4,17,6,0.6)" }}>Check-out <span style={{ color: DARK }}>*</span></label>
                  <input type="date" className="sidebar-input" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: "rgba(4,17,6,0.6)" }}>Adults</label>
                    <select className="sidebar-input" value={adults} onChange={e => { setAdults(e.target.value); setCurrentPage(1); }}>
                      {[...Array(10)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: "rgba(4,17,6,0.6)" }}>Children</label>
                    <select className="sidebar-input" value={children} onChange={e => { setChildren(e.target.value); setCurrentPage(1); }}>
                      {[...Array(6)].map((_, i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>
                <button className="btn-primary w-full py-3 text-xs font-semibold tracking-widest uppercase mt-1" onClick={handleSearch}>
                  Search Availability
                </button>
              </div>
            </div>

            {/* Price Filter */}
            <div style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(4,17,6,0.1)", padding: 20 }}>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: DARK }}>Filter By Price</h3>
              <div className="mb-3 flex items-center justify-between text-sm" style={{ color: "rgba(4,17,6,0.7)" }}>
                <span>$120</span>
                <span style={{ color: DARK, fontWeight: 600 }}>Up to ${priceRange}</span>
                <span>$300</span>
              </div>
              <input
                type="range" min="120" max="300" value={priceRange}
                onChange={e => handlePriceChange(Number(e.target.value))}
                className="price-slider"
                style={{ background: `linear-gradient(to right, #041106 ${((priceRange-120)/180)*100}%, rgba(4,17,6,0.15) ${((priceRange-120)/180)*100}%)` }}
              />
              <p className="text-xs mt-2" style={{ color: "rgba(4,17,6,0.45)" }}>
                Showing rooms up to <strong style={{ color: DARK }}>${priceRange}</strong> / night
              </p>
            </div>

            {/* Rating Filter */}
            <div style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(4,17,6,0.1)", padding: 20 }}>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: DARK }}>Filter By Rating</h3>
              <div className="flex flex-col gap-3">
                {[5,4,3,2,1].map(r => (
                  <label key={r} className="flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" className="checkbox-custom" checked={ratings.includes(r)} onChange={() => toggleRating(r)} />
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < r} />)}
                    </div>
                    <span className="text-xs" style={{ color: "rgba(4,17,6,0.6)" }}>({r} Star)</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="btn-outline w-full py-3 text-xs font-semibold tracking-widest uppercase" onClick={handleClear}>
              Clear Filters
            </button>
          </aside>

          {/* ROOM GRID */}
          <main className="flex-1 order-last lg:order-first min-w-0">
            {/* Results count */}
            <p className="text-sm mb-5" style={{ color: "rgba(4,17,6,0.6)" }}>
              {filteredRooms.length === 0
                ? <span>No rooms match your filters.</span>
                : <>Showing <strong style={{ color: DARK }}>{startResult}</strong> – <strong style={{ color: DARK }}>{endResult}</strong> of <strong style={{ color: DARK }}>{filteredRooms.length}</strong> Results</>
              }
            </p>

            {filteredRooms.length === 0 ? (
              <div className="empty-state" style={{ background: "rgba(255,255,255,0.45)", border: "1px solid rgba(4,17,6,0.08)" }}>
                <p style={{ fontFamily: "Marcellus,serif", fontSize: 22, color: DARK, marginBottom: 8 }}>No Rooms Found</p>
                <p className="text-sm" style={{ color: "rgba(4,17,6,0.5)" }}>Try adjusting your filters or clearing them to see all available rooms.</p>
                <button className="btn-primary px-6 py-3 text-xs font-semibold tracking-widest uppercase mt-6" onClick={handleClear}>Clear All Filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 room-grid">
                  {paginatedRooms.map((room, idx) => (
                    <div key={room.id} className="room-card" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(4,17,6,0.08)", overflow: "hidden", animationDelay: `${idx * 0.05}s` }}>
                      <div className="flex items-center justify-between px-4 pt-4 pb-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: DARK }}>
                            <BedIcon /><span>{room.type}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: DARK }}>
                            <PersonIcon /><span>{room.persons}</span>
                          </div>
                        </div>
                        <button onClick={() => toggleWishlist(room.id)} className="p-1.5 transition-transform hover:scale-110" style={{ background: "none", border: "none", cursor: "pointer" }}>
                          <svg viewBox="0 0 24 24" className="w-4 h-4" fill={wishlist.includes(room.id) ? DARK : "none"} stroke={DARK} strokeWidth="1.5">
                            <path d="M12 21C12 21 3 14 3 8.5A5.5 5.5 0 0112 5a5.5 5.5 0 019 3.5C21 14 12 21 12 21z" />
                          </svg>
                        </button>
                      </div>

                      <div className="px-4 pb-3">
                        <div className="text-xs" style={{ color: "rgba(4,17,6,0.5)" }}>
                          From <span style={{ fontFamily: "Marcellus,serif", fontSize: 18, color: DARK }}>${room.price}</span>
                          <span className="ml-1" style={{ color: "rgba(4,17,6,0.4)", fontSize: 11 }}>per night</span>
                        </div>
                      </div>

                      <div className="overflow-hidden" style={{ height: 200 }}>
                        <img
                          src={room.img} alt={room.name}
                          className="room-img w-full h-full object-cover"
                          onError={e => { e.target.src = `https://placehold.co/830x600/c9d4cb/041106?text=${encodeURIComponent(room.name)}`; }}
                        />
                      </div>

                      {/* Rating display */}
                      {room.rating?.overall && (
                        <div className="px-4 pt-3 flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(room.rating.overall)} />)}
                          <span className="text-xs ml-1" style={{ color: "rgba(4,17,6,0.5)" }}>{room.rating.overall} ({room.rating.total} reviews)</span>
                        </div>
                      )}

                      <div className="p-4">
                        <h2 style={{ fontFamily: "Marcellus,serif", fontSize: 18, fontWeight: 400, color: DARK, marginBottom: 8 }}>
                          <button onClick={() => handleExplore(room.id)} className="hover:opacity-70 transition-opacity text-left" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", color: "inherit" }}>{room.name}</button>
                        </h2>
                        <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(4,17,6,0.6)" }}>{room.desc}</p>
                        <button onClick={() => handleExplore(room.id)} className="explore-btn">
                          EXPLORE NOW <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION — only shows if more than 1 page */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2 mt-10 flex-wrap pagination-wrap">
                    {/* Prev */}
                    <button
                      className="page-btn"
                      style={{ color: DARK, width: "auto", padding: "0 10px", gap: 4 }}
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft /> <span className="hidden sm:inline text-xs">Prev</span>
                    </button>

                    {/* Page numbers */}
                    {getPaginationPages().map((p, i) =>
                      p === "..." ? (
                        <span key={`ellipsis-${i}`} style={{ color: "rgba(4,17,6,0.4)", fontSize: 14, padding: "0 4px" }}>…</span>
                      ) : (
                        <button
                          key={p}
                          className={`page-btn${currentPage === p ? " active" : ""}`}
                          style={{ color: currentPage === p ? BG : DARK }}
                          onClick={() => handlePageChange(p)}
                        >
                          {p}
                        </button>
                      )
                    )}

                    {/* Next */}
                    <button
                      className="page-btn"
                      style={{ color: DARK, width: "auto", padding: "0 10px", gap: 4 }}
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <span className="hidden sm:inline text-xs">Next</span> <ChevronRight />
                    </button>
                  </div>
                )}

                {/* Page info */}
                {totalPages > 1 && (
                  <p className="text-xs mt-3" style={{ color: "rgba(4,17,6,0.4)" }}>
                    Page {currentPage} of {totalPages}
                  </p>
                )}
              </>
            )}
          </main>
        </div>
      </div>

 
    </div>
  );
}