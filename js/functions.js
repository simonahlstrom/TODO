function gatherData(userId) {
    //get info from
}

//Runs editTask with action to create new task
$('#add').click(function() {editTask("new")})

function cl(x) {
  console.log(x)
}

function error(jqXHR, textStatus, errorThrown) {
    console.log(textStatus)
    console.log(errorThrown)
  }


function getUserData(userId) {
    $.get("../php/getAllData.php", {userId: userId})
    .done((data)=>{
        cl(data)
        data = JSON.parse(data)
        cl(data)

    
    })
    .fail(error)
}

//function to edit or create a new task
function editTask (i, action) {

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

  $('<label>', {for: "radioAll", html: "All", appendTo: "#content"})
  $('<input>', {
    "id": "radioAll",
    name: "radio",
    type: "radio",
    checked: true,
    appendTo: "#content",
    change: function(checked) {
      $('#date').remove()
    }
  })
  $('<label>', {for: "radioDeadline", html: "Deadline", appendTo: "#content"})
  $('<input>', {
    "id": "radioDeadline",
    name: "radio",
    type: "radio",
    checked: false,
    appendTo: "#content",
    change: function(checked) {
      if (checked) {
        $('<label>', {for: "date", html: "Date of deadline ", appendTo: "#dateContainer"})
        $('<input>', {
          "id": "date",
          type: "text",
          appendTo: "#dateContainer"
        }).datepicker()
      }
    }
  })
  $('<label>', {for: "radioDeadline", html: "Always", appendTo: "#content"})
  $('<input>', {
    "id": "radioAlways",
    name: "radio",
    type: "radio",
    checked: false,
    appendTo: "#content",
    change: function(checked) {
      $('#date').remove()
    }
  })


  $('<div>', {
    "id": "dateContainer",
    appendTo: "#content"
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
