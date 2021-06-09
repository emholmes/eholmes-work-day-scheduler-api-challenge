let day = moment().format("dddd, MMMM D");
$("#currentDay").append(day);

let workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];


let auditTimeBlocks = function(hourInt, description) {
    var divHour = hourInt.text();
//debugger;

    for (let i = 0; i < workHours.length; i++) {
        console.log(workHours[i]);
        console.log(workHours[i], parseInt(moment().format("H")));
        if (moment(divHour, "h" + "a").format("H") === moment().format("H")) {
            description.addClass("present");
        } 
        if (moment(divHour, "h" + "a").format("H") > parseInt(moment().format("H"))) {
            console.log("yes");
            description.addClass("future");
        } 
        if (moment(divHour, "h" + "a").format("H") < parseInt(moment().format("H"))) {
            description.addClass("past");
        }
    }
   
    //console.log(divHour);
    //console.log(moment().format("h" + "a"));

}

for (let i = 0; i < workHours.length; i++) {
    let hourRow = $("<div>").addClass("row").attr("id", "row" + i);
    $(".container").append(hourRow);
    let hourDiv = $("<div>").addClass("hour col-1");
    let hourInt = $("<p>").addClass("text-end pt-2").text(moment(workHours[i], "H").format("h" + "a"));
    hourDiv.append(hourInt);
    
    let description = $("<textarea>").addClass("description col-10");
    
    let saveButton = $("<button>").addClass("saveBtn col-1");
    saveButton.append('<i class="far fa-save"></i>');
    $("#row" + i).append(hourDiv).append(description).append(saveButton);

    auditTimeBlocks(hourInt, description);
    
}

// setInterval(function(hour,descripton) {
//     let currentHour = moment().hour();
//     //console.log(currentHour);
//     for (let hour of workHours) {
//         // hour = hour.slice(0, -2);
//         //console.log(hour);
//         auditTimeBlock(hour,descripton);
//     }
// }, 1000);

// console.log(moment().format("hh" + "a"));

// console.log($("#row" + 0 + " div p").innerText);


