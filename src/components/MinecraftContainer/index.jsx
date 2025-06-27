import React from 'react';
import styles from './styles.module.css';

function MinecraftContainer({ children, className = '', ...props }) {
  const combinedClassName = `${styles.minecraftContainer} ${className}`.trim();
  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}

export default MinecraftContainer;
