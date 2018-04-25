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
  console.log("GET EMPLOYEES WAS HIT IN THE REDUCER");
  let { id } = req.params;
  console.log(id);
  req.app
    .get("db")
    .findEmployee(id)
    .then(empl => {
      console.log(empl[0].employee_id);
      req.app
        .get("db")
        .findcompany(empl[0].employee_id)
        .then(companyid => {
          console.log(companyid[0].company_id);
          req.app
            .get("db")
            .getemployees(companyid[0].company_id)
            .then(results => {
              console.log("get Employees successful");
              res.status(200).json(results);
            })
            .catch(err => {
              console.log(`ERROR GETTING EMPLOYEES : => ${err}`);
              res.status(500).json(err);
            });
        })
        .catch(errorr => {
          console.log(`ERROR FINDING COMPANY : =>${errorr}`);
          res.status(500).json(errorr);
        });
    })
    .catch(err => {
      console.log(`ERROR FINDING EMPLOYEE : => ${err}`);
      res.status(500).json(err);
    });
};

////////////////////////////////////////////////////////////////
//SCHEDULE CONTROLLERS

//MANAGER GETTING SCHEDULES
const getSchedules = (req, res) => {
  let { user, weekof } = req.query;
  req.app
    .get("db")
    .findEmployee(user)
    .then(currentEmployeeId => {
      console.log(
        `current employee id :  ${Number(
          JSON.stringify(currentEmployeeId)[16]
        )}`
      );
      req.app
        .get("db")
        .findcompany(Number(JSON.stringify(currentEmployeeId)[16]))
        .then(comp_id => {
          console.log(
            `COMPANY ID OF GETTING SCHEDULES : => ${comp_id[0].company_id}`
          );
          req.app
            .get("db")
            .getschedules([comp_id[0].company_id, weekof])
            .then(schedules => {
              res.status(200).json(schedules);
              console.log(`SCHEDULES RECEIVED HERE THEY ARE : => ${schedules}`);
            })
            .catch(e => {
              res.status(500).json(e);
              console.log(`ERROR GETTING SCHEDULES : => ${e}`);
            });
        })
        .catch(erroorr => {
          res.status(500).json(erroorr);
          console.log(
            `ERROR FINDING COMPANY IN GETTIN SCHEDULES: => ${erroorr}`
          );
        });
    })
    .catch(errrorrr => {
      console.log(`ERROR FINDING EMPLOYEE ${errrorrr}`);
      res.status(500).json(errrorrr);
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
  let { newCurr, arr, userId } = req.body;
  // console.log(`THIS IS THE ARRAY OF THE BODY : => ${arr[0].weekOf}`);
  // console.log("create schedule hit");
  // console.log(`currentUser: ${userId}`);
  req.app
    .get("db")
    .findEmployee(userId)
    .then(currentEmployeeId => {
      console.log(
        `current employee id :  ${Number(
          JSON.stringify(currentEmployeeId)[16]
        )}`
      );
      //

      req.app
        .get("db")
        .createschedule([
          Number(JSON.stringify(currentEmployeeId)[16]),
          newCurr,
          arr[0].weekOf,
          arr[1].mondaymorningclockin + arr[1].mondaymorningclockout,
          arr[2].mondaynightclockin + arr[2].mondaynightclockout,

          arr[3].tuesdaymorningclockin + arr[3].tuesdaymorningclockout,
          arr[4].tuesdaynightclockin + arr[4].tuesdaynightclockout,

          arr[5].wednesdaymorningclockin + arr[5].wednesdaymorningclockout,
          arr[6].wednesdaynightclockin + arr[6].wednesdaynightclockout,

          arr[7].thursdaymorningclockin + arr[7].thursdaymorningclockout,
          arr[8].thursdaynightclockin + arr[8].thursdaynightclockout,

          arr[9].fridaymorningclockin + arr[9].fridaymorningclockout,
          arr[10].fridaynightclockin + arr[10].fridaynightclockout,

          arr[11].saturdaymorningclockin + arr[11].saturdaymorningclockout,
          arr[12].saturdaynightclockin + arr[12].saturdaynightclockout,

          arr[13].sundaymorningclockin + arr[13].sundaymorningclockout,
          arr[14].sundaynightclockin + arr[14].sundaynightclockout
        ])
        .then(results => {
          req.app
            .get("db")
            .findcompany(Number(JSON.stringify(currentEmployeeId)[16]))
            .then(comp_id => {
              console.log(`COMPANY ID : =>${comp_id[0].company_id}`);
              console.log(
                `NOW THIS IS ACTUALLY THE CEI : => ${Number(
                  JSON.stringify(currentEmployeeId)[16]
                )}`
              );
              console.log(
                `NOW THIS IS ACTUALLY THE CURRENT DATE : => ${newCurr}`
              );
              let { company_id } = comp_id[0];
              req.app
                .get("db")
                .updatecompanyschedule(
                  // employee_id,
                  [
                    Number(JSON.stringify(currentEmployeeId)[16]),
                    newCurr,
                    company_id
                  ]
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
    })
    .catch(errrorrr => `ERROR FINDING EMPLOYEE ${errrorrr}`);
  // console.log(`CEI OVER HERE ${cei}`);
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
  deleteSchedule, //NOT CURRENTLY ACTIVE
  createCompany,
  getCompany
};
