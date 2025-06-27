import React from 'react';
import styles from './styles.module.css';

function SmallCardGrid({ width = "260px", children, className = '', ...props }) {
  const gridStyle = {
    gridTemplateColumns: `repeat(auto-fill, minmax(${width}, 1fr))`
  };

  const combinedClassName = `${styles.smallCardGrid} ${className}`.trim();

  return (
    <div className={combinedClassName} style={gridStyle} {...props}>
      {children}
    </div>
  );
}

export default SmallCardGrid;
