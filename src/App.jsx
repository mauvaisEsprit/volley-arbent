import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Image from './components/Images';
import Footer from './components/Footer';
import ScrollUpButton from './components/ScrollUpButton';
import Navbar from './components/Navbar';



import Home from './pages/Home';
import News from './pages/News';
import Schedule from './pages/Schedule';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
      <ScrollUpButton />
    </Router>
  );
}

