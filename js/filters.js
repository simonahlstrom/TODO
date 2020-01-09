function home(){
    $("#content").html("")
    if (allTasks.length >= 1) {

        //checks and arrange allTasks in order of the chosen filter

        if (filter == "all") {
            allTasks = allTasks.sort((a, b) => (a.added < b.added) ? 1 : -1)
        }  else if (filter == "urgent") {
            allTasks.forEach(function(item){
                item.subDL()
            })

            //remove null in urgent
            allTasks = allTasks.sort((a, b) => (a.urgent > b.urgent) ? 1 : -1)
        } else if (filter == "labelsABC") {
            allTasks = allTasks.sort((a, b) => (a.label.labelName > b.label.labelName) ? 1 : -1)
            
        } 
        //not in use (change in variable incase we use it)
        // else if (filter == "labels123") {
        //     allTasks = allTasks.sort((a, b) => (a.label.labelId > b.label.labelId) ? 1 : -1)
        // } 

        // console.log(filter + "-filter is on")
    
        for (let i=0; i<allTasks.length; i++){
    
            if((parseInt(allTasks[i].completedTask) == archiveTasks || archiveTasksAll) && parseInt(allTasks[i].label.activated)){
                if(filter != "urgent" || allTasks[i].urgent) {
                    createTaskElement(i)
                }
            }
        }
    } else {
        popup([
            "Welcome " + user.username + "! <br> Press the add symbol to create your first task.<br><br>In the user settings (the User Icon on the top) you can find more information about how you can use the app.", 
            $('<input type="button" value="Continue" class="button">').click(() => {
                hidePopup()
            })
        ])
    }


}


//test function for label
function lab(o){
    $("#content").append(o.element)
}