// import { Meals } from "../types/Recipe";

import { Meals } from "../types/Recipe";

export function getRecipe (recipeId: string): Promise<Meals> {
  return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then(response => {
      if(response.ok) {
        return response.json();
      }

      throw new Error('Failed to gat the data')
    })
}