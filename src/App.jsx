import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import SafarHomePage from './pages/Home'
import SafarAboutPage from './pages/About'
import ContactPage from './pages/Contact'
import HotelBookingPage from './pages/Accodnmation'
import HotelNavbar from './common/Navbar'
import ServicesPage from './pages/Services'
import Footer from './common/Footer'
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
  </Routes>
  <Footer/>
</Router>
  )
}
