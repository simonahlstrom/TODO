
//Run editTask with "new" to create new task, or with index from allTasks(array) to edit existing task.
$('#add').click(function() {editTask(2)})

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
  let ghost = $(".ghost").addClass('active')

  if (timeout) {
    setTimeout(() => {
      $(".ghost").removeClass('active')
    }, 1000)
  }

  $(".ghost").click((e) => {
    cl(e.target)
      if (e.target == pop.parent()) {
        cl("IN")
      hidePopup()
    }
  })

  return ghost
}

function hidePopup() {
  $(".ghost").removeClass("active")
}


//Lös så att alla subtasks inte laddas upp på nytt! dela på funktionen som displayar i subtasklistan och de som laddas upp?
function prepareSubtasks(name, subId, date) {
  subtaskArray.push([])
  subtaskArray[subtaskArray.length-1].push(subId)
  subtaskArray[subtaskArray.length-1].push(name)

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
    type: "button",
    value: "Edit",
    appendTo: subAux,
    }).click(function() {
      $('#subtaskNameInput').attr({name: subId})
      $('#subtaskNameInput').val(name)

      if (typeof date == "string") {
        $('#radioDeadline').attr({checked: true}).change()
      }
      $('#date').val(date)
      console.log(subIndex)
      subtaskArray.splice(subIndex, 1)
      subAux.remove()
    })

}

//Saves a task. Arguments: code is for the WHERE in the sql query and action tells the php which queries to run. //
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

function saveSubtask(code, obj) {
  cl(obj)
  subtaskArray.forEach(function(item) {
    let action


    if (item[0] == "") {
      action = "new"
      cl("new " + item[2])
    } else {
      action = "alter"
      cl("alter " + item[2])
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
      cl(data)
      getTaskAndLabelData(user.userId)
      subtaskArray = []
    })
    .fail(error)

  })
}

function createTaskElement(i) {
  let obj = allTasks[i]
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
    if(parseInt(obj.subtasks[i].completed) == archiveTasks || archiveTasksAll){
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
          console.log(this.checked)
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
    editTask(obj)
    console.log("edit task")
  })



  //click event
  element.click(function(e){
    e.stopPropagation()
    if(info.css("display") == "none") {
      $(".taskInfo").css({display: "none"})
      info.css({display: "block"})
    } else {
      info.css({display: "none"})
    }
  })



  // return element
}

