import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, X, Home, MessageSquare, Settings, 
  User, LogOut, Moon, Sun, Bell, Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HamburgerMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Close menu on escape key or click outside
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.menu-container')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <MessageSquare size={20} />, label: 'New Chat', path: '/chat' },
    { icon: <Bell size={20} />, label: 'Notifications', path: '/notifications' },
    { icon: <User size={20} />, label: 'Profile', path: '/profile' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="menu-container" style={styles.container}>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.hamburgerButton}
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={styles.overlay}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              style={styles.menuPanel}
            >
              {/* User Info */}
              <div style={styles.userSection}>
                <div style={styles.avatar}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div style={styles.userInfo}>
                  <h3 style={styles.userName}>{user?.name || 'User'}</h3>
                  <p style={styles.userEmail}>{user?.email || 'user@example.com'}</p>
                </div>
              </div>

              {/* Search Bar */}
              <div style={styles.searchContainer}>
                <Search size={18} style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search chats..."
                  style={styles.searchInput}
                />
              </div>

              {/* Menu Items */}
              <nav style={styles.nav}>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      style={styles.menuItem}
                      onClick={() => setIsOpen(false)}
                    >
                      <span style={styles.menuIcon}>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Divider */}
              <div style={styles.divider} />

              {/* Theme Toggle */}
              <div style={styles.themeToggle}>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  style={styles.themeButton}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div style={styles.quickActions}>
                <button style={styles.quickButton}>
                  New Folder
                </button>
                <button style={styles.quickButton}>
                  Shared Chats
                </button>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                style={styles.logoutButton}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  hamburgerButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 999,
  },
  menuPanel: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '320px',
    height: '100%',
    background: 'rgba(20, 20, 30, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    overflowY: 'auto',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '30px',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    margin: '0 0 5px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
  },
  userEmail: {
    margin: 0,
    fontSize: '12px',
    color: '#aaa',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '25px',
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#667eea',
  },
  searchInput: {
    width: '100%',
    padding: '12px 15px 12px 45px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '25px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px 15px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  menuIcon: {
    color: '#667eea',
  },
  divider: {
    height: '1px',
    background: 'rgba(255, 255, 255, 0.1)',
    margin: '20px 0',
  },
  themeToggle: {
    marginBottom: '20px',
  },
  themeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px 15px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    color: '#ccc',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  quickActions: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  quickButton: {
    flex: 1,
    padding: '10px',
    background: 'rgba(102, 126, 234, 0.1)',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    borderRadius: '8px',
    color: '#667eea',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '12px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '10px',
    color: '#ef4444',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: 'auto',
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  
  /* Hover effects */
  .hamburger-button:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    transform: scale(1.05) !important;
  }
  
  .menu-item:hover {
    background: rgba(102, 126, 234, 0.1) !important;
    border-color: rgba(102, 126, 234, 0.3) !important;
    transform: translateX(5px) !important;
  }
  
  .search-input:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2) !important;
  }
  
  .theme-button:hover,
  .quick-button:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-2px) !important;
  }
  
  .logout-button:hover {
    background: rgba(239, 68, 68, 0.2) !important;
    transform: translateY(-2px) !important;
  }
  
  /* Scrollbar styling */
  .menu-panel::-webkit-scrollbar {
    width: 6px;
  }
  
  .menu-panel::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .menu-panel::-webkit-scrollbar-thumb {
    background: rgba(102, 126, 234, 0.5);
    border-radius: 3px;
  }
  
  /* Responsive */
  @media (max-width: 480px) {
    .menu-panel {
      width: 100% !important;
      max-width: 320px;
    }
  }
`;
document.head.appendChild(styleSheet);

export default HamburgerMenu;