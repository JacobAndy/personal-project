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
import CalculatingLocation from "../google_directions/CalculatingLocation";
import LoadingBar from "./GeneratingCompanys";
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
    this.state = {
      newCompanyLocation: false,
      loading: true
    };
    this.handleLoading = this.handleLoading.bind(this);
    this.newCompanyHandle = this.newCompanyHandle.bind(this);
  }
  componentDidMount() {
    this.handleLoading();
    console.log(this.props);
    this.props.getUser().then(() => {
      this.props.getCompany(this.props.currentUser[0].user_id);
    });
    // this.props.getCompany(this.props.user_id);
  }
  handleLoading() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
  newCompanyHandle() {
    this.setState({ newCompanyLocation: true });
    setTimeout(() => {
      this.setState({ newCompanyLocation: false });
    }, 1000);
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
        containerElement: (
          <div
            style={{
              margin: "1.5%",
              borderRadius: "15px",
              border: "2px solid blue",
              height: `95vh`,
              width: "70vw"
            }}
          />
        ),
        mapElement: (
          <div
            style={{ borderRadius: "15px", height: `100%`, width: "100%" }}
          />
        )
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
          onClick={() => {
            this.newCompanyHandle();
            this.props.setTraffic(e.company_id);
          }}
          key={i}
        >
          <h3>{e.name}</h3>
        </div>
      );
    });
    return (
      <div>
        <LoginNav />
        {this.state.loading && this.props.currentUser[0] ? (
          <LoadingBar />
        ) : !this.props.companys.length && this.props.currentUser[0] ? (
          <div>
            <h3>you have no business</h3>
          </div>
        ) : this.state.newCompanyLocation ? (
          <CalculatingLocation />
        ) : this.props.currentUser[0] ? (
          <div>
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
