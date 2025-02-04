import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';

import 'bulma/css/bulma.css';
import './index.css';
import App from './App.tsx';
import { RecipeList } from './pages/Recipes/Recipes.tsx';
import { RecipeItem } from './pages/Recipe/Recipe.tsx';
import { FavouritesPage } from './pages/Favourites/Favourites.tsx';
import { ErrorRecipes } from './components/ErrorRecipes/ErrorRecipes.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/recipes',
        element: <RecipeList />,
        errorElement: <ErrorRecipes />,
      },
      {
        path: '/recipes/:recipeId',
        element: <RecipeItem />,
      },
      {
        path: '/favourites',
        element: <FavouritesPage />,
        errorElement: <div className="section-padding">Not implemented favs</div>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
