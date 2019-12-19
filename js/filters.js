//funtions that prepare and arrange tthe alltasks array to be displayed

//urgent arranges alltasks after the most urgent subTask of a task. 
//if no deadline exists urgent is null and is arranged first in the array
function filterUrgent() {
    allTasks.forEach(function(item){
        item.subDL()
    })

    allTasks = allTasks.sort((a, b) => (a.urgent > b.urgent) ? 1 : -1)

}