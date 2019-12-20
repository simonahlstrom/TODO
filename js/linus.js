function shareTask(action, taskId, userId) {
    
    $.get("php/shareTask.php", {action: action, userId: userId, taskId: taskId})
    .done((data)=>{
        console.log(data)
    })
    .fail(error)
 
 
 
            // disable
    // enable
}