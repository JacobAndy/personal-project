import React, { Component } from "react";
import LoginNav from "../../Nav/LoginNav/LoginNav";
import "./HomePage.css";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div>
        <LoginNav />
        <h3>Welcome to Entity!</h3>
        <div>
          <Link to="/about">
            <h4>About Us</h4>
            <h6>
              We are a group of highly trained professionals who came together
              to answer one question. This question wasnt how to change to
              world, or even reinvent the wheel. We wanted to take a technology
              that is useful as is, and make it better, more reliable, and more
              convient for corporate and the average user!
            </h6>
          </Link>
        </div>
        <div>
          <Link to="/ourservices">
            <h4>Our Technologies</h4>
            <h6>
              We have integrated some on the webs strongest sources together to
              provide you the best possible experience our guests deserve! These
              technologies prevent transformation blocks, provide reliable
              transformation information, and limit the possibility of
              miscommunication and the availability of mass messaging and email!
            </h6>
          </Link>
        </div>
        <div>
          <Link to="/contact">
            <h4>Interested?</h4>
            <h6>
              Feel free to contact us at any moment with the provided links
              below!
            </h6>
          </Link>
        </div>
      </div>
    );
  }
}
export default HomePage;
