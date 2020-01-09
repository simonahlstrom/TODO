//object arrays and object variables
let user
let allLabels = []
let allTasks = []
let actions = []
let theme = []

//used after get all task and label data to control what will happen "home" is default
let proceed = "homeSetting"

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


//MenyActions filters and Archive
//toggles archived tasks 
let archiveTasks = 0
let archiveTasksAll = true //false is default, true = both active and archived are shown.

//used for type of filtering tasks
// values include "urgent", "all" (def), "labelsABC" and "labels123"
let filter = "all"

//archive and filter meny
let filterArray = [
    {name: "All <br> Tasks", bgImg: "url(icons/funnel.png)", set: ()=>{filter = "all"; home(); toggleMenu("filter", 0)}},
    {name: "Urgent <br> Tasks", bgImg: "url(icons/funnel.png)", set: ()=>{filter = "urgent"; home(); toggleMenu("filter", 0)}},
    {name: "By <br> labels", bgImg: "url(icons/funnel.png)", set: ()=>{filter = "labelsABC"; home(); toggleMenu("filter", 0)}}

    //change filer.js incase we use it
    // {name: "Labels <br> 123", bgImg: "url(icons/funnel.png)", set: ()=>{filter = "labels123"; home(); toggleMenu("filter", 0)}}
]
let archiveArray = [
    {name: "Active Tasks", bgImg: "url(icons/folder.png)", set: ()=>{archiveTasks = 0; archiveTasksAll = false; home(); toggleMenu("archive", 0)}},
    {name: "Archived tasks", bgImg: "url(icons/folder.png)", set: ()=>{archiveTasks = 1; archiveTasksAll = false; home(); toggleMenu("archive", 0)}},
    {name: "Active & Archived", bgImg: "url(icons/folder.png)", set: ()=>{archiveTasksAll = true; home(); toggleMenu("archive", 0)}}
]

//Flags
//toggle settings icon
let settingFlag = false
let mauFlag = false
//flag to disable click on ghostDiv when now logged in
let ghostFlag = false

//pattern check for empty fields 
let pattern = /^[\s]{1,}$/

//fontsizes
let fontSizeArray = [{size: "12px", name: "Small"}, {size: "15px", name: "Medium"}, {size: "19px", name: "Large"}]

let holdIndex = 0
let timeOut = 0
let labelCopy
let labelToEdit
let edit = true
let create = true

// variables regarding colors and icons
let colors = []
let icons = []
let colorDivs
let iconDivs

let defaultLabel = $("<div></div>").css({
    "backgroundColor": colors[0],
    "backgroundImage": icons[0]
  })
  
  let defaultLabelCopy = document.createElement("div")
  defaultLabelCopy.style.backgroundColor = colors[0]
  defaultLabelCopy.style.backgroundImage = `url(icons/labels/default.png)`

let instructions = "Welcome to TODO! Here you'll find the utilities needed to help you structure your everyday life! The app is designed around the basis of personal labels, where you can add tasks that require doing, within those tasks you can also add subtasks if needed.<br><br>In the home menu, the buttons on the bottom of the screen are Labels - Filters - Archive and Add Task<br><br>1. When pressing labels you can turn on and off individual labels whether you want them displayed on the screen or not. You can also press hold on a label to be given the options to either edit or remove it.<br><br>2. The filter-button is designed to cycle through tasks, displaying them in certain orders. You can either choose to display all your tasks, the urgent ones that have a deadline (in descending order by date) or by labels.<br><br>3. In the archive you'll find active and archived (completed) tasks, or both at the same time, to give you an overview of your progress.<br><br>4. By clicking on the plus-button you'll be able to add new tasks, with corresponding subtasks. You can also give them a deadline if they're urgent to you. You can even share your tasks with friends! Enable sharing on a task and give them the generated code, and they'll be able to add your task to their profile with the import button. A fair warning though, if you'll remove a task you created it'll be removed for everybody who've imported them!<br><br>OK, now you're an expert, go on planning and stop missing deadlines!<br><br>Here´s a tip, add the app to your homescreen to get the full intended functionality. <br>Android: Click the settings button -> Add to homescreen <br>iOS: Click the share button -> Add to homescreen."