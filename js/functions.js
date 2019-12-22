
//Run editTask with "new" to create new task, or with index from allTasks(array) to edit existing task.
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

// create a popup to be removed with external clickevent or timeout if the timeout parameter is passed
function popup(message, timeout) {
  let pop = $('#popup')
  pop.empty()
  for (let item of message) {
    pop.append(item)
  }
  let ghost = $(".ghost").addClass('active').css({
    position: "absolute",
    backgroundColor: "var(--ghostColor)"
  })

  if (timeout) {
    setTimeout(() => {
      $(".ghost").removeClass('active')
    }, 1000)
  }

  $(".ghost").click((e) => {
    e.preventDefault()
    if (!$(e.target).is('#ghost *')) {
      hidePopup()
    }
  })

  $("#popup").click((e) => {
    e.stopPropagation()
  })

  return ghost
}

// NOT WORKING
// function onOutsideClick(elementToClick, elementContent) {
//   cl(elementToClick[0])
//   cl(elementContent[0])

//   // ghost-div or other element to click, triggering hidePopup()
//   $(elementToClick[0]).click((e) => {
//     e.preventDefault()
//     if (!$(e.target).is(elementToClick[0] + ' *')) {
//       hidePopup()
//     }
//   })

//   // stopping event bubbling, preventing mishandling of events
//   $(elementContent[0]).click((e) => {
//     e.stopPropagation()
//   })
// }

function hidePopup() {
  $(".ghost").removeClass("active")
}


//Lös så att alla subtasks inte laddas upp på nytt! dela på funktionen som displayar i subtasklistan och de som laddas upp?
function prepareSubtasks(name, subId, date) {
  if (name == ""){
    popup(["Give the subtask a name before adding it."])
    return 
  }

  subtaskArray.push([])
  subtaskArray[subtaskArray.length-1].push(subId)
  subtaskArray[subtaskArray.length-1].push(name)

  console.log(date)

  if ($('#radioAll:checked').val()) {
    subtaskArray[subtaskArray.length-1].push(date)
  } else {
    subtaskArray[subtaskArray.length-1].push($('#date').val())
  }


  let subIndex = subtaskArray.length-1

  //creates subtasks
  let subAux = $("<div>", {
    "id": "subtask" + subId,
    appendTo: "#subtaskContainer",
  }).css({display: "flex"})

  $("<div>", {
    class: "subName",
    appendTo: subAux,
    html: name
    })

    $("<div>", {
    class: "subDL",
    appendTo: subAux,
    html: (typeof date == "string") ? date : ""
    })

    $("<input>", {
    "class": "button",
    type: "button",
    value: "Edit",
    appendTo: subAux,
    }).click(function() {
      $("#subtaskContainer input[type='button']").css({display: "none"})

      $('#subtaskNameInput').attr({name: subId})
      $('#subtaskNameInput').val(name)

      if (typeof date == "string" && !$('#radioDeadline').prop("checked")) {
        $('#radioDeadline').click()
      } else if (typeof date != "string" && $('#radioDeadline').prop("checked")) {
        $('#radioDeadline').click()
      }

      $('#date').val(date)
      subtaskArray.splice(subIndex, 1)
      subAux.remove()
    })

    $("<input>", {
      "class": "button",
      type: "button",
      value: "Delete",
      appendTo: subAux,
      }).click(function() {
            subtaskArray[subIndex][3] = "delete"
            subAux.remove()
      })

    $('#subtaskNameInput').val("")
    $('#subtaskNameInput').attr("name", "")
    $('#date').val("")


}
//Saves a task. Arguments: code is for the WHERE in the sql query and action tells the php which queries to run. //
function saveTask(code, action, shared) {
  code = code

  if ($('#taskNameInput').val()) {
    $.get('php/uploadTask.php', {
      taskName: $('#taskNameInput').val(),
      labelId: $('#labelSelect').val(),
      code: code,
      userId: user.userId,
      action: action,
      shared: shared
      })
  
      .done(function(data){
        console.log(data)
        saveSubtask(code)
      })
      .fail(error)
  } else {
    popup("Give the task a name before saving.").click(hidePopup)
  }
}

function saveSubtask(code) {
  console.table(subtaskArray)
  subtaskArray.forEach(function(item) {
    let action

  

    if ((item[3] == "delete" && item[0]) || item[3] == undefined) {
      console.log("first check passed -->", item)

      if (item[0] == "" || item[0] == undefined) {
        action = "new"
        console.log("new ", item)
      } else if (item[3] == "delete") {
        action = "delete"
        console.log("delete ", item)
      } else {
        action = "alter"
        console.log("alter ", item)
      }
      
  
  
      $.get('php/uploadSubtask.php', {
        taskName: $('#taskNameInput').val(),
        subName: item[1],
        deadline: item[2],
        userId: user.userId,
        code: code,
        action: action,
        subId: item[0]
      })
      .done(function(data){
        console.log(data)
        getTaskAndLabelData(user.userId)
        subtaskArray = []
      })
      .fail(error)

    } else {
      console.log("didn't pass first-->", item)
    }


    

  })
}
function removeTask(obj) {
  console.log(obj)
  $.get('php/removeTask.php', {taskId: obj.taskId})
  .done((data)=>{
    console.log(data)
    popup(["Task has been removed"], timeout)
    getTaskAndLabelData(user.userId)
  })
  .fail(error)
}
function shareTask(action, taskId, userId) {
    
  $.get("php/shareTask.php", {action: action, userId: userId, taskId: taskId})
  .done((data)=>{
      console.log(data)
  })
  .fail(error)
}

