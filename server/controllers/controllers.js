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
  let { newCurr, arr, currentUser } = req.body;
  let cei;
  console.log("create schedule hit");
  req.app
    .get("db")
    .findEmployee(currentUser)
    .then(currentEmployeeId => {
      cei = currentEmployeeId;
    })
    .catch(errrorrr => `ERROR FINDING EMPLOYEE ${errrorrr}`);
  console.log(`CEI OVER HERE ${cei}`);
  req.app
    .get("db")
    .createschedule(
      //employee id
      cei,
      newCurr,
      arr[0].mondaymorningclockin + arr[0].mondaymorningclockout,
      arr[1].mondaynightclockin + arr[1].mondaynightclockout,

      arr[2].tuesdaymorningclockin + arr[2].tuesdaymorningclockout,
      arr[3].tuesdaynightclockin + arr[3].tuesdaynightclockout,

      arr[4].wednesdaymorningclockin + arr[4].wednesdaymorningclockout,
      arr[5].wednesdaynightclockin + arr[5].wednesdaynightclockout,

      arr[6].thursdaymorningclockin + arr[6].thursdaymorningclockout,
      arr[7].thursdaynightclockin + arr[7].thursdaynightclockout,

      arr[8].fridaymorningclockin + arr[8].fridaymorningclockout,
      arr[9].fridaynightclockin + arr[9].fridaynightclockout,

      arr[10].saturdaymorningclockin + arr[10].saturdaymorningclockout,
      arr[11].saturdaynightclockin + arr[11].saturdaynightclockout,

      arr[12].sundaymorningclockin + arr[12].sundaymorningclockout,
      arr[13].sundaynightclockin + arr[13].sundaynightclockout
    )
    .then(results => {
      req.app
        .get("db")
        .findcompany(cei)
        .then(comp_id => {
          let { company_id } = comp_id[0];
          req.app
            .get("db")
            .updatecompanyschedule(
              // employee_id,
              cei,
              newCurr,
              company_id
            )
            .then(totalres => {
              console.log(`CREATE SCHEDULE FULLY COMPLETED CORRECTLY`);
              res.status(200).json(totalres);
            })
            .catch(errorr => {
              console.log(`ERROR IN 3RD ITERATION ON CATCH: ${errorr}`);
              res.status(500).json(errorr);
            });
        })
        .catch(err => {
          console.log(`ERROR FINDING COMPANY OF EMPLOYEE: ${err}`);
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.log(`ERROR IN CREATING SCHEDULE :${err}`);
      res.status(500).json(err);
    });
  // }
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
