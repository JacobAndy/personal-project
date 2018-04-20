import axios from "axios";
const initialState = {
  schedule: {
    mondaymorningclockin: "",
    mondaymorningclockout: "",
    mondaynightclockin: "",
    mondaynightclockout: "",

    tuesdaymorningclockin: "",
    tuesdaymorningclockout: "",
    tuesdaynightclockin: "",
    tuesdaynightclockout: "",

    wednesdaymorningclockin: "",
    wednesdaymorningclockout: "",
    wednesdaynightclockin: "",
    wednesdaynightclockout: "",

    thursdaymorningclockin: "",
    thursdaymorningclockout: "",
    thursdaynightclockin: "",
    thursdaynightclockout: "",

    fridaymorningclockin: "",
    fridaymorningclockout: "",
    fridaynightclockin: "",
    fridaynightclockout: "",

    saturdaymorningclockin: "",
    saturdaymorningclockout: "",
    saturdaynightclockin: "",
    saturdaynightclockout: "",

    sundaymorningclockin: "",
    sundaymorningclockout: "",
    sundaynightclockin: "",
    sundaynightclockout: ""
  },
  something: [
    { userinfo: false },
    { mondaymorningopen: false },
    { mondaynightopen: false },
    { tuesdaymorningopen: false },
    { tuesdaynightopen: false },
    { wednesdaymorningopen: false },
    { wednesdaynightopen: false },
    { thursdaymorningopen: false },
    { thursdaynightopen: false },
    { fridaymorningopen: false },
    { fridaynightopen: false },
    { saturdaymorningopen: false },
    { saturdaynightopen: false },
    { sundaymorningopen: false },
    { sundaynightopen: false }
  ]
};

const CREATE_SCHEDULE = "CREATE_SCHEDULE";
const HANDLE_STATE_UPDATE = "HANDLE_STATE_UPDATE";
const HANDLE_OPEN = "HANDLE_OPEN";
const HANDLE_OFF = "HANDLE_OFF";
// const GET_SCHEDULES = "GET_SCHEDULES";

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

    case HANDLE_STATE_UPDATE:
      let { val, prop } = action.payload;
      // console.log(val, prop);
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
          [prop]: `${hours}:${minutes}`
        }
      };
    case HANDLE_OPEN:
      console.log("OPEN UP");
      return {
        ...state,
        [action.payload]: !state[action.payload]
      };
    case HANDLE_OFF:
      let { property } = action.payload;
      let clockin = `${property}clockin`;
      let clockout = `${property}clockout`;
      return { ...state, [clockin]: null, [clockout]: null };
    //DEFAULT
    default:
      return state;
  }
}
export function createSchedule(arr) {
  return {
    type: CREATE_SCHEDULE,
    payload: axios.post("/createschedule", { arr })
  };
}
export function handleOpen(prop) {
  console.log(prop);
  return {
    type: HANDLE_OPEN,
    payload: prop
  };
}
export function handleStateUpdate(prop, val) {
  return {
    type: HANDLE_STATE_UPDATE,
    payload: { prop, val }
  };
}
export function handleOff(property) {
  return {
    type: HANDLE_OFF,
    payload: { property }
  };
}
// export function getSchedules(company, publish) {
//   return {
//     type: GET_SCHEDULES,
//     payload: axios.get(`/schedules/?company=${company}&publish=${publish}`)
//   };
// }
