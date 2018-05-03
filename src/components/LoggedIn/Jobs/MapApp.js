import React, { Component } from "react";
import MenuItem from "material-ui/MenuItem";

import {
  acceptCurrentUsersApplication,
  denyUserApplication
} from "../../../ducks/company";
import { connect } from "react-redux";

class MapApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { app } = this.props;
    return (
      <div>
        <MenuItem>
          <h3>{app.full_name}</h3>
          <h3>{app.email}</h3>
          <h3>{app.phone_number}</h3>
          <button
            onClick={() => {
              this.props.denyUserApplication(
                app.application_id,
                app.company_id
              );
            }}
          >
            deny
          </button>
          <button
            onClick={() =>
              this.props.acceptCurrentUsersApplication(
                app.user_id,
                app.company_id,
                app.application_id
              )
            }
          >
            accept
          </button>
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
