import React from "react";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";
import FloatingMenu from "../components/FloatingMenu";

const ChatPage = () => {
  return (
    <div className="chat-page dark-theme" style={styles.page}>
      {/* Background Animation */}
      <div style={styles.background}>
        <div style={{ ...styles.shape, ...styles.shape1 }} />
        <div style={{ ...styles.shape, ...styles.shape2 }} />
        <div style={{ ...styles.shape, ...styles.shape3 }} />
        <div style={{ ...styles.shape, ...styles.shape4 }} />
      </div>

      {/* Top-right Auth Buttons */}
      <Navbar>

      </Navbar>

      {/* Main Center Content */}
      <main style={styles.main}>
        <ChatBox />
      </main>

      {/* Footer Disclaimer */}
      <footer style={styles.footer}>
        By messaging <strong>NovaAI</strong>, you agree to our{" "}
        <a href="/terms" style={styles.link}>Terms</a> and have read our{" "}
        <a href="#" style={styles.link}>Privacy Policy</a>. See{" "}
        <a href="#" style={styles.link}>Cookie Preferences</a>.
      </footer>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  page: {
    position: "relative",
    margin: "0",
    minHeight: "100vh",
    backgroundColor: "#0b0b0b",
    color: "white",
    fontFamily: "Inter, sans-serif",
    display: "flex",
    flexDirection: "column",
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
    opacity: 0.3,
    filter: "blur(120px)",
    animation: "float 12s ease-in-out infinite",
  },
  shape1: { width: 300, height: 300, background: "purple", top: "10%", left: "20%" },
  shape2: { width: 250, height: 250, background: "blue", top: "40%", left: "60%" },
  shape3: { width: 200, height: 200, background: "pink", top: "70%", left: "30%" },
  shape4: { width: 350, height: 350, background: "cyan", top: "20%", left: "80%" },
  header: {
    position: "fixed",
    top: 20,
    right: 30,
    display: "flex",
    gap: "10px",
    zIndex: 10,
  },
  authBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },
  loginBtn: {
    background: "rgba(255,255,255,0.1)",
    color: "white",
  },
  signupBtn: {
    background: "linear-gradient(to right, purple, pink)",
    color: "white",
    fontWeight: "bold",
  },
  about: {
    background: "rgba(255,255,255,0.1)",
    color: "white",
    padding: "8px 12px",
    fontSize: "16px",
  },
  main: {
    flex: 1,
    zIndex: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: "60px",
    marginBottom: "60px",
  },
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    padding: "20px",
    fontSize: "12px",
    color: "gray",
    textAlign: "center",
    background: "rgba(11, 11, 11, 0.8)",
    backdropFilter: "blur(10px)",
  },
  link: {
    color: "#8a2be2",
    textDecoration: "none",
  },
};

// Keyframes (injected globally)
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-30px) translateX(20px); }
  }
`;
document.head.appendChild(styleSheet);

export default ChatPage;