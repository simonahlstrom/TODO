// GENERAL FUNCTIONS

// variables regarding colors and icons
let colors = []
let icons = []
let colorDivs = $("<div class='gridEdit' id='colorsContainer'></div>")
let iconDivs = $("<div class='gridEdit' id='iconsContainer'></div>")

// requests colors and icon from DB, saving them to variables
function getColorsAndIcons() {
  $.get('php/getColorsAndIcons.php')
  .done((data) => {
    data = JSON.parse(data)

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

// move to run.js later
getColorsAndIcons()

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
}

// create popup with editing options for the labels
function showLabelEdit(copy, label) {
  let editBox = [
    $("<div class='Container flex'></div>").append(
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

      $.get('php/updateLabel.php', {color: color, icon: fileName, labelId: label.id})
      .done((data) => {
        // data = JSON.parse(data)
        // console.log(data)
      })
    })
  ]

  popup(editBox)
}

// event handlers for edit-button
$("#editLabel").click(() => {
  toggleMenu()
  showLabelEdit(labelCopy, labelToEdit)
})

// NOT WORKING - why??? problem with the popup blocking click-events?
// $("#preview").click((e) => {
//   console.log
//   if ($("#colorsContainer").contains(e.target)) {
//     cl("COL")
//   } else {
//     cl("ICO")
//   }
// })

function updatePreview(change, type) {
  if (type == "color") {
    $("#preview").css({backgroundColor: change.style.backgroundColor})
  } else if (type == "icon") {
    $("#preview").css({backgroundImage: change.style.backgroundImage})
  }
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