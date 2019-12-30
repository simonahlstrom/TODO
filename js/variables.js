let user
let allLabels = []
let allTasks = []
let actions = []
let theme = []

//used after get all task and label data to control what will happen "home" is default
let proceed = "homeSetting"

//used for type of filtering tasks
// values include "urgent", "allAsc" (def), "allDec", "labelsABC" and "labels123"
let filter = "allAsc"

//used for editTask()
let editTaskButtons = ["Save", "Delete task", "Leave task", "Cancel"]
let editTaskButtonsNew = ["Save", "Add shared task", "Cancel"]
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
let archiveTasksAll = false //false is default true= both done and undone.

//toggle settings icon
let settingFlag = false


//pattern check for empty fields 
let pattern = /^[\s]{1,}$/

//fontsizes
let fontSizeArray = [{size: "12px", name: "Small"}, {size: "15px", name: "Medium"}, {size: "19px", name: "Large"}]


//test
let fonts = [
    'Kulim Park, sans-serif',
    'PT Sans, sans-serif',
    'Nunito, sans-serif',
    'PT Sans Narrow, sans-serif',
    'Dosis, sans-serif',
    'Lato, sans-serif',
    'Amaranth, sans-serif',
    'Boogaloo, cursive',
    'Mountains of Christmas, cursive',
    'Scada, sans-serif',
    'Average, serif',
    'Share, cursive',
    'Cabin Sketch, cursive',
    'Magra, sans-serif',
    'Oranienbaum, serif',
    'Do Hyeon, sans-serif',

]

function setFont(time) {
    let n = 0
    return setInterval(() => {
        $(":root").css({
            "--font1": fonts[n]
        })
        console.log("index: " + n + " fontName: " + fonts[n])
        if(n==fonts.length-1){
            n = 0
        } else {
            n++
        }
    }, time);

}

let holdIndex = 0
let timeOut = 0
let labelCopy
let labelToEdit
