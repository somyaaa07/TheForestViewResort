import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import SafarHomePage from './pages/Home'
import SafarAboutPage from './pages/About'
import ContactPage from './pages/Contact'
import HotelBookingPage from './pages/Accodnmation'
import HotelNavbar from './common/Navbar'
import ServicesPage from './pages/Services'
import Footer from './common/Footer'
import SafariBooking from './pages/SafariBooking'
import PremiumGallery from './pages/Gallery'
import Blog from './pages/Blog'
import BlogDetails from './pages/Blogdetail'

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <HotelNavbar />
        <Routes>

          <Route path="/" element={
            <>
              <Helmet>
                <title>Best Hotels in Ranthambore | The Forest View Resort & Jungle Stay</title>
                <meta name="description" content="Experience luxury and comfort at The Forest View Resort, one of the best hotels in Ranthambore. Enjoy jungle safari stays, rooftop café dining, spacious rooms, and unforgettable wildlife experiences near Ranthambore National Park.
" />
              </Helmet>
              <SafarHomePage />
            </>
          } />

          <Route path="/about" element={
            <>
              <Helmet>
                <title>About The Forest View Resort | Best Resort Stay in Ranthambore</title>
                <meta name="description" content="The Forest View Resort was created with a passion for hospitality and wildlife experiences, offering comfortable Ranthambore stays, warm service, and nature-inspired luxury near the tiger reserve." />
              </Helmet>
              <SafarAboutPage />
            </>
          } />

       <Route
  path="/contact"
  element={
    <>
      <Helmet>
        <title>Contact The Forest View Resort | Ranthambore Resort Booking & Support</title>
        <meta
          name="description"
          content="Contact The Forest View Resort for room bookings, Ranthambore safari assistance, event inquiries, and travel support. Reach our team for a seamless stay near Ranthambore National Park."
        />
      </Helmet>
      <ContactPage />
    </>
  }
/>

          <Route path="/accommodation" element={
            <>
              <Helmet>
                <title>Ranthambore Stays | Luxury Rooms & Jungle Accommodation</title>
                <meta name="description" content="Discover premium Ranthambore stays at The Forest View Resort with deluxe rooms, luxury tents, forest views, modern amenities, and peaceful nature surroundings near Ranthambore National Park." />
              </Helmet>
              <HotelBookingPage />
            </>
          } />

          <Route path="/services" element={
            <>
              <Helmet>
                <title>Ranthambore Resort Services | Safari, parking & Rooftop Café</title>
                <meta name="description" content="Enjoy premium hospitality at The Forest View Resort with jungle safari booking, spa services, rooftop café dining, couple packages, and personalized guest experiences in Ranthambore" />
              </Helmet>
              <ServicesPage />
            </>
          } />

       <Route
  path="/safari-booking"
  element={
    <>
      <Helmet>
        <title>Ranthambore Safari Booking | Jeep & Canter Safari Reservations</title>
        <meta
          name="description"
          content="Book your Ranthambore jungle safari with The Forest View Resort. Reserve Jeep or Canter safaris and enjoy an unforgettable wildlife adventure in Ranthambore National Park."
        />
      </Helmet>
      <SafariBooking />
    </>
  }
/>

       <Route
  path="/gallery"
  element={
    <>
      <Helmet>
        <title>Resort Gallery | The Forest View Resort Ranthambore Photos</title>
        <meta
          name="description"
          content="Explore The Forest View Resort gallery featuring luxury rooms, rooftop café, jungle surroundings, wildlife moments, and memorable guest experiences near Ranthambore National Park."
        />
      </Helmet>
      <PremiumGallery />
    </>
  }
/>

   <Route
  path="/blog"
  element={
    <>
      <Helmet>
        <title>Ranthambore Travel Blog | Safari Tips, Wildlife & Resort Guides</title>
        <meta
          name="description"
          content="Read expert travel guides, Ranthambore safari tips, wildlife stories, resort updates, and local attractions from The Forest View Resort blog to plan your perfect jungle getaway."
        />
      </Helmet>
      <Blog />
    </>
  }
/>

          <Route path="/blog/:id" element={
            <BlogDetails />
          } />

        </Routes>
        <Footer />
      </Router>
    </HelmetProvider>
  )
}