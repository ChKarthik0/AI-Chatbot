import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Settings as SettingsIcon,
  Palette,
  Globe,
  Bell,
  Keyboard,
  Database,
  Shield,
  Moon,
  Save,
  RotateCcw
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appearance");
  const [settings, setSettings] = useState({
    // Appearance
    theme: "dark",
    fontSize: "medium",
    language: "en",
    
    // Chat
    autoSave: true,
    autoComplete: true,
    typingIndicator: true,
    
    // Privacy
    dataCollection: true,
    chatHistory: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    soundEffects: true,
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    if (window.confirm("Reset all settings to default?")) {
      setSettings({
        theme: "dark",
        fontSize: "medium",
        language: "en",
        autoSave: true,
        autoComplete: true,
        typingIndicator: true,
        dataCollection: true,
        chatHistory: true,
        emailNotifications: true,
        pushNotifications: false,
        soundEffects: true,
      });
    }
  };

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem("nova_settings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <div style={styles.page}>
      {/* Background */}
      <div style={styles.background}>
        <div style={{ ...styles.shape, ...styles.shape1 }} />
        <div style={{ ...styles.shape, ...styles.shape2 }} />
      </div>

      {/* Header */}
      <header style={styles.header}>
        <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <div style={styles.headerContent}>
          <SettingsIcon size={32} style={styles.headerIcon} />
          <div>
            <h1 style={styles.title}>Settings</h1>
            <p style={styles.subtitle}>Customize your NovaAI experience</p>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.container}>
          {/* Settings Tabs */}
          <div style={styles.tabs}>
            <button 
              onClick={() => setActiveTab("appearance")}
              style={{
                ...styles.tab,
                ...(activeTab === "appearance" && styles.tabActive)
              }}
            >
              <Palette size={18} />
              Appearance
            </button>
            <button 
              onClick={() => setActiveTab("chat")}
              style={{
                ...styles.tab,
                ...(activeTab === "chat" && styles.tabActive)
              }}
            >
              <SettingsIcon size={18} />
              Chat Settings
            </button>
            <button 
              onClick={() => setActiveTab("privacy")}
              style={{
                ...styles.tab,
                ...(activeTab === "privacy" && styles.tabActive)
              }}
            >
              <Shield size={18} />
              Privacy
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              style={{
                ...styles.tab,
                ...(activeTab === "notifications" && styles.tabActive)
              }}
            >
              <Bell size={18} />
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab("advanced")}
              style={{
                ...styles.tab,
                ...(activeTab === "advanced" && styles.tabActive)
              }}
            >
              <Database size={18} />
              Advanced
            </button>
          </div>

          {/* Settings Content */}
          <div style={styles.content}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={styles.settingsCard}
            >
              {activeTab === "appearance" && (
                <>
                  <h2 style={styles.cardTitle}>
                    <Palette size={24} />
                    Appearance Settings
                  </h2>
                  
                  <div style={styles.settingGroup}>
                    <h3 style={styles.settingTitle}>Theme</h3>
                    <div style={styles.themeOptions}>
                      {[
                        { id: "dark", label: "Dark", icon: <Moon size={20} /> },
                        { id: "light", label: "Light", icon: "☀️" },
                        { id: "auto", label: "Auto", icon: "🌗" }
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => handleChange("theme", theme.id)}
                          style={{
                            ...styles.themeOption,
                            ...(settings.theme === theme.id && styles.themeOptionActive)
                          }}
                        >
                          {theme.icon}
                          <span>{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={styles.settingGroup}>
                    <h3 style={styles.settingTitle}>Font Size</h3>
                    <div style={styles.fontOptions}>
                      {["small", "medium", "large", "xlarge"].map((size) => (
                        <button
                          key={size}
                          onClick={() => handleChange("fontSize", size)}
                          style={{
                            ...styles.fontOption,
                            ...(settings.fontSize === size && styles.fontOptionActive)
                          }}
                        >
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={styles.settingGroup}>
                    <h3 style={styles.settingTitle}>
                      <Globe size={18} />
                      Language
                    </h3>
                    <select
                      value={settings.language}
                      onChange={(e) => handleChange("language", e.target.value)}
                      style={styles.select}
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ja">日本語</option>
                      <option value="ko">한국어</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === "chat" && (
                <>
                  <h2 style={styles.cardTitle}>
                    <SettingsIcon size={24} />
                    Chat Settings
                  </h2>
                  
                  {[
                    {
                      key: "autoSave",
                      title: "Auto-save Conversations",
                      description: "Automatically save chat history"
                    },
                    {
                      key: "autoComplete",
                      title: "Auto-complete Suggestions",
                      description: "Show typing suggestions"
                    },
                    {
                      key: "typingIndicator",
                      title: "Typing Indicators",
                      description: "Show when AI is typing"
                    }
                  ].map((item) => (
                    <div key={item.key} style={styles.toggleSetting}>
                      <div>
                        <h3 style={styles.settingTitle}>{item.title}</h3>
                        <p style={styles.settingDesc}>{item.description}</p>
                      </div>
                      <label style={styles.switch}>
                        <input
                          type="checkbox"
                          checked={settings[item.key]}
                          onChange={(e) => handleChange(item.key, e.target.checked)}
                        />
                        <span style={styles.slider}></span>
                      </label>
                    </div>
                  ))}
                </>
              )}

              {activeTab === "privacy" && (
                <>
                  <h2 style={styles.cardTitle}>
                    <Shield size={24} />
                    Privacy Settings
                  </h2>
                  
                  {[
                    {
                      key: "dataCollection",
                      title: "Data Collection",
                      description: "Allow anonymous usage data collection"
                    },
                    {
                      key: "chatHistory",
                      title: "Chat History",
                      description: "Save chat history (encrypted)"
                    }
                  ].map((item) => (
                    <div key={item.key} style={styles.toggleSetting}>
                      <div>
                        <h3 style={styles.settingTitle}>{item.title}</h3>
                        <p style={styles.settingDesc}>{item.description}</p>
                      </div>
                      <label style={styles.switch}>
                        <input
                          type="checkbox"
                          checked={settings[item.key]}
                          onChange={(e) => handleChange(item.key, e.target.checked)}
                        />
                        <span style={styles.slider}></span>
                      </label>
                    </div>
                  ))}

                  <div style={styles.settingGroup}>
                    <h3 style={styles.settingTitle}>Data Retention</h3>
                    <div style={styles.radioOptions}>
                      {[
                        { value: "30", label: "30 days" },
                        { value: "90", label: "90 days" },
                        { value: "365", label: "1 year" },
                        { value: "forever", label: "Forever" }
                      ].map((option) => (
                        <label key={option.value} style={styles.radioLabel}>
                          <input
                            type="radio"
                            name="retention"
                            value={option.value}
                            defaultChecked={option.value === "30"}
                            style={styles.radio}
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "notifications" && (
                <>
                  <h2 style={styles.cardTitle}>
                    <Bell size={24} />
                    Notification Settings
                  </h2>
                  
                  {[
                    {
                      key: "emailNotifications",
                      title: "Email Notifications",
                      description: "Receive notifications via email"
                    },
                    {
                      key: "pushNotifications",
                      title: "Push Notifications",
                      description: "Browser push notifications"
                    },
                    {
                      key: "soundEffects",
                      title: "Sound Effects",
                      description: "Play sounds for notifications"
                    }
                  ].map((item) => (
                    <div key={item.key} style={styles.toggleSetting}>
                      <div>
                        <h3 style={styles.settingTitle}>{item.title}</h3>
                        <p style={styles.settingDesc}>{item.description}</p>
                      </div>
                      <label style={styles.switch}>
                        <input
                          type="checkbox"
                          checked={settings[item.key]}
                          onChange={(e) => handleChange(item.key, e.target.checked)}
                        />
                        <span style={styles.slider}></span>
                      </label>
                    </div>
                  ))}
                </>
              )}

              {activeTab === "advanced" && (
                <>
                  <h2 style={styles.cardTitle}>
                    <Database size={24} />
                    Advanced Settings
                  </h2>
                  
                  <div style={styles.settingGroup}>
                    <h3 style={styles.settingTitle}>
                      <Keyboard size={18} />
                      Keyboard Shortcuts
                    </h3>
                    <div style={styles.shortcuts}>
                      {[
                        { key: "Ctrl + K", action: "Focus chat input" },
                        { key: "Ctrl + /", action: "Open command palette" },
                        { key: "Ctrl + N", action: "New chat" },
                        { key: "Ctrl + S", action: "Save chat" }
                      ].map((shortcut, index) => (
                        <div key={index} style={styles.shortcutItem}>
                          <kbd style={styles.kbd}>{shortcut.key}</kbd>
                          <span style={styles.shortcutAction}>{shortcut.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={styles.settingGroup}>
                    <h3 style={styles.settingTitle}>API Settings</h3>
                    <div style={styles.apiSettings}>
                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>API Endpoint</label>
                        <input
                          type="text"
                          placeholder="https://api.novaai.com/v1"
                          style={styles.input}
                          defaultValue="https://api.novaai.com/v1"
                        />
                      </div>
                      <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>API Key</label>
                        <input
                          type="password"
                          placeholder="••••••••••••"
                          style={styles.input}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={styles.dangerZone}>
                    <h3 style={styles.dangerTitle}>Danger Zone</h3>
                    <div style={styles.dangerButtons}>
                      <button style={styles.clearButton}>
                        Clear All Chat History
                      </button>
                      <button style={styles.resetButton} onClick={handleReset}>
                        <RotateCcw size={16} />
                        Reset All Settings
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Save Button */}
              <div style={styles.actionButtons}>
                <button onClick={handleReset} style={styles.resetBtn}>
                  <RotateCcw size={16} />
                  Reset
                </button>
                <button onClick={handleSave} style={styles.saveBtn}>
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0b0b0b 0%, #1a1a2e 100%)",
    color: "white",
    fontFamily: "Inter, sans-serif",
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
    animation: "float 20s ease-in-out infinite",
  },
  shape1: { width: 400, height: 400, background: "#4c51bf", top: "10%", left: "10%", animationDelay: "0s" },
  shape2: { width: 350, height: 350, background: "#667eea", top: "60%", left: "80%", animationDelay: "10s" },
  header: {
    position: "relative",
    zIndex: 10,
    padding: "25px 40px",
    background: "rgba(11, 11, 11, 0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "20px",
    padding: "10px 20px",
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginBottom: "20px",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  headerIcon: {
    color: "#667eea",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    margin: "0 0 5px 0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    color: "#aaa",
    fontSize: "1rem",
    margin: 0,
  },
  main: {
    position: "relative",
    zIndex: 5,
    padding: "40px",
  },
  container: {
    display: "flex",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  tabs: {
    flex: "0 0 250px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px 20px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "#aaa",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "left",
  },
  tabActive: {
    background: "rgba(102, 126, 234, 0.1)",
    color: "#667eea",
    borderColor: "rgba(102, 126, 234, 0.3)",
  },
  content: {
    flex: 1,
  },
  settingsCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  cardTitle: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontSize: "24px",
    fontWeight: "600",
    margin: "0 0 30px 0",
    color: "white",
  },
  settingGroup: {
    marginBottom: "35px",
  },
  settingTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 15px 0",
    color: "white",
  },
  themeOptions: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  themeOption: {
    flex: "1",
    minWidth: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
    background: "rgba(255,255,255,0.05)",
    border: "2px solid transparent",
    borderRadius: "12px",
    color: "#aaa",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  themeOptionActive: {
    background: "rgba(102, 126, 234, 0.1)",
    color: "#667eea",
    borderColor: "rgba(102, 126, 234, 0.3)",
  },
  fontOptions: {
    display: "flex",
    gap: "10px",
  },
  fontOption: {
    padding: "10px 20px",
    background: "rgba(255,255,255,0.05)",
    border: "2px solid transparent",
    borderRadius: "8px",
    color: "#aaa",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  fontOptionActive: {
    background: "rgba(102, 126, 234, 0.1)",
    color: "#667eea",
    borderColor: "rgba(102, 126, 234, 0.3)",
  },
  select: {
    width: "100%",
    maxWidth: "300px",
    padding: "12px 15px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "white",
    fontSize: "15px",
    outline: "none",
  },
  toggleSetting: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  settingDesc: {
    fontSize: "14px",
    color: "#aaa",
    margin: "5px 0 0 0",
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: "50px",
    height: "26px",
  },
  slider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ccc",
    transition: "0.4s",
    borderRadius: "34px",
  },
  radioOptions: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "15px",
    color: "#aaa",
    cursor: "pointer",
  },
  radio: {
    width: "18px",
    height: "18px",
    accentColor: "#667eea",
  },
  shortcuts: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  shortcutItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "12px 15px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "8px",
  },
  kbd: {
    padding: "4px 8px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "4px",
    fontSize: "12px",
    fontFamily: "monospace",
    minWidth: "80px",
    textAlign: "center",
  },
  shortcutAction: {
    color: "#aaa",
    fontSize: "14px",
  },
  apiSettings: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    maxWidth: "400px",
  },
  inputLabel: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#aaa",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "white",
    fontSize: "15px",
    outline: "none",
  },
  dangerZone: {
    marginTop: "40px",
    padding: "25px",
    background: "rgba(239, 68, 68, 0.1)",
    borderRadius: "12px",
    border: "1px solid rgba(239, 68, 68, 0.3)",
  },
  dangerTitle: {
    margin: "0 0 15px 0",
    fontSize: "18px",
    color: "#ef4444",
  },
  dangerButtons: {
    display: "flex",
    gap: "15px",
  },
  clearButton: {
    padding: "12px 25px",
    background: "rgba(239, 68, 68, 0.2)",
    border: "1px solid rgba(239, 68, 68, 0.4)",
    color: "#ef4444",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  resetButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 25px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#aaa",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "40px",
    paddingTop: "30px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  resetBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 25px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#aaa",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 30px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
  }
  
  /* Hover effects */
  .back-button:hover,
  .tab:hover,
  .theme-option:hover,
  .font-option:hover,
  .reset-button:hover,
  .reset-btn:hover {
    background: rgba(255,255,255,0.1) !important;
    transform: translateY(-2px) !important;
  }
  
  .save-btn:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3) !important;
  }
  
  .clear-button:hover {
    background: rgba(239, 68, 68, 0.3) !important;
    transform: translateY(-2px) !important;
  }
  
  /* Switch styling */
  .switch input:checked + .slider {
    background-color: #667eea;
  }
  
  .switch input:checked + .slider:before {
    transform: translateX(24px);
  }
  
  /* Responsive design */
  @media (max-width: 1024px) {
    .container {
      flex-direction: column !important;
    }
    
    .tabs {
      flex: none !important;
      width: 100% !important;
      flex-direction: row !important;
      overflow-x: auto !important;
    }
    
    .tab {
      flex: 1 !important;
      min-width: 150px !important;
    }
  }
  
  @media (max-width: 768px) {
    .main {
      padding: 20px !important;
    }
    
    .settings-card {
      padding: 25px !important;
    }
    
    .theme-options,
    .font-options,
    .radio-options {
      flex-direction: column !important;
    }
    
    .theme-option,
    .font-option {
      width: 100% !important;
    }
    
    .danger-buttons,
    .action-buttons {
      flex-direction: column !important;
    }
  }
  
  @media (max-width: 480px) {
    .header {
      padding: 20px !important;
    }
    
    .title {
      font-size: 1.5rem !important;
    }
    
    .card-title {
      font-size: 1.3rem !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Settings;