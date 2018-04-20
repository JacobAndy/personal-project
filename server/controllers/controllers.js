///////////////////////////////////////////////////////
//USER CONTROLLERS

//GETTING THE USER FOR USER PROFILE WORKS
const getUser = (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "no authorization" });
  } else {
    req.app
      .get("db")
      .getuser([req.user.auth_id])
      .then(response => {
        console.log(response);
        res.status(200).json(response);
      })
      .catch(err => res.status(500).json(err));
  }
};

//UPDATE USERS INFO WORKS
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

////////////////////////////////////////////////////////////////
//EMPLOYEE CONTROLLERS

//CREATING AN EMPLOYEE FOR THE COMPANY WORKS
const createEmployee = (req, res) => {
  let { company_id, user_id } = req.body;
  req.app
    .get("db")
    .createEmployee()
    .then()
    .catch(err => {
      console.log("ERROR: " + err);
      res.status(500).json(err);
    });
};

//EMPLOYEES OF THE COMPANY WORKS
const getEmployees = (req, res) => {
  let { companyid } = req.query;
  req.app
    .get("db")
    .getemployees(companyid)
    .then(results => {
      console.log("get Employees successful");
      res.status(200).json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

////////////////////////////////////////////////////////////////
//SCHEDULE CONTROLLERS

//MANAGER GETTING SCHEDULES
const getSchedules = (req, res) => {
  let { company, publish } = req.query;
  req.app
    .get("db")
    .getschedules([company, publish])
    .then(results => {
      console.log("get Schedules successful");
      res.status(200).json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
//ACCESS MY SCHEDULE
const mySchedule = (req, res) => {
  let { employeeid, publish } = req.query;
  req.app
    .get("db")
    .myschedule([employeeid, publish])
    .then(results => {
      console.log("my schedule SUCCESSFULL");
      res.status(200).json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};
//CREATING SCHEDULE
const createSchedule = (req, res) => {
  let { arr } = req.body;
  for (let i = 0; i < arr.length; i++) {
    req.app
      .get("db")
      .createschedule(
        arr[i].employee_id,
        arr[i].publish,
        arr[i].monday_morning,
        arr[i].monday_night,
        arr[i].tuesday_morning,
        arr[i].tuesday_night,
        arr[i].wednesday_morning,
        arr[i].wednesday_night,
        arr[i].thursday_morning,
        arr[i].thursday_night,
        arr[i].friday_morning,
        arr[i].friday_night,
        arr[i].saturday_morning,
        arr[i].saturday_night,
        arr[i].sunday_morning,
        arr[i].sunday_night
      )
      .then(results => {
        req.app
          .get("db")
          .findcompany(employee_id)
          .then(comp_id =>
            req.app
              .get("db")
              .updatecompanyschedule(employee_id, publish, comp_id)
              .then(totalres => {
                console.log(`CREATE SCHEDULE FULLY COMPLETED CORRECTLY`);
                res.status(200).json(totalres);
              })
              .catch(errorr => {
                console.log(`ERROR : ${errorr}`);
                res.status(500).json(errorr);
              })
          )
          .catch(err => {
            console.log(`ERROR FINDING COMPANY OF EMPLOYEE: ${err}`);
            res.status(500).json(err);
          });
      })
      .catch(err => {
        console.log(`ERROR IN CREATING SCHEDULE :${err}`);
        res.status(500).json(err);
      });
  }
};

//UPDATING SCHEDULE
const updateSchedule = (req, res) => {
  let { id } = req.params;
  let {} = req.body;
  req.app
    .get("db")
    .then()
    .catch(err => {
      console.log(err);
      res.status(500).json(error);
    });
};

//DELETING SCHEDULE
const deleteSchedule = (req, res) => {
  req.app
    .get("db")
    .then()
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

//////////////////////////////////////////////////////////////////////
//COMPANY CONTROLLERS

//CREATING THE COMPANY FOR THE USER, AND MAKING AN EMPLOYEE OF THE COMPANY OF THE USER WHO CREATED THE COMPANY WORKS
const createCompany = (req, res) => {
  let { name, founded, founder } = req.body;
  req.app
    .get("db")
    .createGroup([name, founded, founder])
    .then(results => {
      console.log("group created successful: " + results);
      req.app
        .get("db")
        .createEmployee([results[0]["company_id"], results[0]["founder"]])
        .then(newres => {
          console.log("MANAGER CREATED", newres);
          res.status(200).json(newres);
        })
        .catch(error => {
          console.log(
            "ERROR CREATING MANAGER ON CREATING CREATING GROUP: " + error
          );
          res.status(500).json(error);
        });
    })
    .catch(err => {
      console.log("ERROR CREATING GROUP: " + err);
      res.status(500).json(err);
    });
};
//GETTING THE COMPANY OF THE USER ID WORKS
const getCompany = (req, res) => {
  let { userid } = req.query;
  req.app
    .get("db")
    .getGroup(userid)
    .then(results => {
      console.log("getting company successful");
      res.status(200).json(results);
    })
    .catch(err => {
      console.log("error: " + err);
      res.status(500).json(err);
    });
};

////////////////////////////////////////////////////////////////////////////////////////
//MODULE EXPORTING FUNCTIONS
module.exports = {
  getUser,
  updateUser,
  getEmployees,
  getSchedules, //NOT CURRENTLY ACTIVE
  mySchedule, //NOT CURRENTLY ACTIVE
  createSchedule, //NOT CURRENTLY ACTIVE
  updateSchedule, //NOT CURRENTLY ACTIVE
  deleteSchedule, //NOT CURRENTLY ACTIVE
  createCompany,
  getCompany
};
