import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import SafarHomePage from './pages/Home'
import SafarAboutPage from './pages/About'
import ContactPage from './pages/Contact'
import HotelBookingPage from './pages/Accodnmation'
import HotelNavbar from './common/Navbar'
import ServicesPage from './pages/Services'
import Footer from './common/Footer'
import SafariBooking from './pages/SafariBooking'
import PremiumGallery from './pages/Gallery'
export default function App() {
  return (
<Router>
  <HotelNavbar/>
  <Routes>

    <Route path="/" element={
      <SafarHomePage/>
    }/>
    <Route path="/about" element={
      <SafarAboutPage/>
    }/>
    <Route path='/contact' element={
      <ContactPage/>
    }/>
    <Route path="/accommodation" element={
      <HotelBookingPage/>
    }/>
    <Route path="/services" element={
      <ServicesPage/>
    }/>
    <Route path="/safari-booking" element={
      <SafariBooking/>
    }/>

    <Route path="/gallery" element={
<PremiumGallery/>
    }/>
  </Routes>
  <Footer/>
</Router>
  )
}
