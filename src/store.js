import { createStore, combineReducers, applyMiddleware } from "redux";
import promisemiddleware from "redux-promise-middleware";
import users from "./ducks/users";
// import calendar from "./ducks/calendar";

const store = createStore(
  combineReducers({ users }),
  applyMiddleware(promisemiddleware())
);
export default store;
