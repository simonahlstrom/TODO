
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
function editTask (a) {
  $('#content').html("")

  if (a == "new") {
    let code = makeid(4)
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


    let active = true
    $('<div>', {html: "Share code: " + code, appendTo: "#content", "id": "shareCode"})
    $('<input>', {type: "checkbox", appendTo: "#shareCode", change: function() {    
      if (active) {
        active = false
        $('<div>', {"id": "shareContainer", appendTo: "#shareCode"}).css({
          minHeight: "100px",
          border: "2px solid lightgray"
        })

      } else {
        $('#shareContainer').remove()
        active = true}
    }})

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
      type: "button",
      value: "+",
      appendTo: "#subtaskInputs"
    }).click(function() {
      //adds substask to subtaskContainer
      prepareSubtasks($('#subtaskNameInput').val())
      $('<div>', {
        html: "Name: " + subtaskArray[subtaskArray.length-1][1] + " Filter/Deadline: " + subtaskArray[subtaskArray.length-1][2],
        appendTo: "#subtaskContainer"
      })
    })

    $('<div>', {"id": "radioAllContainer", appendTo: "#content"})
    $('<label>', {for: "radioAll", html: "All", appendTo: "#radioAllContainer"})
    $('<input>', {
      "id": "radioAll",
      name: "radio",
      type: "radio",
      checked: true,
      appendTo: "#radioAllContainer",
      change: function(checked) {
        $('#date').remove()
        $('label[for="date"]').remove()
      }
    })

    $('<div>', {"id": "radioDeadlineContainer", appendTo: "#content"})
    $('<label>', {for: "radioDeadline", html: "Deadline", appendTo: "#radioDeadlineContainer"})
    $('<input>', {
      "id": "radioDeadline",
      name: "radio",
      type: "radio",
      checked: false,
      appendTo: "#radioDeadlineContainer",
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

    $('<div>', {"id": "radioAlwaysContainer", appendTo: "#content"})
    $('<label>', {for: "radioAlways", html: "Always", appendTo: "#radioAlwaysContainer"})
    $('<input>', {
      "id": "radioAlways",
      name: "radio",
      type: "radio",
      checked: false,
      appendTo: "#radioAlwaysContainer",
      change: function(checked) {
        $('#date').remove()
        $('label[for="date"]').remove()
      }
    })

    $('<div>', {
      "id": "dateContainer",
      appendTo: "#radioDeadlineContainer"
    })

    //Subtask list
    $('<div>', {html: "Subtasks", appendTo: "#content"}).css("font-size", "20px")
    $('<div>', {
      "id": "subtaskContainer",
      appendTo: "#content"
    }).css({
      minHeight: "100px",
      border: "2px solid lightgray"
    })


    allLabels.forEach(function(item) {
      $('<option>', {
        value: item.labelId,
        html: item.labelName,
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
          saveTask(code)
        } else if (item == "Delete") {
          console.log("Task deleted")
          //Popup, remove from DB
        } else {
          //return to Home
        }
      })
    })
  } else {

    let obj = allTasks[a]
    //Name of task input
    $('<label>', {for: "taskNameInput", html: "Name of task ", appendTo: "#content"})
    $('<input>', {
      "id": "taskNameInput",
      type: "text",
      value: obj.taskName,
      appendTo: "#content"
    })

    //Label dropdown
    $('<label>', {for: "labelSelect", html: "Select label ", appendTo: "#content"})
    $('<select>', {
      "id": "labelSelect",
      value: "label",
      appendTo: "#content"
    })


    let active = true
    $('<div>', {html: "Share code: " + obj.shareCode, appendTo: "#content", "id": "shareCode"})
    $('<input>', {type: "checkbox", appendTo: "#shareCode", change: function() {    
      if (active) {
        active = false
        $('<div>', {"id": "shareContainer", appendTo: "#shareCode"}).css({
          minHeight: "100px",
          border: "2px solid lightgray"
        })

        /* if (obj.creator){
          $("<p>", {
            html: "Share code: " + obj.shareCode,
            appendTo: "#shareContainer"
          })
        }
      
          $("<div>", {
            appendTo: "#shareContainer"
          })
      
          obj.taskMembers.forEach(function(item) {
            let owner
      
            $("<div>", {
              class: "taskMember",
              html: "<div>" + item.username + "</div>",
              appendTo: "#shareContainer"
            }).css({
              height: "20px"
            })
      
            if(user.userId == item.userId) {
              owner = $("<div>", {
                html: "(o)",
                appendTo: ".taskMember:last-child"
      
              }).css({
                height: "20px",
                width: "20px",
                border: "1px solid var(--accentColor)",
                borderRadius: "50%",
                padding: "3px",
              })
            }
          }) */

      } else {
        $('#shareContainer').remove()
        active = true}
    }})

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
      type: "button",
      value: "+",
      appendTo: "#subtaskInputs"
    }).click(function() {
      //adds substask to subtaskContainer
      prepareSubtasks($('#subtaskNameInput').val(), "")
      $('<div>', {
        html: "Name: " + subtaskArray[subtaskArray.length-1][1] + " Filter/Deadline: " + subtaskArray[subtaskArray.length-1][2],
        appendTo: "#subtaskContainer"
      })
    })

    $('<div>', {"id": "radioAllContainer", appendTo: "#content"})
    $('<label>', {for: "radioAll", html: "All", appendTo: "#radioAllContainer"})
    $('<input>', {
      "id": "radioAll",
      name: "radio",
      type: "radio",
      checked: true,
      appendTo: "#radioAllContainer",
      change: function(checked) {
        $('#date').remove()
        $('label[for="date"]').remove()
      }
    })

    $('<div>', {"id": "radioDeadlineContainer", appendTo: "#content"})
    $('<label>', {for: "radioDeadline", html: "Deadline", appendTo: "#radioDeadlineContainer"})
    $('<input>', {
      "id": "radioDeadline",
      name: "radio",
      type: "radio",
      checked: false,
      appendTo: "#radioDeadlineContainer",
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

    $('<div>', {"id": "radioAlwaysContainer", appendTo: "#content"})
    $('<label>', {for: "radioAlways", html: "Always", appendTo: "#radioAlwaysContainer"})
    $('<input>', {
      "id": "radioAlways",
      name: "radio",
      type: "radio",
      checked: false,
      appendTo: "#radioAlwaysContainer",
      change: function(checked) {
        $('#date').remove()
        $('label[for="date"]').remove()
      }
    })

    $('<div>', {
      "id": "dateContainer",
      appendTo: "#radioDeadlineContainer"
    })

    //Subtask list
    $('<div>', {html: "Subtasks", appendTo: "#content"}).css("font-size", "20px")
    $('<div>', {
      "id": "subtaskContainer",
      appendTo: "#content"
    }).css({
      minHeight: "100px",
      border: "2px solid lightgray"
    })


      allLabels.forEach(function(item) {
      $('<option>', {
        value: item.labelName,
        html: item.labelName,
        appendTo: "#labelSelect"
      })
    })

    allTasks[a].subtasks.forEach(function(item) {
      prepareSubtasks(item.subName, item.subId)
      $('<div>', {
        html: "Name: " + subtaskArray[subtaskArray.length-1][1] + " Filter/Deadline: " + item.deadline,
        appendTo: "#subtaskContainer"
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
  }
}

function prepareSubtasks(name, subId) {
  subtaskArray.push([])
  subtaskArray[subtaskArray.length-1].push(subId)
  subtaskArray[subtaskArray.length-1].push(name)

  if ($('#radioAll:checked').val()) {
    subtaskArray[subtaskArray.length-1].push(document.querySelector('label[for="radioAll"]').innerHTML)
  } else if ($('#radioAlways:checked').val()) {
    subtaskArray[subtaskArray.length-1].push(document.querySelector('label[for="radioAlways"]').innerHTML)
  } else {
    subtaskArray[subtaskArray.length-1].push($('#date').val())
  }
}

function saveTask(code) {
  code = code

  $.get('php/uploadTask.php', {
    taskName: $('#taskNameInput').val(),
     labelId: $('#labelSelect').val(),
     code: code,
     userId: user.userId
    })

    .done(function(data){
      cl(data)
    })
    .fail(error)
}

function saveSubtask() {

  subtaskArray.forEach(function(item) {
    $.get('php/uploadSubtask.php', {
      subtaskName: item[0],
      deadline: $('#dead').val(),
      code: code,
      userId: user.userId
    })
  
    .done(function(data){
      cl(data)
    })
    .fail(error)
  })
  
}