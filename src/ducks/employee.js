import axios from "axios";
const initialState = {};

const GET_STAFF = "GET_STAFF";
const LEAVE_COMPANY = "LEAVE_COMPANY";
const ADD_EDIT_TOGGLE = "ADD_EDIT_TOGGLE";

export default function employee(state = initialState, action) {
  switch (action.type) {
    case ADD_EDIT_TOGGLE:
      let { who, value } = action.payload;
      return { ...state, who: value };
    case `${GET_STAFF}_PENDING`:
      console.log(`GET STAFF IS PENDING`);
    case `${GET_STAFF}_FULFILLED`:
      console.log(action.payload.data);

    case `${LEAVE_COMPANY}FULFILLED`:
      return { ...state };
    default:
      return state;
  }
}
export function leaveCompany(compid, userid) {
  return {
    type: LEAVE_COMPANY,
    payload: axios.put(`/leavecompany/${compid}`, { userid })
  };
}
export function getStaff(arr) {
  console.log("GETTING EMPLOYEES WITH COMPANY ID WAS HIT IN REDUCER");
  return {
    type: GET_STAFF,
    payload: axios.post(`/jobs/staff/`, { arr })
  };
}
export function addEditToggle(who, value) {
  console.log(who);
  console.log(value);
  return {
    type: ADD_EDIT_TOGGLE,
    payload: { who, value }
  };
}
