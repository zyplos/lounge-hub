/** biome-ignore-all lint/suspicious/noArrayIndexKey: this array will never change */
import Head from "next/head";
import MainLayout from "@/internals/MainLayout";
import CraftingTable from "@/components/CraftingTable";
import Stonecutter from "@/components/Stonecutter";
import Furnace from "@/components/Furnace";
import recipes from "@/internals/recipes";
import styles from "@/styles/CraftingRecipesPage.module.scss";

export default function CraftingRecipesPage() {
  return (
    <MainLayout>
      <Head>
        <title>Crafting Recipes • wiki • the lounge hub</title>
      </Head>

      <div className="textContent bottomSpaceMargin">
        <h1>Crafting Recipes</h1>

        <p>
          The server has a few quality of life crafting recipes that should make
          obtaining stuff a bit easier.
        </p>
      </div>

      <div className={styles.recipesGrid}>
        {recipes.map((recipe, index) => {
          const { type } = recipe;

          if (type === "crafting") {
            return <CraftingTable key={index} craftingRecipe={recipe} />;
          }

          if (type === "furnace") {
            return <Furnace key={index} craftingRecipe={recipe} />;
          }

          if (type === "smoker") {
            return <Furnace key={index} craftingRecipe={recipe} />;
          }

          if (type === "blasting") {
            return <Furnace key={index} craftingRecipe={recipe} />;
          }

          if (type === "stonecutter") {
            return <Stonecutter key={index} craftingRecipe={recipe} />;
          }

          return (
            <p key={index} className={styles.brokenRecipeText}>
              oops: broken recipe???
            </p>
          );
        })}
      </div>
    </MainLayout>
  );
}
