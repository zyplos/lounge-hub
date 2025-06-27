import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

function ThemeToggle() {
  const [colorMode, setColorMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default';
    }
    return 'default';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode);
  }, [colorMode]);

  return (
    <button
      className={styles.button}
      onClick={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
      aria-label="Toggle color mode"
    >
      {colorMode === 'default' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 80 80">
          <path fill="#fff" d="M29.62,30.63c-.1,4.71.74,9.7,3.9,14.07s7.71,6.75,12.25,8.1A13.79,13.79,0,0,1,40.05,54a14.82,14.82,0,0,1-2.2-.17,14,14,0,0,1-8.23-23.23M39.75,18A22,22,0,0,0,36.6,61.76a22.47,22.47,0,0,0,3.45.27A22,22,0,0,0,60.87,47c-.87,0-2.15-.08-3.69-.26C51.39,46.08,43.75,45.17,40,40s-2.26-12.62-1.13-18.38c.3-1.52.63-2.76.88-3.59Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 80 80">
          <path d="M40,26A14,14,0,1,1,26,40,14,14,0,0,1,40,26m0-8A22,22,0,1,0,62,40,22,22,0,0,0,40,18Z" fill="#000" />
          <line x1="40" y1="3" x2="40" y2="16" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="8" />
          <line x1="77" y1="40" x2="64" y2="40" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="8" />
          <line x1="40" y1="77" x2="40" y2="64" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="8" />
          <line x1="3" y1="40" x2="16" y2="40" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="8" />
          <line x1="66.16" y1="13.84" x2="56.97" y2="23.03" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="8" />
          <line x1="66.16" y1="66.16" x2="56.97" y2="56.97" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="8" />
          <line x1="13.84" y1="66.16" x2="23.03" y2="56.97" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="8" />
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle; 