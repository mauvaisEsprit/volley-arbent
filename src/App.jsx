import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollUpButton from './components/ScrollUpButton';
import ScrollToTop from './components/ScrollToTop';


import Home from './pages/Home';
import News from './pages/NewsList';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import Planning from './pages/Planning';
import MentionsLegales from './pages/MentionsLegales';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Faq from './pages/Faq';
import NewsDetail from './pages/NewsDetail';

export default function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      <Footer />
      <ScrollUpButton />
    </Router>
  );
}
