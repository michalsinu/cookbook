import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { addNewRecipe } from '../actions/recipesActions';

import Error from './error';

class addRecipe extends Component {
  constructor() {
    super()
    this.state = {
      ingredientsFieldCounter: 1,
      recipe_title: "",
      recipe_content: "",
      ingredients: [],
      steps: "",
      duration: ""
    }

    this.handleChange = this.handleChange.bind(this)
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

      if (inputsmallheading) {
        inputsmallheading.remove();
      }
    }

    var addIngredientFieldFunction = (event) => {
      var addIngredientField = document.createElement("input");

      addIngredientField.type = "text";
      addIngredientField.className = "form-control input-addrecipe";
      addIngredientField.id = this.state.ingredientsFieldCounter;
      addIngredientField.style = "margin-bottom: 6vw";

      if (this.state.ingredientsFieldCounter==1) {
        var firstIngredientField = document.getElementById(0);
        firstIngredientField.insertAdjacentElement("afterend", addIngredientField);

      } else {
        var firstIngredientField = document.getElementById(this.state.ingredientsFieldCounter - 1);
        firstIngredientField.insertAdjacentElement("afterend", addIngredientField);
      }

      this.setState({ingredientsFieldCounter: this.state.ingredientsFieldCounter + 1});
    }

    var submitRecipe = (event) => {
      let errors = [], title, content, ingredients, ingredientsTemp = [], ingredientsCounter, steps, duration;

      title = this.state.recipe_title.toLowerCase();
      content = this.state.recipe_content;
      steps = this.state.steps;
      duration = this.state.duration;
      ingredientsCounter = this.state.ingredientsFieldCounter;
      ingredients = this.state.ingredients;

      for(var i = 0; ingredientsCounter > i; i++) {
        var fields = document.getElementById(i);

        ingredientsTemp[i] = fields.value;

        this.setState({ingredients: ingredientsTemp});
      }

      if (title==="") {
        errors.push("Nazev receptu je prazdny");
      }

      if (!title.includes("akcee")) {
        errors.push("Nazev musi obsahovat slovo Akcee");
      }

      if (content==="") {
        errors.push("Uvodni text je prazdny");
      }

      if (ingredientsTemp.length<1) {
        errors.push("Ingredience jsou prazdne");
      }

      if (steps==="") {
        errors.push("Postup je prazdny");
      }

      if (duration==="") {
        errors.push("Cas je prazdny");
      }

      var hasDigit = /\d/;

      if (!hasDigit.test(duration)) {
        errors.push("Cas neni spravny");
      }

      if (errors.length > 0) {
        errors.map(error => {
          alert(error);
        });
      } else {
        this.props.addNewRecipe(title, content, ingredientsTemp, steps, duration);
      }
    }

    var results = document.getElementsByClassName('input-addrecipe');

      for (var i = 0; results.length > i; i++) {
       results[i].addEventListener("click", (e) => setFocused(e));

       results[i].addEventListener("blur",  (e) => unsetFocused(e));
       results[i].addEventListener("keyup",  (e) => { if(e.keycode===13) {unsetFocused(e)}});
     }

     var addIngredientField = document.getElementById('add-ingredient-field');

      addIngredientField.addEventListener("click", (e) => addIngredientFieldFunction(e));

     var submit = document.getElementById('submit');

      submit.addEventListener("click", (e) => submitRecipe(e));
  }

  handleChange(e) {
    let value = e.target.value;
    var id = e.target.id;

    this.setState({[e.target.id]: value});
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
            <span id="submit" className="fa fa-add fa-plus"></span>
          </div>
        </div>
      </div>

      <div className="content-addrecipe">
       <form className="form-addrecipe">
         <div className="form-group">
            <input type="text" className="form-control input-addrecipe" id="recipe_title" onChange={this.handleChange} placeholder="Název receptu" value={this.state.recipe_title} />
         </div>

          <div className="form-group">
            <input type="text" className="form-control input-addrecipe" id="recipe_content" placeholder="Uvodní text" onChange={this.handleChange} value={this.state.recipe_content} />
          </div>
        </form>

        <div className="headings" style={{marginBottom: '5vw'}}>INGREDIENCE</div>

        <form className="form-addrecipe">
          <div className="form-group">
              <input type="text" id="0" className="form-control input-addrecipe" style={inputIngredientsStyle} placeholder="Vaše ingredience" />
          </div>

           <div className="form-group">
             <button id="add-ingredient-field" className="btn"><span className="fa fa-plus"></span> PŘIDAT</button>
           </div>
         </form>

         <form className="form-addrecipe">
           <div className="form-group">
              <input type="text" className="form-control input-addrecipe" id="steps" placeholder="Postup" onChange={this.handleChange} value={this.state.steps}/>
           </div>

            <div className="form-group">
              <input type="text" className="form-control input-addrecipe" id="duration" placeholder="Čas" onChange={this.handleChange} value={this.state.duration}/>
            </div>
          </form>
      </div>
    </React.Fragment>
    );


  }
}

const mapStateToProps = state => ({
  status: state.recipes.status
});

export default withRouter(connect(mapStateToProps, { addNewRecipe })(addRecipe));
