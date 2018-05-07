import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import MenuItem from "material-ui/MenuItem";
import { Link } from "react-router-dom";
import "./Nav.css";
import { connect } from "react-redux";
import { logout, login } from "../../../ducks/users";
import { withRouter } from "react-router-dom";
import IconButton from "material-ui/IconButton";
import ArrowClose from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import ArrowOpen from "material-ui/svg-icons/hardware/keyboard-arrow-right";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      burgerFlag: false
    };
    this.burgerHandle = this.burgerHandle.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }
  burgerHandle() {
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
    return (
      <div>
        <AppBar
          iconElementLeft={
            <IconButton>
              <ArrowOpen color="#333" hoverColor="black" />
            </IconButton>
          }
          style={{
            // padding: "0 0 0px 16px",
            borderRadius: "5px",
            width: "3.7vw",
            height: "3.7vw",
            position: "fixed",
            top: "3px",
            left: "3px",
            background: "#0ca2d0"
          }}
          onClick={this.burgerHandle}
        />
        <Drawer
          containerStyle={{ background: "#0ca2d0" }}
          docked={false}
          width={300}
          open={this.state.burgerFlag}
          onRequestChange={this.burgerHandle}
        >
          <IconButton onClick={this.burgerHandle} style={{ marginTop: "10px" }}>
            <ArrowClose color="#333" hoverColor="black" />
          </IconButton>
          {!this.props.currentUser[0] ? (
            <div className="item-holder">
              <div className="logholder">
                <div className="image-holder-login" />
                <MenuItem
                  style={{ width: "219%", color: "whitesmoke" }}
                  onClick={this.loginHandler}
                >
                  Login Now
                </MenuItem>
              </div>
              <div className="link-holder">
                <Link to="/">
                  <MenuItem
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    Home
                  </MenuItem>
                </Link>

                {/* <Link to="/about">
                  <MenuItem
                    
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    About Us
                  </MenuItem>
                </Link>
                <Link to="/services">
                  <MenuItem
                   
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    Our Services
                  </MenuItem>
                </Link>
                <Link to="/contact">
                  <MenuItem
                   
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    Contact
                  </MenuItem>
                </Link> */}
              </div>
            </div>
          ) : (
            <div className="item-holder">
              <div className="logholder">
                <div className="image-holder-logout" />
                <MenuItem
                  style={{ width: "219%", color: "whitesmoke" }}
                  onClick={this.logoutHandler}
                >
                  Logout Now
                </MenuItem>
              </div>
              <div className="link-holder">
                <Link to="/">
                  <MenuItem
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    Home
                  </MenuItem>
                </Link>

                <Link to="/profile">
                  <MenuItem
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    Profile
                  </MenuItem>
                </Link>
                <Link to="jobs">
                  <MenuItem
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    Jobs
                  </MenuItem>
                </Link>
                <Link to="schedule">
                  <MenuItem
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    Schedule
                  </MenuItem>
                </Link>
                <Link to="Directions">
                  <MenuItem
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    Directions
                  </MenuItem>
                </Link>
                <Link to="Traffic">
                  <MenuItem
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    Traffic
                  </MenuItem>
                </Link>
                {/* <Link to="/about">
                  <MenuItem
                   
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    About Us
                  </MenuItem>
                </Link>
                <Link to="/services">
                  <MenuItem
                  
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    Our Service
                  </MenuItem>
                </Link>
                <Link to="/contact">
                  <MenuItem
                    
                    style={{ color: "whitesmoke" }}
                    onClick={() => {
                      this.burgerHandle();
                    }}
                  >
                    Contact
                  </MenuItem>
                </Link> */}
              </div>
            </div>
          )}
        </Drawer>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return { ...state.users };
};
export default withRouter(connect(mapStateToProps, { logout, login })(Nav));
