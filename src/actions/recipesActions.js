export const FETCH_RECIPES = 'FETCH_RECIPES';
export const FETCH_RECIPE_DETAILS = 'FETCH_RECIPE_DETAILS';
export const NEW_RECIPE = 'NEW_RECIPE';

export const STATUS = 'STATUS';

export const fetchRecipes = () => dispatch => {
    let statusCode, statusText;

    fetch('https://cors-anywhere.herokuapp.com/https://cookbook.ack.ee/api/v1/recipes', {
      method: 'GET',
      body: null
    })
    .then(results => {
      statusCode = results.status;
      statusText = results.statusText;

      return results.json();
    })
    .then(data => {

      dispatch({type: STATUS, payload: "fetching", code: false, text: false})

      if (statusCode===200) {
        dispatch({type: STATUS, payload: "fetched", code: statusCode, text: statusText})
        dispatch({type: FETCH_RECIPES, payload: data})
      } else {
        dispatch({type: STATUS, payload: "error", code: statusCode, text: statusText})
      }
    })
}

export const fetchRecipeDetails = (id) => dispatch => {
    let url = 'https://cors-anywhere.herokuapp.com/https://cookbook.ack.ee/api/v1/recipes/' + id;

    let statusCode, statusText;

    fetch(url, {
      method: 'GET',
      body: null
    })
    .then(results => {
      statusCode = results.status;
      statusText = results.statusText;

      dispatch({type: STATUS, payload: "fetching", code: id, text: "recipe"})

      return results.json();
    })
    .then(data => {
      if (statusCode===200) {
        dispatch({type: STATUS, payload: "fetched", code: statusCode, text: statusText})
        dispatch({type: FETCH_RECIPE_DETAILS, payload: data})
      } else {
        dispatch({type: STATUS, payload: "error", code: statusCode, text: statusText})
      }
    })
}

export const addNewRecipe = (recipe_title, recipe_content, ingredients, steps, duration) => dispatch => {
  let url = 'https://cors-anywhere.herokuapp.com/https://cookbook.ack.ee/api/v1/recipes/';

  dispatch({type: NEW_RECIPE, payload: "submit data"})

}
