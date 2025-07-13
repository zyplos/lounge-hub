/** biome-ignore-all lint/suspicious/noArrayIndexKey: array doesn't change */
import MinecraftContainer, { MinecraftHeading } from "../MinecraftContainer";
import MinecraftSlot from "../MinecraftSlot";
import MinecraftResultArrow from "../MinecraftResultArrow";
import type { CraftingRecipe } from "@/internals/recipeTypes";
import styles from "./styles.module.css";

interface CraftingTableProps {
  craftingRecipe: CraftingRecipe;
}

export default function CraftingTable({ craftingRecipe }: CraftingTableProps) {
  const { input, result } = craftingRecipe;

  return (
    <MinecraftContainer>
      <MinecraftHeading>Crafting</MinecraftHeading>
      <div className={styles.recipeLayout}>
        <div className={styles.inputGrid}>
          {input.map((item, index) => {
            if (item) {
              return (
                <MinecraftSlot key={index} image={item[1]} name={item[0]} />
              );
            }
            return <MinecraftSlot key={index} />;
          })}
        </div>

        <MinecraftResultArrow />

        <MinecraftSlot
          name={result[0]}
          image={result[1]}
          amount={result[2]}
          type="large"
        />
      </div>
    </MinecraftContainer>
  );
}
