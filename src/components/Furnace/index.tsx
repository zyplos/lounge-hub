import React from 'react';
import MinecraftContainer from '../MinecraftContainer/index';
import MinecraftSlot from '../MinecraftSlot/index';
import MinecraftResultArrow from '../MinecraftResultArrow/index';
import coalImage from '../../assets/items/coal.png'; // StaticImageData by default with Next.js
import styles from './styles.module.css';
import type { StaticImageData } from 'next/image'; // For typing imported images

// Represents a single item for input or result
type SmeltingItem = [name: string, imagePath: string | StaticImageData] | null;

interface FurnaceProps {
  input?: SmeltingItem;
  result?: SmeltingItem;
  type?: string; // e.g., "Furnace", "Smoker"
}

// Local FlameIcon component
const FlameIcon: React.FC = () => ( // Typed as React.FC
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 90 90"
    className={styles.flameIcon}
  >
    <rect x="6.92" width="6.92" height="13.85" />
    <polygon points="20.77 48.46 20.77 13.85 13.85 13.85 13.85 27.69 6.92 27.69 6.92 41.54 0 41.54 0 69.23 6.92 69.23 6.92 83.08 0 83.08 0 90 6.92 90 13.85 90 20.77 90 20.77 62.31 13.85 62.31 13.85 48.46 20.77 48.46" />
    <rect x="41.54" y="13.85" width="6.92" height="13.85" />
    <polygon points="55.38 62.31 55.38 27.69 48.46 27.69 48.46 41.54 41.54 41.54 41.54 55.38 34.62 55.38 34.62 90 41.54 90 48.46 90 55.38 90 55.38 76.15 48.46 76.15 48.46 62.31 55.38 62.31" />
    <rect x="76.15" width="6.92" height="13.85" />
    <polygon points="90 69.23 90 41.54 83.08 41.54 83.08 27.69 76.15 27.69 76.15 13.85 69.23 13.85 69.23 48.46 76.15 48.46 76.15 62.31 69.23 62.31 69.23 90 76.15 90 83.08 90 90 90 90 83.08 83.08 83.08 83.08 69.23 90 69.23" />
  </svg>
);

const Furnace: React.FC<FurnaceProps> = ({
  input = null,
  result = null,
  type = "Furnace",
}) => {
  // Removed useColorMode, styles are handled by CSS

  return (
    <MinecraftContainer>
      <p className={styles.furnaceTitle}>{type}</p>
      <div className={styles.recipeLayout}>
        <div className={styles.inputSection}>
          {input && input[1] ? (
            <MinecraftSlot image={input[1]} name={input[0]} />
          ) : (
            <MinecraftSlot /> // Render empty slot
          )}
          <FlameIcon />
          {/* Assuming MinecraftSlot can handle StaticImageData for its image prop */}
          <MinecraftSlot image={coalImage} name="Any Fuel" />
        </div>

        <MinecraftResultArrow />

        <MinecraftSlot
          name={result ? result[0] : undefined}
          image={result ? result[1] : undefined}
          type="large"
        />
      </div>
    </MinecraftContainer>
  );
};

// defaultProps can be removed if defaults are handled in destructuring
// Furnace.defaultProps = {
//   type: "Furnace",
//   input: null,
//   result: null,
// };

export default Furnace;
