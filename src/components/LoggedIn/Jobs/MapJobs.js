import React, { Component } from "react";
import { sendApplication } from "../../../ducks/company";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import "./Jobs.css";
import swal from "sweetalert";

class MapJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { company, user } = this.props;
    return (
      <div className="company-holder">
        <div className="each-job" key={company.company_id}>
          <div className="job-apply-info">
            <h5>Name</h5>
            <h3>{company.name}</h3>

            <h5>Location</h5>
            <h3>{company.location}</h3>
          </div>
          <RaisedButton
            backgroundColor="#4DB6AC"
            className="apply-for-job"
            onClick={() => {
              swal({
                title: `Applied for ${company.name}`,
                text: `Location: ${company.location}`,
                icon: "success",
                button: "OK"
              });
              this.props.sendApplication(company.company_id, user);
            }}
          >
            Apply
          </RaisedButton>
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return {
    ...state.company
  };
};
export default connect(mapStateToProps, { sendApplication })(MapJobs);
