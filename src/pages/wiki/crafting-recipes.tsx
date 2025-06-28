import React from 'react';
import CraftingTable from "../../components/CraftingTable/index";
import Stonecutter from "../../components/Stonecutter/index";
import Furnace from "../../components/Furnace/index";
import recipes from "../../internals/recipes";
import MainLayout from "../../internals/MainLayout";
import styles from "../../styles/CraftingRecipesPage.module.css"; // Adjusted path

function CraftingRecipesPage() { // Renamed component
  return (
    <MainLayout>
      <div className={styles.pageGrid}>
        <h1 className={styles.pageHeading}>Crafting Recipes</h1>
        <p className={styles.pageDescription}>
          The server has a few quality of life crafting recipes that should make obtaining stuff a bit easier.
        </p>

        {/* TODO */}
        {/* <div className={styles.recipesGrid}>
          {recipes.map((recipe, index) => {
            const { type, input, result } = recipe;
            // Ensure result exists and has a 3rd element (amount) before accessing
            const amount = result && result.length > 2 ? result[2] : undefined;

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
              return <p key={index} className={styles.brokenRecipeText}>broken recipe</p>;
            }
          })}
        </div> */}
      </div>
    </MainLayout>
  );
}

export default CraftingRecipesPage;
