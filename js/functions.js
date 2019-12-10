function gatherData(userId) {
    //get info from
}


//Runs editTask with action to create new task
$('#add').click(function() {editTask("new")})

function cl(x) {
  console.log(x)
}

//function to edit or create a new task
function editTask (obj, action) {

  //Name of task input
$('<label>', {for: "taskNameInput", html: "Name of task ", appendTo: "#content"})
$('<input>', {
  "id": "taskNameInput",
  type: "text",
  appendTo: "#content"
})

//Add subtask button, input, click function
$('<div>', {"id": "subtaskInputs", appendTo: "#content"})
$('<label>', {for: "addSubtask", html: "Add subtask ", appendTo: "#subtaskInputs"})
$('<input>', {
  "id": "subtaskNameInput",
  type: "text",
  appendTo: "#subtaskInputs"
})
$('<input>', {
  "id": "addSubtask",
  "class": "round",
  type: "button",
  value: "",
  appendTo: "#subtaskInputs"
}).click(function() {
  $('<div>', {html: $('#subtaskNameInput').val(), appendTo: "#subtaskContainer"})
})

//Subtask list
$('<div>', {
  "id": "subtaskContainer",
  appendTo: "#content"
}).css({
  width: "80vw",
  height: "100px",
  backgroundColor: "lightgrey"
})

//Label dropdown
$('<label>', {for: "labelSelect", html: "Select label ", appendTo: "#content"})
$('<select>', {
  "id": "labelSelect",
  value: "label",
  appendTo: "#content"
})
labels.forEach(function(item) {
  $('<option>', {
    value: item,
    html: item,
    appendTo: "#labelSelect"
  })
})


//Edit buttons
$('<div>', {"class": "flex", "id": "buttonContainer", appendTo: "#content"})
editTaskButtons.forEach(function(item) {
  $('<input>', {
    "class": "flex",
    "id": "editTaskButton" + item,
    value: item,
    type: "button",
    appendTo: "#buttonContainer"
  }).click(function() {
    if(item == "Save") {
      console.log("New task saved")
      //Save to DB
    } else if (item == "Delete") {
      console.log("Task deleted")
      //Popup, remove from DB
    } else {
      //return to Home
    }
  })
})


if (action != "new") {
  //prefilled inputs from obj
}
}