import React from "react";
import MinecraftContainer from "../MinecraftContainer/index";
import MinecraftSlot from "../MinecraftSlot/index";
import MinecraftResultArrow from "../MinecraftResultArrow/index";
import styles from "./styles.module.css";

// Represents a single item in the crafting grid or result
type CraftingItem = [name: string, imagePath: string] | null;

interface CraftingTableProps {
  input?: Array<CraftingItem>; // Array of 9 items, can be null for empty
  result?: CraftingItem;
  amount?: number | null;
}

const CraftingTable: React.FC<CraftingTableProps> = ({
  input = Array(9).fill(null), // Default directly in destructuring
  result = null,
  amount = null,
}) => {
  return (
    <MinecraftContainer>
      <p className={styles.craftingTitle}>Crafting</p>
      <div className={styles.recipeLayout}>
        <div className={styles.inputGrid}>
          {input.map((item, index) => {
            if (item) {
              // Item is a tuple [name, imagePath]
              return (
                <MinecraftSlot key={index} image={item[1]} name={item[0]} />
              );
            }
            // Item is null, render an empty slot
            return <MinecraftSlot key={index} />;
          })}
        </div>

        <MinecraftResultArrow />

        <MinecraftSlot
          name={result ? result[0] : undefined}
          image={result ? result[1] : undefined}
          amount={amount ?? undefined} // Pass undefined if amount is null
          type="large"
        />
      </div>
    </MinecraftContainer>
  );
};

// defaultProps can be removed if defaults are handled in destructuring or TS default params
// CraftingTable.defaultProps = {
//   input: Array(9).fill(null),
//   result: null,
//   amount: null,
// };

export default CraftingTable;
