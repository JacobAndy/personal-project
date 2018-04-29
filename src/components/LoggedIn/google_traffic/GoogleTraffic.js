/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import LoginNav from "../../Nav/LoginNav/LoginNav";
import { connect } from "react-redux";
import Error from "../../Error/Error";
import { compose, withProps } from "recompose";
import {
  withGoogleMap,
  GoogleMap,
  TrafficLayer,
  Marker,
  withScriptjs
} from "react-google-maps";
const GoogleTraffic = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAP_KEY
    }`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 40.226258, lng: -111.660753 }}
  >
    <Marker position={{ lat: 40.226258, lng: -111.660753 }} />
    <TrafficLayer autoUpdate />
  </GoogleMap>
));

class Traffic extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
    // this.props.getCompany(this.props.user_id);
  }
  render() {
    return (
      <div>
        <LoginNav />
        {this.props.currentUser[0] ? (
          <div>
            <h3>Live Traffic Feed</h3>
            <GoogleTraffic />
          </div>
        ) : (
          <Error />
        )}
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    ...state.users,
    ...state.company
  };
};
export default connect(mapStateToProps, {})(Traffic);
