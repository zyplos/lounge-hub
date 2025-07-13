import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link, { type LinkProps } from "next/link";
import clsx from "clsx";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <>
      <button
        type="button"
        className={clsx(styles.button, className)}
        {...props}
      >
        {children}
      </button>
    </>
  );
}

//

interface PageButtonProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export function PageButton({
  href,
  className,
  children,
  ...props
}: PageButtonProps) {
  return (
    <>
      <Link href={href} className={clsx(styles.button, className)} {...props}>
        {children}
      </Link>
    </>
  );
}

//

interface NewTabButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export function NewTabButton({
  href,
  className,
  children,
  ...props
}: NewTabButtonProps) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={clsx(className, styles.button)}
        {...props}
      >
        {children}
      </a>
    </>
  );
}
