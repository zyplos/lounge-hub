import type { StonecutterRecipe } from "@/internals/recipeTypes";
import MinecraftContainer, { MinecraftHeading } from "../MinecraftContainer";
import MinecraftSlot from "../MinecraftSlot";
import MinecraftResultArrow from "../MinecraftResultArrow";
import styles from "./styles.module.css";

interface StonecutterProps {
  craftingRecipe: StonecutterRecipe;
}

export default function Stonecutter({ craftingRecipe }: StonecutterProps) {
  const { input, result } = craftingRecipe;

  return (
    <MinecraftContainer>
      <MinecraftHeading>Stonecutter</MinecraftHeading>
      <div className={styles.recipeLayout}>
        <MinecraftSlot image={input[1]} name={input[0]} />

        <MinecraftResultArrow />

        <span className={styles.resultSlotWrapper}>
          <MinecraftSlot
            name={result[0]}
            image={result[1]}
            amount={result[2]}
            type="stonecutter"
          />
        </span>
      </div>
    </MinecraftContainer>
  );
}
