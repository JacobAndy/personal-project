import React, { Component } from "react";

class Error extends Component {
  constructor() {
    super();
    this.state = {};
  }
  loginHandler() {
    window.location.href = "http://localhost:3003/auth";
  }
  render() {
    return (
      <div>
        <h1>this is the error page</h1>
        <h4>
          you were directed here due to you not being logged into an accessible
          account
        </h4>
        <h3>please sign in, and come back!</h3>
        <h4>sign in here</h4>
        <button onClick={this.loginHandler}>sign in</button>
      </div>
    );
  }
}
export default Error;
