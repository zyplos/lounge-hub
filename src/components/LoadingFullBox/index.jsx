import React from 'react';
import FullBox from '../FullBox'; // Uses the migrated FullBox
import Spinner from '../Spinner'; // Uses the new Spinner
import styles from './styles.module.css';

function LoadingFullBox({ text, ...props }) {
  return (
    <FullBox useDims {...props}>
      <Spinner title={text} />
      {text && <p className={styles.loadingText}>{text}</p>}
    </FullBox>
  );
}

export default LoadingFullBox;
