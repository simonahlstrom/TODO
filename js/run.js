// move to run.js later
getColorsAndIcons()

getUserFromCookie()

$("#profileIcon").click(()=>{
    if(!settingFlag) {
        userSettings(user)
    } else {
        home()
        settingFlag = false
    }
})