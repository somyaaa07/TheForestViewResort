import { useState, useEffect, useRef } from "react";
import RoomsSection from "./RoomSection";
import { Link } from "react-router-dom";
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
  check:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>,
  balcony:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><rect x="3" y="10" width="18" height="4"/><path d="M3 14v6M21 14v6M7 14v6M11 14v6M15 14v6M19 14v6M3 20h18"/><path d="M6 10V6a6 6 0 0 1 12 0v4"/></svg>,
  garden:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M12 22V12"/><path d="M5 12C5 8 8 5 12 5s7 3 7 7"/><path d="M5 12c0-4-2-7-2-7s4 1 6 4"/><path d="M19 12c0-4 2-7 2-7s-4 1-6 4"/></svg>,
  pool:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M2 12 C4.5 9 7.5 9 10 12 C12.5 15 15.5 15 18 12 C20.5 9 23 9 23 12"/><path d="M2 18 C4.5 15 7.5 15 10 18 C12.5 21 15.5 21 18 18 C20.5 15 23 15 23 18"/><path d="M7 6 L7 2 M17 6 L17 2 M7 2 L17 2"/></svg>,
  toiletries: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M8 3h8l1 4H7z"/><rect x="6" y="7" width="12" height="14" rx="2"/><path d="M10 11h4M10 15h4"/></svg>,
  hanger:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" width="17" height="17"><path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M12 4v4M4 20l8-8 8 8"/><path d="M2 20h20"/></svg>,
};

const CatIcons = [
  <svg key="0" viewBox="0 0 57 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34"><path d="M32.9 44.8H24.1V55h8.8V44.8z"/><path d="M32.9 9.4H42.5V55H14.5V9.4h9.7"/><path d="M53.1 26H42.5V55h10.6V26z"/><path d="M14.5 26H3.9V55h10.6V26z"/><path d="M25.8 31.3H19.4v8.3h6.5v-8.3z"/><path d="M37.6 31.3h-6.4v8.3h6.4v-8.3z"/></svg>,
  <svg key="1" viewBox="0 0 57 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34"><path d="M41.8 27H15.2v-6.3h26.6V27z"/><path d="M35 55H22V37h13V55z"/><path d="M1.6 55h53.8"/><path d="M41.8 55H15.2V31.7h26.6V55z"/><path d="M52 55H41.8V37.2H52V55z"/></svg>,
  <svg key="2" viewBox="0 0 57 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34"><path d="M15.9 9.9c8.17-3.01 16.6-2.84 25.2 0"/><path d="M41.1 55H15.9V3.3c8.17-3.01 16.6-2.84 25.2 0V55z"/><path d="M15.9 23.1c8.17-3.01 16.6-2.84 25.2 0"/><path d="M34.5 40.6H22.5V55h12V40.6z"/></svg>,
  <svg key="3" viewBox="0 0 57 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34"><path d="M35.3 13.3H21.7V25.1h13.6V13.3z"/><path d="M54 30.6H3v21.5h51V30.6z"/><path d="M55.4 25.1H1.6v5.4h53.8v-5.4z"/><path d="M42.8 3.8H14.2V25.1h28.6V3.8z"/></svg>,
  <svg key="4" viewBox="0 0 57 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="34" height="34"><path d="M41.9 24l8.7 5.6V55H40.4"/><path d="M15.7 55H6.4V26.2l9.3-6.6V55z"/><path d="M41.8 14.4H29.3V55h12.5V14.4z"/><path d="M4.5 55h48"/></svg>,
];

const CATS = [
  { title:"Luxury Rooms",      count:"35+ Rooms" },
  { title:"Nature Cottages",   count:"8+ Cottages" },
  { title:"Jungle Suites",     count:"12+ Suites" },
  { title:"Family Rooms",      count:"10+ Rooms" },
  { title:"Eco Retreats",      count:"5+ Retreats" },
];

/* ─── REAL ROOMS from Booking.com screenshots ─── */
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
    views: ["Balcony", "Garden view", "Pool view", "Mountain view"],
    amenities: ["toiletries", "hanger", "fork", "balcony", "garden", "pool", "mountain"],
    amenityLabels: ["Free toiletries", "Clothes rack", "Dining area", "Balcony", "Garden view", "Pool view", "Mountain view"],
    policies: [
      "Free cancellation before 17 May 2026",
      "No prepayment needed – pay at the property",
      "No credit card needed",
    ],
    plans: [
      { name: "Flexible",               price: 2300, tax: 115, includes: [] },
      { name: "Flexible + Breakfast",   price: 2800, tax: 140, includes: ["Breakfast included"] },
      { name: "Flexible + Half Board",  price: 3300, tax: 165, includes: ["Breakfast & lunch included"] },
    ],
  },
  {
    title: "Standard King Room",
    type: "1 Single Bed",
    size: "18 m²",
    persons: "2 Persons",
    rating: 4.4,
    reviews: 139,
    tag: "Standard",
    img: "/10.jpeg",
    urgency: null,
    views: ["Garden view", "Pool view"],
    amenities: ["toiletries", "hanger", "fork", "garden", "pool", "wifi"],
    amenityLabels: ["Free toiletries", "Clothes rack", "Dining area", "Garden view", "Pool view", "Free WiFi"],
    policies: [
      "Free cancellation before 17 May 2026",
      "No prepayment needed – pay at the property",
      "No credit card needed",
    ],
    plans: [
      { name: "Flexible",               price: 2500, tax: 125, includes: [] },
      { name: "Flexible + Breakfast",   price: 3000, tax: 150, includes: ["Breakfast included"] },
    ],
  },
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

