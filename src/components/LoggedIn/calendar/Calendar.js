import React, { Component } from "react";
import "./Calendar.css";
import Nav from "../../Nav/LoginNav/Nav";
// import CreateSchedule from "../CreateSchedule/CreateSchedule";
import { connect } from "react-redux";
import Error from "../../Error/Error";
import Schedules from "./schedules/Schedules";
import { getUser } from "../../../ducks/users";
import { getCompany } from "../../../ducks/calendarreducer";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props
      .getUser()
      .then(() => {
        this.props.getCompany(this.props.user_id);
      })
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Nav />
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

export default connect(mapStateToProps, { getUser, getCompany })(App);
