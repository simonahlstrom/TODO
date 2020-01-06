
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
    }, 2000)
  }

  $(".ghost").click((e) => {
    e.preventDefault()
    if (!$(e.target).is('#ghost *') && ghostFlag) {
      hidePopup()
    }
  })

  $("#popup").click((e) => {
    e.stopPropagation()
  })

  return ghost
}

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

  if (date == "0000-00-00") {date = null}
  subtaskArray[subtaskArray.length-1].push(date)

  let subIndex = subtaskArray.length-1

  //creates subtasks
  let subAux = $("<div>", {
    "id": "subtask" + subId,
    class: "editSubtask",
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

  let subAux2 = $("<div>", {
    appendTo: subAux
  })

  $("<input>", {
  "class": "button",
  type: "button",
  value: "Edit",
  appendTo: subAux2,
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

    // console.log(subtaskArray[subIndex])
    // console.log(subIndex)
    // console.table(subtaskArray)


    subtaskArray[subIndex][0] = ""
    subtaskArray[subIndex][3] = "delete"
    // subtaskArray.splice(subIndex, 1)
    subAux.remove()
  })

  $("<input>", {
    "class": "button",
    type: "button",
    value: "Delete",
    appendTo: subAux2,
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
        if(subtaskArray[0]) {
          saveSubtask(code)
        } else {
          getTaskAndLabelData(user.userId)
        }


      })
      .fail(error)
  } else {
    popup("Give the task a name before saving.").click(hidePopup)
  }
}

