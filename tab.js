import Settings from "./settings.js"

export default class Tab {
    settings = null
    tabElement = null
    isActive = false
    isChangeTabEventListenerActive = false
    id = -1
    name = ""
    statusClosed = false;
    closeEventListener=null;


    constructor(homeurl, id, settings) {
        this.settings = settings
        this.id = id;
        this.name = this.convertName(homeurl);
        this.setButtonCloseEventListener();
        this.isActive = true
    }

    changeTabID(newid) {
        this.id = newid
        this.tabElement.id = newid
    }

    changeTabName(url) {
        this.name = this.convertName(url);
        this.tabElement.children[0].innerText = this.name
    }

    setTabElement(elem) {
        console.log("Setting tab element", elem)
        this.tabElement = elem
        console.log("Elem is:", this.tabElement)
    }

    setTabActive() {
        this.changeTabActive()
        console.log("Checking for tab-container-active")
        if (this.tabElement.classList.contains("tab-container")) {
            console.log("Removing tab-container-active class from element")
            this.tabElement.classList.remove("tab-container")
        }
        this.tabElement.classList.add("tab-container-active")
        if (this.tabElement.children[0].classList.contains("tab-link")) {
            this.tabElement.children[0].classList.remove("tab-link")
        }

        this.tabElement.children[0].classList.add("tab-link-active")
    }

    setTabInactive() {
        this.changeTabActive()
        if (this.tabElement.classList.contains("tab-container-active")) {
            this.tabElement.classList.remove("tab-container-active")
        }
        this.tabElement.classList.add("tab-container")
        if (this.tabElement.children[0].classList.contains("tab-link-active")) {
            this.tabElement.children[0].classList.remove("tab-link-active")
        }

        this.tabElement.children[0].classList.add("tab-link")
    }

    convertName(url) {
        url = url.replaceAll("https://www.", "")
        url = url.replaceAll("http://www.", "")
        url = url.replaceAll(".com", "")
        url = url.replaceAll(".org", "")
        url = url.replaceAll(".net", "")
        url = url.split("/")
        url = url[0]
        console.log("Current url", url)
        let newURL = "";
        for (let i = 0 ; i < url.length ; i++) {
            if (i == 0) {
                newURL += url[i].toUpperCase()
            } else {
                newURL += url[i]
            }
        }
        console.log("New URL", newURL)
        return newURL
    }

    changeTabActive() {
        this.isActive = !this.isActive
    }

    getTabActivity() {
        return this.isActive
    }

    getHomePageURL() {
        return this.settings.getHomePage()
    }

    getTabID() {
        return this.id
    }

    getName() {
        return this.name;
    }

    getTabStatus() {
        return this.statusClosed;
    }

    isEventListenerSet() {
        return this.isChangeTabEventListenerActive
    }

    changeEventListener(val) {
        this.isChangeTabEventListenerActive = val;
    }

    setButtonCloseEventListener() {
        setTimeout(() => {
            this.closeEventListener = document.getElementById("close-btn-" + this.id).addEventListener("click", () => {
                console.log("AAAAAAAAAAAAAaaaa")
                this.statusClosed = true;
                removeEventListener("click", this.closeEventListener);
            })
        }, 2000)
    }

    // newPage(url) {
    //     if (this.currentURL != url) {
    //         this.back.push(this.currentURL);
    //         this.currentURL = url;
    //     }
    // }

    // back() {
    //     url = this.back.pop()
    //     this.forward.push(url)
    // }

    // forward() {
    //     url = this.forward.pop()
    //     this.back.push(url)
    // }

    // deleteTab() {
    //     this.forward = []
    //     this.back = []
    //     url = ""
    // }

}