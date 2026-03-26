import { useState, useEffect } from "react";
import {
  MapPin, Clock, Star, Users, ChevronRight, ChevronLeft,
  Shield, Plane, Lock, Phone, Leaf, Globe, Check,
  CalendarDays, UserRound, Mail, Minus, Plus, CircleCheck,
  BadgeCheck, ArrowRight, HeartHandshake, Camera, Binoculars,
  Tent, Waves, Wind, Sparkles, TreePine, Bird, Footprints,
  Mountain, Sun, Moon, Flame
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────── */
const packages = [
  {
    id: 1,
    name: "Ranthambore Tiger Trail",
    location: "Sawai Madhopur",
    region: "Eastern Rajasthan",
    duration: "4 Days / 3 Nights",
    price: 18500,
    rating: 4.9,
    reviews: 342,
    badge: "Most Popular",
    accentLight: "#fef3c7",
    accentDark: "#d97706",
    heroImg: "https://i.pinimg.com/1200x/74/70/d0/7470d07cb838830cd88ae6f66481c741.jpg",
    desc: "Come face-to-face with the majestic Bengal Tiger in one of India's finest national parks, set dramatically against the ruins of a 10th-century fort.",
    highlights: ["Bengal Tiger sightings", "Ranthambore Fort ruins", "Crocodile & deer spotting", "Sunrise jeep safari"],
    includes: ["Gypsy jeep safari (×4)", "Forest naturalist guide", "Jungle resort stay", "All meals included"],
    animals: ["Tiger", "Leopard", "Crocodile", "Sloth Bear", "Sambar Deer"],
    bestTime: "Oct – June",
    IconA: Binoculars, IconB: Footprints,
  },
  {
    id: 2,
    name: "Jawai Leopard Escape",
    location: "Pali District",
    region: "Western Rajasthan",
    duration: "3 Days / 2 Nights",
    price: 14200,
    rating: 4.8,
    reviews: 218,
    badge: "Hidden Gem",
    accentLight: "#d1fae5",
    accentDark: "#059669",
    heroImg: "https://i.pinimg.com/736x/da/db/a9/dadba98b9ca283f91a7e5a2d1eb7e5bb.jpg",
    desc: "Witness wild leopards roaming freely across ancient granite boulders in an extraordinary landscape where wildlife and tribal communities coexist in harmony.",
    highlights: ["Leopard sightings on boulders", "Rabari tribal village walk", "Jawai Dam boat ride", "Migratory flamingo watching"],
    includes: ["Open jeep safari (×3)", "Expert tracker guide", "Luxury tent camp", "Sundowner on boulders"],
    animals: ["Leopard", "Hyena", "Flamingo", "Marsh Crocodile", "Wolf"],
    bestTime: "Sep – March",
    IconA: Mountain, IconB: Camera,
  },
  {
    id: 3,
    name: "Thar Desert Camel Safari",
    location: "Jaisalmer",
    region: "Thar Desert",
    duration: "2 Days / 1 Night",
    price: 8900,
    rating: 4.7,
    reviews: 489,
    badge: "Best Value",
    accentLight: "#fce7f3",
    accentDark: "#db2777",
    heroImg: "https://i.pinimg.com/736x/dc/90/e8/dc90e81d08ceca9054a326c04f924149.jpg",
    desc: "Drift across golden Sam Sand Dunes on camelback, sleep under a billion stars in a royal desert camp and witness the world's most vivid desert sunset.",
    highlights: ["Camel ride across Sam dunes", "Overnight desert camp", "Cultural folk music evening", "Sunrise over dunes"],
    includes: ["Camel safari (2 hrs)", "Royal tent accommodation", "Rajasthani dinner & breakfast", "Cultural performance"],
    animals: ["Camel", "Desert Fox", "Blackbuck", "Sand Grouse", "Chinkara"],
    bestTime: "Oct – February",
    IconA: Sun, IconB: Moon,
  },
  {
    id: 4,
    name: "Keoladeo Bird Paradise",
    location: "Bharatpur",
    region: "Eastern Rajasthan",
    duration: "2 Days / 1 Night",
    price: 6500,
    rating: 4.6,
    reviews: 176,
    badge: "UNESCO Heritage",
    accentLight: "#ede9fe",
    accentDark: "#7c3aed",
    heroImg: "https://i.pinimg.com/736x/ff/bc/e3/ffbce34552aae0cb82490226c5b9fb48.jpg",
    desc: "Explore a UNESCO World Heritage wetland hosting over 370 bird species including rare Siberian cranes, painted storks and migratory waterfowl from across the globe.",
    highlights: ["370+ bird species", "Boat & cycle safari", "Siberian crane sightings", "Wetland ecosystem walk"],
    includes: ["Cycle rickshaw & boat safari", "Bird naturalist guide", "Heritage guesthouse", "Morning birding session"],
    animals: ["Painted Stork", "Siberian Crane", "Python", "Sambar Deer", "Jackal"],
    bestTime: "Oct – March",
    IconA: Bird, IconB: Waves,
  },
];

const activities = [
  { icon: Binoculars, title: "Jeep Safari Rides", desc: "Roar through dense jungle corridors in open-top gypsies — the classic Rajasthan safari experience with expert naturalist guides." },
  { icon: Camera, title: "Wildlife Photography", desc: "Capture Bengal tigers, leopards on granite boulders, flamingos at dawn and rare bird species in their natural splendour." },
  { icon: Tent, title: "Luxury Jungle Camps", desc: "Spend nights in candlelit tented camps deep inside the forest or on the golden sand dunes of the Thar Desert." },
  { icon: Flame, title: "Sundowners & Bonfires", desc: "Sip cocktails at boulder sundowners in Jawai or gather around a campfire while folk artists perform traditional Rajasthani music." },
];

const places = [
  {
    name: "Ranthambore National Park",
    tag: "Tiger Reserve",
    img: "https://i.pinimg.com/736x/08/14/fe/0814fea3a9fc37bdc575b85cc6dc0afe.jpg",
    tagColor: "#d97706", tagBg: "#fef3c7",
    info: "India's most famous tiger reserve. Home to 90+ Bengal tigers, historic Ranthambore Fort, and scenic lakes.",
  },
  {
    name: "Jawai Leopard Reserve",
    tag: "Leopard Safari",
    img: "https://i.pinimg.com/1200x/34/c6/1e/34c61e8bcc5a70e5186bc4c2af32cdbd.jpg",
    tagColor: "#059669", tagBg: "#d1fae5",
    info: "Highest leopard density in Asia. Unique granite boulder landscape where leopards live alongside Rabari shepherds.",
  },
  {
    name: "Sam Sand Dunes, Jaisalmer",
    tag: "Desert Safari",
    img: "https://i.pinimg.com/736x/0c/30/08/0c300844df9863b465799d5332aefa23.jpg",
    tagColor: "#b45309", tagBg: "#fef9c3",
    info: "The iconic Thar Desert experience. Camel rides, desert camps, and breathtaking sunsets over golden dunes.",
  },
  {
    name: "Sariska Tiger Reserve",
    tag: "Tiger & Ruins",
    img: "https://i.pinimg.com/1200x/3c/67/35/3c67352abecdf0a86afde1d8c01e97c4.jpg",
    tagColor: "#1d4ed8", tagBg: "#dbeafe",
    info: "Ancient temples and tiger territory meet in the Aravalli Hills. Kankwari Fort sits deep inside the jungle.",
  },
  {
    name: "Keoladeo Bird Sanctuary",
    tag: "UNESCO Heritage",
    img: "https://i.pinimg.com/736x/ff/bc/e3/ffbce34552aae0cb82490226c5b9fb48.jpg",
    tagColor: "#7c3aed", tagBg: "#ede9fe",
    info: "One of the world's richest bird habitats — 370+ species including rare Siberian cranes and painted storks.",
  },
  {
    name: "Kumbhalgarh Sanctuary",
    tag: "Wolf & Leopard",
    img: "https://i.pinimg.com/1200x/bd/99/8c/bd998c853f07cb18c9f2981a477da714.jpg",
    tagColor: "#0f766e", tagBg: "#ccfbf1",
    info: "Nestled around the Great Wall of India — Kumbhalgarh Fort. Dense forests shelter wolves, leopards and sloth bears.",
  },
];

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function Stars({ rating }) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={i <= Math.round(rating) ? "#f59e0b" : "#e2e8e4"}>
          <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9.2,11 6,9.2 2.8,11 3.5,7.5 1,5 4.5,4.5"/>
        </svg>
      ))}
    </div>
  );
}

