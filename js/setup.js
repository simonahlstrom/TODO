//fetches user, places theme and all other data from DB (setupfunction after login)
function Setup (userId) {
    $.get("php/getUserData.php", {userId: userId})
    .done((data)=>{
        data = JSON.parse(data)
        user = new User(data[0]) 
        cl(user)



    })
    .fail(error)
}

//Fetches all data about Tasks Sub tasks and Labels
function getTaskAndLabelData(userId) {
    //varför börjar den ett steg upp i foldern?
    //hämtar data från DB

    $.get("php/getAllTaskData.php", {userId: userId})
    .done((data)=>{
        data = JSON.parse(data)
        cl(data)

    })
    .fail(error)
    
    //Fetches all data abour labels
    $.get("php/getAllLabelData.php", {userId: userId})
    .done((data)=>{
        data = JSON.parse(data)
        cl(data)

    })
    .fail(error)
}


Setup(2)