import Tab from "./tab.js"
import WebView from "./webviewcontroll.js"
import Setting from "./settings.js"

export default class View {

    TabList = []
    WebViewList = []
    ChangeTabIntervals = []
    changeTabIntervalsList = 0
    indexLists = -1
    totalListLenght = 0
    settings = new Setting()
    
    //Containers
    tabList = null
    urlBar = null
    contextContainer = null

    //elements
    divContainer = null
    divName = null
    button = null
    span = null
    webview = null
    idName = ""

    /**
     * Contructor for the View file
     * @param {url-bar html element} urlbar 
     * @param {tab-list html element} tablist 
     * @param {context-container html element} contextContainer 
     */
    constructor(urlbar, tablist, contextContainer){
        //Setting up containers
        this.tabList = tablist
        this.urlBar = urlbar
        this.contextContainer = contextContainer

        //Adding new Tab and Webview
        this.indexLists = 0
        this.totalListLenght = 1
        this.addNew()

        //Setting up URL
        this.urlBar.value = this.settings.getHomePage()
        this.urlBarEnterClick()
    }

    addNew(){
        console.log(this.totalListLenght)
        if (this.totalListLenght >= 2) {
            console.log("Changing tab")
            
            for (let i = 0 ; i < this.totalListLenght - 1 ; i++) {
                if (this.WebViewList[i].getActiveStatus()) {
                    console.log("Changing webview active status")
                    this.WebViewList[i].changeActiveStatus()
                }

                if (this.TabList[i].getTabActivity()) {
                    console.log("Changing tab active status")
                    this.TabList[i].setTabInactive()
                }
            }
        }
        this.addTab()
        this.addTabHTML()
        
        this.addWebView()
        this.addWebViewHTML()
        
        this.WebViewList[this.indexLists].checkURL()
        this.increseIndex()
        this.watchCloseButtons()
        this.tabClickListeners()
    }

    delete(index){
        // console.log("Before delete - Webview", this.WebViewList)
        // console.log("Before delete - TabList", this.TabList)
        //Removing the event listener
        document.getElementById(this.TabList[index - 1].getTabID()).removeEventListener("click", this.ChangeTabIntervals[index-1])
        this.changeTabIntervalsList--
        delete this.TabList[index - 1]
        this.removeTabHTML(index)
        delete this.WebViewList[index - 1]
        this.removeWebViewHTML(index)
        // console.log("Pre delete - Webview", this.WebViewList)
        // console.log("Pre delete - TabList", this.TabList)

        this.TabList.splice(index - 1, 1)
        this.WebViewList.splice(index - 1, 1)
        console.log("Tab intervals", this.ChangeTabIntervals)
        this.ChangeTabIntervals.splice(index - 1, 1)
        console.log("Tab intervals after slice", this.ChangeTabIntervals)
        // console.log("After delete - Webview", this.WebViewList)
        // console.log("After delete - TabList", this.TabList)
        // // this.ChangeTabIntervals[this.changeTabIntervalsList++].push(elem)
        this.decreseIndex()
        this.reformatIntervals(index - 1)
    }

    reformatIntervals(index) {
        console.log("In reformat intervals")
        console.log("Index is:", index)
        console.log("Total list lenght:", this.totalListLenght)
        for (let i = index ; i < this.totalListLenght - 1; i++) {
            console.log("index", i)
            document.getElementById(this.TabList[index].getTabID()).removeEventListener("click", this.ChangeTabIntervals[i])
            document.getElementById(this.TabList[i].getTabID()).id = i+1 
            this.TabList[i].changeTabID(i+1)
            console.log(this.WebViewList)
            // console.log("WEBVIEW ID:", this.WebViewList[i].getID())
            // console.log("New ID: webViewElement" + i)
            // console.log("ELEMEMT", document.getElementById(this.WebViewList[i].getID()))
            // console.log("id", document.getElementById(this.WebViewList[i].getID()).id)
            let newID = "webViewElement" + i
            // console.log("NEWID", newID)
            document.getElementById(document.getElementById(this.WebViewList[i].getID()).id).id = newID
            this.WebViewList[i].changeWebViewID(i)
            this.TabList[i].changeEventListener(false);
            if (i == index) {
                this.TabList[i].setTabActive()
                this.WebViewList[i].changeActiveStatus()
            }
        }

        if (index === this.totalListLenght - 1) {
            this.TabList[index - 1].setTabActive()
            this.WebViewList[index - 1].changeActiveStatus()
        }

        this.tabClickListeners()
    }

