import React, { Component } from "react";
import LoginNav from "../../Nav/LoginNav/Nav";
import "./OurServices.css";
import { Redirect } from "react-router-dom";

class OurServices extends Component {
  render() {
    return (
      <Redirect to="/" />
      // <div>
      //   <LoginNav />
      //   <h5 className="quote">
      //     Better three hours too soon than a minute too late.
      //   </h5>
      //   <h2 className="left-quotation">"</h2>
      //   <h5 className="quote1">-William Shakespeare</h5>
      //   <h2 className="right-quotation">"</h2>
      //   <div className="our-services">
      //     <div className="our-product">
      //       <h3 className="our-services-title">Our Services</h3>
      //       <h6>
      //         We offer a variety of technologies combined and implemented
      //         together to make a better work environment. The features in our
      //         app allow your business to post, update and read the schedule from
      //         any logged in device. With the rise of city growth and business
      //         sales increasing the factors of employees not showing up,
      //         forgetting, or being late to a shift can cause struggles and
      //         weaken a team tremendously. This being stated our team has made it
      //         a goal to reduce the amount of times this can happen. Our first
      //         feature uses automated texting to send a user a message 3 hours
      //         before their shift to remind them of that days shift. Texting the
      //         user combined with the availability to view live traffic around
      //         your area, and google maps we are able to get an individual the
      //         information they need to get to your location in a timely manner.
      //         We are here to work with you and improve business one company at a
      //         time!
      //       </h6>
      //     </div>
      //     <div className="facts">
      //       <h5 className="article-link">Forbes</h5>
      //       <h6>
      //         Forbes states{" "}
      //         <a href="https://www.forbes.com/sites/niallmccarthy/2014/12/03/how-often-are-americans-late-for-work-infographic/#2984a7dcdb4b">
      //           How Often Are Americans Late For Work?
      //         </a>{" "}
      //         here is a great graph displaying the percentages of Americans who
      //         show up late to work.
      //       </h6>
      //       <h5 className="article-link">YouGov</h5>
      //       <h6>
      //         According to{" "}
      //         <a href="https://today.yougov.com/news/2014/11/20/nearly-half-americans-are-never-late-work/">
      //           YouGov
      //         </a>, the biggest threat to punctuality is traffic, with 41
      //         percent of respondents claiming this is why they are late.
      //       </h6>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
export default OurServices;
