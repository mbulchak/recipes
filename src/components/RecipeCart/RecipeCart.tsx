import React from 'react';
import { Recipe } from '../../types/Recipe';
import { NavLink } from 'react-router-dom';
import { IconHeart } from '../../icons/IconHeart';
import { IconFullHeart } from '../../icons/IconFullHeart';
import { useAppDispatch } from '../../app/hooks';
import { toggleFavourites } from '../../features/favourites/favourites';
import { localFavourites } from '../../utils/localFavourites';
import './RecipeCart.scss';

type Props = {
  recipe: Recipe;
  isFavourite?: boolean;
  isRecipes?: boolean;
};

export const RecipeCart: React.FC<Props> = ({ recipe, isFavourite = false, isRecipes = false }) => {
  const dispatch = useAppDispatch();

  return (
    <div key={recipe.idMeal} className="recipe__container">
      <img className="recipe__image" src={recipe.strMealThumb} alt="Recipe Image" />

      <div className="recipe__details">
        <p>{recipe.strMeal}</p>
        <p>{recipe.strCategory}</p>
        <p>{recipe.strArea}</p>
      </div>

      <div className="recipe__buttons">
        <NavLink to={`/recipes/${recipe.idMeal}`} className="recipe__meal">
          More info
        </NavLink>

        <button
          onClick={() => {
            dispatch(toggleFavourites(recipe));
            localFavourites.toggleFavourites(recipe);
          }}
        >
          {isFavourite || isRecipes ? <IconFullHeart /> : <IconHeart />}
        </button>
      </div>
    </div>
  );
};
