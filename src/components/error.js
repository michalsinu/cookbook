import React, { Component } from 'react';
import { Link } from "react-router-dom";

class error extends Component {
  render() {
    return (
      <div className="error">
        <div className="error_content">
          <h1>{this.props.status.code}</h1>
          {this.props.status.text} <br />

        </div>
      </div>
    );
  }
}

export default error;
