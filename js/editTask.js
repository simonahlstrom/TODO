//function to edit or create a new task // a = "new" or a = i from allTasks[] 
function editTask (a) {
    $('#content').html("")
    let shared = 1
    let labelIcon
    let labelSelect
  
    if (a == "new") {
      let code = makeid(4)
      //Name of task input
      $('<div>', {class: "editName", appendTo: "#content"})

      $('<label>', {for: "taskNameInput", html: "Name of task ", appendTo: "#content .editName"})
      $('<input>', {
        "id": "taskNameInput",
        type: "text",
        appendTo: "#content  .editName"
      })
  
      //Label dropdown
      $('<div>', {class: "editLabel", appendTo: "#content"})
      
      $('<label>', {for: "labelSelect", html: "Select label ", appendTo: "#content .editLabel"})
      
      $('<div>', {appendTo: "#content .editLabel"})
      
      labelIcon = $("<div>", {
        class: "taskLabel",
        appendTo: "#content .editLabel > div"
      })

      labelSelect = $('<select>', {
        "id": "labelSelect",
        value: "label",
        appendTo: "#content .editLabel > div",
      }).change(function(){
        allLabels.forEach(function(item){
          if(item.labelId == labelSelect.val()){
            labelIcon.css({
              backgroundImage: "url('icons/labels/" + item.icon + "')",
              backgroundColor: item.color
            })
          }
        })
      })
  
      //subtask
      $('<div>', {class: "subtaskTitle", html: "Subtasks", appendTo: "#content"})

      $('<div>', {"id": "subtaskInputs", appendTo: "#content"})
      $('<label>', {for: "addSubtask", html: "Add subtask ", appendTo: "#subtaskInputs"})
  
      $('<input>', {
        "id": "subtaskNameInput",
        type: "text",
        appendTo: "#subtaskInputs"
      })
  
  
      $('<div>', {"id": "radioDeadlineContainer", appendTo: "#content"})
      $('<label>', {for: "radioDeadline", html: "Deadline", appendTo: "#radioDeadlineContainer"})
      $('<input>', {
        "id": "radioDeadline",
        name: "radio",
        type: "checkbox",
        checked: false,
        appendTo: "#radioDeadlineContainer",
        click: function(e) {
          e.stopPropagation()
          if (this.checked) {
            // $('<label>', {for: "date", html: "Date of deadline ", appendTo: "#dateContainer"})
            $('<input>', {
              "id": "date",
              type: "date",
              appendTo: "#dateContainer"
            }).datepicker({dateFormat: "yy-mm-dd", minDate: "-0d", showAnim: "slideDown", showWeek: true})
            
          } else {
            $('#date').remove()
            // $('label[for="date"]').remove()
          }
        }
      })
  
      $('<div>', {
        "id": "dateContainer",
        appendTo: "#radioDeadlineContainer"
      })
  
      //Subtask list
      $('<div>', {"id": "subtaskTitleContainer", appendTo: "#content"}).css("display", "flex")
      $('<div>', {
        "id": "subtaskContainer",
        appendTo: "#content"
      })

      //Add subtask button, input, click function
      $('<input>', {
        "id": "addSubtask",
        "class": "button",
        type: "button",
        value: "Add",
        appendTo: "#subtaskTitleContainer"
      }).click(function() {
        //adds substask to subtaskContainer
        $("#subtaskContainer input[type='button']").css({display: "block"})
        prepareSubtasks($('#subtaskNameInput').val(), $('#subtaskNameInput').attr("name"), $('#date').val())

        if ($('#radioDeadline').prop("checked")) {
          $('#radioDeadline').click()
        }
      })

      //shared header for "new"
      $('<div>', {"id": "sharedHeader", appendTo: "#content"})
      $('<div>', {html: "Shared", appendTo: "#sharedHeader"})

      $('<input>', {type: "button", class: "button", value: "Enable", appendTo: "#sharedHeader"}).click(function() {
        if (shared == 1) {
          shared = 2
          this.value = "Disable"

          $("<p>", {"id": "newCode", html: "Share code: " + code, appendTo: "#sharedHeader"})

        } else {
          shared = 1
          this.value = "Enable"

          $("#newCode").remove()
        }         
      })
          

      allLabels.forEach(function(item) {
        
        $('<option>', {
          value: item.labelId,
          html: item.labelName,
          appendTo: "#labelSelect"
        })

      })
      
      labelSelect.change()
  
      //Edit buttons
      $('<div>', {"class": "flex", "id": "buttonContainer", appendTo: "#content"})
      editTaskButtonsNew.forEach(function(item) {
          $('<input>', {
            "class": "flex button",
            "id": "editTaskButton" + item,
            value: item,
            type: "button",
            appendTo: "#buttonContainer"
          }).click(function() {
            if(item == "Save") {
              if($('#subtaskNameInput').val() && !$('#subtaskNameInput').val().match(/^[\s]{1,}$/)) {
                popup(["There's an unfinished subtask.<br> Do you want to save it as well?",
                $("<div class='buttonContainer'>").append(
                  $('<input type="button" value="Yes" class="button">').click(() => {
                    //körs för att få med en påbörjad task.
                    prepareSubtasks($('#subtaskNameInput').val(), $('#subtaskNameInput').attr("name"), $('#date').val())
                    saveTask(code, "new", shared)
                    hidePopup()
                  }),
                  $('<input type="button" value="Cancel" class="button">').click(() => {
                    saveTask(code, "new", shared)
                    hidePopup()
                  }))])
                  
              } else {
                saveTask(code, "new", shared)
                console.log(shared)
              }



              
            } else if (item == "Add shared task") {
              popup(["Insert share code", 
              $('<input>', {"id": "shareCodeInput", type: "text"}), 
              $('<input>', {type: "button", "class": "button", value: "Submit"}).click(function() {
                let taskExists = false
                for (let i=0; i<allTasks.length; i++) {
                  if($('#shareCodeInput').val() == allTasks[i].shareCode) {
                    taskExists = true
                  } 
                }

                if (!taskExists) {
                  addTaskFromShareCode($('#shareCodeInput').val())
                } else {
                  popup(["You are already a member of this task.", timeout])
                }
                

              })])
            } else if (item == "Cancel"){
              subtaskArray = []
              home()
            }
          })
      })
// ----------------------------------------------------EDIT OLD TASK------------------------------------------------------------------
    } else {
      
      let obj = allTasks[a]
      console.log("object sent to editTask", obj)

      let code = obj.shareCode
      //Name of task input
      $('<div>', {class: "editName", appendTo: "#content"})

      $('<label>', {for: "taskNameInput", html: "Name of task ", appendTo: "#content .editName"})
      $('<input>', {
        "id": "taskNameInput",
        value: obj.taskName,
        type: "text",
        appendTo: "#content  .editName"
      })
  
      //Label dropdown
      $('<div>', {class: "editLabel", appendTo: "#content"})
      
      $('<label>', {for: "labelSelect", html: "Select label ", appendTo: "#content .editLabel"})
      
      $('<div>', {appendTo: "#content .editLabel"})
      
      labelIcon = $("<div>", {
        class: "taskLabel",
        appendTo: "#content .editLabel > div"
      })

      labelSelect = $('<select>', {
        "id": "labelSelect",
        value: "label",
        appendTo: "#content .editLabel > div",
      }).change(function(){
        allLabels.forEach(function(item){
          if(item.labelId == labelSelect.val()){
            labelIcon.css({
              backgroundImage: "url('icons/labels/" + item.icon + "')",
              backgroundColor: item.color
            })
          }
        })
      })
  
      //Add subtask button, input, click function
      $('<div>', {class: "subtaskTitle", html: "Subtasks", appendTo: "#content"})

      $('<div>', {"id": "subtaskInputs", appendTo: "#content"})
      $('<label>', {for: "addSubtask", html: "Add subtask ", appendTo: "#subtaskInputs"})
  
      $('<input>', {
        "id": "subtaskNameInput",
        type: "text",
        appendTo: "#subtaskInputs"
      })
  
      $('<div>', {"id": "radioDeadlineContainer", appendTo: "#content"})
      $('<label>', {for: "radioDeadline", html: "Deadline", appendTo: "#radioDeadlineContainer"})
      $('<input>', {
        "id": "radioDeadline",
        name: "radio",
        type: "checkbox",
        checked: false,
        appendTo: "#radioDeadlineContainer",
        click: function(e) {
          e.stopPropagation()
          if (this.checked) {
            // $('<label>', {for: "date", html: "Date of deadline ", appendTo: "#dateContainer"})
            $('<input>', {
              "id": "date",
              type: "date",
              appendTo: "#dateContainer"
            }).datepicker({dateFormat: "yy-mm-dd", minDate: "-0d", showAnim: "slideDown", showWeek: true})
          } else {
            $('#date').remove()
            // $('label[for="date"]').remove()
          }
        }
      })
  
      $('<div>', {
        "id": "dateContainer",
        appendTo: "#radioDeadlineContainer"
      })
  
      //Subtask list
      $('<div>', {"id": "subtaskTitleContainer", appendTo: "#content"}).css("display", "flex")
      $('<div>', {
        "id": "subtaskContainer",
        appendTo: "#content"
      })


      $('<input>', {
        "id": "addSubtask",
        "class": "button",
        type: "button",
        value: "Add",
        appendTo: "#subtaskTitleContainer"
      }).click(function() {
        //adds substask to subtaskContainer
        $("#subtaskContainer input[type='button']").css({display: "block"})
        prepareSubtasks($('#subtaskNameInput').val(), $('#subtaskNameInput').attr("name"), $('#date').val())

        if ($('#radioDeadline').prop("checked")) {
          $('#radioDeadline').click()
        }
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
      labelSelect.change()

      //creates old subtasks in the editTask page
      allTasks[a].subtasks.forEach(function(item) {
        if(item.completed == 0) {
            prepareSubtasks(item.subName, item.subId, item.deadline)
        }
      })

      //Shared header
      $('<div>', {"id": "sharedHeader", appendTo: "#content"})
      $('<div>', {html: "Shared", appendTo: "#sharedHeader"})

      //check if user is owner
      if(parseInt(obj.creator)) {
        $('<input>', {type: "button", value: (obj.creator==1) ? "Enable" : "Disable", class: "button", appendTo: "#sharedHeader"}).click(function() {
          
          if(this.value == "Enable") {
            
            popup(["Do you want to share this task?",
            $("<div class='buttonContainer'>").append(
              $('<input type="button" value="Yes" class="button">').click(() => {
                shareTask("enable", obj.taskId, user.userId) 
                this.value = "Disable"
                $("<p>", {"id": "oldCode", html: "Share code: " + obj.shareCode, appendTo: "#sharedHeader"})
                sharedTaskMembers(obj)
                hidePopup()
                //add name to shared container
              }),
              $('<input type="button" value="No" class="button">').click(() => {hidePopup()}))
            ])
          } else {
            popup(["If you disable sharing, all members will lose access. Do you want to disable sharing?",
            $("<div class='buttonContainer'>").append(
              $('<input type="button" value="Yes" class="button">').click(() => {
                shareTask("disable", obj.taskId, user.userId) 
                this.value = "Enable"
                hidePopup()
                $("#shareContainer").empty()
                $("#oldCode").remove()
              }),
              $('<input type="button" value="Cancel" class="button">').click(() => {hidePopup()}))
            ])
          }
        })
      }
      
      
      //shared container
      $('<div>', {"id": "shareContainer", appendTo: "#content"})
      
      //displays sharecode if task is being shared
      if(obj.creator != 1) {
        $("<p>", {"id": "oldCode", html: "Code: <span>" + obj.shareCode + "</span>", appendTo: "#sharedHeader"})
        sharedTaskMembers(obj)
      } 


      //Edit buttons
      $('<div>', {"class": "flex", "id": "buttonContainer", appendTo: "#content"})
      
      editTaskButtons.forEach(function(item) {

        // if((obj.creator != 1 && item != "Leave task") || (item != "Delete task" && obj.creator == 0) ) {
        if(((obj.creator == 2 || obj.creator == 1) && item != "Leave task") || (item != "Delete task" && obj.creator == 0) ) {
          $('<input>', {
            "class": "flex button",
            "id": "editTaskButton" + item,
            value: item,
            type: "button",
            appendTo: "#buttonContainer"
          }).click(function() {
            if(item == "Save") {
              if($('#subtaskNameInput').val() && !$('#subtaskNameInput').val().match(/^[\s]{1,}$/)) {
                popup(["There's an unfinished subtask.<br> Do you want to save it as well?",
                $("<div class='buttonContainer'>").append(
                  $('<input type="button" value="Yes" class="button">').click(() => {
                    prepareSubtasks($('#subtaskNameInput').val(), $('#subtaskNameInput').attr("name"), $('#date').val())
                    saveTask(code, "alter", obj.label.labelId)
                    hidePopup()
                  }),
                  $('<input type="button" value="Cancel" class="button">').click(() => {
                    saveTask(code, "alter")
                    hidePopup()
                  }))])
              } else {
                saveTask(code, "alter")
              }
            } else if (item == "Cancel"){
              subtaskArray = []
              home()
            } else {
              popup([
                "Do you want to" + item.toLowerCase + "?",
                $('<input>', {type: "button", value: "Yes", "class": "button"}).click(function() {
                  if(item == "Leave task") {
                    leaveTask(obj)
                  } else {
                    removeTask(obj)
                    hidePopup()
                    getTaskAndLabelData(user.userId)
                    console.log("Task deleted")
                  } 
                }),
                $('<input type="button" value="No" class="button">').click(() => {hidePopup()})
              ])
            }
          })
        }
      })
    }
  }


 

  //add task with code.


  //cancel button