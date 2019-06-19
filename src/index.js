import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";

import RecipeDetails from './components/recipeDetails';
import UpdateRecipe from './components/updateRecipe';
import AddRecipe from './components/addRecipe';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './App';

import store from './store';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Router>
        <Switch>
         <Route exact path="/" component={App}/>
         <Route exact path="/recipe/:id" component={RecipeDetails} />
         <Route exact path="/updaterecipe/:id" component={UpdateRecipe} />
         <Route exact path="/addrecipe" component={AddRecipe} />
        </Switch>
      </Router>
    </HashRouter>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
