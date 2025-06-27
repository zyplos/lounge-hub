import React from 'react';
import styles from './styles.module.css';

function FullBox({ useDims, usePadding, className = '', ...props }) {
  const boxClass = [
    styles.fullBox,
    useDims ? styles.fullBoxDims : '',
    usePadding ? styles.fullBoxPadding : '',
    className
  ].join(' ');
  return (
    <div className={boxClass} {...props}>
      {props.children}
    </div>
  );
}

export default FullBox; 