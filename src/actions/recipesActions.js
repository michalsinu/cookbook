export const FETCH_RECIPES = 'FETCH_RECIPES';
export const FETCH_RECIPE_DETAILS = 'FETCH_RECIPE_DETAILS';
export const NEW_RECIPE = 'NEW_RECIPE';

export const STATUS = 'STATUS';

export const fetchRecipes = () => dispatch => {
    let statusCode, statusText;

    fetch('https://my-json-server.typicode.com/AckeeCZ/web-task-cookbook-fake-api/recipes', {
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
    let url = 'https://my-json-server.typicode.com/AckeeCZ/web-task-cookbook-fake-api/recipes/' + id;

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
  let url = 'https://my-json-server.typicode.com/AckeeCZ/web-task-cookbook-fake-api/recipes';

  let statusCode, statusText, json;

  json = {
    'name': recipe_title,
    'description': steps,
    'ingredients': ingredients,
    'duration': duration,
    'info': recipe_content
  }

  fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
  .then(results => {
    statusCode = results.status;
    statusText = results.statusText;

    dispatch({type: STATUS, payload: "adding", code: "", text: "recipe"})

    return results.json();
  })
  .then(data => {
    if (statusCode===200) {
      dispatch({type: STATUS, payload: "added", code: statusCode, text: statusText})
      dispatch({type: NEW_RECIPE, payload: data})
    } else {
      dispatch({type: STATUS, payload: "error", code: statusCode, text: statusText})
    }
  })
}
