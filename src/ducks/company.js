import axios from "axios";
const initialState = {
  loading: false,
  companys: [],
  jobs: [],
  currentCompanyLatitude: "",
  currentCompanyLongitude: "",
  currentCompanyId: "",
  currentCompanyEmployeeId: ""
};

const CREATE_GROUP = "CREATE_GROUP";
const GET_COMPANY = "GET_COMPANY";
const GET_ALL_JOBS = "GET_ALL_JOBS";

export default function company(state = initialState, action) {
  switch (action.type) {
    //create group
    case `${CREATE_GROUP}_PENDING`:
      return { ...state, loading: true };
    case `${CREATE_GROUP}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, loading: false };

    //get company
    case `${GET_COMPANY}_PENDING`:
      console.log("pending get company");
      return { ...state, loading: true };
    case `${GET_COMPANY}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, companys: action.payload.data, loading: false };
    case `${GET_ALL_JOBS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_ALL_JOBS}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, jobs: action.payload.data, loading: false };

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
export function getJobs() {
  return {
    type: GET_ALL_JOBS,
    payload: axios.get("/alljobs")
  };
}
