import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetchRecipeDetails } from '../actions/recipesActions';
import { addRating } from '../actions/ratingActions';

import Error from './error'
import clock from '../assets/clock_details.png';

class recipeDetails extends Component {
  constructor() {
    super()
    this.state = {}

    this.handleScoreChange = this.handleScoreChange.bind(this)
  }

  componentDidMount () {
    const {id} = this.props.match.params

    this.props.fetchRecipeDetails(id);
  }

  rating(score) {
    const {id} = this.props.match.params

    this.props.addRating(id, score, this.props.details.score);
  }

  score() {
  }

  switchScore(score){
    switch(score) {
        case 0:
          return (
            <div>
              <span className="fa fa-star fa-bigger notchecked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
            </div>
          );

        case 1:
          return (
            <div>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
            </div>
          );

        case 2:
          return (
            <div>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
            </div>
          );

        case 3:
          return (
            <div>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
            </div>
          );

        case 4:
          return (
            <div>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger notchecked"></span>
            </div>
          );

        case 5:
          return (
            <div>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger checked"></span>
              <span className="fa fa-star fa-bigger checked"></span>
            </div>
          );

      default:
        return score;
    }
  }

  ingredients(ingredients) {
    if(ingredients) {
      let list = [];

      for (var i = 0; i < ingredients.length; i++) {
        list.push(<li key={i}>{ingredients[i]}</li>);
      }

      return list;
    }
  }

  
  handleScoreChange(e) {
    var id = e.target.id;

    this.setState({'rated': id});

    this.rating(this.state.rated)
    console.log(this.state)
  }

  render() {
      if (this.props.status.code===200 && this.props.details.id) {
        return (
          <div className="container-fluid">
              <div className="row">
                <div className="title">
                  <p className="title_text">{this.props.details.name}</p>
                </div>
              </div>

              <div className="row info">
                <div className="col-7">
                  {this.switchScore(this.props.details.score)}
                </div>

                <div className="col-5">
                  <img src={clock} alt="clock" className="clock" /> {this.props.details.duration} min.
                </div>
              </div>

            <div className="content">
              <div className="row details">
                {this.props.details.info}
              </div>

              <div className="headings">Ingredience</div>

              <div className="row ingredients">
                <ul>
                  {this.ingredients(this.props.details.ingredients)}
                </ul>
              </div>

              <div className="headings">Příprava jídla</div>

              <div className="row description">
                  {this.props.details.description}
              </div>
            </div>

            <div className="row rating">
              <h3>Ohodnot' tento recept</h3>

              <div>
                <form>
                  <span className="fa fa-star fa-bigger notcheckedgray" onClick={this.handleScoreChange} id="1"></span>
                  <span className="fa fa-star fa-bigger notcheckedgray" onClick={this.handleScoreChange} id="2"></span>
                  <span className="fa fa-star fa-bigger notcheckedgray" onClick={this.handleScoreChange} id="3"></span>
                  <span className="fa fa-star fa-bigger notcheckedgray" onClick={this.handleScoreChange} id="4"></span>
                  <span className="fa fa-star fa-bigger notcheckedgray" onClick={this.handleScoreChange} id="5"></span>
                </form>
              </div>
            </div>

            {this.score()}

          </div>
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
        <p>Redirecting...</p>
      );
    }
  }
}

const mapStateToProps = state => ({
  details: state.recipes.details,
  status: state.recipes.status
});

export default withRouter(connect(mapStateToProps, { fetchRecipeDetails, addRating })(recipeDetails));
