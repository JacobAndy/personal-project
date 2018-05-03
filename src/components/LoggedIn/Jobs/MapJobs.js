import React, { Component } from "react";
import { sendApplication } from "../../../ducks/company";
import { connect } from "react-redux";

class MapJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { company, user } = this.props;
    return (
      <div className="each-job" key={company.company_id}>
        <h5>Name: {company.name}</h5>
        <h5>Location: {company.location}</h5>
        <button
          onClick={() => this.props.sendApplication(company.company_id, user)}
        >
          Apply
        </button>
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
