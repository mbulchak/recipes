import { Recipe } from '../types/Recipe';
import { localStore } from './localStorage';

const key = 'favourites';

export const localFavourites = {
  getFavourites() {
    const storedFavourites = localStore.get(key);
    return storedFavourites === null ? undefined : storedFavourites;
  },
  toggleFavourites(value: Recipe) {
    const storedFavourites = localStore.get(key) || [];
    console.log(storedFavourites);
    const allFavouriteRecipes = [];

    const isRecipeExists = storedFavourites.find((fav: Recipe) => fav.idMeal === value.idMeal);

    if (!isRecipeExists) {
      allFavouriteRecipes.push(...storedFavourites);
      allFavouriteRecipes.push(value);

      localStore.set(key, allFavouriteRecipes);
    } else {
      const newValue = storedFavourites.filter((recipe: Recipe) => recipe.idMeal !== value.idMeal);

      localStore.set(key, newValue);
    }
  },
};
