import React, { Component } from "react";
import Nav from "../../Nav/LoginNav/Nav";

class ContactPage extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <Nav />
        <div>
          <h1>this is a contact page</h1>
        </div>
      </div>
    );
  }
}
export default ContactPage;
