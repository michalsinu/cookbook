import React, { Component } from 'react';
import { Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory"

class error extends Component {
  render() {
    const history = createHistory()

    return (
      <div className="error">
        <div className="error_content">
          <h1>{this.props.status.code}</h1>
          {this.props.status.text} <br />

          <Link onClick={history.goBack()}>GO BACK</Link>
        </div>
      </div>
    );
  }
}

export default error;
