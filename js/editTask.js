//function to edit or create a new task // a = "new" or a = i from allTasks[] 
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

      //Add subtask button, input, click function
      $('<input>', {
        "id": "addSubtask",
        type: "button",
        value: "+",
        appendTo: "#subtaskTitleContainer"
      }).click(function() {
        //adds substask to subtaskContainer
        prepareSubtasks($('#subtaskNameInput').val(), $('#subtaskNameInput').attr("name"), $('#date').val())
        /* $('<div>', {
          html: "Name: " + subtaskArray[subtaskArray.length-1][1] + " Deadline: " + subtaskArray[subtaskArray.length-1][2],
          appendTo: "#subtaskContainer"
        }) */
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
  
  
      $('<div>', {"id": "radioDeadlineContainer", appendTo: "#content"})
      $('<label>', {for: "radioDeadline", html: "Deadline", appendTo: "#radioDeadlineContainer"})
      $('<input>', {
        "id": "radioDeadline",
        name: "radio",
        type: "checkbox",
        checked: false,
        appendTo: "#radioDeadlineContainer",
        change: function() {
          if (this.checked) {
            $('<label>', {for: "date", html: "Date of deadline ", appendTo: "#dateContainer"})
            $('<input>', {
              "id": "date",
              type: "text",
              appendTo: "#dateContainer"
            }).datepicker({dateFormat: "yy-mm-dd"})
          } else {
            $('#date').remove()
            $('label[for="date"]').remove()
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
        prepareSubtasks($('#subtaskNameInput').val(), $('#subtaskNameInput').attr("name"), $('#date').val())
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



      //creates old subtasks in the editTask page
      allTasks[a].subtasks.forEach(function(item) {
        if(item.completed == 0) {
            prepareSubtasks(item.subName, item.subId, item.deadline)
        }
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