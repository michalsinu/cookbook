import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/recipesActions';
import { Link } from "react-router-dom";

import Error from './error';

class addRecipe extends Component {
  render () {
    return (
    <React.Fragment>
      <div className="heading">
        <div className="container-fluid row">
          <div className="col-2">
            <Link to="/"><span className="fa fa-add fa-arrow-left"></span></Link>
          </div>

          <div className="col-8">
            Přidat recept
          </div>

          <div className="col-2">
            <Link to="/addrecipe"><span className="fa fa-add fa-plus"></span></Link>
          </div>
        </div>
      </div>

      <div className="content">
       <form>
         <div className="form-group">
          <input type="text" className="form-control" id="Název receptu" placeholder="Název receptu" />
        </div>

          <div className="form-group">
            <input type="text" className="form-control" id="Uvodní text" placeholder="Uvodní text" />
          </div>

        </form>
      </div>
    </React.Fragment>
    );
  }
}

export default addRecipe;
