import { Recipe } from '../../types/Recipe';
import { RecipeCart } from '../../components/RecipeCart';
import { useAppSelector } from '../../app/hooks';

export const FavouritesPage = () => {
  const favourites = useAppSelector((state) => state.favourites.favourites);

  const isFavourite = (meal: Recipe) => {
    return favourites.some((fav: Recipe) => fav.idMeal === meal.idMeal);
  };

  return (
    <>
      <div className="recipes__meals">
        {favourites.map((recipe: Recipe) => {
          return (
            <RecipeCart
              key={recipe.idMeal}
              recipe={recipe}
              isFavourite={isFavourite(recipe)}
            />
          );
        })}
      </div>
    </>
  );
};
