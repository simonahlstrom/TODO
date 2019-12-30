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
      "id": this.labelId
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
    console.log("START")
    for (let label of allLabels) {
      label.element.css({border: "3px solid transparent"})
    }

    timeOut = setInterval(function(){
      // console.log(holdIndex++)
      holdIndex++
      if (holdIndex > 4) {
        $(e.target).css({border: "3px solid var(--accentColor)"})
        $(".slideIn").addClass("slideIn-active")

        let clone = e.target.cloneNode()
        labelToEdit = e.target
        labelCopy = clone
      }
    }, 100)

  }).bind('mouseup touchend', function(e) {
    console.log("END")
    console.log(holdIndex)

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
        // add this function later when it's time
        // home()
      })
      .fail((error) => {
        console.log(error)
      })
    }

    holdIndex = 0
    clearInterval(timeOut)
  })



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

