const currentDay = moment().format("dddd, MMMM D");
$("#currentDay").append(currentDay);

let hourlyTasks = [];

let colorCodeDescriptions = function(descriptionEl) {
    const hour = descriptionEl.data("hour");
    let currentHour = parseInt(moment().format("H"));

    descriptionEl.removeClass("future past present");
    if (hour === currentHour) {
        descriptionEl.addClass("present");
    } 
    if (hour > currentHour) {
        descriptionEl.addClass("future");
    } 
    if (hour < currentHour) {
        descriptionEl.addClass("past");
    }
}
// run audit of time blocks immediately
$(".description").each(function(index) {
    colorCodeDescriptions($(this));
});

// used to create any tasks saved in localStorage
let createTasks = function(index, task) {
    let rowDescription = $("#row" + task.hour).find(".description");
    rowDescription.val(task.description);
    
    hourlyTasks.push({
        hour: task.hour,
        description: task.description
    });
}

// save button click handler
$(".row").on("click", ".saveBtn", function() {
    let descriptionEl = $(this).parent().find(".description");
    let taskDescription = descriptionEl.val();
    let taskHour = descriptionEl.data("hour");
    
    // if task for that day already exists, update task
    let hoursWithTasks = [];
    let found = false;
    $.each(hourlyTasks, function(index) {
        let hour = hourlyTasks[index].hour;
        hoursWithTasks.push(hour);

        if (hour === taskHour) {
            hourlyTasks[index].description = taskDescription;
            found = true;
        } 
    });

    if (!found) {
        hourlyTasks.push({
            hour: taskHour, 
            description: taskDescription
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
    $.each(savedTasks, function(index, task) {
        createTasks(index, task);
    })
}
// initial load of any saved tasks 
loadAllTasks();

// run colorCodeDescriptions to ensure correct color coding
setInterval(function() {
    $(".description").each(function(index) {
        colorCodeDescriptions($(this));
    }) 
}, 1000);

