function home(){
    $("#content").html("")
    if (allTasks.length >= 1) {

        //checks and arrange allTasks in order of the chosen filter

        if (filter == "allAsc") {
            allTasks = allTasks.sort((a, b) => (a.added < b.added) ? 1 : -1)
        } else if (filter == "allDec") {
            allTasks = allTasks.sort((a, b) => (a.added > b.added) ? 1 : -1)
        } else if (filter == "urgent") {
            allTasks.forEach(function(item){
                item.subDL()
            })

            //remove null in urgent
        
            allTasks = allTasks.sort((a, b) => (a.urgent > b.urgent) ? 1 : -1)
        } else if (filter == "labels123") {
            allTasks = allTasks.sort((a, b) => (a.label.labelId > b.label.labelId) ? 1 : -1)
        } else if (filter == "labelABC") {
            allTasks = allTasks.sort((a, b) => (a.label.labelName > b.label.labelName) ? 1 : -1)
            
        }

        console.log(filter + "-filter is on")
    
        for (let i=0; i<allTasks.length; i++){
    
            if((parseInt(allTasks[i].completedTask) == archiveTasks || archiveTasksAll) && parseInt(allTasks[i].label.activated)){
                createTaskElement(i)
            }
        }
    } else {
        popup(["Welcome " + user.username + "! <br> Create your first task by clicking on add symbol."], timeout)
        console.log("sign over add symbol?")
    }


}


//test function for label
function lab(o){
    $("#content").append(o.element)
}