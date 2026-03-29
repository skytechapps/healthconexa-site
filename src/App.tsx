import { useEffect, useState } from 'react';
import './index.css';
import logo from './assets/logo.png';
import landingImg from './assets/healthConexaAILanding.png';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.skyApps.healthConexaAi';

const Icons = {
  Steps: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon">
      <path d="M4 16v-2a2 2 0 0 1 2-2h2" /><path d="M12 12h2a2 2 0 0 1 2 2v2" /><path d="M16 8h2a2 2 0 0 1 2 2v2" /><path d="M8 8h2a2 2 0 0 1 2 2v2" /><path d="M4 12v-2a2 2 0 0 1 2-2h2" />
    </svg>
  ),
  Sleep: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon">
      <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" />
    </svg>
  ),
  Vitals: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  Metabolic: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon">
      <path d="M12 2v10l4 2" /><path d="M16.2 7.8l2.9-2.9" /><path d="M11.3 15.5c-1.6 1.6-4.1 1.6-5.7 0-1.6-1.6-1.6-4.1 0-5.7 1.6-1.6 4.1-1.6 5.7 0" /><circle cx="12" cy="12" r="10" />
    </svg>
  ),
  Weight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  AI: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="card-icon">
      <path d="M12 8V4H8" /><rect x="8" y="8" width="8" height="8" rx="2" /><path d="M16 12h4v4" /><path d="M12 16v4h4" /><path d="M8 16H4v-4" />
    </svg>
  )
};

