import clsx from "clsx";
import styles from "./styles.module.css";

export interface FullboxProps extends React.HTMLAttributes<HTMLDivElement> {
  useDims?: boolean;
  usePadding?: boolean;
  children: React.ReactNode;
}

export function Fullbox({
  useDims = false,
  usePadding = false,
  children,
  className,
  ...props
}: FullboxProps) {
  return (
    <div
      className={clsx(
        styles.fullbox,
        useDims && styles.useDims,
        usePadding && styles.usePadding,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function FullboxHeading({ children }) {
  return <h1 className={styles.heading}>{children}</h1>;
}
