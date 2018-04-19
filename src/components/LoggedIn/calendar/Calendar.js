import React, { Component } from "react";
import "./Calendar.css";
import LoginNav from "../../Nav/LoginNav/LoginNav";
import WeekOf from "../week-of/WeekOf";
// import CreateSchedule from "../CreateSchedule/CreateSchedule";
import { connect } from "react-redux";
import Error from "../../Error/Error";
import Dialog from "material-ui/Dialog";
import TimePicker from "material-ui/TimePicker";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mondaymornopen: false,
      mondaynightopen: false,
      mondaymorningclockin: "",
      mondaymorningclockout: "",
      mondaynightclockin: "",
      mondaynightclockout: ""
    };

    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(prop) {
    this.setState({ [prop]: !this.state[prop] });
  }
  handleStateUpdate(prop, val) {
    let hours = val.getHours();
    let minutes = val.getMinutes();
    if (hours === 12) {
      minutes = `${minutes}p`;
    } else if (hours >= 12) {
      hours = `${hours - 12}`;
      minutes = `${minutes}p`;
    } else if (hours === 0) {
      hours = `12`;
      minutes = `${minutes}a`;
    } else if (hours < 12) {
      minutes = `${minutes}a`;
    }

    this.setState({ [prop]: `${hours}:${minutes}` });
  }

  render() {
    console.log(this.state.mondaymorningclockin);
    let { mondaymorningclockin } = this.state;
    return (
      <div>
        <LoginNav />
        {this.props.currentUser[0] ? (
          <div>
            <div className="CreateButtonHolder">
              <button className="CreateScheduleButton">Create Schedule</button>
            </div>
            <WeekOf />
            <div className="calendar">
              <div className="open-shift">
                <h5>Open Shifts</h5>
                <div className="down-arrow" />
              </div>
              <div className="date">
                <div className="date-info">
                  <h4>Monday</h4>
                  <div className="down-arrow-date" />
                </div>
                <div className="date-info">
                  <h4>Tuesday</h4>
                  <div className="down-arrow-date" />
                </div>
                <div className="date-info">
                  <h4>Wednesday</h4>
                  <div className="down-arrow-date" />
                </div>
                <div className="date-info">
                  <h4>Thursday</h4>
                  <div className="down-arrow-date" />
                </div>
                <div className="date-info">
                  <h4>Friday</h4>
                  <div className="down-arrow-date" />
                </div>
                <div className="date-info">
                  <h4>Saturday</h4>
                  <div className="down-arrow-date" />
                </div>
                <div className="date-info">
                  <h4>Sunday</h4>
                  <div className="down-arrow-date" />
                </div>
              </div>

              <div className="employee-display">
                <div className="individual">
                  <div className="employee">
                    <h4 className="employee-name">Jacob Anderson</h4>
                    <div className="down-arrow-user" />
                  </div>
                  <div className="schedule">
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <p>
                          {!this.state.mondaymorningclockin
                            ? "not working"
                            : this.state.mondaymorningclockin}
                        </p>
                        <p>
                          {!this.state.mondaymorningclockout
                            ? null
                            : `-${this.state.mondaymorningclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("mondaymornopen")}
                        />
                        <Dialog
                          open={this.state.mondaymornopen}
                          onRequestClose={() =>
                            this.handleOpen("mondaymornopen")
                          }
                          // onRequestClose={this.handleOpen}
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Monday Morning Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "mondaymorningclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Monday Morning Clock In"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "mondaymorningclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                      <div className="morning-shift">
                        <p>
                          {!this.state.mondaynightclockin
                            ? "not working"
                            : this.state.mondaynightclockin}
                        </p>
                        <p>
                          {!this.state.mondaynightclockout
                            ? null
                            : `-${this.state.mondaynightclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("mondaynightopen")}
                        />
                        <Dialog
                          open={this.state.mondaynightopen}
                          onRequestClose={() =>
                            this.handleOpen("mondaynightopen")
                          }
                          // onRequestClose={this.handleOpen}
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Monday Night Clock In"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "mondaynightclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Monday Night Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "mondaynightclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                        {/* <div className="right-arrow-small" /> */}
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <h4>Tuesday Day</h4>
                        <div className="right-arrow-small" />
                      </div>
                      <div className="morning-shift">
                        <h4>Tuesday Night</h4>
                        <div className="right-arrow-small" />
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <h4>Wednesday Day</h4>
                        <div className="right-arrow-small" />
                      </div>
                      <div className="morning-shift">
                        <h4>Wednesday Night</h4>
                        <div className="right-arrow-small" />
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <h4>Thursday Day</h4>
                        <div className="right-arrow-small" />
                      </div>
                      <div className="morning-shift">
                        <h4>Thursday Night</h4>
                        <div className="right-arrow-small" />
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <h4>Friday Day</h4>
                        <div className="right-arrow-small" />
                      </div>
                      <div className="morning-shift">
                        <h4>Friday Night</h4>
                        <div className="right-arrow-small" />
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <h4>Saturday Day</h4>
                        <div className="right-arrow-small" />
                      </div>
                      <div className="morning-shift">
                        <h4>Saturday Night</h4>
                        <div className="right-arrow-small" />
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <h4>Sunday Day</h4>
                        <div className="right-arrow-small" />
                      </div>
                      <div className="morning-shift">
                        <h4>Sunday Night</h4>
                        <div className="right-arrow-small" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
