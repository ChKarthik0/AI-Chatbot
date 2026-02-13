import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Sparkles } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav style={styles.navbar}>
      {/* Logo/Home Link */}
      <Link to="/" style={styles.logo}>
        <Sparkles size={24} style={styles.logoIcon} />
        <span style={styles.logoText}>Nova<span style={styles.logoHighlight}>AI</span></span>
      </Link>

      {/* Navigation Links */}
      <div style={styles.navLinks}>
        {!isHomePage && (
          <Link to="/" style={styles.navLink}>
            <Home size={18} />
            <span>Home</span>
          </Link>
        )}
        <Link to="/about" style={styles.navLink}>
          ❔ About
        </Link>
        <Link to="/login" style={styles.navLink}>
          Log in
        </Link>
        <Link to="/signup" style={styles.signupBtn}>
          Sign up for free
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "rgba(11, 11, 11, 0.9)",
    backdropFilter: "blur(15px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    zIndex: 1000,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "transform 0.3s ease",
  },
  logoIcon: {
    color: "#667eea",
    animation: "sparkle 2s ease-in-out infinite",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "800",
  },
  logoHighlight: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "white",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  signupBtn: {
    padding: "10px 24px",
    borderRadius: "25px",
    fontSize: "14px",
    fontWeight: "bold",
    textDecoration: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  },
};

// Add sparkle animation
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes sparkle {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1) rotate(0deg);
    }
    50% { 
      opacity: 0.8; 
      transform: scale(1.1) rotate(180deg);
    }
  }
  
  .nav-link:hover {
    background: rgba(255,255,255,0.1);
    transform: translateY(-2px);
  }
  
  .signup-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  .logo:hover {
    transform: scale(1.05);
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;