import { Meals } from "../types/Recipe";

export const getRecipes = (): Promise<Meals> => {
  return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Failed to load the data');
    })
}