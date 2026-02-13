import React from "react";
import { Link } from "react-router-dom";
import { Heart, Github, Twitter, MessageCircle, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Main Footer Content */}
      <div style={styles.footerContent}>
        {/* Brand Section */}
        <div style={styles.brandSection}>
          <div style={styles.brand}>
            <span style={styles.brandText}>Nova<span style={styles.brandHighlight}>AI</span></span>
            <p style={styles.brandTagline}>
              Intelligent conversations powered by advanced AI
            </p>
          </div>
          <div style={styles.socialLinks}>
            <a href="https://github.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <Twitter size={20} />
            </a>
            <a href="https://discord.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={styles.linksSection}>
          <div style={styles.linkGroup}>
            <h4 style={styles.linkGroupTitle}>Product</h4>
            <Link to="/" style={styles.linkItem}>Chat</Link>
            <Link to="/about" style={styles.linkItem}>Features</Link>
            <Link to="/about#pricing" style={styles.linkItem}>Pricing</Link>
            <a href="#" style={styles.linkItem}>API</a>
          </div>
          
          <div style={styles.linkGroup}>
            <h4 style={styles.linkGroupTitle}>Company</h4>
            <Link to="/about" style={styles.linkItem}>About</Link>
            <a href="#" style={styles.linkItem}>Blog</a>
            <a href="#" style={styles.linkItem}>Careers</a>
            <a href="#" style={styles.linkItem}>Press</a>
          </div>
          
          <div style={styles.linkGroup}>
            <h4 style={styles.linkGroupTitle}>Legal</h4>
            <Link to="/terms" style={styles.linkItem}>Terms</Link>
            <Link to="/privacy" style={styles.linkItem}>Privacy</Link>
            <Link to="/cookie" style={styles.linkItem}>Cookies</Link>
            <a href="mailto:legal@novaai.com" style={styles.linkItem}>Contact Legal</a>
          </div>
          
          <div style={styles.linkGroup}>
            <h4 style={styles.linkGroupTitle}>Support</h4>
            <a href="#" style={styles.linkItem}>Help Center</a>
            <a href="#" style={styles.linkItem}>Documentation</a>
            <a href="mailto:support@novaai.com" style={styles.linkItem}>Contact Support</a>
            <a href="#" style={styles.linkItem}>Status</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} NovaAI. All rights reserved.
          <div style={styles.madeWith}>
            Made with <Heart size={14} style={styles.heartIcon} /> by the NovaAI team
          </div>
        </div>
        
        <div style={styles.legalLinks}>
          <Shield size={14} style={styles.shieldIcon} />
          <span>GDPR & CCPA Compliant</span>
          <div style={styles.separator}>•</div>
          <span>ISO 27001 Certified</span>
          <div style={styles.separator}>•</div>
          <span>End-to-End Encrypted</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={styles.disclaimer}>
        NovaAI generates responses using artificial intelligence and may sometimes produce 
        inaccurate information. Please verify important information independently.
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "rgba(11, 11, 11, 0.95)",
    backdropFilter: "blur(10px)",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    padding: "60px 40px 30px 40px",
    color: "#ccc",
    position: "relative",
    zIndex: 100,
  },
  footerContent: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "60px",
    marginBottom: "50px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  brandSection: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  brandText: {
    fontSize: "32px",
    fontWeight: "800",
    color: "white",
  },
  brandHighlight: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  brandTagline: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#888",
    maxWidth: "300px",
  },
  socialLinks: {
    display: "flex",
    gap: "15px",
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
    color: "#aaa",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },
  linksSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "40px",
  },
  linkGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  linkGroupTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    marginBottom: "5px",
  },
  linkItem: {
    color: "#aaa",
    textDecoration: "none",
    fontSize: "14px",
    transition: "all 0.3s ease",
    padding: "4px 0",
  },
  bottomBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "30px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap",
    gap: "20px",
  },
  copyright: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "14px",
    color: "#888",
  },
  madeWith: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
  },
  heartIcon: {
    color: "#ef4444",
    animation: "heartbeat 1.5s ease-in-out infinite",
  },
  legalLinks: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontSize: "13px",
    color: "#666",
    flexWrap: "wrap",
  },
  shieldIcon: {
    color: "#10b981",
  },
  separator: {
    color: "#444",
  },
  disclaimer: {
    textAlign: "center",
    fontSize: "12px",
    color: "#666",
    marginTop: "40px",
    padding: "15px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "10px",
    maxWidth: "800px",
    margin: "40px auto 0 auto",
    lineHeight: "1.5",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  .social-link:hover {
    background: rgba(102, 126, 234, 0.2);
    color: white;
    transform: translateY(-3px);
  }
  
  .link-item:hover {
    color: white;
    transform: translateX(5px);
  }
`;
document.head.appendChild(styleSheet);

export default Footer;