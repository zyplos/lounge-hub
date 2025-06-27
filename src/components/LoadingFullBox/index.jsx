import React from 'react';
import FullBox from '../FullBox';
import Spinner from '../Spinner';
import styles from './styles.module.css';

function LoadingFullBox({ text, className = '', ...props }) {
  return (
    <FullBox useDims className={className}>
      <Spinner title={text} size={200} />
      <div className={styles.text}>{text}</div>
    </FullBox>
  );
}

export default LoadingFullBox; 