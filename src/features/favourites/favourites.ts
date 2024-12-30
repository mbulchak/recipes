import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../../types/Recipe';

type FavouriteState = {
  favourites: Recipe[];
};

const initialState: FavouriteState = {
  favourites: [],
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    toggleFavourites: (state, {payload}: PayloadAction<Recipe>) => {
      const isRecipeExists = state.favourites.find((fav: Recipe) => fav.idMeal === payload.idMeal);

      if(!isRecipeExists) {
        state.favourites.push(payload);
      } else {
        state.favourites = state.favourites.filter((recipe: Recipe) => recipe.idMeal !== payload.idMeal);
      }
    }
  },
});

export const { setFavourites, toggleFavourites} = favouritesSlice.actions;
export const favouritesReducer = favouritesSlice.reducer;
