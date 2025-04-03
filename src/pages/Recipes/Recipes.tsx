import { useEffect, useState } from 'react';
import { getRecipes } from '../../services/getRecipes';
import { Recipe } from '../../types/Recipe';

import './Recipes.scss';
import { getFilteredRecipesByCategory } from '../../utils/getFilteredRecipesByCategory';
import { CategoryFiltered } from '../../types/CategoryFiltered';
import { getRecipeFromInput } from '../../services/getIntutRecipe';

import { RecipeCart } from '../../components/RecipeCart';
import { useAppSelector } from '../../app/hooks';
import { Pagination } from '../../components/Pagination';

export const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [category, setCategory] = useState<CategoryFiltered>(CategoryFiltered.ALL);
  const [query, setQuery] = useState<string>('');

  // for pagination
  const [itemOffset, setItemOffset] = useState(0);
  const [activePage, setActivePage] = useState(0);

  // set Recipes
  useEffect(() => {
    getRecipes()
      .then((res) => {
        const result = res.meals;
        setRecipes(result);
      })
      .catch((error) => console.error(error));
  }, []);

  // redux
  const favourites = useAppSelector((state) => state.favourites.favourites);

  const isRecipeInFavourites = (meal: Recipe): boolean => {
    return favourites.some((fav: Recipe) => fav.idMeal === meal.idMeal);
  };

  // for back-end input
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    // to reset pagination while filtering
    setItemOffset(0);
    setActivePage(0);

    getRecipeFromInput(value)
      .then((res) => {
        const result = res.meals;

        setRecipes(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    setItemOffset(0);
    setActivePage(0);
  }, [category]);

  const filteredRecipes = getFilteredRecipesByCategory(recipes, category);

  // pagination
  const itemsPerPage = 8;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredRecipes.slice(itemOffset, endOffset);

  return (
    <div className="recipes section-padding">
      <h2 className="recipes__title">All Recipes</h2>

      <div className="actions">
        <div className="categories">
          <label className="category--title" htmlFor="selectCategory">
            Categories
          </label>

          <p className="control">
            <span className="select">
              <select
                id="selectCategory"
                aria-label="selectCategory"
                value={category}
                onChange={(event) => setCategory(event.target.value as CategoryFiltered)}
              >
                <option value="All">All</option>
                <option value="Side">Side</option>
                <option value="Meat">Meat</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Dessert">Dessert</option>
                <option value="Seafood">Seafood</option>
                <option value="Pasta">Pasta</option>

              </select>
            </span>
          </p>
        </div>

        <div className="search--input">
          <input
            className="input"
            placeholder="Search..."
            type="text"
            value={query}
            // onChange={(event) => setQuery(event.target.value)}
            onChange={handleInput}
          />
        </div>
      </div>

      {filteredRecipes.length > 0 ? (
        <>
          <div>
            <div className="recipes__meals">
              {currentItems.map((recipe: Recipe) => {
                return (
                  <RecipeCart
                    key={recipe.idMeal}
                    recipe={recipe}
                    isRecipes={isRecipeInFavourites(recipe)}
                  />
                );
              })}
            </div>

            <Pagination
              filteredRecipes={filteredRecipes}
              itemsPerPage={itemsPerPage}
              setItemOffset={setItemOffset}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </div>
        </>
      ) : (
        <div>There are no recipes of this criteria</div>
      )}
    </div>
  );
};
