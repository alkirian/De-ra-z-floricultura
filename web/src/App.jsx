import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import CartPanel from './components/CartPanel';
import CartFloatButton from './components/CartFloatButton';
import Home from './pages/Home';
import Footer from './components/Footer';
import './index.css';

const Catalog = lazy(() => import('./pages/Catalog'));
const Advice = lazy(() => import('./pages/Advice'));
const Gifts = lazy(() => import('./pages/Gifts'));
const Contact = lazy(() => import('./pages/Contact'));
const LearnRoot = lazy(() => import('./pages/LearnRoot'));
const LearnTopic = lazy(() => import('./pages/LearnTopic'));

const RouteFallback = () => (
  <div className="route-fallback" aria-live="polite">
    Cargando...
  </div>
);

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <Router basename={basename}>
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
              <Route path="/aprende-de-raiz" element={<LearnRoot />} />
              <Route path="/aprende-de-raiz/:topicSlug" element={<LearnTopic />} />
              <Route path="/contacto" element={<Contact />} />
            </Routes>
          </Suspense>
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
