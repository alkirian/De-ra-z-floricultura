import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import CartFloatButton from './components/CartFloatButton';
import Footer from './components/Footer';
import './index.css';

// Lazy loaded pages to optimize bundle size and loading speed
const Home = React.lazy(() => import('./pages/Home'));
const Catalog = React.lazy(() => import('./pages/Catalog'));
const Contact = React.lazy(() => import('./pages/Contact'));
const LearnRoot = React.lazy(() => import('./pages/LearnRoot'));
const LearnTopic = React.lazy(() => import('./pages/LearnTopic'));

// Lazy loaded auxiliary panels
const CartPanel = React.lazy(() => import('./components/CartPanel'));

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
