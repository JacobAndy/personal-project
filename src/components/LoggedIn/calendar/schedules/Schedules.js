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
import swal from "sweetalert";
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
import SchedulesMap from "./SchedulesMap";
import MappedSchedules from "./SchedulesMap";
let underlined = {
  borderColor: "black"
};
let iconColor = {
  fill: "black"
};
let selectWidth = {
  width: "70px"
};

class Schedules extends Component {
  constructor() {
    super();
    this.state = {
      popover: false,
      currentValueJob: "",
      selectedCompany: "",
      a: `abcdef`,
      g: `ghijk`,
      l: `lmnop`,
      q: `qrstu`,
      v: `vwxyz`
    };
  }
  componentDidMount() {
    this.props.getCompany(this.props.user_id);
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
    let { a, g, l, q, v } = this.state;
    let employeeInfoAndSchedules;
    if (!this.props.companys.length) {
      return (
        <div>
          <h3>You have no Business</h3>
        </div>
      );
    } else if (this.props.adminSchedules.length === 0) {
      console.log("LENGTH IS 0 SO THIS STATEMENT WAS HIT");
      console.log(this.props.user_id);
      !this.props.currentCompanyIdForDate
        ? this.props.getEmployees(this.props.user_id)
        : this.props.getEmployeesByCompanyId(
            this.props.currentCompanyIdForDate
          );
    } else {
      console.log(this.props);
      employeeInfoAndSchedules = _(
        filt(this.props.adminSchedules, e => {
          if (!this.props.filterValue || this.props.filterValue === 1) {
            return e;
          } else if (
            this.props.filterValue === "A-F" &&
            a.includes(e.full_name[0].toLowerCase())
          ) {
            return e;
          } else if (
            this.props.filterValue === "G-K" &&
            g.includes(e.full_name[0].toLowerCase())
          ) {
            return e;
          } else if (
            this.props.filterValue === "L-P" &&
            l.includes(e.full_name[0].toLowerCase())
          ) {
            return e;
          } else if (
            this.props.filterValue === "Q-U" &&
            q.includes(e.full_name[0].toLowerCase())
          ) {
            return e;
          } else if (
            this.props.filterValue === "V-Z" &&
            v.includes(e.full_name[0].toLowerCase())
          ) {
            return e;
          }
        }),
        (e, i) => {
          console.log(e);
          return (
            <MappedSchedules
              person={e}
              i={i}
              manager={this.props.currentCompanyManager}
            />
          );
        }
      );
    }
    let mappedEmployement = this.props.modifiedCompanys.map((e, i) => {
      return (
        <MenuItem
          style={{ color: "#2196F3", backgroundColor: "#BBDEFB" }}
          value={e.company_id}
          primaryText={e.name}
        />
      );
    });

    return (
      <div>
        <div className="Job-select">
          <SelectField
            labelStyle={{ color: "#2196F3" }}
            listStyle={{ backgroundColor: "#BBDEFB" }}
            style={{ width: "150px" }}
            iconStyle={iconColor}
            underlineStyle={underlined}
            value={
              this.state.selectedCompany || this.props.selectDefaultCompanyId
            }
            onChange={(event, i, val) => {
              console.log(`val : => ${val}`);
              this.handleChange(val);
              this.props.companyWeekOf(val, this.props.weekOf);
              this.props.updateStateCompId(val);
            }}
          >
            <MenuItem
              style={{ color: "#2196F3", backgroundColor: "#BBDEFB" }}
              value={this.props.selectDefaultCompanyId}
              primaryText={this.props.currentCompanyName}
            />
            {mappedEmployement}
          </SelectField>
        </div>
        {this.props.currentCompanyManager ? (
          <div>
            <RaisedButton
              onClick={() => {
                !this.props.currentCompanyIdForDate
                  ? (swal({
                      title: `Schedule Deleted`,
                      text: `Week ${this.props.weekOf} has been deleted`,
                      icon: "success",
                      button: "OK"
                    }),
                    this.props.deleteWeek(
                      this.props.adminSchedules,
                      this.props.weekOf
                    ))
                  : null;
                swal({
                  title: `Schedule Deleted`,
                  text: `Week ${this.props.weekOf} has been deleted`,
                  icon: "success",
                  button: "OK"
                }),
                  this.props.deleteWeekWithCompanyId(
                    this.props.user_id,
                    this.props.currentCompanyIdForDate,
                    this.props.weekOf
                  );
              }}
              className="clear-schedule"
              label="Clear Week"
              backgroundColor="pink"
              color="white"
            />
            <RaisedButton
              onClick={() => {
                console.log(this.props);
                !this.props.currentCompanyIdForDate
                  ? !this.props.update
                    ? (swal({
                        title: "Schedule Created",
                        text: `Week ${this.props.weekOf} has been created`,
                        icon: "success"
                      }),
                      this.props.createSchedule(
                        this.props.user_id,
                        this.props.adminSchedules
                      ))
                    : (swal({
                        title: "Schedule Updated",
                        text: `Week ${this.props.weekOf} has been updated`,
                        icon: "success",
                        button: "OK"
                      }),
                      this.props.updateschedule(
                        this.props.weekOf,
                        this.props.user_id,
                        this.props.adminSchedules
                      ))
                  : !this.props.update
                    ? (swal({
                        title: "Schedule Created",
                        text: `Week ${this.props.weekOf} has been created`,
                        icon: "success"
                      }),
                      this.props.createCompanyWeekOf(
                        this.props.currentCompanyIdForDate,
                        this.props.adminSchedules,
                        this.props.user_id
                      ))
                    : (swal({
                        title: "Schedule Updated",
                        text: `Week ${this.props.weekOf} has been updated`,
                        icon: "success",
                        button: "OK"
                      }),
                      this.props.updateCompanyWeekOf(
                        this.props.currentCompanyIdForDate,
                        this.props.adminSchedules,
                        this.props.user_id,
                        this.props.weekOf
                      ));
              }}
              className="post-schedule"
              label="Post Schedule"
              backgroundColor="green"
              color="white"
            />
          </div>
        ) : null}
        <WeekOf />
        <div className="calendar">
          <div className="open-shift">
            <h5>Employees</h5>
            <div className="down-arrow" />
          </div>
          <div className="date">
            <div className="date-info">
              <h4 className="monday">Monday</h4>
              <div className="down-arrow-date0 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4 className="tuesday">Tuesday</h4>
              <div className="down-arrow-date1 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4 className="wednesday">Wednesday</h4>
              <div className="down-arrow-date2 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4 className="thursday">Thursday</h4>
              <div className="down-arrow-date3 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4 className="friday">Friday</h4>
              <div className="down-arrow-date4 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4 className="saturday">Saturday</h4>
              <div className="down-arrow-date5 down-arrow-date" />
            </div>
            <div className="date-info">
              <h4 className="sunday">Sunday</h4>
              <div className="down-arrow-date6 down-arrow-date" />
            </div>
          </div>
          {employeeInfoAndSchedules}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    ...state.schedulesreducer,
    ...state.company,
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
  getWeekOf,
  getCompany,
  companyWeekOf,
  updateStateCompId,
  createCompanyWeekOf,
  updateCompanyWeekOf,
  deleteWeekWithCompanyId,
  getEmployeesByCompanyId
})(Schedules);
