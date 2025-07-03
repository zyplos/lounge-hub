import styles from "./styles.module.scss";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={`${styles.card} ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

//

export interface CardHeadingProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function CardHeading({
  children,
  className,
  ...props
}: CardHeadingProps) {
  return (
    <p className={`${styles.cardHeading} ${className || ""}`} {...props}>
      {children}
    </p>
  );
}
