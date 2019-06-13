import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/recipesActions';
import { Link } from "react-router-dom";

import Error from './error';

class addRecipe extends Component {
  constructor() {
    super()
    this.state = {
      ingredientsFieldCounter: 1
    }
  }

  componentDidMount() {
    function setFocused(event) {
      var inputsmallheading = document.createElement("div");

      inputsmallheading.className = "input-smallheading"
      inputsmallheading.id = event.target.placeholder;
      inputsmallheading.innerHTML = event.target.placeholder;

      event.target.insertAdjacentElement("beforebegin", inputsmallheading)
    }

    function unsetFocused(event) {
      var inputsmallheading = document.getElementById(event.target.placeholder);

      inputsmallheading.remove();
    }

    var addIngredientFieldFunction = (event) => {
      var addIngredientField = document.createElement("input");

      addIngredientField.type = "text";
      addIngredientField.className = "form-control input-addrecipe";
      addIngredientField.id = this.state.ingredientsFieldCounter;
      addIngredientField.style = "margin-bottom: 6vw";
      addIngredientField.placeholder = "Vaše ingredience";

      if (this.state.ingredientsFieldCounter==1) {
        var firstIngredientField = document.getElementById(0);
        firstIngredientField.insertAdjacentElement("afterend", addIngredientField);

      } else {
        var firstIngredientField = document.getElementById(this.state.ingredientsFieldCounter - 1);
        firstIngredientField.insertAdjacentElement("afterend", addIngredientField);
      }

      this.setState({ingredientsFieldCounter: this.state.ingredientsFieldCounter + 1});
    }

    var results = document.getElementsByClassName('input-addrecipe');

      for (var i = 0; results.length > i; i++) {
       results[i].addEventListener("click", (e) => setFocused(e));

       results[i].addEventListener("blur",  (e) => unsetFocused(e));
       results[i].addEventListener("keyup",  (e) => { if(e.keycode===13) {unsetFocused(e)}});
     }

     var addIngredientField = document.getElementById('add-ingredient-field');

      addIngredientField.addEventListener("click", (e) => addIngredientFieldFunction(e));
  }

  render () {
    var inputIngredientsStyle = {
      marginBottom: '6vw'
    }

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
       <form className="form-addrecipe">
         <div className="form-group">
            <input type="text" className="form-control input-addrecipe" id="nazev-receptu" placeholder="Název receptu" />
         </div>

          <div className="form-group">
            <input type="text" className="form-control input-addrecipe" id="uvodni-text" placeholder="Uvodní text" />
          </div>
        </form>

        <div className="headings" style={{marginBottom: '5vw'}}>INGREDIENCE</div>

        <form className="form-addrecipe">
          <div className="form-group">
             <input type="text" className="form-control input-addrecipe" id="0" style={inputIngredientsStyle} placeholder="Vaše ingredience" />
          </div>

           <div className="form-group">
             <button id="add-ingredient-field" className="btn"><span className="fa fa-plus"></span> PŘIDAT</button>
           </div>
         </form>

         <form className="form-addrecipe">
           <div className="form-group">
              <input type="text" className="form-control input-addrecipe" id="postup" placeholder="Postup" />
           </div>

            <div className="form-group">
              <input type="text" className="form-control input-addrecipe" id="cas" placeholder="Čas" />
            </div>
          </form>
      </div>
    </React.Fragment>
    );


  }
}

export default addRecipe;
