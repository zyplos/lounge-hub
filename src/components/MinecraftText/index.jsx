import React from 'react';
import styles from './styles.module.css';

function MinecraftText(props) {
  return (
    <span className={styles.minecraftText}>
      {props.children}
    </span>
  );
}

export default MinecraftText; 