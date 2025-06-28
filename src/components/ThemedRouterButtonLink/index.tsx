import React from 'react';
import Link, { LinkProps } from 'next/link';
import Button, { ButtonProps as CustomButtonProps } from '../Button'; // Use the new Button component
// styles import seems unused directly here, but Button component uses its own styles.
// import styles from './styles.module.css';

// Define props for ThemedRouterButtonLink
// It combines Next.js LinkProps with styling props from our Button (when 'as="a"')
// We omit 'href' from ButtonProps as it's taken from LinkProps.
// We also omit 'as' from ButtonProps because it's fixed to 'a'.

interface ThemedRouterButtonLinkProps extends LinkProps {
  children: React.ReactNode;
  // onClick is part of ButtonAnchorStylingProps (from React.AnchorHTMLAttributes)
  // passHref is implicitly true for custom components inside Link in newer Next.js versions,
  // but can be explicitly controlled if needed. Here, we let Button handle being an anchor.
  className: string;
}

const ThemedRouterButtonLink: React.FC<ThemedRouterButtonLinkProps> = ({
  // LinkProps
  href,
  replace,
  scroll,
  shallow,
  locale,
  prefetch, // Added prefetch as it's a common LinkProp
  // Button styling props (ButtonAnchorStylingProps)
  className,
  onClick,
  // Children
  children,
  // Rest of the props (e.g., id, aria-label, etc. for the anchor)
  ...anchorSpecificProps
}) => {

  // Construct LinkProps object
  const nextLinkProps: Omit<LinkProps, 'children' | 'href'> = {
    replace,
    scroll,
    shallow,
    locale,
    prefetch,
    passHref: true, // Important for custom components like our Button rendering an <a>
  };

  // Props for the inner Button component (which will render an <a>)
  // href is not needed here as Link handles navigation.
  // The Button's 'as' prop is fixed to 'a'.
  const buttonAsAnchorProps = {
    href: typeof href === 'string' ? href : href.pathname || '', // Button's href for styling/accessibility, Link handles actual nav
    className,
    onClick,
    children,
    ...anchorSpecificProps, // Spread remaining props like id, aria-label, etc.
  };

  return (
    <Link href={href} {...nextLinkProps}>
      {children}
    </Link>
  );
};

export default ThemedRouterButtonLink;
