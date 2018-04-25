import axios from "axios";
import { connect } from "react-redux";
const initialState = {
  weekOf: "",
  adminSchedules: [],
  loading: false
};

/////////////////////////ACTION CONSTANTS

const CREATE_SCHEDULE = "CREATE_SCHEDULE";
const HANDLE_STATE_UPDATE = "HANDLE_STATE_UPDATE";
const HANDLE_OPEN = "HANDLE_OPEN";
const HANDLE_OFF = "HANDLE_OFF";
const GET_WEEK_OF = "GET_WEEK_OF";
const SET_WEEK_OF = "SET_WEEK_OF";
const GET_EMPLOYEES = "GET_EMPLOYEES";
//////////////////ACTION CREATORS
export function getEmployees(id) {
  console.log("get employes reducer hit");
  return {
    type: GET_EMPLOYEES,
    payload: axios.get(`/employees${id}`)
  };
}

export function setWeekOf(val) {
  console.log("SET WEEK OF WAS HIT");
  return {
    type: SET_WEEK_OF,
    payload: val
  };
}

export function getWeekOf(currentUser, week) {
  return {
    type: GET_WEEK_OF,
    payload: axios.get(`/weekof?user=${currentUser}&weekof=${week}`)
  };
}

export function createSchedule(userId, arr) {
  let currDate = new Date();
  let newCurr = `${currDate.getMonth()}/${currDate.getDate()}/${currDate.getFullYear()}`;
  return {
    type: CREATE_SCHEDULE,
    payload: axios.post("/createschedule", { newCurr, userId, arr })
  };
}
export function handleOpen(prop) {
  console.log(prop);
  return {
    type: HANDLE_OPEN,
    payload: prop
  };
}
export function handleStateUpdate(int, prop, val) {
  console.log(
    `HANDLE STATE UPDATE HIT HERE ARE THE VALUES INT : => ${int} PROP : => ${prop} VAL : => ${val}`
  );
  return {
    type: HANDLE_STATE_UPDATE,
    payload: { int, prop, val }
  };
}
export function handleOff(who, property) {
  return {
    type: HANDLE_OFF,
    payload: { who, property }
  };
}

///////////////////// THIS IS THE START OF THE ACTIONS REDUCER
export default function schedulesreducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_EMPLOYEES}_FULFILLED`:
      console.log("HELOOOOOOOO WORRRRLLLLLDDD");
      let mappedEmployees = action.payload.data.map(e => {
        return {
          full_name: e.full_name,
          emergency_contact: e.emergency_contact,
          email: e.email,
          address: e.address,
          phone_number: e.phone_number,
          schedule: [
            { weekOf: state.weekOf },
            {
              mondaymorningclockin: "",
              mondaymorningclockout: ""
            },
            {
              mondaynightclockin: "",
              mondaynightclockout: ""
            },

            {
              tuesdaymorningclockin: "",
              tuesdaymorningclockout: ""
            },
            {
              tuesdaynightclockin: "",
              tuesdaynightclockout: ""
            },

            {
              wednesdaymorningclockin: "",
              wednesdaymorningclockout: ""
            },
            {
              wednesdaynightclockin: "",
              wednesdaynightclockout: ""
            },

            {
              thursdaymorningclockin: "",
              thursdaymorningclockout: ""
            },
            {
              thursdaynightclockin: "",
              thursdaynightclockout: ""
            },

            {
              fridaymorningclockin: "",
              fridaymorningclockout: ""
            },
            {
              fridaynightclockin: "",
              fridaynightclockout: ""
            },

            {
              saturdaymorningclockin: "",
              saturdaymorningclockout: ""
            },
            {
              saturdaynightclockin: "",
              saturdaynightclockout: ""
            },

            {
              sundaymorningclockin: "",
              sundaymorningclockout: ""
            },
            {
              sundaynightclockin: "",
              sundaynightclockout: ""
            }
          ],
          userinfo: false,
          mondaymorningopen: false,
          mondaynightopen: false,
          tuesdaymorningopen: false,
          tuesdaynightopen: false,
          wednesdaymorningopen: false,
          wednesdaynightopen: false,
          thursdaymorningopen: false,
          thursdaynightopen: false,
          fridaymorningopen: false,
          fridaynightopen: false,
          saturdaymorningopen: false,
          saturdaynightopen: false,
          sundaymorningopen: false,
          sundaynightopen: false
        };
      });
      return { ...state, adminSchedules: mappedEmployees };
    case `${GET_WEEK_OF}_FULFILLED`:
      console.log(action.payload.data);
      if (action.payload.data.length === 0) {
        return { ...state, adminSchedules: [] };
      } else {
        return { ...state, adminSchedules: action.payload.data };
      }
    case SET_WEEK_OF:
      return {
        ...state,
        weekOf: action.payload
      };
    case HANDLE_STATE_UPDATE:
      console.log("handle state hit");
      let { int, prop, val } = action.payload;
      let hours = val.getHours();
      let minutes = val.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (hours === 12) {
        minutes = `${minutes}p`;
      } else if (hours >= 12) {
        hours = `${hours - 12}`;
        minutes = `${minutes}p`;
      } else if (hours === 0) {
        hours = `12`;
        minutes = `${minutes}a`;
      } else if (hours < 12) {
        minutes = `${minutes}a`;
      }
      console.log(`[${prop}]: ${hours}:${minutes}`);
      return {
        ...state,
        schedule: {
          ...state.schedule,
          schedule: {
            ...state.schedule.schedule,
            [int]: {
              ...state.schedule.schedule[int],
              [prop]: `${hours}:${minutes}`
            }
          }
        }
      };
    case HANDLE_OPEN:
      console.log("OPEN UP");
      return {
        ...state,
        [action.payload]: !state[action.payload]
      };
    case HANDLE_OFF:
      let { who, property } = action.payload;
      let clockin = `${property}clockin`;
      let clockout = `${property}clockout`;
      return {
        ...state,
        schedule: {
          ...state.schedule,
          schedule: [
            ...state.schedule.schedule,

            (state.schedule.schedule[who] = {
              [clockin]: null,
              [clockout]: null
            })
          ]
        }
      };
    case CREATE_SCHEDULE:
      console.log("schedule init hit");
      return { ...state, adminSchedules: action.payload.data };
    case `${GET_WEEK_OF}_PENDING`:
      return { ...state, loading: true };
    case `${GET_WEEK_OF}_FULFILLED`:
      return { ...state, adminSchedules: action.payload.data, loading: false };
    //DEFAULT
    default:
      return state;
  }
}
