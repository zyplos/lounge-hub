import styles from "./styles.module.scss";

interface MinecraftContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function MinecraftContainer({
  children,
  className = "",
  ...props
}: MinecraftContainerProps) {
  return (
    <div className={`${styles.minecraftContainer} ${className}`} {...props}>
      {children}
    </div>
  );
}

//

interface MinecraftHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function MinecraftHeading({
  children,
  className,
}: MinecraftHeadingProps) {
  return <p className={`${styles.heading} ${className}`}>{children}</p>;
}
