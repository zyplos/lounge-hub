import React from 'react';
import styles from './styles.module.css';

function MinecraftText({ children, className = '', ...props }) {
  const combinedClassName = `${styles.minecraftText} ${className}`.trim();
  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
}

export default MinecraftText;
