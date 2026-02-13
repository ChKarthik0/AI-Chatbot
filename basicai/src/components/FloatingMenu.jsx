import React, { useState } from "react";
import { 
  Menu, X, MessageSquare, Settings, 
  User, HelpCircle, Globe, Zap 
} from "lucide-react";

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    { id: "chat", icon: <MessageSquare size={20} />, label: "New Chat", color: "#6366f1" },
    { id: "settings", icon: <Settings size={20} />, label: "Settings", color: "#8b5cf6" },
    { id: "profile", icon: <User size={20} />, label: "Profile", color: "#0ea5e9" },
    { id: "help", icon: <HelpCircle size={20} />, label: "Help", color: "#10b981" },
    { id: "language", icon: <Globe size={20} />, label: "Language", color: "#f59e0b" },
    { id: "quick", icon: <Zap size={20} />, label: "Quick Actions", color: "#ec4899" },
  ];

  return (          
    <>
      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...styles.floatingButton,
          ...(isOpen && styles.floatingButtonActive)
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Items */}
      {isOpen && (
        <div style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              style={{
                ...styles.menuItem,
                animationDelay: `${index * 0.1}s`,
                ...(activeMenu === item.id && styles.menuItemActive)
              }}
              onMouseEnter={() => setActiveMenu(item.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div style={{ ...styles.menuIcon, background: item.color }}>
                {item.icon}
              </div>
              <span style={styles.menuLabel}>{item.label}</span>
              <div style={{ ...styles.menuGlow, background: item.color }} />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

const styles = {
  floatingButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    border: "none",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 1000,
    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
    transition: "all 0.3s ease",
  },
  floatingButtonActive: {
    transform: "rotate(180deg)",
    boxShadow: "0 15px 40px rgba(99, 102, 241, 0.6)",
  },
  menuContainer: {
    position: "fixed",
    bottom: "100px",
    right: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    zIndex: 999,
    animation: "menuAppear 0.3s ease-out",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px 25px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "15px",
    color: "white",
    cursor: "pointer",
    transform: "translateX(100px)",
    opacity: 0,
    animation: "menuItemAppear 0.3s ease-out forwards",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  menuItemActive: {
    background: "rgba(255, 255, 255, 0.15)",
    transform: "translateX(-10px)",
  },
  menuIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  menuLabel: {
    fontSize: "16px",
    fontWeight: "500",
    whiteSpace: "nowrap",
  },
  menuGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes menuAppear {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes menuItemAppear {
    to { opacity: 1; transform: translateX(0); }
  }
  
  .menu-item:hover .menu-glow {
    opacity: 1;
  }
  
  .menu-item:hover {
    transform: translateX(-10px) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    .floating-button {
      width: 50px;
      height: 50px;
      bottom: 20px;
      right: 20px;
    }
    
    .menu-container {
      bottom: 80px;
      right: 20px;
    }
    
    .menu-item {
      padding: 12px 20px;
    }
  }
`;
document.head.appendChild(styleSheet);

export default FloatingMenu;