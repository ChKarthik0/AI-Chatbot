import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare, 
  Settings, 
  User, 
  LogOut, 
  Home, 
  History,
  Plus,
  Search,
  Bell,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import ModelSelector from "../components/ModelSelector";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192");

  const recentChats = [
    { id: 1, title: "React Component Best Practices", lastActive: "2 hours ago", unread: false },
    { id: 2, title: "AI Project Architecture", lastActive: "1 day ago", unread: true },
    { id: 3, title: "Debugging WebSocket Issues", lastActive: "3 days ago", unread: false },
    { id: 4, title: "Machine Learning Concepts", lastActive: "1 week ago", unread: false },
    { id: 5, title: "API Design Discussion", lastActive: "2 weeks ago", unread: false },
  ];

  const stats = [
    { label: "Total Chats", value: "128", change: "+12%" },
    { label: "Questions Asked", value: "1,248", change: "+23%" },
    { label: "Avg Response Time", value: "1.2s", change: "-0.3s" },
    { label: "Accuracy", value: "94.5%", change: "+2.1%" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <motion.div
        animate={{ width: isSidebarOpen ? 280 : 70 }}
        transition={{ duration: 0.3 }}
        style={styles.sidebar}
      >
        {/* Logo & Toggle */}
        <div style={styles.sidebarHeader}>
          {isSidebarOpen ? (
            <div style={styles.logo}>
              <Sparkles size={24} style={styles.logoIcon} />
              <span style={styles.logoText}>Nova<span style={styles.logoHighlight}>AI</span></span>
            </div>
          ) : (
            <Sparkles size={28} style={styles.logoIcon} />
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={styles.toggleButton}
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* User Info */}
        {isSidebarOpen && (
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div style={styles.userDetails}>
              <h3 style={styles.userName}>{user.name || "User"}</h3>
              <p style={styles.userEmail}>{user.email || "user@example.com"}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav style={styles.nav}>
          <button 
            onClick={() => navigate("/")} 
            style={styles.navButton}
          >
            <Home size={20} />
            {isSidebarOpen && <span>Dashboard</span>}
          </button>
          
          <button 
            onClick={() => navigate("/chat")} 
            style={styles.navButton}
          >
            <MessageSquare size={20} />
            {isSidebarOpen && <span>New Chat</span>}
          </button>
          
          <button 
            onClick={() => navigate("/history")} 
            style={styles.navButton}
          >
            <History size={20} />
            {isSidebarOpen && <span>History</span>}
          </button>
        </nav>

        {/* Recent Chats */}
        {isSidebarOpen && (
          <div style={styles.recentChats}>
            <h4 style={styles.recentTitle}>
              <History size={16} />
              Recent Chats
            </h4>
            <div style={styles.chatList}>
              {recentChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => navigate(`/chat/${chat.id}`)}
                  style={styles.chatItem}
                >
                  <div style={styles.chatInfo}>
                    <span style={styles.chatTitle}>{chat.title}</span>
                    <span style={styles.chatTime}>{chat.lastActive}</span>
                  </div>
                  {chat.unread && <div style={styles.unreadDot} />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Settings & Logout */}
        <div style={styles.sidebarFooter}>
          <button 
            onClick={() => navigate("/settings")} 
            style={styles.sidebarButton}
          >
            <Settings size={20} />
            {isSidebarOpen && <span>Settings</span>}
          </button>
          
          <button 
            onClick={() => navigate("/profile")} 
            style={styles.sidebarButton}
          >
            <User size={20} />
            {isSidebarOpen && <span>Profile</span>}
          </button>
          
          <button 
            onClick={handleLogout} 
            style={styles.logoutButton}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.greeting}>Welcome back, {user.name}! 👋</h1>
            <p style={styles.subGreeting}>Ready for some intelligent conversations?</p>
          </div>
          
          <div style={styles.headerRight}>
            <button style={styles.headerButton}>
              <Bell size={20} />
            </button>
            <button style={styles.headerButton}>
              <Search size={20} />
            </button>
            <div style={styles.userAvatar}>
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={styles.statCard}
            >
              <h3 style={styles.statValue}>{stat.value}</h3>
              <p style={styles.statLabel}>{stat.label}</p>
              <span style={styles.statChange}>{stat.change}</span>
            </motion.div>
          ))}
        </div>

        {/* Model Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={styles.modelSection}
        >
          <ModelSelector 
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </motion.div>

        {/* Quick Actions */}
        <div style={styles.quickActions}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/chat")}
            style={styles.primaryAction}
          >
            <Plus size={24} />
            <div>
              <h3>Start New Chat</h3>
              <p>Begin a conversation with NovaAI</p>
            </div>
          </motion.button>
          
          <div style={styles.secondaryActions}>
            <button style={styles.secondaryAction}>
              <MessageSquare size={20} />
              <span>Continue Last Chat</span>
            </button>
            <button style={styles.secondaryAction}>
              <History size={20} />
              <span>View History</span>
            </button>
            <button style={styles.secondaryAction}>
              <Settings size={20} />
              <span>Customize AI</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.activitySection}>
          <h2 style={styles.sectionTitle}>Recent Activity</h2>
          <div style={styles.activityList}>
            {recentChats.slice(0, 3).map((chat) => (
              <div key={chat.id} style={styles.activityItem}>
                <div style={styles.activityIcon}>💬</div>
                <div style={styles.activityContent}>
                  <h4>{chat.title}</h4>
                  <p>Last active {chat.lastActive}</p>
                </div>
                <button 
                  onClick={() => navigate(`/chat/${chat.id}`)}
                  style={styles.resumeButton}
                >
                  Resume
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0b0b0b 0%, #1a1a2e 100%)",
    color: "white",
    fontFamily: "Inter, sans-serif",
  },
  sidebar: {
    background: "rgba(30, 30, 30, 0.9)",
    backdropFilter: "blur(10px)",
    borderRight: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  sidebarHeader: {
    padding: "25px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    color: "#667eea",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "800",
    color: "white",
  },
  logoHighlight: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  toggleButton: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "8px",
    color: "white",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  userInfo: {
    padding: "25px 20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    margin: "0 0 5px 0",
    fontSize: "16px",
    fontWeight: "600",
  },
  userEmail: {
    margin: 0,
    fontSize: "12px",
    color: "#aaa",
  },
  nav: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 15px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  recentChats: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
  recentTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: "#aaa",
    margin: "0 0 15px 0",
  },
  chatList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  chatItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 15px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "left",
  },
  chatInfo: {
    flex: 1,
  },
  chatTitle: {
    display: "block",
    fontSize: "13px",
    marginBottom: "3px",
  },
  chatTime: {
    fontSize: "11px",
    color: "#888",
  },
  unreadDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#10b981",
  },
  sidebarFooter: {
    padding: "20px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sidebarButton: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 15px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 15px",
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "10px",
    color: "#ef4444",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
  mainContent: {
    flex: 1,
    overflowY: "auto",
    padding: "30px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: "2.5rem",
    fontWeight: "800",
    margin: "0 0 10px 0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subGreeting: {
    fontSize: "1.1rem",
    color: "#aaa",
    margin: 0,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  headerButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  userAvatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  statCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "25px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "700",
    margin: "0 0 5px 0",
    color: "white",
  },
  statLabel: {
    fontSize: "14px",
    color: "#aaa",
    margin: "0 0 10px 0",
  },
  statChange: {
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "12px",
    background: "rgba(16, 185, 129, 0.1)",
    color: "#10b981",
    display: "inline-block",
  },
  modelSection: {
    marginBottom: "40px",
  },
  quickActions: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
    marginBottom: "40px",
  },
  primaryAction: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "20px",
    padding: "30px",
    border: "none",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    textAlign: "left",
    transition: "all 0.3s ease",
  },
  secondaryActions: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  secondaryAction: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "15px",
    padding: "20px",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    transition: "all 0.3s ease",
  },
  activitySection: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    margin: "0 0 25px 0",
    color: "white",
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  activityIcon: {
    fontSize: "24px",
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    background: "rgba(102, 126, 234, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  activityContent: {
    flex: 1,
  },
  activityContent : {
    margin: "0 0 5px 0",
    fontSize: "16px",
    color: "white",
  },
  activityContent : {
    margin: 0,
    fontSize: "14px",
    color: "#aaa",
  },
  resumeButton: {
    padding: "8px 20px",
    background: "rgba(102, 126, 234, 0.1)",
    border: "1px solid rgba(102, 126, 234, 0.3)",
    borderRadius: "20px",
    color: "#667eea",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Hover effects */
  .nav-button:hover,
  .sidebar-button:hover,
  .header-button:hover,
  .chat-item:hover,
  .secondary-action:hover {
    background: rgba(255,255,255,0.1) !important;
    transform: translateY(-2px) !important;
  }
  
  .logout-button:hover {
    background: rgba(239, 68, 68, 0.2) !important;
    transform: translateY(-2px) !important;
  }
  
  .primary-action:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3) !important;
  }
  
  .resume-button:hover {
    background: rgba(102, 126, 234, 0.2) !important;
    transform: translateY(-2px) !important;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(102, 126, 234, 0.5);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(102, 126, 234, 0.8);
  }
`;
document.head.appendChild(styleSheet);

export default Dashboard;