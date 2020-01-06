function User(data) {
  this.userId = data.userId
  this.username = data.username
  this.email = data.email
  this.occupation = data.occupation
  this.fontSize = data.fontSize
  // this.font
  this.theme = { 
    Id: data.themeId, 
    name: data.themeName,
    mainColor: data.mainColor,
    accentColor: data.accentColor,
    subColor: data.subColor,
    fontColor: data.fontColor,
    fontColor2: data.fontColor2,
    inputColor: data.inputColor,
    archivedColor: data.archivedColor
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
      "id": this.labelId,
      "value": this.labelName
  }).css({
      backgroundImage: `url(icons/labels/${this.icon})`,
      backgroundColor: this.color,
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      margin: "5px",
      backgroundSize: "65%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      border: "3px solid transparent"
  // }).click(function(){
  //   let currentLabel
  //   let index

  //   // finding the correct label to handle
  //   allLabels.forEach((element, i) => {
  //     if (element.labelId == this.id) {
  //       currentLabel = element
  //       index = i
  //     }
  //   })

  //   // updates the activated column on the regarding label
  //   $.get('php/toggleActiveLabel.php', {id: currentLabel.labelId, activated: currentLabel.activated})
  //   .done((data) => {
  //     data = JSON.parse(data)

  //     // does the same update on the local object
  //     allLabels.forEach((element, i) => {
  //       if (index == i) {
  //         element.activated = data[0].activated
  //       }
  //     })
      
  //     // handling css-stuff, showing the activited status with opacity
  //     if (data[0].activated == 1) {
  //       this.classList.remove("deactivated")
  //     } else {
  //       this.classList.add("deactivated")
  //     }
  //     // add this function later when it's time
  //     // home()
  //   })
  //   .fail((error) => {
  //     console.log(error)
  //   })
  // })
  }).on('mousedown touchstart', function(e) {
    for (let label of allLabels) {
      label.element.css({border: "3px solid transparent"})
    }

    timeOut = setInterval(function(){
      holdIndex++
      if (holdIndex >= 4) {
        $(e.target).css({border: "3px solid blue"})
        $(".slideIn").addClass("slideIn-active")
        $(".flip-card .flip-card-inner").css({transform: "rotateY(180deg)"})

        let clone = e.target.cloneNode()
        labelToEdit = e.target
        labelCopy = clone


      }
    }, 100)

  }).bind('mouseup touchend', function(e) {

    if (holdIndex < 4) {
      let currentLabel
      let index
    
      // finding the correct label to handle
      allLabels.forEach((element, i) => {
        if (element.labelId == this.id) {
          currentLabel = element
          index = i
        }
      })
    
      // updates the activated column on the regarding label
      $.get('php/toggleActiveLabel.php', {id: currentLabel.labelId, activated: currentLabel.activated})
      .done((data) => {
        data = JSON.parse(data)
    
        // does the same update on the local object
        allLabels.forEach((element, i) => {
          if (index == i) {
            element.activated = data[0].activated
          }
        })
        
        // handling css-stuff, showing the activited status with opacity
        if (data[0].activated == 1) {
          this.classList.remove("deactivated")
        } else {
          this.classList.add("deactivated")
        }
       
        home()
      })
      .fail((error) => {
        console.log(error)
      })
    }

    holdIndex = 0
    clearInterval(timeOut)
  })
  this.remove = function() {
    //check alltasks with this.labelId
    //if user.creator = 0 --> leave task
    //else remove task
    let t = false
    let l = false

    for (let i=0; i<allTasks.length; i++) {
      if(this.labelId == allTasks[i].label.labelId) {

        if(allTasks[i].creator == 0) {
          console.log("not creator!")
          $.get('php/leaveTask.php', {
            taskId: allTasks[i].taskId,
            userId: user.userId,
            labelId: this.labelId
            })
        
            .done(function(data){
              // console.log(data)
            })
            .fail(error)


        } else {
          $.get('php/removeTask.php', {taskId: allTasks[i].taskId})
          .done((data)=>{
            // console.log(data)
          })
          .fail(error)


        }


      }
      if(i == allTasks.length-1) {
        t = true 
        if (l && t) {
          getTaskAndLabelData(user.userId)
        }
      }
    }


    $.get("php/removeLabel.php", {labelId: this.labelId})
    .done((data) => {
      l = true
      // console.log(data)
      if (l && t) {
        getTaskAndLabelData(user.userId)
      }
    })
  }



  // })
}

function Task(data, objLabel) {
  this.taskId = data.taskId
  this.taskName = data.taskName
  this.shareCode = data.code
  this.label = objLabel
  this.added = data.added
  
  this.creator = data.creator
  this.completedTask = data.completedTask
  this.subtasks = []
  this.taskMembers = []
  this.urgent = null
  
  this.subDL = function() {
    this.subtasks = this.subtasks.sort((a, b) => (a.deadline > b.deadline) ? 1 : -1)
    
    for (let i = 0; i < this.subtasks.length; i++){
      if(this.subtasks[i].deadline && this.subtasks[i].completed == 0) {
        this.urgent = this.subtasks[i].deadline
        console.log(this.urgent)
        return
        
      }
    }
  }

}

