import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipe } from '../../services/getRecipe';
import { Recipe } from '../../types/Recipe';

export const RecipeItem = () => {
  const params = useParams<{ recipeId: string }>();
  const navigate = useNavigate();

  const recipeId = params.recipeId;

  if (!recipeId) {
    return <div> No Recipe Id</div>;
  }

  const [selectedMeal, setSelectedMeal] = useState<Recipe | null>(null);

  useEffect(() => {
    getRecipe(recipeId)
      .then((res) => {
        const result = res.meals;

        result.map((meal) => {
          setSelectedMeal(meal);
        });

        // setSelectedMeal(res)
      })
      .catch(console.error);
  }, []);

  let meal: Recipe;

  if (selectedMeal === null) {
    return;
  } else {
    meal = selectedMeal;
  }

  let startMeal: { [key: string]: any } = {};
  // let ingredientAndMeasure: { [key: string]: any } = {};
  let ingredients: { [key: string]: any } = {};
  let measures: { [key: string]: any } = {};

  let image: string = '';

  for (const item in meal) {
    if (item === 'idMeal') {
      continue;
    }

    if (item.includes('Ingredient')) {
      const normal = item.slice(3);

      ingredients[normal] = meal[item as keyof Recipe];
    }

    if (item.includes('Measure')) {
      const normal = item.slice(3);

      measures[normal] = meal[item as keyof Recipe];
    }

    if (item.includes('MealThumb')) {
      const img = meal[item as keyof Recipe];

      if (img !== null) {
        image = img as string;
      }
    }

    // if (item.includes('Youtube')) {
    //   const video = meal[item as keyof Recipe];
    //   if (video !== null) {
    //     videoYouTube = video;
    //   }
    // }

    if (
      item.includes('str') &&
      !item.includes('Ingredient') &&
      !item.includes('Measure') &&
      !item.includes('MealThumb')
    ) {
      const normal = item.slice(3);

      startMeal[normal] = meal[item as keyof Recipe];

      // startMeal[item] = meal[item as keyof Recipe];
    }
  }

  for (const key in startMeal) {
    if (startMeal[key] === null || startMeal[key] === undefined) {
      delete startMeal[key];
    }

    // if (typeof startMeal[key] === 'string') {
    //   if (startMeal[key].trim() === '') {

    //     delete startMeal[key];
    //   }
    // }
  }

  // for (const ingrMeas in ingredientAndMeasure) {
  //   if (typeof ingredientAndMeasure[ingrMeas] === 'string') {
  //     if (ingredientAndMeasure[ingrMeas].trim() === '') {
  //       delete ingredientAndMeasure[ingrMeas];
  //     }
  //   }
  // }

  // console.log(ingredientAndMeasure);

  return (
    <div className="meal">
      <button
        className="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>

      {/* <div>Recipe Item {selectedMeal?.strMeal}</div> */}
      <h2 className="meal__title">{selectedMeal?.strMeal}</h2>

      <div className="meal__image">
        <img className="meal__image--main" src={image} alt="Meal Image" />
      </div>

      <div className="meal__description">
        <table>
          {/* <tr>
            <th>Name</th>

            <th>Value</th>
          </tr> */}

          {Object.entries(startMeal).map(([name, value]) => {
            return (
              <>
                <tr>
                  <td>{name}</td>
                  <td>{value}</td>
                </tr>
              </>
            );
          })}
        </table>
      </div>

      <div className="section__ingredients">
        <h3>Ingredients</h3>

        <div className="ingredients--measures">
          <div className="ingredients">
            {Object.entries(ingredients).map(([, ingredient]) => {
              return (
                // console.log(name)
                <>
                  {/* <div>{name}</div> */}
                  <div key={ingredient}>{ingredient}</div>
                </>
              );
            })}
          </div>

          <div className="measures">
            {Object.entries(measures).map(([, measure]) => {
              return <div key={measure}>{measure.trim()}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
