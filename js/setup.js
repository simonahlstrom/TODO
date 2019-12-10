//fetches user, places theme and all other data from DB (setupfunction after login)
function updateTheme(theme) {
    $(":root").css({
        "--maincolor": theme.mainColor,
        "--accentColor": theme.accentColor,
        "--subColor": theme.subColor,
    })
}

function Setup (userId) {
    $.get("php/getUserData.php", {userId: userId})
    .done((data)=>{
        data = JSON.parse(data)
        //puts user in global variable
        user = new User(data[0]) 

        //Updates themes from the user settings fetched from the db
        updateTheme(user.theme)

        getTaskAndLabelData(userId)
    })
    .fail(error)
}

//Fetches all data about Tasks Sub tasks and Labels
function getTaskAndLabelData(userId) {
    //varför börjar den ett steg upp i foldern?
    //hämtar data från DB

    
    //Fetches all labelData
    $.get("php/getAllLabelData.php", {userId: userId})
    .done((data)=>{
        
        data = JSON.parse(data)
        cl(data)

        for (let i=0; i<data[0].length; i++) {
            allLabels.push(new Label(data[0][i]))
            
            for (let j=0; j<data[1].length; j++) {  
                
                if(data[1][j].labelId == allLabels[allLabels.length-1].labelId) {
                    allLabels[allLabels.length-1].taskIds.push(data[1][j].taskId)
                }
            }

            
        }



    })
    .fail(error)


    // $.get("php/getAllTaskData.php", {userId: userId})
    // .done((data)=>{
    //     data = JSON.parse(data)
    //     cl(data)

    // })
    // .fail(error)
}


Setup(2)