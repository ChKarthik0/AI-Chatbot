import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sparkles, Search, Bell, Settings, User, 
  LogOut, Plus, FolderOpen, History,
  ChevronDown, Globe, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DesktopNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const userMenuItems = [
    { icon: <User size={16} />, label: 'Profile', path: '/profile' },
    { icon: <Settings size={16} />, label: 'Settings', path: '/settings' },
    { icon: <FolderOpen size={16} />, label: 'My Collections', path: '/collections' },
    { icon: <History size={16} />, label: 'History', path: '/history' },
    { icon: <Globe size={16} />, label: 'Workspace', path: '/workspace' },
  ];

  const newMenuItems = [
    { icon: <Plus size={16} />, label: 'New Chat', action: () => navigate('/chat') },
    { icon: <FolderOpen size={16} />, label: 'New Folder', action: () => console.log('New folder') },
    { icon: <Zap size={16} />, label: 'Quick Prompt', action: () => console.log('Quick prompt') },
  ];

  return (
    <header style={styles.navbar}>
      {/* Logo Section */}
      <div style={styles.leftSection}>
        <Link to="/dashboard" style={styles.logo}>
          <Sparkles size={24} style={styles.logoIcon} />
          <span style={styles.logoText}>Nova<span style={styles.logoHighlight}>AI</span></span>
        </Link>
        
        {/* Quick Actions */}
        <div style={styles.quickActions}>
          <button 
            onClick={() => setShowNewMenu(!showNewMenu)}
            style={styles.newButton}
          >
            <Plus size={16} />
            <span>New</span>
            <ChevronDown size={14} />
          </button>
          
          <AnimatePresence>
            {showNewMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={styles.dropdownMenu}
              >
                {newMenuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    style={styles.dropdownItem}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <Link to="/history" style={styles.navLink}>
            <History size={18} />
            <span>History</span>
          </Link>
          
          <Link to="/collections" style={styles.navLink}>
            <FolderOpen size={18} />
            <span>Collections</span>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchSection}>
        <div style={styles.searchContainer}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search conversations, prompts, or files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.searchShortcut}>⌘K</div>
        </div>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        {/* Notifications */}
        <button style={styles.iconButton}>
          <Bell size={20} />
          <span style={styles.notificationBadge}>3</span>
        </button>
        
        {/* Settings */}
        <Link to="/settings" style={styles.iconButton}>
          <Settings size={20} />
        </Link>
        
        {/* User Menu */}
        <div style={styles.userMenuContainer}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={styles.userButton}
          >
            <div style={styles.userAvatar}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span style={styles.userName}>{user?.name?.split(' ')[0] || 'User'}</span>
            <ChevronDown size={16} />
          </button>
          
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={styles.userDropdown}
              >
                <div style={styles.dropdownHeader}>
                  <div style={styles.dropdownAvatar}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h4 style={styles.dropdownName}>{user?.name || 'User'}</h4>
                    <p style={styles.dropdownEmail}>{user?.email || 'user@example.com'}</p>
                  </div>
                </div>
                
                <div style={styles.dropdownDivider} />
                
                {userMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    style={styles.dropdownItem}
                    onClick={() => setShowUserMenu(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                <div style={styles.dropdownDivider} />
                
                <button
                  onClick={onLogout}
                  style={styles.logoutDropdownItem}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 40px',
    background: 'rgba(15, 15, 20, 0.9)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    fontWeight: '800',
  },
  logoIcon: {
    color: '#667eea',
    animation: 'sparkle 2s ease-in-out infinite',
  },
  logoText: {
    fontSize: '22px',
    fontWeight: '800',
  },
  logoHighlight: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  quickActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    position: 'relative',
  },
  newButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    left: 0,
    background: 'rgba(30, 30, 40, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '8px',
    minWidth: '200px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
    zIndex: 1001,
  },
  searchSection: {
    flex: 1,
    maxWidth: '500px',
    margin: '0 40px',
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
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
    transition: 'all 0.3s ease',
  },
  searchShortcut: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '4px 8px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    fontSize: '12px',
    color: '#aaa',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  iconButton: {
    position: 'relative',
    width: '40px',
    height: '40px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  notificationBadge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    width: '18px',
    height: '18px',
    background: '#ef4444',
    color: 'white',
    borderRadius: '50%',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMenuContainer: {
    position: 'relative',
  },
  userButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 12px 6px 6px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '500',
  },
  userDropdown: {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    right: 0,
    background: 'rgba(30, 30, 40, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '15px',
    minWidth: '250px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
    zIndex: 1001,
  },
  dropdownHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '15px',
  },
  dropdownAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  dropdownName: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
  },
  dropdownEmail: {
    margin: 0,
    fontSize: '12px',
    color: '#aaa',
  },
  dropdownDivider: {
    height: '1px',
    background: 'rgba(255, 255, 255, 0.1)',
    margin: '10px 0',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: '#ccc',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    width: '100%',
  },
  logoutDropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '8px',
    color: '#ef4444',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes sparkle {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1) rotate(0deg);
    }
    50% { 
      opacity: 0.7; 
      transform: scale(1.1) rotate(180deg);
    }
  }
  
  /* Hover effects */
  .new-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
  }
  
  .nav-link:hover,
  .dropdown-item:hover {
    background: rgba(102, 126, 234, 0.1) !important;
    border-color: rgba(102, 126, 234, 0.3) !important;
    transform: translateY(-2px);
  }
  
  .icon-button:hover,
  .user-button:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-2px);
  }
  
  .search-input:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2) !important;
  }
  
  .logout-dropdown-item:hover {
    background: rgba(239, 68, 68, 0.2) !important;
    transform: translateY(-2px);
  }
  
  /* Responsive */
  @media (max-width: 1024px) {
    .search-section {
      display: none !important;
    }
    
    .quick-actions {
      display: none !important;
    }
    
    .right-section {
      gap: 10px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default DesktopNavbar;