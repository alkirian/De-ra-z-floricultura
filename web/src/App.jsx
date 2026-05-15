import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Advice from './pages/Advice';
import Gifts from './pages/Gifts';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/asesoramiento" element={<Advice />} />
            <Route path="/regalos" element={<Gifts />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
