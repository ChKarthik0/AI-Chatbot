import React from "react";
import { Link } from "react-router-dom";
import { Lock, Eye, Shield, Database, Download, Bell } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPage = () => {
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
            <Lock size={48} style={styles.pageIcon} />
            <h1 style={styles.pageTitle}>Privacy Policy</h1>
            <p style={styles.pageSubtitle}>Your Privacy is Our Priority</p>
          </div>

          {/* Privacy Commitment */}
          <div style={styles.commitmentCard}>
            <div style={styles.commitmentHeader}>
              <Shield size={32} style={styles.commitmentIcon} />
              <h2 style={styles.commitmentTitle}>Our Commitment to Privacy</h2>
            </div>
            <p style={styles.commitmentText}>
              At NovaAI, we believe privacy is a fundamental right. We're committed to 
              protecting your personal information and being transparent about how we 
              collect, use, and safeguard your data. This Privacy Policy explains our 
              practices in detail.
            </p>
          </div>

          {/* Data Collection Table */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>What We Collect</h2>
            <div style={styles.dataTable}>
              <div style={styles.tableHeader}>
                <div style={styles.tableCell}>Data Type</div>
                <div style={styles.tableCell}>Purpose</div>
                <div style={styles.tableCell}>Retention</div>
              </div>
              {[
                {
                  type: "Account Information",
                  purpose: "User authentication and personalization",
                  retention: "Until account deletion",
                  icon: <Database size={20} />
                },
                {
                  type: "Chat Conversations",
                  purpose: "Improving AI responses and service quality",
                  retention: "30 days (encrypted)",
                  icon: <Eye size={20} />
                },
                {
                  type: "Usage Analytics",
                  purpose: "Service optimization and feature development",
                  retention: "12 months (anonymized)",
                  icon: <Bell size={20} />
                },
                {
                  type: "Technical Data",
                  purpose: "Security monitoring and bug fixes",
                  retention: "90 days",
                  icon: <Shield size={20} />
                }
              ].map((row, index) => (
                <div key={index} style={styles.tableRow}>
                  <div style={styles.tableCell}>
                    <div style={styles.dataType}>
                      {row.icon}
                      <span>{row.type}</span>
                    </div>
                  </div>
                  <div style={styles.tableCell}>{row.purpose}</div>
                  <div style={styles.tableCell}>{row.retention}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Rights */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Your Privacy Rights</h2>
            <div style={styles.rightsGrid}>
              {[
                {
                  title: "Right to Access",
                  description: "Request a copy of your personal data",
                  icon: <Eye size={24} />
                },
                {
                  title: "Right to Delete",
                  description: "Request deletion of your personal data",
                  icon: <Download size={24} />
                },
                {
                  title: "Right to Correct",
                  description: "Update inaccurate personal information",
                  icon: <Database size={24} />
                },
                {
                  title: "Right to Object",
                  description: "Opt-out of certain data processing",
                  icon: <Bell size={24} />
                },
                {
                  title: "Data Portability",
                  description: "Receive your data in a readable format",
                  icon: <Download size={24} />
                },
                {
                  title: "Withdraw Consent",
                  description: "Revoke previously given consent",
                  icon: <Shield size={24} />
                }
              ].map((right, index) => (
                <div key={index} style={styles.rightCard}>
                  <div style={styles.rightIcon}>{right.icon}</div>
                  <h3 style={styles.rightTitle}>{right.title}</h3>
                  <p style={styles.rightDescription}>{right.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security Measures */}
          <div style={styles.securityCard}>
            <div style={styles.securityHeader}>
              <Shield size={40} style={styles.securityIcon} />
              <h2 style={styles.securityTitle}>Security Measures</h2>
            </div>
            <div style={styles.securityFeatures}>
              <div style={styles.securityFeature}>
                <div style={styles.featureBullet}></div>
                <span>End-to-end encryption for all conversations</span>
              </div>
              <div style={styles.securityFeature}>
                <div style={styles.featureBullet}></div>
                <span>Regular security audits and penetration testing</span>
              </div>
              <div style={styles.securityFeature}>
                <div style={styles.featureBullet}></div>
                <span>Strict access controls and authentication protocols</span>
              </div>
              <div style={styles.securityFeature}>
                <div style={styles.featureBullet}></div>
                <span>Compliance with GDPR, CCPA, and other privacy regulations</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div style={styles.contactCard}>
            <h2 style={styles.contactTitle}>Contact Our Privacy Team</h2>
            <p style={styles.contactText}>
              If you have any questions about this Privacy Policy or wish to exercise 
              your privacy rights, please contact our Data Protection Officer:
            </p>
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <strong>Email:</strong> privacy@novaai.com
              </div>
              <div style={styles.contactItem}>
                <strong>Address:</strong> 123 Privacy Lane, San Francisco, CA 94107
              </div>
              <div style={styles.contactItem}>
                <strong>Response Time:</strong> Within 30 business days
              </div>
            </div>
          </div>

          {/* Updates */}
          <div style={styles.updateCard}>
            <h3 style={styles.updateTitle}>Policy Updates</h3>
            <p style={styles.updateText}>
              We may update this Privacy Policy periodically to reflect changes in our 
              practices or legal requirements. We will notify users of any material 
              changes through email or in-app notifications.
            </p>
            <div style={styles.updateBadge}>
              Last Updated: December 15, 2024
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
    opacity: 0.08,
    filter: "blur(120px)",
    animation: "float 18s ease-in-out infinite",
  },
  shape1: { width: 450, height: 450, background: "#3b82f6", top: "10%", left: "5%", animationDelay: "0s" },
  shape2: { width: 350, height: 350, background: "#1e40af", top: "70%", left: "75%", animationDelay: "6s" },
  shape3: { width: 300, height: 300, background: "#60a5fa", top: "30%", left: "90%", animationDelay: "12s" },
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
    background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
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
  pageHeader: {
    textAlign: "center",
    marginBottom: "50px",
    padding: "40px 20px",
  },
  pageIcon: {
    color: "#3b82f6",
    marginBottom: "20px",
    animation: "glow 3s ease-in-out infinite",
  },
  pageTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    margin: "0 0 10px 0",
    background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  pageSubtitle: {
    color: "#aaa",
    fontSize: "1.2rem",
  },
  commitmentCard: {
    background: "rgba(59, 130, 246, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "50px",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    textAlign: "center",
  },
  commitmentHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "25px",
  },
  commitmentIcon: {
    color: "#3b82f6",
  },
  commitmentTitle: {
    fontSize: "2rem",
    margin: 0,
    color: "white",
  },
  commitmentText: {
    color: "#ccc",
    lineHeight: "1.8",
    fontSize: "1.1rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "50px",
  },
  sectionTitle: {
    fontSize: "2rem",
    marginBottom: "30px",
    color: "white",
    textAlign: "center",
  },
  dataTable: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    background: "rgba(59, 130, 246, 0.2)",
    padding: "20px",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    transition: "background 0.3s ease",
  },
  tableCell: {
    padding: "10px",
    display: "flex",
    alignItems: "center",
  },
  dataType: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  rightsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
  },
  rightCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "25px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "transform 0.3s ease",
  },
  rightIcon: {
    color: "#3b82f6",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "center",
  },
  rightTitle: {
    fontSize: "1.2rem",
    margin: "0 0 10px 0",
    color: "white",
  },
  rightDescription: {
    color: "#aaa",
    fontSize: "0.9rem",
    lineHeight: "1.6",
  },
  securityCard: {
    background: "rgba(16, 185, 129, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "50px",
    border: "1px solid rgba(16, 185, 129, 0.3)",
  },
  securityHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
    justifyContent: "center",
  },
  securityIcon: {
    color: "#10b981",
  },
  securityTitle: {
    fontSize: "2rem",
    margin: 0,
    color: "white",
  },
  securityFeatures: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  securityFeature: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "10px",
  },
  featureBullet: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#10b981",
    flexShrink: 0,
  },
  contactCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "40px",
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
  },
  contactTitle: {
    fontSize: "1.8rem",
    margin: "0 0 20px 0",
    color: "white",
  },
  contactText: {
    color: "#ccc",
    lineHeight: "1.7",
    marginBottom: "30px",
    fontSize: "1.1rem",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "500px",
    margin: "0 auto",
  },
  contactItem: {
    padding: "15px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "10px",
    color: "#aaa",
  },
  updateCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  updateTitle: {
    fontSize: "1.5rem",
    margin: "0 0 15px 0",
    color: "white",
  },
  updateText: {
    color: "#ccc",
    lineHeight: "1.7",
    marginBottom: "20px",
    fontSize: "1rem",
  },
  updateBadge: {
    display: "inline-block",
    padding: "8px 20px",
    background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
    color: "white",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "bold",
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
  footerLinks : {
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
    0%, 100% { transform: translateY(0) translateX(0) scale(1); }
    33% { transform: translateY(-30px) translateX(10px) scale(1.05); }
    66% { transform: translateY(20px) translateX(-10px) scale(0.95); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes glow {
    0%, 100% { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5)); }
    50% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8)); }
  }
  
  /* Hover effects */
  .table-row:hover {
    background: rgba(255,255,255,0.03);
  }
  
  .right-card:hover {
    transform: translateY(-5px);
    border-color: rgba(59, 130, 246, 0.3);
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

export default PrivacyPage;