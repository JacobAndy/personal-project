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

import {
  getEmployees,
  handleOpen,
  handleStateUpdate,
  handleOff,
  createSchedule,
  updateschedule,
  deleteWeek,
  getWeekOf
} from "../../../../ducks/schedulesreducer";

class Schedules extends Component {
  constructor() {
    super();
    this.state = {
      popover: false
    };
  }

  handlePopOverOpen = event => {
    this.setState({ popover: true, anchorEl: event.currentTarget });
  };
  handlePopOverClose = () => {
    this.setState({ popover: false });
  };

  render() {
    let { schedules } = this.state;
    let {
      handleOpen,
      handleStateUpdate,
      handleOff,
      userinfo,
      mondaymorningopen,
      mondaynightopen,
      tuesdaymorningopen,
      tuesdaynightopen,
      wednesdaymorningopen,
      wednesdaynightopen,
      thursdaymorningopen,
      thursdaynightopen,
      fridaymorningopen,
      fridaynightopen,
      saturdaymorningopen,
      saturdaynightopen,
      sundaymorningopen,
      sundaynightopen
    } = this.props;
    console.log(this.state);
    // let { schedule } = this.props.schedule;
    console.log(this.props);
    let employeeInfoAndSchedules;
    if (this.props.adminSchedules.length === 0) {
      this.props.getEmployees(this.props.user_id);
    } else {
      employeeInfoAndSchedules = _(this.props.adminSchedules, (e, i) => {
        return (
          <div className="employee-display">
            <div className="individual">
              <div className="employee">
                <h4 className="employee-name">{e.full_name}</h4>
                <div
                  className="down-arrow-user"
                  onClick={this.handlePopOverOpen}
                />
                <div className="popover">
                  <Popover
                    open={this.state.popover}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    targetOrigin={{ horizontal: "right", vertical: "top" }}
                    onRequestClose={this.handlePopOverClose}
                    animation={PopoverAnimationFromTop}
                  >
                    <Menu>
                      <MenuItem primaryText={`Email: ${e.email}`} />
                      <MenuItem primaryText={`Number: ${e.phone_number}`} />
                      <MenuItem primaryText={`Address: ${e.address}`} />
                      <MenuItem
                        primaryText={`emergency: ${e.emergency_contact}`}
                      />
                    </Menu>
                  </Popover>
                </div>
              </div>
              <div className="schedule">
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[1].mondaymorningclockin
                        ? "not working"
                        : e.schedule[1].mondaymorningclockin}
                    </p>
                    <p>
                      {!e.schedule[1].mondaymorningclockout
                        ? null
                        : `-${e.schedule[1].mondaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("mondaymorningopen")}
                    />
                    <Dialog
                      open={mondaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("mondaymornopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(1, "mondaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("mondaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("mondaymorningopen")}
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
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[2].mondaynightclockin
                        ? "not working"
                        : e.schedule[2].mondaynightclockin}
                    </p>
                    <p>
                      {!e.schedule[2].mondaynightclockout
                        ? null
                        : !e.schedule[2].mondaynightclockout
                          ? null
                          : `-${e.schedule[2].mondaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("mondaynightopen")}
                    />
                    <Dialog
                      open={mondaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("mondaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(2, "mondaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("mondaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("mondaynightopen")}
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
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[3].tuesdaymorningclockin
                        ? "not working"
                        : e.schedule[3].tuesdaymorningclockin}
                    </p>
                    <p>
                      {!e.schedule[3].tuesdaymorningclockout
                        ? null
                        : !e.schedule[3].tuesdaymorningclockout
                          ? null
                          : `-${e.schedule[3].tuesdaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("tuesdaymorningopen")}
                    />
                    <Dialog
                      open={tuesdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("tuesdaymornopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(3, "tuesdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("tuesdaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("tuesdaymorningopen")}
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
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[4].tuesdaynightclockin
                        ? "not working"
                        : e.schedule[4].tuesdaynightclockin}
                    </p>
                    <p>
                      {!e.schedule[4].tuesdaynightclockout
                        ? null
                        : !e.schedule[4].tuesdaynightclockout
                          ? null
                          : `-${e.schedule[4].tuesdaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("tuesdaynightopen")}
                    />

                    <Dialog
                      open={tuesdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("tuesdaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(4, "tuesdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("tuesdaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("tuesdaynightopen")}
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
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[5].wednesdaymorningclockin
                        ? "not working"
                        : e.schedule[5].wednesdaymorningclockin}
                    </p>
                    <p>
                      {!e.schedule[5].wednesdaymorningclockout
                        ? null
                        : !e.schedule[5].wednesdaymorningclockout
                          ? null
                          : `-${e.schedule[5].wednesdaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("wednesdaymorningopen")}
                    />
                    <Dialog
                      open={wednesdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("wednesdaymorningopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(5, "wednesdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("wednesdaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("wednesdaymorningopen")}
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
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[6].wednesdaynightclockin
                        ? "not working"
                        : e.schedule[6].wednesdaynightclockin}
                    </p>
                    <p>
                      {!e.schedule[6].wednesdaynightclockout
                        ? null
                        : !e.schedule[6].wednesdaynightclockout
                          ? null
                          : `-${e.schedule[6].wednesdaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("wednesdaynightopen")}
                    />
                    <Dialog
                      open={wednesdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("wednesdaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(6, "wednesdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("wednesdaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("wednesdaynightopen")}
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
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[7].thursdaymorningclockin
                        ? "not working"
                        : e.schedule[7].thursdaymorningclockin}
                    </p>
                    <p>
                      {!e.schedule[7].thursdaymorningclockout
                        ? null
                        : !e.schedule[7].thursdaymorningclockout
                          ? null
                          : `-${e.schedule[7].thursdaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("thursdaymorningopen")}
                    />
                    <Dialog
                      open={thursdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("thursdaymorningopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(7, "thursdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("thursdaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("thursdaymorningopen")}
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
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[8].thursdaynightclockin
                        ? "not working"
                        : e.schedule[8].thursdaynightclockin}
                    </p>
                    <p>
                      {!e.schedule[8].thursdaynightclockout
                        ? null
                        : !e.schedule[8].thursdaynightclockout
                          ? null
                          : `-${e.schedule[8].thursdaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("thursdaynightopen")}
                    />
                    <Dialog
                      open={thursdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("thursdaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(8, "thursdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("thursdaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("thursdaynightopen")}
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
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[9].fridaymorningclockin
                        ? "not working"
                        : e.schedule[9].fridaymorningclockin}
                    </p>
                    <p>
                      {!e.schedule[9].fridaymorningclockout
                        ? null
                        : !e.schedule[9].fridaymorningclockout
                          ? null
                          : `-${e.schedule[9].fridaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("fridaymorningopen")}
                    />
                    <Dialog
                      open={fridaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("fridaymorningopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(9, "fridaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("fridaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("fridaymorningopen")}
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
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[10].fridaynightclockin
                        ? "not working"
                        : e.schedule[10].fridaynightclockin}
                    </p>
                    <p>
                      {!e.schedule[10].fridaynightclockout
                        ? null
                        : !e.schedule[10].fridaynightclockout
                          ? null
                          : `-${e.schedule[10].fridaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("fridaynightopen")}
                    />
                    <Dialog
                      open={fridaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("fridaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(10, "fridaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("fridaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("fridaynightopen")}
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
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[11].saturdaymorningclockin
                        ? "not working"
                        : e.schedule[11].saturdaymorningclockin}
                    </p>
                    <p>
                      {!e.schedule[11].saturdaymorningclockout
                        ? null
                        : !e.schedule[11].saturdaymorningclockout
                          ? null
                          : `-${e.schedule[11].saturdaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("saturdaymorningopen")}
                    />
                    <Dialog
                      open={saturdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("saturdaymorningopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(11, "saturdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("saturdaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("saturdaymorningopen")}
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
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[12].saturdaynightclockin
                        ? "not working"
                        : e.schedule[12].saturdaynightclockin}
                    </p>
                    <p>
                      {!e.schedule[12].saturdaynightclockout
                        ? null
                        : !e.schedule[12].saturdaynightclockout
                          ? null
                          : `-${e.schedule[12].saturdaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("saturdaynightopen")}
                    />
                    <Dialog
                      open={saturdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("saturdaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(12, "saturdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("saturdaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("saturdaynightopen")}
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
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[13].sundaymorningclockin
                        ? "not working"
                        : e.schedule[13].sundaymorningclockin}
                    </p>
                    <p>
                      {!e.schedule[13].sundaymorningclockout
                        ? null
                        : !e.schedule[13].sundaymorningclockout
                          ? null
                          : `-${e.schedule[13].sundaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("sundaymorningopen")}
                    />
                    <Dialog
                      open={sundaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("sundaymorningopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(13, "sundaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("sundaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("sundaymorningopen")}
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
                  <div className="morning-shift">
                    <p>
                      {!e.schedule[14].sundaynightclockin
                        ? "not working"
                        : e.schedule[14].sundaynightclockin}
                    </p>
                    <p>
                      {!e.schedule[14].sundaynightclockout
                        ? null
                        : !e.schedule[14].sundaynightclockout
                          ? null
                          : `-${e.schedule[14].sundaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("sundaynightopen")}
                    />
                    <Dialog
                      open={sundaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("sundaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(14, "sundaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("sundaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("sundaynightopen")}
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
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <RaisedButton
          onClick={() => {
            this.props.deleteWeek(this.props.adminSchedules, this.props.weekOf);
          }}
          className="clear-schedule"
          label="Clear Week"
          backgroundColor="pink"
          color="white"
        />
        <RaisedButton
          onClick={() => {
            console.log(this.props);
            {
              !this.props.update
                ? this.props.createSchedule(
                    this.props.user_id,
                    this.props.adminSchedules
                  )
                : this.props.updateschedule(
                    this.props.weekOf,
                    this.props.user_id,
                    this.props.adminSchedules
                  );
            }
          }}
          className="post-schedule"
          label="Post Schedule"
          backgroundColor="green"
          color="white"
        />
        <WeekOf />
        <div className="calendar">
          <div className="open-shift">
            <h5>Open Shifts</h5>
            <div className="down-arrow" />
          </div>
          <div className="date">
            <div className="date-info">
              <h4>Monday</h4>
              <div className="down-arrow-date0 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4>Tuesday</h4>
              <div className="down-arrow-date1 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4>Wednesday</h4>
              <div className="down-arrow-date2 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4>Thursday</h4>
              <div className="down-arrow-date3 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4>Friday</h4>
              <div className="down-arrow-date4 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4>Saturday</h4>
              <div className="down-arrow-date5 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4>Sunday</h4>
              <div className="down-arrow-date6 down-arrow-date" />
            </div>
          </div>
          {employeeInfoAndSchedules}
          {/* <div className="employee-display">
            <div className="individual">
              <div className="employee">
                <h4 className="employee-name">Jacob Anderson</h4>
                <div
                  className="down-arrow-user"
                  onClick={this.handlePopOverOpen}
                />
                <div className="popover">
                  <Popover
                    open={this.state.popover}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    targetOrigin={{ horizontal: "right", vertical: "top" }}
                    onRequestClose={this.handlePopOverClose}
                    animation={PopoverAnimationFromTop}
                  >
                    <Menu>
                      <MenuItem primaryText="Email" />
                      <MenuItem primaryText="Phone Number" />
                      <MenuItem primaryText="Address" />
                      <MenuItem primaryText="Emergency Contact" />
                    </Menu>
                  </Popover>
                </div>
              </div>
              <div className="schedule">
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!schedule[1].mondaymorningclockin
                        ? "not working"
                        : schedule[1].mondaymorningclockin}
                    </p>
                    <p>
                      {!schedule[1].mondaymorningclockout
                        ? null
                        : !schedule[1].mondaymorningclockin
                          ? null
                          : `-${schedule[1].mondaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("mondaymorningopen")}
                    />
                    <Dialog
                      open={mondaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("mondaymornopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(1, "mondaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("mondaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("mondaymorningopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Monday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(1, "mondaymorningclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Monday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            1,
                            "mondaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!schedule[2].mondaynightclockin
                        ? "not working"
                        : schedule[2].mondaynightclockin}
                    </p>
                    <p>
                      {!schedule[2].mondaynightclockout
                        ? null
                        : !schedule[2].mondaynightclockin
                          ? null
                          : `-${schedule[2].mondaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("mondaynightopen")}
                    />
                    <Dialog
                      open={mondaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("mondaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(2, "mondaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("mondaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("mondaynightopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Monday Night Clock In"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(2, "mondaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Monday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(2, "mondaynightclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!schedule[3].tuesdaymorningclockin
                        ? "not working"
                        : schedule[3].tuesdaymorningclockin}
                    </p>
                    <p>
                      {!schedule[3].tuesdaymorningclockout
                        ? null
                        : !schedule[3].tuesdaymorningclockin
                          ? null
                          : `-${schedule[3].tuesdaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("tuesdaymorningopen")}
                    />
                    <Dialog
                      open={tuesdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("tuesdaymornopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(3, "tuesdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("tuesdaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("tuesdaymorningopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Tuesday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
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
                            3,
                            "tuesdaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!schedule[4].tuesdaynightclockin
                        ? "not working"
                        : schedule[4].tuesdaynightclockin}
                    </p>
                    <p>
                      {!schedule[4].tuesdaynightclockout
                        ? null
                        : !schedule[4].tuesdaynightclockin
                          ? null
                          : `-${schedule[4].tuesdaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("tuesdaynightopen")}
                    />

                    <Dialog
                      open={tuesdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("tuesdaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(4, "tuesdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("tuesdaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("tuesdaynightopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Tuesday Night Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(4, "tuesdaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Tuesday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(4, "tuesdaynightclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!schedule[5].wednesdaymorningclockin
                        ? "not working"
                        : schedule[5].wednesdaymorningclockin}
                    </p>
                    <p>
                      {!schedule[5].wednesdaymorningclockout
                        ? null
                        : !schedule[5].wednesdaymorningclockin
                          ? null
                          : `-${schedule[5].wednesdaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("wednesdaymorningopen")}
                    />
                    <Dialog
                      open={wednesdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("wednesdaymorningopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(5, "wednesdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("wednesdaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("wednesdaymorningopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Wednesday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
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
                            5,
                            "wednesdaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!schedule[6].wednesdaynightclockin
                        ? "not working"
                        : schedule[6].wednesdaynightclockin}
                    </p>
                    <p>
                      {!schedule[6].wednesdaynightclockout
                        ? null
                        : !schedule[6].wednesdaynightclockin
                          ? null
                          : `-${schedule[6].wednesdaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("wednesdaynightopen")}
                    />
                    <Dialog
                      open={wednesdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("wednesdaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(6, "wednesdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("wednesdaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("wednesdaynightopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Wednesday Night Clock In"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
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
                            6,
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
                      {!schedule[7].thursdaymorningclockin
                        ? "not working"
                        : schedule[7].thursdaymorningclockin}
                    </p>
                    <p>
                      {!schedule[7].thursdaymorningclockout
                        ? null
                        : !schedule[7].thursdaymorningclockin
                          ? null
                          : `-${schedule[7].thursdaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("thursdaymorningopen")}
                    />
                    <Dialog
                      open={thursdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("thursdaymorningopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(7, "thursdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("thursdaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("thursdaymorningopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Thursday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
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
                            7,
                            "thursdaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!schedule[8].thursdaynightclockin
                        ? "not working"
                        : schedule[8].thursdaynightclockin}
                    </p>
                    <p>
                      {!schedule[8].thursdaynightclockout
                        ? null
                        : !schedule[8].thursdaynightclockin
                          ? null
                          : `-${schedule[8].thursdaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("thursdaynightopen")}
                    />
                    <Dialog
                      open={thursdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("thursdaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(8, "thursdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("thursdaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("thursdaynightopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Thursday Night Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(8, "thursdaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Thursday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            8,
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
                      {!schedule[9].fridaymorningclockin
                        ? "not working"
                        : schedule[9].fridaymorningclockin}
                    </p>
                    <p>
                      {!schedule[9].fridaymorningclockout
                        ? null
                        : !schedule[9].fridaymorningclockin
                          ? null
                          : `-${schedule[9].fridaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("fridaymorningopen")}
                    />
                    <Dialog
                      open={fridaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("fridaymorningopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(9, "fridaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("fridaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("fridaymorningopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Friday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(9, "fridaymorningclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Friday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            9,
                            "fridaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!schedule[10].fridaynightclockin
                        ? "not working"
                        : schedule[10].fridaynightclockin}
                    </p>
                    <p>
                      {!schedule[10].fridaynightclockout
                        ? null
                        : !schedule[10].fridaynightclockin
                          ? null
                          : `-${schedule[10].fridaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("fridaynightopen")}
                    />
                    <Dialog
                      open={fridaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("fridaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(10, "fridaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("fridaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("fridaynightopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Friday Night Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(10, "fridaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Friday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(10, "fridaynightclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!schedule[11].saturdaymorningclockin
                        ? "not working"
                        : schedule[11].saturdaymorningclockin}
                    </p>
                    <p>
                      {!schedule[11].saturdaymorningclockout
                        ? null
                        : !schedule[11].saturdaymorningclockin
                          ? null
                          : `-${schedule[11].saturdaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("saturdaymorningopen")}
                    />
                    <Dialog
                      open={saturdaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("saturdaymorningopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(11, "saturdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("saturdaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("saturdaymorningopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Saturday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
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
                            11,
                            "saturdaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!schedule[12].saturdaynightclockin
                        ? "not working"
                        : schedule[12].saturdaynightclockin}
                    </p>
                    <p>
                      {!schedule[12].saturdaynightclockout
                        ? null
                        : !schedule[12].saturdaynightclockin
                          ? null
                          : `-${schedule[12].saturdaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("saturdaynightopen")}
                    />
                    <Dialog
                      open={saturdaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("saturdaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(12, "saturdaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("saturdaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("saturdaynightopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Saturday Night Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
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
                            12,
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
                      {!schedule[13].sundaymorningclockin
                        ? "not working"
                        : schedule[13].sundaymorningclockin}
                    </p>
                    <p>
                      {!schedule[13].sundaymorningclockout
                        ? null
                        : !schedule[13].sundaymorningclockin
                          ? null
                          : `-${schedule[13].sundaymorningclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("sundaymorningopen")}
                    />
                    <Dialog
                      open={sundaymorningopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("sundaymorningopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(13, "sundaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("sundaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("sundaymorningopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Sunday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
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
                            13,
                            "sundaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!schedule[14].sundaynightclockin
                        ? "not working"
                        : schedule[14].sundaynightclockin}
                    </p>
                    <p>
                      {!schedule[14].sundaynightclockout
                        ? null
                        : !schedule[14].sundaynightclockin
                          ? null
                          : `-${schedule[14].sundaynightclockout}`}
                    </p>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("sundaynightopen")}
                    />
                    <Dialog
                      open={sundaynightopen}
                      actions={[
                        <FlatButton
                          label="Cancel"
                          primary={true}
                          onClick={() => handleOpen("sundaynightopen")}
                        />,
                        <FlatButton
                          label="Clear"
                          primary={true}
                          onClick={() => handleOff(14, "sundaynight")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("sundaynightopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("sundaynightopen")}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Sunday Night Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(14, "sundaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Sunday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(14, "sundaynightclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    ...state.schedulesreducer,
    user_id: state.users.user_id
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
  getWeekOf
})(Schedules);
