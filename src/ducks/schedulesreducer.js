import axios from "axios";
import { connect } from "react-redux";
const initialState = {
  weekOf: "",
  adminSchedules: [],
  loading: false,
  update: true,
  filterValue: ""
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
const COMPANY_WEEK_OF = "COMPANY_WEEK_OF";
const CREATE_GROUP_SCHEDULE = "CREATE_GROUP_SCHEDULE";
const UPDATE_GROUP_SCHEDULE = "UPDATE_GROUP_SCHEDULE";
const DELETE_SCHEDULE_WITH_ID = "DELETE_SCHEDULE_WITH_ID";
const FILTER_VALUE = "FILTER_VALUE";
const COMPANY_GET_EMPLOYEES = "COMPANY_GET_EMPLOYEES";
//////////////////ACTION CREATORS
export function getEmployeesByCompanyId(id) {
  console.log(id);
  console.log("GET EMPLOYEES WITH COMPANY ID WAS HIT IN THE REDUCER");
  return {
    type: COMPANY_GET_EMPLOYEES,
    payload: axios.get(`/jobs/staff/${id}`)
  };
}
export function updateFilterValue(val) {
  console.log(val);
  return {
    type: FILTER_VALUE,
    payload: val
  };
}

export function deleteWeekWithCompanyId(userId, compId, weekof) {
  console.log("with company id");
  return {
    type: DELETE_SCHEDULE_WITH_ID,
    payload: axios.delete(
      `/deletewithid?company=${compId}&user=${userId}&week=${weekof}`
    )
  };
}
export function updateCompanyWeekOf(compId, arr, userId, weekof) {
  return {
    type: UPDATE_GROUP_SCHEDULE,
    payload: axios.put(`/updatecompanyschedule/${compId}`, {
      arr,
      userId,
      weekof
    })
  };
}
export function deleteWeek(arr, week) {
  console.log(arr);
  let user = arr[0].employee_id;
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
    payload: axios.get(`/employees/${id}`)
  };
}

export function setWeekOf(val) {
  console.log("SET WEEK OF WAS HIT");
  return {
    type: SET_WEEK_OF,
    payload: val
  };
}
export function companyWeekOf(compId, week) {
  return {
    type: COMPANY_WEEK_OF,
    payload: axios.get(`/company/weekof?company=${compId}&weekof=${week}`)
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
export function createCompanyWeekOf(groupId, arr, userId) {
  console.log("CREATE GROUP REDUCER WAS HIT");
  let currDate = new Date();
  let newCurr = `${currDate.getMonth()}/${currDate.getDate()}/${currDate.getFullYear()}`;
  console.log(newCurr);
  return {
    type: CREATE_GROUP_SCHEDULE,
    payload: axios.post(`/creategroupschedule/${groupId}`, {
      newCurr,
      arr,
      userId
    })
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
export function handleOpen(propertyyy, intyy) {
  return {
    type: HANDLE_OPEN,
    payload: { propertyyy, intyy }
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
export function handleOff(j, who, property) {
  return {
    type: HANDLE_OFF,
    payload: { j, who, property }
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
    case FILTER_VALUE:
      return { ...state, filterValue: action.payload };
    case HANDLE_UPDATE:
      console.log("HANDLE UPDATE REDUCER WAS HIT 1000X");
      return { ...state, update: action.payload };
    case `${COMPANY_GET_EMPLOYEES}_PENDING`:
      console.log("company get employee pending");
      return { ...state };
    case `${COMPANY_GET_EMPLOYEES}_FULFILLED`:
    case `${GET_EMPLOYEES}_FULFILLED`:
      console.log(action.payload.data);
      console.log("get employees was hittttt boyy");
      handleUpdate(0);
      let mappedEmployees = action.payload.data.map(e => {
        console.log(e);
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
    case `${DELETE_SCHEDULE_WITH_ID}_FULFILLED`:
    case `${CREATE_SCHEDULE}_FULFILLED`:
    case `${UPDATE_SCHEDULE}_FULFILLED`:
    case `${UPDATE_GROUP_SCHEDULE}_FULFILLED`:
    case `${COMPANY_WEEK_OF}_FULFILLED`:
    case `${GET_WEEK_OF}_FULFILLED`:
      console.log(action.payload.data);
      console.log("get employees was hittttt boyy");
      if (action.payload.data.length === 0) {
        return { ...state, adminSchedules: [] };
      } else {
        console.log("THIS IS THE ELSE STATEMENT121212121212121212");
        console.log(action.payload.data);
        // handleUpdate(1);
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
      let { propertyyy, intyy } = action.payload;
      console.log(propertyyy);
      console.log(intyy);
      return {
        ...state,
        adminSchedules: {
          ...state.adminSchedules,
          [intyy]: {
            ...state.adminSchedules[intyy],
            [propertyyy]: !state.adminSchedules[intyy][propertyyy]
          }
        }
      };
    // }
    //   [action.payload[i]]: !state[action.payload]
    // };
    case HANDLE_OFF:
      let { j, who, property } = action.payload;
      let clockin = `${property}clockin`;
      let clockout = `${property}clockout`;
      return {
        ...state,
        adminSchedules: {
          ...state.adminSchedules,
          [j]: {
            ...state.adminSchedules[j],
            schedule: {
              ...state.adminSchedules[j].schedule,
              [who]: {
                [clockin]: null,
                [clockout]: null
              }
            }
          }
        }
      };
    // case `${COMPANY_WEEK_OF}_FULFILLED`:
    //   console.log(action.payload.data);
    //   return { ...state, adminSchedules: action.payload.data };
    // case `${CREATE_SCHEDULE}_FULFILLED`:
    // return { ...state, adminSchedules: action.payload.data };
    // case `${UPDATE_SCHEDULE}_FULFILLED`:
    // return { ...state, adminSchedules: action.payload.data };
    case `${GET_WEEK_OF}_PENDING`:
      return { ...state, loading: true };
    case `${GET_WEEK_OF}_FULFILLED`:
      return { ...state, adminSchedules: action.payload.data, loading: false };
    //DEFAULT
    default:
      return state;
  }
}