    removeTabHTML(id) {
        let element = document.getElementById(id)
        console.log("Element tab:", element)
        if (element != undefined) {
            this.tabList.removeChild(element)
        }
    }

    removeWebViewHTML(id){
        let ourID = "webViewElement" + (id - 1)
        console.log(ourID)
        let element = document.getElementById(ourID)
        console.log("ID", id)
        console.log(element)
        if (element != undefined) {
            this.contextContainer.removeChild(element)
        }
    }
    
    addTab(){
        this.TabList.push(new Tab(this.settings.getHomePage(), this.totalListLenght))
    }

    addWebView(){
        this.WebViewList.push(new WebView(this.settings))
    }

    addTabHTML() {
        this.divContainer = document.createElement("div");
        this.divContainer.id = this.totalListLenght;
        this.divContainer.classList.add("tab-container-active");
        //creating div for the name
        this.divName = document.createElement("div");
        this.divName.classList.add("tab-link-active");
        this.divName.classList.add("tab-size");
        this.divName.id = "tab-" + this.totalListLenght;
        this.divName.innerText = this.TabList[this.indexLists].getName();
        //creating close button
        this.button = document.createElement("button");
        this.button.id = "close-btn-" + this.totalListLenght;
        this.button.className = "close-btn";
        //creating content for close button
        this.span = document.createElement("span");
        this.span.ariaHidden = false;
        this.span.innerText = "x";
        //appending span to button
        this.button.appendChild(this.span);
        //appending name and button to the div container
        this.divContainer.appendChild(this.divName);
        this.divContainer.appendChild(this.button); 
        this.TabList[this.indexLists].setTabElement(this.divContainer)
        //appending container to tablist
        this.tabList.appendChild(this.divContainer);
        this.clearMemoryTab();
    }

    addWebViewHTML() {
        this.webview = document.createElement("webview")
        this.idName = "webViewElement" + this.indexLists
        this.webview.id = this.idName
        this.webview.classList.add("webview_context")
        this.WebViewList[this.indexLists].setURLBar(this.urlBar)
        this.WebViewList[this.indexLists].setIDName(this.idName)
        this.WebViewList[this.indexLists].setIFrameElement(this.webview.shadowRoot.children[1])
        this.WebViewList[this.indexLists].setWebViewElement(this.webview)
        this.WebViewList[this.indexLists].setIFrameStyle()
        this.WebViewList[this.indexLists].SetURL(this.settings.getHomePage())
        this.WebViewList[this.indexLists].changeActiveStatus()
        this.contextContainer.appendChild(this.webview)
        this.clearMemoryWebView()
    }

    clearMemoryTab() {
        this.divContainer = null
        this.button = null
        this.divName = null
        this.span = null
    }

    clearMemoryWebView() {
        this.webview = null
        this.idName = ""
    }
    
    changeActiveTab(newActiveTabID){
        for (let i = 0 ; i < this.TabList.length ; i++) {
            if(this.TabList[i].getTabActivity()) {
                let id = this.TabList[i].getTabID()
                let element = document.getElementById(id)
                element.className = "tab-container"
                this.TabList[i].changeTabActive()
                this.WebViewList[i].changeActiveStatus()
                break;   
            }
        }
        document.getElementById(newActiveTabID).className = "tab-container-active"
        console.log(newActiveTabID)
        this.WebViewList[newActiveTabID - 1].changeActiveStatus()
    }

