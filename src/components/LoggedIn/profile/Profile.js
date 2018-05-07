import React, { Component } from "react";
import { connect } from "react-redux";
import X from "material-ui/svg-icons/navigation/close.js";
import {
  getUser,
  updateUser,
  updateLocation,
  getEmails,
  removeAlert
} from "../../../ducks/users";
import LoginNav from "../../Nav/LoginNav/Nav";
import "./Profile.css";
import Error from "../../Error/Error";
import { locationError } from "../../../ducks/users";
import { getCompany } from "../../../ducks/company";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from "material-ui/IconButton";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      newemail: "",
      newnumber: "",
      newaddress: "",
      emcontact: ""
    };
    this.submitVals = this.submitVals.bind(this);
  }
  componentDidMount() {
    console.log(this.props);

    console.log("hit get user did mount");
    this.props
      .getUser()
      .then(() => this.props.getEmails(this.props.user_id))
      .catch(err => console.log(err));
    navigator.geolocation.getCurrentPosition(
      position => {
        this.props.updateLocation(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log(
          `LATITUDE : => ${position.coords.latitude}, LONGITUDE : => ${
            position.coords.longitude
          }`
        );
      },
      error => {
        console.log("ERROR HIT");
        this.props.locationError();
      },
      {
        enableHighAccuracy: false,
        timeout: 60000,
        maximumAge: 0
      }
    );
  }
  handleEmail(e) {
    this.setState({ newemail: e });
  }
  handleNumber(e) {
    this.setState({ newnumber: e });
  }
  handleAddress(e) {
    this.setState({ newaddress: e });
  }
  handleContact(e) {
    this.setState({ emcontact: e });
  }
  submitVals() {
    console.log("daddddddy");
    let { newemail, newnumber, newaddress, emcontact } = this.state;
    if (!newemail || !newnumber || !newaddress || !emcontact) {
      alert("please complete the form to continue");
    } else {
      this.props.updateUser(
        newemail,
        newnumber,
        newaddress,
        emcontact,
        this.props.currentUser[0].auth_id
      );
    }
  }
  render() {
    console.log(this.props);
    let {
      photo,
      name,
      user_email,
      number,
      user_address,
      emerg_contact
    } = this.props;
    let { newemail, newnumber, newaddress, emcontact } = this.state;
    console.log(newemail, newnumber, newaddress, emcontact);
    let mappedEmails = this.props.emails.slice(0, 10).map((e, i) => {
      return (
        <div
          className="email-contents-div"
          style={{ animation: `${i}s email` }}
        >
          <div className="x">
            <IconButton
              onClick={() =>
                this.props.removeAlert(e.email_id, this.props.user_id)
              }
            >
              <X />
            </IconButton>
          </div>
          <h5>{e.email_contents}</h5>
        </div>
      );
    });
    return (
      <div>
        {!this.props.currentUser[0] ? (
          <div>
            <LoginNav />
            <Error />
          </div>
        ) : !name ||
        !user_email ||
        !number ||
        !user_address ||
        !emerg_contact ? (
          <div className="extra-info-holder">
            <div className="add-info">
              <h2>Essential Information</h2>
              <TextField
                floatingLabelText="Email"
                floatingLabelStyle={{ color: "#BBDEFB" }}
                floatingLabelFocusStyle={{ color: "#1565C0" }}
                underlineStyle={{ borderColor: "#BBDEFB" }}
                errorText="This feild is required"
                errorStyle={{ color: "#0D47A1" }}
                onChange={e => this.handleEmail(e.target.value)}
              />
              <TextField
                floatingLabelText="Phone Number"
                floatingLabelStyle={{ color: "#BBDEFB" }}
                floatingLabelFocusStyle={{ color: "#1565C0" }}
                underlineStyle={{ borderColor: "#BBDEFB" }}
                errorText="This feild is required"
                errorStyle={{ color: "#0D47A1" }}
                onChange={e => this.handleNumber(e.target.value)}
              />
              <TextField
                floatingLabelText="Address"
                floatingLabelStyle={{ color: "#BBDEFB" }}
                floatingLabelFocusStyle={{ color: "#1565C0" }}
                underlineStyle={{ borderColor: "#BBDEFB" }}
                errorText="This feild is required"
                errorStyle={{ color: "#0D47A1" }}
                onChange={e => this.handleAddress(e.target.value)}
              />
              <TextField
                floatingLabelText="Emergency Contact"
                floatingLabelStyle={{ color: "#BBDEFB" }}
                floatingLabelFocusStyle={{ color: "#1565C0" }}
                underlineStyle={{ borderColor: "#BBDEFB" }}
                errorText="This feild is required"
                errorStyle={{ color: "#0D47A1" }}
                onChange={e => this.handleContact(e.target.value)}
              />
              <RaisedButton
                backgroundColor="#1565C0"
                labelColor="#BBDEFB"
                label="Update"
                onClick={this.submitVals}
              />
            </div>
            <div className="explain-why">
              <h4>Why do you need my information?</h4>
              <h6>
                When using our services some features need your information,
                lessening the probability of wrong information or
                miscommunication
              </h6>
              <h4>Is my information safe?</h4>
              <h6>
                Yes! All of your information is handled with care, and protected
                with the best modern technologies that exist today.
              </h6>
              <h4>What if I put false information?</h4>
              <h6>
                With exceptions of impersonation legality issues, your account
                will be put on the strict watch list, and you will be received a
                warning. On second offense charges your account will be
                terminated!
              </h6>
              <h4>My Account was falsely terminated</h4>
              <h6>
                No worries, terminated accounts are not deleted until a month
                after the accusations. This gives the user enough time to
                contact us, and help us resolve the issue
              </h6>
            </div>
          </div>
        ) : (
          <div>
            <LoginNav />
            <div className="profile">
              <img
                className="profile-image"
                src={this.props.photo}
                width="450px"
                height="450px"
              />

              <div className="info-holder">
                <h2 className="profile_name">{name}</h2>
                <h4>Email: {user_email}</h4>
                <h4>Phone Number: {number}</h4>
                <h4>Address: {user_address}</h4>
                <h4>Emergency Contact: {emerg_contact}</h4>
              </div>
              <div className="mapped-emails">
                <h4>ALERTS</h4>
                {!this.props.emails.length ? (
                  <h6 className="no-notifications">No notifications</h6>
                ) : (
                  mappedEmails
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    ...state.users
  };
};
export default connect(mapStateToProps, {
  getUser,
  updateUser,
  updateLocation,
  locationError,
  getCompany,
  getEmails,
  removeAlert
})(Profile);
