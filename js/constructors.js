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
  
  this.subDL = function() {
    //code functionality to get deadline from this.subtasks
  }
  
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







sharedContainer = function(obj) {
  if (obj.creator){
    $("<p>", {
      html: "Share code: " + obj.shareCode,
      appendTo: "#shareContainer"
    })
  }

    $("<div>", {
      "id": "taskMembers",
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
    })
  //create interface


}