// GENERAL FUNCTIONS
// info about user from cookies, logged in or not
let loggedIn = true
let timeout = true

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
      pop.toggleClass('active')
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

// handling login and welcome message
function init() {
  if (loggedIn) {
    // home()
  } else {
    let info = [
      $("<h2>Welcome!</h2>"),
      $("<div>Welcome to this app, it will do things to make your life easier. Here we'll explain exactly how it works and why it's amazing.</div>"),
      $("<div class='buttonContainer'>").append(
        $('<input type="button" value="Log In" class="button">').click(() => {
        login()
      }),
      $('<input type="button" value="Register" class="button">').click(() => {
        register()
      }))
    ]
    popup(info)
  }
}

function register() {
  let registerUI = [
    $('<label for="username">Username: </label>'),
    $('<input type="text" name="username" id="username">'),
    $('<label for="email">E-mail: </label>'),
    $('<input type="text" name="email" id="email">'),
    $('<label for="password">Password: </label>'),
    $('<input type="password" name="password" id="password">'),
    $('<label for="passwordControl">Repeat password: </label>'),
    $('<input type="password" name="passwordControl" id="passwordControl">'),
    $('<label for="occupation">(Optional) Occupation: </label>'),
    $('<input type="text" name="occupation" id="occupation">'),
    $("<div class='buttonContainer'>").append(
      $('<input type="button" value="&#8617" class="button">').click(() => { init()}),
      $('<input type="button" value="Submit" class="button">').click(() => {
        if ($("#password").val() == $("#passwordControl").val()) {
          let username = $("#username").val()
          let email = $("#email").val()
          let password = $("#password").val()
          let occupation = $("#occupation").val()
  
          $.get('php/register.php', {
            username: username,
            email: email,
            password: password,
            occupation: occupation
          })
          .done((data) => {
            data = JSON.parse(data)
            userdata = data
            hidePopup()
            $.get('php/add.php', userdata[0])
            .done((data) => {
              setup(data)
            })
            .fail((error) => {
              cl(error)
            })
            // home()
          })
          .fail((error) => {
            cl(error)
          })
        } else {
          $("#popup").append($("<p>Passwords don't match</p>"))
        }
      })
    ),
  ]

  popup(registerUI)
}

function login() {
  let loginUI = [
    $('<label for="username">Username: </label>'),
    $('<input type="text" name="username" id="username">'),
    $('<label for="password">Password: </label>'),
    $('<input type="password" name="password" id="password">'),
    $("<div class='buttonContainer'>").append(
      $('<input type="button" value="&#8617" class="button">').click(() => { init()}),
      $('<input type="button" value="Log In" class="button">').click(() => {
        if ($("#username").val() && $("#password").val()) {
          let username = $("#username").val()
          let password = $("#password").val()
          $.get('php/login.php', {
            username: username,
            password: password
          })
          .done((data) => {
            data = JSON.parse(data)
            console.log(data)
    
            if (data[0] != undefined) {
              setup(data[0].userId)
              hidePopup()
            } else {
              $("#popup").append($("<p>Username and password does not match</p>"))
              setTimeout(() => {
                $("#popup p").remove()
              }, 2000)
            }
          })
          .fail((error) => {
            cl(error)
          })
        } else {
          $("#popup").append($("<p>Please fill in both fields</p>"))
          setTimeout(() => {
            $("#popup p").remove()
          }, 2000)
        }
    }))
  ]

  popup(loginUI)
}

init()
setup(2)