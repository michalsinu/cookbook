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
      addIngredientField.placeholder = "Vaše ingredience";
      addIngredientField.vlaue = this.state.ingredients[this.state.ingredientsFieldCounter];

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


      this.props.addNewRecipe("", "", "", "", "");
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
             <input type="text" className="form-control input-addrecipe" id="0 ingredients" style={inputIngredientsStyle} placeholder="Vaše ingredience" onChange={this.handleChange} value={this.state.ingredients[0]} />
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
