import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, Settings, ToggleLeft, ToggleRight, Check, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CookiesPage = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false,
  });

  const [saved, setSaved] = useState(false);

  const togglePreference = (key) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const savePreferences = () => {
    // In a real app, you would save these preferences to localStorage or a cookie
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const acceptAll = () => {
    setPreferences({
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const rejectAll = () => {
    setPreferences({
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
            <Cookie size={48} style={styles.pageIcon} />
            <h1 style={styles.pageTitle}>Cookie Preferences</h1>
            <p style={styles.pageSubtitle}>Manage your cookie settings</p>
          </div>

          {/* Cookie Explanation */}
          <div style={styles.explanationCard}>
            <div style={styles.explanationHeader}>
              <Settings size={32} style={styles.explanationIcon} />
              <h2 style={styles.explanationTitle}>About Cookies</h2>
            </div>
            <p style={styles.explanationText}>
              Cookies are small text files stored on your device that help us provide, 
              protect, and improve NovaAI. They remember your preferences, understand how 
              you use our service, and enable personalized experiences.
            </p>
          </div>

          {/* Cookie Categories */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Cookie Categories</h2>
            <div style={styles.categoriesGrid}>
              {[
                {
                  id: "essential",
                  title: "Essential Cookies",
                  description: "Required for basic site functionality and security. These cannot be disabled.",
                  alwaysOn: true,
                  examples: "Authentication, security, session management"
                },
                {
                  id: "analytics",
                  title: "Analytics Cookies",
                  description: "Help us understand how visitors interact with our service.",
                  examples: "Page visits, feature usage, performance metrics"
                },
                {
                  id: "marketing",
                  title: "Marketing Cookies",
                  description: "Used to deliver relevant advertisements and measure campaign effectiveness.",
                  examples: "Ad targeting, campaign measurement, conversion tracking"
                },
                {
                  id: "personalization",
                  title: "Personalization Cookies",
                  description: "Remember your preferences to provide customized experiences.",
                  examples: "Language settings, theme preferences, chat history"
                }
              ].map((category) => (
                <div key={category.id} style={styles.categoryCard}>
                  <div style={styles.categoryHeader}>
                    <h3 style={styles.categoryTitle}>{category.title}</h3>
                    <div style={styles.toggleContainer}>
                      {category.alwaysOn ? (
                        <div style={styles.alwaysOnBadge}>Always On</div>
                      ) : (
                        <button
                          onClick={() => togglePreference(category.id)}
                          style={styles.toggleBtn}
                        >
                          {preferences[category.id] ? (
                            <ToggleRight size={36} style={styles.toggleOn} />
                          ) : (
                            <ToggleLeft size={36} style={styles.toggleOff} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  <p style={styles.categoryDescription}>{category.description}</p>
                  <div style={styles.examples}>
                    <strong>Examples:</strong> {category.examples}
                  </div>
                  <div style={styles.status}>
                    {category.alwaysOn ? (
                      <div style={styles.statusActive}>
                        <Check size={16} />
                        <span>Required</span>
                      </div>
                    ) : preferences[category.id] ? (
                      <div style={styles.statusActive}>
                        <Check size={16} />
                        <span>Enabled</span>
                      </div>
                    ) : (
                      <div style={styles.statusInactive}>
                        <X size={16} />
                        <span>Disabled</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.actionsCard}>
            <h2 style={styles.actionsTitle}>Quick Actions</h2>
            <div style={styles.actionsGrid}>
              <button onClick={acceptAll} style={styles.acceptAllBtn}>
                <Check size={20} />
                Accept All Cookies
              </button>
              <button onClick={rejectAll} style={styles.rejectAllBtn}>
                <X size={20} />
                Reject Non-Essential
              </button>
              <button onClick={savePreferences} style={styles.saveBtn}>
                <Settings size={20} />
                Save Current Preferences
              </button>
            </div>
          </div>

          {/* Saved Notification */}
          {saved && (
            <div style={styles.notification}>
              <Check size={20} />
              Preferences saved successfully!
            </div>
          )}

          {/* Duration Info */}
          <div style={styles.durationCard}>
            <h3 style={styles.durationTitle}>Cookie Duration</h3>
            <div style={styles.durationTable}>
              <div style={styles.durationRow}>
                <div style={styles.durationType}>Session Cookies</div>
                <div style={styles.durationTime}>Deleted when you close your browser</div>
              </div>
              <div style={styles.durationRow}>
                <div style={styles.durationType}>Persistent Cookies</div>
                <div style={styles.durationTime}>Expire after 30 days to 2 years</div>
              </div>
              <div style={styles.durationRow}>
                <div style={styles.durationType}>First-party Cookies</div>
                <div style={styles.durationTime}>Set by NovaAI, various durations</div>
              </div>
              <div style={styles.durationRow}>
                <div style={styles.durationType}>Third-party Cookies</div>
                <div style={styles.durationTime}>Set by partners, follow their policies</div>
              </div>
            </div>
          </div>

          {/* Browser Controls */}
          <div style={styles.browserCard}>
            <h3 style={styles.browserTitle}>Browser Controls</h3>
            <p style={styles.browserText}>
              Most web browsers allow you to control cookies through their settings. 
              You can usually find these settings in the "Options" or "Preferences" 
              menu of your browser.
            </p>
            <div style={styles.browserTips}>
              <div style={styles.tip}>
                <strong>Chrome:</strong> Settings → Privacy and Security → Cookies
              </div>
              <div style={styles.tip}>
                <strong>Firefox:</strong> Options → Privacy & Security → Cookies
              </div>
              <div style={styles.tip}>
                <strong>Safari:</strong> Preferences → Privacy → Cookies
              </div>
              <div style={styles.tip}>
                <strong>Edge:</strong> Settings → Cookies and Site Permissions
              </div>
            </div>
          </div>

          {/* More Information */}
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>Need More Information?</h3>
            <p style={styles.infoText}>
              For detailed information about specific cookies we use, or if you have 
              questions about our cookie practices, please review our full 
              <Link to="/privacy" style={styles.privacyLink}> Privacy Policy</Link> 
              or contact our privacy team.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer></Footer>
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
    animation: "float 20s ease-in-out infinite",
  },
  shape1: { width: 400, height: 400, background: "#f59e0b", top: "15%", left: "10%", animationDelay: "0s" },
  shape2: { width: 350, height: 350, background: "#d97706", top: "65%", left: "80%", animationDelay: "7s" },
  shape3: { width: 300, height: 300, background: "#fbbf24", top: "40%", left: "85%", animationDelay: "14s" },
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
    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
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
    color: "#f59e0b",
    marginBottom: "20px",
    animation: "bounce 2s ease-in-out infinite",
  },
  pageTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    margin: "0 0 10px 0",
    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  pageSubtitle: {
    color: "#aaa",
    fontSize: "1.2rem",
  },
  explanationCard: {
    background: "rgba(245, 158, 11, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "50px",
    border: "1px solid rgba(245, 158, 11, 0.3)",
  },
  explanationHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  explanationIcon: {
    color: "#f59e0b",
  },
  explanationTitle: {
    fontSize: "1.8rem",
    margin: 0,
    color: "white",
  },
  explanationText: {
    color: "#ccc",
    lineHeight: "1.8",
    fontSize: "1.1rem",
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
  categoriesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
  },
  categoryCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "25px",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "transform 0.3s ease",
  },
  categoryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  categoryTitle: {
    fontSize: "1.3rem",
    margin: 0,
    color: "white",
  },
  toggleContainer: {
    display: "flex",
    alignItems: "center",
  },
  alwaysOnBadge: {
    padding: "6px 12px",
    background: "rgba(245, 158, 11, 0.2)",
    color: "#f59e0b",
    borderRadius: "15px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  toggleBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  toggleOn: {
    color: "#10b981",
  },
  toggleOff: {
    color: "#6b7280",
  },
  categoryDescription: {
    color: "#aaa",
    fontSize: "0.95rem",
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  examples: {
    fontSize: "0.85rem",
    color: "#6b7280",
    marginBottom: "15px",
    padding: "10px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "8px",
  },
  status: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9rem",
  },
  statusActive: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#10b981",
  },
  statusInactive: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#6b7280",
  },
  actionsCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "30px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  actionsTitle: {
    fontSize: "1.8rem",
    margin: "0 0 25px 0",
    color: "white",
    textAlign: "center",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  acceptAllBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "15px 25px",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  rejectAllBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "15px 25px",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "15px 25px",
    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  notification: {
    position: "fixed",
    top: "100px",
    right: "30px",
    background: "rgba(16, 185, 129, 0.9)",
    color: "white",
    padding: "15px 25px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    animation: "slideInRight 0.3s ease-out",
    zIndex: 1000,
  },
  durationCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "30px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  durationTitle: {
    fontSize: "1.5rem",
    margin: "0 0 20px 0",
    color: "white",
  },
  durationTable: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  durationRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "10px",
  },
  durationType: {
    fontWeight: "bold",
    color: "white",
  },
  durationTime: {
    color: "#aaa",
    fontSize: "0.9rem",
  },
  browserCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "30px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  browserTitle: {
    fontSize: "1.5rem",
    margin: "0 0 20px 0",
    color: "white",
  },
  browserText: {
    color: "#ccc",
    lineHeight: "1.7",
    marginBottom: "25px",
    fontSize: "1.1rem",
  },
  browserTips: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  tip: {
    padding: "15px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "10px",
    fontSize: "0.9rem",
    color: "#aaa",
  },
  infoCard: {
    background: "rgba(245, 158, 11, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
    border: "1px solid rgba(245, 158, 11, 0.3)",
  },
  infoTitle: {
    fontSize: "1.5rem",
    margin: "0 0 15px 0",
    color: "white",
  },
  infoText: {
    color: "#ccc",
    lineHeight: "1.7",
    fontSize: "1.1rem",
  },
  privacyLink: {
    color: "#f59e0b",
    textDecoration: "none",
    marginLeft: "5px",
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
    0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
    25% { transform: translateY(-40px) translateX(15px) rotate(5deg); }
    50% { transform: translateY(20px) translateX(-15px) rotate(-5deg); }
    75% { transform: translateY(-20px) translateX(-10px) rotate(3deg); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  /* Hover effects */
  .category-card:hover {
    transform: translateY(-5px);
    border-color: rgba(245, 158, 11, 0.3);
  }
  
  .accept-all-btn:hover,
  .save-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
  }
  
  .reject-all-btn:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.3);
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

export default CookiesPage;