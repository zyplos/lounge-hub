import React from 'react';
import styles from './styles.module.css';

interface FullBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  useDims?: boolean;
  usePadding?: boolean;
  children: React.ReactNode;
  // className is part of HTMLAttributes but can be explicitly listed if needed for clarity or defaults
}

const FullBox: React.FC<FullBoxProps> = ({
  useDims = false, // Default to false if not provided
  usePadding = false, // Default to false if not provided
  children,
  className, // Explicitly destructure className to combine with internal styles
  ...props
}) => {
  const classNames = [
    styles.fullBox,
    useDims ? styles.useDims : '',
    usePadding ? styles.usePadding : '',
    className || '' // Include external className if provided
  ].join(' ').trim();

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

export default FullBox;
