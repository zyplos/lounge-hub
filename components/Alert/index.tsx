import clsx from "clsx";
import styles from "./styles.module.css";

type AlertVariant = "neutral" | "info";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: AlertVariant;
}

export default function Alert({
  children,
  variant = "neutral",
  className = "",
  ...props
}: AlertProps) {
  return (
    <div
      className={clsx(styles.alert, styles[variant] || styles.info, className)}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
}
