import './App.css';
import { useState, useEffect } from 'react'
import Day from './components/Day'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [days, setDays] = useState([])
  const [totalHours, setTotalHours] = useState('00:00');

  const notify = (day) => toast.success(`Deleted day ${day}`, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

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
    setDays([...days, {day: days.length > 0 ? days[days.length - 1].day + 1 : 1, hours: 0, hour1:"00:00", hour2:"00:00"}])
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
  setTotalHours('00:00')
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

const deleteDay = (index) => {
  let newDays = []
  for(let day of days){
    console.log("current day:" + day.day)
    if(day.day !== index){
      newDays.push(day)
    }
  }
  notify(index)
  setDays(newDays)
  console.log(days)
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
        return <Day key={index} day={e.day} updateDay={updateDay} hour1={e.hour1} hour2={e.hour2} updateHour={updateTimeList} deleteDay={deleteDay}></Day>
      })}
      <div><h1>Total Hours: {totalHours}</h1></div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        />
    </div>
  );
}

export default App;
