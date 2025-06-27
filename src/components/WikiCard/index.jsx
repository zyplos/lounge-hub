import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Assuming next/image is still desired
import styles from './styles.module.css';

function WikiCard({ link, image, gradient, heading, description }) {
  const flexStyle = {
    background: `linear-gradient( 135deg, ${gradient.left} 10%, ${gradient.right} 100%)`,
  };

  return (
    <Link href={link} passHref>
      <a className={styles.link}>
        <div className={styles.flexContainer} style={flexStyle}>
          <div className={styles.imageContainer}> {/* Optional: if image needs specific wrapper styles */}
            <Image src={image} alt={heading} height="128px" width="128px" />
          </div>
          <div className={styles.textContainer}>
            <h2 className={styles.heading}>
              {heading}
            </h2>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
export default WikiCard;
