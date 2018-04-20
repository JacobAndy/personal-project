import { createStore, combineReducers, applyMiddleware } from "redux";
import promisemiddleware from "redux-promise-middleware";
import users from "./ducks/users";
import calendarreducer from "./ducks/calendarreducer";
import schedulesreducer from "./ducks/schedulesreducer";
import company from "./ducks/company";

const store = createStore(
  combineReducers({ users, calendarreducer, schedulesreducer, company }),
  applyMiddleware(promisemiddleware())
);
export default store;
