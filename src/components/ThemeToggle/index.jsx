import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 80 80">
    <path
      className={styles['moon-icon-path']} // Apply class for CSS styling
      d="M29.62,30.63c-.1,4.71.74,9.7,3.9,14.07s7.71,6.75,12.25,8.1A13.79,13.79,0,0,1,40.05,54a14.82,14.82,0,0,1-2.2-.17,14,14,0,0,1-8.23-23.23M39.75,18A22,22,0,0,0,36.6,61.76a22.47,22.47,0,0,0,3.45.27A22,22,0,0,0,60.87,47c-.87,0-2.15-.08-3.69-.26C51.39,46.08,43.75,45.17,40,40s-2.26-12.62-1.13-18.38c.3-1.52.63-2.76.88-3.59Z"
    />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 80 80">
    <path
      className={styles['sun-icon-path']} // Apply class for CSS styling
      d="M40,26A14,14,0,1,1,26,40,14,14,0,0,1,40,26m0-8A22,22,0,1,0,62,40,22,22,0,0,0,40,18Z"
    />
    <line className={styles['sun-icon-line']} x1="40" y1="3" x2="40" y2="16" strokeWidth="8" />
    <line className={styles['sun-icon-line']} x1="77" y1="40" x2="64" y2="40" strokeWidth="8" />
    <line className={styles['sun-icon-line']} x1="40" y1="77" x2="40" y2="64" strokeWidth="8" />
    <line className={styles['sun-icon-line']} x1="3" y1="40" x2="16" y2="40" strokeWidth="8" />
    <line className={styles['sun-icon-line']} x1="66.16" y1="13.84" x2="56.97" y2="23.03" strokeWidth="8" />
    <line className={styles['sun-icon-line']} x1="66.16" y1="66.16" x2="56.97" y2="56.97" strokeWidth="8" />
    <line className={styles['sun-icon-line']} x1="13.84" y1="66.16" x2="23.03" y2="56.97" strokeWidth="8" />
    <line className={styles['sun-icon-line']} x1="13.84" y1="13.84" x2="23.03" y2="23.03" strokeWidth="8" />
  </svg>
);

function ThemeToggle() {
  const [theme, setTheme] = useState('default'); // 'default' or 'dark'

  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme');
    // Check system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    } else {
      setTheme('default');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light'); // Explicitly set to light
      localStorage.setItem('theme', 'default'); // Or 'light'
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'default' ? 'dark' : 'default');
  };

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggleButton}
      aria-label={theme === 'default' ? 'Activate dark mode' : 'Activate light mode'}
      title={theme === 'default' ? 'Activate dark mode' : 'Activate light mode'}
    >
      {theme === 'default' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default ThemeToggle;
