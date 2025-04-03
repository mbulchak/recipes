import { Recipe } from '../../types/Recipe';
import './FavouritesIngredientsModal.scss';

type Props = {
  favourites: Recipe[];
  onIsButtonSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FavouritesIngredientsModal: React.FC<Props> = ({ favourites, onIsButtonSelected }) => {
  const allIngredients = [];
  const allMeasures = [];
  let allIngredientsAndMeasures: { [key: string]: any } = {};
  const instructions = [];

  for (let favourite of favourites) {
    for (let key in favourite) {
      const normalizeValue = favourite[key as keyof Recipe]?.trim() || '';

      if (key.includes('Ingredient')) {
        if (normalizeValue === '') {
          continue;
        } else {
          allIngredients.push(favourite[key as keyof Recipe]);
          continue;
        }
      }

      if (key.includes('Measure')) {
        if (normalizeValue === '') {
          continue;
        } else {
          allMeasures.push(favourite[key as keyof Recipe]);
          continue;
        }
      }

      if (key.includes('Instructions')) {
        if (normalizeValue === '') {
          continue;
        } else {
          instructions.push(favourite[key as keyof Recipe]);
          continue;
        }
      }
    }
  }

  for (
    let ingredientOrMeasure = 0;
    ingredientOrMeasure < allIngredients.length;
    ingredientOrMeasure++
  ) {
    const ingredient = allIngredients[ingredientOrMeasure];
    const measure = allMeasures[ingredientOrMeasure];

    if (ingredient !== null && measure !== null) {
      allIngredientsAndMeasures[ingredient] = measure;
    }
  }

  const lengthOfAllIngredAndMeasures = Object.entries(allIngredientsAndMeasures).length;
  const firstHalfOfAllIngredAndMeasures = Object.entries(allIngredientsAndMeasures).slice(
    0,
    Math.floor(lengthOfAllIngredAndMeasures / 2),
  );
  const secondHalfOfAllIngredAndMeasures = Object.entries(allIngredientsAndMeasures).slice(
    Math.floor(lengthOfAllIngredAndMeasures / 2),
  );

  return (
    <>
      <div className="ingredients__inctructions">
        <div className="part__ingredients--measures">
          <div className="button button__close__modal" onClick={() => onIsButtonSelected(false)}>
            <span>x</span>
          </div>

          <div className="ingredients__modal">
            <h3>Ingredients</h3>

            <div className="ingredients__list">
              <div className="ingredients__list__first--half">
                {Object.entries(firstHalfOfAllIngredAndMeasures).map(
                  ([, [ingredient, measure]]) => {
                    return (
                      <>
                        <div className="pairsIngrAndMeas">
                          <div className="first__part">{ingredient}</div>
                          <div className="first__part">{measure}</div>
                        </div>
                      </>
                    );
                  },
                )}
              </div>
              {/* 
          <div className="divider"></div>
 */}
              <div className="ingredients__list__second--half">
                {Object.entries(secondHalfOfAllIngredAndMeasures).map(
                  ([, [ingredient, measure]]) => {
                    return (
                      <>
                        <div className="pairsIngrAndMeas">
                          <div className="first__part">{ingredient}</div>
                          <div className="first__part">{measure}</div>
                        </div>
                      </>
                    );
                  },
                )}
              </div>

              {/* <div className="ingredients__list__second--half">
            {Object.entries(secondHalfOfAllIngredAndMeasures)
              .sort()
              .map(([ingred, meas]) => {
                return (
                  <>
                    <div className="ingredients__list">
                      <div>{ingred}</div>
                      <div>{meas}</div>
                    </div>
                  </>
                );
              })}
          </div> */}
            </div>
          </div>
        </div>

        <div className="part__instructions">
          <h3>Instructions</h3>

          <div className="instructions__list">
            {instructions.map((instruction) => {
              return <div className="instruction">{instruction}</div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
