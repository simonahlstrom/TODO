
//Runs editTask with action to create new task
$('#add').click(function() {editTask("new")})

function cl(x) {
  console.log(x)
}
//error message for get
function error(jqXHR, textStatus, errorThrown) {
    console.log(textStatus)
    console.log(errorThrown)
  }



//Generate share code func
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
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

  //Label dropdown
  $('<label>', {for: "labelSelect", html: "Select label ", appendTo: "#content"})
  $('<select>', {
    "id": "labelSelect",
    value: "label",
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
    //adds substask to subtaskContainer
    $('<div>', {
      html: "Name: " + $('#subtaskNameInput').val() + " Deadline: " + $('#date').val() + " Share ID " + makeid(4),
      appendTo: "#subtaskContainer"
    })
    prepareSubtasks($('#subtaskNameInput').val(), makeid(4))
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
      $('label[for="date"]').remove()
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

  $('<label>', {for: "radioAlways", html: "Always", appendTo: "#content"})
  $('<input>', {
    "id": "radioAlways",
    name: "radio",
    type: "radio",
    checked: false,
    appendTo: "#content",
    change: function(checked) {
      $('#date').remove()
      $('label[for="date"]').remove()
    }
  })

  $('<div>', {
    "id": "dateContainer",
    appendTo: "#content"
  })

  //Subtask list
  $('<div>', {html: "Subtasks", appendTo: "#content"}).css("font-size", "20px")
  $('<div>', {
    "id": "subtaskContainer",
    appendTo: "#content"
  }).css({
    width: "80vw",
    height: "100px",
    border: "2px solid lightgray"
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

function prepareSubtasks(name, code, subId) {
  subtaskArray.push([])
  subtaskArray[subtaskArray.length-1].push(subId)
  subtaskArray[subtaskArray.length-1].push(name)
  subtaskArray[subtaskArray.length-1].push(code)

  if ($('#radioAll:checked').val()) {
    subtaskArray[subtaskArray.length-1].push(document.querySelector('label[for="radioAll"]').innerHTML)
  } else if ($('#radioAlways:checked').val()) {
    subtaskArray[subtaskArray.length-1].push(document.querySelector('label[for="radioAlways"]').innerHTML)
  } else {
    subtaskArray[subtaskArray.length-1].push($('#date').val())
  }
  cl(subtaskArray)
}
