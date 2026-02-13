import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Brain, Shield, Zap, Users, Globe } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="dark-theme" style={styles.page}>
      {/* Background Animation */}
      <div style={styles.background}>
        <div style={{ ...styles.shape, ...styles.shape1 }} />
        <div style={{ ...styles.shape, ...styles.shape2 }} />
        <div style={{ ...styles.shape, ...styles.shape3 }} />
        <div style={{ ...styles.shape, ...styles.shape4 }} />
      </div>

      {/* Navigation Bar */}
      <Navbar>
        
      </Navbar>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.container}>
          {/* Hero Section */}
          <div style={styles.hero}>
            <div style={styles.logo}>
              <Sparkles size={48} style={styles.sparkleIcon} />
              <h1 style={styles.title}>Nova<span style={styles.highlight}>AI</span></h1>
            </div>
            <p style={styles.tagline}>Revolutionizing Conversations with Intelligent AI</p>
          </div>

          {/* Mission Statement */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <Brain size={32} style={styles.cardIcon} />
              <h2 style={styles.cardTitle}>Our Mission</h2>
            </div>
            <p style={styles.cardText}>
              At NovaAI, we're on a mission to make artificial intelligence accessible, 
              intuitive, and transformative for everyone. We believe in creating AI that 
              understands context, respects privacy, and enhances human potential.
            </p>
          </div>

          {/* Features Grid */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Why Choose NovaAI?</h2>
            <div style={styles.featuresGrid}>
              <div style={styles.featureCard}>
                <Zap size={28} style={styles.featureIcon} />
                <h3 style={styles.featureTitle}>Lightning Fast</h3>
                <p style={styles.featureText}>Real-time responses powered by cutting-edge AI models</p>
              </div>
              <div style={styles.featureCard}>
                <Shield size={28} style={styles.featureIcon} />
                <h3 style={styles.featureTitle}>Privacy First</h3>
                <p style={styles.featureText}>End-to-end encryption and data protection</p>
              </div>
              <div style={styles.featureCard}>
                <Users size={28} style={styles.featureIcon} />
                <h3 style={styles.featureTitle}>User Friendly</h3>
                <p style={styles.featureText}>Intuitive interface designed for everyone</p>
              </div>
              <div style={styles.featureCard}>
                <Globe size={28} style={styles.featureIcon} />
                <h3 style={styles.featureTitle}>Global Reach</h3>
                <p style={styles.featureText}>Multilingual support for worldwide accessibility</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Our Vision</h2>
            <div style={styles.visionCard}>
              <p style={styles.visionText}>
                We envision a future where AI assistants are not just tools, but collaborative 
                partners in creativity, learning, and problem-solving. NovaAI is built on the 
                principle that technology should augment human intelligence, not replace it.
              </p>
              <div style={styles.stats}>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>10M+</div>
                  <div style={styles.statLabel}>Conversations</div>
                </div>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>24/7</div>
                  <div style={styles.statLabel}>Availability</div>
                </div>
                <div style={styles.stat}>
                  <div style={styles.statNumber}>99.9%</div>
                  <div style={styles.statLabel}>Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div style={styles.ctaSection}>
            <h2 style={styles.ctaTitle}>Ready to Experience the Future?</h2>
            <p style={styles.ctaText}>Join millions of users transforming their conversations with NovaAI</p>
            <div style={styles.ctaButtons}>
              <Link to="/" style={styles.primaryBtn}>
                Start Chatting Now
              </Link>
              <Link to="/signup" style={styles.secondaryBtn}>
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer>

      </Footer>
    </div>
  );
};

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#0b0b0b",
    color: "white",
    fontFamily: "Inter, sans-serif",
    overflowX: "hidden",
  },
  background: {
    position: "fixed",
    inset: 0,
    overflow: "hidden",
    zIndex: 0,
  },
  shape: {
    position: "absolute",
    borderRadius: "50%",
    opacity: 0.15,
    filter: "blur(120px)",
    animation: "float 12s ease-in-out infinite",
  },
  shape1: { width: 400, height: 400, background: "purple", top: "10%", left: "5%", animationDelay: "0s" },
  shape2: { width: 300, height: 300, background: "blue", top: "60%", left: "80%", animationDelay: "2s" },
  shape3: { width: 250, height: 250, background: "pink", top: "80%", left: "10%", animationDelay: "4s" },
  shape4: { width: 350, height: 350, background: "cyan", top: "20%", left: "70%", animationDelay: "6s" },
  header: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    zIndex: 10,
    background: "rgba(11, 11, 11, 0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  backBtn: {
    color: "white",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "25px",
    background: "rgba(255,255,255,0.1)",
    transition: "all 0.3s ease",
    fontSize: "14px",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  headerRight: {
    display: "flex",
    gap: "15px",
  },
  authBtn: {
    padding: "10px 20px",
    borderRadius: "25px",
    fontSize: "14px",
    textDecoration: "none",
    transition: "all 0.3s ease",
    fontWeight: "500",
  },
  loginBtn: {
    background: "rgba(255,255,255,0.1)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  signupBtn: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontWeight: "bold",
    border: "none",
  },
  main: {
    position: "relative",
    zIndex: 5,
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  container: {
    animation: "fadeIn 0.8s ease-out",
  },
  hero: {
    textAlign: "center",
    marginBottom: "60px",
    padding: "40px 20px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  sparkleIcon: {
    color: "#667eea",
    animation: "sparkle 2s ease-in-out infinite",
  },
  title: {
    fontSize: "4rem",
    fontWeight: "800",
    margin: 0,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  highlight: {
    color: "#764ba2",
  },
  tagline: {
    fontSize: "1.5rem",
    color: "#aaa",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "40px",
    border: "1px solid rgba(255,255,255,0.1)",
    animation: "slideUp 0.6s ease-out",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  cardIcon: {
    color: "#667eea",
  },
  cardTitle: {
    fontSize: "2rem",
    margin: 0,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  cardText: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    color: "#ccc",
  },
  section: {
    marginBottom: "60px",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "40px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    marginBottom: "40px",
  },
  featureCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "30px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "transform 0.3s ease",
    animation: "fadeIn 0.8s ease-out",
  },
  featureIcon: {
    color: "#667eea",
    marginBottom: "20px",
  },
  featureTitle: {
    fontSize: "1.3rem",
    marginBottom: "15px",
    color: "white",
  },
  featureText: {
    color: "#aaa",
    lineHeight: "1.6",
  },
  visionCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "50px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  visionText: {
    fontSize: "1.2rem",
    lineHeight: "1.8",
    color: "#ccc",
    maxWidth: "800px",
    margin: "0 auto 40px",
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "60px",
    flexWrap: "wrap",
  },
  stat: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  statLabel: {
    color: "#aaa",
    fontSize: "0.9rem",
    marginTop: "5px",
  },
  ctaSection: {
    textAlign: "center",
    padding: "60px 20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    marginBottom: "40px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  ctaTitle: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  ctaText: {
    fontSize: "1.1rem",
    color: "#ccc",
    marginBottom: "40px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "15px 40px",
    borderRadius: "30px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "transform 0.3s ease",
    border: "none",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "15px 40px",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  footer: {
    position: "relative",
    zIndex: 5,
    padding: "40px 20px",
    textAlign: "center",
    background: "rgba(11, 11, 11, 0.9)",
    backdropFilter: "blur(10px)",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  footerLinks: {
    color: "#aaa",
    textDecoration: "none",
    transition: "color 0.3s ease",
    fontSize: "14px",
  },
  copyright: {
    color: "#666",
    fontSize: "12px",
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
    33% { transform: translateY(-30px) translateX(20px) rotate(5deg); }
    66% { transform: translateY(20px) translateX(-20px) rotate(-5deg); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes sparkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }
  
  /* Hover effects */
  .feature-card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(102, 126, 234, 0.3);
  }
  
  .primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
  
  .secondary-btn:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.3);
  }
  
  .auth-btn:hover, .back-btn:hover {
    transform: translateY(-2px);
  }
  
  .footer-links a:hover {
    color: white;
  }
`;
document.head.appendChild(styleSheet);

export default About;