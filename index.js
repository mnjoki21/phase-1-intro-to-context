
const createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(employeeDataInRow) {
    return employeeDataInRow.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, day){
    let [date, hour] = day.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

  function createTimeOutEvent(employee, day){
    let [date, hour] = day.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function hoursWorkedOnDate(employee, dateFind){
   
    
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === dateFind
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === dateFind
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, dateFind){
    let rawWage = hoursWorkedOnDate(employee, dateFind)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

function allWagesFor(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

function findEmployeeByFirstName (srcArray, firstName) {
   
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}