const TESTI = [
  { name:"sal thomp",        role:"Local Guide",          img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", rating:5, text:"Forest View is a great hotel for visiting Ranthambore. The staff were so friendly and helpful, helped us sort a last minute safari and provided everything we needed. Rooms were very clean, comfortable. Lovely view from terrace and rooftop — probably the best value for money place we stayed in four months in India." },
  { name:"Deepak Singh Rotela", role:"Verified Guest",    img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", rating:5, text:"This place was great value for money. Forest View is a great hotel for visiting Ranthambore. The staff were so friendly and helpful, rooms were very clean and comfortable." },
  { name:"siya anand",        role:"Family Traveler",     img:"https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face", rating:5, text:"Unbelievable experience. Guidance was spot on, we loved it. A truly memorable family stay at The Forest View Resort." },
  { name:"Tom Clutterbuck",   role:"Holiday · Family",    img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face", rating:5, text:"This place was great value for money. The staff were very helpful and friendly, helping to drive us around free of charge. Highly recommend for any family holiday to Ranthambore." },
  { name:"Charlie Clutterbuck", role:"Holiday · Friends", img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", rating:5, text:"Had a great stay here with my brother. They organised tours for us to the national park and were super accommodating. Everything was arranged seamlessly — could not fault them." },
  { name:"Chandan Singh Gurjar", role:"Local Guide",      img:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face", rating:5, text:"Very good stay and beautiful room, nice service. The Forest View Resort exceeded all our expectations during our Ranthambore visit." },
  { name:"Rohit Kumar",       role:"Family Stay",         img:"https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&crop=face", rating:5, text:"Very good place for family. Comfortable rooms, great hospitality, and wonderful service throughout our stay. Would definitely recommend to all families visiting Ranthambore." },
  { name:"Guddu Pareek",      role:"Verified Guest",      img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face", rating:5, text:"Good hospitality and very good price. The Forest View Resort offers excellent value with warm, welcoming service that made our stay truly comfortable." },
];

const BLOGS = [
  { title:"Your Ranthambore Safari Begins Here",       date:"October 19, 2025", img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=85",  text:"From thrilling tiger safaris to serene nature walks, we plan every detail for your perfect Ranthambore escape." },
  { title:"Where Jungle Comfort Feels Like Home",      date:"October 17, 2025", img:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=85", text:"Our nature-inspired rooms combine world-class comfort with authentic Rajasthani charm and warm hospitality." },
  { title:"Top Tips For A Ranthambore Wildlife Trip",  date:"October 15, 2025", img:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&q=85",  text:"From the best safari zones to golden-hour photography spots — our guests share their favourite Ranthambore memories." },
];

const SERVICES = [
  { num:"01", title:"Jungle Safari Assistance", ik:"bell",     text:"Our dedicated safari team organises early-morning and evening jeep safaris into Ranthambore National Park — booking zone permits, naturalist guides, and the best big-cat photography spots.",          tags:["Safari Zones 1–5","Expert Naturalist","Photography Tips"] },
  { num:"02", title:"Resort Transfers",         ik:"plane",    text:"Seamless pick-up and drop-off from Sawai Madhopur Railway Station or Jaipur Airport. Comfortable vehicles, warm welcome, and a hassle-free journey to your jungle retreat.",      tags:["Station Pick-up","Airport Transfer","Luxury Vehicles"] },
  { num:"03", title:"Wellness & Relaxation",    ik:"spa",      text:"Unwind after a safari with traditional Ayurvedic treatments, soothing massages, yoga sessions at sunrise, and a peaceful pool surrounded by nature.",          tags:["Ayurvedic Spa","Sunrise Yoga","Relaxation Pool"] },
  { num:"04", title:"Rajasthani Dining",        ik:"dining",   text:"Savour authentic Rajasthani thalis, freshly prepared regional specialties, and a rooftop café dining experience with views of the surrounding jungle landscape.", tags:["Rooftop Café","Regional Cuisine","Room Service"] },
  { num:"05", title:"Family & Kids Activities", ik:"star",     text:"Nature walks, birdwatching trails, cultural experiences, and guided resort activities keep families and young wildlife enthusiasts engaged throughout their stay.",          tags:["Birdwatching","Nature Walks","Cultural Tours"] },
  { num:"06", title:"Event & Group Stays",      ik:"calendar", text:"Ideal for family reunions, corporate retreats, and group wildlife tours. Our team arranges group safari bookings, themed dinners, and personalised itineraries.",      tags:["Group Safaris","Corporate Stays","Customised Events"] },
];

/* ─── Footer ─── */
function Footer() {
  const FL = {
    Resort:["About Us","Our Story","Careers","Press & Media","Sustainability"],
    Explore:["Jungle Safaris","Wildlife Tours","Dining","Spa & Wellness","Family Activities"],
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
          <h3 className="marc" style={{ fontSize:"clamp(16px,2.4vw,32px)", fontWeight:400, color:"rgba(201,212,203,.88)", lineHeight:1.22 }}>Get Exclusive Offers &amp; Wildlife Updates</h3>
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
            <p style={{ fontSize:14, lineHeight:1.82, color:"rgba(201,212,203,.46)", marginBottom:26, maxWidth:270 }}>Experience the finest hospitality near Ranthambore National Park. Wildlife, comfort, and warm memories — all in one place.</p>
            <div style={{ display:"flex", gap:9, marginBottom:28, flexWrap:"wrap" }}>
              {SOC.map(s => <a key={s.l} href="#" className="ft-social" aria-label={s.l}>{s.i}</a>)}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(201,212,203,.06)", border:"1px solid rgba(201,212,203,.12)", padding:"11px 14px" }}>
              <span style={{ color:"rgba(201,212,203,.7)", flexShrink:0 }}>{Ico.trophy}</span>
              <div>
                <p style={{ fontSize:11, color:"rgba(201,212,203,.82)", fontWeight:600, letterSpacing:".06em" }}>BEST RESORT RANTHAMBORE</p>
                <p style={{ fontSize:11, color:"rgba(201,212,203,.36)", marginTop:2 }}>Wildlife Tourism Awards</p>
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
          {[["35+","Rooms & Suites"],["12k+","Happy Guests"],["10+","Years of Hospitality"],["4.9","Avg Rating"]].map(([n,l],i) => (
            <div key={i} style={{ padding:"26px 20px", background:"rgba(201,212,203,.04)", borderRight:i<3?"1px solid rgba(201,212,203,.08)":"none", textAlign:"center" }}>
              <div className="marc" style={{ fontSize:"clamp(20px,2.8vw,38px)", color:"rgba(201,212,203,.8)", lineHeight:1, marginBottom:7 }}>{n}</div>
              <p style={{ fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(201,212,203,.33)" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height:1, background:"rgba(201,212,203,.1)" }} />
      <div style={{ maxWidth:1380, margin:"0 auto", padding:"20px clamp(18px,4vw,48px)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
        <p style={{ fontSize:13, color:"rgba(201,212,203,.3)" }}>© {new Date().getFullYear()} THE FOREST VIEW RESORT. All rights reserved.</p>
        <div style={{ display:"flex", gap:22, flexWrap:"wrap" }}>
          {["Privacy Policy","Terms of Use","Cookie Settings"].map(l => <a key={l} href="#" style={{ fontSize:12, color:"rgba(201,212,203,.33)", textDecoration:"none" }}>{l}</a>)}
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   ROOM CARD COMPONENT — with plan tabs + policies
══════════════════════════════════════════════ */
function RoomCard({ r, i, wishlist, toggleWish }) {
  const [planIdx, setPlanIdx] = useState(0);
  const plan = r.plans[planIdx];

  return (
    <Reveal delay={i * 90}>
      <article className="r-card r-card--pro">
        {/* Image */}
        <div className="r-img-wrap">
          <img src={r.img} alt={r.title} className="r-img" />
          <span className="r-tag">{r.tag}</span>
          <button type="button" className="r-wish" onClick={() => toggleWish(i)} aria-label="Wishlist">
            <svg viewBox="0 0 24 24" fill={wishlist.has(i)?"#c73d2a":"none"} stroke={wishlist.has(i)?"#c73d2a":"rgba(4,17,6,.5)"} strokeWidth="1.5" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          {r.urgency && (
            <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(199,61,42,.88)", padding:"7px 14px", display:"flex", alignItems:"center", gap:7, zIndex:2 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span style={{ fontSize:11, fontWeight:700, color:"#fff", letterSpacing:".1em", textTransform:"uppercase" }}>{r.urgency}</span>
            </div>
          )}
        </div>

        <div className="r-body">
          {/* Title row */}
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

          {/* Meta */}
          <div className="r-meta-row">
            <span style={{ display:"flex", alignItems:"center", gap:5 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path d="M2 9L2 20"/><path d="M22 9L22 20"/><path d="M2 14L22 14"/><rect x="2" y="9" width="9" height="5" rx="1"/><rect x="13" y="9" width="9" height="5" rx="1"/></svg>
              {r.type}
            </span>
            <span className="r-meta-dot" aria-hidden />
            <span style={{ display:"flex", alignItems:"center", gap:5 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {r.persons}
            </span>
            <span className="r-meta-dot" aria-hidden />
            <span style={{ display:"flex", alignItems:"center", gap:5 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
              {r.size}
            </span>
          </div>

          {/* Amenity tags */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
            {r.amenityLabels.map((label) => (
              <span key={label} style={{ fontSize:10, fontWeight:600, letterSpacing:".06em", padding:"4px 9px",
                background:"rgba(4,17,6,.05)", border:"1px solid rgba(4,17,6,.1)", color:"rgba(4,17,6,.65)",
                textTransform:"uppercase", borderRadius:4 }}>
                {label}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height:1, background:"rgba(4,17,6,.08)", margin:"4px 0 14px" }} />

          {/* Plan tabs */}
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(4,17,6,.4)", marginBottom:8 }}>SELECT PLAN</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
            {r.plans.map((p, pi) => (
              <button key={p.name} type="button" onClick={() => setPlanIdx(pi)}
                style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"10px 12px", border:`1.5px solid ${planIdx===pi ? DARK : "rgba(4,17,6,.12)"}`,
                  background:planIdx===pi ? `${DARK}08` : "#fff",
                  cursor:"pointer", fontFamily:"'Jost',sans-serif", textAlign:"left", borderRadius:8,
                  transition:"all .2s",
                }}>
                <div style={{ display:"flex", flexDirection:"column", gap:3, minWidth:0 }}>
                  <span style={{ fontSize:13, fontWeight:600, color:DARK }}>{p.name}</span>
                  {p.includes.length > 0 && (
                    <span style={{ fontSize:11, color:"#2e7d32", fontWeight:500 }}>✓ {p.includes.join(" · ")}</span>
                  )}
                </div>
                <div style={{ textAlign:"right", flexShrink:0, marginLeft:10 }}>
                  <div className="marc" style={{ fontSize:"clamp(16px,2.2vw,20px)", color:DARK, lineHeight:1 }}>₹{p.price.toLocaleString()}</div>
                  <div style={{ fontSize:10, color:"rgba(4,17,6,.45)", marginTop:2 }}>+₹{p.tax} taxes</div>
                </div>
              </button>
            ))}
          </div>

          {/* Policies */}
          <div style={{ background:"rgba(46,125,50,.06)", border:"1px solid rgba(46,125,50,.18)", padding:"10px 12px", borderRadius:8, marginBottom:14 }}>
            {r.policies.map((pol) => (
              <div key={pol} style={{ display:"flex", alignItems:"flex-start", gap:7, padding:"3px 0" }}>
                <span style={{ color:"#2e7d32", marginTop:1, flexShrink:0 }}>{Ico.check}</span>
                <span style={{ fontSize:12, color:"#2e7d32", fontWeight:500, lineHeight:1.5 }}>{pol}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="r-book-btn">
            <Link to="/contact" className="r-link-explore">EXPLORE {Ico.arrow}</Link>
            <button type="button" className="r-bk-cta">
              Reserve — ₹{plan.price.toLocaleString()}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function ForestViewHomePage() {
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

        .spin{animation:spin 8s linear infinite}
        .sec-wrap{max-width:1380px;margin:0 auto;padding:0 clamp(16px,4vw,48px);width:100%}
        .sec-wrap > *{min-width:0}
        .sec-head-row{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:nowrap;gap:clamp(14px,3vw,22px)}
        .sec-head-text{flex:1 1 0;min-width:0}
        .sec-head-actions{display:flex;gap:10px;flex-shrink:0;align-items:center}

        .nav-round-btn{width:44px;height:44px;border:1.5px solid rgba(4,17,6,.2);background:none;cursor:pointer;font-size:18px;border-radius:12px;display:flex;align-items:center;justify-content:center;transition:background .2s,border-color .2s,transform .15s;flex-shrink:0}
        .nav-round-btn:hover{background:rgba(4,17,6,.04)}
        .nav-round-btn:active{transform:scale(.96)}
        .nav-round-btn--dark{border-color:${DARK};background:${DARK};color:${BG}}
        .nav-round-btn--dark:hover{background:#1a2e1c;border-color:#1a2e1c}
        .nav-round-btn--lg{width:46px!important;height:46px!important;font-size:17px!important}

        .sec-head-link{display:inline-flex;align-items:center;justify-content:center;gap:8px;text-align:center;flex-shrink:0;box-sizing:border-box;white-space:nowrap}

        .bed-tabs-shell{display:flex;justify-content:center;margin:0 0 clamp(24px,3vw,36px)}
        .bed-tabs-inner{display:flex;background:#ede8e2;padding:4px;border-radius:14px;max-width:100%;flex-wrap:wrap;justify-content:center;gap:4px}
        .about-feature-col{position:relative;overflow:visible}
        .about-feature-img{width:100%;height:clamp(260px,52vw,420px);object-fit:cover;object-position:top;display:block;border-radius:12px}
        .about-spin-badge{position:absolute;bottom:-26px;right:-8px;width:100px;height:100px;border-radius:50%;background:${DARK};display:flex;align-items:center;justify-content:center;flex-shrink:0}

        /* HERO */
        .hero-outer{position:relative;background-image:url('/banner.jpg');background-size:cover;background-position:center;min-height:100svh}
        .hero-overlay{position:absolute;inset:0;background:linear-gradient(120deg,rgba(4,17,6,.82) 0%,rgba(4,17,6,.48) 55%,rgba(4,17,6,.62) 100%)}
        .hero-inner{position:relative;z-index:2;max-width:1380px;margin:0 auto;padding:0 clamp(16px,4vw,48px);width:100%}
        .hero-layout{display:flex;align-items:stretch;justify-content:space-between;gap:clamp(20px,3vw,48px);width:100%;min-height:100svh;padding-top:clamp(80px,10vh,120px);padding-bottom:clamp(36px,6vh,72px)}
        .hero-left{flex:1 1 0;min-width:0;display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:8px}
        .hero-h1{font-size:clamp(38px,5vw,112px);color:#fff;font-weight:400;line-height:.92;margin:0}
        .hero-right{flex-shrink:0;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-end;padding-bottom:8px;width:clamp(300px,35vw,430px)}

        .vid-card{background:rgba(4,17,6,.72);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.16);padding:clamp(12px,2vw,18px) clamp(14px,2vw,18px);display:flex;align-items:center;gap:clamp(12px,2vw,16px);max-width:min(380px, 100%);border-radius:16px;box-shadow:0 20px 56px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.12);width:100%}
        .vid-card p{overflow-wrap:anywhere}
        .vid-card__thumb{position:relative;flex-shrink:0;width:clamp(72px,18vw,100px);aspect-ratio:4/3;max-height:88px;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.2)}
        .vid-card__thumb img{width:100%;height:100%;object-fit:cover;display:block}
        .vid-card__overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.28)}
        .vid-card__play{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.94);display:flex;align-items:center;justify-content:center;color:${DARK};font-size:12px;padding-left:3px;box-shadow:0 4px 14px rgba(0,0,0,.2)}
        .vid-card__body{min-width:0;flex:1}
        .vid-card__title{color:#fff;font-size:clamp(14px,1.6vw,18px);margin:0 0 6px;font-weight:500;letter-spacing:.01em}
        .vid-card__desc{color:rgba(255,255,255,.52);font-size:clamp(11.5px,1.35vw,13.5px);line-height:1.62;margin:0}
        .hero-easy-pill{border-radius:999px;overflow:hidden;border:2px solid rgba(255,255,255,.35);flex-shrink:0;box-shadow:0 10px 28px rgba(0,0,0,.22)}

        .hf-wrap{background:rgba(255,255,255,.97);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);padding:clamp(18px,2.5vw,32px) clamp(14px,2vw,28px) clamp(16px,2vw,28px);box-shadow:0 32px 80px rgba(4,17,6,.28),0 8px 24px rgba(4,17,6,.14);width:100%;border-radius:16px;border:1px solid rgba(255,255,255,.85)}
        .hf-title{font-size:clamp(17px,2vw,22px);font-weight:400;color:${DARK};margin-bottom:clamp(12px,1.5vw,20px);text-align:center}
        .hf-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
        .hf-label{display:block;font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(4,17,6,.45);margin-bottom:6px}
        .hf-date-box{position:relative;display:flex;align-items:center;border:1.5px solid rgba(4,17,6,.12);height:clamp(40px,5vw,48px);overflow:hidden;transition:border-color .25s;background:#fafaf9}
        .hf-date-box:focus-within{border-color:${DARK};background:#fff}
        .hf-date-input{flex:1;height:100%;border:none;outline:none;padding:0 8px;font-family:'Jost',sans-serif;font-size:clamp(11px,1.2vw,13px);color:${DARK};background:transparent;cursor:pointer;min-width:0;width:100%}
        .hf-date-icon{padding:0 8px;color:rgba(4,17,6,.3);pointer-events:none;flex-shrink:0;display:flex;align-items:center}
        .hf-counter-box{display:flex;align-items:center;justify-content:space-between;border:1.5px solid rgba(4,17,6,.12);height:clamp(40px,5vw,48px);padding:0 10px;background:#fafaf9}
        .hf-counter-btn{width:26px;height:26px;border-radius:50%;border:1.5px solid rgba(4,17,6,.15);background:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;color:${DARK};transition:all .2s;font-family:'Jost',sans-serif;line-height:1;flex-shrink:0}
        .hf-counter-btn:hover{background:${DARK};color:#fff;border-color:${DARK}}
        .hf-divider{height:1px;background:rgba(4,17,6,.07);margin:clamp(10px,1.5vw,18px) 0}
        .hf-cta{width:100%;height:clamp(44px,5vw,52px);background:${DARK};border:none;color:#fff;font-size:clamp(10px,1.1vw,11px);font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;font-family:'Jost',sans-serif;display:flex;align-items:center;justify-content:center;gap:10px;transition:background .25s,transform .2s,box-shadow .25s;white-space:nowrap;padding:0 12px;border-radius:0}
        .hf-cta:hover{background:#1a2e1c;transform:translateY(-2px);box-shadow:0 8px 24px rgba(4,17,6,.4)}
        .hf-cta:active{transform:translateY(0)}
        .hf-cta-icon{width:28px;height:28px;flex-shrink:0;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:300}

        /* ROOMS */
        .rooms-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(14px,2vw,24px);max-width:900px;margin:0 auto}
        .r-card{background:#fff;overflow:hidden;border-radius:12px;box-shadow:0 4px 20px rgba(4,17,6,.08);transition:transform .35s,box-shadow .35s;display:flex;flex-direction:column}
        .r-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(4,17,6,.16)}
        .r-img-wrap{position:relative;overflow:hidden;height:clamp(180px,20vw,220px);flex-shrink:0}
        .r-img{width:100%;height:100%;object-fit:cover;transition:transform .7s}
        .r-card:hover .r-img{transform:scale(1.07)}
        .r-tag{position:absolute;top:14px;left:14px;background:rgba(4,17,6,.76);backdrop-filter:blur(8px);color:#c9d4cb;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:5px 12px}
        .r-wish{position:absolute;top:14px;right:14px;width:36px;height:36px;background:rgba(255,255,255,.9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:all .25s;box-shadow:0 2px 10px rgba(0,0,0,.12)}
        .r-wish:hover{background:#fff;transform:scale(1.1)}
        .r-body{padding:clamp(14px,1.5vw,18px);flex:1;display:flex;flex-direction:column}
        .r-book-btn{margin-top:auto;padding-top:14px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(4,17,6,.07);flex-wrap:wrap;gap:8px}
        .r-bk-cta{background:${DARK};color:#fff;border:none;padding:9px 16px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;font-family:'Jost',sans-serif;transition:background .2s;white-space:nowrap}
        .r-bk-cta:hover{background:#1a2e1c}

        .section-rooms{background:linear-gradient(165deg,#0f1f13 0%,#1b3322 52%,#102015 100%)}
        .section-rooms .r-card--pro{background:#f6fbf7!important;border-radius:18px;border:2px solid rgba(5,27,14,.35)!important;box-shadow:0 2px 0 rgba(4,17,6,.14),0 20px 48px rgba(0,0,0,.28)!important;overflow:hidden}
        .section-rooms .r-card--pro:hover{transform:translateY(-4px);box-shadow:0 6px 0 rgba(4,17,6,.2),0 30px 64px rgba(0,0,0,.34)!important;border-color:rgba(5,27,14,.55)!important}
        .section-rooms .r-card--pro .r-img-wrap{height:clamp(190px,44vw,230px);border-radius:0}
        .section-rooms .r-card--pro .r-img-wrap::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(4,17,6,.5) 0%,transparent 60%);pointer-events:none}
        .section-rooms .r-card--pro .r-tag{top:12px;left:12px;background:${DARK};color:#e8f0e9;border:1px solid rgba(232,240,233,.28);letter-spacing:.12em;font-weight:800;box-shadow:0 6px 16px rgba(0,0,0,.24)}
        .section-rooms .r-card--pro .r-wish{z-index:3;border:1px solid rgba(4,17,6,.2);background:#fff}
        .section-rooms .r-card--pro .r-body{background:linear-gradient(180deg,#eef7f0 0%,#ffffff 70%);padding:clamp(16px,3vw,20px) clamp(15px,2.5vw,18px) clamp(14px,2vw,18px);border-top:4px solid ${DARK}}
        .section-rooms .r-card--pro .r-pro-title-row{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:12px}
        .section-rooms .r-card--pro .r-pro-title{font-size:clamp(15px,2.6vw,18px);font-weight:500;color:${DARK};line-height:1.28;margin:0;flex:1;min-width:0}
        .section-rooms .r-card--pro .r-rating-stack{display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0}
        .section-rooms .r-card--pro .r-rating-pill{display:inline-flex;align-items:center;gap:5px;background:${DARK};color:#e8f0e9;padding:5px 10px;border-radius:8px;font-size:12px;font-weight:700;border:1px solid rgba(255,255,255,.12)}
        .section-rooms .r-card--pro .r-reviews-note{font-size:11px;font-weight:600;color:rgba(4,17,6,.55)}
        .section-rooms .r-card--pro .r-meta-row{display:flex;align-items:center;flex-wrap:wrap;gap:8px 12px;margin-bottom:14px;font-size:13px;font-weight:500;color:${DARK}}
        .section-rooms .r-card--pro .r-meta-dot{width:4px;height:4px;border-radius:50%;background:rgba(4,17,6,.35);flex-shrink:0}
        .section-rooms .r-card--pro .r-book-btn{border-top:1px solid rgba(4,17,6,.12);padding-top:16px;margin-top:14px;gap:12px}
        .section-rooms .r-card--pro .r-bk-cta{border-radius:10px;padding:11px 20px;font-size:11px;letter-spacing:.11em;box-shadow:0 4px 16px rgba(4,17,6,.2)}
        .section-rooms .r-card--pro .r-link-explore{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${DARK};text-decoration:none;padding:10px 12px;border-radius:10px;border:1.5px solid rgba(4,17,6,.25);background:#ffffff}
        .section-rooms .r-card--pro .r-link-explore:hover{background:${DARK};color:#e8f0e9;border-color:${DARK}}

        /* HOTSPOT */
        .hotspot{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.95);border:2px solid rgba(4,17,6,.4);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;font-weight:700;color:${DARK};box-shadow:0 2px 12px rgba(0,0,0,.15);transition:all .25s;animation:pulse 2.5s ease-in-out infinite;touch-action:manipulation}
        .hotspot:hover,.hotspot.hs-on{background:${DARK};color:#fff;border-color:${DARK};transform:scale(1.15);animation:none;box-shadow:0 4px 18px rgba(4,17,6,.45)}
        .hs-popup{position:absolute;background:#fff;box-shadow:0 20px 60px rgba(4,17,6,.2),0 4px 16px rgba(4,17,6,.1);padding:clamp(14px,1.5vw,20px) clamp(14px,1.5vw,22px);width:clamp(200px,25vw,260px);z-index:50;bottom:calc(100% + 14px);left:50%;transform:translateX(-50%);animation:fadeUp .22s ease}
        .hs-popup p{overflow-wrap:anywhere}

        /* ABOUT */
        .about-grid{display:grid;grid-template-columns:320px 1fr 300px;gap:clamp(24px,4vw,48px);align-items:start}

        /* CATEGORIES */
        .cat-wrap{display:flex;gap:clamp(10px,2vw,20px);flex-wrap:wrap;justify-content:center}
        .cat-item{transition:transform .3s;cursor:pointer;text-align:center;flex:1 1 clamp(80px,16%,130px);max-width:140px;min-width:0}
        .cat-item:hover{transform:translateY(-5px)}

        /* SERVICES */
        .svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,1.5vw,20px)}
        .svc-card{padding:clamp(22px,2.5vw,32px) clamp(18px,2vw,28px);position:relative;overflow:hidden;border-radius:14px;transition:transform .3s,box-shadow .3s;cursor:default}
        .svc-card:hover{transform:translateY(-5px)}
        .svc-tag{display:inline-block;padding:4px 10px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(201,212,203,.1);color:rgba(201,212,203,.72);border:1px solid rgba(201,212,203,.15)}

        /* WHY */
        .why-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:clamp(14px,2vw,20px)}
        .ww{background:#fff;padding:clamp(22px,2.5vw,30px) clamp(18px,2vw,24px);position:relative;border-radius:14px;box-shadow:0 2px 18px rgba(4,17,6,.07);transition:box-shadow .3s}
        .ww:hover{box-shadow:0 8px 30px rgba(4,17,6,.13)}
        .wd{background:${DARK};padding:clamp(22px,2.5vw,30px) clamp(18px,2vw,24px);position:relative;border-radius:14px;box-shadow:0 6px 26px rgba(4,17,6,.28)}
        .w-ico{width:50px;height:50px;border-radius:50%;border:1.5px solid rgba(4,17,6,.15);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
        .w-ico-d{width:50px;height:50px;border-radius:50%;border:1.5px solid rgba(201,212,203,.22);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
        .ck-row{display:flex;align-items:flex-start;gap:14px;padding:10px 0;cursor:default}
        .ck-icon{width:22px;height:22px;border-radius:50%;min-width:22px;background:rgba(4,17,6,.06);border:1px solid rgba(4,17,6,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${DARK};transition:all .3s}
        .ck-row:hover .ck-icon{background:${DARK};color:#fff;border-color:${DARK}}

        /* RESTAURANT */
        .rest-grid{display:grid;grid-template-columns:1fr 1.15fr 1fr;gap:clamp(16px,2.5vw,28px);align-items:start}

        /* TESTIMONIALS */
        .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,2vw,20px)}
        .testi-card{border-radius:14px}

        /* BLOGS */
        .blogs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,24px)}
        .b-card{background:#fff;overflow:hidden;box-shadow:0 2px 12px rgba(4,17,6,.06);border-radius:12px}
        .b-img{transition:transform .6s;width:100%;height:100%;object-fit:cover;display:block}
        .b-card:hover .b-img{transform:scale(1.05)}

        /* BED TABS */
        .bed-tab{padding:clamp(8px,1vw,11px) clamp(16px,2vw,30px);font-size:clamp(13px,1.3vw,15px);font-weight:600;cursor:pointer;border:none;background:none;font-family:'Jost',sans-serif;transition:all .3s;white-space:nowrap;border-radius:10px}

        /* CTA */
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

        /* FOOTER */
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

        /* RESPONSIVE */
        @media(max-width:1023px){
          .hero-outer{min-height:auto!important}
          .hero-layout{flex-direction:column!important;align-items:stretch!important;min-height:auto!important;padding-top:clamp(88px,11vh,110px)!important;padding-bottom:clamp(32px,5vw,56px)!important;gap:clamp(20px,3vw,28px)!important}
          .hero-left{justify-content:flex-start!important;padding-bottom:0!important;width:100%!important}
          .hero-h1{font-size:clamp(36px,8vw,80px)!important;line-height:.95!important}
          .hero-right{width:100%!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;padding-bottom:0!important}
          .hf-wrap{max-width:560px!important}
          .vid-card{max-width:100%!important}
          .about-grid{grid-template-columns:1fr!important}
          .about-img-left{display:none!important}
          .rooms-grid{grid-template-columns:1fr!important;max-width:480px!important}
          .blogs-grid{grid-template-columns:1fr 1fr!important}
          .svc-grid{grid-template-columns:1fr 1fr!important}
          .testi-grid{grid-template-columns:1fr 1fr!important}
          .rest-grid{grid-template-columns:1fr!important}
          .why-grid{grid-template-columns:1fr 1fr!important}
          .ft-cols{grid-template-columns:1fr 1fr!important;gap:32px!important}
          .why-header{grid-column:1/3!important}
          .cta-circle-wrap:last-child{display:none!important}
          .why-circle-img{display:none!important}
        }
        @media(max-width:768px){
          .sec-wrap{padding-left:clamp(18px,4.5vw,26px)!important;padding-right:clamp(18px,4.5vw,26px)!important}
          .hero-h1{font-size:clamp(32px,8.5vw,64px)!important;line-height:.96!important}
          .hf-wrap{max-width:100%!important}
          .rooms-grid{grid-template-columns:1fr!important;max-width:100%!important}
          .why-grid{grid-template-columns:1fr 1fr!important}
          .why-header{grid-column:1/3!important}
          .testi-grid{grid-template-columns:1fr!important}
          .testi-card:not(.testi-first){display:none!important}
          .blogs-grid{grid-template-columns:1fr!important}
          .svc-grid{grid-template-columns:1fr 1fr!important}
          .ft-cols{grid-template-columns:1fr 1fr!important}
          footer .ft-cols > div:first-child{grid-column:1/3!important}
          .cta-circle-wrap{display:none!important}
        }
        @media(max-width:640px){
          .hero-h1{font-size:clamp(30px,9vw,52px)!important}
          .why-grid{grid-template-columns:1fr!important}
          .why-header{grid-column:1!important}
          .svc-grid{grid-template-columns:1fr!important}
          .stats-4{grid-template-columns:1fr 1fr!important}
          .ft-cols{grid-template-columns:1fr!important}
          footer .ft-cols > div:first-child{grid-column:1!important}
        }
        @media(max-width:480px){
          .hero-h1{font-size:clamp(26px,9.5vw,40px)!important}
          .hf-grid-2{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section className="hero-outer">
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-layout">
            <div className="hero-left">
              <Reveal delay={100}>
                <div style={{ display:"flex", alignItems:"center", gap:"clamp(10px,2vw,16px)", margin:"12px 0", flexWrap:"nowrap" }}>
                  <h1 className="marc hero-h1"> STAY IN <br/><span >THE BEST</span></h1>
                  <div className="hero-easy-pill" style={{ width:"clamp(60px,8vw,96px)", height:"clamp(34px,5vw,50px)", marginTop:4 }}>
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80" alt="Forest View Resort" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:.9 }} />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={180}><h1 className="marc hero-h1">HOTELS IN RANTHAMBORE</h1></Reveal>
              <Reveal delay={240}>
                <p style={{ color:"rgba(255,255,255,.60)", fontSize:"clamp(13px,1.4vw,16px)", maxWidth:500, lineHeight:1.78, marginTop:"clamp(16px,2vw,24px)", marginBottom:0 }}>
                  With luxury experiences designed around nature &amp; comfort — discover the best resort near Ranthambore National Park.
                </p>
              </Reveal>
       
            </div>
            <div className="hero-right">
              <Reveal delay={240} style={{ width:"100%" }}>
                <div className="hf-wrap">
                  <h3 className="marc hf-title">Reserve Your Room</h3>
                  <div className="hf-grid-2">
                    <div>
                      <label className="hf-label">CHECK-IN</label>
                      <div className="hf-date-box">
                        <input className="hf-date-input" type="text" placeholder="Check-in" value={checkIn}
                          onFocus={e => { e.target.type = "date"; }} onBlur={e => { if (!e.target.value) e.target.type = "text"; }}
                          onChange={e => setCheckIn(e.target.value)} />
                        <span className="hf-date-icon">{Ico.calDate}</span>
                      </div>
                    </div>
                    <div>
                      <label className="hf-label">CHECK-OUT</label>
                      <div className="hf-date-box">
                        <input className="hf-date-input" type="text" placeholder="Check-out" value={checkOut}
                          onFocus={e => { e.target.type = "date"; }} onBlur={e => { if (!e.target.value) e.target.type = "text"; }}
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
            <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.45, marginBottom:12 }}>01 _ THE FOREST VIEW RESORT — RANTHAMBORE</p>
            <h2 className="marc" style={{ fontSize:"clamp(20px,3.6vw,52px)", fontWeight:400, lineHeight:1.22, marginBottom:52 }}>
              In Search Of The Top Hotels In Ranthambore?<br/>
              <span style={{ color:"rgba(4,17,6,.28)" }}>Your Ideal Wildlife &amp; Comfort Stay Awaits.</span>
            </h2>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-img-left">
              <img src="/sher.jpg" alt="Forest View Resort near Ranthambore National Park" style={{ width:"100%", height:500, objectFit:"cover", display:"block" }} />
            </Reveal>
            <div style={{ paddingTop:4 }}>
              <Reveal>
                <p style={{ fontSize:"clamp(14px,1.5vw,16px)", lineHeight:1.82, opacity:.63, marginBottom:24 }}>
                  The Forest View Resort provides the ideal balance of comfort, luxury, and wildlife exploration. Our resort, which is close to Ranthambore National Park, offers families, couples, and wildlife enthusiasts memorable stays.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <div style={{ marginBottom:24 }}>
                  {["One of the best hotels in Ranthambore for luxury stays","Comfortable rooms near Ranthambore National Park","Hassle-free booking with warm, personalized hospitality","Perfect destination for wildlife and nature lovers"].map(item => (
                    <div key={item} className="ck-row">
                      <div className="ck-icon"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><polyline points="2 6 5 9 10 3"/></svg></div>
                      <span style={{ fontSize:"clamp(13px,1.4vw,15px)", fontWeight:500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <div style={{ height:1, background:"rgba(4,17,6,.12)", margin:"20px 0" }} />
              <Reveal delay={160}>
                <div style={{ display:"flex", gap:"clamp(24px,4vw,40px)" }}>
                  <div>
                    <div className="marc" style={{ fontSize:"clamp(32px,5vw,56px)", color:DARK, lineHeight:1 }}><Counter target={35} suffix="+"/></div>
                    <p style={{ fontSize:10, letterSpacing:".2em", textTransform:"uppercase", marginTop:7, opacity:.44 }}>ROOMS &amp; SUITES</p>
                  </div>
                  <div>
                    <div className="marc" style={{ fontSize:"clamp(32px,5vw,56px)", color:DARK, lineHeight:1 }}><Counter target={12} suffix="k+"/></div>
                    <p style={{ fontSize:10, letterSpacing:".2em", textTransform:"uppercase", marginTop:7, opacity:.44 }}>HAPPY GUESTS</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <div className="about-feature-col">
                <img src="/1.jpeg" alt="Luxury resort near Ranthambore National Park" className="about-feature-img" />
                <div className="spin about-spin-badge">
                  <svg viewBox="0 0 114 114" style={{ position:"absolute", width:100, height:100 }}>
                    <path id="spbadge" d="M57,57 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" fill="none"/>
                    <text style={{ fontSize:9.2, fill:"#c9d4cb", letterSpacing:2.7 }}><textPath href="#spbadge">THE FOREST VIEW RESORT • RANTHAMBORE • 2012 •</textPath></text>
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9d4cb" strokeWidth="1.4" width="19" height="19"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
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
                <h2 className="marc" style={{ fontSize:"clamp(18px,4vw,50px)", fontWeight:400 }}>Browse Our Room Categories</h2>
              </Reveal>
            </div>
            <div className="sec-head-actions">
              <button type="button" className="nav-round-btn" onClick={() => setCatIdx(p => (p-1+CATS.length)%CATS.length)}>←</button>
              <button type="button" className="nav-round-btn nav-round-btn--dark" onClick={() => setCatIdx(p => (p+1)%CATS.length)}>→</button>
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
                    <div style={{ position:"absolute", inset:10, borderRadius:"50%", background:active?DARK:"rgba(4,17,6,.05)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .3s", color:active?"#c9d4cb":DARK }}>{CatIcons[i]}</div>
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
<RoomsSection wishlist={wishlist} toggleWish={toggleWish} />
      {/* ══ BED SECTION ══ */}
      <section style={{ padding:"clamp(48px,7vw,72px) 0 clamp(56px,8vw,88px)", background:"#d4ddd6" }}>
        <div className="sec-wrap">
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:14 }}>
              <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.4, marginBottom:10 }}>ROOM DETAILS</p>
              <h2 className="marc" style={{ fontSize:"clamp(18px,3.5vw,46px)", fontWeight:400 }}>Explore Bed Configuration</h2>
              <p style={{ fontSize:14, opacity:.5, marginTop:8 }}>Tap the <span style={{ color:DARK, fontWeight:700, fontSize:16 }}>+</span> markers to discover materials &amp; specs</p>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="bed-tabs-shell">
              <div className="bed-tabs-inner">
                {["Twin Bed","King Size Bed"].map((t,i) => (
                  <button key={t} type="button" className="bed-tab" onClick={() => { setBedTab(i); setActiveHS(null); }}
                    style={{ background:bedTab===i?"#fff":"transparent", color:bedTab===i?DARK:"rgba(4,17,6,.45)", boxShadow:bedTab===i?"0 2px 8px rgba(4,17,6,.12)":undefined }}>{t}</button>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ position:"relative", maxWidth:1380, margin:"0 auto" }}>
              <img src={bedTab===0?"/roomphoto1.jpeg":"/roomphoto.jpeg"}
                alt="Room bed" style={{ width:"100%", display:"block", maxHeight:"clamp(240px,40vw,480px)", objectFit:"cover" }} />
              <div style={{ position:"absolute", inset:0, background:"rgba(4,17,6,.1)", pointerEvents:"none" }} />
              {hotspots.map(hs => (
                <div key={hs.id} style={{ position:"absolute", top:hs.top, left:hs.left, right:hs.right, bottom:hs.bottom, transform:hs.tX?`translateX(${hs.tX})`:undefined, zIndex:activeHS===hs.id?20:10, width:32, height:32 }}>
                  <button className={`hotspot${activeHS===hs.id?" hs-on":""}`} onClick={() => setActiveHS(activeHS===hs.id?null:hs.id)} title={hs.label}>
                    {activeHS===hs.id?"×":"+"}
                  </button>
                  {activeHS===hs.id && (
                    <div className="hs-popup">
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                        <div style={{ width:36, height:36, borderRadius:"50%", background:`${DARK}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:DARK }}>{Ico[hs.ik]}</div>
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
                <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.4, marginBottom:12 }}>04 _ RESORT SERVICES</p>
                <h2 className="marc" style={{ fontSize:"clamp(18px,4vw,50px)", fontWeight:400, lineHeight:1.2 }}>Everything You Need,<br/><span style={{ color:"rgba(4,17,6,.28)" }}>Right Where Nature Awaits</span></h2>
              </div>
              <Link to="/accommodation" className="sec-head-link" style={{ color:DARK, border:`1.5px solid ${DARK}`, padding:"12px 26px", fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", textDecoration:"none" }}>
                VIEW ALL {Ico.arrow}
              </Link>
            </div>
          </Reveal>
          <div className="svc-grid">
            {SERVICES.map((s,i) => (
              <Reveal key={s.title} delay={i*65}>
                <div className="svc-card" style={{ background:i%2===0?DARK:SVCDARK, boxShadow:`0 8px 32px rgba(4,17,6,${i%2===0?".15":".24"})` }}>
                  <span className="marc" style={{ position:"absolute", top:16, right:20, fontSize:56, fontWeight:400, color:"rgba(201,212,203,.07)", lineHeight:1, userSelect:"none" }}>{s.num}</span>
                  <div style={{ width:54, height:54, borderRadius:"50%", border:"1.5px solid rgba(201,212,203,.2)", background:"rgba(201,212,203,.08)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, color:"rgba(201,212,203,.8)" }}>{Ico[s.ik]}</div>
                  <h3 className="marc" style={{ fontSize:"clamp(18px,1.8vw,22px)", fontWeight:400, color:"#c9d4cb", marginBottom:12, lineHeight:1.2 }}>{s.title}</h3>
                  <p style={{ fontSize:"clamp(12px,1.2vw,13.5px)", color:"rgba(201,212,203,.54)", lineHeight:1.82, marginBottom:20 }}>{s.text}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:22 }}>
                    {s.tags.map(tag => <span key={tag} className="svc-tag">{tag}</span>)}
                  </div>
                  <Link to="/services" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(201,212,203,.65)", textDecoration:"none" }}
                    onMouseEnter={e => e.currentTarget.style.color="#c9d4cb"} onMouseLeave={e => e.currentTarget.style.color="rgba(201,212,203,.65)"}>
                    LEARN MORE {Ico.arrow}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY ══ */}
      <section style={{ padding:"clamp(56px,8vw,88px) 0 clamp(64px,9vw,96px)", background:SHADE }}>
        <div className="sec-wrap">
          <div className="why-grid">
            <Reveal style={{ gridColumn:"1/3" }} className="why-header">
              <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.38, marginBottom:12 }}>05 _ WHY CHOOSE THE FOREST VIEW RESORT?</p>
              <h2 className="marc" style={{ fontSize:"clamp(18px,3.4vw,48px)", fontWeight:400, lineHeight:1.22, marginBottom:21 }}>Best Hotels In Ranthambore —<br/>Experience Nature &amp; Luxury Together</h2>
            </Reveal>
            {[
              { n:"01", ik:"map",   dark:false, title:"Prime Location",           text:"Situated close to Ranthambore National Park with convenient access to all safari zones and wildlife experiences." },
              { n:"02", ik:"hotel", dark:true,  title:"Personalized Hospitality", text:"Warm, attentive service designed around every guest — from safari bookings to room preferences and dining choices." },
              { n:"03", ik:"mtn",   dark:false, title:"Nature & Comfort",         text:"Wake up to beautiful jungle views, fresh air, and birdsong while enjoying modern amenities and relaxing accommodations." },
              { n:"04", ik:"paw",   dark:false, title:"Wildlife Safari Stays",    text:"Perfect for families, couples, and wildlife enthusiasts — our resort is the ideal base for Ranthambore jungle safaris." },
            ].map((w, i) => (
              <Reveal key={w.n} delay={70 + i*40} style={{ gridColumn:"span 1" }}>
                <div className={w.dark?"wd":"ww"}>
                  <span className="marc" style={{ position:"absolute", top:12, right:14, fontSize:42, fontWeight:400, color:w.dark?"rgba(201,212,203,.08)":"rgba(4,17,6,.05)", lineHeight:1 }}>{w.n}</span>
                  <div className={w.dark?"w-ico-d":"w-ico"} style={{ color:w.dark?"#c9d4cb":DARK }}>{Ico[w.ik]}</div>
                  <h3 className="marc" style={{ fontSize:"clamp(17px,1.6vw,21px)", fontWeight:400, color:w.dark?"#c9d4cb":DARK, marginBottom:9 }}>{w.title}</h3>
                  <p style={{ fontSize:"clamp(12px,1.2vw,13px)", lineHeight:1.8, color:w.dark?"#c9d4cb":DARK, opacity:w.dark?.58:.54, marginBottom:17 }}>{w.text}</p>
                  <Link to="/safari-booking" style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:w.dark?"#c9d4cb":DARK, textDecoration:"none" }}>READ MORE {Ico.arrow}</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RESTAURANT ══ */}
      <section style={{ padding:"clamp(56px,8vw,88px) 0", background:DARK }}>
        <div className="sec-wrap">
          <Reveal>
            <div style={{ marginBottom:"clamp(32px,5vw,50px)" }}>
              <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(201,212,203,.32)", marginBottom:9 }}>06 _ DINING EXPERIENCE</p>
              <h2 className="marc" style={{ fontSize:"clamp(18px,3.8vw,50px)", color:"#c9d4cb", fontWeight:400, lineHeight:1.18 }}>Savor Every Moment At The Forest View Resort</h2>
              <h2 className="marc" style={{ fontSize:"clamp(18px,3.8vw,50px)", color:"rgba(201,212,203,.17)", fontWeight:400, lineHeight:1.18 }}>Authentic Flavors Inspired By Nature</h2>
            </div>
          </Reveal>
          <div className="rest-grid">
            <Reveal delay={80}>
              <div style={{ background:"rgba(201,212,203,.05)", border:"1px solid rgba(201,212,203,.08)", padding:"clamp(22px,3vw,34px) clamp(18px,2.5vw,26px)" }}>
                <div style={{ width:50, height:50, borderRadius:"50%", border:"1.5px solid rgba(201,212,203,.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, color:"rgba(201,212,203,.7)" }}>{Ico.dining}</div>
                <h3 className="marc" style={{ fontSize:"clamp(18px,1.8vw,23px)", color:"#c9d4cb", fontWeight:400, marginBottom:11 }}>Delicious Dining</h3>
                <p style={{ fontSize:"clamp(12px,1.2vw,14px)", color:"rgba(201,212,203,.5)", lineHeight:1.8, marginBottom:24 }}>Enjoy freshly prepared meals, regional specialties, and carefully crafted dining experiences designed to complement your Ranthambore stay.</p>
                <Link to="/safari-booking" style={{ display:"inline-flex", alignItems:"center", gap:8, color:"#c9d4cb", border:"1px solid rgba(201,212,203,.24)", padding:"11px 22px", fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", textDecoration:"none" }}>EXPLORE DINING {Ico.arrow}</Link>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div>
                <div style={{ background:"rgba(201,212,203,.05)", border:"1px solid rgba(201,212,203,.08)", padding:"16px 20px", marginBottom:12 }}>
                  {[{ icon:Ico.fork, t:"Traditional Rajasthani Flavors" },{ icon:Ico.coffee, t:"Rooftop Café & Family Dining" }].map((it,ix) => (
                    <div key={it.t} style={{ display:"flex", alignItems:"center", gap:11, padding:"9px 0", color:"#c9d4cb", fontSize:"clamp(13px,1.3vw,15px)", fontWeight:500, borderBottom:ix===0?"1px solid rgba(201,212,203,.05)":"none" }}>
                      <span style={{ color:"rgba(201,212,203,.6)", flexShrink:0 }}>{it.icon}</span>
                      <span>{it.t}</span>
                    </div>
                  ))}
                </div>
                <img src="/7.jpeg" alt="Restaurant at Forest View Resort" style={{ width:"100%", height:215, objectFit:"cover", display:"block" }} />
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div>
                <img src="/4.jpeg" alt="Dining at Forest View Resort" style={{ width:"100%", height:195, objectFit:"cover", display:"block", marginBottom:20 }} />
                <h4 className="marc" style={{ fontSize:"clamp(17px,1.7vw,21px)", color:"#c9d4cb", fontWeight:400, marginBottom:11 }}>Taste The Essence Of Ranthambore</h4>
                <p style={{ fontSize:"clamp(12px,1.2vw,14px)", color:"rgba(201,212,203,.5)", lineHeight:1.8, marginBottom:20 }}>From traditional Rajasthani delicacies to comforting favorites, every meal is served with warmth and exceptional care.</p>
                <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:8, color:"#c9d4cb", border:"1px solid rgba(201,212,203,.22)", padding:"11px 20px", fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", textDecoration:"none" }}>VIEW DINING {Ico.arrow}</a>
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
                <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.38, marginBottom:9 }}>07 _ GUEST EXPERIENCES</p>
                <h2 className="marc" style={{ fontSize:"clamp(18px,4vw,50px)", fontWeight:400 }}>What Our Guests Say</h2>
                <p style={{ fontSize:13, opacity:.5, marginTop:6 }}>4.4 ★ · 139 reviews on Google</p>
              </Reveal>
            </div>
            <div className="sec-head-actions">
              <button type="button" className="nav-round-btn nav-round-btn--lg" onClick={() => setSlide(p => (p-1+TESTI.length)%TESTI.length)}>←</button>
              <button type="button" className="nav-round-btn nav-round-btn--lg nav-round-btn--dark" onClick={() => setSlide(p => (p+1)%TESTI.length)}>→</button>
            </div>
          </div>
          <div className="testi-grid">
            {[0,1,2].map(offset => {
              const t = TESTI[(slide+offset)%TESTI.length]; const mid = offset===1;
              return (
                <div key={offset} className={`testi-card${offset===0?" testi-first":""}${mid?" testi-mid":""}`}
                  style={{ background:mid?DARK:"rgba(4,17,6,.04)", border:"1px solid rgba(4,17,6,.07)", padding:"clamp(22px,2.5vw,32px) clamp(18px,2vw,26px)", transition:"all .5s" }}>
                  <div style={{ display:"flex", gap:3, marginBottom:15 }}>
                    {[...Array(t.rating)].map((_,i) => (
                      <svg key={i} viewBox="0 0 24 24" fill={mid?"rgba(201,212,203,.55)":"rgba(4,17,6,.35)"} width="14" height="14"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                  <p style={{ fontSize:"clamp(13px,1.3vw,15px)", lineHeight:1.82, marginBottom:22, color:mid?"#c9d4cb":DARK, opacity:mid?.84:.63, fontStyle:"italic" }}>"{t.text}"</p>
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
              <button key={i} onClick={() => setSlide(i)} style={{ width:i===slide?26:8, height:8, background:i===slide?DARK:"rgba(4,17,6,.15)", border:"none", cursor:"pointer", transition:"all .3s" }}/>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BLOG ══ */}
      {/* <section style={{ padding:"clamp(56px,8vw,88px) 0", background:SHADE }}>
        <div className="sec-wrap">
          <div className="sec-head-row" style={{ marginBottom:"clamp(28px,4vw,48px)" }}>
            <div className="sec-head-text">
              <Reveal>
                <p style={{ fontSize:11, letterSpacing:".22em", textTransform:"uppercase", opacity:.38, marginBottom:9 }}>08 _ BLOG &amp; TRAVEL GUIDES</p>
                <h2 className="marc" style={{ fontSize:"clamp(18px,4vw,50px)", fontWeight:400 }}>Ranthambore Travel Stories</h2>
              </Reveal>
            </div>
            <a href="#" className="sec-head-link" style={{ color:DARK, border:`1.5px solid ${DARK}`, padding:"11px 22px", fontSize:10, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", textDecoration:"none" }}>
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
                    </div>
                    <h4 className="marc" style={{ fontSize:"clamp(16px,1.6vw,20px)", fontWeight:400, marginBottom:9, lineHeight:1.28 }}>{b.title}</h4>
                    <p style={{ fontSize:"clamp(12px,1.2vw,13px)", lineHeight:1.72, opacity:.52, marginBottom:16 }}>{b.text}</p>
                    <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:DARK, textDecoration:"none" }}>READ MORE {Ico.arrow}</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══ CTA ══ */}
      <section className="cta-section">
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse at 15% 50%, rgba(4,17,6,.04) 0%, transparent 55%)", pointerEvents:"none" }} />
        <div className="cta-inner">
          <Reveal className="cta-circle-wrap">
            <img src="/2.jpeg" alt="Pool at Forest View Resort" />
          </Reveal>
          <div style={{ textAlign:"center", flex:1, maxWidth:580, minWidth:0 }}>
            <Reveal>
              <p className="cta-label">09 _ RANTHAMBORE HOTEL BOOKING</p>
              <h2 className="marc cta-heading">Reserve Your Jungle Stay Now</h2>
              <p className="cta-body">Book today to indulge in nature-inspired luxury, personalized hospitality, and thrilling wildlife experiences near Ranthambore National Park.</p>
              <Link to="/contact" className="cta-btn">
                <span className="cta-btn-icon">{Ico.arrow}</span>
                BOOK YOUR RANTHAMBORE STAY
              </Link>
            </Reveal>
          </div>
          <Reveal className="cta-circle-wrap" delay={140}>
            <img src="/6.jpeg" alt="Best resort in Ranthambore" />
          </Reveal>
        </div>
      </section>

  
    </div>
  );
}