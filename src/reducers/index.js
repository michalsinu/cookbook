import { combineReducers } from "redux"

import recipes from "./recipesReducer"
import rating from "./ratingReducer"

export default combineReducers({
  recipes: recipes,
  rating: rating
});
