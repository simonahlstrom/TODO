getUserFromCookie()

$("#profileIcon").click(()=>{
    if(!settingFlag) {
        userSettings(user)
    } else {
        home()
        settingFlag = false
    }
})