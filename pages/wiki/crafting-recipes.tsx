/** biome-ignore-all lint/suspicious/noArrayIndexKey: this array will never change */
import MainLayout from "@/internals/MainLayout";
import CraftingTable from "@/components/CraftingTable";
// import Stonecutter from "@/components/Stonecutter";
// import Furnace from "@/components/Furnace";
import recipes from "@/internals/recipes";
import styles from "@/styles/CraftingRecipesPage.module.scss";

export default function CraftingRecipesPage() {
  return (
    <MainLayout>
      <div className="textContent paragraphMargin">
        <h1>Crafting Recipes</h1>

        <p>
          The server has a few quality of life crafting recipes that should make
          obtaining stuff a bit easier.
        </p>
      </div>

      <div className={styles.recipesGrid}>
        {recipes.map((recipe, index) => {
          // Ensure result exists and has a 3rd element (amount) before accessing

          if (recipe.type === "crafting") {
            return <CraftingTable key={index} craftingRecipe={recipe} />;
          }

          // if (type === "furnace") {
          //   return (
          //     <Furnace
          //       key={index}
          //       input={input}
          //       result={result}
          //       amount={amount}
          //     />
          //   );
          // }

          // if (type === "smoker") {
          //   return (
          //     <Furnace
          //       key={index}
          //       input={input}
          //       result={result}
          //       amount={amount}
          //       type="Smoker"
          //     />
          //   );
          // }

          // if (type === "blasting") {
          //   return (
          //     <Furnace
          //       key={index}
          //       input={input}
          //       result={result}
          //       amount={amount}
          //       type="Blast Furnace"
          //     />
          //   );
          // }

          // if (type === "stonecutter") {
          //   return (
          //     <Stonecutter
          //       key={index}
          //       input={input}
          //       result={result}
          //       amount={amount}
          //     />
          //   );
          // }

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
