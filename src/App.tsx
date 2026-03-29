import { useEffect, useState } from 'react';
import './index.css';
import logo from './assets/logo.png';
import landingImg from './assets/healthConexaAILanding.png';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

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

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <header className={`nav-wrapper ${isScrolled ? 'nav-scrolled' : ''}`}>
        <nav className="container nav-content">
          <img src={logo} alt="HealthConexa" style={{ height: '32px' }} />
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#intelligence" className="nav-link">AI Insight</a>
            <a href="#about" className="nav-link">About</a>
            <button className="btn btn-primary">Get the App</button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-tag">Next-Gen Health Intelligence</span>
              <h1>Elevate Your Health with Intelligence.</h1>
              <p>
                Experience the first AI-driven health ecosystem that synchronizes your vitals, movement, and recovery into actionable precision insights.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <button className="btn btn-primary">Start Your Journey</button>
                <button className="btn btn-outline">Watch Demo</button>
              </div>
            </div>
            <div className="hero-image">
              <img src={landingImg} alt="HealthConexa interface" style={{ width: '100%', borderRadius: '48px', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6)' }} />
            </div>
          </div>
        </section>

        <section id="features" className="features container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>The Daily Matrix</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              We've re-engineered health tracking. Every metric is a piece of your biological puzzle, unified in one intelligent dashboard.
            </p>
          </div>
          <div className="features-grid">
            <FeatureCard 
              icon={<Icons.Steps />} 
              title="Metric Sync" 
              desc="Automatic synchronization of steps, distance, and calories from your favorite wearables." 
            />
            <FeatureCard 
              icon={<Icons.Sleep />} 
              title="Sleep States" 
              desc="Deep analysis of recovery patterns, duration, and autonomic nervous system balance." 
            />
            <FeatureCard 
              icon={<Icons.Vitals />} 
              title="Vital Precision" 
              desc="Real-time monitoring of heart rate and rhythm with comprehensive trend mapping." 
            />
            <FeatureCard 
              icon={<Icons.Metabolic />} 
              title="Metabolic Map" 
              desc="Advanced glucose and blood sugar tracking to optimize your energy levels." 
            />
            <FeatureCard 
              icon={<Icons.Weight />} 
              title="Body Composition" 
              desc="Track weight, BMI, and body metrics to see the physical impact of your lifestyle." 
            />
            <FeatureCard 
              icon={<Icons.AI />} 
              title="Conexa AI" 
              desc="Proprietary health intelligence that translates data into life-changing advice." 
            />
          </div>
        </section>

        <section id="intelligence" className="insight-container">
          <div className="container">
            <div className="ai-dashboard">
              <div className="ai-status-bar">
                <div className="pulse"></div>
                <span style={{ fontWeight: 600, color: 'var(--primary-color)', letterSpacing: '0.1em' }}>CONEXA AI ENGINE IS ACTIVE</span>
              </div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>"Your cardiac recovery has improved by 12% over the last 14 days."</h3>
              <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
                Based on your current streak and sleep baseline, increasing your afternoon activity by 15 minutes today will optimize your metabolic rate for better recovery tonight.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ padding: '0.6rem 1.2rem', background: 'rgba(79, 195, 247, 0.1)', border: '1px solid rgba(79, 195, 247, 0.2)', borderRadius: '12px', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 600 }}>Actionable Insight</span>
                <span style={{ padding: '0.6rem 1.2rem', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '12px', color: 'var(--secondary-color)', fontSize: '0.9rem', fontWeight: 600 }}>Biometric Data Verified</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src={logo} alt="HealthConexa" style={{ height: '32px' }} />
              <p>Redefining human health through the lens of artificial intelligence and wearable precision.</p>
            </div>
            <div className="footer-links">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">AI Engine</a></li>
                <li><a href="#">Roadmap</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Safety & Security</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Documentation</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Contact</h4>
              <ul>
                <li><a href="#">Support</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Media Kit</a></li>
              </ul>
            </div>
          </div>
          <div style={{ padding: '2rem 0', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <p>&copy; 2026 SkyTech Apps. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
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
