import React, { Component } from "react";
import Filter from "../filter-emp/Filter";
import "./WeekOf.css";
import Dialog from "material-ui/Dialog";
import DatePicker from "material-ui/DatePicker";
import DateRange from "material-ui/svg-icons/action/date-range";
import FlatButton from "material-ui/FlatButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getWeekOf,
  setWeekOf,
  companyWeekOf
} from "../../../ducks/schedulesreducer";

class WeekOf extends Component {
  constructor() {
    super();
    this.state = {
      currentWeekOf: "",
      calendarselect: false,
      dialogopen: false,
      jan: "January",
      feb: "Febuary",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      aug: "August",
      sept: "September",
      oct: "October",
      nov: "Novemeber",
      dec: "December",
      currentDay: "",
      currentMonth: "",
      currentnumbermonth: "",
      currentYear: "",
      daysThisMonth: "",
      daysLastMonth: ""
    };
    this.calendarToggle = this.calendarToggle.bind(this);
  }
  componentDidMount() {
    let currDate = new Date();
    console.log(currDate);
    let monthDay = +currDate.getDate();
    console.log(monthDay);
    let weekDay = +currDate.getDay();
    console.log(weekDay);
    let month = +currDate.getMonth();
    console.log(month);
    let year = +currDate.getFullYear();
    console.log(year);
    let diff = 0;
    if (weekDay === 0) {
      weekDay === 1;
      monthDay = monthDay - 6;
      console.log(monthDay);
    } else if (weekDay === 1) {
      null;
    } else {
      monthDay = monthDay - (weekDay - 1);
      console.log(weekDay);
      console.log(monthDay);

      // console.log(diff);
      console.log(monthDay);
    }
    this.setState({ currentnumbermonth: month });
    switch (month) {
      case 0:
        month = this.state.jan;
        break;
      case 1:
        month = this.state.feb;
        break;
      case 2:
        month = this.state.march;
        break;
      case 3:
        month = this.state.april;
        break;
      case 4:
        month = this.state.may;
        break;
      case 5:
        month = this.state.june;
        break;
      case 6:
        month = this.state.july;
        break;
      case 7:
        month = this.state.aug;
        break;
      case 8:
        month = this.state.sept;
        break;
      case 9:
        month = this.state.oct;
        break;
      case 10:
        month = this.state.nov;
        break;
      case 11:
        month = this.state.dec;
        break;
      default:
        month = "month unavailable";
    }
    let newDate = `${month} ${monthDay}, ${year}`;
    console.log(newDate);
    //set this weeks week and get this weeks schedule
    this.props.setWeekOf(newDate);
    this.setState({
      currentDay: monthDay,
      currentMonth: month,
      currentYear: year
    });
    console.log(
      `USER ID FOR GET WEEK OF RIGHT HERERRR : => ${
        this.props.currentUser[0].user_id
      }`
    );
    //this is what is thowing the error
    this.props.getWeekOf(this.props.currentUser[0].user_id, newDate);
    console.log(this.props);
  }
  calendarToggle(prop) {
    this.setState({ [prop]: !this.state[prop] });
  }
  render() {
    console.log(this.props);
    let {
      jan,
      feb,
      march,
      april,
      may,
      june,
      july,
      aug,
      sept,
      oct,
      nov,
      dec
    } = this.state;
    return (
      <div className="search">
        <Filter />
        <div
          className="left-arrow"
          onClick={() => {
            console.log(this.state.currentnumbermonth);
            let dayTM = new Date(
              this.state.currentYear,
              this.state.currentnumbermonth + 1,
              0
            );
            let dayLM = new Date(
              this.state.currentYear,
              this.state.currentnumbermonth,
              0
            );
            let dayTM1 = dayTM.getDate();
            let dayLM1 = dayLM.getDate();
            console.log(dayLM1);
            console.log(dayTM1);
            this.setState({ daysThisMonth: dayTM1, daysLastMonth: dayLM1 });
            if (this.state.currentDay - 7 <= 0) {
              console.log("WE HIT ITTT BOYYYY");
              let difference = this.state.currentDay - 7 + dayLM1;
              console.log(difference);
              this.setState({
                currentDay: difference,
                currentnumbermonth: this.state.currentnumbermonth - 1
              });
              let newestDate;
              switch (this.state.currentnumbermonth - 1) {
                case 0:
                  this.setState({ currentMonth: this.state.jan });
                  newestDate = `${this.state.jan} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 1:
                  this.setState({ currentMonth: this.state.feb });
                  newestDate = `${this.state.feb} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 2:
                  this.setState({ currentMonth: this.state.march });
                  newestDate = `${this.state.march} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 3:
                  this.setState({ currentMonth: this.state.april });
                  newestDate = `${this.state.april} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 4:
                  this.setState({ currentMonth: this.state.may });
                  newestDate = `${this.state.may} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 5:
                  this.setState({ currentMonth: this.state.june });
                  newestDate = `${this.state.june} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 6:
                  this.setState({ currentMonth: this.state.july });
                  newestDate = `${this.state.july} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 7:
                  this.setState({ currentMonth: this.state.aug });
                  newestDate = `${this.state.aug} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 8:
                  this.setState({ currentMonth: this.state.sept });
                  newestDate = `${this.state.sept} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 9:
                  this.setState({ currentMonth: this.state.oct });
                  newestDate = `${this.state.oct} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 10:
                  this.setState({ currentMonth: this.state.nov });
                  newestDate = `${this.state.nov} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 11:
                  this.setState({ currentMonth: this.state.dec });
                  newestDate = `${this.state.dec} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                default:
                  this.setState({ currentMonth: "month unavailable" });
              }
            } else {
              console.log(`DEFAULT ELSE STATEMENT HIT`);
              console.log(this.state.currentMonth);
              this.setState({ currentDay: this.state.currentDay - 7 });
              let newestsDate = `${this.state.currentMonth} ${this.state
                .currentDay - 7}, ${this.state.currentYear}`;
              this.props.setWeekOf(newestsDate);
              // this.props.getWeekOf(
              //   this.props.currentUser[0].user_id,
              //   newestsDate
              // );
              !this.props.currentCompanyIdForDate
                ? this.props.getWeekOf(
                    this.props.currentUser[0].user_id,
                    newestsDate
                  )
                : this.props.companyWeekOf(
                    this.props.currentCompanyIdForDate,
                    newestsDate
                  );
            }
          }}
        />
        <div className="dialog-datepicker">
          <Dialog
            open={this.state.dialogopen}
            onRequestClose={() => this.calendarToggle("dialogopen")}
            actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.calendarToggle("dialogopen")}
              />,
              <FlatButton
                label="Submit"
                primary={true}
                onClick={() => this.calendarToggle("dialogopen")}
              />
            ]}
          >
            <DatePicker
              hideCalendarDate={this.state.calendarselect}
              placeholder="select a date"
              onChange={(blank, date) => {
                let newcurrdate = new Date(date);
                let dayOfWeek = +newcurrdate.getDay();
                let dayOfMonth = +newcurrdate.getDate();
                if (dayOfWeek === 0) {
                  dayOfMonth = dayOfMonth - 6;
                } else if (dayOfWeek === 1) {
                  null;
                } else {
                  dayOfMonth = dayOfMonth - (dayOfWeek - 1);
                }
                let month = date.toString().slice(4, 7);
                // let day = date.toString().slice(8, 10);
                let year = date.toString().slice(11, 15);
                // if (day[0] === "0") {
                //   day = date.toString().slice(9, 10);
                // }
                switch (month) {
                  case "Jan":
                    month = jan;
                    break;
                  case "Feb":
                    month = feb;
                    break;
                  case "Mar":
                    month = march;
                    break;
                  case "Apr":
                    month = april;
                    break;
                  case "May":
                    month = may;
                    break;
                  case "Jun":
                    month = june;
                    break;
                  case "Jul":
                    month = july;
                    break;
                  case "Aug":
                    month = aug;
                    break;
                  case "Sep":
                    month = sept;
                    break;
                  case "Oct":
                    month = oct;
                    break;
                  case "Nov":
                    month = nov;
                    break;
                  case "Dec":
                    month = dec;
                    break;
                  default:
                    month = "Day Unavailable";
                }
                date = `${month} ${dayOfMonth}, ${year}`;
                let dayTM = new Date(year, this.state.currentnumbermonth, 0);
                let dayTM1 = dayTM.getDate();
                let dayLM = new Date(
                  year,
                  this.state.currentnumbermonth - 1,
                  0
                );
                let dayLM1 = dayLM.getDate();
                //update reducer week of and get that week of schedules
                this.setState({
                  currentDay: dayOfMonth,
                  currentMonth: month,
                  currentnumbermonth: newcurrdate.getMonth(),
                  currentYear: year,
                  daysThisMonth: dayTM1,
                  daysLastMonth: dayLM1
                });
                this.props.setWeekOf(date);
                this.props.getWeekOf(this.props.currentUser[0].user_id, date);
                // this.props.getWeekOf(this.props.currentUser[0].user_id, date);
              }}
              mode="landscape"
            />
          </Dialog>
        </div>
        <h3 className="week-display">{this.props.weekOf}</h3>
        <div
          className="right-arrow"
          onClick={() => {
            console.log(this.currentMonth);
            console.log(this.currentnumbermonth);
            let dayTM = new Date(
              this.state.currentYear,
              this.state.currentnumbermonth + 1,
              0
            );
            let dayTM1 = dayTM.getDate();
            this.setState({ daysThisMonth: dayTM1 });

            if (
              new Date(
                `${this.state.currentMonth} ${this.state.currentDay + 7},${
                  this.state.currentYear
                }`
              ) == "Invalid Date"
            ) {
              console.log(dayTM1, this.currentnumbermonth);
              let difference = this.state.currentDay + 7 - dayTM1;
              this.setState({
                currentDay: difference,
                currentnumbermonth: this.state.currentnumbermonth + 1
              });
              let newestDate;
              switch (this.state.currentnumbermonth + 1) {
                case 0:
                  this.setState({ currentMonth: this.state.jan });
                  newestDate = `${this.state.jan} ${difference}, ${
                    this.state.currentYear
                  }`;
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate
                      );
                  break;
                case 1:
                  this.setState({ currentMonth: this.state.feb });
                  newestDate = `${this.state.feb} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 2:
                  this.setState({ currentMonth: this.state.march });
                  newestDate = `${this.state.march} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 3:
                  this.setState({ currentMonth: this.state.april });
                  newestDate = `${this.state.april} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 4:
                  this.setState({ currentMonth: this.state.may });
                  newestDate = `${this.state.may} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 5:
                  this.setState({ currentMonth: this.state.june });
                  newestDate = `${this.state.june} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 6:
                  this.setState({ currentMonth: this.state.july });
                  newestDate = `${this.state.july} ${difference}, ${
                    this.state.currentYear
                  }`;
                  this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 7:
                  this.setState({ currentMonth: this.state.aug });
                  newestDate = `${this.state.aug} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 8:
                  this.setState({ currentMonth: this.state.sept });
                  newestDate = `${this.state.sept} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 9:
                  this.setState({ currentMonth: this.state.oct });
                  newestDate = `${this.state.oct} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 10:
                  this.setState({ currentMonth: this.state.nov });
                  newestDate = `${this.state.nov} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                case 11:
                  this.setState({ currentMonth: this.state.dec });
                  newestDate = `${this.state.dec} ${difference}, ${
                    this.state.currentYear
                  }`;
                  // this.props.setWeekOf(newestDate);
                  // this.props.getWeekOf(
                  //   this.props.currentUser[0].user_id,
                  //   newestDate
                  // );
                  this.props.setWeekOf(newestDate);
                  !this.props.currentCompanyIdForDate
                    ? this.props.getWeekOf(
                        this.props.currentUser[0].user_id,
                        newestDate
                      )
                    : this.props.companyWeekOf(
                        this.props.currentCompanyIdForDate,
                        newestDate
                      );
                  break;
                default:
                  this.setState({ currentMonth: "month unavailable" });
              }
            } else {
              console.log(`DEFAULT ELSE STATEMENT HIT`);
              console.log(this.props.currentCompanyIdForDate);
              this.setState({ currentDay: this.state.currentDay + 7 });
              let newestsDate = `${this.state.currentMonth} ${this.state
                .currentDay + 7}, ${this.state.currentYear}`;
              this.props.setWeekOf(newestsDate);
              // this.props.getWeekOf(
              //   this.props.currentUser[0].user_id,
              //   newestsDate
              // );
              !this.props.currentCompanyIdForDate
                ? this.props.getWeekOf(
                    this.props.currentUser[0].user_id,
                    newestsDate
                  )
                : this.props.companyWeekOf(
                    this.props.currentCompanyIdForDate,
                    newestsDate
                  );
            }
          }}
        />

        <DateRange onClick={() => this.calendarToggle("dialogopen")} />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    ...state.schedulesreducer,
    ...state.users,
    ...state.company
  };
};

export default connect(mapStateToProps, {
  getWeekOf,
  setWeekOf,
  companyWeekOf
})(WeekOf);
