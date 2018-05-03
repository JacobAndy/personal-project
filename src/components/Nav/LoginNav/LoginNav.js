import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LoginNav.css";
import { connect } from "react-redux";
import { logout, login } from "../../../ducks/users";
import { withRouter } from "react-router-dom";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      burgerFlag: false
    };
    this.handleBurger = this.handleBurger.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }
  handleBurger() {
    this.setState({ burgerFlag: !this.state.burgerFlag });
  }
  logoutHandler() {
    this.props.history.push("/");
    this.props.logout();
  }
  loginHandler() {
    window.location.href = "http://localhost:3003/auth";
  }
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.currentUser[0] ? (
          <Link to="/profile">
            <div className="user-profile-details">
              <img
                src={this.props.photo}
                className="nav-bar-userpicture"
                width="40px"
                height="40px"
              />
              <h6>{this.props.name}</h6>
            </div>
          </Link>
        ) : null}
        {!this.state.burgerFlag ? (
          <div id="main">
            <div className="entity">
              <h2>Entity Schedules</h2>
            </div>
            <div id="burger" onClick={this.handleBurger}>
              <div className="top-bun" />
              <div className="meat" />
              <div className="bottom-bun" />
            </div>
          </div>
        ) : (
          <div id="main">
            <div className="entity">
              <h2>Entity Schedules</h2>
            </div>
            <div className="burger-holder">
              <div id="burger" onClick={this.handleBurger}>
                <div className="top-bun" />
                <div className="meat" />
                <div className="bottom-bun" />
              </div>
            </div>
            {!this.props.currentUser[0] ? (
              <div>
                <div className="image-login" />
                <div>
                  <h5 id="burger-login" onClick={this.loginHandler}>
                    Login now
                  </h5>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <h5 id="burger-login" onClick={this.logoutHandler}>
                    Log Out
                  </h5>
                </div>
              </div>
            )}
            {!this.props.currentUser[0] ? (
              <div id="burger-selectors">
                <Link to="/">
                  <h5 className="burger-options">Home</h5>
                </Link>
                <Link to="/about">
                  <h5 className="burger-options">About Us</h5>
                </Link>
                <Link to="/services">
                  <h5 className="burger-options">Our Services</h5>
                </Link>
                <Link to="/contact">
                  <h5 className="burger-options">Contact</h5>
                </Link>
              </div>
            ) : (
              <div id="burger-selectors">
                <Link to="/">
                  <h5 className="burger-options">Home</h5>
                </Link>
                <Link to="/profile">
                  <h5 className="burger-options">Profile</h5>
                </Link>
                <Link to="/jobs">
                  <h5 className="burger-options">Jobs</h5>
                </Link>
                <Link to="/schedule">
                  <h5 className="burger-options">Schedule</h5>
                </Link>
                <Link to="/directions">
                  <h5 className="burger-options">Directions</h5>
                </Link>
                <Link to="/traffic">
                  <h5 className="burger-options">Traffic</h5>
                </Link>

                <Link to="/about">
                  <h5 className="burger-options">About Us</h5>
                </Link>
                <Link to="/services">
                  <h5 className="burger-options">Our Services</h5>
                  <Link to="/contact">
                    <h5 className="burger-options">Contact</h5>
                  </Link>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
let mapStateToProps = state => {
  return { ...state.users };
};
export default withRouter(connect(mapStateToProps, { logout, login })(Nav));
