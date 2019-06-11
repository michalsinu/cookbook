import { FETCH_RECIPES, FETCH_RECIPE_DETAILS, NEW_RECIPE, STATUS } from '../actions/recipesActions';

const initialState = {
  items: [],
  details: [],
  status: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return {
        ...state,
        items: action.payload
      }

    case FETCH_RECIPE_DETAILS:
      return {
        ...state,
        details: action.payload
      }

    case NEW_RECIPE:
      return {
        ...state
      }

    case STATUS:
      console.log(action)

      return {
        ...state,
        status: {
          "payload": action.payload,
          "text": action.text,
          "code": action.code
        }
      }

    default:
      return {
        ...state
      }
  }
}
