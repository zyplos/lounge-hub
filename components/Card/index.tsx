import styles from "./styles.module.scss";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return <div className={styles.card}>{children}</div>;
}

//

export interface CardHeadingProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function CardHeading({ children }: CardHeadingProps) {
  return <p className={styles.cardHeading}>{children}</p>;
}
