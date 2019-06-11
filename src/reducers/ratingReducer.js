import { STATUS_RATING } from '../actions/ratingActions';

const initialState = {

}

export default function(state = initialState, action) {
  switch (action.type) {
    case STATUS_RATING:
      console.log(action);

      return {
        ...state
      }

    default:
      return {
        ...state
      }
  }
}
