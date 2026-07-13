import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import CartFloatButton from './components/CartFloatButton';
import Footer from './components/Footer';
import './index.css';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import LearnRoot from './pages/LearnRoot';
import LearnTopic from './pages/LearnTopic';
import Admin from './pages/Admin';
import CartPanel from './components/CartPanel';

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <Router basename={basename}>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main>
          <React.Suspense fallback={<div className="page-loader-fade" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/aprende-de-raiz" element={<LearnRoot />} />
              <Route path="/aprende-de-raiz/:topicSlug" element={<LearnTopic />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </React.Suspense>
        </main>
        <Footer />
        <React.Suspense fallback={null}>
          <CartPanel />
        </React.Suspense>
        <CartFloatButton />
        <WhatsAppFloat />


      </div>
    </Router>
  );
}

export default App;
