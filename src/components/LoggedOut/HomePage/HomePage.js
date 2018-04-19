import React, { Component } from "react";
import LoginNav from "../../Nav/LoginNav/LoginNav";
import "./HomePage.css";

class HomePage extends Component {
  render() {
    return (
      <div>
        <LoginNav />
        <div className="home-main">
          <div className="home-title">
            <h3>Learn our technologies</h3>
          </div>
          <div className="home-desc">
            <h4>
              Newest technologies working together to bring the best experience
              for our user
            </h4>
          </div>
        </div>
      </div>
    );
  }
}
export default HomePage;
