import React from 'react';
import styles from './styles.module.css';

interface MinecraftTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  // className is part of HTMLAttributes
}

const MinecraftText: React.FC<MinecraftTextProps> = ({
  children,
  className = '', // Default to empty string
  ...props
}) => {
  // Combine the default component style with any passed-in className
  const combinedClassName = `${styles.minecraftText} ${className}`.trim();

  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
};

export default MinecraftText;
