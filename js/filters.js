//funtions that prepare and arrange tthe alltasks array to be displayed

//urgent arranges alltasks after the most urgent subTask of a task. 
//if no deadline exists urgent is null and is arranged first in the array
function filterUrgent() {
    allTasks.forEach(function(item){
        item.subDL()
    })

    allTasks = allTasks.sort((a, b) => (a.urgent > b.urgent) ? 1 : -1)

}

function filterAll() {
    allTasks = allTasks.sort((a, b) => (a.added < b.added) ? 1 : -1)
}

function filterLabels(action) {

    if(action=="123") {
        allTasks = allTasks.sort((a, b) => (a.label.labelId > b.label.labelId) ? 1 : -1)
    } else if(action=="abc"){
        allTasks = allTasks.sort((a, b) => (a.label.labelName > b.label.labelName) ? 1 : -1)
    }

}

function home(){
    $("#content").html("")

    for (let i=0; i<allTasks.length; i++){
        console.log((parseInt(allTasks[i].completedTask) == archiveTasks || archiveTasksAll) && parseInt(allTasks[i].label.activated))

        if((parseInt(allTasks[i].completedTask) == archiveTasks || archiveTasksAll) && parseInt(allTasks[i].label.activated)){
            createTaskElement(i)
        }
    }
}


//test function for label
function lab(o){
    $("#content").append(o.element)
}