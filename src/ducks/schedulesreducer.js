import axios from "axios";
import { connect } from "react-redux";
const initialState = {
  weekOf: "",
  adminSchedules: [],
  loading: false,
  update: true
};

/////////////////////////ACTION CONSTANTS

const CREATE_SCHEDULE = "CREATE_SCHEDULE";
const HANDLE_STATE_UPDATE = "HANDLE_STATE_UPDATE";
const HANDLE_OPEN = "HANDLE_OPEN";
const HANDLE_OFF = "HANDLE_OFF";
const GET_WEEK_OF = "GET_WEEK_OF";
const SET_WEEK_OF = "SET_WEEK_OF";
const GET_EMPLOYEES = "GET_EMPLOYEES";
const HANDLE_UPDATE = "HANDLE_UPDATE";
const UPDATE_SCHEDULE = "UPDATE_SCHEDULE";
const DELETE_WEEK = "DELETE_WEEK";
//////////////////ACTION CREATORS
export function deleteWeek(arr, week) {
  let user = arr.map(e => e.employee_id);
  console.log(user);
  return {
    type: DELETE_WEEK,
    payload: axios.delete(`/rm/schedule?user=${user}&weekof=${week}`)
  };
}
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
export function updateschedule(week, userId, arr) {
  console.log(`THIS IS THE WEEK : => ${week}`);
  console.log(`THIS IS THE USER ID : => ${userId}`);
  console.log(arr);
  return {
    type: UPDATE_SCHEDULE,
    payload: axios.put("/updateschedule", { week, userId, arr })
  };
}
export function handleOpen(prop) {
  console.log(prop);
  return {
    type: HANDLE_OPEN,
    payload: prop
  };
}
export function handleStateUpdate(i, int, prop, val) {
  console.log(
    `HANDLE STATE UPDATE HIT HERE ARE THE VALUES ITERATION : => ${i} INT : => ${int} PROP : => ${prop} VAL : => ${val}`
  );
  return {
    type: HANDLE_STATE_UPDATE,
    payload: { i, int, prop, val }
  };
}
export function handleOff(who, property) {
  return {
    type: HANDLE_OFF,
    payload: { who, property }
  };
}
export function handleUpdate(val) {
  console.log("HANDLE UPDATE REDUCER WAS HIT");
  return {
    type: HANDLE_UPDATE,
    payload: val
  };
}

///////////////////// THIS IS THE START OF THE ACTIONS REDUCER
export default function schedulesreducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_UPDATE:
      console.log("HANDLE UPDATE REDUCER WAS HIT 1000X");
      return { ...state, update: action.payload };
    case `${GET_EMPLOYEES}_FULFILLED`:
      console.log(action.payload.data);
      handleUpdate(0);
      let mappedEmployees = action.payload.data.map(e => {
        return {
          employee_id: e.employee_id,
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
      return { ...state, adminSchedules: mappedEmployees, update: false };
    case `${GET_WEEK_OF}_FULFILLED`:
      console.log(action.payload.data);
      if (action.payload.data.length === 0) {
        return { ...state, adminSchedules: [] };
      } else {
        console.log("THIS IS THE ELSE STATEMENT121212121212121212");
        handleUpdate(1);
        let mapEmployees = action.payload.data.map(e => {
          return {
            employee_id: e.employee_id,
            full_name: e.full_name,
            emergency_contact: e.emergency_contact,
            email: e.email,
            address: e.address,
            phone_number: e.phone_number,
            schedule: [
              { weekOf: state.weekOf },
              {
                mondaymorningclockin: e.monday_morning.slice(0, 6),
                mondaymorningclockout: e.monday_morning.slice(6, 12)
              },
              {
                mondaynightclockin: e.monday_night.slice(0, 6),
                mondaynightclockout: e.monday_night.slice(6, 12)
              },

              {
                tuesdaymorningclockin: e.tuesday_morning.slice(0, 6),
                tuesdaymorningclockout: e.tuesday_morning.slice(6, 12)
              },
              {
                tuesdaynightclockin: e.tuesday_night.slice(0, 6),
                tuesdaynightclockout: e.tuesday_night.slice(6, 12)
              },

              {
                wednesdaymorningclockin: e.wednesday_morning.slice(0, 6),
                wednesdaymorningclockout: e.wednesday_morning.slice(6, 12)
              },
              {
                wednesdaynightclockin: e.wednesday_night.slice(0, 6),
                wednesdaynightclockout: e.wednesday_night.slice(6, 12)
              },

              {
                thursdaymorningclockin: e.thursday_morning.slice(0, 6),
                thursdaymorningclockout: e.thursday_morning.slice(6, 12)
              },
              {
                thursdaynightclockin: e.thursday_night.slice(0, 6),
                thursdaynightclockout: e.thursday_night.slice(6, 12)
              },

              {
                fridaymorningclockin: e.friday_morning.slice(0, 6),
                fridaymorningclockout: e.friday_morning.slice(6, 12)
              },
              {
                fridaynightclockin: e.friday_night.slice(0, 6),
                fridaynightclockout: e.friday_night.slice(6, 12)
              },

              {
                saturdaymorningclockin: e.saturday_morning.slice(0, 6),
                saturdaymorningclockout: e.saturday_morning.slice(6, 12)
              },
              {
                saturdaynightclockin: e.saturday_night.slice(0, 6),
                saturdaynightclockout: e.saturday_night.slice(6, 12)
              },

              {
                sundaymorningclockin: e.sunday_morning.slice(0, 6),
                sundaymorningclockout: e.sunday_morning.slice(6, 12)
              },
              {
                sundaynightclockin: e.sunday_night.slice(0, 6),
                sundaynightclockout: e.sunday_night.slice(6, 12)
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
        return {
          ...state,
          adminSchedules: mapEmployees,
          update: true
        };
      }
    case SET_WEEK_OF:
      return {
        ...state,
        weekOf: action.payload
      };
    case HANDLE_STATE_UPDATE:
      console.log("handle state hit");
      let { i, int, prop, val } = action.payload;
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
        adminSchedules: {
          ...state.adminSchedules,
          [i]: {
            ...state.adminSchedules[i],
            schedule: {
              ...state.adminSchedules[i].schedule,
              [int]: {
                ...state.adminSchedules[i].schedule[int],
                [prop]: `${hours}:${minutes}`
              }
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
    case `${CREATE_SCHEDULE}_FULFILLED`:
      return { ...state, adminSchedules: action.payload.data };
    case `${UPDATE_SCHEDULE}_FULFILLED`:
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
