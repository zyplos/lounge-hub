import React from 'react';
import styles from './styles.module.css';

function Spinner({ size = 40, title = 'Loading...' }) {
  return (
    <div
      className={styles.spinner}
      style={{ width: size, height: size }}
      role="status"
      aria-label={title}
      title={title}
    >
      <span className={styles.visuallyHidden}>{title}</span>
    </div>
  );
}

export default Spinner; 