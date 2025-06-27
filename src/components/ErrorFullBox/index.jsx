import React from 'react';
import FullBox from '../FullBox';
import MinecraftText from '../MinecraftText';
import styles from './styles.module.css';

function ErrorFullBox({ header, text, className = '', ...props }) {
  return (
    <FullBox useDims usePadding className={className}>
      <MinecraftText className={styles.header}>{header}</MinecraftText>
      <div className={styles.text}>{text}</div>
    </FullBox>
  );
}

export default ErrorFullBox; 