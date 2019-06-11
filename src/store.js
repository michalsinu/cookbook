import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"

import reducers from "./reducers"

const loading = store => next => action => {

  if(action.payload) {
    document.getElementById('load').innerHTML = '<div class="progress"><div id="loading" class="loading progress-bar  progress-bar-animated" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100" style="width: 1%"></div></div>';

    setTimeout(function () {
      const loading = document.getElementById('loading');

      if (loading) {
        loading.style.width = '100%';
      }

      setTimeout(function() {
        document.getElementById('load').innerHTML = '';
      }, 1500)

      return next(action);
    }, 1500)
  }
}

const middleware = [thunk, loading];
const initialState = {};
const store = createStore(reducers, initialState, applyMiddleware(...middleware));

export default store;
