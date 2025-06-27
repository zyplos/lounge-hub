import React from 'react';
import styles from './styles.module.css';

function FullBox({ useDims, usePadding, children, ...props }) {
  const classNames = [
    styles.fullBox,
    useDims ? styles.useDims : '',
    usePadding ? styles.usePadding : ''
  ].join(' ').trim();

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export default FullBox;
