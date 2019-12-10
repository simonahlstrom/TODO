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


    $.get("php/getAllTaskData.php", {userId: userId})
    .done((data)=>{
        data = JSON.parse(data)
        cl(data)
        //data[0] = array of subTaskobjects
        //data[1] = array of Taskobjects 

       
        for (let i=0; i<data[1].length; i++){
            let label
            for (let j=0; j<allLabels.length; j++){
                if (allLabels[j].taskIds.includes(data[1][i].taskId.toString())) {
                    label = allLabels[j]
                    console.log(label)
                } 
            }
            
            allTasks.push(new Task(data[1][i], label))

            for (let j=0; j<data[0].length; j++) {
                if (data[0][j].taskId == data[1][i].taskId) {
                    console.log()
                    allTasks[allTasks.length-1].subtasks.push(data[0][j])
                }

            }

           
        }

    })
    .fail(error)
}


Setup(2)