/** Official-style Google Play Store button */
const GooglePlayButton = ({ size = 'normal' }: { size?: 'normal' | 'large' }) => (
  <a
    href={PLAY_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`gplay-btn ${size === 'large' ? 'gplay-btn--large' : ''}`}
    aria-label="Get HealthConexa on Google Play"
  >
    {/* Official Google Play icon SVG */}
    <svg className="gplay-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <linearGradient id="gp1" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#00C6FF"/>
        <stop offset="100%" stopColor="#0072FF"/>
      </linearGradient>
      <linearGradient id="gp2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60BE5E"/>
        <stop offset="100%" stopColor="#23A53D"/>
      </linearGradient>
      <linearGradient id="gp3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFDA00"/>
        <stop offset="100%" stopColor="#FF8C00"/>
      </linearGradient>
      <linearGradient id="gp4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF3A44"/>
        <stop offset="100%" stopColor="#C31162"/>
      </linearGradient>
      <path fill="url(#gp1)" d="M30 10.6L266.5 247 30 483.4c-12-7-20-19.8-20-34.4V45c0-14.6 8-27.4 20-34.4z"/>
      <path fill="url(#gp2)" d="M350 173.5l62.3-35.9L30 10.6C42 3.6 57 3 70.3 10.3L350 173.5z"/>
      <path fill="url(#gp3)" d="M350 338.5L70.3 501.7C57 509 42 508.4 30 501.4L412.3 374.4 350 338.5z"/>
      <path fill="url(#gp4)" d="M482 224.8l-69.7 40.2-62.3-18-62.3 18L482 224.8zm0 62.4L287.7 247l-21.2-0-21.2 0 215.7 62.4c8.6-4.9 17.3-9.8 26-14.8 4-2.3 4-8.1 0-10.4z" opacity=".9"/>
      <path fill="url(#gp4)" d="M412.3 374.4l69.7 40.2c12-6.9 20-19.8 20-34.4v-0.2L412.3 374.4z" opacity=".9"/>
      <path fill="url(#gp2)" d="M482 97.4L412.3 137.6 482 177.8V97.4z" opacity=".9"/>
    </svg>
    <div className="gplay-text">
      <span className="gplay-text__eyebrow">GET IT ON</span>
      <span className="gplay-text__store">Google Play</span>
    </div>
  </a>
);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Overlay for mobile menu */}
      <div className={`overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)} />

      {/* ── HEADER ── */}
      <header className={`nav-wrapper ${isScrolled ? 'nav-scrolled' : ''}`}>
        <nav className="container nav-content">
          {/* Logo */}
          <a href="/" className="nav-logo-link" aria-label="HealthConexa Home">
            <img
              src={logo}
              alt="HealthConexa"
              className={`nav-logo ${isScrolled ? 'nav-logo--scrolled' : ''}`}
            />
          </a>

          {/* Desktop nav */}
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#intelligence" className="nav-link">AI Insight</a>
            <a href="#about" className="nav-link">About</a>
            <GooglePlayButton />
          </div>

          {/* Hamburger */}
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open navigation menu">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </nav>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`} role="dialog" aria-modal="true">
        <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close navigation menu">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6"  y2="18" />
            <line x1="6"  y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <a href="/" className="mobile-nav-logo-link" aria-label="HealthConexa Home">
          <img src={logo} alt="HealthConexa" style={{ height: '60px', marginBottom: '2rem' }} />
        </a>
        <div className="mobile-nav-links">
          <a href="#features"     className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#intelligence" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>AI Insight</a>
          <a href="#about"        className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <div style={{ marginTop: '1.5rem' }}>
            <GooglePlayButton size="large" />
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <main>
        {/* Hero */}
        <section className="hero container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-tag">Next-Gen Health Intelligence</span>
              <h1>Elevate Your Health with Intelligence.</h1>
              <p>
                Experience the first AI-driven health ecosystem that synchronizes your vitals,
                movement, and recovery into actionable precision insights.
              </p>
              <div className="hero-cta">
                <GooglePlayButton size="large" />
                <button className="btn btn-outline">Watch Demo</button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src={landingImg}
                alt="HealthConexa Dashboard – AI-driven health insights on mobile"
                style={{ width: '100%', borderRadius: '48px', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.7)' }}
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="features container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>The Daily Matrix</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              We've re-engineered health tracking. Every metric is a piece of your biological puzzle,
              unified in one intelligent dashboard.
            </p>
          </div>
          <div className="features-grid">
            <FeatureCard icon={<Icons.Steps />}    title="Metric Sync"       desc="Automatic synchronization of steps, distance, and calories from your favorite wearables." />
            <FeatureCard icon={<Icons.Sleep />}    title="Sleep States"      desc="Deep analysis of recovery patterns, duration, and autonomic nervous system balance." />
            <FeatureCard icon={<Icons.Vitals />}   title="Vital Precision"   desc="Real-time monitoring of heart rate and rhythm with comprehensive trend mapping." />
            <FeatureCard icon={<Icons.Metabolic />} title="Metabolic Map"    desc="Advanced glucose and blood sugar tracking to optimize your energy levels." />
            <FeatureCard icon={<Icons.Weight />}   title="Body Composition"  desc="Track weight, BMI, and body metrics to see the physical impact of your lifestyle." />
            <FeatureCard icon={<Icons.AI />}       title="Conexa AI"         desc="Proprietary health intelligence that translates data into life-changing advice." />
          </div>
        </section>

        {/* AI Insight */}
        <section id="intelligence" className="insight-container">
          <div className="container">
            <div className="ai-dashboard">
              <div className="ai-status-bar">
                <div className="pulse" />
                <span style={{ fontWeight: 600, color: 'var(--primary-color)', letterSpacing: '0.1em' }}>CONEXA AI ENGINE IS ACTIVE</span>
              </div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                "Your cardiac recovery has improved by 12% over the last 14 days."
              </h3>
              <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
                Based on your current streak and sleep baseline, increasing your afternoon activity by
                15 minutes today will optimize your metabolic rate for better recovery tonight.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span className="badge badge--blue">Actionable Insight</span>
                <span className="badge badge--cyan">Biometric Data Verified</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer id="about">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={logo} alt="HealthConexa" className="footer-logo" />
              <p>Redefining human health through the lens of artificial intelligence and wearable precision.</p>
              <div style={{ marginTop: '2rem' }}>
                <GooglePlayButton size="large" />
              </div>
            </div>
            <div className="footer-links">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#intelligence">AI Engine</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Resources</h4>
              <ul>
                <li><a href="/privacy.html">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:contact@healthconexa.com">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 SkyTech Apps. All rights reserved.</p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter">Twitter</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="GitHub">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="card">
      {icon}
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default App;
