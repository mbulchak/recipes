import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { localFavourites } from './utils/localFavourites';
import { setFavourites } from './features/favourites/favourites';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedFavourites = localFavourites.getFavourites();
    dispatch(setFavourites(storedFavourites));
  }, []);

  return (
    <>
      <header className="header">
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__link">
              <NavLink className="nav__item" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav__link">
              <NavLink className="nav__item" to="/recipes">
                Recipes
              </NavLink>
            </li>
            <li className="nav__link">
              <NavLink className="nav__item" to="/favourites">
                Favourites
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default App;
