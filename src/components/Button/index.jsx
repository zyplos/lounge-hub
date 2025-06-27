import React from 'react';
import styles from './styles.module.css';

function Button({ children, onClick, type = 'button', variant, className = '', as = 'button', href, ...props }) {
  const combinedClasses = [
    styles.button,
    variant === 'discord' ? styles.discord : '',
    className
  ].join(' ').trim();

  if (as === 'a') {
    return (
      <a href={href} className={combinedClasses} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
