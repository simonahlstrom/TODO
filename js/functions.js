
//Run editTask with "new" to create new task, or with index from allTasks(array) to edit existing task.
$('#add').click(function() {editTask(3)})

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
      appendTo: "#content",
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
          }).datepicker({dateFormat: "yy-mm-dd"})
        }
      }
    })

    $('<div>', {
      "id": "dateContainer",
      appendTo: "#radioDeadlineContainer"
    })

    //Subtask list
    $('<div>', {"id": "subtaskTitleContainer", appendTo: "#content"}).css("display", "flex")
    $('<div>', {html: "Subtasks", appendTo: "#subtaskTitleContainer"}).css("font-size", "20px")
    $('<div>', {
      "id": "subtaskContainer",
      appendTo: "#content"
    }).css({
      minHeight: "100px",
      border: "2px solid lightgray"
    })
    $('<input>', {
      "id": "addSubtask",
      type: "button",
      value: "+",
      appendTo: "#subtaskTitleContainer"
    }).click(function() {
      //adds substask to subtaskContainer
      prepareSubtasks($('#subtaskNameInput').val(), "")
      $('<div>', {
        html: "Name: " + subtaskArray[subtaskArray.length-1][1] + " Deadline: " + subtaskArray[subtaskArray.length-1][2],
        appendTo: "#subtaskContainer"
      })
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
          saveTask(code, "new")
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
    cl(obj)
    let code = obj.shareCode
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


    $('<div>', {
      "id": "dateContainer",
      appendTo: "#radioDeadlineContainer"
    })

    //Subtask list
    $('<div>', {"id": "subtaskTitleContainer", appendTo: "#content"}).css("display", "flex")
    $('<div>', {html: "Subtasks", appendTo: "#subtaskTitleContainer"}).css("font-size", "20px")
    $('<div>', {
      "id": "subtaskContainer",
      appendTo: "#content"
    }).css({
      minHeight: "100px",
      border: "2px solid lightgray"
    })
    $('<input>', {
      "id": "addSubtask",
      type: "button",
      value: "+",
      appendTo: "#subtaskTitleContainer"
    }).click(function() {
      //adds substask to subtaskContainer
      prepareSubtasks($('#subtaskNameInput').val(), "")
      $('<div>', {
        html: "Name: " + subtaskArray[subtaskArray.length-1][1] + " Deadline: " + subtaskArray[subtaskArray.length-1][2],
        appendTo: "#subtaskContainer"
      })
    })

    //creates options for the label select element
    allLabels.forEach(function(item) {
      //sets the default label
      if (obj.label.labelId==item.labelId) {
        $('<option>', {
          value: item.labelId,
          html: item.labelName,
          selected: "selected",
          appendTo: "#labelSelect"
        })
      } else {
        $('<option>', {
          value: item.labelId,
          html: item.labelName,
          appendTo: "#labelSelect"
        })
      }
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
          console.log("Task updated")
          saveTask(code, "alter")
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
    subtaskArray[subtaskArray.length-1].push()
  } else {
    subtaskArray[subtaskArray.length-1].push($('#date').val())
  }
}

function saveTask(code, action) {
  code = code

  
  if ($('#taskNameInput').val()) {
    $.get('php/uploadTask.php', {
      taskName: $('#taskNameInput').val(),
      labelId: $('#labelSelect').val(),
      code: code,
      userId: user.userId,
      action: action
      })
  
      .done(function(data){
        cl(data)
        saveSubtask(code)
      })
      .fail(error)
  } else {
    popup("Please fill out all the fields").click(hidePopup)
  }
}

function saveSubtask(code, action) {

  subtaskArray.forEach(function(item) {
    
    if ($('#subtaskNameInput')) {
      $.get('php/uploadSubtask.php', {
        taskName: $('#taskNameInput').val(),
        subName: item[1],
        deadline: item[2],
        userId: user.userId,
        code: code
      })
      .done(function(data){
        cl(data)
        getTaskAndLabelData(user.userId)
      })
      .fail(error)
    } else {
      popup("Please fill out all the fields").click(hidePopup)
    }
    
  })
  
}

function createTaskElement(obj) {
  //creates the task element container
  let element = $("<div>", {
    "id": "task" + obj.taskId,
    appendTo: "#content"
  })

  //task head
  let head = $("<div>", {
    class: "taskHead",
    appendTo: element
  })

  $("<div>", {
    class: "taskLabel",
    appendTo: head
  }).css({
    backgroundImage: "url('../icons/" + obj.label.icon + "')",
    backgroundColor: obj.label.color
  })

  $("<div>", {
    class: "taskName",
    appendTo: head,
    html: obj.taskName
  })
  
  //task info
  let info = $("<div>", {
    class: "taskInfo",
    appendTo: element
  }).css({display: "none"})

  let subtaskEl = $("<div>", {
    class: "subtasks",
    appendTo: info
  })

  //creates subtasks
  for (let i=0; i<obj.subtasks.length; i++) {
    let subAux = $("<div>", {
      "id": "subtask" + obj.subtasks[i].subId,
      appendTo: subtaskEl,
    })

    $("<div>", {
      class: "subName",
      appendTo: subAux,
      html: obj.subtasks[i].subName
    })

    $("<div>", {
      class: "subDL",
      appendTo: subAux,
      html: (obj.subtasks[i].deadline) ? obj.subtasks[i].deadline : ""
    })

    $("<input>", {
      type: "checkbox",
      value: "done",
      checked: (obj.subtasks[i].completed) ? true : false,
      appendTo: subAux,
      change: function(){
        if(!obj.subtasks[i].completed) {
          //make object and db done
          console.log("subtask done")
        } else {
          //make undone
          console.log("subtask undone")
        }
      }
    })

    $("<div>", {
      class: "subClaim",
      appendTo: subAux,
      html: (obj.subtasks[i].claimedName) ? obj.subtasks[i].claimedName : "Claim"
    }).click(function(){
      if(!obj.subtasks[i].claimedName) {
        //want to calim it
        //claim it with username
        console.log("claim it?")
      } else {
        //check if you want to unclaim it
        console.log("don't want it anymore?")
      }
    })


    //post changes and change in object

  }

  //label info
  $("<div>", {
    class: "labelInfo",
    appendTo: info,
    html: "label: " + obj.label.labelName
  })

  //task actions
  let actions = $("<div>", {
    class: "taskActions",
    appendTo: info,
  })

  $("<input>", {
    type: "button",
    value: "done",
    appendTo: actions,
  }).click(function(){
    //task is done
    console.log("task is done")
  })

  $("<input>", {
    type: "button",
    value: "edit",
    appendTo: actions,
  }).click(function(){
    //run task function
    console.log("edit task")
  })



  //click event
  element.click(function(e){
    e.stopPropagation()
    console.log(info.css("display"))
    if(info.css("display") == "none") {
      $(".taskInfo").css({display: "none"})
      info.css({display: "block"})
    } else {
      info.css({display: "none"})
    }
  })



  // return element
}