    watchCloseButtons() {
        setInterval(() => {
            for(let i = 0 ; i < this.totalListLenght - 1 ; i++) {
                // console.log(this.TabList[i])
                // console.log(this.TabList[i].getTabStatus())
                if (this.TabList[i].getTabStatus()) {
                    // console.log("getting id");
                    console.log("ID", this.TabList[i].getTabID())
                    // let id = this.TabList[i].getTabID()
                    this.delete(this.TabList[i].getTabID())
                }
            }
        }, 500)
    }

    tabClickListeners() {
        for(let i = 0 ; i < this.TabList.length ; i++) {
            if (!this.TabList[i].isEventListenerSet()) {
                this.TabList[i].changeEventListener(true);
                this.ChangeTabIntervals.push(document.getElementById(this.TabList[i].getTabID()).addEventListener("click", () => {
                    console.log("CHANGING TAB", this.TabList[i].getTabID());
                    for (let index = 0 ; this.totalListLenght - 1 ; index++) {
                        console.log(this.TabList[index])
                        if (this.TabList[index].getTabActivity()) {
                            this.TabList[index].setTabInactive();
                            this.WebViewList[index].changeActiveStatus()
                            break;
                        }
                    }
                    this.TabList[i].setTabActive()
                    this.WebViewList[i].changeActiveStatus()
                }))
                this.changeTabIntervalsList++
                console.log("Changed tab interval array" ,this.ChangeTabIntervals)
                console.log("Changed tab interval array - 0" ,this.ChangeTabIntervals[0])
            }
        }
    }

    urlBarEnterClick() {
        this.urlBar.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                console.log("CLICKKED ENTER")
                event.preventDefault();
                this.WebViewList.forEach(element => {
                    if (element.getActiveStatus()) {
                        element.SetURL(this.urlBar.value)
                    }
                })
            }
        })
    }

    backButton() {
        this.WebViewList.forEach(element => {
            if(element.getActiveStatus()) {
                element.back()
            }
        })
    }

    forwardButton() {
        this.WebViewList.forEach(element => {
            if(element.getActiveStatus()) {
                element.forward()
            }
        })
    }

    goToHomePage() {
        this.WebViewList.forEach(element => {
            if(element.getActiveStatus()) {
                element.SetURL(this.settings.getHomePage())
            }
        })
    }

    getHomePage() {
        let homePage = this.settings.getHomePage().replaceAll("https://", "")
        console.log("Home Page", homePage)
        return homePage
    }

    setNewHomePage(homePage) {
        homePage = `https://${homePage}`
        homePage = this.formatURL(homePage)
        if (this.settings.getHomePage() !== homePage) {
            this.settings.changeHomePageURL(homePage)
        }
    }

    formatURL(url) {
        console.log("URL", url);
        if (!url.includes("www") && !url.includes("https://") && !url.includes('.com')) {
            console.log("Does not include https:// and www")
            return `https://www.${url}.com`;
        }
        
        if (!url.includes("www") && !url.includes("https://")) {
            console.log("Does not include https:// and www")
            return `https://www.${url}`;
        }

        if (!url.includes("www") && url.includes("https://")) {
            console.log("Does not include www but includes https://")
            url = url.replaceAll("https//", "")
            return `https://www.${url}`;
        }

        if (url.includes("www") && !url.includes("https://")) {
            console.log("Does not include https:// but includes www")
            return `https://${url}`;
        }
        console.log("general return")
        return url;
    }

    refreshPage() {
        this.WebViewList.forEach(element => {
            if(element.getActiveStatus()) {
                element.refresh()
            }
        })
    }

    refreshWithoutCache() {
        this.WebViewList.forEach(element => {
            if(element.getActiveStatus()) {
                element.fullRefreshz()
            }
        })
    }

    openMenu() {
        console.log("Opening menu")
    }

    getAllHistory() {
        return this.settings.getHistory()
    }

    increseIndex() {
        this.indexLists++
        this.totalListLenght++
    }

    decreseIndex() {
        this.indexLists--
        this.totalListLenght--
    }

}