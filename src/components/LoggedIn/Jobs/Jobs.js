import React, { Component } from "react";
import Nav from "../../Nav/LoginNav/LoginNav";
import "./Jobs.css";
import { connect } from "react-redux";
import {
  getCompany,
  getJobs,
  createGroup,
  getLatLong
} from "../../../ducks/company";
import Error from "../../Error/Error";

class Jobs extends Component {
  constructor() {
    super();
    this.state = {
      createGroupFlag: false,
      companyName: "",
      location: ""
    };
    this.toggleCreateGroup = this.toggleCreateGroup.bind(this);
    this.handleCompanyLocation = this.handleCompanyLocation.bind(this);
    this.handleCompanyName = this.handleCompanyName.bind(this);
    this.getLocations = this.getLocations.bind(this);
  }
  componentDidMount() {
    this.props.getCompany(this.props.user_id);
    this.props.getJobs();
  }
  toggleCreateGroup() {
    this.setState({ createGroupFlag: !this.state.createGroupFlag });
  }
  handleCompanyName(e) {
    this.setState({ companyName: e });
  }
  handleCompanyLocation(e) {
    this.setState({ location: e });
  }

  getLocations() {
    let date = new Date();
    let month = date.getMonth();
    let dayomonth = date.getDate();
    let year = date.getFullYear();
    switch (month) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
      default:
        month = "Day Unavailable";
    }
    let todayDate = `${month} ${dayomonth},${year}`;
    console.log(todayDate);
    this.props
      .getLatLong(this.state.location)
      .then(() => {
        this.props.createGroup(
          this.state.companyName,
          todayDate,
          this.props.user_id,
          this.props.createCompanyLatitude,
          this.props.createCompanyLongitude,
          this.state.location
        );
      })
      .then(() => this.props.getCompany(this.props.user_id))
      .catch(err => console.log(err))
      .catch(err => {
        console.log(`ERROR IN CREATING GROUP FRONT END : => ${err}`);
      });
    this.toggleCreateGroup();
  }
  render() {
    let newVar = [];
    let mappedComp = this.props.companys.map((e, i) => {
      newVar.push(e.company_id);
      return (
        <div key={i}>
          <h5>{e.name}</h5>
        </div>
      );
    });
    let mappedJobs = this.props.jobs.map((e, i, a) => {
      if (!newVar.includes(e.company_id)) {
        // console.log("heyy boy");
        return (
          <div key={i}>
            <h5>Name: {e.name}</h5>
            <h5>Location: {e.location}</h5>
            <button>Apply</button>
          </div>
        );
      }
    });
    console.log(this.props);
    return (
      <div>
        <Nav />
        {this.state.createGroupFlag ? (
          <div>
            <h3>create a group</h3>
            <input
              placeholder="name"
              onChange={e => this.handleCompanyName(e.target.value)}
            />
            <input
              placeholder="Location"
              onChange={e => this.handleCompanyLocation(e.target.value)}
            />
            <button onClick={this.getLocations}>Save Changes</button>
            <button onClick={this.toggleCreateGroup}>Cancel</button>
          </div>
        ) : this.props.currentUser[0] ? (
          <div>
            <Nav />
            <div>
              <input placeholder="search your jobs" />
              <h3>Your Jobs</h3>
              {mappedComp}
            </div>
            <div>
              <input placeholder="search for a job" />
              <h3>Apply For Jobs</h3>
              {mappedJobs}
            </div>
            <button onClick={this.toggleCreateGroup}>Create a Business</button>
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

export default connect(mapStateToProps, {
  getCompany,
  getJobs,
  createGroup,
  getLatLong
})(Jobs);
