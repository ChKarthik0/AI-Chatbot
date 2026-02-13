import React from "react";
import { Link } from "react-router-dom";
import { FileText, Shield, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsPage = () => {
  return (
    <div className="dark-theme" style={styles.page}>
      {/* Background Animation */}
      <div style={styles.background}>
        <div style={{ ...styles.shape, ...styles.shape1 }} />
        <div style={{ ...styles.shape, ...styles.shape2 }} />
        <div style={{ ...styles.shape, ...styles.shape3 }} />
      </div>

      {/* Navigation Bar */}
      <Navbar>

      </Navbar>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.pageHeader}>
            <FileText size={48} style={styles.pageIcon} />
            <h1 style={styles.pageTitle}>Terms of Service</h1>
            <p style={styles.pageSubtitle}>Last Updated: December 15, 2024</p>
          </div>

          {/* Quick Summary */}
          <div style={styles.summaryCard}>
            <div style={styles.summaryHeader}>
              <Shield size={24} style={styles.summaryIcon} />
              <h3 style={styles.summaryTitle}>Key Points</h3>
            </div>
            <div style={styles.summaryPoints}>
              <div style={styles.summaryPoint}>
                <CheckCircle size={18} style={styles.checkIcon} />
                <span>You retain ownership of your content</span>
              </div>
              <div style={styles.summaryPoint}>
                <CheckCircle size={18} style={styles.checkIcon} />
                <span>We don't sell your personal data</span>
              </div>
              <div style={styles.summaryPoint}>
                <AlertCircle size={18} style={styles.alertIcon} />
                <span>Must be 13+ years old to use NovaAI</span>
              </div>
              <div style={styles.summaryPoint}>
                <XCircle size={18} style={styles.xIcon} />
                <span>No illegal or harmful activities allowed</span>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div style={styles.termsContainer}>
            {[
              {
                title: "Acceptance of Terms",
                content: "By accessing and using NovaAI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service."
              },
              {
                title: "User Eligibility",
                content: "You must be at least 13 years of age to use NovaAI. By using this service, you represent that you meet this age requirement and have the legal capacity to enter into this agreement."
              },
              {
                title: "Account Responsibility",
                content: "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
              },
              {
                title: "Content Guidelines",
                content: "You agree not to use NovaAI to generate content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of privacy, or otherwise objectionable."
              },
              {
                title: "Intellectual Property",
                content: "NovaAI and its original content, features, and functionality are owned by NovaAI Inc. and are protected by international copyright, trademark, and other intellectual property laws."
              },
              {
                title: "Service Modifications",
                content: "We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service."
              },
              {
                title: "Limitation of Liability",
                content: "In no event shall NovaAI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service."
              },
              {
                title: "Governing Law",
                content: "These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions."
              }
            ].map((section, index) => (
              <div key={index} style={styles.termSection}>
                <div style={styles.sectionHeader}>
                  <div style={styles.sectionNumber}>{index + 1}</div>
                  <h2 style={styles.sectionTitle}>{section.title}</h2>
                </div>
                <p style={styles.sectionContent}>{section.content}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div style={styles.disclaimerCard}>
            <AlertCircle size={32} style={styles.disclaimerIcon} />
            <h3 style={styles.disclaimerTitle}>Important Disclaimer</h3>
            <p style={styles.disclaimerText}>
              NovaAI generates responses using artificial intelligence and may sometimes produce 
              inaccurate, incomplete, or misleading information. Users should independently verify 
              important information and not rely solely on AI-generated content.
            </p>
          </div>

          {/* Agreement */}
          <div style={styles.agreementCard}>
            <div style={styles.agreementHeader}>
              <Shield size={32} style={styles.agreementIcon} />
              <h3 style={styles.agreementTitle}>Your Agreement</h3>
            </div>
            <p style={styles.agreementText}>
              By continuing to use NovaAI, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service. These terms may be updated 
              periodically, and continued use constitutes acceptance of any changes.
            </p>
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
    opacity: 0.1,
    filter: "blur(120px)",
    animation: "float 15s ease-in-out infinite",
  },
  shape1: { width: 500, height: 500, background: "#667eea", top: "5%", left: "10%", animationDelay: "0s" },
  shape2: { width: 400, height: 400, background: "#764ba2", top: "60%", left: "70%", animationDelay: "5s" },
  shape3: { width: 300, height: 300, background: "#4c51bf", top: "30%", left: "85%", animationDelay: "10s" },
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
    maxWidth: "1000px",
    margin: "0 auto",
  },
  container: {
    animation: "fadeIn 0.8s ease-out",
  },
  pageHeader: {
    textAlign: "center",
    marginBottom: "50px",
    padding: "40px 20px",
  },
  pageIcon: {
    color: "#667eea",
    marginBottom: "20px",
    animation: "pulse 2s ease-in-out infinite",
  },
  pageTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    margin: "0 0 10px 0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  pageSubtitle: {
    color: "#aaa",
    fontSize: "1.1rem",
  },
  summaryCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "40px",
    border: "1px solid rgba(255,255,255,0.1)",
    animation: "slideUp 0.6s ease-out",
  },
  summaryHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px",
  },
  summaryIcon: {
    color: "#667eea",
  },
  summaryTitle: {
    fontSize: "1.5rem",
    margin: 0,
    color: "white",
  },
  summaryPoints: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  summaryPoint: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "10px",
    fontSize: "0.95rem",
  },
  checkIcon: {
    color: "#10b981",
    flexShrink: 0,
  },
  alertIcon: {
    color: "#f59e0b",
    flexShrink: 0,
  },
  xIcon: {
    color: "#ef4444",
    flexShrink: 0,
  },
  termsContainer: {
    marginBottom: "40px",
  },
  termSection: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "30px",
    marginBottom: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "transform 0.3s ease",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  sectionNumber: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: "1.3rem",
    margin: 0,
    color: "white",
  },
  sectionContent: {
    color: "#ccc",
    lineHeight: "1.8",
    fontSize: "1rem",
  },
  disclaimerCard: {
    background: "rgba(239, 68, 68, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "40px",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    textAlign: "center",
  },
  disclaimerIcon: {
    color: "#ef4444",
    marginBottom: "20px",
  },
  disclaimerTitle: {
    fontSize: "1.5rem",
    margin: "0 0 15px 0",
    color: "white",
  },
  disclaimerText: {
    color: "#ccc",
    lineHeight: "1.7",
    fontSize: "1rem",
  },
  agreementCard: {
    background: "rgba(16, 185, 129, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    textAlign: "center",
    border: "1px solid rgba(16, 185, 129, 0.3)",
  },
  agreementHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  agreementIcon: {
    color: "#10b981",
  },
  agreementTitle: {
    fontSize: "1.8rem",
    margin: 0,
    color: "white",
  },
  agreementText: {
    color: "#ccc",
    lineHeight: "1.8",
    fontSize: "1.1rem",
    maxWidth: "800px",
    margin: "0 auto",
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
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-40px) translateX(20px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  /* Hover effects */
  .term-section:hover {
    transform: translateX(10px);
    border-color: rgba(102, 126, 234, 0.3);
  }
  
  .back-btn:hover,
  .auth-btn:hover {
    transform: translateY(-2px);
  }
  
  .footer-links a:hover {
    color: white;
  }
`;
document.head.appendChild(styleSheet);

export default TermsPage;