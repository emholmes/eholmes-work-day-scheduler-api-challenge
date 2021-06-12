let currentDay = moment().format("dddd, MMMM D");
$("#currentDay").append(currentDay);

let hourlyTasks = [];

let auditTimeBlocks = function(el) {
    let hourEl = $(el).find("p").text();
    let descriptionEl = $(el).find("textarea");

    let hourBlockHour = moment(hourEl, "h" + "a").format("H");
    let currentHour = parseInt(moment().format("H"));
    $(".row").each(function() {
        descriptionEl.removeClass("future past present");
        if (hourBlockHour === moment().format("H")) {
            descriptionEl.addClass("present");
        } 
        if (hourBlockHour > currentHour) {
            descriptionEl.addClass("future");
        } 
        if (hourBlockHour < currentHour) {
            descriptionEl.addClass("past");
        }
    });
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
    
    hourlyTasks.push({
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
    let tempArray = [];
    $.each(hourlyTasks, function(index) {
        let hours = hourlyTasks[index].hour;
        tempArray.push(hours);
    })

    let elIndex = tempArray.indexOf(toDoHour);
    if (elIndex !== -1) {
        hourlyTasks[elIndex].task = toDoTask;
    } else {
        hourlyTasks.push({
            hour: toDoHour, 
            task: toDoTask
        });
    }
    saveToDos();   
});

let saveToDos = function() {
    localStorage.setItem("hourlyTasks", JSON.stringify(hourlyTasks));
};

let loadToDos = function() {
    let savedToDos = JSON.parse(localStorage.getItem("hourlyTasks"));
    if (!savedToDos) {
        return;
    } 
    $.each(savedToDos, function(arr, toDo) {
        createToDos(arr, toDo);
    })
}
loadToDos();


setInterval(function() {
    $(".row").each(function(index, el) {
        auditTimeBlocks(el);
    }) 
}, 1000);