function sharedTaskMembers(obj) {
  obj.taskMembers.forEach(function(item) {
  
    $("<div>", {
      class: "taskMember",
      html: "<div>" + item.username + "</div>",
      appendTo: "#shareContainer"
    }).css({
      height: "20px"
    })
  
    if(parseInt(item.creator)) {
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
  })
}

//creates an task element on homepage
function createTaskElement(taskIndex) {
  let obj = allTasks[taskIndex]
  //creates the task element container
  let element = $("<div>", {
    "id": "task" + obj.taskId,
    class: (obj.completedTask == 1) ? "archived" : "",
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
    if(parseInt(obj.subtasks[i].completed) == archiveTasks || archiveTasksAll){
      let subAux = $("<div>", {
        "id": "subtask" + obj.subtasks[i].subId,
        class: (parseInt(obj.subtasks[i].completed) == 1) ? "archived" : "",
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
        checked: (obj.subtasks[i].completed == 1) ? true : false,
        appendTo: subAux,
        change: function(){
          console.log(this.checked)
          taskDone("subtask", obj.subtasks[i])

        }
      })
  
      
        $("<div>", {
          class: "subClaim",
          appendTo: subAux,
          html: (obj.subtasks[i].claimedName != 0) ? obj.subtasks[i].claimedName : "Claim"
        }).click(function(){
          if (obj.subtasks[i].completed == 0) {
            if(obj.subtasks[i].claimedName == 0) {
              claimSubtask(user.username, obj.subtasks[i], this)
            } else {
              claimSubtask(0, obj.subtasks[i], this)
            }
          }
        })
      
  
  
      //post changes and change in object
    }

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
    class: "button",
    value: (obj.completedTask == 1) ? "Undo" : "Done",
    appendTo: actions,
  }).click(function(){
    taskDone("task", obj)
  })

  if (obj.completedTask == 0) {
    $("<input>", {
      type: "button",
      class: "button",
      value: "edit",
      appendTo: actions,
    }).click(function(){
      console.log(taskIndex)
      editTask(taskIndex)
    })
  }



  //click event
  element.click(function(e){
    e.stopPropagation()

    if(info.css("display") == "none" || e.currentTarget.id == element.attr("id")) {
      $(".taskInfo").css({display: "none"})
      info.css({display: "block"})
    } else {
      $(".taskInfo").css({display: "none"})
    }
  })




  // return element
}

function addTaskFromShareCode(code) {
  let auxLabel
  proceed = code
  for (let i = 0; i<allLabels.length; i++) {
    if (!i) {
      auxLabel = allLabels[i].labelId
    } else if (auxLabel > allLabels[i].labelId) {
      auxLabel = allLabels[i].labelId
    }
  }

  $.get('php/joinSharedTask.php', {
    code: code,
    userId: user.userId,
    labelId: auxLabel
    })

    .done(function(data){
      console.log(data)
      hidePopup()
      if (data == "Task doesnt exist") {
        popup(["Task doesnt exist", timeout])
      } else {
        getTaskAndLabelData(user.userId)
      }
    })
    .fail(error)
}

function leaveTask(obj) {
  $.get('php/leaveTask.php', {
    taskId: obj.taskId,
    userId: user.userId,
    labelId: obj.label.labelId
    })

    .done(function(data){
      cl(data)
      hidePopup()
      getTaskAndLabelData(user.userId)
    })
    .fail(error)
}

function claimSubtask(name, obj, elem) {
  console.log(elem)
  $.get("php/claimSubtask.php", {name: name, subId: obj.subId})
  .done(function(data) {
    console.log(data)
    if (data==0) {
      $('#subtask' + obj.subId + ' :last-child').html("Claim")
    } else {
      $('#subtask' + obj.subId + ' :last-child').html(data)
    }
    obj.claimedName = data
  })
  .fail(error)
}

function taskDone(action, obj) {
  let id
  let value
  
  if(action == "task") {
    id = obj.taskId
    value = (obj.completedTask == 0) ? 1 : 0
  } else {
    id = obj.subId
    value = (obj.completed == 0) ? 1 : 0
  }

  console.log(id, value, "donetask")

  $.get("php/done.php", {action: action, value: value, id: id})
  .done(function(data) {
    console.log(data)
    
    if (action == "task") {
      getTaskAndLabelData(user.userId)
    } else if (action == "subtask" && value == 1){
      $("#subtask" + obj.subId + " input[type='checkbox']").prop({checked: true})
      $("#subtask" + obj.subId).addClass("archived")
      obj.completed = 1
    } else {
      $("#subtask" + obj.subId + " input[type='checkbox']").prop({checked: false})
      $("#subtask" + obj.subId).removeClass("archived")
      obj.completed = 0
    }


  })
  .fail(error)
}