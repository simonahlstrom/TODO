console.log("test php will run")
$.get('php/test.php')
.done((data)=>{
    console.log(data)
})
.fail(error)

getUserFromCookie()

$("#profileIcon").click(()=>{
    if(!settingFlag) {
        userSettings(user)
    } else {
        home()
        settingFlag = false
    }
})