import React, { Component } from "react";
import Filter from "../filter-emp/Filter";
import "./WeekOf.css";

class WeekOf extends Component {
  render() {
    return (
      <div className="search">
        <Filter />
        <div className="left-arrow" />
        <h3 className="week-display">Week Of January 1 - January 7</h3>
        <div className="right-arrow" />
      </div>
    );
  }
}
export default WeekOf;
