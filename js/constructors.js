function User(data) {
  this.userId = data.userId
  this.username = data.username
  this.email = data.email
  this.occupation = data.occupation
  this.theme = { 
    Id: data.themeId, 
    name: data.themeName,
    mainColor: data.mainColor,
    accentColor: data.accentColor,
    subColor: data.subColor
  }
}

function Label(data) {
  this.labelName = data.labelName
  this.color = data.color
  this.icon = data.icon
  this.activated = data.activated
  this.labelId = data.labelId
  this.taskIds = []
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
  this.label = objLabel.labelName
  this.labelId = objLabel.labelId
  
  this.creator = data.creator
  this.done = false
  this.subtasks = []
  
  // create subtasks (currently based on submitting a form)
  this.createSubtask = function() {
    // let form = $('<form>', {'id': 'subtaskForm'})
    
    // let nameLabel = $('<label>', {
    //   for: name, 
    //   html: 'Name of subtask'
    // })
    // let dlLabel = $('<label>', {
    //   for: dl, 
    //   html: 'Does this subtask have a deadline?'
    // })
    
    // let name = $('<input type=text>', {'id': 'subtaskName',})
    // let dl = $('<input type=date>', {'id': 'deadline'})
    
    let submit = $('<input type=submit>', {
      'id': 'subtaskSubmit'
      // will this work here? test it
    }).click((e) => {
      e.preventDefault()

      // fill subtask-object with values to be posted
      let subtask = {
        subName: name.val(),
        deadline: dl.val(),
        completed: 0,
        claimedName: 0,
        userId: user.userId,
        taskId: this.taskId,
        labelId: this.labelId
      }

      // posts the subtask to DB
      $.get('../php/postSubtask.php', subtask)
      .done((data) => {
        let response = JSON.parse(data)
        // cl is just a function that c.logs the parameter passed to it
        cl(response)
      })
      .fail((error) => {
        cl(error)
      })
    })

    // $(form).append(nameLabel, name, dlLabel, dl, submit)
    // $('APPEND FORM HERE').append(form)

    // return subtask
  }
  
  this.subDL = function() {
    //code functionality to get deadline from this.subtasks
  }
  
  this.createTask = function() {
    // create task w/ icon from labelobject
    let task = $('<div>')
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