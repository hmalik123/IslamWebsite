import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import MoonIcon from '../../assets/Moonicon.png';
import SunIcon from '../../assets/Sunicon.png';
import SearchIcon from '../../assets/Searchicon.png';
import IslamicLogo from '../../assets/IslamicLogo.png';

const Navbar = () => {
  // Initialize dark mode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    // Check if a preference exists in localStorage
    const savedPreference = localStorage.getItem('darkMode');
    // Return the saved preference (converting string to boolean) or default to false
    return savedPreference === 'true';
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Effect to apply dark mode to body when component mounts or darkMode changes
  useEffect(() => {
    // Update body class based on darkMode state
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Save preference to localStorage whenever it changes
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`${styles.navbarContainer} ${darkMode ? styles.darkMode : ''}`}>
      {/* Top Navbar */}
      <div className={styles.topNavbar}>
        <div className={styles.topNavbarLeft}>
          <div className={styles.logo}>
            <img src={IslamicLogo} alt="Logo" />
            <span>Islam docs</span>
          </div>
          <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
            <span>☰</span>
          </button>
        </div>
        <div className={styles.topNavbarRight}>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search docs..." />
            <button className={styles.searchButton}>
              <img 
                src={SearchIcon} 
                alt="Search" 
                className={styles.searchIcon} 
              />
            </button>
          </div>
          <div className={styles.navActions}>
            <button onClick={toggleDarkMode} className={styles.darkModeToggle}>
              <img 
                src={darkMode ? SunIcon : MoonIcon} 
                alt={darkMode ? "Light mode" : "Dark mode"} 
                className={`${styles.modeIcon} ${darkMode ? styles.sunIcon : ''}`}
              />
            </button>
            <a href="https://github.com/yourusername/yourproject" className={styles.githubLink}>
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Side Navbar - desktop always visible, mobile conditionally visible */}
      <div className={`${styles.sideNavbar} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
        <nav>
          <div className={styles.navSection}>
            <h3>Getting Started</h3>
            <ul>
              <li className={styles.active}><a href="/introduction">Introduction</a></li>
              <li><a href="/installation">Installation</a></li>
              <li><a href="/quick-start">Quick Start</a></li>
            </ul>
          </div>

          <div className={styles.navSection}>
            <h3>Core Concepts</h3>
            <ul>
              <li><a href="/concepts/architecture">Architecture</a></li>
              <li><a href="/concepts/components">Components</a></li>
              <li><a href="/concepts/state-management">State Management</a></li>
            </ul>
          </div>

          <div className={styles.navSection}>
            <h3>API Reference</h3>
            <ul>
              <li><a href="/api/functions">Functions</a></li>
              <li><a href="/api/hooks">Hooks</a></li>
              <li><a href="/api/components">Components</a></li>
            </ul>
          </div>

          <div className={styles.navSection}>
            <h3>Advanced</h3>
            <ul>
              <li><a href="/advanced/performance">Performance</a></li>
              <li><a href="/advanced/security">Security</a></li>
              <li><a href="/advanced/deployment">Deployment</a></li>
            </ul>
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <p>Version 1.0.0</p>
          <p><a href="/changelog">Changelog</a></p>
        </div>
      </div>

      {/* Main content area - in a real app, this would be where your page content goes */}
      <div className={styles.mainContent}>
        {/* This is where your page content would be rendered */}
      </div>
    </div>
  );
};

export default Navbar;