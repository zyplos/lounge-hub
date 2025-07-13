import type { StaticImageData } from "next/image";

export interface CraftingRecipe {
  type: "crafting";
  input: [
    readonly [string, StaticImageData] | false,
    readonly [string, StaticImageData] | false,
    readonly [string, StaticImageData] | false,
    readonly [string, StaticImageData] | false,
    readonly [string, StaticImageData] | false,
    readonly [string, StaticImageData] | false,
    readonly [string, StaticImageData] | false,
    readonly [string, StaticImageData] | false,
    readonly [string, StaticImageData] | false,
  ];
  result: readonly [string, StaticImageData, number];
}

export interface FurnaceRecipe {
  type: "furnace" | "smoker" | "blasting";
  input: readonly [string, StaticImageData];
  result: readonly [string, StaticImageData];
}

export interface StonecutterRecipe {
  type: "stonecutter";
  input: readonly [string, StaticImageData];
  result: readonly [string, StaticImageData, number];
}

export type Recipe = CraftingRecipe | FurnaceRecipe | StonecutterRecipe;
