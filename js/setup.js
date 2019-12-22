//fetches user, places theme and all other data from DB (setupfunction after login)
function updateTheme(theme) {
    $(":root").css({
        "--maincolor": theme.mainColor,
        "--accentColor": theme.accentColor,
        "--subColor": theme.subColor,
    })
}

function setup (userId) {
    $.get("php/getUserData.php", {userId: userId})
    .done((data)=>{
        data = JSON.parse(data)
        //puts user in global variable
        user = new User(data[0]) 
        //updatesCookie
        updateCookie(data[0].username, data[0].password, "1")
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
        allLabels = []

        for (let i=0; i<data[0].length; i++) {
            allLabels.push(new Label(data[0][i]))
            
            for (let j=0; j<data[1].length; j++) {  
                
                if(data[1][j].labelId == allLabels[allLabels.length-1].labelId) {
                    allLabels[allLabels.length-1].taskIds.push(data[1][j].taskId)
                }
            }  
        }

        $.get("php/getAllTaskData.php", {userId: userId})
        .done((data)=>{
            data = JSON.parse(data)
            //data[0] = array of subTaskobjects
            //data[1] = array of Taskobjects
            allTasks = []

        //puts the right labelObject in the taskobject
            for (let i=0; i<data[1].length; i++) {
                let label
                let taskMembers

                for (let j=0; j<allLabels.length; j++){
                    if (allLabels[j].taskIds.includes(data[1][i].taskId.toString())) {
                        label = allLabels[j]
                    } 
                }

                //adds the task into allTask-array
                allTasks.push(new Task(data[1][i], label))
                let taskId = allTasks[allTasks.length-1].taskId

                //get index for a specifictask to be used in proceed
                if(allTasks[allTasks.length-1].shareCode == proceed) {
                    proceed = allTasks.length-1
                    console.log("proceed changed to: " + proceed)
                }

                //puts the tasks subtasks in in the subtaskproperty
                for (let j=0; j<data[0].length; j++) {
                    if (data[0][j].taskId == data[1][i].taskId) {
                        allTasks[allTasks.length-1].subtasks.push(data[0][j])
                    }

                }

                //puts Taskmembers into the task
                $.get('php/getSharedData.php', {taskId: taskId})
                .done(function(data){
                    taskMembers = JSON.parse(data)
                    //need to check this because of DB delay and filter ordering allTasks
                    for(k=0; k<allTasks.length; k++){
                        if(allTasks[k].taskId == taskId) {
                            allTasks[k].taskMembers = taskMembers
                        }
                    }

                    
                
                })
                .fail(error)
                
                
            }

            if (proceed == "homeSetting") {
                home()
            } else {
                editTask(proceed)
                proceed = "homeSetting"
            }
        })
        .fail(error)
    })
    .fail(error)




    

}

