import React, { Component } from "react";
import Nav from "../../Nav/LoginNav/LoginNav";
import "./Jobs.css";
import { connect } from "react-redux";
import { getCompany, getJobs } from "../../../ducks/company";
import Error from "../../Error/Error";

class Jobs extends Component {
  constructor() {
    super();
    this.state = {
      createGroupFlag: false,
      companyName: "",
      longitude: "",
      latitude: ""
    };
  }
  componentDidMount() {
    this.props.getCompany(this.props.userid);
    this.props.getJobs();
  }
  render() {
    let mappedComp = this.props.companys.map((e, i) => {
      return (
        <div>
          <h5>{e.name}</h5>
        </div>
      );
    });
    let mappedJobs = this.props.jobs.map((e, i) => {
      return (
        <div>
          <h5>Name: {e.name}</h5>
          <h5>Location: {e.location}</h5>
          <button>Apply</button>
        </div>
      );
    });
    console.log(this.props);
    return (
      <div>
        <Nav />
        {this.props.currentUser[0] ? (
          <div>
            <Nav />
            <div>
              <h3>Your Jobs</h3>
              {mappedComp}
            </div>
            <div>
              <h3>Apply For Jobs</h3>
              {mappedJobs}
            </div>
          </div>
        ) : (
          <div>
            <Error />
          </div>
        )}
      </div>
    );
  }
}

let mapStateToProps = state => {
  let userid;
  return {
    ...state.company,
    ...state.users
  };
};

export default connect(mapStateToProps, { getCompany, getJobs })(Jobs);
