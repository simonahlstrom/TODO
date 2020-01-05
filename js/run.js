//global events
$('#add').click(function() {editTask("new")})
$('#mauLogo').click(function() {
    if(!mauFlag) {
        aboutPage()
    } else {
        home()
        mauFlag = false
    }
    
})
$("#profileIcon").click(()=>{
    if(!settingFlag) {
        userSettings(user)
    } else {
        home()
        settingFlag = false
    }
})
$("#todoLogo").click(()=>{
    home()
    toggleMenu("task", 0)   
})

// onload functions
getColorsAndIcons()

getUserFromCookie()
