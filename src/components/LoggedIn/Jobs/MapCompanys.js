import React, { Component } from "react";
import Popover, { PopoverAnimationFromTop } from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import { leaveCompany } from "../../../ducks/employee";
import {
  getPendingApplications,
  getAllEmployees
} from "../../../ducks/company";

class MapCompanys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popover: false,
      popoverApplication: false,
      editToggle: false,
      updatedCompanyNameInput: "",
      updatedCompanyAddressInput: ""
    };
    this.handlePopOverOpen = this.handlePopOverOpen.bind(this);
    this.handlePopOverClose = this.handlePopOverClose.bind(this);
    this.handlePopOverOpenApplication = this.handlePopOverOpenApplication.bind(
      this
    );
    this.handlePopOverCloseApplication = this.handlePopOverCloseApplication.bind(
      this
    );
    this.editToggleChange = this.editToggleChange.bind(this);
    this.handleUpdateCompanyAddress = this.handleUpdateCompanyAddress.bind(
      this
    );
    this.handleUpdateCompanyAddress = this.handleUpdateCompanyAddress.bind(
      this
    );
  }
  handlePopOverClose() {
    this.setState({ popover: false });
  }
  handlePopOverOpen = event => {
    this.setState({ popover: true, anchorEl: event.currentTarget });
  };
  handlePopOverOpenApplication = event => {
    this.setState({ popoverApplication: true, anchorEl: event.currentTarget });
  };
  handlePopOverCloseApplication() {
    this.setState({ popoverApplication: false });
  }
  editToggleChange() {
    this.setState({ editToggle: !this.state.editToggle });
  }
  handleUpdatedCompanyName(val) {
    this.setState({ updatedCompanyNameInput: val });
  }
  handleUpdateCompanyAddress(val) {
    this.setState({ updatedCompanyAddressInput: val });
  }
  handleUpdatedInfo() {
    this.editToggleChange();
    alert(
      "This feature of Updating the company details has not been registered yet"
    );
  }
  render() {
    let { num, comp, user, mapApp } = this.props;
    let mappedEmployees;
    this.props.jobStaff
      ? (mappedEmployees = this.props.jobStaff.map(e => {
          return (
            <div>
              <MenuItem primaryText={e.full_name} />
            </div>
          );
        }))
      : null;
    return (
      <div>
        {!this.state.editToggle ? (
          <div className="each-job" key={comp.company_id}>
            <h5>{comp.name}</h5>
            <h4
              onClick={event => {
                this.handlePopOverOpen(event);
                this.props.getAllEmployees(comp.company_id);
              }}
            >
              staff
            </h4>
            <div className="staff-popover">
              <Popover
                open={this.state.popover}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "bottom"
                }}
                targetOrigin={{ horizontal: "left", vertical: "top" }}
                onRequestClose={this.handlePopOverClose}
                animation={PopoverAnimationFromTop}
              >
                <Menu>{mappedEmployees}</Menu>
              </Popover>
            </div>
            {comp.founder == user ? (
              <button onClick={this.editToggleChange}>Edit Settings</button>
            ) : null}
            <button
              onClick={() => {
                this.props.leaveCompany(comp.company_id, user);
              }}
            >
              Leave Company
            </button>
            <p
              onClick={event => {
                this.props.getPendingApplications(comp.company_id);
                this.handlePopOverOpenApplication(event);
              }}
            >
              applications
            </p>
            <div className="staff-popover">
              <Popover
                open={this.state.popoverApplication}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "bottom"
                }}
                targetOrigin={{ horizontal: "left", vertical: "top" }}
                onRequestClose={this.handlePopOverCloseApplication}
                animation={PopoverAnimationFromTop}
              >
                <Menu>
                  {!mapApp.length ? (
                    <MenuItem primaryText={"No Applications"} />
                  ) : (
                    mapApp
                  )}
                </Menu>
              </Popover>
            </div>
          </div>
        ) : (
          <div className="each-job">
            <input
              placeholder={comp.name}
              onChange={e => this.handleUpdatedCompanyName(e.target.value)}
            />
            <input
              placeholder={comp.location}
              onChange={e => this.handleUpdateCompanyAddress(e.target.value)}
            />
            <button onClick={this.editToggleChange}>cancel</button>
            <button
              onClick={() => {
                !this.state.updatedCompanyAddressInput &&
                !this.state.updatedCompanyNameInput
                  ? alert("Please Input The Empty Feilds")
                  : this.handleUpdatedInfo();
              }}
            >
              Update Company
            </button>
          </div>
        )}
      </div>
    );
  }
}
let mapStateToProps = state => {
  return {
    ...state.company,
    ...state.employee
  };
};
export default connect(mapStateToProps, {
  getPendingApplications,
  leaveCompany,
  getAllEmployees
})(MapCompanys);
