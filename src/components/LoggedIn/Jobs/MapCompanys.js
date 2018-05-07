import React, { Component } from "react";
import Popover, { PopoverAnimationFromTop } from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import X from "material-ui/svg-icons/navigation/close.js";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import swal from "sweetalert";
import IconButton from "material-ui/IconButton";

import {
  getPendingApplications,
  getAllEmployees,
  sendMassEmail,
  leaveCompany
} from "../../../ducks/company";

let applicationStyle = {
  width: "225px",
  backgroundColor: "#90CAF9"
};
let staffMappedOverStyle = {
  width: "280px",
  backgroundColor: "#90CAF9"
};
class MapCompanys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popover: false,
      popoverApplication: false,
      editToggle: false,
      updatedCompanyNameInput: "",
      updatedCompanyAddressInput: "",
      massEmail: false,
      email: "",
      emailSubject: ""
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
    this.toggleMassEmail = this.toggleMassEmail.bind(this);
    this.handleMassEmail = this.handleMassEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.handleEmailSubject = this.handleEmailSubject.bind(this);
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
  handleEmailSubject(val) {
    this.setState({ emailSubject: val });
  }
  handleUpdatedInfo() {
    this.editToggleChange();
  }
  sendEmail(companyId) {
    this.props
      .getAllEmployees(companyId)
      .then(() =>
        this.props.sendMassEmail(
          this.props.jobStaff,
          this.state.email,
          this.state.emailSubject
        )
      )
      .catch(error => console.log("ERROR IN GETTING EMPLOYEES"));
    !this.state.email
      ? alert("Please include context in your email")
      : // this.setState({ email: "" }),
        (console.log(this.state.email), this.toggleMassEmail());
  }
  toggleMassEmail() {
    this.setState({ massEmail: !this.state.massEmail });
  }
  handleMassEmail(val) {
    this.setState({ email: val });
  }
  render() {
    let { num, comp, user, mapApp } = this.props;
    let mappedEmployees;
    this.props.jobStaff
      ? (mappedEmployees = this.props.jobStaff.map(e => {
          return (
            <MenuItem style={staffMappedOverStyle} primaryText={e.full_name} />
          );
        }))
      : null;
    return (
      <div className="company-holder">
        {!this.state.editToggle && !this.state.massEmail ? (
          <div className="each-company" key={comp.company_id}>
            <h5 className="company-name">{comp.name}</h5>
            {/* <div className="staff-button">
              <RaisedButton
                className="staffgetter"
                backgroundColor="#81D4FA"
                onClick={event => {
                  this.handlePopOverOpen(event);
                  this.props.getAllEmployees(comp.company_id);
                }}
              >
                Staff
              </RaisedButton>
            </div> */}
            <div className="staff-popover">
              <Popover
                style={staffMappedOverStyle}
                className="employees-mapped"
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
                <Menu style={staffMappedOverStyle}>{mappedEmployees}</Menu>
              </Popover>
            </div>
            {comp.founder == user ? (
              <div className="editandemailbutton">
                <RaisedButton
                  backgroundColor="#69F0AE"
                  onClick={this.editToggleChange}
                >
                  Edit
                </RaisedButton>
                <RaisedButton
                  backgroundColor="#69F0AE"
                  onClick={this.toggleMassEmail}
                >
                  Email
                </RaisedButton>
              </div>
            ) : null}
            <div className="leave-company">
              <IconButton>
                <X
                  // onClick={() => {
                  //   swal({
                  //     title: `You left ${comp.name}`,
                  //     icon: "success",
                  //     button: "OK"
                  //   });
                  //   this.props.leaveCompany(comp.company_id, user);
                  // }}
                  onClick={() => {
                    swal({
                      title: "Are you sure?",
                      text: "Once deleted, you will not be able to undo!",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true
                    }).then(willDelete => {
                      if (willDelete) {
                        this.props.leaveCompany(comp.company_id, user);
                        swal(`You have successfully left ${comp.name}`, {
                          icon: "success"
                        });
                      } else {
                        swal("Canceled");
                      }
                    });
                  }}
                />
              </IconButton>
            </div>
            {comp.founder == user ? (
              <div className="application-button">
                <RaisedButton
                  backgroundColor="#81D4FA"
                  onClick={event => {
                    this.props.getPendingApplications(comp.company_id);
                    this.handlePopOverOpenApplication(event);
                  }}
                >
                  Applications
                </RaisedButton>
              </div>
            ) : null}
            <div className="staff-popover">
              <Popover
                className="application-popover"
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
                <Menu style={applicationStyle}>
                  {!mapApp.length ? (
                    <MenuItem primaryText={"No Applications"} />
                  ) : (
                    mapApp
                  )}
                </Menu>
              </Popover>
            </div>
            <div className="staff-button">
              <RaisedButton
                className="staffgetter"
                backgroundColor="#81D4FA"
                onClick={event => {
                  this.handlePopOverOpen(event);
                  this.props.getAllEmployees(comp.company_id);
                }}
              >
                Staff
              </RaisedButton>
            </div>
          </div>
        ) : this.state.editToggle && !this.state.massEmail ? (
          <div className="each-company">
            <h5>Name</h5>
            <TextField
              placeholder={comp.name}
              onChange={e => this.handleUpdatedCompanyName(e.target.value)}
            />
            <h5>Location</h5>
            <TextField
              placeholder={comp.location}
              onChange={e => this.handleUpdateCompanyAddress(e.target.value)}
            />
            <div className="updateandcancel">
              <RaisedButton
                backgroundColor="#81D4FA"
                onClick={this.editToggleChange}
              >
                cancel
              </RaisedButton>
              <RaisedButton
                backgroundColor="#81D4FA"
                onClick={() => {
                  !this.state.updatedCompanyAddressInput ||
                  !this.state.updatedCompanyNameInput
                    ? swal({
                        title: "FAILED",
                        text: "Please Input The Empty Feilds",
                        button: "OK",
                        icon: "error"
                      })
                    : (this.handleUpdatedInfo(),
                      swal({
                        title: `${comp.name} information has been update`,
                        icon: "success",
                        button: "OK"
                      }));
                }}
              >
                Update
              </RaisedButton>
            </div>
          </div>
        ) : !this.state.editToggle && this.state.massEmail ? (
          <div className="each-company">
            <TextField
              placeholder="Email Subject"
              onChange={e => this.handleEmailSubject(e.target.value)}
            />
            <TextField
              multiLine={true}
              rows={3}
              rowsMax={3}
              placeholder="Email Contents"
              onChange={e => this.handleMassEmail(e.target.value)}
            />
            <div className="updateandcancel editandsendmail">
              <RaisedButton
                backgroundColor="#81D4FA"
                onClick={this.toggleMassEmail}
              >
                cancel
              </RaisedButton>
              <RaisedButton
                backgroundColor="#81D4FA"
                onClick={() => {
                  swal({
                    title: this.state.emailSubject,
                    text: this.state.email,
                    icon: "success",
                    button: "OK"
                  });
                  this.sendEmail(comp.company_id);
                }}
              >
                Email
              </RaisedButton>
            </div>
          </div>
        ) : null}
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
  getAllEmployees,
  sendMassEmail
})(MapCompanys);
