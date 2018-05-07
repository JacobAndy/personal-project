import axios from "axios";
let initialstate = {
  currentUser: [],
  user_id: "",
  photo: "",
  name: "",
  user_email: "",
  number: "",
  user_address: "",
  emerg_contact: "",
  emails: [],
  userLat: 0,
  userLong: 0,
  loading: false,
  locationErrors: false
};

const AUTH_CTRL = "AUTH_CTRL";
const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const UPDATE_LOCATION = "UPDATE_LOCATION";
const LOCATION_ERROR = "LOCATION_ERROR";
const GET_EMAILS = "GET_EMAILS";
const REMOVE_ALERT = "REMOVE_ALERT";

export default function reducer(state = initialstate, action) {
  switch (action.type) {
    case LOCATION_ERROR:
      return { ...state, locationError: true };
    case `${REMOVE_ALERT}_FULFILLED`:
    case `${GET_EMAILS}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, emails: action.payload.data };
    case `${GET_USER}_PENDING`:
      console.log("pending");
      return { ...state, loading: true };
    case `${GET_USER}_FULFILLED`:
      console.log(action.payload.data[0]);
      return {
        ...state,
        user_id: action.payload.data[0].user_id,
        currentUser: action.payload.data,
        photo: action.payload.data[0].image,
        name: action.payload.data[0].full_name,
        user_email: action.payload.data[0].email,
        number: action.payload.data[0].phone_number,
        user_address: action.payload.data[0].address,
        emerg_contact: action.payload.data[0].emergency_contact,
        loading: false
      };
    case `${UPDATE_USER}_PENDING`:
      return { ...state, loading: true };
    case `${UPDATE_USER}_FULFILLED`:
      console.log(action.payload.data);
      return {
        ...state,
        loading: false,
        currentUser: action.payload.data,
        user_email: action.payload.data[0].email,
        number: action.payload.data[0].phone_number,
        user_address: action.payload.data[0].address,
        emerg_contact: action.payload.data[0].emergency_contact
      };
    case `${LOG_IN}_FULFILLED`:
      return null;
    case `${LOG_OUT}_FULFILLED`:
      return {
        ...state,
        currentUser: [],
        photo: "",
        name: "",
        user_email: "",
        number: "",
        user_address: "",
        emerg_contact: ""
      };
    case `${UPDATE_LOCATION}`:
      return {
        ...state,
        userLat: action.payload.lat,
        userLong: action.payload.long,
        locationError: false
      };
    //default call
    default:
      console.log(state);
      return state;
  }
}
export function removeAlert(id, userid) {
  return {
    type: REMOVE_ALERT,
    payload: axios.delete(`/alert/remove/${id}?user=${userid}`)
  };
}
export function getEmails(id) {
  console.log(id);
  return {
    type: GET_EMAILS,
    payload: axios.get(`/user/emails/${id}`)
  };
}
export function getUser() {
  console.log("hit getUser function");
  return {
    type: GET_USER,
    payload: axios.get("/profile")
  };
}
export function updateUser(email, number, address, emergencycontact, auth) {
  console.log("daddddddy");
  return {
    type: UPDATE_USER,
    payload: axios.put("/update", {
      email,
      number,
      address,
      emergencycontact,
      auth
    })
  };
}
export function login() {
  return {
    type: LOG_IN,
    payload: axios.get("/auth")
  };
}
export function logout() {
  return {
    type: LOG_OUT,
    payload: axios.get("/logout")
  };
}
export function updateLocation(lat, long) {
  return {
    type: UPDATE_LOCATION,
    payload: { lat, long }
  };
}
export function locationError() {
  navigator.geolocation.getCurrentPosition(
    position => {
      updateLocation(position.coords.latitude, position.coords.longitude);
      console.log(
        `LATITUDE : => ${position.coords.latitude}, LONGITUDE : => ${
          position.coords.longitude
        }`
      );
    },
    error => {
      console.log("ERROR HIT");
      locationError();
    },
    {
      enableHighAccuracy: false,
      timeout: 300000,
      maximumAge: 0
    }
  );
  return {
    type: LOCATION_ERROR,
    payload: false
  };
}
