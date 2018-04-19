const getUser = (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "no authorization" });
  } else {
    req.app
      .get("db")
      .getuser(req.user.auth_id)
      .then(response => {
        console.log(response);
        res.status(200).json(response);
      })
      .catch(err => res.status(500).json(err));
  }
};
const updateUser = (req, res) => {
  let { email, number, address, emergencycontact, auth } = req.body;
  console.log(req.user);
  req.app
    .get("db")
    .updateUser([email, number, address, emergencycontact, auth])
    .then(results => {
      getUser(req, res);
      // res.status(200).json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
const getEmployees = (req, res) => {
  let { companyID } = req.body;
  req.app
    .get("db")
    .getemployees(companyID)
    .then(results => {
      console.log("get Employees successful");
      res.status(200).json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
const getSchedules = (req, res) => {
  let { company, publish } = req.query;
  req.app
    .get("db")
    .getschedules(company, publish)
    .then(results => {
      console.log("get Schedules successful");
      res.status(200).json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
const mySchedule = (req, res) => {
  let { employeeid, publish } = req.query;
  req.app
    .get("db")
    .myschedule(employeeid, publish)
    .then(results => {
      console.log("my schedule SUCCESSFULL");
      res.status(200).json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = {
  getUser,
  updateUser,
  getEmployees,
  getSchedules,
  mySchedule
};
