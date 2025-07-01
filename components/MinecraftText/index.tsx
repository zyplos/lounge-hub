import styles from "./styles.module.css";

interface MinecraftTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export default function MinecraftText({
  children,
  className,
  ...props
}: MinecraftTextProps) {
  return (
    <span className={`${styles.minecraftText} ${className}`} {...props}>
      {children}
    </span>
  );
}
