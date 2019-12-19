// info about user from cookies, logged in or not
// loggedIn should contain userId from cookie, now set to true for developing

// let loggedIn = true
let timeout = true


// register functionality
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
      $('<input type="button" value="&#8617" class="button">').click(() => { popup(welcomeInfo)}),
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

// login functionality
function login() {
  let loginUI = [
    $('<label for="username">Username: </label>'),
    $('<input type="text" name="username" id="username">'),
    $('<label for="password">Password: </label>'),
    $('<input type="password" name="password" id="password">'),
    $("<div class='buttonContainer'>").append(
      $('<input type="button" value="&#8617" class="button">').click(() => { popup(welcomeInfo)}),
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

function logout() {
  updateCookie("", "", 0)
  location.reload()
}