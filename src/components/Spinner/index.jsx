import React from 'react';
import styles from './styles.module.css';

function Spinner({ title, size }) { // size prop is not used by this basic spinner but kept for compatibility
  return (
    <div className={styles.spinner} title={title}></div>
  );
}

export default Spinner;
