let currentDay = moment().format("dddd, MMMM D");
$("#currentDay").append(currentDay);

let hourlyTasks = [];

let auditTimeBlocks = function(el) {
    let hourEl = $(el).find("p").text();
    let descriptionEl = $(el).find("textarea");

    let scheduleHour = moment(hourEl, "h" + "a").format("H");
    let currentHour = parseInt(moment().format("H"));
    $(".row").each(function() {
        descriptionEl.removeClass("future past present");
        if (scheduleHour === moment().format("H")) {
            descriptionEl.addClass("present");
        } 
        if (scheduleHour > currentHour) {
            descriptionEl.addClass("future");
        } 
        if (scheduleHour < currentHour) {
            descriptionEl.addClass("past");
        }
    });
}
// run audit of time blocks immediately
$(".row").each(function(index, el) {
    auditTimeBlocks(el);
});

// used to create any tasks saved in localStorage
let createTasks = function(arr, task) {
    let targetRow = $(".hour").filter(function() {
        return $(this).text() === task.hour;
    });
    let rowTextarea = targetRow.next(".description");

    rowTextarea.val(task.details);
    
    hourlyTasks.push({
        hour: task.hour,
        details: task.details
    });
}

// save button click handler
$(".row").on("click", ".saveBtn", function() {
    let rowId = $(this).closest("li").attr("id");
    let taskHour = $("#" + rowId).children()[0].innerHTML;
    let taskDetails = $("#" + rowId + " textarea").val();
    
    // if task for that day already exists, update task
    let tempArray = [];
    $.each(hourlyTasks, function(index) {
        let hours = hourlyTasks[index].hour;
        tempArray.push(hours);
    })

    let elIndex = tempArray.indexOf(taskHour);
    if (elIndex !== -1) {
        hourlyTasks[elIndex].details = taskDetails;
    } else {
        hourlyTasks.push({
            hour: taskHour, 
            details: taskDetails
        });
    }
    saveAllTasks();   
});

let saveAllTasks = function() {
    localStorage.setItem("hourlyTasks", JSON.stringify(hourlyTasks));
};

let loadAllTasks = function() {
    let savedTasks = JSON.parse(localStorage.getItem("hourlyTasks"));
    if (!savedTasks) {
        return;
    } 
    $.each(savedTasks, function(arr, task) {
        createTasks(arr, task);
    })
}
// initial load of any saved tasks 
loadAllTasks();

// run auditTimeBlocks to ensure correct color coding
setInterval(function() {
    $(".row").each(function(index, el) {
        auditTimeBlocks(el);
    }) 
}, 1000);

