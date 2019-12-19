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
      backgroundColor: this.color,
      height: "35px",
      width: "35px",
      margin: "5px"
  })
}

function Task(data, objLabel) {
  this.taskId = data.taskId
  this.taskName = data.taskName
  this.shareCode = data.code
  this.label = objLabel
  
  this.creator = data.creator
  this.done = false
  this.subtasks = []
  this.taskMembers = []
  this.urgent 
  
  this.subDL = function() {
    let a = this.subtasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1)
    if(a[0]){
      this.urgent = a[0].deadline
    } else {
      this.urgent = null
    }
  }

}

