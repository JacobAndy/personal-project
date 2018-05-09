const _ = require("lodash.map");
//nodemailer
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODE_MAILER_USER_NAME,
    pass: process.env.NODE_MAILER_PASSWORD
  }
});

//twilio
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

///////////////////////////////////////////////////////
//USER CONTROLLERS

//GETTING THE USER FOR USER PROFILE WORKS
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

//updating users full profile
const updateUsersFullProfile = (req, res, next) => {
  let { name, bio, email, number, address, contact } = req.body;
  let { id } = req.params;
  console.log(id);
  console.log(name, bio, email, number, address, contact);
  req.app
    .get("db")
    .updateUsersFullProfile([id, name, bio, email, number, address, contact])
    .then(results => {
      console.log(`SUCCESS IN UPDATING USERS FULL PROFILE`);
    })
    .catch(error => {
      console.log(`ERROR IN UPDATING USERS FULL PROFILE : => ${error}`);
      res.status(500).json(error);
    });
};

//UPDATE USERS INFO WORKS
const updateUser = (req, res) => {
  let { email, number, address, emergencycontact, auth } = req.body;
  // console.log(req.user);
  console.log(email, number, address, emergencycontact, auth);
  req.app
    .get("db")
    .updateUser([email, number, address, emergencycontact, auth])
    .then(results => {
      res.status(200).json(results);
      // res.status(200).json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

//getting emails
const getEmails = (req, res, next) => {
  let { id } = req.params;
  console.log(id);
  req.app
    .get("db")
    .getUserEmails(id)
    .then(emails => {
      console.log("GETTING EMAILS SUCCESSFUL");
      console.log(emails);
      res.status(200).json(emails);
    })
    .catch(error => {
      console.log(`ERROR IN GETTING EMAILS : => ${error}`);
      res.status(500).json(error);
    });
};
//remove alert
const removeAlert = (req, res, next) => {
  let { id } = req.params;
  let { user } = req.query;
  console.log(user);
  req.app
    .get("db")
    .removealert(id, user)
    .then(emails => {
      console.log("REMOVING ALERT SUCCESSFUL BOYY");
      res.status(200).json(emails);
    })
    .catch(error => {
      console.log(`ERROR IN REMOVING ALERT : => ${error}`);
    });
};
////////////////////////////////////////////////////////////////
//EMPLOYEE CONTROLLERS

//send mass emails
const sendMassEmail = (req, res, next) => {
  let { employees, email, subject } = req.body;
  console.log(employees);
  // console.log(email);
  let employid;
  _(employees, e => {
    employid = e.employee_id;
    req.app
      .get("db")
      .finduser(e.employee_id)
      .then(user => {
        req.app
          .get("db")
          .addemailwithoutcomp([user[0].user_id, email])
          .then(email => {
            let newemail = email[0].email_id;
            req.app
              .get("db")
              .findcompany(employid)
              .then(comp => {
                req.app.get("db").updateemail([comp[0].company_id, newemail]);
              })
              .catch(eror => {
                console.log(
                  `ERROR IN UPDATING EMAIL IN MASS EMAIL : => ${eror}`
                );
              });
          })
          .catch(error =>
            console.log(
              `ERROR IN ADDING EMAIL WITHOUT COMPANY IN MASS EMAIL : => ${error}`
            )
          );
      })
      .catch(err =>
        console.log(`ERROR IN FINDING USER IN MASS EMAIL : => ${err}`)
      );
    let mailOptions = {
      from: '"Andy Schedules" <andyschedules@gmail.com>',
      to: e.email,
      subject: subject,
      text: email,
      html: `<h4>Hello ${e.full_name}</h4>
    <p>${email}</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });
  req.app
    .get("db")
    .addemail([])
    .then(() => {
      console.log("SUCCESS IN ADDING AN EMAIL AFTER SENDING MASS EMAIL");
    })
    .catch(error => {
      console.log(`ERROR IN ADDING AN EMAIL AFTER SENDING MASS EMAIL${error}`);
    });
};

//leave company
const leaveCompany = (req, res, next) => {
  let { id } = req.params;
  let { userid } = req.body;
  console.log(id);
  console.log(userid);
  req.app
    .get("db")
    .findEmployeeWithGroup([userid, id])
    .then(empId => {
      console.log("FINDING EMPLOYEE SUCCESSFULL");
      console.log(empId[0].employee_id);
      req.app
        .get("db")
        .removeEmployee([empId[0].employee_id, userid])
        .then(results => {
          console.log("REMOVING EMPLOYEE SUCCESSFULL");
          req.app
            .get("db")
            .getGroup([userid])
            .then(groups => {
              console.log(`SUCCESS IN GETTING GROUPS AFTER REMOVING EMPLOYEE`);
              console.log(groups);
              res.status(200).json(groups);
            })
            .catch(error => {
              console.log(
                `ERROR IN GETTING GROUP AFTER REMOVING EMPLOYEE : =>${error}`
              );
              res.status(500).json(error);
            });
        })
        .catch(err => {
          console.log(`ERROR IN REMOVING EMPLOYEE : => ${err}`);
          res.status(500).json(err);
        });
    })
    .catch(error => {
      console.log(`ERROR IN FINDING EMPLOYEE WITH GROUP ID : => ${error}`);
      res.status(500).json(error);
    });
};

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
//get employees with company id
const getEmployeesWithCompanyId = (req, res, next) => {
  let { id } = req.params;
  console.log("GETTING EMPLOYEES WITH COMPANY ID WAS HIT");
  console.log(id);
  req.app
    .get("db")
    .getemployees([id])
    .then(results => {
      console.log(`AYYEE WE GOT THE EMPLOYEES WITH COMPANY ID`);
      res.status(200).json(results);
    })
    .catch(error => {
      console.log(`ERROR IN GETTING EMPLOYEES WITH COMPANY ID : => ${error}`);
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
      console.log("EMPLOYEE ID RIGHT BELOW");
      console.log(empl[0].employee_id);
      req.app
        .get("db")
        .findcompany(empl[0].employee_id)
        .then(companyid => {
          console.log("COMPANY ID BELOW HERE");
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

//getting company schedules
const getCompanySchedules = (req, res, next) => {
  let { company, weekof } = req.query;
  console.log(company);
  console.log(weekof);
  req.app
    .get("db")
    .getCompanyWeekOf([company, weekof])
    .then(results => {
      console.log(results);
      console.log("THIS WAS HIT HEYOO");
      console.log(`GETTING COMPANY WEEK OF SUCCESSFUL : => ${results}`);

      res.status(200).json(results);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
};

//MANAGER GETTING SCHEDULES
const getSchedules = (req, res) => {
  let { user, weekof } = req.query;
  console.log(`THIS IS THE USER ID : => ${user}`);
  req.app
    .get("db")
    .findEmployee(user)
    .then(currentEmployeeId => {
      console.log(currentEmployeeId);
      console.log(`current employee id :  ${currentEmployeeId[0].employee_id}`);
      req.app
        .get("db")
        .findcompany(currentEmployeeId[0].employee_id)
        .then(comp_id => {
          console.log(
            `COMPANY ID OF GETTING SCHEDULES : => ${comp_id[0].company_id}`
          );
          req.app
            .get("db")
            .getschedules([comp_id[0].company_id, weekof])
            .then(schedules => {
              console.log(schedules);
              console.log(`SCHEDULES RECEIVED HERE THEY ARE : => ${schedules}`);
              res.status(200).json(schedules);
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
//CREATING SCHEDULE WITH GROUP ID
const createCompanyIdSchedule = (req, res, next) => {
  let { id } = req.params;
  let { newCurr, arr, userId } = req.body;
  console.log(arr);
  console.log(userId);
  console.log("CREATED SCHEDULE WITH COMPANY ID OVER HERE");
  // req.app
  //   .get("db")
  //   .findEmployeeWithGroup([userId, id])
  //   .then(empId => {
  //     console.log(+empId[0].employee_id);
  _(arr, e => {
    client.messages
      .create({
        body: `Hey ${
          e.full_name
        }, this is Entity Schedules letting you know that your schedule has been posted`,
        from: "4156505615",
        to: e.phone_number
      })
      .then(message => console.log(message.sid))
      .done();
    let mailOptions = {
      from: '"Andy Schedules" <andyschedules@gmail.com>',
      to: e.email,
      subject: `Week ${e.schedule[0].weekOf} posted`,
      text: "Schedule is now available",
      html: `<h4>Hello ${e.full_name}</h4>
    <p>Your schedule for ${e.schedule[0].weekOf} is available</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    req.app
      .get("db")
      .finduser(e.employee_id)
      .then(useridd => {
        console.log("FINDING USER IN CREATNG SCHEDULE SUCCESSFULL");
        req.app
          .get("db")
          .addemail([
            useridd[0].user_id,
            id,
            `Your schedule for ${e.schedule[0].weekOf} is available`
          ]);
      })
      .catch(err => {
        console.log(`ERROR IN FINDING USER IN CREATING SCHEDULE : => ${err}`);
      });

    req.app
      .get("db")
      .createCompanySchedule([
        e.employee_id,
        id,
        newCurr,
        e.schedule[0].weekOf,
        e.schedule[1].mondaymorningclockin +
          e.schedule[1].mondaymorningclockout,
        e.schedule[2].mondaynightclockin + e.schedule[2].mondaynightclockout,

        e.schedule[3].tuesdaymorningclockin +
          e.schedule[3].tuesdaymorningclockout,
        e.schedule[4].tuesdaynightclockin + e.schedule[4].tuesdaynightclockout,

        e.schedule[5].wednesdaymorningclockin +
          e.schedule[5].wednesdaymorningclockout,
        e.schedule[6].wednesdaynightclockin +
          e.schedule[6].wednesdaynightclockout,

        e.schedule[7].thursdaymorningclockin +
          e.schedule[7].thursdaymorningclockout,
        e.schedule[8].thursdaynightclockin +
          e.schedule[8].thursdaynightclockout,

        e.schedule[9].fridaymorningclockin +
          e.schedule[9].fridaymorningclockout,
        e.schedule[10].fridaynightclockin + e.schedule[10].fridaynightclockout,

        e.schedule[11].saturdaymorningclockin +
          e.schedule[11].saturdaymorningclockout,
        e.schedule[12].saturdaynightclockin +
          e.schedule[12].saturdaynightclockout,

        e.schedule[13].sundaymorningclockin +
          e.schedule[13].sundaymorningclockout,
        e.schedule[14].sundaynightclockin + e.schedule[14].sundaynightclockout
      ])
      .then(results => {
        console.log("SUCCESS IN CREATING COMPANY SCHEDULE WITH COMPANY ID");
        // res.status(200).json(results);
        req.app
          .get("db")
          .getschedules([id, arr[0].schedule[0].weekOf])
          .then(schedules => {
            console.log(schedules);
            console.log(`SCHEDULES RECEIVED HERE THEY ARE : => ${schedules}`);
            res.status(200).json(schedules);
          })
          .catch(e => {
            res.status(500).json(e);
            console.log(
              `ERROR GETTING SCHEDULES AFTER POSTING SCHEDULE : => ${e}`
            );
          });
      })
      .catch(err => {
        console.log(`ERROR IN CREATING SCHEDULE WITH COMPANY ID : => ${err}`);
        res.status(500).json(err);
      });
  });
  // })
  // .catch(error => {
  //   console.log(
  //     `ERROR FINDING EMPLOYEE IN CREATE COMPANY WITH COMPANY ID: => ${error}`
  //   );
  //   res.status(500).json(error);
  // });
};
//CREATING SCHEDULE
const createSchedule = (req, res, next) => {
  console.log("CREATE SCHEDULE CONTROLLER HIT!");
  let { newCurr, arr, userId } = req.body;
  console.log(`ARRAY LENGTH : => ${arr[0]}`);
  console.log(arr);
  console.log(arr[0].schedule[0].weekOf);
  let companyId;
  req.app
    .get("db")
    .findcompany([arr[0].employee_id])
    .then(compId => {
      let id = compId[0].company_id;
      _(arr, e => {
        client.messages
          .create({
            body: `Hey ${
              e.full_name
            }, this is Entity Schedules letting you know that your schedule has been posted`,
            from: "4156505615",
            to: e.phone_number
          })
          .then(message => console.log(message.sid))
          .done();

        let mailOptions = {
          from: '"Andy Schedules" <andyschedules@gmail.com>',
          to: e.email,
          subject: `Week ${e.schedule[0].weekOf} posted`,
          text: "Schedule is now available",
          html: `<h4>Hello ${e.full_name}</h4>
        <p>Your schedule for ${e.schedule[0].weekOf} is available</p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
        req.app
          .get("db")
          .finduser(e.employee_id)
          .then(useridd => {
            console.log("FINDING USER IN CREATNG SCHEDULE SUCCESSFULL");
            req.app
              .get("db")
              .addemail([
                useridd[0].user_id,
                id,
                `Your schedule for ${e.schedule[0].weekOf} is available`
              ]);
          })
          .catch(err => {
            console.log(
              `ERROR IN FINDING USER IN CREATING SCHEDULE : => ${err}`
            );
          });
        req.app
          .get("db")
          .createschedule([
            compId[0].company_id,
            e.employee_id,
            newCurr,
            e.schedule[0].weekOf,
            e.schedule[1].mondaymorningclockin +
              e.schedule[1].mondaymorningclockout,
            e.schedule[2].mondaynightclockin +
              e.schedule[2].mondaynightclockout,

            e.schedule[3].tuesdaymorningclockin +
              e.schedule[3].tuesdaymorningclockout,
            e.schedule[4].tuesdaynightclockin +
              e.schedule[4].tuesdaynightclockout,

            e.schedule[5].wednesdaymorningclockin +
              e.schedule[5].wednesdaymorningclockout,
            e.schedule[6].wednesdaynightclockin +
              e.schedule[6].wednesdaynightclockout,

            e.schedule[7].thursdaymorningclockin +
              e.schedule[7].thursdaymorningclockout,
            e.schedule[8].thursdaynightclockin +
              e.schedule[8].thursdaynightclockout,

            e.schedule[9].fridaymorningclockin +
              e.schedule[9].fridaymorningclockout,
            e.schedule[10].fridaynightclockin +
              e.schedule[10].fridaynightclockout,

            e.schedule[11].saturdaymorningclockin +
              e.schedule[11].saturdaymorningclockout,
            e.schedule[12].saturdaynightclockin +
              e.schedule[12].saturdaynightclockout,

            e.schedule[13].sundaymorningclockin +
              e.schedule[13].sundaymorningclockout,
            e.schedule[14].sundaynightclockin +
              e.schedule[14].sundaynightclockout
          ])
          .then(results => {
            console.log(compId[0].company_id);
            // res.status(200).json(results);
            req.app
              .get("db")
              .getschedules([compId[0].company_id, arr[0].schedule[0].weekOf])
              .then(schedules => {
                console.log(schedules);
                console.log(
                  `SCHEDULES RECEIVED HERE THEY ARE : => ${schedules}`
                );
                res.status(200).json(schedules);
              })
              .catch(e => {
                res.status(500).json(e);
                console.log(
                  `ERROR GETTING SCHEDULES AFTER POSTING SCHEDULE : => ${e}`
                );
              });
          })
          .catch(err => {
            console.log(`ERROR IN CREATING SCHEDULE :${err}`);
            res.status(500).json(err);
          });
      });
    })
    .catch(error => {
      console.log(`ERROR FINDING COMPANY WITH EMPLOYEE ID : => ${error}`);
      res.status(500).json(error);
    });
};
const updateCompanyIdSchedule = (req, res, next) => {
  let { arr, userId, weekof } = req.body;
  let { id } = req.params;
  console.log(arr);
  console.log(userId);
  console.log(weekof);
  // req.app
  //   .get("db")
  //   .findEmployeeWithGroup([userId, id])
  //   .then(empId => {
  //     console.log(empId);
  _(arr, e => {
    client.messages
      .create({
        body: `Hey ${
          e.full_name
        }, this is Entity Schedules letting you know that your schedule has been updated`,
        from: "4156505615",
        to: e.phone_number
      })
      .then(message => console.log(message.sid))
      .done();
    let mailOptions = {
      from: '"Andy Schedules" <andyschedules@gmail.com>',
      to: e.email,
      subject: `Week ${e.schedule[0].weekOf} has been edited`,
      text: "Schedule has been updated and is now available",
      html: `<h4>Hello ${e.full_name}</h4>
    <p>Your schedule for ${
      e.schedule[0].weekOf
    } was updated and is available</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    req.app
      .get("db")
      .finduser(e.employee_id)
      .then(usersid => {
        console.log("USER ID");
        console.log(usersid[0].user_id);
        req.app
          .get("db")
          .addemailwithoutcomp([
            usersid[0].user_id,
            `Schedule for week ${
              e.schedule[0].weekOf
            } has been updated and is now available`
          ])
          .then(email => {
            console.log("EMAIL");
            console.log(email);
            console.log(email[0].email_id);
            console.log("ADDING EMAIL WITHOUT COMPANY ID SUCCESSFUL");
            console.log(arr[0].employee_id);
            let newemail = email[0].email_id;
            console.log(newemail);
            req.app
              .get("db")
              .findcompany(arr[0].employee_id)
              .then(companyID => {
                console.log("COMPANY_ID RIGHT HERERE1211212121212");
                console.log(newemail);
                console.log(companyID[0].company_id);
                req.app
                  .get("db")
                  .updateemail(companyID[0].company_id, newemail)
                  .then(() =>
                    console.log(
                      "UPDATING EMAIL AFTER FINDING COMPANY SUCCESSFULL"
                    )
                  )
                  .catch(err =>
                    console.log(
                      `ERROR IN UPDATING EMAIL AFTER FINDING COMPANY : => ${err}`
                    )
                  );
              });
          })
          .catch(err => {
            console.log(`ERROR IN FINDING COMPANY : =>${err}`);
          })

          .catch(err =>
            console.log(`ERROR IN ADDIN EMAIL WITHOUT COMPANY ID : =>${err}`)
          );
      })
      .catch(error => {
        console.log(`ERROR IN FINDING USER FROM EMPLOYEE ID : => ${error}`);
      });
    req.app
      .get("db")
      .updateScheduleswithcompanyid([
        e.employee_id,
        e.schedule[1].mondaymorningclockin +
          e.schedule[1].mondaymorningclockout,
        e.schedule[2].mondaynightclockin + e.schedule[2].mondaynightclockout,

        e.schedule[3].tuesdaymorningclockin +
          e.schedule[3].tuesdaymorningclockout,
        e.schedule[4].tuesdaynightclockin + e.schedule[4].tuesdaynightclockout,

        e.schedule[5].wednesdaymorningclockin +
          e.schedule[5].wednesdaymorningclockout,
        e.schedule[6].wednesdaynightclockin +
          e.schedule[6].wednesdaynightclockout,

        e.schedule[7].thursdaymorningclockin +
          e.schedule[7].thursdaymorningclockout,
        e.schedule[8].thursdaynightclockin +
          e.schedule[8].thursdaynightclockout,

        e.schedule[9].fridaymorningclockin +
          e.schedule[9].fridaymorningclockout,
        e.schedule[10].fridaynightclockin + e.schedule[10].fridaynightclockout,

        e.schedule[11].saturdaymorningclockin +
          e.schedule[11].saturdaymorningclockout,
        e.schedule[12].saturdaynightclockin +
          e.schedule[12].saturdaynightclockout,

        e.schedule[13].sundaymorningclockin +
          e.schedule[13].sundaymorningclockout,
        e.schedule[14].sundaynightclockin + e.schedule[14].sundaynightclockout,
        e.schedule[0].weekOf
      ])
      .then(results => {
        console.log("SUCCESS IN UPDATING WOO HOO");
        // res.status(200).json(results);
      })
      .catch(err => {
        console.log(`ERROR IN UPDATING SCHEDULE WITH COMPANY ID : => ${err}`);
        res.status(500).json(err);
      });
  });
  req.app
    .get("db")
    .getschedules([id, weekof])
    .then(schedules => {
      console.log(schedules);
      console.log(`SCHEDULES RECEIVED HERE THEY ARE1212 : => ${schedules}`);
      res.status(200).json(schedules);
    })
    .catch(e => {
      res.status(500).json(e);
      console.log(`ERROR GETTING SCHEDULES AFTER POSTING SCHEDULE : => ${e}`);
    });
  // })
  // .catch();
};
const updateSchedule = (req, res) => {
  console.log("UPDATE SCHEDULE CONTROLLER HIT!");
  let { week, userId, arr } = req.body;
  console.log(arr);

  _(arr, e => {
    client.messages
      .create({
        body: `Hey ${
          e.full_name
        }, this is Entity Schedules letting you know that your schedule has been updated`,
        from: "4156505615",
        to: e.phone_number
      })
      .then(message => console.log(message.sid))
      .done();
    console.log(e.employee_id);
    req.app
      .get("db")
      .finduser(e.employee_id)
      .then(usersid => {
        console.log("USER ID");
        console.log(usersid[0].user_id);
        req.app
          .get("db")
          .addemailwithoutcomp([
            usersid[0].user_id,
            `Schedule for week ${
              e.schedule[0].weekOf
            } has been updated and is now available`
          ])
          .then(email => {
            console.log("EMAIL");
            console.log(email);
            console.log(email[0].email_id);
            console.log("ADDING EMAIL WITHOUT COMPANY ID SUCCESSFUL");
            console.log(arr[0].employee_id);
            let newemail = email[0].email_id;
            console.log(newemail);
            req.app
              .get("db")
              .findcompany(arr[0].employee_id)
              .then(companyID => {
                console.log("COMPANY_ID RIGHT HERERE1211212121212");
                console.log(newemail);
                console.log(companyID[0].company_id);
                req.app
                  .get("db")
                  .updateemail(companyID[0].company_id, newemail)
                  .then(() =>
                    console.log(
                      "UPDATING EMAIL AFTER FINDING COMPANY SUCCESSFULL"
                    )
                  )
                  .catch(err =>
                    console.log(
                      `ERROR IN UPDATING EMAIL AFTER FINDING COMPANY : => ${err}`
                    )
                  );
              });
          })
          .catch(err => {
            console.log(`ERROR IN FINDING COMPANY : =>${err}`);
          })

          .catch(err =>
            console.log(`ERROR IN ADDIN EMAIL WITHOUT COMPANY ID : =>${err}`)
          );
      })
      .catch(error => {
        console.log(`ERROR IN FINDING USER FROM EMPLOYEE ID : => ${error}`);
      });

    let mailOptions = {
      from: '"Andy Schedules" <andyschedules@gmail.com>',
      to: e.email,
      subject: `Week ${e.schedule[0].weekOf} has been edited`,
      text: "Schedule has been updated and is now available",
      html: `<h4>Hello ${e.full_name}</h4>
    <p>Your schedule for ${
      e.schedule[0].weekOf
    } was updated and is available</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    req.app
      .get("db")
      .addemail([])
      .then(() => {
        console.log(
          "SUCCESS IN ADDING AN EMAIL AFTER UPDATING THE USERS SCHEDULE"
        );
      })
      .catch(error => {
        console.log(
          `ERROR IN ADDING AN EMAIL AFTER UPDATING USERS SCHEDULE ${error}`
        );
      });
    req.app
      .get("db")
      .updateschedules([
        e.employee_id,
        e.schedule[1].mondaymorningclockin +
          e.schedule[1].mondaymorningclockout,
        e.schedule[2].mondaynightclockin + e.schedule[2].mondaynightclockout,

        e.schedule[3].tuesdaymorningclockin +
          e.schedule[3].tuesdaymorningclockout,
        e.schedule[4].tuesdaynightclockin + e.schedule[4].tuesdaynightclockout,

        e.schedule[5].wednesdaymorningclockin +
          e.schedule[5].wednesdaymorningclockout,
        e.schedule[6].wednesdaynightclockin +
          e.schedule[6].wednesdaynightclockout,

        e.schedule[7].thursdaymorningclockin +
          e.schedule[7].thursdaymorningclockout,
        e.schedule[8].thursdaynightclockin +
          e.schedule[8].thursdaynightclockout,

        e.schedule[9].fridaymorningclockin +
          e.schedule[9].fridaymorningclockout,
        e.schedule[10].fridaynightclockin + e.schedule[10].fridaynightclockout,

        e.schedule[11].saturdaymorningclockin +
          e.schedule[11].saturdaymorningclockout,
        e.schedule[12].saturdaynightclockin +
          e.schedule[12].saturdaynightclockout,

        e.schedule[13].sundaymorningclockin +
          e.schedule[13].sundaymorningclockout,
        e.schedule[14].sundaynightclockin + e.schedule[14].sundaynightclockout,
        e.schedule[0].weekOf
      ])
      .then(results => {
        console.log(`UPDATING SCHEDULES SUCCESSFUL4545`);
        req.app
          .get("db")
          .findcompany(arr[0].employee_id)
          .then(compId => {
            console.log(compId[0].company_id);
            console.log(arr[0].schedule[0].weekOf);
            req.app
              .get("db")
              .getschedules([compId[0].company_id, arr[0].schedule[0].weekOf])
              .then(schedules => {
                console.log(schedules);
                console.log(
                  `SCHEDULES RECEIVED HERE THEY ARE1212 : => ${schedules}`
                );
                res.status(200).json(schedules);
              })
              .catch(e => {
                res.status(500).json(e);
                console.log(
                  `ERROR GETTING SCHEDULES AFTER POSTING SCHEDULE : => ${e}`
                );
              });
          })
          .catch(errorr => {
            console.log(
              `ERROR IN FINDING COMPANY AFTER UPDATING SCHEDULES : => ${errorr}`
            );
            res.status(500).json(errorr);
          });
      })
      .catch(err => {
        console.log(`ERROR UPDATING SCHEDULES : => ${err}`);
        res.status(500).json(err);
      });
  });
};
//deleting schedule with group id
const deleteschedulewithgroupid = (req, res, next) => {
  let { user, company, week } = req.query;
  console.log(user);
  console.log(company);
  console.log(week);
  // console.log("DENIED APPLICATION CONTROLLER HIT");
  // req.app
  //   .get("db")
  //   .findEmployeeWithGroup([user, company])
  //   .then(empId => {
  req.app
    .get("db")
    .deleteweek([+company, week])
    .then(results => {
      console.log("SUCCESS IN DELETING WEEK WITH GROUP ID");
      console.log(company);
      req.app
        .get("db")
        .getschedules([+company, week])
        .then(schedules => {
          console.log(schedules);
          console.log(`SCHEDULES RECEIVED HERE THEY ARE : => ${schedules}`);
          res.status(200).json(schedules);
        })
        .catch(e => {
          res.status(500).json(e);
          console.log(
            `ERROR GETTING SCHEDULES AFTER POSTING SCHEDULE : => ${e}`
          );
        });
    })
    .catch(err => {
      console.log(`ERROR IN DELETING WEEK WITH GROUP ID : => ${err}`);
    });
  // })
  // .catch(error => {
  //   console.log(`ERROR IN FINDING EMPLOYEE WITH GROUP ID${error}`);
  //   res.status(500).json(error);
  // });
};
//DELETING SCHEDULE
const deleteSchedule = (req, res) => {
  let { user, weekof } = req.query;
  console.log(user);
  console.log(weekof);
  req.app
    .get("db")
    .findcompany([user])
    .then(compId => {
      console.log(compId);
      req.app
        .get("db")
        .deleteweek([+compId[0].company_id, weekof])
        .then(results => {
          console.log("DELETE WEEK SUCCESSFUL");
          console.log(compId[0].company_id);
          // res.status(200).json(results);
          req.app
            .get("db")
            .getschedules([+compId[0].company_id, weekof])
            .then(schedules => {
              console.log(schedules);
              console.log(
                `SUCCESS IN GETTING SCHEDULES RECEIVED HERE THEY ARE : => ${schedules}`
              );
              res.status(200).json(schedules);
            })
            .catch(e => {
              res.status(500).json(e);
              console.log(
                `ERROR GETTING SCHEDULES AFTER POSTING SCHEDULE : => ${e}`
              );
            });
        })
        .catch(err => {
          console.log(`ERROR IN DELETING WEEK AFTER FINDING COMPANY ID${err}`);
          res.status(500).json(err);
        });
    })
    .catch(error => {
      console.log(`ERROR IN FINDING COMPANY : => ${error}`);
      res.status(500).json(error);
    });
};

//////////////////////////////////////////////////////////////////////
//COMPANY CONTROLLERS

//accept users application
const denyUserApplication = (req, res, next) => {
  console.log("DENIED APPLICATION CONTROLLER HIT");
  let { id } = req.params;
  let { user, company, userid } = req.query;
  console.log(userid);
  let mailOptions = {
    from: '"Andy Schedules" <andyschedules@gmail.com>',
    to: user,
    subject: `Application Denied`,
    text: "Your Application has been denied",
    html: `<h4>Application Denied</h4>
  <p>Your application was denied</p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
  req.app
    .get("db")
    .addemail([userid, company, "Your Application has been denied"])
    .then(() => {
      console.log(
        "SUCCESS IN ADDING AN EMAIL AFTER DENYING THE USERS APPLICATION"
      );
    })
    .catch(error => {
      console.log(
        `ERROR IN ADDING AN EMAIL AFTER DENYING USERS APPLICATION${error}`
      );
    });
  req.app
    .get("db")
    .denyUsersApplication([id])
    .then(r => {
      console.log("DENYING USERS APPLICATION SUCCESSFUL");
      res.status(200).json(results);
    })
    .catch(error => {
      console.log(`ERROR IN DENYING USERS APPLICATION`);
      req.app
        .get("db")
        .getPendingApplications([company])
        .then(results => {
          console.log(
            "SUCCESSFUL IN GETTING ALL PENDING APPLICATIONS AFTER DENYING USER"
          );
          res.status(200).json(results);
        })
        .catch(err => {
          console.log(
            `ERROR IN GETTING PENDING APPLICATIONS AFTER DENYING USERS : => ${err}`
          );
        });
    });
};
const acceptUserApplication = (req, res, next) => {
  let { userId, companyId, appId, email } = req.body;
  console.log(userId);
  console.log(companyId);
  let mailOptions = {
    from: '"Andy Schedules" <andyschedules@gmail.com>',
    to: email,
    subject: `Application Accepted`,
    text: "Your Application has been Accepted",
    html: `<h4>Application Accepted</h4>
  <p>Your schedule was accepted</p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
  req.app
    .get("db")
    .addemail([userId, companyId, "Your Application has been Accepted"])
    .then(() => {
      console.log(
        "SUCCESS IN ADDING AN EMAIL AFTER ACCEPTING THE USERS APPLICATION"
      );
    })
    .catch(error => {
      console.log(
        `ERROR IN ADDING AN EMAIL AFTER ACCEPTING USERS APPLICATION${error}`
      );
    });
  req.app
    .get("db")
    .addApplicationEmployee([companyId, userId, 0, appId])
    .then(results => {
      console.log("ADDING USER AS EMPLOYEE SUCCESSFUL");
      req.app
        .get("db")
        .getPendingApplications([companyId])
        .then(applications => {
          console.log(
            "SUCCESSFULL IN GETTING PENDING APPLICATIONS AFTER ACCEPTING USER"
          );
          res.status(200).json(applications);
        })
        .catch(err => {
          console.log(
            `ERROR IN GETTING APPLICATIONS AFTER ACCEPTING USERS APPLICATION `
          );
          res.status(500).json(err);
        });
    })
    .catch(error => {
      console.log(`ERROR IN ADDING USER AS EMPLOYEE : => ${error}`);
    });
};

//get company applications
const getApplications = (req, res, next) => {
  let { company } = req.query;
  console.log(company);
  req.app
    .get("db")
    .getPendingApplications([company])
    .then(applications => {
      console.log("SUCCESS IN GETTING ALL PENDING APPLICATIONS");
      res.status(200).json(applications);
    })
    .catch(error => {
      console.log(`ERROR IN GETTING ALL PENDING APPLICATIONS : => ${error}`);
      res.status(500).json(error);
    });
};

//apply for a company
const applicationRequest = (req, res, next) => {
  let { companyId, userId } = req.body;
  console.log(companyId);
  console.log(userId);
  req.app
    .get("db")
    .jobApplication([companyId, userId])
    .then(results => {
      console.log(results);
      //res.send
      console.log("SUCCESSFULLY INSERTED INTO APPLICATION TABLE");
    })
    .catch(error => {
      console.log(
        `ERROR IN INSERTING APPLICATION INTO APPLICATION TABLE : => ${error}`
      );
      res.status(500).json(error);
    });
};

//CREATING THE COMPANY FOR THE USER, AND MAKING AN EMPLOYEE OF THE COMPANY OF THE USER WHO CREATED THE COMPANY WORKS
const createCompany = (req, res) => {
  console.log("CREATE COMPANY HIT");
  let { name, founded, founder, lat, long, location } = req.body;
  console.log(lat);
  console.log(long);
  req.app
    .get("db")
    .createGroup([name, founded, founder, lat, long, location])
    .then(results => {
      console.log("group created successful: " + results);
      req.app
        .get("db")
        .createEmployee([results[0]["company_id"], results[0]["founder"], 1])
        .then(newres => {
          console.log("MANAGER CREATED", newres);
          req.app
            .get("db")
            .getGroup([founder])
            .then(groups => {
              console.log(
                "SUCCESSFULL IN GETTING GROUPS AFTER CREATING GROUPS"
              );
              res.status(200).json(groups);
            })
            .catch(error => {
              console.log(
                `ERROR IN GETTING GROUP AFTER CREATING COMPANY : =>${error}`
              );
            });
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
  console.log(`USER ID : => ${userid}`);
  console.log("GET COMPANY HIT");
  req.app
    .get("db")
    .getGroup(userid)
    .then(results => {
      console.log("getting company successful");
      console.log(results);
      res.status(200).json(results);
    })
    .catch(err => {
      console.log("error: " + err);
      res.status(500).json(err);
    });
};

//getting all jobs that live in the database
const getAllJobs = (req, res) => {
  req.app
    .get("db")
    .getallbusiness()
    .then(all => {
      console.log("SUCCESS IN GETTING ALL BUSINESSES");
      res.status(200).json(all);
    })
    .catch(error => {
      console.log(`ERROR IN GETTING ALL BUSINESSES : => ${error}`);
      res.status(500).json(error);
    });
};
const getLocation = (req, res) => {
  let { id } = req.params;
  console.log(`GET LOCATION HIT HERE IS THE ID : => ${id}`);
  req.app
    .get("db")
    .getLatLon(id)
    .then(latlong => {
      console.log(`GETTING LOCATION IS SUCCESSFUL : => ${latlong}`);
      res.status(200).json(latlong);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
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
};
