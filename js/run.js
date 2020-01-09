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
$("#filter").click((event)=>{  
    toggleMenu("filter", 100)
    
  })
  
  $("#archive").click((event)=>{
    toggleMenu("archive", 100)
  })
  // show menu with labels
$('#home').click(() => {
    toggleMenu("label", 100)
  })

// onload functions
getColorsAndIcons()

getUserFromCookie()
