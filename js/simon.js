// GENERAL FUNCTIONS

// create a popup to be removed with external clickevent or timeout if the timeout parameter is passed
function popup(message, timeout) {
  let pop = $('#popup')
  pop.empty()
  for (let item of message) {
    pop.append(item)
  }
  pop.addClass('active')

  if (timeout) {
    setTimeout(() => {
      pop.removeClass('active')
    }, 1000)
  }
}

function hidePopup() {
  $("#popup").removeClass("active")
}

// function to click buttons w/ enter-key, DOES NOT WORK YET, maybe fix later
// let buttons = $(".button")
// for (let button of buttons) {
//   button.addEventListener("keyup", (e) => {
//     if (e.keyCode === 13) {
//       button.click()
//     }
//   })
// }

// functionality for holding down mouse or finger

// The item (or items) to press and hold on
// function hold(items) {
//   let item = items
   
//   let timerID;
//   let counter = 0;
  
//   let pressHoldEvent = new CustomEvent("pressHold");
  
//   // Increase or decreae value to adjust how long
//   // one should keep pressing down before the pressHold
//   // event fires
//   let pressHoldDuration = 50;
  
//   // Listening for the mouse and touch events    
//   item.addEventListener("mousedown", pressingDown, false);
//   item.addEventListener("mouseup", notPressingDown, false);
//   item.addEventListener("mouseleave", notPressingDown, false);
  
//   item.addEventListener("touchstart", pressingDown, false);
//   item.addEventListener("touchend", notPressingDown, false);
  
//   // Listening for our custom pressHold event
//   item.addEventListener("pressHold", doSomething, false);
  
//   function pressingDown(e) {
//     // Start the timer
//     requestAnimationFrame(timer);
  
//     e.preventDefault();
  
//     console.log("Pressing!");
//   }
  
//   function notPressingDown(e) {
//     // Stop the timer
//     cancelAnimationFrame(timerID);
//     counter = 0;
  
//     console.log("Not pressing!");
//   }
  
//   //
//   // Runs at 60fps when you are pressing down
//   //
//   function timer() {
//     console.log("Timer tick!");
  
//     if (counter < pressHoldDuration) {
//       timerID = requestAnimationFrame(timer);
//       counter++;
//     } else {
//       console.log("Press threshold reached!");
//       item.dispatchEvent(pressHoldEvent);
//     }
//   }
  
//   function doSomething(e) {
//     console.log("pressHold event fired!");
//   }
// }
