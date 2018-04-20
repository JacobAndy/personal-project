import React, { Component } from "react";
import "./Calendar.css";
import LoginNav from "../../Nav/LoginNav/LoginNav";
// import CreateSchedule from "../CreateSchedule/CreateSchedule";
import { connect } from "react-redux";
import Error from "../../Error/Error";
import Schedules from "./schedules/Schedules";

// import { getCompany } from "../../../ducks/calendarreducer";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    console.log(this.props);
    return (
      <div>
        <LoginNav />
        {this.props.currentUser[0] ? (
          <div>
            <Schedules />
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

export default connect(mapStateToProps, {})(App);
