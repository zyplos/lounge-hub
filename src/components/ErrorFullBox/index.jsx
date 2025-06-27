import React from 'react';
import FullBox from '../FullBox'; // Assuming FullBox is now at src/components/FullBox/index.jsx
import styles from './styles.module.css';

function ErrorFullBox({ header, text, ...props }) {
  return (
    <FullBox useDims usePadding {...props}>
      <p className={`text-fullbox ${styles.headerText}`}>{header}</p>
      <p className={styles.bodyText}>{text}</p>
    </FullBox>
  );
}

export default ErrorFullBox;
