function User(data) {
  this.userId = data.userId
  this.username = data.username
  this.email = data.email
  this.occupation = data.occupation
  this.theme = data.theme
}

function Label(data) {
  this.labelName = data.labelName
  this.color = data.color
  this.icon = data.icon
  this.activated = data.activated
  this.labelId = data.labelId
  this.element = $('<div>', {
      "class": "label",
  }).css({
      backgroundImage: "url(" + this.icon + ")",
      backgroundColor: this.color
  })
}

function Task(data, objLabel) {
  this.taskId = data.taskId
  this.taskName = data.taskName
  this.shareCode = data.code
  this.label = objLabel
  this.creator = data.creator

  this.done = false
  
  // create subtasks
  this.subtasks = function() {

  }
  
  this.subsDL = function() {
    //code functionality to get deadline from this.subtasks
  }
  
  this.createTask = function() {
    // create task w/ icon from labelobject
    let task = $('div')
    let icon = this.label.element
    let name = this.taskName
    task.append(icon, name)

    //create subtasks to present
    for (let subtask of this.subtasks) {
      let subtaskContainer = $('<div>')
      let subName = $('<div>')
      subName.html(
        // get name from subtaskobject later 
      )
      
      if (!this.creator) {
        let claimBox = $('div', {
          html: "CLAIM"
        }).click(function() {
          // code the function to claim subtask later
        })
      }
    }
  }
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