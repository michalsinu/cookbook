import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/recipesActions';
import { Link } from "react-router-dom";

import Error from './error';

class addRecipe extends Component {
  componentDidMount() {
    function setFocused(event) {
      var results = document.querySelectorAll('.input-smallheading');

        console.log("focused!" + event.target.placeholder);

    }

    function unsetFocused(event) {
      var results = document.querySelectorAll('.input-smallheading');
          console.log("unfocused" + event.target.placeholder);
    }

    var results = document.getElementsByClassName('input-addrecipe');

      for (var i = 0; results.length > i; i++) {
       results[i].addEventListener("focus", (e) => setFocused(e));
       results[i].addEventListener("blur",  (e) => unsetFocused(e));

     }
  }

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

      <div className="content-addrecipe">
       <form>
         <div className="form-group">
          <div className="input-smallheading">Název receptu</div>
          <input type="text" className="form-control input-addrecipe" placeholder="Název receptu" />
        </div>

          <div className="form-group">
            <div className="input-smallheading">Uvodní text</div>
            <input type="text" className="form-control input-addrecipe" placeholder="Uvodní text" />
          </div>

        </form>
      </div>
    </React.Fragment>
    );


  }
}

export default addRecipe;
