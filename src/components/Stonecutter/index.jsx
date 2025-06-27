import React from 'react';
import MinecraftContainer from '../MinecraftContainer/index';
import MinecraftSlot from '../MinecraftSlot/index';
import MinecraftResultArrow from '../MinecraftResultArrow/index';
import styles from './styles.module.css';

function Stonecutter({ input, result, amount }) {
  // useColorMode is removed, CSS handles theme styles

  return (
    <MinecraftContainer>
      <p className={styles.stonecutterTitle}>Stonecutter</p>
      <div className={styles.recipeLayout}>
        {input && input[1] ? ( // Check if input and its image exist
          <MinecraftSlot image={input[1]} name={input[0]} />
        ) : (
          <MinecraftSlot /> // Render empty slot
        )}

        <MinecraftResultArrow />

        <span className={styles.resultSlotWrapper}>
          <MinecraftSlot
            name={result ? result[0] : undefined}
            image={result ? result[1] : undefined}
            amount={amount}
            type="stonecutter" // MinecraftSlot handles its stonecutter variant style including size
          />
        </span>
      </div>
    </MinecraftContainer>
  );
}

Stonecutter.defaultProps = {
  // recipe: [false], // Original prop, seems unused in favor of 'input'
  input: null, // Default to no input item
  result: null, // Default to no result
};

export default Stonecutter;
