import React from 'react';
import styles from './styles.module.css';

function Alert({ children, variant = 'info', className = '', ...props }) {
  const alertClasses = [
    styles.alert,
    styles[variant] || styles.info, // Default to info style if variant doesn't exist
    className
  ].join(' ').trim();

  return (
    <div className={alertClasses} role="alert" {...props}>
      {children}
    </div>
  );
}

export default Alert;
