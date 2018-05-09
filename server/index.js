require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const port = process.env.PORT || 3003;
const { strat, logout } = require(`${__dirname}/controllers/strategy`);
const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
  formatter: null
};
const geocoder = NodeGeocoder(options);
const {
  getUser,
  updateUser,
  getEmployees,
  getSchedules, //NOT CURRENTLY ACTIVE
  mySchedule, //NOT CURRENTLY ACTIVE
  createSchedule,
  deleteSchedule, //NOT CURRENTLY ACTIVE
  createCompany,
  getCompany,
  updateSchedule,
  getAllJobs,
  getLocation,
  getCompanySchedules,
  createCompanyIdSchedule,
  updateCompanyIdSchedule,
  deleteschedulewithgroupid,
  getEmployeesWithCompanyId,
  leaveCompany,
  applicationRequest,
  getApplications,
  acceptUserApplication,
  denyUserApplication,
  sendMassEmail,
  getEmails,
  removeAlert,
  updateUsersFullProfile
} = require("./controllers/controllers");

app.use(json());
app.use(cors());
// app.use(express.static(`${__dirname}/../build`));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1814400000 //3 weeks
    }
  })
);
massive(process.env.DATABASE_URL)
  .then(db => {
    // console.log(db);
    app.set("db", db);
  })
  .catch(err => console.log(err));
app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

passport.serializeUser((user, done) => {
  console.log(user);
  app
    .get("db")
    .getuser(user.id)
    .then(response => {
      if (!response[0]) {
        app
          .get("db")
          .adduser([
            user.id,
            user.name.givenName + " " + user.name.familyName,
            user._json.picture
          ])
          .then(res => {
            return done(null, res[0]);
          })
          .catch();
      } else {
        return done(null, response[0]);
      }
    })
    .catch(err => console.log(err));
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3004/profile",
    failureRedirect: "http://localhost:3003/auth",
    failureFlash: true
  })
);

////////////////////////////////////////////////////////
//USER END POINTS

//user profile WORKS
app.get("/profile", getUser);

//logging out WORKS
app.get("/logout", logout);

//adding users extra details  WORKS
app.put("/update", updateUser);

//user updating info
app.put(`/profile/fullupdate/:id`, updateUsersFullProfile);

//get emails
app.get(`/user/emails/:id`, getEmails);

//remove alert
app.delete(`/alert/remove/:id`, removeAlert);
//////////////////////////////////////////////////////////
//EMPLOYEE END POINTS

//getting employees WORKS
app.get("/employees/:id", getEmployees);

//get employees with company id
app.get(`/jobs/staff/:id`, getEmployeesWithCompanyId);

//////////////////////////////////////////////////////////
//COMPANY END POINTS

//send mass emails
app.post("/sendemail/employees/all", sendMassEmail);

//accepting job applications
app.post("/jobs/application/decision", acceptUserApplication);

//deny job application
app.delete("/jobs/application/decision/:id", denyUserApplication);

//getting applications
app.get(`/jobs/applications`, getApplications);

//LOCATION CONVERTER
app.post("/job/location/convert", (req, res, next) => {
  let { location } = req.body;
  geocoder
    .geocode(location)
    .then(resp => {
      console.log("GEOCODE SUCCESSFUL BOY");
      res.status(200).json(resp);
    })
    .catch(err => {
      console.log(`ERROR IN GEOLOCATION : => ${err}`);
      res.status(500).json(err);
    });
});

//create company WORKS
//THIS ALSO CREATES EMPLOYEE REFERENCING USER AND GROUP
app.post("/createcompany", createCompany);

//apply for a company
app.post("/jobs/application", applicationRequest);

//get company WORKS
app.get("/company", getCompany);

//getting all jobs that live in database
app.get("/alljobs", getAllJobs);

//getting location of a specefic company
app.get("/job/location/:id", getLocation);

//leave company
app.put(`/leavecompany/:id`, leaveCompany);

//////////////////////////////////////////////////////////
//SCHEDULE END POINTS

//create schedule
app.post("/createschedule", createSchedule);

//creating schedule by group id
app.post(`/creategroupschedule/:id`, createCompanyIdSchedule);

//updating schedule with the company id
app.put(`/updatecompanyschedule/:id`, updateCompanyIdSchedule);

//update schedule
app.put("/updateschedule", updateSchedule);

//delete schedule
app.delete("/rm/schedule/", deleteSchedule);

//delete schedule with group id
app.delete(`/deletewithid`, deleteschedulewithgroupid);

//getting schedules
app.get("/weekof", getSchedules);

app.get(`/company/weekof`, getCompanySchedules);

//getting my schedule
// app.get("/myschedule", mySchedule);

// const path = require("path");
// app.get("*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });
//listening to port  WORKS
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
