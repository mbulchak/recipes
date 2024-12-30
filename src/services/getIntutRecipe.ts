export function getRecipeFromInput(value: string) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Failed to fetch data');
    })
}