import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Calendar from "./components/LoggedIn/calendar/Calendar";
import HomePage from "./components/LoggedOut/HomePage/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/LoggedOut/About/About";
import OurServices from "./components/LoggedOut/OurServices/OurServices";
import store from "./store";
import Profile from "./components/LoggedIn/profile/Profile";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import GoogleDirections from "./components/LoggedIn/google_directions/GoogleDirections";
import GoogleTraffic from "./components/LoggedIn/google_traffic/GoogleTraffic";
import ContactPage from "./components/LoggedOut/ContactPage/ContactPage";
import Jobs from "./components/LoggedIn/Jobs/Jobs";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/schedule" component={Calendar} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/about" component={About} />
          <Route path="/services" component={OurServices} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/directions" component={GoogleDirections} />
          <Route path="/traffic" component={GoogleTraffic} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
