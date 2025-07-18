import styles from "./styles.module.css";

interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  size?: string | number;
}

const Spinner: React.FC<SpinnerProps> = ({ title, className, ...props }) => {
  const combinedClassName = `${styles.spinner} ${className || ""}`.trim();
  return <div className={combinedClassName} title={title} {...props} />;
};

export default Spinner;
