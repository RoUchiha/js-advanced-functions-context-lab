/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 function createEmployeeRecord(array) {
    const record = {}
    record.firstName = array[0]
    record.familyName = array[1]
    record.title = array[2]
    record.payPerHour = array[3]
    record.timeInEvents = []
    record.timeOutEvents = []

    return record
}


function createEmployeeRecords(nestedArray) {
    let recordsArray = [];
    for (const record of nestedArray) {
        recordsArray.push(createEmployeeRecord(record))
    }
    return recordsArray
}

function createTimeInEvent(date) {
    let datesplit = date.split(' ');
    let dayDate = datesplit[0];
    let timeDate = datesplit[1];
    let dayDateSplit = dayDate.split('-');
    let timeIn = {};
    timeIn.type = "TimeIn"
    timeIn.hour = parseInt(timeDate)
    timeIn.date = dayDate
    this.timeInEvents.push(timeIn);
    return this;
}

function createTimeOutEvent(date) {
    let datesplit = date.split(' ');
    let dayDate = datesplit[0];
    let timeDate = datesplit[1];
    let timeOut = {};
    timeOut.type = "TimeOut"
    timeOut.hour = parseInt(timeDate)
    timeOut.date = dayDate
    this.timeOutEvents.push(timeOut);
    return this;
}


function hoursWorkedOnDate(date) {
    let indates = this.timeInEvents;
    let outdates = this.timeOutEvents;
    let checkinTime;
    let checkoutTime;
    for (const timeIn of indates) {
        if (timeIn.date == date) {
            checkinTime = timeIn
        }
    }
    for (const timeOut of outdates) {
        if (timeOut.date == date) {
            checkoutTime = timeOut
        }
    }
    let hours = (checkoutTime.hour - checkinTime.hour) / 100
    return hours
}


function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date);
    let wages = (hours * (this.payPerHour))
    return wages
}




let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}




function findEmployeeByFirstName(recordsArray, firstName) {
    let match;
    for (const record of recordsArray) {
        if (record.firstName == firstName) {
            match = record
        }
    }
    return match
}


function calculatePayroll(employeeRecords) {
    let totalPayroll = []
    for (const record of employeeRecords) {
        totalPayroll.push(allWagesFor.call(record))
    }
    let wages = totalPayroll.reduce(function(prev, curr) {
        return prev + curr
    }, 0)
    return wages
}
