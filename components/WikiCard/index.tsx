import Link, { type LinkProps } from "next/link";
import Image, { type StaticImageData } from "next/image";
import styles from "./styles.module.css";

interface GradientColors {
  // CSS color values
  left: string;
  right: string;
}

interface WikiCardProps {
  link: LinkProps["href"];
  image: string | StaticImageData;
  gradient: GradientColors;
  heading: string;
  description: React.ReactNode;
}

export default function WikiCard({
  link,
  image,
  gradient,
  heading,
  description,
}: WikiCardProps) {
  const flexStyle: React.CSSProperties = {
    background: `linear-gradient( 135deg, ${gradient.left} 10%, ${gradient.right} 100%)`,
  };

  return (
    <Link href={link} className={styles.link}>
      <div className={styles.flexContainer} style={flexStyle}>
        <div className={styles.imageContainer}>
          <Image src={image} alt={heading} height={128} width={128} />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Link>
  );
}
