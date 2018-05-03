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

class MappedSchedules extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <div className="employee">
            <h4 className="employee-name">{person.full_name}</h4>
            <div className="down-arrow-user" onClick={this.handlePopOverOpen} />
            <div className="popover">
              <Popover
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
                <Menu>
                  <MenuItem primaryText={`Email: ${person.email}`} />
                  <MenuItem primaryText={`Number: ${person.phone_number}`} />
                  <MenuItem primaryText={`Address: ${person.address}`} />
                  <MenuItem
                    primaryText={`emergency: ${person.emergency_contact}`}
                  />
                </Menu>
              </Popover>
            </div>
          </div>
          <div className="schedule">
            <div className="employee-schedule">
              <div className="morning-shift">
                <p>
                  {!person.schedule[1].mondaymorningclockin
                    ? "not working"
                    : person.schedule[1].mondaymorningclockin}
                </p>
                <p>
                  {!person.schedule[1].mondaymorningclockout
                    ? null
                    : `-${person.schedule[1].mondaymorningclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("mondaymorningopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[2].mondaynightclockin
                    ? "not working"
                    : person.schedule[2].mondaynightclockin}
                </p>
                <p>
                  {!person.schedule[2].mondaynightclockout
                    ? null
                    : !person.schedule[2].mondaynightclockout
                      ? null
                      : `-${person.schedule[2].mondaynightclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("mondaynightopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[3].tuesdaymorningclockin
                    ? "not working"
                    : person.schedule[3].tuesdaymorningclockin}
                </p>
                <p>
                  {!person.schedule[3].tuesdaymorningclockout
                    ? null
                    : !person.schedule[3].tuesdaymorningclockout
                      ? null
                      : `-${person.schedule[3].tuesdaymorningclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("tuesdaymorningopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[4].tuesdaynightclockin
                    ? "not working"
                    : person.schedule[4].tuesdaynightclockin}
                </p>
                <p>
                  {!person.schedule[4].tuesdaynightclockout
                    ? null
                    : !person.schedule[4].tuesdaynightclockout
                      ? null
                      : `-${person.schedule[4].tuesdaynightclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("tuesdaynightopen", i)}
                    />

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
              <div className="morning-shift">
                <p>
                  {!person.schedule[5].wednesdaymorningclockin
                    ? "not working"
                    : person.schedule[5].wednesdaymorningclockin}
                </p>
                <p>
                  {!person.schedule[5].wednesdaymorningclockout
                    ? null
                    : !person.schedule[5].wednesdaymorningclockout
                      ? null
                      : `-${person.schedule[5].wednesdaymorningclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("wednesdaymorningopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[6].wednesdaynightclockin
                    ? "not working"
                    : person.schedule[6].wednesdaynightclockin}
                </p>
                <p>
                  {!person.schedule[6].wednesdaynightclockout
                    ? null
                    : !person.schedule[6].wednesdaynightclockout
                      ? null
                      : `-${person.schedule[6].wednesdaynightclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("wednesdaynightopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[7].thursdaymorningclockin
                    ? "not working"
                    : person.schedule[7].thursdaymorningclockin}
                </p>
                <p>
                  {!person.schedule[7].thursdaymorningclockout
                    ? null
                    : !person.schedule[7].thursdaymorningclockout
                      ? null
                      : `-${person.schedule[7].thursdaymorningclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("thursdaymorningopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[8].thursdaynightclockin
                    ? "not working"
                    : person.schedule[8].thursdaynightclockin}
                </p>
                <p>
                  {!person.schedule[8].thursdaynightclockout
                    ? null
                    : !person.schedule[8].thursdaynightclockout
                      ? null
                      : `-${person.schedule[8].thursdaynightclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("thursdaynightopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[9].fridaymorningclockin
                    ? "not working"
                    : person.schedule[9].fridaymorningclockin}
                </p>
                <p>
                  {!person.schedule[9].fridaymorningclockout
                    ? null
                    : !person.schedule[9].fridaymorningclockout
                      ? null
                      : `-${person.schedule[9].fridaymorningclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("fridaymorningopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[10].fridaynightclockin
                    ? "not working"
                    : person.schedule[10].fridaynightclockin}
                </p>
                <p>
                  {!person.schedule[10].fridaynightclockout
                    ? null
                    : !person.schedule[10].fridaynightclockout
                      ? null
                      : `-${person.schedule[10].fridaynightclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("fridaynightopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[11].saturdaymorningclockin
                    ? "not working"
                    : person.schedule[11].saturdaymorningclockin}
                </p>
                <p>
                  {!person.schedule[11].saturdaymorningclockout
                    ? null
                    : !person.schedule[11].saturdaymorningclockout
                      ? null
                      : `-${person.schedule[11].saturdaymorningclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("saturdaymorningopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[12].saturdaynightclockin
                    ? "not working"
                    : person.schedule[12].saturdaynightclockin}
                </p>
                <p>
                  {!person.schedule[12].saturdaynightclockout
                    ? null
                    : !person.schedule[12].saturdaynightclockout
                      ? null
                      : `-${person.schedule[12].saturdaynightclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("saturdaynightopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[13].sundaymorningclockin
                    ? "not working"
                    : person.schedule[13].sundaymorningclockin}
                </p>
                <p>
                  {!person.schedule[13].sundaymorningclockout
                    ? null
                    : !person.schedule[13].sundaymorningclockout
                      ? null
                      : `-${person.schedule[13].sundaymorningclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("sundaymorningopen", i)}
                    />
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
              <div className="morning-shift">
                <p>
                  {!person.schedule[14].sundaynightclockin
                    ? "not working"
                    : person.schedule[14].sundaynightclockin}
                </p>
                <p>
                  {!person.schedule[14].sundaynightclockout
                    ? null
                    : !person.schedule[14].sundaynightclockout
                      ? null
                      : `-${person.schedule[14].sundaynightclockout}`}
                </p>
                {manager ? (
                  <div>
                    <div
                      className="right-arrow-small"
                      onClick={() => handleOpen("sundaynightopen", i)}
                    />
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
