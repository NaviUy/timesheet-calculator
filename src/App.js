import './App.css';
import { useState, useEffect } from 'react'
import Day from './components/Day'

function App() {
  const [days, setDays] = useState([])
  const [totalHours, setTotalHours] = useState('0:00');

  useEffect(() => {
    let item = JSON.parse(localStorage.getItem('days'))
    if(item){
      setDays(item)
    }
  }, [])

  function updateTotal(){
    let calculatedHour = 0
    let calculatedMinute = 0
    for(let day of days){
      let [hour, minute] = (day.hours.toString().split(':'))
      calculatedHour += parseInt(hour)
      calculatedMinute  += parseInt(minute)
    }
    while(calculatedMinute >= 60){
      calculatedHour++
      calculatedMinute -= 60
    }

    setTotalHours(`${pad(calculatedHour)}:${pad(calculatedMinute)}`)
  }

  function addDay(){
    setDays([...days, {day: days.length + 1, hours: 0, hour1:"00:00", hour2:"00:00"}])
  }

  const updateDay = (index, hours) => {
    let copyofDays = days
    for(let day of copyofDays){
      if(index === day.day){
        day.hours = hours
      }
    }
    setDays(copyofDays)
    updateTotal();
  }

  function pad(num, size=2) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function saveDay(){
  localStorage.setItem('days', JSON.stringify(days))
}

function resetDay(){
  localStorage.clear()
  setDays([])
  setTotalHours('0:00')
}

const updateTimeList = (index, t1, t2) => {
  let copyofDays = days
  for(let day of copyofDays){
    if(index === day.day){
      day.hour1 = t1
      day.hour2 = t2
    }
  }
}

  return (
    <div className="App">
      <div className="heading-container">
        <h1>Timesheet Calculator</h1>
      </div>
      <div className="form-container">
        <div className="button-container">
          <button onClick={ () => addDay() }>Add Day</button>
          <button onClick={ () => resetDay() }>Reset</button>
          <button onClick={ () => saveDay() }>Save</button>
        </div>
      </div>
      {days.map( (e, index) => {
        return <Day key={index} day={e.day} updateDay={updateDay} hour1={e.hour1} hour2={e.hour2} updateHour={updateTimeList}></Day>
      })}
      <div><h1>Total Hours: {totalHours}</h1></div>
    </div>
  );
}

export default App;
