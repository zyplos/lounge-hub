import React from 'react';
import styles from './styles.module.css';

type ButtonVariant = 'discord' | 'default'; // Example variants

// Base props common to both button and anchor
interface BaseButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

// Props specific to when the component is a button
interface AsButtonProps extends BaseButtonProps {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  href?: undefined; // Ensure href is not passed when it's a button
}

// Props specific to when the component is an anchor
interface AsAnchorProps extends BaseButtonProps {
  as: 'a';
  href: string; // href is required for an anchor
  type?: undefined; // Ensure type is not passed when it's an anchor
}

// Union type for all possible props
export type ButtonProps = AsButtonProps | AsAnchorProps;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button', // Default for button type
  variant = 'default',
  className = '',
  as = 'button', // Default to 'button'
  href, // Will be undefined if 'as' is 'button' due to discriminated union
  ...props
}) => {
  const combinedClasses = [
    styles.button,
    variant === 'discord' ? styles.discord : '', // Add more variant styles if needed
    className,
  ].join(' ').trim();

  if (as === 'a') {
    // props are cast because TypeScript can't perfectly infer the discriminated union's props after spreading
    // However, the ButtonProps definition ensures that `href` is string and other anchor props are valid.
    return (
      <a
        href={href} // href is guaranteed to be a string here by ButtonProps if as === 'a'
        className={combinedClasses}
        onClick={onClick}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  // `type` is valid here because `as` is 'button'
  // `href` is not passed to button element due to props destructuring and ButtonProps definition
  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default Button;
