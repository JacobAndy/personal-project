import React, { Component } from "react";
import { connect } from "react-redux";
import Error from "../../../Error/Error";

class CreateGroup extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.currentUser[0] ? (
          <div>
            <h4>Your Groups Info</h4>
            <input />
            <input />
            <input />
            <input />
          </div>
        ) : (
          <Error />
        )}
      </div>
    );
  }
}

let mapsStateToProps = state => {
  return {
    ...state.users
  };
};

export default connect(mapsStateToProps, {})(CreateGroup);
