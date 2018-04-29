/* eslint-disable no-undef */
import React, { Component } from "react";
import LoginNav from "../../Nav/LoginNav/LoginNav";
import { connect } from "react-redux";
import Error from "../../Error/Error";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

const Directions = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAP_KEY
    }`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new google.maps.LatLng(41.85073, -87.65126),
          destination: new google.maps.LatLng(40.226258, -111.660753),
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({ directions: result });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.85073, -87.65126)}
  >
    <DirectionsRenderer directions={props.directions} />
  </GoogleMap>
));
<Directions />;

class GoogleDirections extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    // this.props.getCompany(this.props.userid);
  }
  render() {
    return (
      <div>
        <LoginNav />
        {this.props.currentUser[0] ? (
          <div>
            <h3>Directions</h3>
            <Directions />
          </div>
        ) : (
          <Error />
        )}
      </div>
    );
  }
}
let mapStateToProps = state => {
  return { ...state.users, ...state.company };
};
export default connect(mapStateToProps, {})(GoogleDirections);
