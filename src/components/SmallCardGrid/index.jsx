import React from 'react';
import styles from './styles.module.css';

function SmallCardGrid({ width = '260px', className = '', ...props }) {
  return (
    <div
      className={styles.grid + ' ' + className}
      style={{
        '--card-min-width': width
      }}
      {...props}
    >
      {props.children}
    </div>
  );
}

export default SmallCardGrid; 