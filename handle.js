import View from "./view.js"
 
var view = null
var urlBar = null 
var tabList = null
var contextContainer = null
var addNewTab = null
var forwardButton = null
var backButton = null
var homePage = null
var refresh = null
var menuSection = null
var menuPopUp = null
var historyButton = null
var historyPopUp = null
var closeHistoryView = null

/**
 * Init important data
 */
function start() {
    urlBar = document.getElementById("url-bar")
    tabList = document.getElementById("tabs-list")
    backButton = document.getElementById("back-button")
    homePage = document.getElementById("home")
    refresh = document.getElementById("refresh-button")
    forwardButton = document.getElementById("forward-button")
    contextContainer = document.getElementById("context-container")
    menuSection = document.getElementById("menu")
    menuPopUp = document.getElementById("menu_popup")
    historyButton = document.getElementById('history')
    historyPopUp = document.getElementById("history_view")
    closeHistoryView = document.getElementById("close-history-view")
    // document.onkeydown = addKeyEventListener()
    view = new View(urlBar, tabList, contextContainer)
    addNewTab = document.getElementById("add-tab")
}

function addListener() {
    addNewTab.addEventListener("click", () => {
        view.addNew()
    })
    
    backButton.addEventListener("click", () => {
        view.backButton()
    })

    forwardButton.addEventListener("click", () => {
        view.forwardButton()
    })

    homePage.addEventListener("click", () => {
        view.goToHomePage()
    })

    refresh.addEventListener("click", () => {
        view.refreshPage()
    })

    menuSection.addEventListener("click", () => {
        if (menuPopUp.classList.contains('hide_popup')) {
            menuPopUp.classList.remove('hide_popup')
            menuPopUp.children[0].children[1].value = view.getHomePage()
        } else {
            view.setNewHomePage(menuPopUp.children[0].children[1].value)
            menuPopUp.classList.add('hide_popup')
        }
    })

    historyButton.addEventListener("click", () => {
        menuPopUp.classList.add('hide_popup')
        historyPopUp.classList.remove("hide_popup")
        let table = document.getElementById("history-table")
        let historyContent = view.getAllHistory()
        let tableRow = null
        let tableElement = null
        console.log("History is", historyContent)
        historyContent.forEach(element => {
            tableElement = document.createElement("td")
            tableElement.innerHTML = element
            tableRow = document.createElement("tr")
            tableRow.appendChild(tableElement)
            table.appendChild(tableRow)
        })
    })

    closeHistoryView.addEventListener("click", () => {
        historyPopUp.classList.add("hide_popup")
    })
}

function addKeyEventListener(event) {
    var keycode;
    if (window.event)
        keycode = window.event.keyCode;
    else if (event)
        keycode = event.which;

    console.log("Keycode", keycode, event)

    if (keycode == 116) {
        event.preventDefault()
        console.log("F5")
    }
    else if (event.ctrlKey && keycode == 82) {
        event.preventDefault()
        console.log("CTRL + R")
    }
}

// function tabListener() {

//     var addTab = document.getElementById("add-tab")
//     var closeTab = document.getElementById("close-tab")
//     console.log("Add tab", addTab)
//     tabList = document.getElementById("tabs-list")
//     addTab.addEventListener("click", () => {
//         console.log("Hehe I was clicked!")
//         // view.addNew()
//         AddTab()
//         // addWebView()
//     })

//     closeTab.addEventListener("click", (element) => {
//         console.log("Seriously you are closing me!?")
//         console.log("Element", element)
//     })
// }

start()
addListener()
// addKeyEventListener()