import React, { Component } from "react";
import LoginNav from "../../Nav/LoginNav/LoginNav";
import { connect } from "react-redux";
import Error from "../../Error/Error";

class GoogleDirections extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <LoginNav />
        {this.props.currentUser[0] ? (
          <div>
            <h1>GOOGLE DIRECTIONS PAGE</h1>
          </div>
        ) : (
          <Error />
        )}
      </div>
    );
  }
}
let mapStateToProps = state => {
  return { ...state.users };
};
export default connect(mapStateToProps, {})(GoogleDirections);
