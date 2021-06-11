let day = moment().format("dddd, MMMM D");
$("#currentDay").append(day);

let hourlyToDos = {};
console.log(hourlyToDos);

let workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];


let auditTimeBlocks = function(hourInt, description) {
    var divHour = hourInt;

    for (let i = 0; i < workHours.length; i++) {
        if (moment(divHour, "h" + "a").format("H") === moment().format("H")) {
            description.addClass("present");
        } 
        //change to use isAfter
        if (moment(divHour, "h" + "a").format("H") > parseInt(moment().format("H"))) {
            description.addClass("future");
        } 
        if (moment(divHour, "h" + "a").format("H") < parseInt(moment().format("H"))) {
            description.addClass("past");
        }
    }
}




// function to collect info typed in 
// save button handler
// event delegation may help with this
$(".row .saveBtn").click(function() {
    let toDoTime = $(this).parent(".row").find(".hour").text();
    //console.log(toDoTime);
    let toDoDescription = $(this).parent(".row").find("textarea").val();
    console.log(toDoDescription);
    if (toDoDescription) {
        hourlyToDos.push({
            time: toDoTime,
            description: toDoDescription
        });
        console.log(hourlyToDos);
        saveToDos();
    }
});



let saveToDos = function() {
    localStorage.setItem("hourlyToDos", JSON.stringify(hourlyToDos));
};

let loadToDos = function() {
    let savedToDos = localStorage.getItem("hourlyToDos");
    if (!savedToDos) {
        return false;
    }
    savedToDos = JSON.parse(savedToDos);

    for (let i = 0; i < savedToDos.length; i++) {
        let rowDestination = $(".hour:contains("+savedToDos[i].time+")");
        let rowDescription = rowDestination.next(".description");
        rowDescription.val(savedToDos[i].description);
        console.log(rowDescription);
        // use time to locate where the description should go
        
    }
}

loadToDos();


setInterval(function() {
    $(".row").each(function(index) {
        let hourToAudit = $(this).children(".hour").text();
        let desc = $(this).children(".description");
        auditTimeBlocks(hourToAudit, desc);
    }) 
}, 1000);

