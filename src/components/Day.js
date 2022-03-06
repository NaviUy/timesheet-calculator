import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Day({day, date, updateDay, hour1, hour2, updateHour, deleteDay, today, updateDate, savednote, updateNote}) {
    const [period, setPeriod] = useState(null);
    const [time1, setTime1] = useState("00:00");
    const [time2, setTime2] = useState("00:00");
    const [hours, setHours] = useState();
    const [payDate, setpayDate] = useState(today);
    const [note, setNote] = useState("")

    useEffect(() => {
        setPeriod(day)
    }, [day])

    useEffect(() => {
        setpayDate(date)
    }, [date])

    useEffect(() => {
        if(time1 && time2){
            setHours(diff(time1, time2))
        }

        if(time1 || time2){
            updateHour(period, time1, time2)
        }
    }, [period, time1, time2, updateHour])

    useEffect(() => {
        if(hours){
            updateDay(period, hours)
        }
    }, [hours, updateDay, period])

    useEffect(() => {
        if(hour1){
            setTime1(hour1)
        }
        if(hour2){
            setTime2(hour2)
        }
    }, [hour1, hour2])

    useEffect(()=>{
        setNote(savednote)
    }, [savednote])

    function diff(start, end) {
        start = start.split(":");
        end = end.split(":");
        var startDate = new Date(0, 0, 0, start[0], start[1], 0);
        var endDate = new Date(0, 0, 0, end[0], end[1], 0);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        // If using time pickers with 24 hours format, add the below line get exact hours
        if (hours < 0)
           hours = hours + 24;

        return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
    }

    function changeDate(e){
        setpayDate(e)
        updateDate(period, e)
    }

    function changeNote(e){
        setNote(e)
        updateNote(period, e)
    }

    return (
        <div>
            <div className="day-heading-container">
                <h2>Day: {period}</h2>
                <FontAwesomeIcon className="day-trash" icon={faTrash} onClick={ () => deleteDay(period)} />
            </div>
            <div className="day-heading-container" id="date-container">
                <h2 id="date-heading"><span className="date-heading-text">Date:</span>
                    <input type='date' value={payDate} onChange={(e) => changeDate(e.target.value)}></input>
                </h2>
            </div>
            <div className="day-heading-container" id="date-container">
                <h2 id="date-heading"><span className="date-heading-text">Description:</span>
                    <input type='text' value={note} onChange={(e) => changeNote(e.target.value)}></input>
                </h2>
            </div>
            <div className="time-container">
                <label>From: </label>
                <input className="time-1" type="time" onChange={ e => {
                    setTime1(e.target.value)
                }} value={time1}></input>
                <label className="to-label">To: </label>
                <input className="time-2" type="time" onChange={ e => {
                    setTime2(e.target.value)
                }} value={time2}></input>
            </div>
            <div>Hours Worked: {hours}</div>
        </div>
    )
}

export default Day