function saveSubtask(code) {
  subtaskArray.forEach(function(item) {
    let action

  

    if ((item[3] == "delete" && item[0]) || item[3] == undefined) {
      // console.log("first check passed -->", item)

      if (item[0] == "" || item[0] == undefined || item[0] == null) {
        action = "new"
        // console.log("new ", item)
      } else if (item[3] == "delete") {
        action = "delete"
        // console.log("delete ", item)
      } else {
        action = "alter"
        // console.log("alter ", item)
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

        getTaskAndLabelData(user.userId)
        subtaskArray = []
      })
      .fail(error)

    } else {
      // console.log("didn't pass first-->", item)
    }


    

  })
}
function removeTask(obj) {
  $.get('php/removeTask.php', {taskId: obj.taskId})
  .done((data)=>{
    popup(["Task has been removed"], timeout)
    getTaskAndLabelData(user.userId)
  })
  .fail(error)
}
function shareTask(action, taskId, userId) {
    
  $.get("php/shareTask.php", {action: action, userId: userId, taskId: taskId})
  .done((data)=>{
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
      height: "calc(var(--fontSize) * 1.25)"
    })
  
    if(parseInt(item.creator)) {
      owner = $("<div>", {
        html: "(Owner)",
        appendTo: ".taskMember:last-child"
  
      }).css({
        height: "20px",
        width: "20px",
        padding: "3px",
        fontWeight: "bold"
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

  //label Icon
  $("<div>", {
    class: "taskLabel",
    appendTo: head
  }).css({
    backgroundImage: "url('icons/labels/" + obj.label.icon + "')",
    backgroundColor: obj.label.color
  })

  //taskname
  $("<div>", {
    class: "taskName",
    appendTo: head,
    html: obj.taskName
  }).css({
    fontSize: (obj.taskName.length < 30) ? "calc(var(--fontSize) * 1.3)" : "calc(var(--fontSize) * 1.1)"
  })
  
  //task info
  let info = $("<div>", {
    class: "taskInfo",
    appendTo: element
  }).css({display: "none"})

 //label info
 $("<div>", {
  class: "labelInfo",
  appendTo: info,
  html: "Labelname: " + obj.label.labelName
})

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


      let subAuxChild1 = $("<div>", {
        appendTo: subAux
      })
      let subAuxChild2 = $("<div>", {
        appendTo: subAux
      })
  
      $("<div>", {
        class: "subName",
        appendTo: subAuxChild1,
        html: obj.subtasks[i].subName
      })
  
      $("<div>", {
        class: "subDL",
        appendTo: subAuxChild1,
        html: (obj.subtasks[i].deadline && obj.subtasks[i].deadline != "0000-00-00") ? obj.subtasks[i].deadline : ""
      })
  
      $("<input>", {
        type: "checkbox",
        value: "done",
        checked: (obj.subtasks[i].completed == 1) ? true : false,
        appendTo: subAuxChild2,
        change: function(){
          taskDone("subtask", obj.subtasks[i])

        }
      })
  
      if(obj.creator != 1){
        $("<div>", {
          class: "button",
          appendTo: subAuxChild2,
          html: (obj.subtasks[i].claimedName != 0) ? obj.subtasks[i].claimedName : "Claim"
        }).click(function(){
          if (obj.subtasks[i].completed == 0) {
            if(obj.subtasks[i].claimedName == 0) {
              claimSubtask(user.username, obj.subtasks[i], this)
            } else if (obj.subtasks[i].claimedName == user.username){
              claimSubtask(0, obj.subtasks[i], this)
            } else {
              popup(["This subtask is already claimed."], timeout)
            }
          }
        })

        subAuxChild2.css({justifyContent: "space-between"})
      }
  
  
      //post changes and change in object
    }

  }

 

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
      editTask(taskIndex)
    })
  }



  //click event
  element.click(function(e){
    e.stopPropagation()
    
    if(info.css("display") != "none" && (e.target.className == "taskName" || e.target.className == "taskLabel")){
      $(".taskInfo").css({display: "none"})
    } else if((info.css("display") == "none" || e.currentTarget.id == element.attr("id"))) {
      $(".taskInfo").css({display: "none"})
      info.css({display: "block"})
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
      hidePopup()
      if (data == "Task doesnt exist") {
        popup(["Task doesnt exist"], timeout)
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
      hidePopup()
      getTaskAndLabelData(user.userId)
    })
    .fail(error)
}

function claimSubtask(name, obj, elem) {

  $.get("php/claimSubtask.php", {name: name, subId: obj.subId})
  .done(function(data) {
    if (data==0) {
      $('#subtask' + obj.subId + ' > div:last-child > div:last-child').html("Claim")
    } else {
      $('#subtask' + obj.subId + ' > div:last-child > div:last-child').html(data)
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

  $.get("php/done.php", {action: action, value: value, id: id})
  .done(function(data) {
    
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

function userSettings(user) {
  settingFlag = true
  mauflag = false
  $('#content').html("")
  let userCheck
  

  let userInfoName = $('<div>', {class: "userInfo", appendTo: "#content"})
  let userInfoEmail = $('<div>', {class: "userInfo", appendTo: "#content"})
  let userInfoPassword = $('<div>', {class: "userInfoPass", appendTo: "#content"})
  
  //username
  $('<div>', {html: "Username: " + user.username, appendTo: userInfoName})

  //email
  $('<div>', {html: "Email adress: " +user.email, appendTo: userInfoEmail})
  

  //actions
  let userActions = $('<div>', {appendTo: "#content"})
  
  //change username and email
  $('<input>', {
    class: "button",
    type: "button",
    value: "Change name and email",
    appendTo: userActions
  }).click(function() {
    userInfoName.html("")
    userInfoEmail.html("")
    userActions.html("")

    //creates field to edit
      //Username field
      $('<label>', {html: "Username: ", appendTo: userInfoName})
      $('<input>', {
        "id": "userInfoName",
        type: "text",
        appendTo: userInfoName,
        value: user.username
      })

      //Email field
      $('<label>', {html: "Email: ", appendTo: userInfoEmail})
      $('<input>', {
        "id": "userInfoEmail",
        type: "text",
        appendTo: userInfoEmail,
        value: user.email
      })

      //password fields
      userInfoPassword.addClass("userInfo")
      
      $('<label>', {html: "Current password: ", appendTo: userInfoPassword})
      $('<input>', {
        "id": "currentPassword",
        type: "password",
        appendTo: userInfoPassword
      })
      
      userActions.css({display: "flex"})
      //save and cancel
      $('<input>', {
        class: "button",
        type: "button",
        value: "Save settings",
        appendTo: userActions
      }).click(function() {
        let checkPassword = document.cookie.split(";")
        checkPassword.forEach((item)=>{
          if(item.includes("password=")) {
            checkPassword = item.slice(item.indexOf("=")+1, item.length)
          }
        })
       

        if (checkPassword != $("#currentPassword").val()){
          popup(["The password is incorrect."], timeout)
          $("#currentPassword").val("")
        } else {
          updateUserInfo({action: "changeUserInfo", userId: user.userId, username: $("#userInfoName").val(), email: $("#userInfoEmail").val()})
        }
      })

      $('<input>', {
        class: "button",
        type: "button",
        value: "Cancel",
        appendTo: userActions
      }).click(function() {
        userSettings(user)
      })
      

  })
  
  //change password button
  $('<input>', {
    class: "button",
    type: "button",
    value: "Change Password",
    appendTo: userActions
  }).click(function() {
    userInfoName.html("")
    userInfoEmail.html("")
    userActions.html("")

    //creates field to edit
      //Username field
      $('<label>', {html: "Username: ", appendTo: userInfoName})
      $('<input>', {
        "id": "userInfoName",
        type: "text",
        appendTo: userInfoName,
        value: user.username
      })

      //Email field
      $('<label>', {html: "Email: ", appendTo: userInfoEmail})
      $('<input>', {
        "id": "userInfoEmail",
        type: "text",
        appendTo: userInfoEmail,
        value: user.email
      })

      //password fields
      let auxDiv1 = $('<div>', {appendTo: userInfoPassword})
      let auxDiv2 = $('<div>', {appendTo: userInfoPassword})
      let auxDiv3 = $('<div>', {appendTo: userInfoPassword})

      $('<label>', {html: "Current password: ", appendTo: auxDiv1})
      $('<input>', {
        "id": "currentPassword",
        type: "password",
        appendTo: auxDiv1
      })

      $('<label>', {html: "New password: ", appendTo: auxDiv2})
      $('<input>', {
        "id": "newPassword",
        type: "password",
        appendTo: auxDiv2
      })

      $('<label>', {html: "Repeat new password: ", appendTo: auxDiv3})
      $('<input>', {
        "id": "repeatPassword",
        type: "password",
        appendTo: auxDiv3
      })
      
      //save and cancel
      userActions.css({display: "flex"})

      $('<input>', {
        class: "button",
        type: "button",
        value: "Save settings",
        appendTo: userActions
      }).click(function() {
        let checkPassword = document.cookie.split(";")
        checkPassword.forEach((item)=>{
          if(item.includes("password=")) {
            checkPassword = item.slice(item.indexOf("=")+1, item.length)
          }
        })

        if(checkPassword != $("#currentPassword").val()){
          popup(["The password is incorrect."], timeout)
          $("#currentPassword").val("")

        } else if($("#newPassword").val() != $("#repeatPassword").val()) {
          popup(["The new password doesn't match."], timeout)
          $("#newPassword").val("")
          $("#repeatPassword").val("")

        } else if($("#newPassword").val() == checkPassword) {
          popup(["Use a new password."], timeout)
          $("#newPassword").val("")
          $("#repeatPassword").val("")
        }else {
          updateUserInfo({action: "changePassword", userId: user.userId, username: $("#userInfoName").val(), email: $("#userInfoEmail").val(), password: checkPassword, newPassword: $("#newPassword").val()})
        }
      })

      $('<input>', {
        class: "button",
        type: "button",
        value: "Cancel",
        appendTo: userActions
      }).click(function() {
        userSettings(user)
      })
      

  })

//Theme
  let themeContainer = $('<div>', {class: "themeContainer", appendTo: "#content"})

  $('<div>', {html: "Theme: " + user.theme.name, appendTo: themeContainer}).css({"font-size": "calc(var(--fontSize)*1.25)"})
  $('<input>', {
    class: "button",
    type: "button",
    value: "Change apperance",
    appendTo: themeContainer,
  }).click(function() {
    themeContainer.html("")

    let auxTheme = $('<div>', {appendTo: themeContainer})
    let auxFontSize = $('<div>', {appendTo: themeContainer})
    let auxOption = $('<div>', {appendTo: themeContainer})
    //select theme
    
    $('<label>', {html: "Choose theme: ", appendTo: auxTheme})
    themeSelect = $('<select>', {
      "id": "themeSelect",
      value: "Theme",
      appendTo: auxTheme,
    }).change(function(){
      theme.forEach(function(item){
        if(item.themeId == themeSelect.val()) {
          $(":root").css({
            "--mainColor": item.mainColor,
            "--accentColor": item.accentColor,
            "--subColor": item.subColor,
            "--fontColor": item.fontColor,
            "--fontColor2": item.fontColor2,
            "--archivedColor": item.archivedColor,
            "--inputColor": item.inputColor
          })
        }
      })
    })

    theme.forEach(function(item){
      $('<option>', {
        value: item.themeId,
        html: item.themeName,
        selected: (user.theme.Id == item.themeId) ? "selected" : false,
        appendTo: themeSelect
      })
    })
   
    //fontSize
    $('<label>', {html: "Fontsize: ", appendTo: auxFontSize})
    fontSizeSelect = $('<select>', {
      "id": "fontSizeSelect",
      value: "fontSize",
      appendTo: auxFontSize,
    }).change(function(){
      $(":root").css({"--fontSize": fontSizeSelect.val()})
    })

    fontSizeArray.forEach(function(item){
      $('<option>', {
        value: item.size,
        html: item.name,
        selected: (user.fontSize == item.size) ? "selected" : false,
        appendTo: fontSizeSelect
      })
    })
    

    //actions
    
    $('<input>', {
      class: "button",
      type: "button",
      value: "Set apperance",
      appendTo: auxOption
    }).click(function() {
      updateUserInfo({action: "changeTheme", userId: user.userId, themeId: themeSelect.val(), fontSize: fontSizeSelect.val()})
    })

    $('<input>', {
      class: "button",
      type: "button",
      value: "Cancel",
      appendTo: auxOption
    }).click(function() {
      userSettings(user)
    })

  })

//log out and go back
  let settingActions = $('<div>', {class: "logout", appendTo: "#content"})

  //log out
  $('<input>', {
    class: "button",
    type: "button",
    value: "Log out",
    appendTo: settingActions
  }).click(function() {
    popup(["Are you sure you want to log out?",
      $("<div class='buttonContainer'>").append (
        $('<input type="button" value="Log out" class="button">').click(() => {
          logout()
      }),
      $('<input type="button" value="Cancel" class="button">').click(() => {
          hidePopup()
      }))
    ])
  })

  $('<div>', {"id": "buttonContainer", class: "logout", appendTo: "#content"})
  $('<input>', {
    class: "button",
    type: "button",
    value: "Go to Home",
    appendTo: "#buttonContainer"
  }).click(function() {
    home()
    settingFlag = false
  })


}

function updateUserInfo(actionObj) {
  //changePassword changeUserInfo changeTheme
  actionObj.currentUsername = user.username
  actionObj.currentEmail = user.email

  $.get('php/updateUserSettings.php', actionObj)
  .done(function(data){

    if(data=="nameExist") {
      popup(["This name is taked, please use another name."], timeout)
      $("#userInfoName").val(user.username)
    } else if(data=="emailExist") {
      popup(["This email address is already registered, please change to another one."], timeout)
      $("#userInfoEmail").val(user.email)
    } else {
      popup([data], timeout)
      proceed = "userSetting"
      setup(user.userId)
    }
  })
  .fail(error)
}

function aboutPage() {
  $('#content').html("")
  mauFlag = true
  settingFlag = false

  $('<div>', {
    "id": "aboutTitle",
    html: "About TODO",
    appendTo: "#content"
  }).css({
    fontSize: "calc(var(--fontSize) * 1.3)"
  })

  $('<p>', {
    html: "TODO is developed by students at Malmö universitet and aims to assist students with daily planning and collaboration.",
    appendTo: "#content"
  })

  $('<p>', {
    html: "The developers saw flaws in existing toolsets lacking possibility to share and claim tasks with a group of users and saw the need to develop an app of their own.",
    appendTo: "#content"
  })

  $('<p>', {
    html: "Developers: Linus, Simon and Isak",
    appendTo: "#content"
  })

  $('<div>', {appendTo: "#content"}).css({
    backgroundColor: "green",
    height: "30%"
  })

  $('<div>', {"id": "buttonContainer", appendTo: "#content"})

  $('<input>', {
    type: "button",
    "class": "button",
    value: "Back",
    appendTo: "#buttonContainer"
  }).click(function() {
    home()
    mauFlag = false
  })

  $('<input>', {
    type: "button",
    "class": "button",
    value: "Contact us",
    appendTo: "#buttonContainer"
  }).click(function() {popup(["Email: todo@gmail.com"])})

  $('<p>', {
    html: "version: 0.1 beta",
    appendTo: "#content"
  })

  $('<div>', {
    html: "published: 2020-01-09",
    appendTo: "#content"
  })
}

function filterAndArchiveMeny(obj){
  return $("<div>",{
    class: "buttonMeny",
    appendTo: ".labelBox",
    html: obj.name}).css({backgroundImage: obj.bgImg}).click(obj.set).css({backgroundImage: obj.bgImg})
}