import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import CartPanel from './components/CartPanel';
import CartFloatButton from './components/CartFloatButton';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import LearnRoot from './pages/LearnRoot';
import LearnTopic from './pages/LearnTopic';
import Footer from './components/Footer';
import './index.css';

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <Router basename={basename}>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/aprende-de-raiz" element={<LearnRoot />} />
            <Route path="/aprende-de-raiz/:topicSlug" element={<LearnTopic />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <CartPanel />
        <CartFloatButton />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;
