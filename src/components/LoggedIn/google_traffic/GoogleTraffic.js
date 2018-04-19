import React, { Component } from "react";
import LoginNav from "../../Nav/LoginNav/LoginNav";
import { connect } from "react-redux";
import Error from "../../Error/Error";

class GoogleTraffic extends Component {
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
            <h1>GOOGLE TRAFFIC PAGE</h1>
          </div>
        ) : (
          <Error />
        )}
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    ...state.users
  };
};
export default connect(mapStateToProps, {})(GoogleTraffic);
