// GENERAL FUNCTIONS
// info about user from cookies, logged in or not
let loggedIn = false

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

// handling login and welcome message
function init() {
  if (loggedIn) {
    // home()
  } else {
    let info = [
      $("<h2>Welcome!</h2>"),
      $("<div>Welcome to this app, it will do things to make your life easier. Here we'll explain exactly how it works and why it's amazing.</div>"),
      $("<div class='buttonContainer'>").append(
        $('<input type="button" value="Login" class="button">').click(() => {
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
    $('<input type="text" name="password" id="password">'),
    $('<label for="passwordControl">Repeat password: </label>'),
    $('<input type="text" name="passwordControl" id="passwordControl">'),
    $('<label for="occupation">(Optional) Occupation: </label>'),
    $('<input type="text" name="occupation" id="occupation">'),
    $('<input type="button" value="Submit" class="button">').click(() => {
      cl("ONE")
      if ($("#password").val() == $("#passwordControl").val()) {
        cl("TWO")
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
  ]

  popup(registerUI)
}

function login() {
  $("#login").click(() => {
    if ($("#username").val() && $("#password").val()) {
      $.get('login.php', {
        username: username,
        password: password
      })
      .done((data) => {
        data = JSON.parse(data)
        userId = data[0]

        if (userId) {
          // home()
        } else {
          let message = ["Login failed"]
          popup(message, timeout)
        }
      })
    }
  })
}

init()