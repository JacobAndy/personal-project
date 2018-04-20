import React, { Component } from "react";
import "./Filter.css";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      station: 1,
      employee: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }
  render() {
    return (
      <div className="filters">
        <div className="filter-station">
          <SelectField
            autoWidth={true}
            value={this.state.station}
            onChange={(event, i, val) => {
              this.handleChange("station", val);
            }}
          >
            <MenuItem value={1} primaryText="select station" />
            <MenuItem value="Griddle" primaryText="Griddle" />
            <MenuItem value="Fry" primaryText="Fry" />
            <MenuItem value="Flat Bread" primaryText="Flat Bread" />
            <MenuItem value="Broil" primaryText="Broil" />
            <MenuItem value="Salad" primaryText="Salad" />
          </SelectField>
        </div>
        <div className="filter-emp">
          <SelectField
            autoWidth={true}
            value={this.state.employee}
            onChange={(event, i, val) => {
              this.handleChange("employee", val);
            }}
          >
            <MenuItem value={1} primaryText="select First Name" />
            <MenuItem value="A-F" primaryText="A-F" />
            <MenuItem value="G-K" primaryText="G-K" />
            <MenuItem value="L-P" primaryText="L-P" />
            <MenuItem value="Q-U" primaryText="Q-U" />
            <MenuItem value="V-Z" primaryText="V-Z" />
          </SelectField>
        </div>
      </div>
    );
  }
}
export default Filter;
