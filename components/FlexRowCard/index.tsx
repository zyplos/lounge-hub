import { Card, type CardProps } from "../Card";
import styles from "./styles.module.scss";

export interface FlexRowCardProps extends CardProps {
  leftContent?: React.ReactNode;
}

export default function FlexRowCard({
  leftContent,
  children,
  className,
}: FlexRowCardProps) {
  return (
    <Card className={`${styles.flexRowCardWrapper} ${className || ""}`}>
      {leftContent}

      <div>{children}</div>
    </Card>
  );
}
