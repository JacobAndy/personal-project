import axios from "axios";
const initialState = {};

const CREATE_GROUP = "CREATE_GROUP";
const GET_COMPANY = "GET_COMPANY";

export default function company(state = initialState, action) {
  switch (action.payload) {
    //create group
    case `${CREATE_GROUP}_PENDING`:
      return { ...state, loading: true };
    case `${CREATE_GROUP}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, loading: false };

    //get company
    case `${GET_COMPANY}_PENDING`:
      return { ...state, loading: true };
    case `${GET_COMPANY}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, loading: false };

    //DEFAULT
    default:
      return state;
  }
}

//ACTIONS
export function createGroup(name, founded, founder) {
  return {
    type: CREATE_GROUP,
    payload: axios.post("/createcompany", { name, founded, founder })
  };
}
export function getCompany(userid) {
  return {
    type: GET_COMPANY,
    payload: axios.get(`/company/?userid=${userid}`)
  };
}
