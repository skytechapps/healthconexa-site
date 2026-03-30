import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Moon, 
  Zap, 
  Brain, 
  Layout, 
  ArrowUp, 
  ChevronRight, 
  ChevronLeft,
  Smartphone,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import './index.css';
import logo from './assets/logo.png';
import landingImg from './assets/healthConexaAILanding.png';
import imgA from './assets/a.png';
import imgB from './assets/b.png';
import imgC from './assets/c.png';
import imgD from './assets/d.png';
import imgE from './assets/e.png';

const showcaseImages = [imgA, imgB, imgC, imgD, imgE];
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.skyApps.healthConexaAi';

// --- STYLIZED COMPONENTS ---

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {};
  const handleMouseLeave = () => {};


  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`card ${className}`}
      style={{
        '--mouse-x': `${position.x}px`,
        '--mouse-y': `${position.y}px`,
      } as any}
    >
      {children}
    </div>
  );
};

/** Official-style Google Play Store button */
const GooglePlayButton = ({ size = 'normal' }: { size?: 'normal' | 'large' }) => (
  <motion.a
    whileHover={{ y: -4, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    href={PLAY_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`gplay-btn ${size === 'large' ? 'gplay-btn--large' : ''}`}
    aria-label="Get SwarConnexa AI on Google Play"
  >
    <svg className="gplay-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <linearGradient id="gp1" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#00C6FF"/>
        <stop offset="100%" stopColor="#0072FF"/>
      </linearGradient>
      <path fill="url(#gp1)" d="M30 10.6L266.5 247 30 483.4c-12-7-20-19.8-20-34.4V45c0-14.6 8-27.4 20-34.4z"/>
      <path fill="#23A53D" d="M350 173.5l62.3-35.9L30 10.6C42 3.6 57 3 70.3 10.3L350 173.5z"/>
      <path fill="#FFDA00" d="M350 338.5L70.3 501.7C57 509 42 508.4 30 501.4L412.3 374.4 350 338.5z"/>
      <path fill="#FF3A44" d="M482 224.8l-69.7 40.2-62.3-18-62.3 18L482 224.8zm0 62.4L287.7 247l-21.2-0-21.2 0 215.7 62.4c8.6-4.9 17.3-9.8 26-14.8 4-2.3 4-8.1 0-10.4z" opacity=".9"/>
      <path fill="#C31162" d="M412.3 374.4l69.7 40.2c12-6.9 20-19.8 20-34.4v-0.2L412.3 374.4z" opacity=".9"/>
      <path fill="#23A53D" d="M482 97.4L412.3 137.6 482 177.8V97.4z" opacity=".9"/>
    </svg>
    <div className="gplay-text">
      <span className="gplay-text__eyebrow">GET IT ON</span>
      <span className="gplay-text__store">Google Play</span>
    </div>
  </motion.a>
);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="App">
      {/* Progress Bar */}
      <motion.div className="progress-bar" style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary-color)', zIndex: 2000, transformOrigin: '0%' }} />

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay active" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* ── HEADER ── */}
      <header className={`nav-wrapper ${isScrolled ? 'nav-scrolled' : ''}`}>
        <nav className="container nav-content">
          <motion.a 
            href="/" 
            className="nav-logo-link" 
            aria-label="SwarConnexa AI Home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={logo}
              alt="SwarConnexa AI"
              className={`nav-logo ${isScrolled ? 'nav-logo--scrolled' : ''}`}
            />
          </motion.a>

          {/* Desktop nav */}
          <div className="nav-links">
            {['Features', 'Intelligence', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            ))}
            <GooglePlayButton />
          </div>

          {/* Hamburger */}
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open navigation menu">
            <Layout size={28} />
          </button>
        </nav>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mobile-nav active" 
            role="dialog" 
            aria-modal="true"
          >
            <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close navigation menu">
              <ChevronRight size={28} />
            </button>
            <a href="/" className="mobile-nav-logo-link" aria-label="SwarConnexa AI Home">
              <img src={logo} alt="SwarConnexa AI" style={{ height: '60px', marginBottom: '2rem' }} />
            </a>
            <div className="mobile-nav-links">
              {['Features', 'Intelligence', 'About'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <div style={{ marginTop: '1.5rem' }}>
                <GooglePlayButton size="large" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ── MAIN ── */}
      <main>
        {/* Hero */}
        <section className="hero container">
          <div className="hero-grid">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-content"
            >
              <div className="hero-tag">
                <Sparkles size={14} style={{ marginRight: '8px' }} />
                SwarConnexa AI · Next-Gen Health Coach
              </div>
              <h1>Revolutionize Your Well-being with <span style={{ color: 'var(--primary-color)' }}>AI Intelligence</span></h1>
              <p>
                SwarConnexa AI transforms raw health data into living insights. 
                Understand your body better today for a stronger version of yourself tomorrow.
              </p>
              <div className="hero-cta">
                <GooglePlayButton size="large" />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline"
                >
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="hero-image"
            >
              <img
                src={landingImg}
                alt="SwarConnexa AI Dashboard"
                style={{ width: '100%', borderRadius: '48px', boxShadow: 'var(--card-shadow)' }}
              />
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="features container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Core Intelligence</h2>
              <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '1.1rem' }}>
                Beyond tracking — SwarConnexa AI provides actionable coaching designed 
                around your lifestyle, habits, and long-term health goals.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="features-grid">
            {[
              { icon: <Brain />, title: "Smart Health Insights", desc: "Our neural engine processes your activity patterns to detect trends and provide meaningful health reports." },
              { icon: <Smartphone />, title: "AI Health Coach", desc: "A proactive companion that nudges you at the right time to drink water, walk, or prepare for rest." },
              { icon: <Activity />, title: "Activity Monitoring", desc: "Precision tracking for steps, movement, and intensity without draining your device's battery." },
              { icon: <Moon />, title: "Sleep Optimization", desc: "Analyze sleep cycles and receive personalized wind-down routines for maximum recovery." },
              { icon: <Zap />, title: "Real-time Feedback", desc: "Instant notifications and updates based on your current physical state and health goals." },
              { icon: <ShieldCheck />, title: "Privacy First", desc: "Your health data is encrypted and stays on your device. We prioritize your data sovereignty." }
            ].map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <SpotlightCard>
                  <div className="card-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* App Showcase Slider */}
        <section className="showcase container">
          <ScrollReveal>
            <div className="showcase-header">
              <span className="hero-tag">Experience Clarity</span>
              <h2>Designed for Performance</h2>
              <p>Explore the fluid interface that makes maintaining your health an effortless daily habit.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <ImageSlider />
          </ScrollReveal>
        </section>

        {/* AI Insight */}
        <section id="intelligence" className="insight-container">
          <div className="container">
            <ScrollReveal>
              <div className="ai-dashboard">
                <div className="ai-status-bar">
                  <div className="neural-core">
                    <div className="neural-ring" />
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--primary-color)', letterSpacing: '0.15em', fontSize: '0.8rem' }}>SWARCONNEXA NEURAL ENGINE ACTIVE</span>
                </div>
                <h3 style={{ fontSize: '2.8rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                  "Precision coaching tailored to your rhythm."
                </h3>
                <p style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  Our AI doesn't just show numbers; it interprets them. 
                  Morning motivation, evening wind-downs, and weekly retrospectives 
                  working in harmony for your health.
                </p>
                <p style={{ fontSize: '1rem', marginBottom: '3rem', color: 'var(--text-secondary)', fontStyle: 'italic', opacity: 0.8 }}>
                  SwarConnexa AI — Smarter today. Better than yesterday.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span className="badge badge--blue">Dynamic Coaching</span>
                  <span className="badge badge--cyan">Neural Analysis</span>
                  <span className="badge badge--blue">End-to-End Encryption</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer id="about">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={logo} alt="SwarConnexa AI" className="footer-logo" />
              <p>The next generation of AI-powered health monitoring and coaching.</p>
              <div style={{ marginTop: '2.5rem' }}>
                <GooglePlayButton size="large" />
              </div>
            </div>
            <div className="footer-links">
              <h4>Platform</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#intelligence">AI Core</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li><a href="/privacy.html">Privacy</a></li>
                <li><a href="mailto:contact@healthconexa.com">Support</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Social</h4>
              <ul>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 SwarConnexa AI. Built for the modern human.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="slider-arrow"
            style={{ 
              position: 'fixed', 
              bottom: '2rem', 
              right: '2rem', 
              width: '50px', 
              height: '50px',
              borderRadius: '12px',
              border: '1px solid var(--primary-color)',
              background: 'rgba(15, 23, 42, 0.8)',
              color: 'var(--primary-color)'
            }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}


function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % showcaseImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prev) => (prev + newDirection + showcaseImages.length) % showcaseImages.length
    );
  };

  return (
    <div className="slider-container">
      <div className="slider-track-wrapper">
        {/* Fixed-height stage – all slides are absolutely positioned inside */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '620px',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 280, damping: 30 },
                opacity: { duration: 0.25 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -8000) paginate(1);
                else if (swipe > 8000) paginate(-1);
              }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                cursor: 'grab',
              }}
              whileDrag={{ cursor: 'grabbing' } as any}
            >
              <div className="slide-card">
                <img
                  src={showcaseImages[currentIndex]}
                  alt={`App screenshot ${currentIndex + 1} of ${showcaseImages.length}`}
                  className="slide-image"
                  draggable={false}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="slider-nav">
        {showcaseImages.map((_, idx) => (
          <button
            key={idx}
            className={`slider-dot ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <button
        className="slider-arrow prev"
        onClick={() => paginate(-1)}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="slider-arrow next"
        onClick={() => paginate(1)}
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}

export default App;
