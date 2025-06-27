import React from 'react';
import Link, { LinkProps } from 'next/link';
import Image, { StaticImageData } from 'next/image';
import styles from './styles.module.css';

interface GradientColors {
  left: string;  // CSS color value
  right: string; // CSS color value
}

interface WikiCardProps {
  link: LinkProps['href']; // Use Href from LinkProps for flexibility (string or UrlObject)
  image: string | StaticImageData; // Path string or StaticImageData object
  gradient: GradientColors;
  heading: string;
  description: React.ReactNode; // Allow more than just string for description
}

const WikiCard: React.FC<WikiCardProps> = ({ link, image, gradient, heading, description }) => {
  const flexStyle: React.CSSProperties = { // Type the style object
    background: `linear-gradient( 135deg, ${gradient.left} 10%, ${gradient.right} 100%)`,
  };

  return (
    <Link href={link} passHref className={styles.link} legacyBehavior>
      <div className={styles.flexContainer} style={flexStyle}>
        <div className={styles.imageContainer}>
          <Image src={image} alt={heading} height={128} width={128} /> {/* Use numbers */}
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.heading}>
            {heading}
          </h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default WikiCard;