export default function App() {
  const [sel, setSel] = useState(null);
  const [guests, setGuests] = useState(2);
  const [month, setMonth] = useState("Nov");
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", phone:"", note:"" });

  const pkg = packages.find(p => p.id === sel);
  const total = pkg ? pkg.price * guests : 0;
  const discount = guests >= 6;
  const final = discount ? Math.round(total * 0.9) : total;
  const submit = () => { if (form.name && form.email) setDone(true); };

  useEffect(() => {
    // Page fresh load par top se khule
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Button click ke baad form pe scroll kare
    const bookingSection = document.getElementById("packages");
    if (bookingSection && step > 1 && !done) {
      setTimeout(() => {
        bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [step, done]);

  return (
    <div style={{ fontFamily:"'Playfair Display',serif", background:"#c9d4cb", minHeight:"100vh", color:"#1a3d2b" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,800;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

     
        body{overflow-x:hidden}
        input,textarea,button,select{font-family:'DM Sans',sans-serif;outline:none}
        ::placeholder{color:#6b9478}
        img{display:block;object-fit:cover}
        p,span,label,div{font-family:'DM Sans',sans-serif}
        h1,h2,h3{font-family:'Playfair Display',serif}

        /* ── hero ── */
        .hero-section{
          position:relative;
          min-height:100svh;
          display:flex;
          align-items:flex-end;
          overflow:hidden;
        }
        .hero-bg{
          position:absolute;inset:0;
          background-image:url('https://i.pinimg.com/736x/36/3f/b8/363fb80cae08f49bf7612664f2f2c246.jpg');
          background-size:cover;
          background-position:center 40%;
          animation:kenBurns 18s ease-in-out infinite alternate;
        }
        @keyframes kenBurns{
          from{transform:scale(1) translate(0,0);}
          to{transform:scale(1.06) translate(-1%,-1%);}
        }
        .hero-overlay{
          position:absolute;inset:0;
          background:linear-gradient(
            to top,
            rgba(0,0,0,0.95) 0%,
            rgba(0,0,0,0.75) 30%,
            rgba(0,0,0,0.45) 60%,
            rgba(0,0,0,0.20) 85%,
            rgba(0,0,0,0.05) 100%
          );
        }
        .hero-content{
          position:relative;z-index:2;
          width:100%;
          padding:120px 24px 56px;
          max-width:1200px;
          margin:0 auto;
        }
        @media(max-width:768px){
          .hero-content{
            padding:100px 20px 48px;
          }
        }
        @media(max-width:480px){
          .hero-content{
            padding:80px 16px 40px;
          }
        }

        /* ── safari badges strip ── */
        .safari-strip{
          display:flex;gap:10px;flex-wrap:wrap;margin-bottom:24px;
        }
        .safari-badge{
          display:flex;align-items:center;gap:6px;
          background:rgba(255,255,255,0.10);
          border:1px solid rgba(255,255,255,0.18);
          backdrop-filter:blur(8px);
          border-radius:50px;
          padding:7px 14px;
          color:#e8f5ec;
          font-size:12px;font-weight:600;letter-spacing:.04em;
          font-family:'DM Sans',sans-serif;
        }
        .safari-badge svg{flex-shrink:0}

        /* ── hero heading ── */
        .hero-headline{
          font-size:clamp(38px,7vw,82px);
          font-weight:800;
          color:#fff;
          line-height:1.0;
          letter-spacing:-1px;
          margin-bottom:20px;
        }
        @media(max-width:480px){
          .hero-headline{
            font-size:clamp(28px,6vw,48px);
            margin-bottom:16px;
          }
        }
        .hero-headline em{
          font-style:italic;
          font-weight:400;
          color:#a8d4b0;
        }
        .hero-sub{
          color:rgba(200,230,210,0.85);
          font-size:clamp(14px,2vw,17px);
          line-height:1.8;
          max-width:520px;
          margin-bottom:32px;
          font-weight:400;
        }
        @media(max-width:480px){
          .hero-sub{
            font-size:clamp(13px,2vw,15px);
            margin-bottom:24px;
            line-height:1.6;
          }
        }

        /* ── hero CTAs ── */
        .hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:52px;}
        @media(max-width:480px){
          .hero-btns{margin-bottom:40px;gap:10px;}
        }
        .btn-white{
          background:#fff;color:#1a3d2b;border:none;
          padding:14px 28px;border-radius:50px;
          font-size:14px;font-weight:700;cursor:pointer;
          display:flex;align-items:center;gap:8px;
          transition:all .2s;font-family:'DM Sans',sans-serif;
          white-space:nowrap;
        }
        .btn-white:hover{background:#e8f5ec;transform:translateY(-2px);}
        .btn-outline{
          background:transparent;color:#fff;
          border:1.5px solid rgba(255,255,255,0.40);
          padding:14px 28px;border-radius:50px;
          font-size:14px;font-weight:600;cursor:pointer;
          display:flex;align-items:center;gap:8px;
          transition:all .2s;font-family:'DM Sans',sans-serif;
          white-space:nowrap;
        }
        .btn-outline:hover{background:rgba(255,255,255,0.10);border-color:rgba(255,255,255,0.65);}

        /* ── hero stats row ── */
        .hero-stats{
          display:flex;gap:0;
          border-top:1px solid rgba(255,255,255,0.14);
          padding-top:28px;
          flex-wrap:wrap;
        }
        @media(max-width:640px){
          .hero-stats{
            padding-top:20px;
          }
        }
        .hero-stat{
          flex:1;min-width:120px;
          padding:0 28px 0 0;
          border-right:1px solid rgba(255,255,255,0.12);
          margin-right:28px;
        }
        .hero-stat:last-child{border-right:none;margin-right:0;}
        .hero-stat-val{color:#fff;font-size:clamp(22px,3vw,32px);font-weight:800;line-height:1;font-family:'Playfair Display',serif;}
        .hero-stat-lbl{color:#7aaa88;font-size:11px;font-weight:600;letter-spacing:.10em;text-transform:uppercase;margin-top:5px;font-family:'DM Sans',sans-serif;}

        /* ── scroll hint ── */
        .scroll-hint{
          position:absolute;bottom:28px;right:32px;z-index:3;
          display:flex;flex-direction:column;align-items:center;gap:6px;
          color:rgba(255,255,255,0.5);font-size:10px;font-weight:600;
          letter-spacing:.12em;text-transform:uppercase;
          font-family:'DM Sans',sans-serif;
        }
        .scroll-line{
          width:1px;height:40px;
          background:linear-gradient(to bottom,rgba(255,255,255,0.5),transparent);
          animation:scrollDrop 2s ease-in-out infinite;
        }
        @keyframes scrollDrop{0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(.5);opacity:.4}}

        /* ── general ── */
        .pkg-card{cursor:pointer;transition:transform .25s cubic-bezier(.2,.8,.4,1),box-shadow .25s}
        .pkg-card:hover{transform:translateY(-5px)}
        .pkg-card.sel{box-shadow:0 0 0 3px #1a3d2b,0 20px 48px rgba(26,61,43,.22)!important}

        .place-card{overflow:hidden;border-radius:16px;background:#fff;box-shadow:0 2px 16px rgba(26,61,43,.08);transition:transform .22s,box-shadow .22s}
        .place-card:hover{transform:translateY(-5px);box-shadow:0 8px 32px rgba(26,61,43,.14)}

        .act-card{background:#fff;border-radius:16px;padding:22px 20px;box-shadow:0 2px 12px rgba(26,61,43,.07);transition:transform .2s}
        .act-card:hover{transform:translateY(-4px)}

        .month-btn{border:none;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif}
        .month-btn:hover:not(.on){background:#c4d4c8!important}

        .btn-primary{border:none;cursor:pointer;transition:background .15s,transform .1s,box-shadow .15s;font-family:'DM Sans',sans-serif}
        .btn-primary:hover:not(:disabled){background:#14301f!important;box-shadow:0 6px 20px rgba(26,61,43,.3)}
        .btn-primary:active:not(:disabled){transform:scale(.98)}

        .btn-ghost{cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif}
        .btn-ghost:hover{background:rgba(26,61,43,.06)!important}

        .cnt-btn{cursor:pointer;transition:all .15s;border:none}
        .cnt-btn:hover{opacity:.8}
        .cnt-btn:active{transform:scale(.93)}

        .inp:focus{border-color:#1a3d2b!important;background:#fff!important}
        .scroll-hide::-webkit-scrollbar{display:none}
        .scroll-hide{-ms-overflow-style:none;scrollbar-width:none}

        /* ── pkg card responsive ── */
        .pkg-inner{display:grid;grid-template-columns:260px 1fr}
        @media(max-width:640px){
          .pkg-inner{grid-template-columns:1fr;grid-template-rows:200px auto}
        }

        /* ── booking grid ── */
        .booking-grid{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:28px;align-items:start}
        @media(max-width:900px){
          .booking-grid{grid-template-columns:1fr}
        }

        /* ── sidebar sticky ── */
        .sidebar-sticky{position:sticky;top:24px}
        @media(max-width:900px){
          .sidebar-sticky{position:static}
        }

        /* ── left content sticky ── */
        .left-content{position:sticky;top:24px;align-self:start}
        @media(max-width:900px){
          .left-content{position:static}
        }

        /* ── step nav ── */
        .step-tab{transition:opacity .2s}
        .step-tab.go{cursor:pointer}
        .step-nav-label{display:inline}
        @media(max-width:480px){
          .step-nav-label{display:none}
        }

        /* ── places grid ── */
        .places-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
        @media(max-width:480px){
          .places-grid{grid-template-columns:1fr}
        }

        /* ── activities grid ── */
        .act-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
        @media(max-width:480px){
          .act-grid{grid-template-columns:1fr 1fr}
        }

        /* ── month grid ── */
        .month-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
        @media(max-width:480px){
          .month-grid{grid-template-columns:repeat(4,1fr)}
        }

        /* ── details form grid ── */
        .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        @media(max-width:560px){
          .form-grid{grid-template-columns:1fr}
        }

        /* ── hero stats ── */
        @media(max-width:520px){
          .hero-stat{min-width:100px;padding:0 16px 0 0;margin-right:16px;}
          .hero-stat-val{font-size:22px}
        }
        @media(max-width:360px){
          .hero-stats{gap:16px}
          .hero-stat{border-right:none;margin-right:0;padding:0}
          .hero-stat:not(:last-child){padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.1)}
        }

        /* ── success card ── */
        .success-card{background:#fff;border-radius:24px;padding:72px 40px;text-align:center;box-shadow:0 8px 40px rgba(26,61,43,.1);max-width:640px;margin:0 auto}
        @media(max-width:520px){
          .success-card{padding:48px 24px}
        }

        /* ── section padding ── */
        .sec-pad{padding:60px 24px}
        @media(max-width:640px){
          .sec-pad{padding:40px 16px}
        }
        .sec-pad-lg{padding:60px 24px 80px}
        @media(max-width:640px){
          .sec-pad-lg{padding:40px 16px 60px}
        }

        /* ── pkg content pad ── */
        .pkg-content-pad{padding:22px 24px 20px}
        @media(max-width:640px){
          .pkg-content-pad{padding:16px 18px 18px}
        }
      `}</style>

      {/* ═══ HERO BANNER ══════════════════════════════════ */}
      <header className="hero-section">
        <div className="hero-bg"/>
        <div className="hero-overlay"/>

        <div className="hero-content">
    

          {/* Main heading */}
          <h1 className="hero-headline">
            Into the Wild<br/>
            <em>Heart of Rajasthan</em>
          </h1>

          {/* Safari description */}
          <p className="hero-sub">
            Roar alongside Bengal tigers in Ranthambore, spot leopards draped over granite boulders in Jawai, drift across the Thar Desert on camelback under a billion stars — the royal wilderness of Rajasthan awaits.
          </p>

          {/* CTAs */}
          <div className="hero-btns">
            <button className="btn-white" onClick={()=>document.getElementById("packages")?.scrollIntoView({behavior:"smooth"})}>
              Book a Safari <ArrowRight size={16}/>
            </button>
            <button className="btn-outline" onClick={()=>document.getElementById("places")?.scrollIntoView({behavior:"smooth"})}>
              Explore Reserves
            </button>
          </div>

          {/* Stats strip */}
          <div className="hero-stats">
            {[["8,200+","Guests Hosted"],["4.8 / 5","Average Rating"],["12","Wildlife Reserves"]].map(([val,lbl])=>(
              <div key={lbl} className="hero-stat">
                <div className="hero-stat-val">{val}</div>
                <div className="hero-stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ═══ SAFARI EXPERIENCES STRIP ════════════════════ */}
      <div style={{ background:"#1a3d2b", padding:"18px 24px", overflowX:"auto" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"flex", alignItems:"center", gap:32, whiteSpace:"nowrap", justifyContent:"center", flexWrap:"wrap" }}>
          {[
            [Binoculars,"Open Jeep Safari"],
            [Camera,"Wildlife Photography"],
            [Tent,"Luxury Jungle Camp"],
            [Moon,"Desert Night Stay"],
            [Bird,"Bird Watching"],
            [Mountain,"Boulder Safari"],
          ].map(([Icon,lbl])=>(
            <div key={lbl} style={{ display:"flex", alignItems:"center", gap:8, color:"#a8c4ae", fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>
              <Icon size={15} color="#6b9478"/>
              {lbl}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ACTIVITIES ════════════════════════════════════ */}
      <section style={{ background:"#b8c9bc" }} className="sec-pad">
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <p style={{ color:"#4a7a5c", fontSize:12, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", marginBottom:8, fontFamily:"'DM Sans',sans-serif" }}>What You'll Experience</p>
            <h2 style={{ fontSize:"clamp(24px,4vw,36px)", fontWeight:800, color:"#1a3d2b" }}>The Joy of Rajasthan Safari</h2>
          </div>
          <div className="act-grid">
            {activities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="act-card">
                <div style={{ width:44, height:44, borderRadius:12, background:"#f0f7f2", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                  <Icon size={20} color="#1a3d2b"/>
                </div>
                <div style={{ fontWeight:700, fontSize:15, color:"#1a3d2b", marginBottom:8, fontFamily:"'DM Sans',sans-serif" }}>{title}</div>
                <div style={{ color:"#4a7a5c", fontSize:13, lineHeight:1.65, fontFamily:"'DM Sans',sans-serif" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PLACES ════════════════════════════════════════ */}
      <section id="places" className="sec-pad" style={{ background:"#c9d4cb" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:36, flexWrap:"wrap", gap:16 }}>
            <div>
              <p style={{ color:"#4a7a5c", fontSize:12, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", marginBottom:8, fontFamily:"'DM Sans',sans-serif" }}>Destinations</p>
              <h2 style={{ fontSize:"clamp(24px,4vw,36px)", fontWeight:800, color:"#1a3d2b" }}>Places You Will Visit</h2>
            </div>
            <p style={{ color:"#4a7a5c", fontSize:14, maxWidth:380, lineHeight:1.65, fontFamily:"'DM Sans',sans-serif" }}>Each reserve offers a completely unique ecosystem — from dense jungles to wetlands and golden deserts.</p>
          </div>
          <div className="places-grid">
            {places.map(p => (
              <div key={p.name} className="place-card">
                <div style={{ position:"relative", height:190, overflow:"hidden" }}>
                  <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .4s" }}
                    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                    onError={e=>{e.currentTarget.style.background="#1a3d2b";e.currentTarget.style.display="none";}}/>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(26,61,43,.6) 0%, transparent 50%)", pointerEvents:"none" }}/>
                  <div style={{ position:"absolute", top:12, left:12 }}>
                    <span style={{ background:p.tagBg, color:p.tagColor, fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:20, letterSpacing:".05em", fontFamily:"'DM Sans',sans-serif" }}>{p.tag}</span>
                  </div>
                </div>
                <div style={{ padding:"18px 20px 20px" }}>
                  <div style={{ fontWeight:700, fontSize:16, color:"#1a3d2b", marginBottom:8, fontFamily:"'DM Sans',sans-serif" }}>{p.name}</div>
                  <div style={{ color:"#4a7a5c", fontSize:13, lineHeight:1.65, fontFamily:"'DM Sans',sans-serif" }}>{p.info}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOOKING ════════════════════════════════════════ */}
      <section id="packages" className="sec-pad-lg" style={{ background:"#b8c9bc" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <p style={{ color:"#4a7a5c", fontSize:12, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", marginBottom:8, fontFamily:"'DM Sans',sans-serif" }}>Book Your Adventure</p>
            <h2 style={{ fontSize:"clamp(24px,4vw,36px)", fontWeight:800, color:"#1a3d2b" }}>Safari Packages</h2>
          </div>

          {/* Step nav */}
          <div style={{ background:"#a8bcad", borderRadius:14, padding:"0 8px", marginBottom:32, display:"inline-flex", width:"100%", position:"sticky", top:0, zIndex:10 }}>
            {[{n:1,lbl:"Choose Package"},{n:2,lbl:"Date & Guests"},{n:3,lbl:"Your Details"}].map(({n,lbl},i)=>(
              <div key={n} className={`step-tab${step>=n?" go":""}`} onClick={()=>step>=n&&setStep(n)}
                style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"13px 8px", opacity:step<n?.4:1, borderBottom:step===n?"2.5px solid #1a3d2b":"2.5px solid transparent", transition:"border .2s" }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:step>n?"#1a3d2b":step===n?"#1a3d2b":"rgba(26,61,43,.22)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>
                  {step>n?<Check size={11}/>:n}
                </div>
                <span className="step-nav-label" style={{ fontWeight:step===n?700:500, fontSize:13, color:"#1a3d2b", whiteSpace:"nowrap", fontFamily:"'DM Sans',sans-serif" }}>{lbl}</span>
                {i<2&&<ChevronRight size={13} color="#6b9478" style={{ marginLeft:2 }}/>}
              </div>
            ))}
          </div>

          {done ? (
            <div className="success-card">
              <div style={{ width:76, height:76, borderRadius:"50%", background:"#f0f7f2", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
                <CircleCheck size={38} color="#1a3d2b"/>
              </div>
              <h2 style={{ fontSize:"clamp(24px,5vw,32px)", fontWeight:800, color:"#1a3d2b", marginBottom:10 }}>Booking Confirmed!</h2>
              <p style={{ color:"#4a7a5c", fontSize:16, marginBottom:4, fontFamily:"'DM Sans',sans-serif" }}>Thank you, <strong>{form.name}</strong>. Your jungle adventure awaits!</p>
              <p style={{ color:"#8aad93", fontSize:14, marginBottom:36, fontFamily:"'DM Sans',sans-serif" }}>Confirmation sent to <strong>{form.email}</strong></p>
              <div style={{ display:"flex", gap:20, background:"#f6f9f7", borderRadius:14, padding:"20px 24px", border:"1px solid #c9d4cb", marginBottom:40, flexWrap:"wrap", justifyContent:"center" }}>
                {[[pkg?.name,"Package"],[`${month} 2026`,"Departure"],[`${guests} guest${guests>1?"s":""}`,"Guests"],[`₹${final.toLocaleString()}`,"Total"]].map(([v,l])=>(
                  <div key={l} style={{ textAlign:"center", minWidth:80 }}>
                    <div style={{ fontWeight:800, fontSize:14, color:"#1a3d2b", fontFamily:"'DM Sans',sans-serif" }}>{v}</div>
                    <div style={{ fontSize:10, color:"#8aad93", fontWeight:600, letterSpacing:".06em", marginTop:3, fontFamily:"'DM Sans',sans-serif" }}>{l.toUpperCase()}</div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={()=>{setDone(false);setStep(1);setSel(null);setForm({name:"",email:"",phone:"",note:""});}}
                style={{ background:"#1a3d2b", color:"#fff", padding:"14px 36px", borderRadius:12, fontSize:15, fontWeight:700 }}>
                Book Another Safari
              </button>
            </div>
          ) : (
            <div className="booking-grid">
              {/* LEFT */}
              <div className="left-content">
                {/* ── STEP 1 ── */}
                {step===1&&(
                  <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                    {packages.map(p=>{
                      const on=sel===p.id;
                      return (
                        <div key={p.id} className={`pkg-card${on?" sel":""}`} onClick={()=>setSel(p.id)}
                          style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:on?undefined:"0 2px 16px rgba(26,61,43,.07)" }}>
                          <div className="pkg-inner">
                            {/* Image panel */}
                            <div style={{ position:"relative", overflow:"hidden", minHeight:200 }}>
                              <img src={p.heroImg} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .4s", minHeight:200 }}
                                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.07)"}
                                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                                onError={e=>{e.currentTarget.parentElement.style.background="#1a3d2b";}}/>
                              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(26,61,43,.75) 0%, rgba(26,61,43,.1) 60%)", pointerEvents:"none" }}/>
                              <div style={{ position:"absolute", top:14, left:14, display:"flex", alignItems:"center", gap:5, background:p.accentLight, borderRadius:20, padding:"5px 12px" }}>
                                <Sparkles size={10} color={p.accentDark}/>
                                <span style={{ color:p.accentDark, fontSize:11, fontWeight:700, letterSpacing:".07em", fontFamily:"'DM Sans',sans-serif" }}>{p.badge.toUpperCase()}</span>
                              </div>
                              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 18px" }}>
                                <div style={{ color:"#fff", fontSize:18, fontWeight:800, lineHeight:1.2, marginBottom:4, fontFamily:"'Playfair Display',serif" }}>{p.name}</div>
                                <div style={{ display:"flex", alignItems:"center", gap:5, color:"rgba(255,255,255,.75)", fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>
                                  <MapPin size={11}/><span>{p.location}</span>
                                  <span style={{ opacity:.4, margin:"0 3px" }}>·</span>
                                  <span>{p.region}</span>
                                </div>
                              </div>
                            </div>

                            {/* Content panel */}
                            <div className="pkg-content-pad" style={{ display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                              <div>
                                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:12 }}>
                                  <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                                    <span style={{ display:"flex", alignItems:"center", gap:5, color:"#4a7a5c", fontSize:13, fontFamily:"'DM Sans',sans-serif" }}>
                                      <Clock size={13} color="#6b9478"/>{p.duration}
                                    </span>
                                    <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:13 }}>
                                      <Stars rating={p.rating}/><b style={{ color:"#1a3d2b", fontFamily:"'DM Sans',sans-serif" }}>{p.rating}</b><span style={{ color:"#8aad93", fontFamily:"'DM Sans',sans-serif" }}>({p.reviews})</span>
                                    </span>
                                  </div>
                                  <div style={{ width:24, height:24, borderRadius:"50%", border:`2px solid ${on?"#1a3d2b":"#d0ddd3"}`, background:on?"#1a3d2b":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s" }}>
                                    {on&&<Check size={12} color="#fff"/>}
                                  </div>
                                </div>

                                <p style={{ color:"#4a7a5c", fontSize:13.5, lineHeight:1.7, marginBottom:14, fontFamily:"'DM Sans',sans-serif" }}>{p.desc}</p>

                                <div style={{ marginBottom:14 }}>
                                  <div style={{ fontSize:11, fontWeight:700, color:"#8aad93", letterSpacing:".08em", marginBottom:7, fontFamily:"'DM Sans',sans-serif" }}>WILDLIFE YOU MAY SPOT</div>
                                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                                    {p.animals.map(a=>(
                                      <span key={a} style={{ background:"#f0f7f2", color:"#2d6644", fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:20, border:"1px solid #c9d4cb", fontFamily:"'DM Sans',sans-serif" }}>{a}</span>
                                    ))}
                                  </div>
                                </div>

                                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 12px" }}>
                                  {p.includes.map(inc=>(
                                    <div key={inc} style={{ display:"flex", alignItems:"flex-start", gap:6 }}>
                                      <div style={{ width:15, height:15, borderRadius:"50%", background:"#edf4ef", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                                        <Check size={9} color="#1a3d2b"/>
                                      </div>
                                      <span style={{ color:"#2d6644", fontSize:12, fontWeight:500, lineHeight:1.4, fontFamily:"'DM Sans',sans-serif" }}>{inc}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginTop:18, paddingTop:16, borderTop:"1px solid #edf2ee", flexWrap:"wrap", gap:10 }}>
                                <div>
                                  <div style={{ color:"#8aad93", fontSize:11, fontWeight:600, letterSpacing:".06em", marginBottom:2, fontFamily:"'DM Sans',sans-serif" }}>STARTS FROM</div>
                                  <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
                                    <span style={{ fontSize:28, fontWeight:800, color:"#1a3d2b", letterSpacing:"-.5px", fontFamily:"'Playfair Display',serif" }}>₹{p.price.toLocaleString()}</span>
                                    <span style={{ color:"#8aad93", fontSize:13, fontFamily:"'DM Sans',sans-serif" }}>/ person</span>
                                  </div>
                                  <div style={{ color:"#6b9478", fontSize:11, marginTop:2, fontFamily:"'DM Sans',sans-serif" }}>Best time: {p.bestTime}</div>
                                </div>
                                <div style={{ display:"flex", alignItems:"center", gap:6, background:on?"#1a3d2b":"#f0f7f2", color:on?"#fff":"#1a3d2b", padding:"9px 18px", borderRadius:10, fontSize:13, fontWeight:700, transition:"all .2s", flexShrink:0, fontFamily:"'DM Sans',sans-serif" }}>
                                  {on?<><Check size={14}/> Selected</>:<>Select <ChevronRight size={14}/></>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <button className="btn-primary" disabled={!sel} onClick={()=>setStep(2)}
                      style={{ width:"100%", background:sel?"#1a3d2b":"#a8bcad", color:"#fff", padding:"17px", borderRadius:14, fontSize:16, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", gap:8, cursor:sel?"pointer":"not-allowed" }}>
                      Continue to Date & Guests <ArrowRight size={18}/>
                    </button>
                  </div>
                )}

                {/* ── STEP 2 ── */}
                {step===2&&(
                  <div>
                    <h3 style={{ fontSize:22, fontWeight:800, marginBottom:6 }}>Date & Guests</h3>
                    <p style={{ color:"#4a7a5c", fontSize:15, marginBottom:24, fontFamily:"'DM Sans',sans-serif" }}>Pick your preferred travel month and group size.</p>

                    <div style={{ background:"#fff", borderRadius:18, padding:"26px 20px", marginBottom:18, boxShadow:"0 2px 14px rgba(26,61,43,.06)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18, flexWrap:"wrap" }}>
                        <CalendarDays size={17} color="#1a3d2b"/>
                        <span style={{ fontWeight:700, fontSize:16, fontFamily:"'DM Sans',sans-serif" }}>Travel Month</span>
                        <span style={{ marginLeft:"auto", background:"#f0f7f2", color:"#2d6644", fontSize:12, fontWeight:700, padding:"4px 12px", borderRadius:20, border:"1px solid #c9d4cb", fontFamily:"'DM Sans',sans-serif" }}>{month} 2026</span>
                      </div>
                      <div className="month-grid">
                        {months.map(m=>{
                          const on=month===m;
                          return <button key={m} className={`month-btn${on?" on":""}`} onClick={()=>setMonth(m)}
                            style={{ padding:"11px 4px", borderRadius:10, fontWeight:on?700:500, fontSize:13, background:on?"#1a3d2b":"#f4f7f5", color:on?"#fff":"#2d5c40", border:on?"none":"1.5px solid #dde8e0" }}>{m}</button>;
                        })}
                      </div>
                    </div>

                    <div style={{ background:"#fff", borderRadius:18, padding:"26px 20px", marginBottom:18, boxShadow:"0 2px 14px rgba(26,61,43,.06)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:22 }}>
                        <Users size={17} color="#1a3d2b"/>
                        <span style={{ fontWeight:700, fontSize:16, fontFamily:"'DM Sans',sans-serif" }}>Number of Guests</span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:14, background:"#f4f7f5", borderRadius:14, padding:"8px 12px" }}>
                          <button className="cnt-btn" onClick={()=>setGuests(Math.max(1,guests-1))}
                            style={{ width:38, height:38, borderRadius:10, border:"1.5px solid #dde8e0", background:"#fff", color:"#1a3d2b", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <Minus size={16}/>
                          </button>
                          <div style={{ textAlign:"center", minWidth:44 }}>
                            <div style={{ fontSize:34, fontWeight:800, color:"#1a3d2b", lineHeight:1, fontFamily:"'Playfair Display',serif" }}>{guests}</div>
                            <div style={{ fontSize:10, color:"#8aad93", fontWeight:700, letterSpacing:".06em", marginTop:2, fontFamily:"'DM Sans',sans-serif" }}>GUESTS</div>
                          </div>
                          <button className="cnt-btn" onClick={()=>setGuests(Math.min(20,guests+1))}
                            style={{ width:38, height:38, borderRadius:10, border:"none", background:"#1a3d2b", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <Plus size={16}/>
                          </button>
                        </div>
                        {discount?(
                          <div style={{ display:"flex", alignItems:"center", gap:8, background:"#f0f7f2", borderRadius:10, padding:"10px 14px", border:"1px solid #c9d4cb" }}>
                            <BadgeCheck size={16} color="#1a3d2b"/>
                            <div>
                              <div style={{ color:"#1a3d2b", fontSize:13, fontWeight:700, fontFamily:"'DM Sans',sans-serif" }}>10% Group Discount Applied!</div>
                              <div style={{ color:"#6b9478", fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>Saving ₹{pkg?Math.round(total*.1).toLocaleString():"–"}</div>
                            </div>
                          </div>
                        ):(
                          <div style={{ color:"#6b9478", fontSize:13, fontFamily:"'DM Sans',sans-serif" }}><span style={{ color:"#1a3d2b", fontWeight:700 }}>Groups of 6+</span> receive 10% off</div>
                        )}
                      </div>
                    </div>

                    <div style={{ display:"flex", gap:12 }}>
                      <button className="btn-ghost" onClick={()=>setStep(1)} style={{ flex:1, background:"transparent", color:"#1a3d2b", border:"2px solid #1a3d2b", padding:"15px", borderRadius:12, fontSize:15, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                        <ChevronLeft size={16}/> Back
                      </button>
                      <button className="btn-primary" onClick={()=>setStep(3)} style={{ flex:2, background:"#1a3d2b", color:"#fff", padding:"15px", borderRadius:12, fontSize:15, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                        Continue <ArrowRight size={16}/>
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3 ── */}
                {step===3&&(
                  <div>
                    <h3 style={{ fontSize:22, fontWeight:800, marginBottom:6 }}>Your Details</h3>
                    <p style={{ color:"#4a7a5c", fontSize:15, marginBottom:24, fontFamily:"'DM Sans',sans-serif" }}>We'll send your booking confirmation and itinerary here.</p>

                    <div style={{ background:"#fff", borderRadius:18, padding:"24px 20px", boxShadow:"0 2px 14px rgba(26,61,43,.06)", marginBottom:18 }}>
                      <div className="form-grid">
                        {[
                          {k:"name",lbl:"Full Name",Icon:UserRound,ph:"Arjun Sharma",type:"text"},
                          {k:"email",lbl:"Email Address",Icon:Mail,ph:"arjun@email.com",type:"email"},
                          {k:"phone",lbl:"Phone Number",Icon:Phone,ph:"+91 98765 43210",type:"tel"},
                        ].map(({k,lbl,Icon:FI,ph,type})=>(
                          <div key={k}>
                            <label style={{ display:"flex", alignItems:"center", gap:6, fontWeight:600, fontSize:12, color:"#1a3d2b", marginBottom:8, letterSpacing:".05em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" }}>
                              <FI size={12} color="#6b9478"/>{lbl}
                            </label>
                            <input className="inp" type={type} placeholder={ph} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}
                              style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:"1.5px solid #dde8e0", fontSize:15, color:"#1a3d2b", background:"#f9fbfa", transition:"border .15s,background .15s" }}/>
                          </div>
                        ))}
                        <div/>
                        <div style={{ gridColumn:"1/-1" }}>
                          <label style={{ display:"flex", alignItems:"center", gap:6, fontWeight:600, fontSize:12, color:"#1a3d2b", marginBottom:8, letterSpacing:".05em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" }}>
                            <HeartHandshake size={12} color="#6b9478"/> Special Requests (optional)
                          </label>
                          <textarea className="inp" rows={3} placeholder="Dietary needs, mobility requirements, special occasions..." value={form.note} onChange={e=>setForm({...form,note:e.target.value})}
                            style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:"1.5px solid #dde8e0", fontSize:15, color:"#1a3d2b", background:"#f9fbfa", resize:"vertical", transition:"border .15s,background .15s" }}/>
                        </div>
                      </div>
                    </div>

                    <div style={{ display:"flex", gap:12 }}>
                      <button className="btn-ghost" onClick={()=>setStep(2)} style={{ flex:1, background:"transparent", color:"#1a3d2b", border:"2px solid #1a3d2b", padding:"15px", borderRadius:12, fontSize:15, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                        <ChevronLeft size={16}/> Back
                      </button>
                      <button className="btn-primary" onClick={submit} disabled={!form.name||!form.email}
                        style={{ flex:2, background:(!form.name||!form.email)?"#a8bcad":"#1a3d2b", color:"#fff", padding:"15px", borderRadius:12, fontSize:15, fontWeight:700, cursor:(!form.name||!form.email)?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                        <Lock size={15}/> Confirm — ₹{final.toLocaleString()}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ── SIDEBAR ── */}
              <div className="sidebar-sticky">
                <div style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 6px 28px rgba(26,61,43,.1)" }}>
                  <div style={{ background:"#1a3d2b", padding:"22px 24px 20px", position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(168,196,174,.07)", pointerEvents:"none" }}/>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                      <CalendarDays size={12} color="#6b9478"/>
                      <span style={{ color:"#6b9478", fontSize:11, fontWeight:700, letterSpacing:".1em", fontFamily:"'DM Sans',sans-serif" }}>BOOKING SUMMARY</span>
                    </div>
                    {pkg?(
                      <>
                        <div style={{ borderRadius:10, overflow:"hidden", height:80, marginBottom:12 }}>
                          <img src={pkg.heroImg} alt={pkg.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.currentTarget.style.display="none"}/>
                        </div>
                        <div style={{ color:"#fff", fontSize:17, fontWeight:800, marginBottom:4, fontFamily:"'Playfair Display',serif" }}>{pkg.name}</div>
                        <div style={{ display:"flex", alignItems:"center", gap:5, color:"#8aad93", fontSize:12, flexWrap:"wrap", fontFamily:"'DM Sans',sans-serif" }}>
                          <MapPin size={11} color="#6b9478"/>{pkg.location}
                          <span style={{ opacity:.35 }}>·</span>
                          <Clock size={11} color="#6b9478"/>{pkg.duration}
                        </div>
                      </>
                    ):(
                      <div style={{ color:"#a8c4ae", fontSize:15, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>No package selected</div>
                    )}
                  </div>

                  <div style={{ padding:"20px 24px" }}>
                    {pkg?(
                      <>
                        <div style={{ display:"flex", flexDirection:"column", gap:11, marginBottom:16 }}>
                          {[
                            [CalendarDays,"Departure",`${month} 2026`],
                            [Users,"Guests",`${guests} person${guests>1?"s":""}`],
                            [Star,"Per Person",`₹${pkg.price.toLocaleString()}`],
                            ...(discount?[[BadgeCheck,"Group Discount","−10%"]]:[]),
                          ].map(([Icon,k,v])=>(
                            <div key={k} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                                <Icon size={13} color="#8aad93"/>
                                <span style={{ color:"#6b9478", fontSize:13, fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}>{k}</span>
                              </div>
                              <span style={{ color:"#1a3d2b", fontSize:13, fontWeight:700, fontFamily:"'DM Sans',sans-serif" }}>{v}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ borderTop:"1.5px dashed #e2e8e4", paddingTop:14, marginBottom:16 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                            <span style={{ fontWeight:700, fontSize:14, fontFamily:"'DM Sans',sans-serif" }}>Total</span>
                            <span style={{ fontWeight:800, fontSize:26, color:"#1a3d2b", letterSpacing:"-.5px", fontFamily:"'Playfair Display',serif" }}>₹{final.toLocaleString()}</span>
                          </div>
                          <div style={{ color:"#8aad93", fontSize:11, textAlign:"right", marginTop:2, fontFamily:"'DM Sans',sans-serif" }}>All taxes & fees included</div>
                        </div>
                      </>
                    ):(
                      <div style={{ textAlign:"center", padding:"20px 0 8px" }}>
                        <Globe size={36} color="#c9d4cb" style={{ margin:"0 auto 10px", display:"block" }}/>
                        <div style={{ fontSize:14, fontWeight:500, color:"#8aad93", fontFamily:"'DM Sans',sans-serif" }}>Select a package to see pricing</div>
                      </div>
                    )}
                    <div style={{ background:"#f6f9f7", borderRadius:12, padding:"14px 16px", border:"1px solid #e4edea" }}>
                      {[
                        [Shield,"Free cancellation up to 30 days"],
                        [Plane,"Hotel pickups & drops included"],
                        [Lock,"100% secure payment"],
                      ].map(([TI,txt],i)=>(
                        <div key={txt} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:i<2?10:0 }}>
                          <div style={{ width:26, height:26, borderRadius:7, background:"#e8f2ec", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <TI size={13} color="#1a3d2b"/>
                          </div>
                          <span style={{ color:"#2d6644", fontSize:12, fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}>{txt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop:14, background:"#1a3d2b", borderRadius:16, padding:"18px 22px", display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:"rgba(168,196,174,.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Phone size={18} color="#a8c4ae"/>
                  </div>
                  <div>
                    <div style={{ color:"#fff", fontWeight:700, fontSize:14, fontFamily:"'DM Sans',sans-serif" }}>Talk to an Expert</div>
                    <div style={{ color:"#6b9478", fontSize:13, marginTop:2, fontFamily:"'DM Sans',sans-serif" }}>+91 98000 12345</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}