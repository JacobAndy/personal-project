import React, { Component } from "react";
import { connect } from "react-redux";
import "../Calendar.css";
import Dialog from "material-ui/Dialog";
import TimePicker from "material-ui/TimePicker";
import FlatButton from "material-ui/FlatButton";
import Popover, { PopoverAnimationFromTop } from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import WeekOf from "../../week-of/WeekOf";
import RaisedButton from "material-ui/RaisedButton";
import _ from "lodash.map";
import filt from "lodash.filter";
import SelectField from "material-ui/SelectField";
import { getCompany, updateStateCompId } from "../../../../ducks/company";
import {
  getEmployees,
  handleOpen,
  handleStateUpdate,
  handleOff,
  createSchedule,
  updateschedule,
  deleteWeek,
  getWeekOf,
  companyWeekOf,
  createCompanyWeekOf,
  updateCompanyWeekOf,
  deleteWeekWithCompanyId,
  getEmployeesByCompanyId
} from "../../../../ducks/schedulesreducer";
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from "constants";

let employeeUserMappedStyle = {
  backgroundColor: "#90CAF9",
  width: "230px"
};
let employeeUserMappedStyles = {
  backgroundColor: "#90CAF9",
  width: "230px"
  // width: "380px"
};

function randomColor() {
  let one = Math.random() * 256;
  let two = Math.random() * 256;
  let three = Math.random() * 256;
  return `rgb(${one}, ${two}, ${three}, 0.5)`;
  
}
class MappedSchedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: randomColor()
    };
  }
  handlePopOverOpen = event => {
    this.setState({ popover: true, anchorEl: event.currentTarget });
  };
  handlePopOverClose = () => {
    this.setState({ popover: false });
  };
  handleChange(val) {
    this.setState({ selectedCompany: val });
  }
  

  render() {
    // console.log(this.state);
    console.log(this.props);
    console.log(randomColor);
    let {
      handleOpen,
      handleStateUpdate,
      handleOff,
      userinfo,
      person,
      i,
      manager
    } = this.props;
    console.log(manager);
    return (
      <div className="employee-display">
        <div className="individual">
          <div
            className="employee"
            onClick={this.handlePopOverOpen}
            style={{ backgroundColor: this.state.color}}
          >
            <h4 className="employee-name">{person.full_name}</h4>
            <div className="down-arrow-user" />
            <div className="popover">
              <Popover
                className="user-info-popover"
                style={employeeUserMappedStyle}
                open={this.state.popover}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "bottom"
                }}
                targetOrigin={{ horizontal: "right", vertical: "top" }}
                onRequestClose={this.handlePopOverClose}
                animation={PopoverAnimationFromTop}
              >
                <Menu
                  className="user-info-popover"
                  backgroundColor="#90CAF9"
                  style={employeeUserMappedStyle}
                >
                  <MenuItem
                    style={employeeUserMappedStyles}
                    primaryText={`Email: ${person.email}`}
                  />
                  <MenuItem
                    style={employeeUserMappedStyles}
                    primaryText={`Number: ${person.phone_number}`}
                  />
                  <MenuItem
                    style={employeeUserMappedStyles}
                    primaryText={`Address: ${person.address}`}
                  />
                  <MenuItem
                    style={employeeUserMappedStyles}
                    primaryText={`emergency: ${person.emergency_contact}`}
                  />
                </Menu>
              </Popover>
            </div>
          </div>

          <div className="schedule">
            <div className="employee-schedule">
              <div
                className="morning-shift-monday"
                onClick={() => handleOpen("mondaymorningopen", i)}
              >
                {!person.schedule[1].mondaymorningclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[1].mondaymorningclockin &&
                !person.schedule[1].mondaymorningclockout ? (
                  <div className="mondayMorningDayWorking">
                    <p className="mondayCal">
                      {person.schedule[1].mondaymorningclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[1].mondaymorningclockout ? null : (
                  <div className="mondayMorningDayWorking">
                    <p className="mondayCal">
                      {person.schedule[1].mondaymorningclockin}-{
                        person.schedule[1].mondaymorningclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-monday" />
                    <Dialog
                      open={person.mondaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("mondaymorningopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 1, "mondaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("mondaymorningopen", i)}
                        />
                      ]}
                      onRequestClose={() => handleOpen("mondaymorningopen", i)}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Monday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            1,
                            "mondaymorningclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Monday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            1,
                            "mondaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
              <div
                className="night-shift-monday"
                onClick={() => handleOpen("mondaynightopen", i)}
              >
                {!person.schedule[2].mondaynightclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[2].mondaynightclockin &&
                !person.schedule[2].mondaynightclockout ? (
                  <div className="mondayMorningDayWorking">
                    <p className="mondayCal">
                      {person.schedule[2].mondaynightclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[2].mondaynightclockout ? null : (
                  <div className="mondayMorningDayWorking">
                    <p className="mondayCal">
                      {person.schedule[2].mondaynightclockin}-{
                        person.schedule[2].mondaynightclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-monday" />
                    <Dialog
                      open={person.mondaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("mondaynightopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 2, "mondaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("mondaynightopen", i)}
                        />
                      ]}
                      onRequestClose={() => handleOpen("mondaynightopen", i)}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Monday Night Clock In"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            2,
                            "mondaynightclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Monday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            2,
                            "mondaynightclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="employee-schedule">
              <div
                className="morning-shift-tuesday"
                onClick={() => handleOpen("tuesdaymorningopen", i)}
              >
                {!person.schedule[3].tuesdaymorningclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[3].tuesdaymorningclockin &&
                !person.schedule[3].tuesdaymorningclockout ? (
                  <div className="tuesdayMorningDayWorking">
                    <p className="tuesdayCal">
                      {person.schedule[3].tuesdaymorningclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[3].tuesdaymorningclockout ? null : (
                  <div className="tuesdayMorningDayWorking">
                    <p className="tuesdayCal">
                      {person.schedule[3].tuesdaymorningclockin}-{
                        person.schedule[3].tuesdaymorningclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-tuesday" />
                    <Dialog
                      open={person.tuesdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("tuesdaymorningopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 3, "tuesdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("tuesdaymorningopen", i)}
                        />
                      ]}
                      onRequestClose={() => handleOpen("tuesdaymorningopen", i)}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Tuesday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            3,
                            "tuesdaymorningclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Tuesday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            3,
                            "tuesdaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
              <div
                className="night-shift-tuesday"
                onClick={() => handleOpen("tuesdaynightopen", i)}
              >
                {!person.schedule[4].tuesdaynightclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[4].tuesdaynightclockin &&
                !person.schedule[4].tuesdaynightclockout ? (
                  <div className="tuesdayMorningDayWorking">
                    <p className="tuesdayCal">
                      {person.schedule[4].tuesdaynightclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[4].tuesdaynightclockout ? null : (
                  <div className="tuesdayMorningDayWorking">
                    <p className="tuesdayCal">
                      {person.schedule[4].tuesdaynightclockin}-{
                        person.schedule[4].tuesdaynightclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-tuesday" />

                    <Dialog
                      open={person.tuesdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("tuesdaynightopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 4, "tuesdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("tuesdaynightopen", i)}
                        />
                      ]}
                      onRequestClose={() => handleOpen("tuesdaynightopen", i)}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Tuesday Night Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            4,
                            "tuesdaynightclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Tuesday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            4,
                            "tuesdaynightclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="employee-schedule">
              <div
                className="morning-shift-wednesday"
                onClick={() => handleOpen("wednesdaymorningopen", i)}
              >
                {!person.schedule[5].wednesdaymorningclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[5].wednesdaymorningclockin &&
                !person.schedule[5].wednesdaymorningclockout ? (
                  <div className="wednesdayMorningDayWorking">
                    <p className="wednesdayCal">
                      {person.schedule[5].wednesdaymorningclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[5].wednesdaymorningclockout ? null : (
                  <div className="wednesdayMorningDayWorking">
                    <p className="wednesdayCal">
                      {person.schedule[5].wednesdaymorningclockin}-{
                        person.schedule[5].wednesdaymorningclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-wednesday" />
                    <Dialog
                      open={person.wednesdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("wednesdaymorningopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 5, "wednesdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("wednesdaymorningopen", i)}
                        />
                      ]}
                      onRequestClose={() =>
                        handleOpen("wednesdaymorningopen", i)
                      }
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Wednesday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            5,
                            "wednesdaymorningclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Wednesday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            5,
                            "wednesdaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
              <div
                className="night-shift-wednesday"
                onClick={() => handleOpen("wednesdaynightopen", i)}
              >
                {!person.schedule[6].wednesdaynightclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[6].wednesdaynightclockin &&
                !person.schedule[6].wednesdaynightclockout ? (
                  <div className="wednesdayMorningDayWorking">
                    <p className="wednesdayCal">
                      {person.schedule[6].wednesdaynightclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[6].wednesdaynightclockout ? null : (
                  <div className="wednesdayMorningDayWorking">
                    <p className="wednesdayCal">
                      {person.schedule[6].wednesdaynightclockin}-{
                        person.schedule[6].wednesdaynightclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-wednesday" />
                    <Dialog
                      open={person.wednesdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("wednesdaynightopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 6, "wednesdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("wednesdaynightopen", i)}
                        />
                      ]}
                      onRequestClose={() => handleOpen("wednesdaynightopen", i)}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Wednesday Night Clock In"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            6,
                            "wednesdaynightclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Wednesday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            6,
                            "wednesdaynightclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="employee-schedule">
              <div
                className="morning-shift-thursday"
                onClick={() => handleOpen("thursdaymorningopen", i)}
              >
                {!person.schedule[7].thursdaymorningclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[7].thursdaymorningclockin &&
                !person.schedule[7].thursdaymorningclockout ? (
                  <div className="thursdayMorningDayWorking">
                    <p className="thursdayCal">
                      {person.schedule[7].thursdaymorningclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[7].thursdaymorningclockout ? null : (
                  <div className="thursdayMorningDayWorking">
                    <p className="thursdayCal">
                      {person.schedule[7].thursdaymorningclockin}-{
                        person.schedule[7].thursdaymorningclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-thursday" />
                    <Dialog
                      open={person.thursdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("thursdaymorningopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 7, "thursdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("thursdaymorningopen", i)}
                        />
                      ]}
                      onRequestClose={() =>
                        handleOpen("thursdaymorningopen", i)
                      }
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Thursday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            7,
                            "thursdaymorningclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Thursday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            7,
                            "thursdaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
              <div
                className="night-shift-thursday"
                onClick={() => handleOpen("thursdaynightopen", i)}
              >
                {!person.schedule[8].thursdaynightclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[8].thursdaynightclockin &&
                !person.schedule[8].thursdaynightclockout ? (
                  <div className="thursdayMorningDayWorking">
                    <p className="thursdayCal">
                      {person.schedule[8].thursdaynightclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[8].thursdaynightclockout ? null : (
                  <div className="thursdayMorningDayWorking">
                    <p className="thursdayCal">
                      {person.schedule[8].thursdaynightclockin}-{
                        person.schedule[8].thursdaynightclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-thursday" />
                    <Dialog
                      open={person.thursdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("thursdaynightopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 8, "thursdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("thursdaynightopen", i)}
                        />
                      ]}
                      onRequestClose={() => handleOpen("thursdaynightopen", i)}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Thursday Night Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            8,
                            "thursdaynightclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Thursday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            8,
                            "thursdaynightclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="employee-schedule">
              <div
                className="morning-shift-friday"
                onClick={() => handleOpen("fridaymorningopen", i)}
              >
                {!person.schedule[9].fridaymorningclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[9].fridaymorningclockin &&
                !person.schedule[9].fridaymorningclockout ? (
                  <div className="fridayMorningDayWorking">
                    <p className="fridayCal">
                      {person.schedule[9].fridaymorningclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[9].fridaymorningclockout ? null : (
                  <div className="fridayMorningDayWorking">
                    <p className="fridayCal">
                      {person.schedule[9].fridaymorningclockin}-{
                        person.schedule[9].fridaymorningclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-friday" />
                    <Dialog
                      open={person.fridaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("fridaymorningopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 9, "fridaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("fridaymorningopen", i)}
                        />
                      ]}
                      onRequestClose={() => handleOpen("fridaymorningopen", i)}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Friday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            9,
                            "fridaymorningclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Friday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            9,
                            "fridaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
              <div
                className="night-shift-friday"
                onClick={() => handleOpen("fridaynightopen", i)}
              >
                {!person.schedule[10].fridaynightclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[10].fridaynightclockin &&
                !person.schedule[10].fridaynightclockout ? (
                  <div className="fridayMorningDayWorking">
                    <p className="fridayCal">
                      {person.schedule[10].fridaynightclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[10].fridaynightclockout ? null : (
                  <div className="fridayMorningDayWorking">
                    <p className="fridayCal">
                      {person.schedule[10].fridaynightclockin}-{
                        person.schedule[10].fridaynightclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-friday" />
                    <Dialog
                      open={person.fridaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("fridaynightopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 10, "fridaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("fridaynightopen", i)}
                        />
                      ]}
                      onRequestClose={() => handleOpen("fridaynightopen", i)}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Friday Night Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            10,
                            "fridaynightclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Friday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            10,
                            "fridaynightclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="employee-schedule">
              <div
                className="morning-shift-saturday"
                onClick={() => handleOpen("saturdaymorningopen", i)}
              >
                {!person.schedule[11].saturdaymorningclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[11].saturdaymorningclockin &&
                !person.schedule[11].saturdaymorningclockout ? (
                  <div className="saturdayMorningDayWorking">
                    <p className="saturdayCal">
                      {person.schedule[11].saturdaymorningclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[11].saturdaymorningclockout ? null : (
                  <div className="saturdayMorningDayWorking">
                    <p className="saturdayCal">
                      {person.schedule[11].saturdaymorningclockin}-{
                        person.schedule[11].saturdaymorningclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-saturday" />
                    <Dialog
                      open={person.saturdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("saturdaymorningopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 11, "saturdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("saturdaymorningopen", i)}
                        />
                      ]}
                      onRequestClose={() =>
                        handleOpen("saturdaymorningopen", i)
                      }
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Saturday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            11,
                            "saturdaymorningclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Saturday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            11,
                            "saturdaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
              <div
                className="night-shift-saturday"
                onClick={() => handleOpen("saturdaynightopen", i)}
              >
                {!person.schedule[12].saturdaynightclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[12].saturdaynightclockin &&
                !person.schedule[12].saturdaynightclockout ? (
                  <div className="saturdayMorningDayWorking">
                    <p className="saturdayCal">
                      {person.schedule[12].saturdaynightclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[12].saturdaynightclockout ? null : (
                  <div className="saturdayMorningDayWorking">
                    <p className="saturdayCal">
                      {person.schedule[12].saturdaynightclockin}-{
                        person.schedule[12].saturdaynightclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-saturday" />
                    <Dialog
                      open={person.saturdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("saturdaynightopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 12, "saturdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("saturdaynightopen", i)}
                        />
                      ]}
                      onRequestClose={() => handleOpen("saturdaynightopen", i)}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Saturday Night Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            12,
                            "saturdaynightclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Saturday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            12,
                            "saturdaynightclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="employee-schedule">
              <div
                className="morning-shift-sunday"
                onClick={() => handleOpen("sundaymorningopen", i)}
              >
                {!person.schedule[13].sundaymorningclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[13].sundaymorningclockin &&
                !person.schedule[13].sundaymorningclockout ? (
                  <div className="sundayMorningDayWorking">
                    <p className="sundayCal">
                      {person.schedule[13].sundaymorningclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[13].sundaymorningclockout ? null : (
                  <div className="sundayMorningDayWorking">
                    <p className="sundayCal">
                      {person.schedule[13].sundaymorningclockin}-{
                        person.schedule[13].sundaymorningclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-sunday" />
                    <Dialog
                      open={person.sundaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("sundaymorningopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 13, "sundaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("sundaymorningopen", i)}
                        />
                      ]}
                      onRequestClose={() => handleOpen("sundaymorningopen", i)}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Sunday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            13,
                            "sundaymorningclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Sunday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            13,
                            "sundaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
              <div
                className="night-shift-sunday"
                onClick={() => handleOpen("sundaynightopen", i)}
              >
                {!person.schedule[14].sundaynightclockin ? (
                  <div className="morningDayNotWorking">
                    <p>not working</p>
                  </div>
                ) : person.schedule[14].sundaynightclockin &&
                !person.schedule[14].sundaynightclockout ? (
                  <div className="sundayMorningDayWorking">
                    <p className="sundayCal">
                      {person.schedule[14].sundaynightclockin}
                    </p>
                  </div>
                ) : null}

                {!person.schedule[14].sundaynightclockout ? null : (
                  <div className="sundayMorningDayWorking">
                    <p className="sundayCal">
                      {person.schedule[14].sundaynightclockin}-{
                        person.schedule[14].sundaynightclockout
                      }
                    </p>
                  </div>
                )}

                {manager ? (
                  <div>
                    <div className="right-arrow-small-sunday" />
                    <Dialog
                      open={person.sundaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("sundaynightopen", i)}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(i, 14, "sundaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("sundaynightopen", i)}
                        />
                      ]}
                      onRequestClose={() => handleOpen("sundaynightopen", i)}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Sunday Night Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            14,
                            "sundaynightclockin",
                            newDate
                          );
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Sunday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            i,
                            14,
                            "sundaynightclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    //     }
    //   );
    // }
  }
}

let mapStateToProps = state => {
  return {
    ...state.schedulesreducer,
    user_id: state.users.user_id,
    ...state.company
  };
};

export default connect(mapStateToProps, {
  handleOpen,
  handleStateUpdate,
  handleOff,
  createSchedule,
  getEmployees,
  updateschedule,
  deleteWeek,
  getWeekOf,
  getCompany,
  companyWeekOf,
  updateStateCompId,
  createCompanyWeekOf,
  updateCompanyWeekOf,
  deleteWeekWithCompanyId,
  getEmployeesByCompanyId
})(MappedSchedules);
