import React from 'react';
import MinecraftContainer from '../MinecraftContainer/index';
import MinecraftSlot from '../MinecraftSlot/index';
import MinecraftResultArrow from '../MinecraftResultArrow/index';
import styles from './styles.module.css';

function CraftingTable({ input, result, amount }) {
  return (
    <MinecraftContainer>
      <p className={styles.craftingTitle}>Crafting</p>
      <div className={styles.recipeLayout}>
        <div className={styles.inputGrid}>
          {input.map((item, index) => {
            // Ensure item is not false before trying to access properties
            if (!item || !item[1]) { // If item is falsy or image path is missing
              return <MinecraftSlot key={index} />; // Render an empty slot
            }
            return <MinecraftSlot key={index} image={item[1]} name={item[0]} />;
          })}
        </div>

        <MinecraftResultArrow />

        <MinecraftSlot
          name={result ? result[0] : undefined} // Check if result exists
          image={result ? result[1] : undefined} // Check if result exists
          amount={amount}
          type="large"
        />
      </div>
    </MinecraftContainer>
  );
}

CraftingTable.defaultProps = {
  input: Array(9).fill(null), // Default to 9 empty slots for a 3x3 grid
  result: null, // Default to no result
  amount: null,
};

export default CraftingTable;
