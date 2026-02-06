import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Leaf, Shield, Droplet, Flame, Brain } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import './App.css';

// Logo Component using actual image
function Logo({ variant = "navbar" }) {
  return (
    <a href="/" className={`logo-link logo-${variant}`}>
      <img
        src="/logo-removebg-preview.png"
        alt="Té Matcha Ceremony"
        className="logo-img"
      />
    </a>
  );
}

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  // WhatsApp Configuration
  const whatsappNumber = "+573172989227"; // Replace with actual number
  const whatsappMessage = encodeURIComponent("Hola, vengo de la web. Me gustaría comprar Té Matcha Ceremony.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Bloquea el scroll solo cuando el modal está abierto (y lo restaura siempre)
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  return (
    <div className="app">
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contactar por WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
      </a>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <Logo />
          <ul className="nav-links">
            <li><a href="#recetas">Recetas</a></li>
            <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-nav">Comprar</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section - Clean Professional */}
      <header className="hero-clean">
        <div className="container hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-content"
          >
            <h1 className="hero-title">
              Aumenta tu Vitalidad<br />
              y haz <span className="text-accent">Match</span><br />
              con tu Bienestar
            </h1>

            <p className="hero-subtitle">
              Descubre el poder del Té Matcha Ceremony. Energía sostenida,
              antioxidantes naturales y una experiencia zen en cada taza.
            </p>

            <div className="hero-cta-group">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Empieza Hoy
              </a>
              <a href="#recetas" className="btn-secondary">
                Ver Recetas
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="trust-row">
              <div className="trust-item">
                <span className="trust-symbol">✓</span>
                <span>Certificado Orgánico</span>
              </div>
              <div className="trust-item">
                <span className="trust-symbol">★</span>
                <span>100% Natural</span>
              </div>
              <div className="trust-item">
                <span className="trust-symbol">⚡</span>
                <span>Energía Sostenida</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-visual"
          >
            <img src="/hero.jpg" alt="Matcha Ceremony Product" />
          </motion.div>
        </div>
      </header>

      {/* Wave Divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Recipes Section */}
      <section id="recetas" className="section recipes-clean">
        <div className="container">
          <div className="section-intro">
            <h2>Recetas Sugeridas</h2>
            <p>Haz clic en cualquier imagen para ver la receta completa.</p>
          </div>
          <div className="recipes-grid-clean">
            <RecipeCard image="/recipe-vainilla.jpg" onOpen={openModal} />
            <RecipeCard image="/recipe-coco.jpg" onOpen={openModal} />
            <RecipeCard image="/recipe-especias.jpg" onOpen={openModal} />
            <RecipeCard image="/recipe-chocolate.jpg" onOpen={openModal} />
            <RecipeCard image="/matcha-latte.jpg" onOpen={openModal} />
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-container"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
              <img src={selectedImage} alt="Recipe Detail" className="modal-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - Single Unified Section */}
      <footer className="footer-premium">
        <div className="container footer-unified">
          {/* Left Section: Logo + Social */}
          <div className="footer-left-section">
            <Logo variant="footer" />
            <div className="social-links-revamped">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link instagram" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link facebook" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </div>
          </div>

          {/* Right Section: Navigation */}
          <div className="footer-right-section">
            <h4 className="footer-title">Navegación</h4>
            <ul className="footer-nav-list">
              <li><a href="#recetas">Recetas Sugeridas</a></li>
              <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer">Tienda Oficial (WhatsApp)</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright - integrated */}
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Té Matcha Ceremony. Calidad Ceremonial Garantizada.</p>
      </footer>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -12 }}
      className="benefit-card-clean"
    >
      <motion.div
        className="benefit-icon-wrapper"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <Icon size={48} className="benefit-icon" />
      </motion.div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </motion.div>
  );
}

function RecipeCard({ image, onOpen }) {
  return (
    <div className="recipe-card-clean" onClick={() => onOpen(image)}>
      <img src={image} alt="Matcha Recipe" />
      <div className="recipe-overlay">
        <span className="recipe-cta">Ver Receta</span>
      </div>
    </div>
  );
}

export default App;
