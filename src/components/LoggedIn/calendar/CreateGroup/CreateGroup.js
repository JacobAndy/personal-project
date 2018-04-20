import React, { Component } from "react";
import { connect } from "react-redux";
import Error from "../../../Error/Error";
import axios from "axios";
import createGroup from "../../../../ducks/calendarreducer";

class CreateGroup extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }
  handleCreateGroup() {
    let date = ``;
    //name, founded, founder edit date^^
    this.props.createGroup();
  }
  render() {
    return (
      <div>
        {this.props.currentUser[0] ? (
          <div>
            <h4>Your Groups Info</h4>
            <input placeholder="group name" />
            <button onClick={this.handleCreateGroup}>submit</button>
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
