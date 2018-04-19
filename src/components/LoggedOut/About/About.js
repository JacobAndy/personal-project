import React, { Component } from "react";
import LoginNav from "../../Nav/LoginNav/LoginNav";
import "./About.css";

class About extends Component {
  render() {
    return (
      <div>
        <LoginNav />
        <div className="about-page-main">
          <div className="about-page-title">
            <h2>Features Every Business Needs</h2>
          </div>
          <div className="about-section">
            <h4>
              Our organization provides companies with top technologies that
              help improve sales, business and communication. We are here to
              support you and get the satisfaction you need!
            </h4>
          </div>
          <div className="question-holder">
            <h3 className="question-title">Questions or Concerns?</h3>
            <h4 className="question">
              No Problem! Any questions or issues you may have dont hesitate to
              email us at entityschedules@gmail.com. Our offices are open 9a-5p
              monday-friday! Any emails recieved over the weekend will get an
              immediate response the following monday!
            </h4>
          </div>
        </div>
      </div>
    );
  }
}
export default About;
