import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import Footer from './components/Footer';
import './index.css';

const Catalog = lazy(() => import('./pages/Catalog'));
const Advice = lazy(() => import('./pages/Advice'));
const Gifts = lazy(() => import('./pages/Gifts'));
const Contact = lazy(() => import('./pages/Contact'));

const RouteFallback = () => (
  <div className="route-fallback" aria-live="polite">
    Cargando...
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/asesoramiento" element={<Advice />} />
              <Route path="/regalos" element={<Gifts />} />
              <Route path="/contacto" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;
