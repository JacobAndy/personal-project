import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, updateUser, updateLocation } from "../../../ducks/users";
import LoginNav from "../../Nav/LoginNav/Nav";
import "./Profile.css";
import Error from "../../Error/Error";
import { locationError } from "../../../ducks/users";
import { getCompany } from "../../../ducks/company";

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
    console.log("hit get user did mount");
    this.props.getUser().catch(err => console.log(err));
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
    console.log(name, user_email, number, user_address, emerg_contact);
    return (
      <div>
        <LoginNav />
        {!this.props.currentUser[0] ? (
          <Error />
        ) : !name ||
        !user_email ||
        !number ||
        !user_address ||
        !emerg_contact ? (
          <div className="add-info">
            <h2>Essential Information</h2>
            <h4>email</h4>
            <input onChange={e => this.handleEmail(e.target.value)} />
            <h4>Phone Number</h4>
            <input onChange={e => this.handleNumber(e.target.value)} />
            <h4>Address</h4>
            <input onChange={e => this.handleAddress(e.target.value)} />
            <h4>Emergency Contact</h4>
            <input onChange={e => this.handleContact(e.target.value)} />
            <button onClick={this.submitVals}>Update Information</button>
          </div>
        ) : (
          <div className="profile">
            <img
              className="profile-image"
              src={this.props.photo}
              width="400px"
              height="400px"
            />
            <h2 className="profile_name">{name}</h2>
            <div className="info-holder">
              <h2>Email: {user_email}</h2>
              <h2>Phone Number: {number}</h2>
              <h2>Address: {user_address}</h2>
              <h2>Emergency Contact: {emerg_contact}</h2>
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
  getCompany
})(Profile);
