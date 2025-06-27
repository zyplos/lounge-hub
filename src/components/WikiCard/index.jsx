import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';

function WikiCard({ link, image, gradient, heading, description }) {
  return (
    <Link href={link} passHref legacyBehavior>
      <a className={styles.card} style={{ background: `linear-gradient(135deg, ${gradient.left} 10%, ${gradient.right} 100%)` }}>
        <div className={styles.flexRow}>
          <Image src={image} alt={heading} height={128} width={128} />
          <div className={styles.textCol}>
            <h2 className={styles.heading}>{heading}</h2>
            <span className={styles.description}>{description}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
export default WikiCard; 