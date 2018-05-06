/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import LoginNav from "../../Nav/LoginNav/Nav";
import { connect } from "react-redux";
import Error from "../../Error/Error";
import { compose, withProps } from "recompose";
import { getCompany, setTraffic } from "../../../ducks/company";
import "../google_directions/GoogleDirections.css";
import { getUser } from "../../../ducks/users";
import {
  withGoogleMap,
  GoogleMap,
  TrafficLayer,
  Marker,
  withScriptjs
} from "react-google-maps";

class Traffic extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props);
    this.props.getUser().then(() => {
      this.props.getCompany(this.props.currentUser[0].user_id);
    });
    // this.props.getCompany(this.props.user_id);
  }
  render() {
    let { currentCompanyLatitude, currentCompanyLongitude } = this.props;
    console.log(currentCompanyLatitude);
    console.log(currentCompanyLongitude);
    const GoogleTraffic = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
          process.env.REACT_APP_GOOGLE_MAP_KEY
        }`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `92.5vh`, width: "1200px" }} />,
        mapElement: <div style={{ height: `100%`, width: "100%" }} />
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{
          lat: +currentCompanyLatitude,
          lng: +currentCompanyLongitude
        }}
      >
        <Marker
          position={{
            lat: +currentCompanyLatitude,
            lng: +currentCompanyLongitude
          }}
        />
        <TrafficLayer autoUpdate />
      </GoogleMap>
    ));
    console.log(this.props.companys);
    let mapCompany = this.props.companys.map((e, i) => {
      return (
        <div
          className="companys-in-map"
          onClick={() => this.props.setTraffic(e.company_id)}
          key={i}
        >
          <h3>{e.name}</h3>
          <h3>Location: {e.location}</h3>
        </div>
      );
    });
    return (
      <div>
        <LoginNav />
        {!this.props.companys.length && this.props.currentUser[0] ? (
          <div>
            <h3>you have no business</h3>
          </div>
        ) : this.props.currentUser[0] ? (
          <div>
            <h3 className="maptitle">Live Traffic Feed</h3>
            <div className="GoogleDirections">
              <GoogleTraffic />
              <div className="mappedDirectionCompany">
                <h3 className="jobs">Jobs</h3>
                {mapCompany}
              </div>
            </div>
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
export default connect(mapStateToProps, {
  getCompany,
  setTraffic,
  getUser
})(Traffic);
