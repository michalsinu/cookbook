import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/recipesActions';
import { Link } from "react-router-dom";

import Error from './error';

import logo from '../assets/logo.jpg';
import clock from '../assets/clock.png';

class recipes extends Component {
  componentWillMount () {
    this.props.fetchRecipes();
  }

  switchScore(score){
    switch(score) {
        case 0:
          return (
            <div>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
            </div>
          );

        case 1:
          return (
            <div>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
            </div>
          );

        case 2:
          return (
            <div>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
            </div>
          );

        case 3:
          return (
            <div>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
            </div>
          );

        case 4:
          return (
            <div>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger notcheckedgray"></span>
            </div>
          );

        case 5:
          return (
            <div>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger checkedpink"></span>
              <span className="fa fa-star fa-bigger checkedpink"></span>
            </div>
          );

      default:
        return score;
    }
  }

  render () {
      let recipes = this.props.recipes.map(recipe => {

        const recipeId = "recipe/" + recipe.id;

        return (
          <div key={recipe.id} className="container-fluid recipe_content">
            <div className="row">

              <div className="col-5 nopadding">
                <img src={logo} alt="logo" className="ackee_logo" />
              </div>

              <div className="col-7  nopadding">
                <div className="container-fluid">

                    <div className="row">
                      <div className="recipe_name">
                        <Link to={recipeId}>{recipe.name}</Link>
                      </div>
                    </div>

                    <div className="row">
                      <div className="recipe_score">
                        {this.switchScore(recipe.score)}
                      </div>
                    </div>

                    <div className="row">
                      <div className="recipe_duration">
                        <img src={clock} alt="clock" className="clock" /> {recipe.duration} min.
                      </div>
                    </div>

                  </div>
                </div>

            </div>
          </div>
      )
    })

    if (this.props.status.payload==="fetched" && this.props.status.code===200) {
      return (
          <React.Fragment>

            <div className="heading">
              <div className="container-fluid row">
                <div className="col-10">
                  Recepty
                </div>

                <div className="col-2">
                  <Link to="/addrecipe"><span className="fa fa-add fa-plus"></span></Link>
                </div>
              </div>
            </div>

            <div className="content">
              {recipes}
            </div>

          </React.Fragment>
      );
    } else if (this.props.status.payload==="fetching") {
      return (
        <p>Please wait...</p>
      );
    } else if (this.props.status.payload==="error") {
      return (
        <Error status={this.props.status} />
      );
    } else {
      return (
        null
      );
    }
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.items,
  status: state.recipes.status
});

export default withRouter(connect(mapStateToProps, { fetchRecipes })(recipes));
