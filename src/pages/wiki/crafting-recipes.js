import React from "react";
import CraftingTable from "../../components/CraftingTable";
import Stonecutter from "../../components/Stonecutter";
import Furnace from "../../components/Furnace";
import recipes from "../../internals/recipes";
import MainLayout from "../../internals/MainLayout";
import styles from "./styles.module.css";

function CraftingRecipes() {
  return (
    <MainLayout>
      <div className={styles.content}>
        <h1 className={styles.heading}>Crafting Recipes</h1>
        <p className={styles.text}>The server has a few quality of life crafting recipes that should make obtaining stuff a bit easier.</p>
        <div className={styles.grid}>
          {recipes.map((recipe, index) => {
            const { type, input, result } = recipe;
            const amount = result[2];
            if (type === "crafting") {
              return <CraftingTable key={index} input={input} result={result} amount={amount} />;
            } else if (type === "furnace") {
              return <Furnace key={index} input={input} result={result} amount={amount} />;
            } else if (type === "smoker") {
              return <Furnace key={index} input={input} result={result} amount={amount} type="Smoker" />;
            } else if (type === "blasting") {
              return <Furnace key={index} input={input} result={result} amount={amount} type="Blast Furnace" />;
            } else if (type === "stonecutter") {
              return <Stonecutter key={index} input={input} result={result} amount={amount} />;
            } else {
              return <p key={index}>broken recipe</p>;
            }
          })}
        </div>
      </div>
    </MainLayout>
  );
}

export default CraftingRecipes;
