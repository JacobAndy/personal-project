require("dotenv").config();
const app = require("express")();
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const port = process.env.PORT || 3003;
const { strat, logout } = require(`${__dirname}/controllers/strategy`);
const {
  getUser,
  updateUser,
  getEmployees,
  getSchedules,
  mySchedule
} = require("./controllers/controllers");

app.use(json());
app.use(cors());
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
    successRedirect: "http://localhost:3004/#/profile",
    failureRedirect: "http://localhost:3003/auth",
    failureFlash: true
  })
);
//user profile
app.get("/profile", getUser);

//getting employees
app.get("/employees", getEmployees);

//getting schedules
app.get("/schedules", getSchedules);

//getting my schedule
app.get("/myschedule", mySchedule);

//create schedule

//update schedule

//delete schedule

//logging out
app.get("/logout", logout);

//adding users extra details
app.put("/update", updateUser);

//listening to port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
