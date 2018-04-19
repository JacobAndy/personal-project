import React, { Component } from "react";
import { connect } from "react-redux";
import Error from "../../../Error/Error";

class CreateSchedule extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.currentUser[0] ? (
          <div>
            <h1>CreateSchedule Page</h1>
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

export default connect(mapsStateToProps, {})(CreateSchedule);
