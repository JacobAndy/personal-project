import React, { Component } from "react";
import Filter from "../filter-emp/Filter";
import "./WeekOf.css";
import Dialog from "material-ui/Dialog";
import DatePicker from "material-ui/DatePicker";
import DateRange from "material-ui/svg-icons/action/date-range";
import FlatButton from "material-ui/FlatButton";
import { Link } from "react-router-dom";

class WeekOf extends Component {
  constructor() {
    super();
    this.state = {
      calendarselect: false,
      dialogopen: false
    };
    this.calendarToggle = this.calendarToggle.bind(this);
  }
  calendarToggle(prop) {
    this.setState({ [prop]: !this.state[prop] });
  }
  getDate(date) {
    console.log(date);
  }
  render() {
    return (
      <div className="search">
        <Filter />
        <div className="left-arrow" />
        <Dialog
          open={this.state.dialogopen}
          onRequestClose={() => this.calendarToggle("dialogopen")}
          actions={[
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={() => this.calendarToggle("dialogopen")}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onClick={() => this.calendarToggle("dialogopen")}
            />
          ]}
        >
          <DatePicker
            hideCalendarDate={this.state.calendarselect}
            placeholder="select a date"
            onChange={(blank, date) => {
              this.getDate(date);
            }}
            mode="landscape"
          />
        </Dialog>
        <h3 className="week-display">Week Of January 1 - January 7</h3>
        <div className="right-arrow" />
        <DateRange onClick={() => this.calendarToggle("dialogopen")} />
      </div>
    );
  }
}
export default WeekOf;
