import React, { Component } from "react";
import "./Calendar.css";
import LoginNav from "../../Nav/LoginNav/LoginNav";
import WeekOf from "../week-of/WeekOf";
// import CreateSchedule from "../CreateSchedule/CreateSchedule";
import { connect } from "react-redux";
import Error from "../../Error/Error";
import Dialog from "material-ui/Dialog";
import TimePicker from "material-ui/TimePicker";
import FlatButton from "material-ui/FlatButton";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mondaymorningopen: false,
      mondaynightopen: false,
      mondaymorningclockin: "",
      mondaymorningclockout: "",
      mondaynightclockin: "",
      mondaynightclockout: "",

      tuesdaymorningopen: false,
      tuesdaynightopen: false,
      tuesdaymorningclockin: "",
      tuesdaymorningclockout: "",
      tuesdaynightclockin: "",
      tuesdaynightclockout: "",

      wednesdaymorningopen: false,
      wednesdaynightopen: false,
      wednesdaymorningclockin: "",
      wednesdaymorningclockout: "",
      wednesdaynightclockin: "",
      wednesdaynightclockout: "",

      thursdaymorningopen: false,
      thursdaynightopen: false,
      thursdaymorningclockin: "",
      thursdaymorningclockout: "",
      thursdaynightclockin: "",
      thursdaynightclockout: "",

      fridaymorningopen: false,
      fridaynightopen: false,
      fridaymorningclockin: "",
      fridaymorningclockout: "",
      fridaynightclockin: "",
      fridaynightclockout: "",

      saturdaymorningopen: false,
      saturdaynightopen: false,
      saturdaymorningclockin: "",
      saturdaymorningclockout: "",
      saturdaynightclockin: "",
      saturdaynightclockout: "",

      sundaymorningopen: false,
      sundaynightopen: false,
      sundaymorningclockin: "",
      sundaymorningclockout: "",
      sundaynightclockin: "",
      sundaynightclockout: ""
    };

    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(prop) {
    this.setState({ [prop]: !this.state[prop] });
  }
  handleStateUpdate(prop, val) {
    let hours = val.getHours();
    let minutes = val.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
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
  handleOff(prop) {
    let clockin = `${prop}clockin`;
    let clockout = `${prop}clockout`;
    this.setState({ [clockin]: null, [clockout]: null });
  }

  render() {
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
                            : !this.state.mondaymorningclockin
                              ? null
                              : `-${this.state.mondaymorningclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("mondaymorningopen")}
                        />
                        <Dialog
                          open={this.state.mondaymorningopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() => this.handleOpen("mondaymornopen")}
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("mondaymorning")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("mondaymorningopen")
                              }
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("mondaymorningopen")
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
                            placeholder="Monday Morning Clock Out"
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
                            : !this.state.mondaynightclockin
                              ? null
                              : `-${this.state.mondaynightclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("mondaynightopen")}
                        />
                        <Dialog
                          open={this.state.mondaynightopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() => this.handleOpen("mondaynightopen")}
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("mondaynight")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() => this.handleOpen("mondaynightopen")}
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("mondaynightopen")
                          }
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
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <p>
                          {!this.state.tuesdaymorningclockin
                            ? "not working"
                            : this.state.tuesdaymorningclockin}
                        </p>
                        <p>
                          {!this.state.tuesdaymorningclockout
                            ? null
                            : !this.state.tuesdaymorningclockin
                              ? null
                              : `-${this.state.tuesdaymorningclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("tuesdaymorningopen")}
                        />
                        <Dialog
                          open={this.state.tuesdaymorningopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() => this.handleOpen("tuesdaymornopen")}
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("tuesdaymorning")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("tuesdaymorningopen")
                              }
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("tuesdaymorningopen")
                          }
                          // onRequestClose={this.handleOpen}
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Tuesday Morning Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "tuesdaymorningclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Tuesday Morning Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "tuesdaymorningclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                      <div className="morning-shift">
                        <p>
                          {!this.state.tuesdaynightclockin
                            ? "not working"
                            : this.state.tuesdaynightclockin}
                        </p>
                        <p>
                          {!this.state.tuesdaynightclockout
                            ? null
                            : !this.state.tuesdaynightclockin
                              ? null
                              : `-${this.state.tuesdaynightclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("tuesdaynightopen")}
                        />

                        <Dialog
                          open={this.state.tuesdaynightopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("tuesdaynightopen")
                              }
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("tuesdaynight")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("tuesdaynightopen")
                              }
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("tuesdaynightopen")
                          }
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Tuesday Night Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "tuesdaynightclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Tuesday Night Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "tuesdaynightclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <p>
                          {!this.state.wednesdaymorningclockin
                            ? "not working"
                            : this.state.wednesdaymorningclockin}
                        </p>
                        <p>
                          {!this.state.wednesdaymorningclockout
                            ? null
                            : !this.state.wednesdaymorningclockin
                              ? null
                              : `-${this.state.wednesdaymorningclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() =>
                            this.handleOpen("wednesdaymorningopen")
                          }
                        />
                        <Dialog
                          open={this.state.wednesdaymorningopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("wednesdaymorningopen")
                              }
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("wednesdaymorning")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("wednesdaymorningopen")
                              }
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("wednesdaymorningopen")
                          }
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Wednesday Morning Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "wednesdaymorningclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Wednesday Morning Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "wednesdaymorningclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                      <div className="morning-shift">
                        <p>
                          {!this.state.wednesdaynightclockin
                            ? "not working"
                            : this.state.wednesdaynightclockin}
                        </p>
                        <p>
                          {!this.state.wednesdaynightclockout
                            ? null
                            : !this.state.wednesdaynightclockin
                              ? null
                              : `-${this.state.wednesdaynightclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("wednesdaynightopen")}
                        />
                        <Dialog
                          open={this.state.wednesdaynightopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("wednesdaynightopen")
                              }
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("wednesdaynight")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("wednesdaynightopen")
                              }
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("wednesdaynightopen")
                          }
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Wednesday Night Clock In"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "wednesdaynightclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Wednesday Night Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "wednesdaynightclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <p>
                          {!this.state.thursdaymorningclockin
                            ? "not working"
                            : this.state.thursdaymorningclockin}
                        </p>
                        <p>
                          {!this.state.thursdaymorningclockout
                            ? null
                            : !this.state.thursdaymorningclockin
                              ? null
                              : `-${this.state.thursdaymorningclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("thursdaymorningopen")}
                        />
                        <Dialog
                          open={this.state.thursdaymorningopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("thursdaymorningopen")
                              }
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("thursdaymorning")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("thursdaymorningopen")
                              }
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("thursdaymorningopen")
                          }
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Thursday Morning Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "thursdaymorningclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Thursday Morning Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "thursdaymorningclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                      <div className="morning-shift">
                        <p>
                          {!this.state.thursdaynightclockin
                            ? "not working"
                            : this.state.thursdaynightclockin}
                        </p>
                        <p>
                          {!this.state.thursdaynightclockout
                            ? null
                            : !this.state.thursdaynightclockin
                              ? null
                              : `-${this.state.thursdaynightclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("thursdaynightopen")}
                        />
                        <Dialog
                          open={this.state.thursdaynightopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("thursdaynightopen")
                              }
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("thursdaynight")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("thursdaynightopen")
                              }
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("thursdaynightopen")
                          }
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Thursday Night Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "thursdaynightclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Thursday Night Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "thursdaynightclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <p>
                          {!this.state.fridaymorningclockin
                            ? "not working"
                            : this.state.fridaymorningclockin}
                        </p>
                        <p>
                          {!this.state.fridaymorningclockout
                            ? null
                            : !this.state.fridaymorningclockin
                              ? null
                              : `-${this.state.fridaymorningclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("fridaymorningopen")}
                        />
                        <Dialog
                          open={this.state.fridaymorningopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("fridaymorningopen")
                              }
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("fridaymorning")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("fridaymorningopen")
                              }
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("fridaymorningopen")
                          }
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Friday Morning Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "fridaymorningclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Friday Morning Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "fridaymorningclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                      <div className="morning-shift">
                        <p>
                          {!this.state.fridaynightclockin
                            ? "not working"
                            : this.state.fridaynightclockin}
                        </p>
                        <p>
                          {!this.state.fridaynightclockout
                            ? null
                            : !this.state.fridaynightclockin
                              ? null
                              : `-${this.state.fridaynightclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("fridaynightopen")}
                        />
                        <Dialog
                          open={this.state.fridaynightopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() => this.handleOpen("fridaynightopen")}
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("fridaynight")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() => this.handleOpen("fridaynightopen")}
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("fridaynightopen")
                          }
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Friday Night Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "fridaynightclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Friday Night Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "fridaynightclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <p>
                          {!this.state.saturdaymorningclockin
                            ? "not working"
                            : this.state.saturdaymorningclockin}
                        </p>
                        <p>
                          {!this.state.saturdaymorningclockout
                            ? null
                            : !this.state.saturdaymorningclockin
                              ? null
                              : `-${this.state.saturdaymorningclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("saturdaymorningopen")}
                        />
                        <Dialog
                          open={this.state.saturdaymorningopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("saturdaymorningopen")
                              }
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("saturdaymorning")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("saturdaymorningopen")
                              }
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("saturdaymorningopen")
                          }
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Saturday Morning Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "saturdaymorningclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Saturday Morning Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "saturdaymorningclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                      <div className="morning-shift">
                        <p>
                          {!this.state.saturdaynightclockin
                            ? "not working"
                            : this.state.saturdaynightclockin}
                        </p>
                        <p>
                          {!this.state.saturdaynightclockout
                            ? null
                            : !this.state.saturdaynightclockin
                              ? null
                              : `-${this.state.saturdaynightclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("saturdaynightopen")}
                        />
                        <Dialog
                          open={this.state.saturdaynightopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("saturdaynightopen")
                              }
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("saturdaynight")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("saturdaynightopen")
                              }
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("saturdaynightopen")
                          }
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Saturday Night Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "saturdaynightclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Saturday Night Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "saturdaynightclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                    </div>
                    <div className="employee-schedule">
                      <div className="morning-shift">
                        <p>
                          {!this.state.sundaymorningclockin
                            ? "not working"
                            : this.state.sundaymorningclockin}
                        </p>
                        <p>
                          {!this.state.sundaymorningclockout
                            ? null
                            : !this.state.sundaymorningclockin
                              ? null
                              : `-${this.state.sundaymorningclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("sundaymorningopen")}
                        />
                        <Dialog
                          open={this.state.sundaymorningopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("sundaymorningopen")
                              }
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("sundaymorning")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() =>
                                this.handleOpen("sundaymorningopen")
                              }
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("sundaymorningopen")
                          }
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Sunday Morning Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "sundaymorningclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Sunday Morning Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "sundaymorningclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
                      </div>
                      <div className="morning-shift">
                        <p>
                          {!this.state.sundaynightclockin
                            ? "not working"
                            : this.state.sundaynightclockin}
                        </p>
                        <p>
                          {!this.state.sundaynightclockout
                            ? null
                            : !this.state.sundaynightclockin
                              ? null
                              : `-${this.state.sundaynightclockout}`}
                        </p>
                        <div
                          className="right-arrow-small"
                          onClick={() => this.handleOpen("sundaynightopen")}
                        />
                        <Dialog
                          open={this.state.sundaynightopen}
                          actions={[
                            <FlatButton
                              label="Cancel"
                              primary={true}
                              onClick={() => this.handleOpen("sundaynightopen")}
                            />,
                            <FlatButton
                              label="Clear"
                              primary={true}
                              onClick={() => this.handleOff("sundaynight")}
                            />,
                            <FlatButton
                              label="Submit"
                              primary={true}
                              onClick={() => this.handleOpen("sundaynightopen")}
                            />
                          ]}
                          onRequestClose={() =>
                            this.handleOpen("sundaynightopen")
                          }
                        >
                          <TimePicker
                            format="ampm"
                            placeholder="Sunday Night Clock in"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "sundaynightclockin",
                                newDate
                              );
                            }}
                          />
                          <TimePicker
                            format="ampm"
                            placeholder="Sunday Night Clock Out"
                            onChange={(blank, newDate) => {
                              this.handleStateUpdate(
                                "sundaynightclockout",
                                newDate
                              );
                            }}
                          />
                        </Dialog>
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
