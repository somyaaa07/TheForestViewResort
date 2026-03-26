import { useState, useEffect, useRef } from "react";

/* ─── Design tokens ─── */
const BG      = "#c9d4cb";
const DARK    = "#041106";
const SHADE   = "#d4ddd6";
const ACCENT  = "#041106";
const SVCDARK = "#1a2e1c";

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
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0); const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let n = 0; const step = target / 55;
        const t = setInterval(() => { n += step; if (n >= target) { setVal(target); clearInterval(t); } else setVal(Math.floor(n)); }, 22);
        o.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) o.observe(ref.current); return () => o.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── SVG Icon Library ─── */
const Ico = {
  arrow:    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4.1 11.9L11.9 4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M4.1 4.1H11.9V11.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  bath:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M9 6 L9 3 C9 2.4 9.4 2 10 2 L14 2 C14.6 2 15 2.4 15 3 L15 6"/><path d="M2 9 L22 9 L22 11 C22 15.4 18.4 19 14 19 L10 19 C5.6 19 2 15.4 2 11 Z"/><line x1="5" y1="19" x2="5" y2="22"/><line x1="19" y1="19" x2="19" y2="22"/></svg>,
  waves:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M2 12 C4.5 9 7.5 9 10 12 C12.5 15 15.5 15 18 12 C20.5 9 23 9 23 12"/><path d="M2 17 C4.5 14 7.5 14 10 17 C12.5 20 15.5 20 18 17 C20.5 14 23 14 23 17"/><path d="M2 7 C4.5 4 7.5 4 10 7 C12.5 10 15.5 10 18 7"/></svg>,
  fork:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><line x1="8" y1="2" x2="8" y2="22"/><path d="M5 2 L5 8 C5 10.2 6.3 11.5 8 12 C9.7 11.5 11 10.2 11 8 L11 2"/><line x1="17" y1="2" x2="17" y2="8"/><path d="M17 8 C17 11 14 12 14 12 L14 22"/><line x1="20" y1="2" x2="20" y2="8"/></svg>,
  wifi:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>,
  wine:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M8 2 L16 2 L20 10 C20 14.4 16.4 18 12 18 C7.6 18 4 14.4 4 10 Z"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  coffee:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M3 15 C3 17.2 4.8 19 7 19 L13 19 C15.2 19 17 17.2 17 15 L17 10 L3 10 Z"/><path d="M17 12 L19 12 C20.7 12 22 13.3 22 15 C22 16.7 20.7 18 19 18 L17 18"/><path d="M7 7 C7 5.8 7.4 5 8 4"/><path d="M11 7 C11 5.8 11.4 5 12 4"/></svg>,
  music:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M9 18 L9 5 L21 3 L21 16"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  car:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M5 17 L3 17 C2.4 17 2 16.6 2 16 L2 11 L5 5 L19 5 L22 11 L22 16 C22 16.6 21.6 17 21 17 L19 17"/><circle cx="7.5" cy="17" r="2.5"/><circle cx="16.5" cy="17" r="2.5"/><line x1="10" y1="17" x2="14" y2="17"/><path d="M2 11 L22 11"/></svg>,
  leaf:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M11 20 A8 8 0 0 0 19 12 C19 6 14 2 5 2 C5 9 7 14 11 20 Z"/><line x1="11" y1="20" x2="5" y2="10"/></svg>,
  mountain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><polygon points="3 20 12 5 21 20 3 20"/><polyline points="9 13 12 9 14 12"/></svg>,
  flame:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M8.5 14 C8.5 17 10 20 12 21 C14 20 15.5 17 15.5 14 C15.5 11 14 8 12 6 C13 9 10 10.5 9.5 13 C9 10 9.5 7 12 3 C6 5 3 9 3 14 C3 18.4 7.6 22 12 22 C16.4 22 21 18.4 21 14 C21 10 18 7 16 5 C17 8 15.5 11.5 14 13 C13.5 10 13 7.5 12 6"/></svg>,
  sun:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  bed:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M2 9 L2 20"/><path d="M22 9 L22 20"/><path d="M2 14 L22 14"/><rect x="2" y="9" width="9" height="5" rx="1"/><rect x="13" y="9" width="9" height="5" rx="1"/><path d="M2 9 C2 7 3 6 5 6 L19 6 C21 6 22 7 22 9"/></svg>,
  sparkle:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  camera:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  phone:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.01z"/></svg>,
  bell:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  plane:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4c-2 0-4 1-4 1l-8 8-2.4.8A2 2 0 0 0 4 15.8L5 17l1 1 1.2 1c.6.6 1.6.6 2.2-.1L10 18l.8 1.2c.4.6 1 1 1.7 1H14a2 2 0 0 0 1.9-2z"/></svg>,
  spa:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  dining:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><line x1="8" y1="2" x2="8" y2="10"/><path d="M5 2 L5 8 C5 10.2 6.3 11.5 8 12 C9.7 11.5 11 10.2 11 8 L11 2"/><line x1="8" y1="12" x2="8" y2="22"/><line x1="16" y1="2" x2="16" y2="8"/><path d="M16 8 C16 11 13 12 13 12 L13 22"/><line x1="19" y1="2" x2="19" y2="8"/></svg>,
  star:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  pillow:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="2" y="8" width="20" height="10" rx="5"/><path d="M7 8 C7 8 7 13 12 13 C17 13 17 8 17 8"/></svg>,
  layers:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  feather:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>,
  grid:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  map:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  hotel:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  mtn:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><polygon points="3 18 12 5 21 18 3 18"/></svg>,
  paw:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="4" cy="8" r="2"/><circle cx="6" cy="15" r="2"/><path d="M14 14c-1.1-2-3-3-5-2.5s-3.5 2.5-3.5 4.5c0 2 1.5 3.5 3.5 3.5h5c2 0 3.5-1.5 3.5-3.5 0-1.5-.9-3-2.5-4.5z"/></svg>,
  trophy:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polyline points="8 21 12 21 16 21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 4H17V11C17 13.8 14.8 16 12 16C9.2 16 7 13.8 7 11V4Z"/><path d="M7 5H4C4 5 3 9 7 10"/><path d="M17 5H20C20 5 21 9 17 10"/></svg>,
  calDate:  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><rect x="2" y="4" width="16" height="14" rx="2"/><path d="M6 2v4M14 2v4M2 9h16"/></svg>,
  key:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="7.5" cy="15.5" r="4.5"/><path d="M21 2l-9.6 9.6"/><path d="M15.5 7.5l3 3L21 8l-3-3"/></svg>,
  globe:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  kite:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4c-2 0-4 1-4 1l-8 8-2.4.8A2 2 0 0 0 4 15.8L5 17l1 1 1.2 1c.6.6 1.6.6 2.2-.1L10 18l.8 1.2c.4.6 1 1 1.7 1H14a2 2 0 0 0 1.9-2z"/></svg>,
};

const CatIcons = [
  <svg key="0" viewBox="0 0 57 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34"><path d="M32.9 44.8H24.1V55h8.8V44.8z"/><path d="M32.9 9.4H42.5V55H14.5V9.4h9.7"/><path d="M53.1 26H42.5V55h10.6V26z"/><path d="M14.5 26H3.9V55h10.6V26z"/><path d="M25.8 31.3H19.4v8.3h6.5v-8.3z"/><path d="M37.6 31.3h-6.4v8.3h6.4v-8.3z"/></svg>,
  <svg key="1" viewBox="0 0 57 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34"><path d="M41.8 27H15.2v-6.3h26.6V27z"/><path d="M35 55H22V37h13V55z"/><path d="M1.6 55h53.8"/><path d="M41.8 55H15.2V31.7h26.6V55z"/><path d="M52 55H41.8V37.2H52V55z"/></svg>,
  <svg key="2" viewBox="0 0 57 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34"><path d="M15.9 9.9c8.17-3.01 16.6-2.84 25.2 0"/><path d="M41.1 55H15.9V3.3c8.17-3.01 16.6-2.84 25.2 0V55z"/><path d="M15.9 23.1c8.17-3.01 16.6-2.84 25.2 0"/><path d="M34.5 40.6H22.5V55h12V40.6z"/></svg>,
  <svg key="3" viewBox="0 0 57 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34"><path d="M35.3 13.3H21.7V25.1h13.6V13.3z"/><path d="M54 30.6H3v21.5h51V30.6z"/><path d="M55.4 25.1H1.6v5.4h53.8v-5.4z"/><path d="M42.8 3.8H14.2V25.1h28.6V3.8z"/></svg>,
  <svg key="4" viewBox="0 0 57 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34"><path d="M41.9 24l8.7 5.6V55H40.4"/><path d="M15.7 55H6.4V26.2l9.3-6.6V55z"/><path d="M41.8 14.4H29.3V55h12.5V14.4z"/><path d="M4.5 55h48"/></svg>,
];

const CATS = [
  { title:"Luxury Hotels",   count:"160+ Hotels" },
  { title:"Boutique Hotels", count:"245+ Hotels" },
  { title:"Resort Hotels",   count:"137+ Hotels" },
  { title:"Business Hotels", count:"230+ Hotels" },
  { title:"Eco Hotels",      count:"250+ Hotels" },
];

const ROOMS = [
  { title:"Golden Horizon Retreat",  price:130, type:"Double", persons:"2 Persons", rating:4.8, reviews:124, tag:"Popular",  img:"/9.jpeg", amenities:["bath","waves","fork","wifi"] },
  { title:"Serenity Grand Hotel",    price:280, type:"Single", persons:"2 Persons", rating:4.9, reviews:98,  tag:"Premium",  img:"/10.jpeg", amenities:["bath","waves","wine","wifi"] },
  { title:"The Velvet Orchid",       price:150, type:"Single", persons:"1 Person",  rating:4.7, reviews:76,  tag:"Cozy",     img:"/11.jpeg", amenities:["bath","coffee","music","wifi"] },
  { title:"Royal Horizon Suites",    price:160, type:"Triple", persons:"3 Persons", rating:4.8, reviews:213, tag:"Family",   img:"/12.jpeg", amenities:["bath","waves","fork","car"] },
  { title:"The Heritage Charm",      price:220, type:"Single", persons:"2 Persons", rating:4.9, reviews:157, tag:"Heritage", img:"/13.jpeg", amenities:["bath","leaf","wine","wifi"] },
  { title:"Whispering Pines Resort", price:175, type:"Double", persons:"2 Persons", rating:4.6, reviews:89,  tag:"Nature",   img:"/14.jpeg", amenities:["leaf","mountain","fork","flame"] },
];

