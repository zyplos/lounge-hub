import React from 'react';
import Link from 'next/link';
import Button from '../Button'; // Use the new Button component
import styles from './styles.module.css';

// The theme-ui <Button as={ThemedLink}> means the Button's styles
// are applied to an anchor tag. Here, we pass Button specific props to our
// new Button component, and Link specific props to Next's Link.
function ThemedRouterButtonLink({ href, children, onClick, ...buttonProps }) {
  // Separate props intended for the Next.js Link from those for the Button styling
  // For example, 'variant' is for our Button, 'passHref' is for NextLink.
  // Any other props like 'id', 'aria-label' might be passed down to the button.

  // The original component spread {...props} onto the theme-ui Button.
  // We need to ensure these props are passed to our custom Button.

// Props for the Next.js Link component
const nextLinkProps = {};
if (buttonProps.passHref) nextLinkProps.passHref = buttonProps.passHref;
if (buttonProps.replace) nextLinkProps.replace = buttonProps.replace;
if (buttonProps.scroll) nextLinkProps.scroll = buttonProps.scroll;
if (buttonProps.shallow) nextLinkProps.shallow = buttonProps.shallow;
if (buttonProps.locale) nextLinkProps.locale = buttonProps.locale;

// onClick is handled by the Button component if it's not a link navigation
// or by the Link component if it's primarily navigation.
// The original component passes onClick to the theme-ui Button.
// If an onClick is present, it should be handled by the rendered element (our Button, now an <a>).

// If an onClick is provided and href is not, it's a regular button.
// However, this component's name `ThemedRouterButtonLink` implies it's always a link.
// The original use of `Link from "next/link"` and `Button as={ThemedLink}` confirms this.
// So, we always render a Next.js Link wrapping our Button component (which itself renders an `<a>`).

return (
  <Link href={href} {...nextLinkProps}>
    <Button as="a" onClick={onClick} {...buttonProps}>
        {children}
      </Button>
    </Link>
  );
}

export default ThemedRouterButtonLink;
