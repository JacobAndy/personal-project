import axios from "axios";
import { connect } from "react-redux";
const initialState = {
  schedule: {
    user1: "",
    schedule: [
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
  },

  adminSchedules: []
};

const CREATE_SCHEDULE = "CREATE_SCHEDULE";
const HANDLE_STATE_UPDATE = "HANDLE_STATE_UPDATE";
const HANDLE_OPEN = "HANDLE_OPEN";
const HANDLE_OFF = "HANDLE_OFF";
const INIT_SCHEDULE = "INIT_SCHEDULE";
// const GET_SCHEDULES = "GET_SCHEDULES";

export function createSchedule(userId, arr) {
  let currDate = new Date();
  let newCurr = `${currDate.getMonth()}/${currDate.getDate()}/${currDate.getFullYear()}`;
  // console.log(this.props);
  // let currentUser = this.props.user_id;
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

export default function schedulesreducer(state = initialState, action) {
  switch (action.type) {
    // case NEW_SCHEDULE:
    //   return { ...state, schedule: action.payload };
    //get schedules
    // case `${GET_SCHEDULES}_PENDING`:
    //   return { ...state, loading: true };
    // case `${GET_SCHEDULES}_FULFILLED`:
    //   console.log(action.payload.data);
    //   return { ...state, loading: false };
    // case CREATE_SCHEDULE:
    // return{...state{
    //   schedule:
    //   ...state.schedule, action.payload.data}
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

    // schedule: {
    //   ...state.schedule,
    //   schedule: [
    //     ...state.schedule.schedule,
    //     (i = {
    //       ...state.schedule.schedule[i],
    //       [prop]: `${hours}:${minutes}`
    //     })
    //   ]
    // }
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
    //DEFAULT
    default:
      return state;
  }
}

// export function getSchedules(company, publish) {
//   return {
//     type: GET_SCHEDULES,
//     payload: axios.get(`/schedules/?company=${company}&publish=${publish}`)
//   };
// }
