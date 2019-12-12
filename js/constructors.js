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
  this.taskMembers = []
  this.urgent
  
  this.subDL = function() {
    let a = this.subtasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1)
    this.urgent = a[0].deadline
  }

  this.createTask
  
  // this.createTask = function() {
  //   // create task w/ icon from labelobject
  //   let task = $('<div>')
  //   let icon = this.label.element
  //   let name = this.taskName
  //   task.append(icon, name)

  //   //create subtasks to present
  //   for (let subtask of this.subtasks) {
  //     let subtaskContainer = $('<div>')
  //     let subName = $('<div>')
  //     subName.html(
  //       // get name from subtaskobject later 
  //     )
      
  //     if (!this.creator) {
  //       let claimBox = $('div', {
  //         html: "CLAIM"
  //       }).click(function() {
  //         // code the function to claim subtask later
  //       })
  //     }
  //   }
  // }
}

