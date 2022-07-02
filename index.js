function createEmployeeRecord(testEmployee) {
    return {  
    firstName: testEmployee[0],
    familyName: testEmployee[1],
    title: testEmployee[2],
    payPerHour: testEmployee [3],
    timeInEvents: [],
    timeOutEvents: [],
    } 
}

function createEmployeeRecords(twoRows) {
    return twoRows.map(row => createEmployeeRecord(row))
}



function createTimeInEvent(bpRecord, updatedBpRecord) {
    let [date, hour] = updatedBpRecord.split(' ')
    let Obj ={ 
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date,
    }
   let newEvent = bpRecord.timeInEvents
   newEvent.push(Obj)
    return bpRecord
 }

 function createTimeOutEvent(bpRecord, updatedBpRecord) {
    let [date, hour] = updatedBpRecord.split(' ')
    let Obj ={ 
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date,
    }
   let newEvent = bpRecord.timeOutEvents
   newEvent.push(Obj)
    return bpRecord
 }

 function hoursWorkedOnDate(cRecord, updatedBpRecord) {
    for (let i = 0; i < cRecord.timeInEvents.length; i++) {
        if (updatedBpRecord === cRecord.timeInEvents[i].date && cRecord.timeOutEvents[i].date) {
            let clockIn = cRecord.timeInEvents[i].hour
            let clockOut = cRecord.timeOutEvents[i].hour
        return (clockOut - clockIn)/100
    }
    }
 }
 
function wagesEarnedOnDate(cRecord, updatedBpRecord) {
    let hoursWorked = hoursWorkedOnDate(cRecord, updatedBpRecord)
    let payRate = cRecord.payPerHour
    return hoursWorked * payRate
}

function allWagesFor(cRecord) {
        const {timeInEvents, timeOutEvents} = cRecord
        const totalHoursIn = timeInEvents.reduce((total, shift) => {
            return total + shift.hour
        }, 0)
        const totalHoursOut = timeOutEvents.reduce((total, shift) => {
            return total + shift.hour
        }, 0)

        let totalHours = (totalHoursOut - totalHoursIn)/100
        let totalPay = cRecord.payPerHour * totalHours
        return totalPay
}

function calculatePayroll(record) {
    let newArray = record.map(allWagesFor)
    let totalPayroll = newArray.reduce((total, employee) =>
    {
        return total + employee
    }, 0)
    
    return totalPayroll
}

