// GENERAL FUNCTIONS

// requests colors and icon from DB, saving them to variables
function getColorsAndIcons() {
  $.get('php/getColorsAndIcons.php')
  .done((data) => {
    data = JSON.parse(data)

    colorDivs = $("<div class='gridEdit' id='colorsContainer'></div>")
    iconDivs = $("<div class='gridEdit' id='iconsContainer'></div>")

    // loops to create divs with the right color or icon, for editing labels
    for (let color of data[0]) {
      colors.push(color.rgb)
      colorDivs.append($("<div></div>").css({'background-color': color.rgb}).addClass('labelOption').click((e) => {
        updatePreview(e.target, "color")
      }))
    }
    for (let icon of data[1]) {
      icons.push(icon.url)
      iconDivs.append($("<div></div>").css({'background-image': `url(icons/labels/${icon.url})`}).addClass('labelOption').click((e) => {
        updatePreview(e.target, "icon")
      }))
    }
  })
}

// show menu with labels
$('#home').click(() => {
  toggleMenu()

  for (let label of allLabels) {
    $('#labels').append(label.element)
    if (label.activated == 1) {
      label.element[0].classList.remove("deactivated")
    } else {
      label.element[0].classList.add("deactivated")
    }
  }
})

// hide labels-menu handler
$('#menuDown').click(() => {
  toggleMenu()
})
// toggle labels-menu
function toggleMenu() {
  $('.labelBox').toggleClass('activeLabel')

  // let boxHeight = $('.labelBox').height()
  // $('#labelBox').css({
  //   "margin-top": `-101px`
  // })

  for (let label of allLabels) {
    label.element.css({border: "3px solid transparent"})
  }
  $(".slideIn").removeClass("slideIn-active")
  $(".flip-card .flip-card-inner").css({transform: "rotateY(0)"})
}

// create popup with editing options for the labels
function editOrCreateLabel(copy, label, action) {
  let name

  if (action == "edit") {
    for (let element of allLabels) {
      if (element.labelId == label.id) {
        name = element.labelName
      }
    }
  } else {
    name = ""
  }

  let nameOfLabel = $(`<div class='flex'><label for='newName'>Name of your label:</label><input type='text' value='${name}' placeholder='${name}' id='newName'></div>`).css({
    "flexDirection": "column",
    "width": "60%"
  })

  let editBox = [
    $("<div class='Container flex'></div>").append(
      nameOfLabel,
      $("<div class='flex' id='preview'></div>").css({
        backgroundColor: copy.style.backgroundColor,
        backgroundImage: copy.style.backgroundImage,
        backgroundSize: "65%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      })
    ),
    colorDivs,
    iconDivs,
    $("<div class='button' id='save'>Save</div>").click(() => {
      let color = $("#preview").css("backgroundColor")
      let icon = $("#preview").css("backgroundImage"), fileName_Index = icon.lastIndexOf("/") + 1, fileName = icon.substr(fileName_Index).replace(/[\#\?\)\"].*$/,'')
      let updatedName = $("#newName").val()

      if (action == "edit") {
        // update label on db
        $.get('php/updateLabel.php', {color: color, icon: fileName, labelId: label.id, name: updatedName})
        .done((data) => {
          data = JSON.parse(data)
  
          // update label in browser
          allLabels.forEach((element, i) => {
            if (element.labelId == label.id) {
              element.icon = fileName
              element.color = color
              element.element.css({
                backgroundImage: `url(icons/labels/${fileName})`,
                backgroundColor: color
              })
              element.labelName = updatedName
            }
          })
  
          home()
          hidePopup()
        })
      } else if (action == "create") {
        if (name == updatedName) {
          console.log("choose another name")
        } else {
          $.get('php/createLabel.php', {
            userId: user.userId,
            labelName: updatedName,
            color: color, 
            icon: fileName
          })
          .done((data) => {
            data = JSON.parse(data)
            console.log(data)
    
            // update label in browser
            allLabels.push(new Label(data[0]))
    
            home()
            hidePopup()
          })
        }
      }
    })
  ]

  popup(editBox)
}

// event handlers for edit-button
$("#editLabel").click(() => {
  getColorsAndIcons()
  toggleMenu()
  editOrCreateLabel(labelCopy, labelToEdit, "edit")
})

// event handlers for edit-button
$("#addLabel").click(() => {
  getColorsAndIcons()
  toggleMenu()
  editOrCreateLabel(defaultLabelCopy, defaultLabel, "create")
})

$("#removeLabel").click(() => {
  let message = [
    $("<h2>Are you sure you want to remove this label? All it's data will be lost permanently.</h2>").css("text-align", "center"),
    $("<div class='buttonContainer'></div>").append(
      $('<input type="button" value="Yes" class="button">').click(() => {
      removeLabel(labelToEdit)
      hidePopup()
      home()
      }),
      $('<input type="button" value="No" class="button">').click(() => {
        hidePopup()
        $(".slideIn").removeClass("slideIn-active")
        $(".flip-card .flip-card-inner").css({transform: "rotateY(0)"})
        labelToEdit = ""
        for (let label of $(".label")) {
          label.style.border = "3px solid transparent"
        }
      })
    )
  ]
  
  popup(message)
})

function updatePreview(change, type) {
  if (type == "color") {
    $("#preview").css({backgroundColor: change.style.backgroundColor})
  } else if (type == "icon") {
    $("#preview").css({backgroundImage: change.style.backgroundImage})
  }
}

function removeLabel(element) {
  let index
  allLabels.forEach((label, i) => {
    if (label.labelId == element.id) {
      label.remove()
      home()
      index = i
    }
  })
  allLabels.splice(index, 1)

  $("#labels").empty()

  for (let label of allLabels) {
    $("#labels").append(label.element)
  }
  $(".slideIn").removeClass("slideIn-active")
  $(".flip-card .flip-card-inner").css({transform: "rotateY(0)"})
}

// // hold event
// $(document).ready(function() {
//   let i = 0, timeOut = 0
  
//   $('#1').on('mousedown touchstart', function(e) {
//     console.log("START")

//     timeOut = setInterval(function(){
//       console.log(i++)
//     }, 100)
//   }).bind('mouseup touchend', function() {
//     console.log("END")

//     if (i >= 4) {
//       console.log("WORKS")
//     } else {
//       e.target.click()
//     }

//     i = 0
//     clearInterval(timeOut)
//   })
// })