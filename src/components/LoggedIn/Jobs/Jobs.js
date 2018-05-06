import React, { Component } from "react";
import Nav from "../../Nav/LoginNav/Nav";
import "./Jobs.css";
import { connect } from "react-redux";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import X from "material-ui/svg-icons/navigation/close.js";
import swal from "sweetalert";
import LoadingJobs from "./LoadingJobs";
import {
  getCompany,
  getJobs,
  createGroup,
  getLatLong,
  sendApplication,
  getPendingApplications,
  acceptCurrentUsersApplication,
  denyUserApplication,
  leaveCompany
} from "../../../ducks/company";
import { getUser } from "../../../ducks/users";
import { getStaff, addEditToggle } from "../../../ducks/employee";
import Error from "../../Error/Error";
import Popover, { PopoverAnimationFromTop } from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import _ from "lodash.map";
import filt from "lodash.filter";
import MapCompanys from "./MapCompanys";
import MapApp from "./MapApp";
import MapJobs from "./MapJobs";

class Jobs extends Component {
  constructor() {
    super();
    this.state = {
      createGroupFlag: false,
      companyName: "",
      location: "",
      popover: false,
      editGroupFlag: false,
      popoverApplication: false,
      searchForYourJobs: "",
      searchForAppJobs: "",
      companysSearch: "",
      jobsSearch: "",
      loading: false
    };
    this.handlePopOverOpen = this.handlePopOverOpen.bind(this);
    this.handlePopOverClose = this.handlePopOverClose.bind(this);
    this.toggleCreateGroup = this.toggleCreateGroup.bind(this);
    this.handleCompanyLocation = this.handleCompanyLocation.bind(this);
    this.handleCompanyName = this.handleCompanyName.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.handlePopOverOpenApplication = this.handlePopOverOpenApplication.bind(
      this
    );
    this.handlePopOverCloseApplication = this.handlePopOverCloseApplication.bind(
      this
    );
    this.handleLoading = this.handleLoading.bind(this);
  }
  componentDidMount() {
    this.handleLoading();
    this.props.getUser().then(() => {
      this.props.getCompany(this.props.currentUser[0].user_id);
    });
    this.props.getJobs();
  }

  toggleCreateGroup() {
    this.setState({ createGroupFlag: !this.state.createGroupFlag });
    // setTimeout(() => {
    //   window.onclick = () => this.setState({ createGroupFlag: false });
    // }, 10);
  }
  handleCompanyName(e) {
    this.setState({ companyName: e });
  }
  handleCompanyLocation(e) {
    this.setState({ location: e });
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
  handleJobSearch(val) {
    this.setState({ jobsSearch: val });
  }
  handleCompanySearch(val) {
    this.setState({ companysSearch: val });
  }
  handleLoading() {
    setTimeout(() => {
      this.setState({ loading: true });
    }, 2000);
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
    console.log(this.props);
    let newVar = [];
    let mappedApplications = _(this.props.jobApplications, e => {
      return <MapApp app={e} />;
    });
    let mappedComp =
      // filt(this.props.companys, e => {
      //   if (e.name.includes(this.state.companysSearch)) {
      //     return e;
      //   }
      // })
      this.props.companys.map((e, i, j) => {
        newVar.push(e.company_id);
        return (
          <MapCompanys
            num={this.props[`num` + i]}
            comp={e}
            user={this.props.user_id}
            mapApp={mappedApplications}
          />
        );
      });
    let mappedJobs = filt(this.props.jobs, e => {
      if (e.name.includes(this.state.jobsSearch)) {
        return e;
      }
    }).map((e, i, a) => {
      if (!newVar.includes(e.company_id)) {
        return <MapJobs company={e} user={this.props.user_id} />;
      }
    });
    console.log(this.props);

    return (
      <div>
        <Nav />
        {this.props.currentUser[0] ? (
          <div>
            <Nav />
            <div className="jobs-holder">
              <div className="personal-jobs">
                <div className="top-of-jobs">
                  {/* <input
                  placeholder="search your jobs"
                  onChange={e => this.handleCompanySearch(e.target.value)}
                /> */}
                  <h3>Your Jobs</h3>

                  <div className="action-button-wrapper">
                    {!this.state.createGroupFlag ? (
                      <FloatingActionButton
                        className="create-company-toggle"
                        onClick={() => {
                          this.toggleCreateGroup();
                        }}
                      >
                        <ContentAdd />
                      </FloatingActionButton>
                    ) : (
                      <FloatingActionButton
                        className="exit-company-toggle"
                        onClick={() => {
                          this.toggleCreateGroup();
                        }}
                      >
                        <X />
                      </FloatingActionButton>
                    )}
                  </div>
                </div>
                {!this.state.createGroupFlag ? (
                  <div className="mapped-container">
                    <div className="mapped-company">{mappedComp}</div>
                  </div>
                ) : (
                  <div className="group-creating-tab">
                    <X
                      className="exit-create-group"
                      onClick={() => {
                        this.toggleCreateGroup();
                        window.onclick = () =>
                          this.setState({
                            createGroupFlag: !this.state.createGroupFlag
                          });
                      }}
                    />
                    <h3>create a group</h3>
                    <TextField
                      inputStyle={{ color: "#333" }}
                      underlineStyle={{ borderColor: "#69F0AE" }}
                      placeholder="Company Name"
                      onChange={e => this.handleCompanyName(e.target.value)}
                    />
                    <TextField
                      inputStyle={{ color: "#333" }}
                      underlineStyle={{ borderColor: "#69F0AE" }}
                      placeholder="Company Location"
                      onChange={e => this.handleCompanyLocation(e.target.value)}
                    />
                    <div className="savecompany-updates">
                      <RaisedButton
                        backgroundColor="#69F0AE"
                        onClick={() => {
                          this.getLocations();
                          swal({
                            title: "Job Created",
                            text: "",
                            icon: "success",
                            button: "OKAY"
                          });
                        }}
                      >
                        Submit
                      </RaisedButton>
                      <RaisedButton
                        backgroundColor="#69F0AE"
                        onClick={this.toggleCreateGroup}
                      >
                        Cancel
                      </RaisedButton>
                    </div>
                  </div>
                )}
              </div>
              <div className="inactive-job">
                <div className="top-of-jobs">
                  <h3>Apply For Jobs</h3>
                  <TextField
                    style={{ color: "blue" }}
                    underlineStyle={{ borderColor: "blue" }}
                    placeholder="search for a job"
                    onChange={e => this.handleJobSearch(e.target.value)}
                  />
                </div>
                {!this.state.loading ? (
                  <LoadingJobs />
                ) : (
                  <div className="mapped-container">
                    <div className="mapped-jobs">{mappedJobs}</div>
                  </div>
                )}
              </div>
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
    ...state.users,
    ...state.employee
  };
};

export default connect(mapStateToProps, {
  getUser,
  getCompany,
  getJobs,
  createGroup,
  getLatLong,
  getStaff,
  leaveCompany,
  addEditToggle,
  sendApplication,
  getPendingApplications,
  acceptCurrentUsersApplication,
  denyUserApplication
})(Jobs);
