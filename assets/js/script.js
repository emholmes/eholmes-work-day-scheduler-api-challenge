let day = moment().format("dddd, MMMM D");
$("#currentDay").append(day);

let hourlyToDos = [];
//console.log(hourlyToDos);

let workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

let auditTimeBlocks = function(el) {
    let hour = $(el).find("p").text();
    let description = $(el).find("textarea");

    for (let i = 0; i < workHours.length; i++) {
        if (moment(hour, "h" + "a").format("H") === moment().format("H")) {
            description.addClass("present");
        } 
        //change to use isAfter
        if (moment(hour, "h" + "a").format("H") > parseInt(moment().format("H"))) {
            description.addClass("future");
        } 
        if (moment(hour, "h" + "a").format("H") < parseInt(moment().format("H"))) {
            description.addClass("past");
        }
    }
}

$(".row").each(function(index, el) {
    auditTimeBlocks(el);
});

let createToDos = function(arr, toDo) {
    
    let rowDestination = $(".hour").filter(function() {
        return $(this).text() === toDo.hour;
    });
    let rowDescription = rowDestination.next(".description");

    rowDescription.val(toDo.task);
    
    hourlyToDos.push({
        hour: toDo.hour,
        task: toDo.task
    });


}


// save button click handler
$(".row").on("click", ".saveBtn", function() {
    let mainDiv = $(this).closest("div").attr("id");

    let toDoHour = $("#" + mainDiv).children()[0].innerHTML;
    let toDoTask = $("#" + mainDiv + " textarea").val();
    

    // if task for that day already exists, update task
    let newArray = [];
    $.each(hourlyToDos, function(index) {
        let hours = hourlyToDos[index].hour;
        
        newArray.push(hours);
    })
    console.log(newArray);
     

    let elIndex = newArray.indexOf(toDoHour);
    console.log(elIndex);

    if (elIndex !== -1) {
        hourlyToDos[elIndex].task = toDoTask;
    } else {
        hourlyToDos.push({
            hour: toDoHour, 
            task: toDoTask
        });
    
    }
    saveToDos();
    
});


let saveToDos = function() {
    localStorage.setItem("hourlyToDos", JSON.stringify(hourlyToDos));
};

let loadToDos = function() {
    let savedToDos = JSON.parse(localStorage.getItem("hourlyToDos"));

    if (!savedToDos) {
        return;
    } 
    $.each(savedToDos, function(arr, toDo) {
        createToDos(arr, toDo);
        //console.log(toDo.hour);
    })
}

loadToDos();


setInterval(function() {
    $(".row").each(function(index, el) {
        // let hourToAudit = $(this).children(".hour").text();
        // let desc = $(this).children(".description");
        auditTimeBlocks(el);
        //console.log(el);
    }) 
}, 1000);

