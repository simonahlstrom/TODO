let user
let allLabels = []
let allTasks = []
let actions = []
let theme = []

//used after get all task and label data to control what will happen "home" is default
let proceed = "homeSetting"

//used for type of filtering tasks
// values include "urgent", "allAsc", "allDec", "labelsABC" and "labels123"
let filter = "allAsc"

//used for editTask()
let editTaskButtons = ["Save", "Delete", "Add shared task", "Leave task", "Cancel"]
let subtaskArray = []

//user in conjunction with popup
let welcomeInfo = [
    $("<h2>Welcome!</h2>"),
    $("<div>Welcome to this app, it will do things to make your life easier. Here we'll explain exactly how it works and why it's amazing.</div>"),
    $("<div class='buttonContainer'>").append(
        $('<input type="button" value="Log In" class="button">').click(() => {
        login()
    }),
    $('<input type="button" value="Register" class="button">').click(() => {
        register()
    }))
]

//home/filters
//toggles archived tasks 
let archiveTasks = 0
let archiveTasksAll = false



//test variables
let labels = ["Home", "Work", "School"]
