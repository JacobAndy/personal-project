import React, { Component } from "react";
import { connect } from "react-redux";
import "../Calendar.css";
import Dialog from "material-ui/Dialog";
import TimePicker from "material-ui/TimePicker";
import FlatButton from "material-ui/FlatButton";
import Popover, { PopoverAnimationFromTop } from "material-ui/Popover";
import Menu from "material-ui/Menu";
import WeekOf from "../../week-of/WeekOf";
import {
  handleOpen,
  handleStateUpdate,
  handleOff
} from "../../../../ducks/schedulesreducer";

class Schedules extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let {
      handleOpen,
      handleStateUpdate,
      handleOff,
      schedule,
      userinfo,
      mondaymorningopen,
      mondaynightopen,
      mondaymorningclockin,
      mondaymorningclockout,
      mondaynightclockin,
      mondaynightclockout,

      tuesdaymorningopen,
      tuesdaynightopen,
      tuesdaymorningclockin,
      tuesdaymorningclockout,
      tuesdaynightclockin,
      tuesdaynightclockout,

      wednesdaymorningopen,
      wednesdaynightopen,
      wednesdaymorningclockin,
      wednesdaymorningclockout,
      wednesdaynightclockin,
      wednesdaynightclockout,

      thursdaymorningopen,
      thursdaynightopen,
      thursdaymorningclockin,
      thursdaymorningclockout,
      thursdaynightclockin,
      thursdaynightclockout,

      fridaymorningopen,
      fridaynightopen,
      fridaymorningclockin,
      fridaymorningclockout,
      fridaynightclockin,
      fridaynightclockout,

      saturdaymorningopen,
      saturdaynightopen,
      saturdaymorningclockin,
      saturdaymorningclockout,
      saturdaynightclockin,
      saturdaynightclockout,

