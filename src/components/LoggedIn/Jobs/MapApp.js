import React, { Component } from "react";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import "./Jobs.css";
import swal from "sweetalert";

import {
  acceptCurrentUsersApplication,
  denyUserApplication
} from "../../../ducks/company";
import { connect } from "react-redux";

let mappedApplicationUserStyle = {
  lineHeight: "-1px"
};

class MapApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { app } = this.props;
    console.log(app);
    return (
      <div className="mappedapplicationuser">
        <MenuItem style={mappedApplicationUserStyle}>
          <h6>Applicants Name</h6>
          <h3>{app.full_name}</h3>
          <h6>Applicants Email</h6>
          <h3>{app.email}</h3>
          <h6>Applicants Contact Number</h6>
          <h3>{app.phone_number}</h3>
          <div className="denyoracceptapplication">
            <RaisedButton
              backgroundColor="#1E88E5"
              onClick={() => {
                swal({
                  title: `You Denied ${app.full_name}`,
                  icon: "success",
                  button: "OK"
                });
                this.props.denyUserApplication(
                  app.application_id,
                  app.email,
                  app.company_id,
                  app.user_id
                );
              }}
            >
              deny
            </RaisedButton>
            <RaisedButton
              backgroundColor="#1E88E5"
              onClick={() => {
                swal({
                  title: `You Accepted ${app.full_name}`,
                  icon: "success",
                  button: "OK"
                });
                this.props.acceptCurrentUsersApplication(
                  app.user_id,
                  app.company_id,
                  app.application_id,
                  app.email
                );
              }}
            >
              accept
            </RaisedButton>
          </div>
        </MenuItem>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return {
    ...state.company
  };
};
export default connect(mapStateToProps, {
  acceptCurrentUsersApplication,
  denyUserApplication
})(MapApp);
