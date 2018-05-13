import React, { Component } from "react";
import { connect } from "react-redux";
import X from "material-ui/svg-icons/navigation/close.js";
import {
  getUser,
  updateUser,
  updateLocation,
  getEmails,
  removeAlert,
  updateUserInfo
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
      emcontact: "",
      new_full_name: "",
      new_bio: "",
      updateToggle: false
    };
    this.submitVals = this.submitVals.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
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
  handleProfileUpdate() {
    let full_name_send = this.props.name;
    let bio_send = this.state.new_bio;
    let email_send = this.props.user_email;
    let phone_number_send = this.props.number;
    let address_send = this.props.user_address;
    let emergency_contact_send = this.props.emerg_contact;
    if (this.state.new_full_name.length) {
      full_name_send = this.state.new_full_name;
    }
    if (this.state.newemail.length) {
      email_send = this.state.newemail;
    }
    if (this.state.newnumber.length) {
      phone_number_send = this.state.newnumber;
    }
    if (this.state.newaddress.length) {
      address_send = this.state.newaddress;
    }
    if (this.state.emcontact.length) {
      emergency_contact_send = this.state.emcontact;
    }
    console.log(this.state);
    console.log(`FULL NAME${full_name_send}`);
    console.log(`BIO SEND : =>${bio_send}`);
    console.log(`EMAIL SEND : =>${email_send}`);
    console.log(`PHONE NUMBER : =>${phone_number_send}`);
    console.log(`ADDRESS : =>${address_send}`);
    console.log(`EMERGENCY CONTACT : =>${emergency_contact_send}`);
    this.props.updateUserInfo(
      this.props.user_id,
      full_name_send,
      bio_send,
      email_send,
      phone_number_send,
      address_send,
      emergency_contact_send
    );
    this.setState({ updateToggle: !this.state.updateToggle });
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
                style={{ width: "40%" }}
                floatingLabelText="Email"
                floatingLabelStyle={{ color: "#BBDEFB" }}
                floatingLabelFocusStyle={{ color: "#1565C0" }}
                underlineStyle={{ borderColor: "#BBDEFB" }}
                errorText="Required"
                errorStyle={{ color: "#0D47A1" }}
                onChange={e => this.handleEmail(e.target.value)}
              />
              <TextField
                style={{ width: "40%" }}
                floatingLabelText="Phone"
                floatingLabelStyle={{ color: "#BBDEFB" }}
                floatingLabelFocusStyle={{ color: "#1565C0" }}
                underlineStyle={{ borderColor: "#BBDEFB" }}
                errorText="Required"
                errorStyle={{ color: "#0D47A1" }}
                onChange={e => this.handleNumber(e.target.value)}
              />
              <TextField
                style={{ width: "40%" }}
                floatingLabelText="Address"
                floatingLabelStyle={{ color: "#BBDEFB" }}
                floatingLabelFocusStyle={{ color: "#1565C0" }}
                underlineStyle={{ borderColor: "#BBDEFB" }}
                errorText="Required"
                errorStyle={{ color: "#0D47A1" }}
                onChange={e => this.handleAddress(e.target.value)}
              />
              <TextField
                style={{ width: "40%" }}
                floatingLabelText="Emergency"
                floatingLabelStyle={{ color: "#BBDEFB" }}
                floatingLabelFocusStyle={{ color: "#1565C0" }}
                underlineStyle={{ borderColor: "#BBDEFB" }}
                errorText="Required"
                errorStyle={{ color: "#0D47A1" }}
                onChange={e => this.handleContact(e.target.value)}
              />
              <div className="sumbitvalsbutton">
                <RaisedButton
                  style={{ width: "20%" }}
                  backgroundColor="#1565C0"
                  labelColor="#BBDEFB"
                  label="Update"
                  onClick={this.submitVals}
                />
              </div>
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
              <div className="info-holder">
                <div className="profile-image-holder" />
                <div className="image">
                  <img
                    className="profile-image"
                    src={this.props.photo}
                    width="100%"
                    height="100%"
                  />
                </div>
                {/* <div className="bio" /> */}
                {this.state.updateToggle ? (
                  <div>
                    <div className="personal-info">
                      {/* <h2 className="profile_name">{name}</h2> */}
                      <TextField
                        onChange={e =>
                          this.setState({ new_full_name: e.target.value })
                        }
                        inputStyle={{ color: "#1E88E5" }}
                        hintStyle={{ color: "rgba(30, 136, 229, 0.5)" }}
                        hintText={name}
                        errorText="Full Name"
                        errorStyle={{
                          color: "#0D47A1",
                          borderColor: "#0D47A1"
                        }}
                      />
                      <TextField
                        onChange={e =>
                          this.setState({ new_bio: e.target.value })
                        }
                        textareaStyle={{ color: "#1E88E5" }}
                        placeholder="bio"
                        rows={3}
                        rowsMax={3}
                        multiLine={true}
                        errorText="Bio"
                        errorStyle={{
                          color: "#0D47A1",
                          borderColor: "#0D47A1"
                        }}
                      />
                      <TextField
                        onChange={e =>
                          this.setState({ newemail: e.target.value })
                        }
                        inputStyle={{ color: "#1E88E5" }}
                        hintStyle={{ color: "rgba(30, 136, 229, 0.5)" }}
                        hintText={user_email}
                        errorText="Email"
                        errorStyle={{
                          color: "#0D47A1",
                          borderColor: "#0D47A1"
                        }}
                      />
                      <TextField
                        onChange={e =>
                          this.setState({ newnumber: e.target.value })
                        }
                        inputStyle={{ color: "#1E88E5" }}
                        hintStyle={{ color: "rgba(30, 136, 229, 0.5)" }}
                        hintText={number}
                        errorText="Phone Number"
                        errorStyle={{
                          color: "#0D47A1",
                          borderColor: "#0D47A1"
                        }}
                      />
                      <TextField
                        onChange={e =>
                          this.setState({ newaddress: e.target.value })
                        }
                        inputStyle={{ color: "#1E88E5" }}
                        hintStyle={{ color: "rgba(30, 136, 229, 0.5)" }}
                        hintText={user_address}
                        errorText="Address"
                        errorStyle={{
                          color: "#0D47A1",
                          borderColor: "#0D47A1"
                        }}
                      />
                      <TextField
                        onChange={e =>
                          this.setState({ emcontact: e.target.value })
                        }
                        inputStyle={{ color: "#1E88E5" }}
                        hintStyle={{ color: "rgba(30, 136, 229, 0.5)" }}
                        hintText={emerg_contact}
                        errorText="Emergency Contact"
                        errorStyle={{
                          color: "#0D47A1",
                          borderColor: "#0D47A1"
                        }}
                      />
                    </div>
                    <div className="update-profile-cancel-update">
                      <RaisedButton
                        onClick={() =>
                          this.setState({
                            updateToggle: !this.state.updateToggle
                          })
                        }
                        label="Cancel"
                        backgroundColor="#BBDEFB"
                      />
                      <RaisedButton
                        onClick={this.handleProfileUpdate}
                        label="Update"
                        backgroundColor="#BBDEFB"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <RaisedButton
                      onClick={() =>
                        this.setState({
                          updateToggle: !this.state.updateToggle
                        })
                      }
                    />
                  </div>
                )}
              </div>
              <div className="mapped-emails">
                <div className="whatsNew">
                  <h4>Whats new?</h4>
                </div>
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
  removeAlert,
  updateUserInfo
})(Profile);
