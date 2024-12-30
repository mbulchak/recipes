import { CategoryFiltered } from '../types/CategoryFiltered';
import { Recipe } from '../types/Recipe';

export const getFilteredRecipesByCategory = (
  recipes: Recipe[],
  category: CategoryFiltered,
  // query: string,
) => {
  let filteredRecipes = [...recipes]

  if (category) {
    switch (category) {
      case CategoryFiltered.DESSERT:
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.strCategory === CategoryFiltered.DESSERT);
        break;
      case CategoryFiltered.MEAT:
        filteredRecipes = filteredRecipes.filter(
          (recipe) =>
            recipe.strCategory === 'Beef' ||
            recipe.strCategory === 'Pork' ||
            recipe.strCategory === 'Lamb' ||
            recipe.strCategory === 'Chicken',
        );
        break;

      case CategoryFiltered.SIDE:
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.strCategory === CategoryFiltered.SIDE);
        break;

      case CategoryFiltered.VEGETARIAN:
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.strCategory === CategoryFiltered.VEGETARIAN);
        break;

      case CategoryFiltered.PASTA:
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.strCategory === CategoryFiltered.PASTA);
        break;

      case CategoryFiltered.SEAFOOD:
        filteredRecipes = filteredRecipes.filter((recipe) => recipe.strCategory === CategoryFiltered.SEAFOOD);
        break;

      default:
        break;
    }
  }

  // if (query) {
  //   const normalizedQuery = query.toLowerCase().trim();

  //   filteredRecipes = filteredRecipes.filter((recipe) => (
  //     recipe.strMeal.toLowerCase().includes(normalizedQuery)
  //     // || recipe.strArea.toLowerCase().includes(normalizedQuery)
  //     // || recipe.strCategory.toLowerCase().includes(normalizedQuery)
  //   ));
  // }

  return filteredRecipes;
};