const TESTI = [
  { name:"Samuel Smith", role:"Heritage Hunter",      img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  { name:"Olivia Brown", role:"Vacation Planner",     img:"https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face" },
  { name:"James Miller", role:"Corporate Guest",      img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
  { name:"Lucas Moore",  role:"Travel Photographer",  img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" },
  { name:"Ava Johnson",  role:"Lifestyle Influencer", img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
];

const BLOGS = [
  { title:"Your Journey Starts With Us", date:"October 19, 2025", img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=85",  text:"From eco-friendly resorts to personalized services, we curate every detail for your perfect escape." },
  { title:"Where Stay Feels Special",    date:"October 17, 2025", img:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=85", text:"Our carefully curated hotels combine world-class comfort with local charm and authentic experiences." },
  { title:"From Click To Comfort",       date:"October 15, 2025", img:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&q=85",  text:"From the moment you arrive, we focus on creating memories that last a lifetime." },
];

const BED_HOTSPOTS = {
  twin: [
    { id:0, top:"20%",    left:"44%",            label:"Premium Pillow",   ik:"pillow",  desc:"Hungarian goose-down pillow with 800-fill power. Hypoallergenic casing with temperature-regulating micro-gel fibres.", spec:"Fill Power: 800 | Thread Count: 600 | Size: 50×75 cm" },
    { id:1, top:"52%",    left:"20%",            label:"Mattress Topper",  ik:"layers",  desc:"3-inch memory foam topper with copper-infused gel layer. Contours to body shape and keeps you cool all night.",          spec:"Depth: 8 cm | Density: 60 kg/m³ | Cover: Bamboo fabric" },
    { id:2, top:"52%",    right:"20%",           label:"Duvet Cover",      ik:"feather", desc:"400 thread-count Egyptian cotton duvet in a sateen weave. Crisp yet silky finish, OEK-Tex certified non-toxic.",         spec:"TC: 400 | Material: 100% Egyptian Cotton | Weight: 300 gsm" },
    { id:3, bottom:"14%", left:"50%", tX:"-50%", label:"Bed Frame",        ik:"grid",    desc:"Solid white oak slat bed frame with hand-oiled finish. Low-profile Scandinavian silhouette, noiseless locking joints.",  spec:"Load: 400 kg | Height: 32 cm | Wood: FSC-certified Oak" },
  ],
  king: [
    { id:0, top:"20%",    left:"44%",            label:"King Pillow Set",        ik:"pillow",  desc:"Oversized king pillows filled with Hungarian white-goose down clusters. Dual-chamber design for customisable loft.", spec:"Fill Power: 850 | TC: 700 | Size: 50×90 cm" },
    { id:1, top:"52%",    left:"20%",            label:"Pocket Spring Mattress",  ik:"layers",  desc:"2000 individual pocket springs wrapped in natural latex. Zero partner-disturbance and breathable cashmere-blend top.", spec:"Springs: 2000 | Depth: 32 cm | Top: Cashmere blend" },
    { id:2, top:"52%",    right:"20%",           label:"Luxury Throw",            ik:"feather", desc:"Super-soft merino-wool throw blanket in a natural undyed shade. Woven in Scotland, machine washable.",              spec:"Wool: 100% Merino | Weight: 400 gsm | Size: 200×150 cm" },
    { id:3, bottom:"14%", left:"50%", tX:"-50%", label:"Platform Base",           ik:"grid",    desc:"Solid American walnut platform base with upholstered leather headboard. Integrated USB-C and wireless charging.",    spec:"Load: 600 kg | Height: 38 cm | Charging: 15W wireless" },
  ],
};

const SERVICES = [
  { num:"01", title:"Concierge & Butler", ik:"bell",     text:"Round-the-clock personal concierge to handle every request — from private dining reservations and spa bookings to city tours and anniversary setups.",          tags:["24/7 Available","Multilingual","Personal Butler"] },
  { num:"02", title:"Airport Transfers",  ik:"plane",    text:"Seamless door-to-door airport transfers in premium vehicles. Meet & greet service, real-time flight tracking and luxury sedans or SUVs for every group.",      tags:["Flight Tracking","Luxury Fleet","Meet & Greet"] },
  { num:"03", title:"Spa & Wellness",     ik:"spa",      text:"Award-winning wellness sanctuary offering bespoke massages, Ayurvedic rituals, hydrotherapy pools and a state-of-the-art gym with personal trainers.",          tags:["In-room Massage","Hydrotherapy","Fitness Centre"] },
  { num:"04", title:"Fine Dining",        ik:"dining",   text:"Five-star culinary experiences spanning local heritage menus, international à la carte, private candlelit dinners and live chef stations for special occasions.", tags:["Private Dining","Chef's Table","Room Service"] },
  { num:"05", title:"Kids Club",          ik:"star",     text:"Supervised adventure zones, creative arts workshops and age-appropriate activity programmes so parents relax while little ones create holiday memories.",          tags:["Age 3–12","Supervised","Daily Activities"] },
  { num:"06", title:"Event Planning",     ik:"calendar", text:"Dedicated event specialists to orchestrate weddings, corporate retreats and celebrations — floral design, AV setup, catering and photography all in one.",      tags:["Weddings","Corporate","Bespoke Decor"] },
];

/* ─── Footer ─── */
function Footer() {
  const FL = {
    Company:["About Us","Our Team","Careers","Press & Media","Sustainability"],
    Explore:["Luxury Hotels","Boutique Hotels","Resort Hotels","Business Hotels","Eco Hotels"],
    Support:["Help Center","Booking Policy","Cancellation","Privacy Policy","Terms of Service"],
  };
  const SOC = [
    { l:"Instagram", i:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg> },
    { l:"Twitter",   i:<svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { l:"Facebook",  i:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
    { l:"LinkedIn",  i:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  ];
  return (
    <footer style={{ background:DARK, color:BG }}>
      <div style={{ borderBottom:"1px solid rgba(201,212,203,.1)", padding:"44px clamp(18px,4vw,48px)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:28, maxWidth:1380, margin:"0 auto" }}>
        <div style={{ minWidth:0 }}>
          <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(201,212,203,.35)", marginBottom:8 }}>STAY IN THE LOOP</p>
          <h3 className="marc" style={{ fontSize:"clamp(16px,2.4vw,32px)", fontWeight:400, color:"rgba(201,212,203,.88)", lineHeight:1.22 }}>Get Exclusive Deals &amp; Travel Stories</h3>
        </div>
        <div style={{ display:"flex", maxWidth:420, width:"100%", flexShrink:0 }}>
          <input className="ft-input" type="email" placeholder="Your email address" />
          <button className="ft-sub-btn">SUBSCRIBE {Ico.arrow}</button>
        </div>
      </div>
      <div style={{ maxWidth:1380, margin:"0 auto", padding:"60px clamp(18px,4vw,48px) 48px" }}>
        <div className="ft-cols">
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
              <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(201,212,203,.12)", border:"1px solid rgba(201,212,203,.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#c9d4cb" strokeWidth="1.4" width="16" height="16"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <span className="marc" style={{ fontSize:"clamp(16px,2vw,22px)", color:"#c9d4cb", fontWeight:400, letterSpacing:".04em" }}>THE FOREST VIEW</span>
            </div>
            <p style={{ fontSize:14, lineHeight:1.82, color:"rgba(201,212,203,.46)", marginBottom:26, maxWidth:270 }}>Discover the world's finest hotels through seamless, effortless booking. Your journey begins with a single click.</p>
            <div style={{ display:"flex", gap:9, marginBottom:28, flexWrap:"wrap" }}>
              {SOC.map(s => <a key={s.l} href="#" className="ft-social" aria-label={s.l}>{s.i}</a>)}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(201,212,203,.06)", border:"1px solid rgba(201,212,203,.12)", padding:"11px 14px" }}>
              <span style={{ color:"rgba(201,212,203,.7)", flexShrink:0 }}>{Ico.trophy}</span>
              <div>
                <p style={{ fontSize:11, color:"rgba(201,212,203,.82)", fontWeight:600, letterSpacing:".06em" }}>BEST HOTEL APP 2024</p>
                <p style={{ fontSize:11, color:"rgba(201,212,203,.36)", marginTop:2 }}>Travel Awards, Global</p>
              </div>
            </div>
          </div>
          {Object.entries(FL).map(([h,links]) => (
            <div key={h}>
              <h5 style={{ fontSize:11, fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(201,212,203,.5)", marginBottom:18 }}>{h}</h5>
              {links.map(l => <a key={l} href="#" className="ft-link">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="stats-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(201,212,203,.07)", overflow:"hidden", marginTop:48 }}>
          {[["146+","Hotels & Resorts"],["28k+","Happy Travelers"],["56","Countries"],["4.9","Avg Rating"]].map(([n,l],i) => (
            <div key={i} style={{ padding:"26px 20px", background:"rgba(201,212,203,.04)", borderRight:i<3?"1px solid rgba(201,212,203,.08)":"none", textAlign:"center" }}>
              <div className="marc" style={{ fontSize:"clamp(20px,2.8vw,38px)", color:"rgba(201,212,203,.8)", lineHeight:1, marginBottom:7 }}>{n}</div>
              <p style={{ fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(201,212,203,.33)" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height:1, background:"rgba(201,212,203,.1)" }} />
      <div style={{ maxWidth:1380, margin:"0 auto", padding:"20px clamp(18px,4vw,48px)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
        <p style={{ fontSize:13, color:"rgba(201,212,203,.3)" }}>© {new Date().getFullYear()} THE FOREST VIEW. All rights reserved.</p>
        <div style={{ display:"flex", gap:22, flexWrap:"wrap" }}>
          {["Privacy Policy","Terms of Use","Cookie Settings"].map(l => <a key={l} href="#" style={{ fontSize:12, color:"rgba(201,212,203,.33)", textDecoration:"none" }}>{l}</a>)}
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function SafarHomePage() {
  const [slide,    setSlide]    = useState(0);
  const [catIdx,   setCatIdx]   = useState(0);
  const [bedTab,   setBedTab]   = useState(0);
  const [adults,   setAdults]   = useState(1);
  const [children, setChildren] = useState(0);
  const [checkIn,  setCheckIn]  = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [activeHS, setActiveHS] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());

  useEffect(() => { const t = setInterval(() => setSlide(p => (p+1) % TESTI.length), 4500); return () => clearInterval(t); }, []);
  useEffect(() => {
    const h = (e) => { if (!e.target.closest(".hotspot") && !e.target.closest(".hs-popup")) setActiveHS(null); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);

  const toggleWish = (i) => setWishlist(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const hotspots = bedTab === 0 ? BED_HOTSPOTS.twin : BED_HOTSPOTS.king;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background:BG, color:DARK, fontFamily:"'Jost',sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Marcellus&display=swap');
       
        *,*::before,*::after{box-sizing:border-box}
        body{overflow-x:hidden}
        img{max-width:100%}
        button,input,select,textarea{font:inherit}
        .marc{font-family:'Marcellus',serif}

        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(4,17,6,.35)}50%{box-shadow:0 0 0 9px rgba(4,17,6,0)}}
        @keyframes fadeUpCentered{from{opacity:0;transform:translate(-50%,-50%) translateY(12px)}to{opacity:1;transform:translate(-50%,-50%) translateY(0)}}

        .spin{animation:spin 8s linear infinite}

        /* ═══════════ SECTION WRAPPER ═══════════ */
        .sec-wrap{
          max-width:1380px;
          margin:0 auto;
          padding:0 clamp(16px,4vw,48px);
          width:100%;
        }
        .sec-wrap > *{min-width:0}

        /* ═══════════ SECTION HEADER ROW ═══════════ */
        .sec-head-row{
          display:flex;
          justify-content:space-between;
          align-items:flex-end;
          flex-wrap:nowrap;
          gap:clamp(14px,3vw,22px);
        }
        .sec-head-text{
          flex:1 1 0;
          min-width:0;
        }
        .sec-head-actions{
          display:flex;
          gap:10px;
          flex-shrink:0;
          align-items:center;
        }

        .nav-round-btn{
          width:44px;height:44px;
          border:1.5px solid rgba(4,17,6,.2);
          background:none;
          cursor:pointer;
          font-size:18px;
          border-radius:12px;
          display:flex;
          align-items:center;
          justify-content:center;
          transition:background .2s,border-color .2s,transform .15s;
          flex-shrink:0;
        }
        .nav-round-btn:hover{background:rgba(4,17,6,.04)}
        .nav-round-btn:active{transform:scale(.96)}
        .nav-round-btn--dark{
          border-color:${DARK};
          background:${DARK};
          color:${BG};
        }
        .nav-round-btn--dark:hover{background:#1a2e1c;border-color:#1a2e1c}
        .nav-round-btn--lg{width:46px!important;height:46px!important;font-size:17px!important}

        .sec-head-link{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:8px;
          text-align:center;
          flex-shrink:0;
          box-sizing:border-box;
          white-space:nowrap;
        }

        .bed-tabs-shell{
          display:flex;
          justify-content:center;
          margin:0 0 clamp(24px,3vw,36px);
        }
        .bed-tabs-inner{
          display:flex;
          background:#ede8e2;
          padding:4px;
          border-radius:14px;
          max-width:100%;
          flex-wrap:wrap;
          justify-content:center;
          gap:4px;
        }
        .about-feature-col{position:relative;overflow:visible}
        .about-feature-img{
          width:100%;
          height:clamp(260px,52vw,420px);
          object-fit:cover;
          object-position:top;
          display:block;
          border-radius:12px;
        }
        .about-spin-badge{
          position:absolute;
          bottom:-26px;
          right:-8px;
          width:100px;
          height:100px;
          border-radius:50%;
          background:${DARK};
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
        }

        /* ════════════════════════════════════════
           HERO — FULLY RESPONSIVE
        ════════════════════════════════════════ */

        /* Base: full-screen hero, image bg */
        .hero-outer{
          position:relative;
          background-image:url('/banner.jpg');
          background-size:cover;
          background-position:center;
          /* Let height be driven by content on small screens */
          min-height:100svh;
        }
        .hero-overlay{
          position:absolute;inset:0;
          background:linear-gradient(120deg,rgba(4,17,6,.82) 0%,rgba(4,17,6,.48) 55%,rgba(4,17,6,.62) 100%);
        }
        .hero-inner{
          position:relative;z-index:2;
          max-width:1380px;margin:0 auto;
          padding:0 clamp(16px,4vw,48px);
          width:100%;
        }

        /* ── LAYOUT SHELL ──
           Desktop (≥1024): two columns side by side, fills full viewport
           Tablet / Mobile (<1024): single column, stacked, auto height
        */
        .hero-layout{
          display:flex;
          align-items:stretch;
          justify-content:space-between;
          gap:clamp(20px,3vw,48px);
          width:100%;
          /* Desktop: content fills full height, padded top+bottom */
          min-height:100svh;
          padding-top:clamp(80px,10vh,120px);
          padding-bottom:clamp(36px,6vh,72px);
        }

        /* LEFT col — heading + vid-card */
        .hero-left{
          flex:1 1 0;
          min-width:0;
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
          padding-bottom:8px;
        }
        /* Heading size — desktop */
        .hero-h1{
          font-size:clamp(38px,5vw,112px);
          color:#fff;
          font-weight:400;
          line-height:.92;
          margin:0;
        }

        /* RIGHT col — booking form */
        .hero-right{
          flex-shrink:0;
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
          align-items:flex-end;
          padding-bottom:8px;
          width:clamp(300px,35vw,430px);
        }

        /* ── VID CARD ── */
        .vid-card{
          background:rgba(4,17,6,.72);
          backdrop-filter:blur(18px);
          -webkit-backdrop-filter:blur(18px);
          border:1px solid rgba(255,255,255,.16);
          padding:clamp(12px,2vw,18px) clamp(14px,2vw,18px);
          display:flex;
          align-items:center;
          gap:clamp(12px,2vw,16px);
          max-width:min(380px, 100%);
          border-radius:16px;
          box-shadow:0 20px 56px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.12);
          width:100%;
        }
        .vid-card p{overflow-wrap:anywhere}
        .vid-card__thumb{
          position:relative;
          flex-shrink:0;
          width:clamp(72px,18vw,100px);
          aspect-ratio:4/3;
          max-height:88px;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 8px 24px rgba(0,0,0,.35);
          border:1px solid rgba(255,255,255,.2);
        }
        .vid-card__thumb img{width:100%;height:100%;object-fit:cover;display:block}
        .vid-card__overlay{
          position:absolute;inset:0;
          display:flex;align-items:center;justify-content:center;
          background:rgba(0,0,0,.28);
        }
        .vid-card__play{
          width:34px;height:34px;border-radius:50%;
          background:rgba(255,255,255,.94);
          display:flex;align-items:center;justify-content:center;
          color:${DARK};
          font-size:12px;padding-left:3px;
          box-shadow:0 4px 14px rgba(0,0,0,.2);
        }
        .vid-card__body{min-width:0;flex:1}
        .vid-card__title{
          color:#fff;
          font-size:clamp(14px,1.6vw,18px);
          margin:0 0 6px;
          font-weight:500;
          letter-spacing:.01em;
        }
        .vid-card__desc{
          color:rgba(255,255,255,.52);
          font-size:clamp(11.5px,1.35vw,13.5px);
          line-height:1.62;
          margin:0;
        }
        .hero-easy-pill{
          border-radius:999px;
          overflow:hidden;
          border:2px solid rgba(255,255,255,.35);
          flex-shrink:0;
          box-shadow:0 10px 28px rgba(0,0,0,.22);
        }

        /* ── BOOKING FORM CARD ── */
        .hf-wrap{
          background:rgba(255,255,255,.97);
          backdrop-filter:blur(22px);
          -webkit-backdrop-filter:blur(22px);
          padding:clamp(18px,2.5vw,32px) clamp(14px,2vw,28px) clamp(16px,2vw,28px);
          box-shadow:0 32px 80px rgba(4,17,6,.28),0 8px 24px rgba(4,17,6,.14);
          width:100%;
          border-radius:16px;
          border:1px solid rgba(255,255,255,.85);
        }
        .hf-title{
          font-size:clamp(17px,2vw,22px);
          font-weight:400;
          color:${DARK};
          margin-bottom:clamp(12px,1.5vw,20px);
          text-align:center;
        }
        .hf-grid-2{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
          margin-bottom:10px;
        }
        .hf-label{
          display:block;
          font-size:10px;
          font-weight:700;
          letter-spacing:.16em;
          text-transform:uppercase;
          color:rgba(4,17,6,.45);
          margin-bottom:6px;
        }
        .hf-date-box{
          position:relative;display:flex;align-items:center;
          border:1.5px solid rgba(4,17,6,.12);
          height:clamp(40px,5vw,48px);
          overflow:hidden;
          transition:border-color .25s;
          background:#fafaf9;
        }
        .hf-date-box:focus-within{border-color:${DARK};background:#fff}
        .hf-date-input{
          flex:1;height:100%;border:none;outline:none;
          padding:0 8px;font-family:'Jost',sans-serif;
          font-size:clamp(11px,1.2vw,13px);color:${DARK};background:transparent;
          cursor:pointer;min-width:0;width:100%;
        }
        .hf-date-icon{
          padding:0 8px;color:rgba(4,17,6,.3);
          pointer-events:none;flex-shrink:0;display:flex;align-items:center;
        }
        .hf-counter-box{
          display:flex;align-items:center;justify-content:space-between;
          border:1.5px solid rgba(4,17,6,.12);
          height:clamp(40px,5vw,48px);
          padding:0 10px;background:#fafaf9;
        }
        .hf-counter-btn{
          width:26px;height:26px;border-radius:50%;
          border:1.5px solid rgba(4,17,6,.15);
          background:none;cursor:pointer;font-size:16px;
          display:flex;align-items:center;justify-content:center;
          color:${DARK};transition:all .2s;
          font-family:'Jost',sans-serif;line-height:1;flex-shrink:0;
        }
        .hf-counter-btn:hover{background:${DARK};color:#fff;border-color:${DARK}}
        .hf-divider{height:1px;background:rgba(4,17,6,.07);margin:clamp(10px,1.5vw,18px) 0}
        .hf-cta{
          width:100%;height:clamp(44px,5vw,52px);
          background:${DARK};border:none;color:#fff;
          font-size:clamp(10px,1.1vw,11px);font-weight:700;
          letter-spacing:.12em;text-transform:uppercase;
          cursor:pointer;font-family:'Jost',sans-serif;
          display:flex;align-items:center;justify-content:center;
          gap:10px;transition:background .25s,transform .2s,box-shadow .25s;
          white-space:nowrap;padding:0 12px;
          border-radius:0;
        }
        .hf-cta:hover{background:#1a2e1c;transform:translateY(-2px);box-shadow:0 8px 24px rgba(4,17,6,.4)}
        .hf-cta:active{transform:translateY(0)}
        .hf-cta-icon{
          width:28px;height:28px;flex-shrink:0;
          background:rgba(255,255,255,.18);
          display:flex;align-items:center;justify-content:center;
          font-size:16px;font-weight:300;
        }

        /* ══════════════════════════════════
           OTHER SECTIONS (unchanged)
        ══════════════════════════════════ */

        /* ── ROOM CARDS ── */
        .rooms-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,24px)}
        .r-card{background:#fff;overflow:hidden;border-radius:12px;box-shadow:0 4px 20px rgba(4,17,6,.08);transition:transform .35s,box-shadow .35s;display:flex;flex-direction:column}
        .r-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(4,17,6,.16)}
        .r-img-wrap{position:relative;overflow:hidden;height:clamp(180px,20vw,220px);flex-shrink:0}
        .r-img{width:100%;height:100%;object-fit:cover;transition:transform .7s}
        .r-card:hover .r-img{transform:scale(1.07)}
        .r-tag{position:absolute;top:14px;left:14px;background:rgba(4,17,6,.76);backdrop-filter:blur(8px);color:#c9d4cb;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:5px 12px}
        .r-wish{position:absolute;top:14px;right:14px;width:36px;height:36px;background:rgba(255,255,255,.9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:all .25s;box-shadow:0 2px 10px rgba(0,0,0,.12)}
        .r-wish:hover{background:#fff;transform:scale(1.1)}
        .r-body{padding:clamp(14px,1.5vw,18px);flex:1;display:flex;flex-direction:column}
        .r-amenity{width:32px;height:32px;background:rgba(4,17,6,.05);display:flex;align-items:center;justify-content:center;color:${DARK}}
        .r-book-btn{margin-top:auto;padding-top:14px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(4,17,6,.07);flex-wrap:wrap;gap:8px}
        .r-bk-cta{background:${DARK};color:#fff;border:none;padding:9px 16px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;font-family:'Jost',sans-serif;transition:background .2s;white-space:nowrap}
        .r-bk-cta:hover{background:#1a2e1c}

        .section-rooms{background:linear-gradient(165deg,#0f1f13 0%,#1b3322 52%,#102015 100%)}
        .section-rooms .r-card--pro{background:#f6fbf7!important;border-radius:18px;border:2px solid rgba(5,27,14,.35)!important;box-shadow:0 2px 0 rgba(4,17,6,.14),0 20px 48px rgba(0,0,0,.28)!important;overflow:hidden}
        .section-rooms .r-card--pro:hover{transform:translateY(-4px);box-shadow:0 6px 0 rgba(4,17,6,.2),0 30px 64px rgba(0,0,0,.34)!important;border-color:rgba(5,27,14,.55)!important}
        .section-rooms .r-card--pro .r-img-wrap{height:clamp(190px,44vw,230px);border-radius:0}
        .section-rooms .r-card--pro .r-img-wrap::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(4,17,6,.75) 0%,rgba(4,17,6,.15) 45%,transparent 72%);pointer-events:none}
        .section-rooms .r-card--pro .r-tag{top:12px;left:12px;background:${DARK};color:#e8f0e9;border:1px solid rgba(232,240,233,.28);letter-spacing:.12em;font-weight:800;box-shadow:0 6px 16px rgba(0,0,0,.24)}
        .section-rooms .r-card--pro .r-price-float{position:absolute;bottom:0;left:0;right:0;padding:12px 14px 14px;display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 10px;z-index:2}
        .section-rooms .r-card--pro .r-price-float .r-price-label{font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:rgba(232,240,233,.9)}
        .section-rooms .r-card--pro .r-price-float .r-price-num{font-family:'Marcellus',serif;font-size:clamp(1.35rem,4.5vw,1.65rem);font-weight:400;color:#fff;text-shadow:0 1px 12px rgba(0,0,0,.25)}
        .section-rooms .r-card--pro .r-price-float .r-price-unit{font-size:12px;color:rgba(232,240,233,.88)}
        .section-rooms .r-card--pro .r-wish{z-index:3;border:1px solid rgba(4,17,6,.2);background:#fff}
        .section-rooms .r-card--pro .r-body{background:linear-gradient(180deg,#eef7f0 0%,#ffffff 70%);padding:clamp(16px,3vw,20px) clamp(15px,2.5vw,18px) clamp(14px,2vw,18px);border-top:4px solid ${DARK}}
        .section-rooms .r-card--pro .r-pro-title-row{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:12px}
        .section-rooms .r-card--pro .r-pro-title{font-size:clamp(15px,2.6vw,18px);font-weight:500;color:${DARK};line-height:1.28;margin:0;flex:1;min-width:0}
        .section-rooms .r-card--pro .r-rating-stack{display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0}
        .section-rooms .r-card--pro .r-rating-pill{display:inline-flex;align-items:center;gap:5px;background:${DARK};color:#e8f0e9;padding:5px 10px;border-radius:8px;font-size:12px;font-weight:700;border:1px solid rgba(255,255,255,.12)}
        .section-rooms .r-card--pro .r-reviews-note{font-size:11px;font-weight:600;color:rgba(4,17,6,.55)}
        .section-rooms .r-card--pro .r-meta-row{display:flex;align-items:center;flex-wrap:wrap;gap:8px 12px;margin-bottom:14px;font-size:13px;font-weight:500;color:${DARK}}
        .section-rooms .r-card--pro .r-meta-row svg{opacity:.85;color:${DARK}}
        .section-rooms .r-card--pro .r-meta-dot{width:4px;height:4px;border-radius:50%;background:rgba(4,17,6,.35);flex-shrink:0}
        .section-rooms .r-card--pro .r-amenity-strip{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:4px}
        .section-rooms .r-card--pro .r-amenity{width:38px;height:38px;border-radius:10px;background:rgba(4,17,6,.06);border:1px solid rgba(4,17,6,.12);color:${DARK}}
        .section-rooms .r-card--pro .r-book-btn{border-top:1px solid rgba(4,17,6,.12);padding-top:16px;margin-top:14px;gap:12px}
        .section-rooms .r-card--pro .r-bk-cta{border-radius:10px;padding:11px 20px;font-size:11px;letter-spacing:.11em;box-shadow:0 4px 16px rgba(4,17,6,.2)}
        .section-rooms .r-card--pro .r-link-explore{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${DARK};text-decoration:none;padding:10px 12px;border-radius:10px;border:1.5px solid rgba(4,17,6,.25);background:#ffffff}
        .section-rooms .r-card--pro .r-link-explore:hover{background:${DARK};color:#e8f0e9;border-color:${DARK}}

        /* ── HOTSPOT ── */
        .hotspot{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.95);border:2px solid rgba(4,17,6,.4);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;font-weight:700;color:${DARK};box-shadow:0 2px 12px rgba(0,0,0,.15);transition:all .25s;animation:pulse 2.5s ease-in-out infinite;touch-action:manipulation}
        .hotspot:hover,.hotspot.hs-on{background:${DARK};color:#fff;border-color:${DARK};transform:scale(1.15);animation:none;box-shadow:0 4px 18px rgba(4,17,6,.45)}
        .hs-popup{position:absolute;background:#fff;box-shadow:0 20px 60px rgba(4,17,6,.2),0 4px 16px rgba(4,17,6,.1);padding:clamp(14px,1.5vw,20px) clamp(14px,1.5vw,22px);width:clamp(200px,25vw,260px);z-index:50;bottom:calc(100% + 14px);left:50%;transform:translateX(-50%);animation:fadeUp .22s ease}
        .hs-popup p{overflow-wrap:anywhere}

        /* ── ABOUT ── */
        .about-grid{display:grid;grid-template-columns:320px 1fr 300px;gap:clamp(24px,4vw,48px);align-items:start}

        /* ── CATEGORIES ── */
        .cat-wrap{display:flex;gap:clamp(10px,2vw,20px);flex-wrap:wrap;justify-content:center}
        .cat-item{transition:transform .3s;cursor:pointer;text-align:center;flex:1 1 clamp(80px,16%,130px);max-width:140px;min-width:0}
        .cat-item:hover{transform:translateY(-5px)}

        /* ── SERVICES ── */
        .svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,1.5vw,20px)}
        .svc-card{padding:clamp(22px,2.5vw,32px) clamp(18px,2vw,28px);position:relative;overflow:hidden;border-radius:14px;transition:transform .3s,box-shadow .3s;cursor:default}
        .svc-card:hover{transform:translateY(-5px)}
        .svc-tag{display:inline-block;padding:4px 10px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(201,212,203,.1);color:rgba(201,212,203,.72);border:1px solid rgba(201,212,203,.15)}

        /* ── WHY ── */
        .why-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:clamp(14px,2vw,20px)}
        .ww{background:#fff;padding:clamp(22px,2.5vw,30px) clamp(18px,2vw,24px);position:relative;border-radius:14px;box-shadow:0 2px 18px rgba(4,17,6,.07);transition:box-shadow .3s}
        .ww:hover{box-shadow:0 8px 30px rgba(4,17,6,.13)}
        .wd{background:${DARK};padding:clamp(22px,2.5vw,30px) clamp(18px,2vw,24px);position:relative;border-radius:14px;box-shadow:0 6px 26px rgba(4,17,6,.28)}
        .w-ico{width:50px;height:50px;border-radius:50%;border:1.5px solid rgba(4,17,6,.15);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
        .w-ico-d{width:50px;height:50px;border-radius:50%;border:1.5px solid rgba(201,212,203,.22);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
        .ck-row{display:flex;align-items:flex-start;gap:14px;padding:10px 0;cursor:default}
        .ck-icon{width:22px;height:22px;border-radius:50%;min-width:22px;background:rgba(4,17,6,.06);border:1px solid rgba(4,17,6,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${DARK};transition:all .3s}
        .ck-row:hover .ck-icon{background:${DARK};color:#fff;border-color:${DARK}}

        /* ── RESTAURANT ── */
        .rest-grid{display:grid;grid-template-columns:1fr 1.15fr 1fr;gap:clamp(16px,2.5vw,28px);align-items:start}

        /* ── TESTIMONIALS ── */
        .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,2vw,20px)}
        .testi-card{border-radius:14px}

        /* ── BLOGS ── */
        .blogs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,24px)}
        .b-card{background:#fff;overflow:hidden;box-shadow:0 2px 12px rgba(4,17,6,.06);border-radius:12px}
        .b-img{transition:transform .6s;width:100%;height:100%;object-fit:cover;display:block}
        .b-card:hover .b-img{transform:scale(1.05)}

        /* ── BED TABS ── */
        .bed-tab{padding:clamp(8px,1vw,11px) clamp(16px,2vw,30px);font-size:clamp(13px,1.3vw,15px);font-weight:600;cursor:pointer;border:none;background:none;font-family:'Jost',sans-serif;transition:all .3s;white-space:nowrap;border-radius:10px}

        /* ── CTA ── */
        .cta-section{padding:clamp(52px,8vw,80px) 0;background:${BG};position:relative;overflow:hidden}
        .cta-inner{max-width:1380px;margin:0 auto;padding:0 clamp(16px,4vw,48px);display:flex;align-items:center;justify-content:space-between;gap:32px}
        .cta-circle-wrap{width:clamp(100px,50vw,144px);height:clamp(100px,50vw,144px);border-radius:50%;overflow:hidden;border:2px solid rgba(4,17,6,.12);box-shadow:0 4px 28px rgba(4,17,6,.18);flex-shrink:0}
        .cta-circle-wrap img{width:100%;height:100%;object-fit:cover}
        .cta-label{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(4,17,6,.4);margin-bottom:16px}
        .cta-heading{font-size:clamp(22px,3.8vw,52px);color:${DARK};font-weight:400;line-height:1.18;margin-bottom:14px}
        .cta-body{font-size:clamp(13px,1.5vw,15px);color:rgba(4,17,6,.55);line-height:1.78;margin-bottom:30px}
        .cta-btn{display:inline-flex;align-items:center;gap:12px;background:${DARK};color:${BG};border:1px solid ${DARK};padding:14px 32px;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;font-family:'Jost',sans-serif;transition:background .25s,border-color .25s}
        .cta-btn:hover{background:#1a2e1c;border-color:#1a2e1c}
        .cta-btn-icon{width:28px;height:28px;border-radius:50%;background:rgba(201,212,203,.18);display:flex;align-items:center;justify-content:center;color:${BG}}

        /* ── FOOTER ── */
        .ft-link{font-size:14px;color:rgba(201,212,203,.5);text-decoration:none;display:block;padding:5px 0;transition:color .25s,padding-left .25s}
        .ft-link:hover{color:#c9d4cb;padding-left:4px}
        .ft-social{width:42px;height:42px;border-radius:50%;border:1px solid rgba(201,212,203,.18);display:flex;align-items:center;justify-content:center;color:rgba(201,212,203,.55);cursor:pointer;transition:background .25s,color .25s;text-decoration:none}
        .ft-social:hover{background:rgba(201,212,203,.12);color:#c9d4cb;border-color:rgba(201,212,203,.45)}
        .ft-input{flex:1;height:46px;background:rgba(201,212,203,.07);border:1px solid rgba(201,212,203,.15);color:#c9d4cb;font-size:13px;padding:0 16px;font-family:'Jost',sans-serif;outline:none;border-right:none;min-width:0}
        .ft-input::placeholder{color:rgba(201,212,203,.33)}
        .ft-input:focus{border-color:rgba(201,212,203,.42)}
        .ft-sub-btn{height:46px;padding:0 clamp(12px,1.5vw,18px);background:rgba(201,212,203,.13);border:1px solid rgba(201,212,203,.22);color:rgba(201,212,203,.85);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:'Jost',sans-serif;display:flex;align-items:center;gap:8px;transition:background .25s;white-space:nowrap;flex-shrink:0}
        .ft-sub-btn:hover{background:rgba(201,212,203,.22)}
        .ft-cols{display:grid;grid-template-columns:1.6fr repeat(3,1fr);gap:clamp(24px,4vw,48px)}
        .stats-4{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(201,212,203,.07);overflow:hidden;margin-top:48px}

        /* ══════════════════════════════════
           HERO RESPONSIVE BREAKPOINTS
        ══════════════════════════════════ */

        /* ── Tablet landscape 1024–1199 ── */
        @media(max-width:1199px){
          .hero-h1{font-size:clamp(38px,7vw,88px)!important}
          .hero-right{width:clamp(280px,32vw,380px)!important}
        }

        /* ── Tablet portrait ≤1023 → single column stacked ── */
        @media(max-width:1023px){
          /* Layout: stack vertically, no forced 100vh */
          .hero-outer{min-height:auto!important}
          .hero-layout{
            flex-direction:column!important;
            align-items:stretch!important;
            min-height:auto!important;
            padding-top:clamp(88px,11vh,110px)!important;
            padding-bottom:clamp(32px,5vw,56px)!important;
            gap:clamp(20px,3vw,28px)!important;
          }
          .hero-left{
            justify-content:flex-start!important;
            padding-bottom:0!important;
            width:100%!important;
          }
          .hero-h1{font-size:clamp(36px,8vw,80px)!important;line-height:.95!important}
          .hero-right{
            width:100%!important;
            flex-direction:column!important;
            align-items:stretch!important;
            justify-content:flex-start!important;
            padding-bottom:0!important;
          }
          /* Form max-width on tablet */
          .hf-wrap{max-width:560px!important}
          /* Vid-card full width */
          .vid-card{max-width:100%!important}

          /* Other sections */
          .about-grid{grid-template-columns:1fr!important}
          .about-img-left{display:none!important}
          .rooms-grid{grid-template-columns:1fr 1fr!important}
          .blogs-grid{grid-template-columns:1fr 1fr!important}
          .svc-grid{grid-template-columns:1fr 1fr!important}
          .testi-grid{grid-template-columns:1fr 1fr!important}
          .rest-grid{grid-template-columns:1fr!important}
          .why-grid{grid-template-columns:1fr 1fr!important}
          .ft-cols{grid-template-columns:1fr 1fr!important;gap:32px!important}
          .why-header{grid-column:1/3!important}
          .cta-circle-wrap:last-child{display:none!important}
          .cat-item{flex:1 1 clamp(100px,18%,140px)!important}
          .why-circle-img{display:none!important}
        }

        /* ── 768px tablet portrait ── */
        @media(max-width:768px){
          .sec-wrap{padding-left:clamp(18px,4.5vw,26px)!important;padding-right:clamp(18px,4.5vw,26px)!important}

          /* Hero layout — tighter padding */
          .hero-layout{
            padding-top:clamp(76px,10vh,100px)!important;
            padding-bottom:clamp(28px,5vw,48px)!important;
            gap:20px!important;
          }
          .hero-h1{font-size:clamp(32px,8.5vw,64px)!important;line-height:.96!important}
          /* Heading inline pill — scale down */
          .hero-easy-pill{
            width:clamp(52px,7vw,76px)!important;
            height:clamp(30px,4.5vw,44px)!important;
          }
          /* Booking form — full width, clean on white */
          .hf-wrap{
            max-width:100%!important;
            padding:18px 16px 16px!important;
            box-shadow:0 16px 48px rgba(4,17,6,.22),0 4px 12px rgba(4,17,6,.1)!important;
          }
          .hf-title{font-size:17px!important;margin-bottom:12px!important}
          .hf-date-box,.hf-counter-box{height:44px!important}
          .hf-label{color:rgba(4,17,6,.58)!important;font-size:9.5px!important}
          .hf-date-input{font-size:13px!important}
          /* Vid card */
          .vid-card{padding:14px 16px!important}
          .vid-card__title{font-size:15px!important}
          .vid-card__desc{font-size:12px!important}

          /* Section header */
          .sec-head-row{align-items:center!important;gap:12px!important}
          .sec-head-text h2{font-size:clamp(18px,4.5vw,32px)!important;line-height:1.2!important}
          .sec-head-text p{font-size:10px!important;margin-bottom:6px!important}
          .nav-round-btn{width:38px!important;height:38px!important;font-size:15px!important;border-radius:10px!important}
          .nav-round-btn--lg{width:40px!important;height:40px!important;font-size:15px!important}
          .about-spin-badge{width:80px!important;height:80px!important;bottom:12px!important;right:8px!important}
          .about-spin-badge > svg:first-of-type{width:80px!important;height:80px!important}

          /* Rooms */
          .section-rooms .rooms-grid{grid-template-columns:1fr 1fr!important;gap:16px!important}
          .section-rooms{padding-top:48px!important;padding-bottom:56px!important}
          .section-rooms .r-card--pro .r-img-wrap{height:clamp(150px,30vw,200px)!important}
          .section-rooms .r-card--pro .r-book-btn{flex-direction:column!important;align-items:stretch!important}
          .section-rooms .r-card--pro .r-link-explore{justify-content:center!important}
          .section-rooms .r-card--pro .r-bk-cta{width:100%!important;text-align:center!important;justify-content:center!important;display:flex!important}
          .rooms-load-more{min-height:50px!important}

          .cat-wrap{gap:clamp(8px,2vw,16px)!important}
          .cat-item{flex:0 1 calc(33.33% - 12px)!important;max-width:160px!important}
          .why-grid{grid-template-columns:1fr 1fr!important}
          .why-header{grid-column:1/3!important}
          .why-circle-img{display:none!important}
          .testi-grid{grid-template-columns:1fr!important}
          .testi-card:not(.testi-first){display:none!important}
          .blogs-grid{grid-template-columns:1fr!important}
          .svc-grid{grid-template-columns:1fr 1fr!important}
          .rest-grid{grid-template-columns:1fr!important}
          .cta-circle-wrap{display:none!important}
          .cta-inner{justify-content:center!important;text-align:center!important}
          .cta-btn{justify-content:center!important;width:100%!important;max-width:360px!important}
          .ft-cols{grid-template-columns:1fr 1fr!important}
          footer .ft-cols > div:first-child{grid-column:1/3!important}
          .hs-popup{width:clamp(180px,50vw,240px)!important}
          .ft-sub-btn{font-size:10px!important;letter-spacing:.08em!important;padding:0 10px!important}
          .sec-head-link{padding:10px 16px!important;font-size:10px!important}
        }

        /* ── 640px mobile ── */
        @media(max-width:640px){
          /* Hero */
          .hero-layout{
            padding-top:clamp(70px,10vh,90px)!important;
            padding-bottom:clamp(24px,5vw,40px)!important;
            gap:16px!important;
          }
          .hero-h1{font-size:clamp(30px,9vw,52px)!important;line-height:1!important}
          .hero-easy-pill{
            width:clamp(44px,10vw,64px)!important;
            height:clamp(26px,6vw,38px)!important;
          }
          /* Grid: both date + both counter stay 2-col */
          .hf-grid-2{grid-template-columns:1fr 1fr!important;gap:8px!important}
          .hf-wrap{padding:14px 12px 13px!important}
          .hf-date-box,.hf-counter-box{height:40px!important}
          .hf-cta{height:44px!important;font-size:10px!important}
          .hf-counter-btn{width:24px!important;height:24px!important;font-size:14px!important}
          /* Vid card: keep horizontal on 640 */
          .vid-card{flex-direction:row!important;align-items:center!important;gap:12px!important;padding:12px 14px!important}
          .vid-card__thumb{
            width:clamp(68px,18vw,88px)!important;
            max-height:72px!important;
          }

          /* Other sections */
          .sec-head-row{flex-direction:row!important;align-items:center!important;flex-wrap:nowrap!important;gap:10px!important}
          .sec-head-text h2{font-size:clamp(17px,5vw,26px)!important}
          .sec-head-actions{flex-shrink:0!important;gap:7px!important}
          .nav-round-btn{width:36px!important;height:36px!important;font-size:14px!important}
          .about-spin-badge{width:72px!important;height:72px!important;bottom:8px!important;right:8px!important}
          .about-spin-badge > svg:first-of-type{width:72px!important;height:72px!important}
          .cat-item{flex:0 1 calc(33.33% - 8px)!important;max-width:none!important}
          .why-grid{grid-template-columns:1fr!important}
          .why-header{grid-column:1!important}
          .why-circle-img{display:none!important}
          .testi-grid{grid-template-columns:1fr!important}
          .testi-card:not(.testi-first){display:none!important}
          .rooms-grid{grid-template-columns:1fr!important}
          .section-rooms .rooms-grid{grid-template-columns:1fr!important;max-width:480px!important;margin-left:auto!important;margin-right:auto!important}
          .blogs-grid{grid-template-columns:1fr!important}
          .rest-grid{grid-template-columns:1fr!important}
          .stats-4{grid-template-columns:1fr 1fr!important}
          .ft-cols{grid-template-columns:1fr!important}
          footer .ft-cols > div:first-child{grid-column:1!important}
          .r-book-btn{align-items:stretch!important}
          .r-bk-cta{width:100%!important;justify-content:center!important}
          .ft-sub-btn{white-space:normal!important;line-height:1.1!important;height:auto!important;min-height:46px!important}
        }

        /* ── 480px small phones ── */
        @media(max-width:480px){
          .hero-layout{padding-top:clamp(62px,12vh,82px)!important;gap:14px!important}
          .hero-h1{font-size:clamp(28px,9.5vw,46px)!important;line-height:1.02!important}
          /* Pill smaller — just a color accent */
          .hero-easy-pill{
            width:clamp(38px,9vw,54px)!important;
            height:clamp(22px,5.5vw,34px)!important;
          }
          /* Form: switch counters to single column so they have space */
          .hf-grid-2{grid-template-columns:1fr 1fr!important}
          .hf-wrap{padding:12px 10px 11px!important;border-radius:12px!important}
          .hf-date-box,.hf-counter-box{height:38px!important}
          .hf-cta{height:42px!important;font-size:9.5px!important}
          .hf-cta-icon{width:24px!important;height:24px!important}
          /* Vid-card: horizontal stays but more compact */
          .vid-card{padding:10px 12px!important;gap:10px!important;border-radius:12px!important}
          .vid-card__thumb{width:62px!important;max-height:62px!important}
          .vid-card__title{font-size:13px!important;margin-bottom:3px!important}
          .vid-card__desc{font-size:11px!important}

          .cat-item{flex:0 1 calc(50% - 8px)!important;max-width:none!important}
          .stats-4{grid-template-columns:1fr 1fr!important}
          .svc-grid{grid-template-columns:1fr!important}
          .ft-cols{grid-template-columns:1fr!important}
          .r-img-wrap{height:clamp(160px,40vw,200px)!important}
          .ft-input{font-size:12px!important;padding:0 12px!important}
          .hs-popup{left:50%!important;right:auto!important;transform:translateX(-50%)!important;width:min(88vw,280px)!important}
          .sec-head-text h2{font-size:clamp(16px,5.5vw,22px)!important}
        }

        /* ── 400px very small phones ── */
        @media(max-width:400px){
          .hero-h1{font-size:clamp(26px,9.5vw,40px)!important}
          /* At 400, dates stack to 1 col each so they remain readable */
          .hf-grid-2{grid-template-columns:1fr!important}
          /* Vid-card: go vertical */
          .vid-card{flex-direction:column!important;align-items:stretch!important;gap:10px!important}
          .vid-card__thumb{width:100%!important;max-width:none!important;max-height:140px!important;aspect-ratio:16/9!important}
          .cat-item{flex:0 1 calc(50% - 6px)!important;max-width:none!important}
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section className="hero-outer">
        <div className="hero-overlay" />

        <div className="hero-inner">
          <div className="hero-layout">

            {/* LEFT — Heading + Vid-card */}
            <div className="hero-left">
              <Reveal>
                <h1 className="marc hero-h1">ONE CLICK</h1>
              </Reveal>
              <Reveal delay={100}>
                <div style={{ display:"flex", alignItems:"center", gap:"clamp(10px,1.5vw,16px)", margin:"6px 0", flexWrap:"nowrap" }}>
                  <h1 className="marc hero-h1">EASY</h1>
                  <div
                    className="hero-easy-pill"
                    style={{
                      width:"clamp(60px,8vw,96px)",
                      height:"clamp(34px,5vw,50px)",
                      marginTop:4,
                    }}
                  >
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80" alt=""
                      style={{ width:"100%", height:"100%", objectFit:"cover", opacity:.9 }} />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={180}>
                <h1 className="marc hero-h1">BOOKING</h1>
              </Reveal>

              <Reveal delay={300} style={{ marginTop:"clamp(20px,3.5vw,36px)" }}>
                <div className="vid-card">
                  <div className="vid-card__thumb">
                    <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=80" alt="" />
                    <div className="vid-card__overlay">
                      <div className="vid-card__play" aria-hidden>▶</div>
                    </div>
                  </div>
                  <div className="vid-card__body">
                    <p className="marc vid-card__title">Book Your Stay Now</p>
                    <p className="vid-card__desc">Effortlessly manage your stay with seamless hotel reservations</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — Booking form */}
            <div className="hero-right">
              <Reveal delay={240} style={{ width:"100%" }}>
                <div className="hf-wrap">
                  <h3 className="marc hf-title">Reserve Your Room</h3>

                  <div className="hf-grid-2">
                    <div>
                      <label className="hf-label">CHECK-IN</label>
                      <div className="hf-date-box">
                        <input className="hf-date-input" type="text" placeholder="Check-in"
                          value={checkIn}
                          onFocus={e => { e.target.type = "date"; }}
                          onBlur={e => { if (!e.target.value) e.target.type = "text"; }}
                          onChange={e => setCheckIn(e.target.value)} />
                        <span className="hf-date-icon">{Ico.calDate}</span>
                      </div>
                    </div>
                    <div>
                      <label className="hf-label">CHECK-OUT</label>
                      <div className="hf-date-box">
                        <input className="hf-date-input" type="text" placeholder="Check-out"
                          value={checkOut}
                          onFocus={e => { e.target.type = "date"; }}
                          onBlur={e => { if (!e.target.value) e.target.type = "text"; }}
                          onChange={e => setCheckOut(e.target.value)} />
                        <span className="hf-date-icon">{Ico.calDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="hf-grid-2">
                    <div>
                      <label className="hf-label">ADULTS</label>
                      <div className="hf-counter-box">
                        <button className="hf-counter-btn" onClick={() => setAdults(a => Math.max(1,a-1))}>−</button>
                        <span style={{ fontSize:15, fontWeight:600, color:DARK }}>{adults}</span>
                        <button className="hf-counter-btn" onClick={() => setAdults(a => Math.min(10,a+1))}>+</button>
                      </div>
                    </div>
                    <div>
                      <label className="hf-label">CHILDREN</label>
                      <div className="hf-counter-box">
                        <button className="hf-counter-btn" onClick={() => setChildren(c => Math.max(0,c-1))}>−</button>
                        <span style={{ fontSize:15, fontWeight:600, color:DARK }}>{children}</span>
                        <button className="hf-counter-btn" onClick={() => setChildren(c => Math.min(6,c+1))}>+</button>
                      </div>
                    </div>
                  </div>

                  <div className="hf-divider" />

                  <button className="hf-cta">
                    <span className="hf-cta-icon">›</span>
                    CHECK AVAILABILITY
                  </button>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section style={{ padding:"clamp(56px,8vw,96px) 0", background:BG }}>
        <div className="sec-wrap">
          <Reveal>
            <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.45, marginBottom:12 }}>01 _ LEARN MORE ABOUT US</p>
            <h2 className="marc" style={{ fontSize:"clamp(20px,3.6vw,52px)", fontWeight:400, lineHeight:1.22, marginBottom:52 }}>
              Create Memories Across The Globe<br/>
              <span style={{ color:"rgba(4,17,6,.28)" }}>with Journeys Designed Around You</span>
            </h2>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-img-left">
              <img src="/sher.jpg" alt=""
                style={{ width:"100%", height:500, objectFit:"cover", display:"block" }} />
            </Reveal>
            <div style={{ paddingTop:4 }}>
              <Reveal>
                <p style={{ fontSize:"clamp(14px,1.5vw,16px)", lineHeight:1.82, opacity:.63, marginBottom:24 }}>
                  Planning your next getaway has never been easier with our seamless hotel booking experience. Whether you seek a luxurious resort, a cozy boutique stay or a modern city hotel, we have it all.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <div style={{ marginBottom:24 }}>
                  {["Your perfect hotel experience starts right here","Discover new destinations through easy hotel booking","Simple hotel booking for unforgettable travel moments"].map(item => (
                    <div key={item} className="ck-row">
                      <div className="ck-icon">
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><polyline points="2 6 5 9 10 3"/></svg>
                      </div>
                      <span style={{ fontSize:"clamp(13px,1.4vw,15px)", fontWeight:500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <div style={{ height:1, background:"rgba(4,17,6,.12)", margin:"20px 0" }} />
              <Reveal delay={160}>
                <div style={{ display:"flex", gap:"clamp(24px,4vw,40px)", flexWrap:"nowrap" }}>
                  <div>
                    <div className="marc" style={{ fontSize:"clamp(32px,5vw,56px)", color:DARK, lineHeight:1 }}><Counter target={146} suffix="+"/></div>
                    <p style={{ fontSize:10, letterSpacing:".2em", textTransform:"uppercase", marginTop:7, opacity:.44 }}>HOTEL AND RESORT</p>
                  </div>
                  <div>
                    <div className="marc" style={{ fontSize:"clamp(32px,5vw,56px)", color:DARK, lineHeight:1 }}><Counter target={28} suffix="k+"/></div>
                    <p style={{ fontSize:10, letterSpacing:".2em", textTransform:"uppercase", marginTop:7, opacity:.44 }}>SATISFIED VISITORS</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="about-feature-col">
                <img src="/1.jpeg" alt="" className="about-feature-img" />
                <div className="spin about-spin-badge">
                  <svg viewBox="0 0 114 114" style={{ position:"absolute", width:100, height:100 }}>
                    <path id="spbadge" d="M57,57 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" fill="none"/>
                    <text style={{ fontSize:9.2, fill:"#c9d4cb", letterSpacing:2.7 }}><textPath href="#spbadge">THE FOREST VIEW STORY • ABOUT US • 2012 •</textPath></text>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9d4cb" strokeWidth="1.4" width="19" height="19">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES ══ */}
      <section style={{ padding:"clamp(56px,8vw,88px) 0", background:SHADE }}>
        <div className="sec-wrap">
          <div className="sec-head-row" style={{ marginBottom:"clamp(32px,5vw,52px)" }}>
            <div className="sec-head-text">
              <Reveal>
                <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.42, marginBottom:10 }}>02 _ ACCOMMODATION CATEGORY</p>
                <h2 className="marc" style={{ fontSize:"clamp(18px,4vw,50px)", fontWeight:400 }}>Browse Popular Categories</h2>
              </Reveal>
            </div>
            <div className="sec-head-actions">
              <button type="button" className="nav-round-btn" onClick={() => setCatIdx(p => (p-1+CATS.length)%CATS.length)} aria-label="Previous category">←</button>
              <button type="button" className="nav-round-btn nav-round-btn--dark" onClick={() => setCatIdx(p => (p+1)%CATS.length)} aria-label="Next category">→</button>
            </div>
          </div>
          <div className="cat-wrap">
            {CATS.map((c,i) => {
              const active = i === catIdx;
              return (
                <div key={c.title} className="cat-item" onClick={() => setCatIdx(i)}>
                  <div style={{ position:"relative", width:"clamp(80px,10vw,116px)", height:"clamp(80px,10vw,116px)", margin:"0 auto clamp(10px,1.5vw,16px)" }}>
                    <svg viewBox="0 0 116 116" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
                      <circle cx="58" cy="58" r="54" fill="none" stroke="rgba(4,17,6,.1)" strokeWidth="1"/>
                      <circle cx="58" cy="58" r="54" fill="none" stroke={DARK} strokeWidth="1.5"
                        strokeDasharray="339" strokeDashoffset={active?"0":"339"}
                        style={{ transition:"stroke-dashoffset .55s ease", transformOrigin:"center", transform:"rotate(-90deg)" }}/>
                    </svg>
                    <div style={{ position:"absolute", inset:10, borderRadius:"50%",
                      background:active?DARK:"rgba(4,17,6,.05)", display:"flex", alignItems:"center",
                      justifyContent:"center", transition:"all .3s", color:active?"#c9d4cb":DARK }}>{CatIcons[i]}</div>
                  </div>
                  <h5 className="marc" style={{ fontSize:"clamp(13px,1.3vw,16px)", fontWeight:400, color:DARK, marginBottom:4 }}>{c.title}</h5>
                  <span style={{ fontSize:"clamp(11px,1.1vw,13px)", opacity:.45 }}>{c.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ ROOMS ══ */}
      <section className="section-rooms" style={{ padding:"clamp(56px,8vw,92px) 0" }}>
        <div className="sec-wrap">
          <Reveal>
            <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(232,240,233,.72)", marginBottom:10 }}>03 _ BROWSE YOUR HOTEL &amp; RESORT</p>
            <h2 className="marc" style={{ fontSize:"clamp(20px,4.2vw,50px)", fontWeight:400, marginBottom:12, color:"#eef7f0", lineHeight:1.15 }}>Comfortable Spaces For You</h2>
            <p style={{ fontSize:"clamp(13px,1.6vw,15px)", color:"rgba(232,240,233,.8)", maxWidth:540, marginBottom:40, lineHeight:1.65 }}>Hand-picked stays with clear pricing, real guest ratings, and everything you need to book with confidence.</p>
          </Reveal>
          <div className="rooms-grid">
            {ROOMS.map((r,i) => (
              <Reveal key={r.title} delay={i*55}>
                <article className="r-card r-card--pro">
                  <div className="r-img-wrap">
                    <img src={r.img} alt={r.title} className="r-img" />
                    <span className="r-tag">{r.tag}</span>
                    <button type="button" className="r-wish" onClick={() => toggleWish(i)} aria-label="Wishlist">
                      <svg viewBox="0 0 24 24" fill={wishlist.has(i)?"#c73d2a":"none"} stroke={wishlist.has(i)?"#c73d2a":"rgba(4,17,6,.5)"} strokeWidth="1.5" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    <div className="r-price-float">
                      <span className="r-price-label">From</span>
                      <span className="r-price-num">${r.price}</span>
                      <span className="r-price-unit">/ night</span>
                    </div>
                  </div>
                  <div className="r-body">
                    <div className="r-pro-title-row">
                      <h3 className="marc r-pro-title">{r.title}</h3>
                      <div className="r-rating-stack">
                        <div className="r-rating-pill">
                          <svg viewBox="0 0 24 24" fill="#c9d4cb" width="11" height="11"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                          <span>{r.rating}</span>
                        </div>
                        <span className="r-reviews-note">{r.reviews} reviews</span>
                      </div>
                    </div>
                    <div className="r-meta-row">
                      <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path d="M2 9 L2 20"/><path d="M22 9 L22 20"/><path d="M2 14 L22 14"/><rect x="2" y="9" width="9" height="5" rx="1"/><rect x="13" y="9" width="9" height="5" rx="1"/></svg>
                        {r.type}
                      </span>
                      <span className="r-meta-dot" aria-hidden />
                      <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        {r.persons}
                      </span>
                    </div>
                    <div className="r-amenity-strip">
                      {r.amenities.map((a,j) => (
                        <div key={j} className="r-amenity" title={a}>{Ico[a]}</div>
                      ))}
                    </div>
                    <div className="r-book-btn">
                      <a href="#" className="r-link-explore">EXPLORE {Ico.arrow}</a>
                      <button type="button" className="r-bk-cta">Book Now</button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:42 }}>
            <button type="button" className="rooms-load-more" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, background:DARK, color:BG, border:"none",
              padding:"14px 38px", fontSize:12, fontWeight:600, letterSpacing:".12em", textTransform:"uppercase",
              cursor:"pointer", fontFamily:"'Jost',sans-serif", borderRadius:12, boxShadow:"0 8px 28px rgba(4,17,6,.25)" }}>
              LOAD MORE
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.98"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ══ BED SECTION ══ */}
      <section style={{ padding:"clamp(48px,7vw,72px) 0 clamp(56px,8vw,88px)", background:"#d4ddd6" }}>
        <div className="sec-wrap">
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:14 }}>
              <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.4, marginBottom:10 }}>ROOM DETAILS</p>
              <h2 className="marc" style={{ fontSize:"clamp(18px,3.5vw,46px)", fontWeight:400 }}>Explore Bed Configuration</h2>
              <p style={{ fontSize:14, opacity:.5, marginTop:8 }}>
                Tap the <span style={{ color:DARK, fontWeight:700, fontSize:16 }}>+</span> markers to discover materials &amp; specs
              </p>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="bed-tabs-shell">
              <div className="bed-tabs-inner">
                {["Twin Bed","King Size Bed"].map((t,i) => (
                  <button key={t} type="button" className="bed-tab" onClick={() => { setBedTab(i); setActiveHS(null); }}
                    style={{ background:bedTab===i?"#fff":"transparent", color:bedTab===i?DARK:"rgba(4,17,6,.45)",
                      boxShadow:bedTab===i?"0 2px 8px rgba(4,17,6,.12)":undefined }}>{t}</button>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ position:"relative", maxWidth:1380, margin:"0 auto" }}>
              <img
                src={bedTab===0?"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1400&q=85"
                              :"https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1400&q=85"}
                alt="Bed" style={{ width:"100%", display:"block", maxHeight:"clamp(240px,40vw,480px)", objectFit:"cover" }}
              />
              <div style={{ position:"absolute", inset:0, background:"rgba(4,17,6,.1)", pointerEvents:"none" }} />
              {hotspots.map(hs => (
                <div key={hs.id} style={{
                  position:"absolute", top:hs.top, left:hs.left, right:hs.right,
                  bottom:hs.bottom,
                  transform:hs.tX?`translateX(${hs.tX})`:undefined,
                  zIndex:activeHS===hs.id?20:10,
                  width:32, height:32,
                }}>
                  <button
                    className={`hotspot${activeHS===hs.id?" hs-on":""}`}
                    onClick={() => setActiveHS(activeHS===hs.id?null:hs.id)}
                    title={hs.label}
                  >
                    {activeHS===hs.id?"×":"+"}
                  </button>
                  {activeHS===hs.id && (
                    <div className="hs-popup">
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                        <div style={{ width:36, height:36, borderRadius:"50%", background:`${DARK}18`,
                          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:DARK }}>{Ico[hs.ik]}</div>
                        <div style={{ minWidth:0 }}>
                          <p style={{ fontSize:13, fontWeight:700, color:DARK, lineHeight:1.2 }}>{hs.label}</p>
                          <p style={{ fontSize:10, color:"rgba(4,17,6,.5)", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", marginTop:2 }}>Premium Quality</p>
                        </div>
                      </div>
                      <div style={{ height:1, background:"rgba(4,17,6,.08)", marginBottom:10 }} />
                      <p style={{ fontSize:12, color:"rgba(4,17,6,.62)", lineHeight:1.72, marginBottom:10 }}>{hs.desc}</p>
                      <div style={{ background:`${DARK}08`, padding:"8px 12px" }}>
                        <p style={{ fontSize:10, color:"rgba(4,17,6,.5)", lineHeight:1.6 }}>{hs.spec}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section style={{ padding:"clamp(56px,8vw,92px) 0 clamp(64px,9vw,100px)", background:BG }}>
        <div className="sec-wrap">
          <Reveal>
            <div className="sec-head-row" style={{ marginBottom:"clamp(32px,5vw,56px)" }}>
              <div className="sec-head-text">
                <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.4, marginBottom:12 }}>04 _ HOTEL SERVICES</p>
                <h2 className="marc" style={{ fontSize:"clamp(18px,4vw,50px)", fontWeight:400, lineHeight:1.2 }}>
                  Everything You Need,<br/><span style={{ color:"rgba(4,17,6,.28)" }}>Right Where You Stay</span>
                </h2>
              </div>
              <a href="#" className="sec-head-link"
                style={{ color:DARK, border:`1.5px solid ${DARK}`, padding:"12px 26px", fontSize:11, fontWeight:700,
                  letterSpacing:".12em", textTransform:"uppercase", textDecoration:"none" }}>
                VIEW ALL {Ico.arrow}
              </a>
            </div>
          </Reveal>
          <div className="svc-grid">
            {SERVICES.map((s,i) => (
              <Reveal key={s.title} delay={i*65}>
                <div className="svc-card" style={{ background:i%2===0?DARK:SVCDARK,
                  boxShadow:`0 8px 32px rgba(4,17,6,${i%2===0?".15":".24"})` }}>
                  <span className="marc" style={{ position:"absolute", top:16, right:20, fontSize:56, fontWeight:400,
                    color:"rgba(201,212,203,.07)", lineHeight:1, userSelect:"none" }}>{s.num}</span>
                  <div style={{ width:54, height:54, borderRadius:"50%", border:"1.5px solid rgba(201,212,203,.2)",
                    background:"rgba(201,212,203,.08)", display:"flex", alignItems:"center",
                    justifyContent:"center", marginBottom:20, color:"rgba(201,212,203,.8)" }}>{Ico[s.ik]}</div>
                  <h3 className="marc" style={{ fontSize:"clamp(18px,1.8vw,22px)", fontWeight:400, color:"#c9d4cb", marginBottom:12, lineHeight:1.2 }}>{s.title}</h3>
                  <p style={{ fontSize:"clamp(12px,1.2vw,13.5px)", color:"rgba(201,212,203,.54)", lineHeight:1.82, marginBottom:20 }}>{s.text}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:22 }}>
                    {s.tags.map(tag => <span key={tag} className="svc-tag">{tag}</span>)}
                  </div>
                  <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700,
                    letterSpacing:".12em", textTransform:"uppercase", color:"rgba(201,212,203,.65)", textDecoration:"none" }}
                    onMouseEnter={e => e.currentTarget.style.color="#c9d4cb"}
                    onMouseLeave={e => e.currentTarget.style.color="rgba(201,212,203,.65)"}>
                    LEARN MORE {Ico.arrow}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY SECTION ══ */}
      <section style={{ padding:"clamp(56px,8vw,88px) 0 clamp(64px,9vw,96px)", background:SHADE }}>
        <div className="sec-wrap">
          <div className="why-grid">
            <Reveal style={{ gridColumn:"1/3" }} className="why-header">
              <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.38, marginBottom:12 }}>05 _ WHY THE FOREST VIEW SPECIAL?</p>
              <h2 className="marc" style={{ fontSize:"clamp(18px,3.4vw,48px)", fontWeight:400, lineHeight:1.22 }}>Experience Comfort &amp; Convenience —<br/>Your Perfect Accommodation Awaits</h2>
            </Reveal>
            <Reveal delay={60} style={{ gridColumn:"span 1" }}>
              <div style={{ display:"flex", alignItems:"center", marginBottom:18 }}>
                {["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=70&h=70&fit=crop&crop=face","https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=70&h=70&fit=crop&crop=face","https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=70&h=70&fit=crop&crop=face","https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=70&h=70&fit=crop&crop=face"].map((s,i) => (
                  <img key={i} src={s} alt="" style={{ width:48, height:48, borderRadius:"50%", objectFit:"cover", border:`3px solid ${SHADE}`, marginLeft:i>0?-13:0, zIndex:4-i, position:"relative" }} />
                ))}
              </div>
              <p style={{ fontSize:"clamp(13px,1.3vw,14px)", opacity:.58, lineHeight:1.74 }}>Unleash Your Inner Explorer.<br/>Discover Your Next Destination.<br/>Your Next Adventure</p>
            </Reveal>
            <Reveal delay={70} style={{ gridColumn:"span 1" }}>
              <div className="ww">
                <span className="marc" style={{ position:"absolute", top:12, right:14, fontSize:42, fontWeight:400, color:"rgba(4,17,6,.05)", lineHeight:1 }}>01</span>
                <div className="w-ico" style={{ color:DARK }}>{Ico.map}</div>
                <h3 className="marc" style={{ fontSize:"clamp(17px,1.6vw,21px)", fontWeight:400, marginBottom:9 }}>Flexible Search</h3>
                <p style={{ fontSize:"clamp(12px,1.2vw,13px)", lineHeight:1.8, opacity:.54, marginBottom:17 }}>Travel is the ultimate way to explore the world, embrace new cultures, and create unforgettable memories.</p>
                <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:DARK, textDecoration:"none" }}>READ MORE {Ico.arrow}</a>
              </div>
            </Reveal>
            <Reveal delay={110} style={{ gridColumn:"span 1" }}>
              <div className="wd">
                <span className="marc" style={{ position:"absolute", top:12, right:14, fontSize:42, fontWeight:400, color:"rgba(201,212,203,.08)", lineHeight:1 }}>02</span>
                <div className="w-ico-d" style={{ color:"#c9d4cb" }}>{Ico.hotel}</div>
                <h3 className="marc" style={{ fontSize:"clamp(17px,1.6vw,21px)", fontWeight:400, color:"#c9d4cb", marginBottom:9 }}>Trusted Listings</h3>
                <p style={{ fontSize:"clamp(12px,1.2vw,13px)", lineHeight:1.8, color:"#c9d4cb", opacity:.58, marginBottom:17 }}>Hotels and resorts across countless destinations — wherever you travel, we're already there.</p>
                <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#c9d4cb", textDecoration:"none" }}>READ MORE {Ico.arrow}</a>
              </div>
            </Reveal>
            <Reveal delay={150} className="why-circle-img" style={{ display:"flex", alignItems:"center", justifyContent:"center", gridColumn:"span 1" }}>
              <div style={{ width:"100%", maxWidth:240, aspectRatio:"1/1", borderRadius:"50%", overflow:"hidden", margin:"0 auto", boxShadow:"0 4px 26px rgba(4,17,6,.13)" }}>
                <img src="/2.jpeg" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
            </Reveal>
            <Reveal delay={90} style={{ gridColumn:"span 1" }}>
              <div className="ww">
                <span className="marc" style={{ position:"absolute", top:12, right:14, fontSize:42, fontWeight:400, color:"rgba(4,17,6,.05)", lineHeight:1 }}>03</span>
                <div className="w-ico" style={{ color:DARK }}>{Ico.mtn}</div>
                <h3 className="marc" style={{ fontSize:"clamp(17px,1.6vw,21px)", fontWeight:400, marginBottom:9 }}>Beautiful View</h3>
                <p style={{ fontSize:"clamp(12px,1.2vw,13px)", lineHeight:1.8, opacity:.54, marginBottom:17 }}>Wake up to breathtaking scenery from the world's finest hotel locations.</p>
                <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:DARK, textDecoration:"none" }}>READ MORE {Ico.arrow}</a>
              </div>
            </Reveal>
            <Reveal delay={130} className="why-circle-img" style={{ display:"flex", alignItems:"center", justifyContent:"center", gridColumn:"span 1" }}>
              <div style={{ width:"100%", maxWidth:240, aspectRatio:"1/1", borderRadius:"50%", overflow:"hidden", margin:"0 auto", boxShadow:"0 4px 26px rgba(4,17,6,.13)" }}>
                <img src="/7.jpeg" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
            </Reveal>
            <Reveal delay={170} style={{ gridColumn:"span 1" }}>
              <div className="ww">
                <span className="marc" style={{ position:"absolute", top:12, right:14, fontSize:42, fontWeight:400, color:"rgba(4,17,6,.05)", lineHeight:1 }}>04</span>
                <div className="w-ico" style={{ color:DARK }}>{Ico.paw}</div>
                <h3 className="marc" style={{ fontSize:"clamp(17px,1.6vw,21px)", fontWeight:400, marginBottom:9 }}>Pet Friendly Hotels</h3>
                <p style={{ fontSize:"clamp(12px,1.2vw,13px)", lineHeight:1.8, opacity:.54, marginBottom:17 }}>Our pet-friendly hotels welcome every member of your family including your furry companions.</p>
                <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:DARK, textDecoration:"none" }}>READ MORE {Ico.arrow}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ RESTAURANT ══ */}
      <section style={{ padding:"clamp(56px,8vw,88px) 0", background:DARK }}>
        <div className="sec-wrap">
          <Reveal>
            <div style={{ marginBottom:"clamp(32px,5vw,50px)" }}>
              <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(201,212,203,.32)", marginBottom:9 }}>06 _ RESTAURANT AND BARS</p>
              <h2 className="marc" style={{ fontSize:"clamp(18px,3.8vw,50px)", color:"#c9d4cb", fontWeight:400, lineHeight:1.18 }}>Create Memories Across The Globe</h2>
              <h2 className="marc" style={{ fontSize:"clamp(18px,3.8vw,50px)", color:"rgba(201,212,203,.17)", fontWeight:400, lineHeight:1.18 }}>with Journeys Designed Around You</h2>
            </div>
          </Reveal>
          <div className="rest-grid">
            <Reveal delay={80}>
              <div style={{ background:"rgba(201,212,203,.05)", border:"1px solid rgba(201,212,203,.08)", padding:"clamp(22px,3vw,34px) clamp(18px,2.5vw,26px)" }}>
                <div style={{ width:50, height:50, borderRadius:"50%", border:"1.5px solid rgba(201,212,203,.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, color:"rgba(201,212,203,.7)" }}>
                  {Ico.dining}
                </div>
                <h3 className="marc" style={{ fontSize:"clamp(18px,1.8vw,23px)", color:"#c9d4cb", fontWeight:400, marginBottom:11 }}>Passion On Plate</h3>
                <p style={{ fontSize:"clamp(12px,1.2vw,14px)", color:"rgba(201,212,203,.5)", lineHeight:1.8, marginBottom:24 }}>Safe payments and instant confirmations — trust and reliability built into every reservation.</p>
                <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:8, color:"#c9d4cb", border:"1px solid rgba(201,212,203,.24)", padding:"11px 22px", fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", textDecoration:"none" }}>DISCOVER MORE {Ico.arrow}</a>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div>
                <div style={{ background:"rgba(201,212,203,.05)", border:"1px solid rgba(201,212,203,.08)", padding:"16px 20px", marginBottom:12 }}>
                  {[{ icon: Ico.fork, t:"Luxurious Accommodations" },{ icon: Ico.coffee, t:"Exceptional Service" }].map((it,ix) => (
                    <div key={it.t} style={{ display:"flex", alignItems:"center", gap:11, padding:"9px 0", color:"#c9d4cb", fontSize:"clamp(13px,1.3vw,15px)", fontWeight:500, borderBottom: ix===0?"1px solid rgba(201,212,203,.05)":"none" }}>
                      <span style={{ color:"rgba(201,212,203,.6)", flexShrink:0 }}>{it.icon}</span>{it.t}
                    </div>
                  ))}
                </div>
                <img src="/7.jpeg" alt="" style={{ width:"100%", height:215, objectFit:"cover", display:"block" }} />
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div>
                <img src="/4.jpeg" alt="" style={{ width:"100%", height:195, objectFit:"cover", display:"block", marginBottom:20 }} />
                <h4 className="marc" style={{ fontSize:"clamp(17px,1.7vw,21px)", color:"#c9d4cb", fontWeight:400, marginBottom:11 }}>Passion On Plate</h4>
                <p style={{ fontSize:"clamp(12px,1.2vw,14px)", color:"rgba(201,212,203,.5)", lineHeight:1.8, marginBottom:20 }}>Experience travel as it's meant to be — immersive, inspiring, unforgettable.</p>
                <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:8, color:"#c9d4cb", border:"1px solid rgba(201,212,203,.22)", padding:"11px 20px", fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", textDecoration:"none" }}>VIEW MENU {Ico.arrow}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section style={{ padding:"clamp(56px,8vw,88px) 0", background:BG }}>
        <div className="sec-wrap">
          <div className="sec-head-row" style={{ marginBottom:"clamp(32px,5vw,50px)" }}>
            <div className="sec-head-text">
              <Reveal>
                <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.38, marginBottom:9 }}>07 _ CLIENTS FEEDBACK</p>
                <h2 className="marc" style={{ fontSize:"clamp(18px,4vw,50px)", fontWeight:400 }}>What Our Customers Says</h2>
              </Reveal>
            </div>
            <div className="sec-head-actions">
              <button type="button" className="nav-round-btn nav-round-btn--lg" onClick={() => setSlide(p => (p-1+TESTI.length)%TESTI.length)} aria-label="Previous testimonial">←</button>
              <button type="button" className="nav-round-btn nav-round-btn--lg nav-round-btn--dark" onClick={() => setSlide(p => (p+1)%TESTI.length)} aria-label="Next testimonial">→</button>
            </div>
          </div>
          <div className="testi-grid">
            {[0,1,2].map(offset => {
              const t = TESTI[(slide+offset)%TESTI.length]; const mid = offset===1;
              return (
                <div key={offset} className={`testi-card${offset===0?" testi-first":""}${mid?" testi-mid":""}`}
                  style={{ background:mid?DARK:"rgba(4,17,6,.04)", border:"1px solid rgba(4,17,6,.07)",
                  padding:"clamp(22px,2.5vw,32px) clamp(18px,2vw,26px)", transition:"all .5s" }}>
                  <div style={{ display:"flex", gap:3, marginBottom:15 }}>
                    {[...Array(5)].map((_,i) => (
                      <svg key={i} viewBox="0 0 24 24" fill={mid?"rgba(201,212,203,.55)":"rgba(4,17,6,.35)"} width="14" height="14">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize:"clamp(13px,1.3vw,15px)", lineHeight:1.82, marginBottom:22, color:mid?"#c9d4cb":DARK, opacity:mid?.84:.63, fontStyle:"italic" }}>
                    "Our recent trip was flawless, thanks to THE FOREST VIEW. Their expert planning and personalized service was truly unforgettable!"
                  </p>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <img src={t.img} alt={t.name} style={{ width:50, height:50, borderRadius:"50%", objectFit:"cover", flexShrink:0 }} />
                    <div style={{ minWidth:0 }}>
                      <h4 style={{ fontSize:15, fontWeight:600, color:mid?"#c9d4cb":DARK, marginBottom:3 }}>{t.name}</h4>
                      <span style={{ fontSize:12, color:mid?"rgba(201,212,203,.42)":"rgba(4,17,6,.38)" }}>{t.role}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display:"flex", gap:7, justifyContent:"center", marginTop:30 }}>
            {TESTI.map((_,i) => (
              <button key={i} onClick={() => setSlide(i)}
                style={{ width:i===slide?26:8, height:8, background:i===slide?DARK:"rgba(4,17,6,.15)", border:"none", cursor:"pointer", transition:"all .3s" }}/>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BLOG ══ */}
      <section style={{ padding:"clamp(56px,8vw,88px) 0", background:SHADE }}>
        <div className="sec-wrap">
          <div className="sec-head-row" style={{ marginBottom:"clamp(28px,4vw,48px)" }}>
            <div className="sec-head-text">
              <Reveal>
                <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.38, marginBottom:9 }}>08 _ BLOG AND INSIGHTS</p>
                <h2 className="marc" style={{ fontSize:"clamp(18px,4vw,50px)", fontWeight:400 }}>Read From Latest Blogs</h2>
              </Reveal>
            </div>
            <a href="#" className="sec-head-link" style={{ color:DARK, border:`1.5px solid ${DARK}`,
              padding:"11px 22px", fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", textDecoration:"none" }}>
              READ MORE {Ico.arrow}
            </a>
          </div>
          <div className="blogs-grid">
            {BLOGS.map((b,i) => (
              <Reveal key={b.title} delay={i*75}>
                <div className="b-card">
                  <div style={{ overflow:"hidden", height:"clamp(160px,18vw,215px)" }}>
                    <img src={b.img} alt={b.title} className="b-img" />
                  </div>
                  <div style={{ padding:"clamp(16px,2vw,20px) clamp(14px,1.8vw,18px)" }}>
                    <div style={{ display:"flex", gap:16, marginBottom:10, flexWrap:"wrap" }}>
                      <span style={{ fontSize:12, opacity:.45, display:"flex", alignItems:"center", gap:5 }}>
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><rect x="2" y="4" width="16" height="14" rx="2"/><path d="M6 2v4M14 2v4M2 9h16"/></svg>
                        {b.date}
                      </span>
                      <span style={{ fontSize:12, opacity:.45, display:"flex", alignItems:"center", gap:5 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        3 Comments
                      </span>
                    </div>
                    <h4 className="marc" style={{ fontSize:"clamp(16px,1.6vw,20px)", fontWeight:400, marginBottom:9, lineHeight:1.28 }}>{b.title}</h4>
                    <p style={{ fontSize:"clamp(12px,1.2vw,13px)", lineHeight:1.72, opacity:.52, marginBottom:16 }}>{b.text}</p>
                    <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:DARK, textDecoration:"none" }}>
                      READ MORE {Ico.arrow}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-section">
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse at 15% 50%, rgba(4,17,6,.04) 0%, transparent 55%), radial-gradient(ellipse at 85% 50%, rgba(4,17,6,.03) 0%, transparent 55%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(to right, transparent, rgba(4,17,6,.12), transparent)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", background:"linear-gradient(to right, transparent, rgba(4,17,6,.08), transparent)" }} />
        <div className="cta-inner">
          <Reveal className="cta-circle-wrap">
            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&q=80" alt="Luxury hotel pool" />
          </Reveal>
          <div style={{ textAlign:"center", flex:1, maxWidth:580, minWidth:0 }}>
            <Reveal>
              <p className="cta-label">09 _ BOOK YOUR STAY NOW</p>
              <h2 className="marc cta-heading">Reserve Now for a Luxurious Stay</h2>
              <p className="cta-body">Book today to indulge in unparalleled luxury &amp; serene surroundings with exclusive reservations.</p>
              <a href="#" className="cta-btn">
                <span className="cta-btn-icon">{Ico.arrow}</span>
                BOOK YOUR ACCOMMODATION
              </a>
            </Reveal>
          </div>
          <Reveal className="cta-circle-wrap" delay={140}>
            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&q=80" alt="Hotel exterior" />
          </Reveal>
        </div>
      </section>

  
    </div>
  );
}