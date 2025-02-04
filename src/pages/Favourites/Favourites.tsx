import { Recipe } from '../../types/Recipe';
import { RecipeCart } from '../../components/RecipeCart';
import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { FavouritesIngredientsModal } from '../../components/FavouritesIngredientsModal';
import './Favourites.scss';
import { Pagination } from '../../components/Pagination';

export const FavouritesPage = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const [isButtonSelected, setIsButtonSelected] = useState<boolean>(false);

  const favourites = useAppSelector((state) => state.favourites.favourites);

  const isFavourite = (meal: Recipe) => {
    return favourites.some((fav: Recipe) => fav.idMeal === meal.idMeal);
  };

  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = favourites.slice(itemOffset, endOffset);

  // for changing pagination while doing dunamic changes with favourites

  useEffect(() => {
    if (currentItems.length === 0 && activePage > 0) {
      setActivePage(activePage - 1);
      setItemOffset((activePage - 1) * itemsPerPage);
    }
  }, [currentItems.length]);

  return (
    <>
      <div>
        <div className="favourites__list">
          <div className="favourites__meals">
            {currentItems.map((recipe: Recipe) => {
              return (
                <RecipeCart key={recipe.idMeal} recipe={recipe} isFavourite={isFavourite(recipe)} />
              );
            })}

            <Pagination
              filteredRecipes={favourites}
              itemsPerPage={itemsPerPage}
              activePage={activePage}
              setItemOffset={setItemOffset}
              setActivePage={setActivePage}
            />
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
            }
          </div>
        </div>
      </div>
    </>
  );
};