      sundaymorningopen,
      sundaynightopen,
      sundaymorningclockin,
      sundaymorningclockout,
      sundaynightclockin,
      sundaynightclockout
    } = this.props;
    console.log(this.props);
    return (
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

          <div className="employee-display">
            <div className="individual">
              <div className="employee">
                <h4 className="employee-name">Jacob Anderson</h4>
                <div
                  className="down-arrow-user"
                  onClick={() => handleOpen("userinfo")}
                />
                <div className="popover">
                  <Popover
                    open={userinfo}
                    // anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                      horizontal: "left",
                      vertical: "bottom"
                    }}
                    targetOrigin={{ horizontal: "left", vertical: "top" }}
                    onRequestClose={() => handleOpen("userinfo")}
                    animation={PopoverAnimationFromTop}
                  >
                    <Menu>
                      <p>image</p>
                      <p>email</p>
                      <p>phone number</p>
                      <p>address</p>
                      <p>emergency contact</p>
                    </Menu>
                  </Popover>
                </div>
              </div>
              <div className="schedule">
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!mondaymorningclockin
                        ? "not working"
                        : mondaymorningclockin}
                    </p>
                    <p>
                      {!mondaymorningclockout
                        ? null
                        : !mondaymorningclockin
                          ? null
                          : `-${mondaymorningclockout}`}
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
                          onClick={() => handleOff("mondaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("mondaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("mondaymorningopen")}
                      // onRequestClose={this.handleOpen}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Monday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("mondaymorningclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Monday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("mondaymorningclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!mondaynightclockin ? "not working" : mondaynightclockin}
                    </p>
                    <p>
                      {!mondaynightclockout
                        ? null
                        : !mondaynightclockin
                          ? null
                          : `-${mondaynightclockout}`}
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
                          onClick={() => handleOff("mondaynight")}
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
                          handleStateUpdate("mondaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Monday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("mondaynightclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!tuesdaymorningclockin
                        ? "not working"
                        : tuesdaymorningclockin}
                    </p>
                    <p>
                      {!tuesdaymorningclockout
                        ? null
                        : !tuesdaymorningclockin
                          ? null
                          : `-${tuesdaymorningclockout}`}
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
                          onClick={() => handleOff("tuesdaymorning")}
                        />,
                        <FlatButton
                          label="Submit"
                          primary={true}
                          onClick={() => handleOpen("tuesdaymorningopen")}
                        />
                      ]}
                      onRequestClose={() => handleOpen("tuesdaymorningopen")}
                      // onRequestClose={this.handleOpen}
                    >
                      <TimePicker
                        format="ampm"
                        placeholder="Tuesday Morning Clock in"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("tuesdaymorningclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Tuesday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("tuesdaymorningclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!tuesdaynightclockin
                        ? "not working"
                        : tuesdaynightclockin}
                    </p>
                    <p>
                      {!tuesdaynightclockout
                        ? null
                        : !tuesdaynightclockin
                          ? null
                          : `-${tuesdaynightclockout}`}
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
                          onClick={() => handleOff("tuesdaynight")}
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
                          handleStateUpdate("tuesdaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Tuesday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("tuesdaynightclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!wednesdaymorningclockin
                        ? "not working"
                        : wednesdaymorningclockin}
                    </p>
                    <p>
                      {!wednesdaymorningclockout
                        ? null
                        : !wednesdaymorningclockin
                          ? null
                          : `-${wednesdaymorningclockout}`}
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
                          onClick={() => handleOff("wednesdaymorning")}
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
                          handleStateUpdate("wednesdaymorningclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Wednesday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate(
                            "wednesdaymorningclockout",
                            newDate
                          );
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!wednesdaynightclockin
                        ? "not working"
                        : wednesdaynightclockin}
                    </p>
                    <p>
                      {!wednesdaynightclockout
                        ? null
                        : !wednesdaynightclockin
                          ? null
                          : `-${wednesdaynightclockout}`}
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
                          onClick={() => handleOff("wednesdaynight")}
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
                          handleStateUpdate("wednesdaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Wednesday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("wednesdaynightclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!thursdaymorningclockin
                        ? "not working"
                        : thursdaymorningclockin}
                    </p>
                    <p>
                      {!thursdaymorningclockout
                        ? null
                        : !thursdaymorningclockin
                          ? null
                          : `-${thursdaymorningclockout}`}
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
                          onClick={() => handleOff("thursdaymorning")}
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
                          handleStateUpdate("thursdaymorningclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Thursday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("thursdaymorningclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!thursdaynightclockin
                        ? "not working"
                        : thursdaynightclockin}
                    </p>
                    <p>
                      {!thursdaynightclockout
                        ? null
                        : !thursdaynightclockin
                          ? null
                          : `-${thursdaynightclockout}`}
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
                          onClick={() => handleOff("thursdaynight")}
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
                          handleStateUpdate("thursdaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Thursday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("thursdaynightclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!fridaymorningclockin
                        ? "not working"
                        : fridaymorningclockin}
                    </p>
                    <p>
                      {!fridaymorningclockout
                        ? null
                        : !fridaymorningclockin
                          ? null
                          : `-${fridaymorningclockout}`}
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
                          onClick={() => handleOff("fridaymorning")}
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
                          handleStateUpdate("fridaymorningclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Friday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("fridaymorningclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!fridaynightclockin ? "not working" : fridaynightclockin}
                    </p>
                    <p>
                      {!fridaynightclockout
                        ? null
                        : !fridaynightclockin
                          ? null
                          : `-${fridaynightclockout}`}
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
                          onClick={() => handleOff("fridaynight")}
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
                          handleStateUpdate("fridaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Friday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("fridaynightclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!saturdaymorningclockin
                        ? "not working"
                        : saturdaymorningclockin}
                    </p>
                    <p>
                      {!saturdaymorningclockout
                        ? null
                        : !saturdaymorningclockin
                          ? null
                          : `-${saturdaymorningclockout}`}
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
                          onClick={() => handleOff("saturdaymorning")}
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
                          handleStateUpdate("saturdaymorningclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Saturday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("saturdaymorningclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!saturdaynightclockin
                        ? "not working"
                        : saturdaynightclockin}
                    </p>
                    <p>
                      {!saturdaynightclockout
                        ? null
                        : !saturdaynightclockin
                          ? null
                          : `-${saturdaynightclockout}`}
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
                          onClick={() => handleOff("saturdaynight")}
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
                          handleStateUpdate("saturdaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Saturday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("saturdaynightclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                </div>
                <div className="employee-schedule">
                  <div className="morning-shift">
                    <p>
                      {!sundaymorningclockin
                        ? "not working"
                        : sundaymorningclockin}
                    </p>
                    <p>
                      {!sundaymorningclockout
                        ? null
                        : !sundaymorningclockin
                          ? null
                          : `-${sundaymorningclockout}`}
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
                          onClick={() => handleOff("sundaymorning")}
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
                          handleStateUpdate("sundaymorningclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Sunday Morning Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("sundaymorningclockout", newDate);
                        }}
                      />
                    </Dialog>
                  </div>
                  <div className="morning-shift">
                    <p>
                      {!sundaynightclockin ? "not working" : sundaynightclockin}
                    </p>
                    <p>
                      {!sundaynightclockout
                        ? null
                        : !sundaynightclockin
                          ? null
                          : `-${sundaynightclockout}`}
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
                          onClick={() => handleOff("sundaynight")}
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
                          handleStateUpdate("sundaynightclockin", newDate);
                        }}
                      />
                      <TimePicker
                        format="ampm"
                        placeholder="Sunday Night Clock Out"
                        onChange={(blank, newDate) => {
                          handleStateUpdate("sundaynightclockout", newDate);
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
    );
  }
}

let mapStateToProps = state => {
  return {
    ...state.schedulesreducer
  };
};

export default connect(mapStateToProps, {
  handleOpen,
  handleStateUpdate,
  handleOff
})(Schedules);
