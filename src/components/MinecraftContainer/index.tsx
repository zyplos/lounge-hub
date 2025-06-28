import React from 'react';
import styles from './styles.module.css';

interface MinecraftContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  // className is already part of HTMLAttributes but can be explicitly listed
  // if we want to emphasize it or add specific logic, though here it's just for combination.
}

const MinecraftContainer: React.FC<MinecraftContainerProps> = ({
  children,
  className = '', // Default to empty string
  ...props
}) => {
  // Combine the default component style with any passed-in className
  const combinedClassName = `${styles.minecraftContainer} ${className}`.trim();

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export default MinecraftContainer;
