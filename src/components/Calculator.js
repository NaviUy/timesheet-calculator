import React, { useState, useEffect } from "react";
import Day from "./Day";
import "react-toastify/dist/ReactToastify.css";
import { notify, notifyError, notifySaved } from '../utils/notify'

function Calculator() {
  //states
  const [days, setDays] = useState([]);
  const [totalHours, setTotalHours] = useState("00:00");

  //today's date
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd

  //useEffect
  useEffect(() => {
    let item = JSON.parse(localStorage.getItem("days"));
    if (item) {
      setDays(item);
    }
  }, []);

  //functions

  function updateTotal() {
    let calculatedHour = 0;
    let calculatedMinute = 0;

    for (let day of days) {
      let [hour, minute] = day.hours.toString().split(":");
      calculatedHour += parseInt(hour);
      calculatedMinute += parseInt(minute);
    }

    while (calculatedMinute >= 60) {
      calculatedHour++;
      calculatedMinute -= 60;
    }

    setTotalHours(`${pad(calculatedHour)}:${pad(calculatedMinute)}`);
  }

  function addDay() {

    setDays([
      ...days,
      {
        day: days.length > 0 ? days[days.length - 1].day + 1 : 1,
        date: today,
        hours: 0,
        hour1: "00:00",
        hour2: "00:00",
        note: "",
      },
    ]);
  }

  const updateDay = (index, hours) => {
    let copyofDays = days;
    for (let day of copyofDays) {
      if (index === day.day) {
        day.hours = hours;
      }
    }
    setDays(copyofDays);
    updateTotal();
  };

  function pad(num, size = 2) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  function resetDay() {
    try {
      localStorage.removeItem('days');
      setDays([]);
      setTotalHours("00:00");
      notifySaved("Resetted");
    } catch (e) {
      notifyError("Resetting Failed");
    }
  }

  const updateTimeList = (index, t1, t2) => {
    let copyofDays = days;
    for (let day of copyofDays) {
      if (index === day.day) {
        day.hour1 = t1;
        day.hour2 = t2;
      }
    }
  };

  const deleteDay = (index) => {
    let newDays = [];
    for (let day of days) {
      if (day.day !== index) {
        newDays.push(day);
      }
    }
    notify(index);
    setDays(newDays);
  };

  const updateDate = (index, newDate) => {
    let newDays = []
    for(let day of days) {
      if(day.day === index){
        day.date = newDate
      }
      newDays.push(day)
    }
    setDays(newDays);
  }

  const updateNote = (index, newNote) => {
    let newDays = []
    for(let day of days){
      if(day.day === index){
        day.note = newNote
      }
      newDays.push(day)
    }
    setDays(newDays)
  }

  //localstorage
  function saveDay() {
    try {
      localStorage.setItem("days", JSON.stringify(days));
      notifySaved("Saved");
    } catch (e) {
      notifyError("Saving Failed");
    }
  }

  return (
    <div className="container">
      <div className="heading-container">
        <h1>Timesheet Calculator</h1>
        <p>Please remember to save or all progress will be lossed.</p>
      </div>
      <div className="form-container">
        <div className="button-container">
          <button onClick={() => addDay()}>Add Day</button>
          <button onClick={() => resetDay()}>Reset</button>
          <button onClick={() => saveDay()}>Save</button>
        </div>
      </div>
      {days.map((e, index) => {
        return (
          <Day
            key={index}
            day={e.day}
            date={e.date}
            updateDay={updateDay}
            hour1={e.hour1}
            hour2={e.hour2}
            updateHour={updateTimeList}
            deleteDay={deleteDay}
            today={today}
            updateDate={updateDate}
            savednote={e.note}
            updateNote={updateNote}
          ></Day>
        );
      })}
      <div>
        <h1>Total Hours: {totalHours}</h1>
      </div>
    </div>
  );
}

export default Calculator;
