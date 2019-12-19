function updateCookie(user, password, q) {
    setCookie("username", user)
    setCookie("password", password)
    setCookie("loggedIn", q)
}

function setCookie(name, value) {
    var d = new Date();
    cl(d)

    document.cookie = name + "=" + value + ";path=/";
}

function getUserFromCookie() {
    let c = document.cookie.split(";")
    let user
    let pass
    let loggedIn
    let pattern = /[\s]/
    console.log(c)


    c.forEach(function(item){
        let name = item.slice(0, item.indexOf("="))
        name = name.replace(pattern, "")
        console.log(name)


        if(name == "username"){
            user = item.slice(item.indexOf("=")+1, item.length)
        } else if (name == "password") {
            pass = item.slice(item.indexOf("=")+1, item.length)
        } else {
            loggedIn = item.slice(item.indexOf("=")+1, item.length)
        }
    })

    console.log(user, pass, loggedIn)

    if(parseInt(loggedIn)){
        $.get('php/login.php', { username: user, password: pass })
        .done(function(data) {
            JSON.parse(data)
            console.log(data)
            if(data[0].userId) {
                setup(data[0].userId)
            }
        })
    } else {
        //redirect to login
    }


}




