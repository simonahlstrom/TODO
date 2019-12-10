function gatherData(userId) {
    //get info from
}


//Runs editTask with action to create new task
$('#add').click(function() {editTask("new")})

function cl(x) {
  console.log(x)
}

function error(jqXHR, textStatus, errorThrown) {
    console.log(textStatus)
    console.log(errorThrown)
  }


function getUserData(userId) {
    $.get("../php/getAllData.php", {userId: userId})
    .done((data)=>{
        cl(data)
        data = JSON.parse(data)
        cl(data)

    
    })
    .fail(error)
}

