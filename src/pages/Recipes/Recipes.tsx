import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { getRecipes } from '../../services/getRecipes';
import { Recipe } from '../../types/Recipe';

import './Recipes.scss';
import { getFilteredRecipesByCategory } from '../../utils/getFilteredRecipesByCategory';
import { CategoryFiltered } from '../../types/CategoryFiltered';
import { getRecipeFromInput } from '../../services/getIntutRecipe';

import ReactPaginate from 'react-paginate';
import { RecipeCart } from '../../components/RecipeCart';
import { useAppSelector } from '../../app/hooks';

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

    // to reset while filtering
    setItemOffset(0);
    setActivePage(0);

    getRecipeFromInput(value)
      .then((res) => {
        const result = res.meals;

        console.log(res);
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
  const pageCount = Math.ceil(filteredRecipes.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredRecipes.length;

    setItemOffset(newOffset);
    setActivePage(event.selected);
  };

  // console.log(favourites);
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

                {/* {Object.entries(CATEGORY_OPTIONS).map(([optionCategory, text]) => {
                return (
                  <option key={optionCategory} value={text}>{text}</option>
                )
              })} */}
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

            <div className="pagination is-rounded pagination--own-styles">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={7}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination-list pagination__new--list"
                pageLinkClassName="pagination-link"
                previousLinkClassName="pagination-previous"
                nextLinkClassName="pagination-next"
                activeLinkClassName="pagination__is-active"
                forcePage={activePage}
              />
            </div>
          </div>
        </>
      ) : (
        <div>There are no recipes of this criteria</div>
      )}

      {/* {!filteredRecipes.length && <div>There are no recipes of this criteria</div>} */}
    </div>
  );
};
