import React from "react";
import styles from "./styles.module.css";

type AlertVariant = "info" | "success" | "warning" | "error" | "neutral"; // Added neutral as a common one

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: AlertVariant;
  // className is already part of HTMLAttributes<HTMLDivElement>
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = "info",
  className = "",
  ...props
}) => {
  const alertClasses = [
    styles.alert,
    styles[variant] || styles.info, // Default to info style if variant doesn't exist in CSS Modules
    className,
  ]
    .join(" ")
    .trim();

  return (
    <div className={alertClasses} role="alert" {...props}>
      {children}
    </div>
  );
};

export default Alert;
