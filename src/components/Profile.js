import React, { useState, useEffect } from 'react'
import { notifyError, notifySaved } from '../utils/notify'

function Profile() {

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [invoiceName, setInvoiceName] = useState("")
    const [invoiceAddress, setInvoiceAddress] = useState("")
    const [invoicePhonenumber, setInvoicePhonenumber] = useState("")
    const [invoiceID, setInvoiceID] = useState(1)
    const [invoiceIssueDate, setInvoiceIssueDate] = useState("")
    const [invoiceDueDate, setInvoiceDueDate] = useState("")
    const [hourlyRate, setHourlyRate] = useState(1)
    const [taxRate, setTaxRate] = useState(0)
    const [toPayPeriod, setToPayPeriod] = useState("");
    const [fromPayPeriod, setFromPayPeriod] = useState("");

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('profile'))
        if(item){
            setName(item.name)
            setAddress(item.address)
            setPhonenumber(item.phonenumber)
            setInvoiceName(item.invoicename)
            setInvoiceAddress(item.invoiceaddress)
            setInvoicePhonenumber(item.invoicephonenumber)
            setInvoiceID(item.invoiceid)
            setInvoiceIssueDate(item.invoiceissuedate)
            setInvoiceDueDate(item.invoiceduedate)
            setHourlyRate(item.hourlyRate)
            setTaxRate(item.taxRate)
            setToPayPeriod(item.toPayPeriod)
            setFromPayPeriod(item.fromPayPeriod)
        }
    }, [])

    function changeType(type, value){
        switch(type) {
            case "name":
                setName(value)
                break;
            case "address":
                setAddress(value)
                break;
            case "phonenumber":
                setPhonenumber(value)
                break;
            case "invoicename":
                setInvoiceName(value)
                break;
            case "invoiceaddress":
                setInvoiceAddress(value)
                break;
            case "invoicephonenumber":
                setInvoicePhonenumber(value)
                break;
            case "invoiceid":
                setInvoiceID(value)
                break;
            case "invoiceissudedate":
                setInvoiceIssueDate(value)
                break;
            case "invoiceduedate":
                setInvoiceDueDate(value)
                break;
            case "hourlyRate":
                setHourlyRate(value)
                break;
            case "taxRate":
                setTaxRate(value)
                break;
            case "toPayPeriod":
                setToPayPeriod(value)
                break;
            case "fromPayPeriod":
                setFromPayPeriod(value)
                break;
            default:
                break;
        }
    }

    function save(name, address, phonenumber, invoiceName, invoicePhonenumber, invoiceID, invoiceIssueDate, invoiceDueDate, hourlyRate, taxRate, toPayPeriod, fromPayPeriod){
        if(!name || !address || !phonenumber || !invoiceName || !invoicePhonenumber || !invoiceID || !invoiceIssueDate || !invoiceDueDate || !hourlyRate, !taxRate, !toPayPeriod, !fromPayPeriod){
            if(!name) handleError("name");
            if(!address) handleError("address");
            if(!phonenumber) handleError("phone number");
            if(!invoiceName || !invoicePhonenumber || !invoiceID || !invoiceIssueDate || !invoiceDueDate) handleError("invoice details");
            if(!toPayPeriod || !fromPayPeriod) handleError("pay period");
            if(!hourlyRate || !taxRate) handleError("pay rate");

            throw new Error("Must fill out all fields!")
        } else {
            localStorage.setItem('profile', JSON.stringify({name:name, address:address, phonenumber:phonenumber, invoicename:invoiceName, invoiceaddress:invoiceAddress, invoicephonenumber:invoicePhonenumber, invoiceid:invoiceID, invoiceissuedate:invoiceIssueDate, invoiceduedate:invoiceDueDate, hourlyRate:hourlyRate, taxRate: taxRate, toPayPeriod: toPayPeriod, fromPayPeriod: fromPayPeriod}))
            notifySaved("saved!")
        }
    }

    function clickHandle(){
        try{
            save(name, address, phonenumber, invoiceName, invoicePhonenumber, invoiceID, invoiceIssueDate, invoiceDueDate, hourlyRate, taxRate, toPayPeriod, fromPayPeriod)
        } catch(e){
            notifyError(e.message)
        }
    }

    function resetHandle(){
        try {
            localStorage.removeItem('profile');
        } catch (e) {
            notifyError(e.message)
        }
    }

    function handleError(error){
        throw new Error(`Must fill out ${error}.`)
    }

    return (
        <div className='container'>
            <div className="profile-container">
                <div className="profile-info">
                    <h1>Profile</h1>
                    <p>Used for generating invoices.</p>
                    <p>Please remember to save or all progress will be lost.</p>

                    <h2>From:</h2>
                    <div className="profile-group">
                        <label>Name:</label>
                        <input placeholder='Name' onChange={(e) => changeType("name", e.target.value)} value={name}></input>
                    </div>
                    <div className="profile-group">
                        <label>Address:</label>
                        <textarea rows="5" placeholder='Address' onChange={(e) => changeType("address", e.target.value)} value={address}></textarea>
                    </div>
                    <div className="profile-group">
                        <label>Phone Number:</label>
                        <input type="tel" placeholder='Phone Number' onChange={(e) => changeType("phonenumber", e.target.value)} value={phonenumber}></input>
                    </div>
                    <h2>To:</h2>
                    <div className="profile-group">
                        <label>Invoice For:</label>
                        <input placeholder='Name' onChange={(e) => changeType("invoicename", e.target.value)} value={invoiceName}></input>
                    </div>
                    <div className="profile-group">
                        <label>Invoice Address:</label>
                        <textarea rows="5" placeholder='Address' onChange={(e) => changeType("invoiceaddress", e.target.value)} value={invoiceAddress}></textarea>
                    </div>
                    <div className="profile-group">
                        <label>Invoice Phone Number:</label>
                        <input type="tel" placeholder='Phone Number' onChange={(e) => changeType("invoicephonenumber", e.target.value)} value={invoicePhonenumber}></input>
                    </div>
                    <h2>Additional Info:</h2>
                    <div className="profile-group">
                        <label>Invoice ID:</label>
                        <input type="number" placeholder='Invoice ID' onChange={(e) => changeType("invoiceid", e.target.value)} value={invoiceID}></input>
                    </div>
                    <div className="profile-group">
                        <label>Issue Date:</label>
                        <input type="date" onChange={(e) => changeType("invoiceissudedate", e.target.value)} value={invoiceIssueDate}></input>
                    </div>
                    <div className="profile-group">
                        <label>Due Date:</label>
                        <input type="date" onChange={(e) => changeType("invoiceduedate", e.target.value)} value={invoiceDueDate}></input>
                    </div>
                    <h2>Pay Period:</h2>
                    <div className="profile-group">
                        <label>From:</label>
                        <input type="date" onChange={(e) => changeType("fromPayPeriod", e.target.value)} value={fromPayPeriod}></input>
                    </div>
                    <div className="profile-group">
                        <label>To:</label>
                        <input type="date" onChange={(e) => changeType("toPayPeriod", e.target.value)} value={toPayPeriod}></input>
                    </div>
                    <h2>Pay Rate:</h2>
                    <div className="profile-group">
                        <label>Hourly Rate:</label>
                        <input type="number" placeholder='Hourly rate' min="0.00" max="10000.00" step="0.01" onChange={(e) => changeType("hourlyRate", e.target.value)} value={hourlyRate}></input>
                    </div>
                    <div className="profile-group">
                        <label>Tax Rate:</label>
                        <input type="number" placeholder='Tax rate' min="0.00" max="10000.00" step="0.01" onChange={(e) => changeType("taxRate", e.target.value)} value={taxRate}></input>
                    </div>
                    <div className="button-container">
                        <button onClick={resetHandle}>Reset</button>
                        <button onClick={clickHandle}>Save</button>
                    </div>
            </div>
        </div>
    </div>
    )
}

export default Profile
