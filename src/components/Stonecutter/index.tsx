import React from 'react';
import MinecraftContainer from '../MinecraftContainer/index';
import MinecraftSlot from '../MinecraftSlot/index';
import MinecraftResultArrow from '../MinecraftResultArrow/index';
import styles from './styles.module.css';
import type { StaticImageData } from 'next/image'; // For typing image paths

// Reusing or adapting a similar type from CraftingTable/Furnace
type StonecutterItem = [name: string, imagePath: string | StaticImageData] | null;

interface StonecutterProps {
  input?: StonecutterItem;
  result?: StonecutterItem;
  amount?: number | null;
}

const Stonecutter: React.FC<StonecutterProps> = ({
  input = null,
  result = null,
  amount = null, // Default amount to null explicitly
}) => {
  // useColorMode is removed, CSS handles theme styles

  return (
    <MinecraftContainer>
      <p className={styles.stonecutterTitle}>Stonecutter</p>
      <div className={styles.recipeLayout}>
        {input && input[1] ? ( // Check if input and its image exist
          (<MinecraftSlot image={input[1]} name={input[0]} />)
        ) : (
          (<MinecraftSlot />) // Render empty slot
        )}

        <MinecraftResultArrow />

        <span className={styles.resultSlotWrapper}>
          <MinecraftSlot
            name={result ? result[0] : undefined}
            image={result ? result[1] : undefined}
            amount={amount ?? undefined} // Pass undefined if amount is null
            type="stonecutter"
          />
        </span>
      </div>
    </MinecraftContainer>
  );
};

// defaultProps can be removed as defaults are handled in destructuring
// Stonecutter.defaultProps = {
//   input: null,
//   result: null,
//   amount: null, // Explicitly null if that's the desired default for 'no amount'
// };

export default Stonecutter;
