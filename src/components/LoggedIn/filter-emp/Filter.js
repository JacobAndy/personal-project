import React, { Component } from "react";
import "./Filter.css";

class Filter extends Component {
  render() {
    return (
      <div className="filters">
        <div className="filter-station">
          <select>
            <option select>select station</option>
            <option value="Griddle">Griddle</option>
            <option value="Fry">Fry</option>
            <option value="Flat Bread">Flat Bread</option>
            <option value="Broil">Broil</option>
            <option value="Salad">Salad</option>
          </select>
        </div>
        <div className="filter-emp">
          <select>
            <option select>select First Name</option>
            <option value="A-F">A-F</option>
            <option value="G-K">G-K</option>
            <option value="L-P">L-P</option>
            <option value="Q-U">Q-U</option>
            <option value="V-Z">V-Z</option>
          </select>
        </div>
      </div>
    );
  }
}
export default Filter;
