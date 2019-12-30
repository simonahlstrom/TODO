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
      colorDivs.append($("<div></div>").css({'background-color': color.rgb}).addClass('labelOption'))
    }
    for (let icon of data[1]) {
      icons.push(icon.url)
      iconDivs.append($("<div></div>").css({'background-image': `url(icons/labels/${icon.url})`}).addClass('labelOption'))
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
function showLabelEdit() {
  let editBox = [
    $("<div class='Container flex'></div>").append(
      $("<div class='flex' id='preview'></div>"),
      $("<div class='flex button' id='colors'>Colors</div>"),
      $("<div class='flex button' id='icons'>Icons</div>")
    ),
    colorDivs,
    iconDivs,
    $("<div class='button' id='save'>Save</div>")
  ]

  popup(editBox)
}

// event handlers for edit-button
$("#editLabel").click(() => {
  toggleMenu()
  showLabelEdit()
})

// NOT WORKING - why??? problem with the popup blocking click-events?
$("#preview").click((e) => {
  cl("IN")
  if ($("#colorsContainer").contains(e.target)) {
    cl("COL")
  } else {
    cl("ICO")
  }
})

// // hold event
$(document).ready(function() {
  let i = 0, timeOut = 0
  
  $('ELEMENT').on('mousedown touchstart', function(e) {
    console.log("START")
    
    timeOut = setInterval(function(){
      console.log(i++)
    }, 100)
  }).bind('mouseup mouseleave touchend', function() {
    console.log("END")

    if (i == X) {
      //do stuff
    }

    i = 0
    clearInterval(timeOut)
  })
})