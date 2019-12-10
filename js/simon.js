// GENERAL FUNCTIONS

let loggedIn = // info about user from cookies, logged in or not

// create a popup to be removed with external clickevent or timeout if the timeout parameter is passed
function popup(message, timeout) {
  let pop = $('#popup')
  for (let item of message) {
    pop.append(item)
  }
  pop.classList.toggle('active')

  if (timeout) {
    setTimeout(() => {
      pop.classList.toggle('active')
    }, 1000)
  }
}

// handling login and welcome message
window.onload(() => {
  if (loggedIn) {
    // home()
  } else {
    let info = [
      $("<div>Welcome!</div>"),
      $("<div>Welcome to this app, it will do things to make your life easier. Here we'll explain exactly how it works and why it's amazing.</div>"),
      $('input type=button value=Login').click(() => {
        // login()
      }),
      $('input type=button value=Register').click(() => {
        // register()
      })
    ]
    popup(info)
  }
})

function register() {
  let username = $("#username").val()
  let email = $("#email").val()
  let password = $("#password").val()
  let occupation = $("#occupation").val()
  $("#register").click(() => {
    $.get('register.php', {
      username: username,
      email: email,
      password: password,
      occupation: occupation
    })
    .done((data) => {
      data = JSON.parse(data)
      userId = data
      home()
    })
  })
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
          home()
        } else {
          let message = ["Login failed"]
          popup(message, timeout)
        }
      })
    }
  })
}