import { Recipe } from '../../types/Recipe';
import { RecipeCart } from '../../components/RecipeCart';
import { useAppSelector } from '../../app/hooks';
import { useState } from 'react';
import { FavouritesIngredientsModal } from '../../components/FavouritesIngredientsModal';
import './Favourites.scss';

export const FavouritesPage = () => {
  // const [favIngredients, setFavIngredients] = useState<any []>([]);

  const [isButtonSelected, setIsButtonSelected] = useState<boolean>(false);

  const favourites = useAppSelector((state) => state.favourites.favourites);

  const isFavourite = (meal: Recipe) => {
    return favourites.some((fav: Recipe) => fav.idMeal === meal.idMeal);
  };

  return (
    <>
      <div className="favourites__list">
        <div className="recipes__meals">
          {favourites.map((recipe: Recipe) => {
            return (
              <RecipeCart key={recipe.idMeal} recipe={recipe} isFavourite={isFavourite(recipe)} />
            );
          })}
        </div>

        <div className="button button-ingredient" onClick={() => setIsButtonSelected(true)}>
          All ingredients
        </div>

        <div className="modal__favourites">
          {
            isButtonSelected && (
              <FavouritesIngredientsModal
                favourites={favourites}
                onIsButtonSelected={setIsButtonSelected}
              />
            )
            // <div>There are no selected favourites</div>
          }
        </div>
      </div>
    </>
  );
};
