export default class WebView {
    url = ""
    currentURL = ""
    settings = null
    webViewElement = null
    iframeElement = null
    activeCheck = null
    urlBar = null
    isActive = false

    idName = ""
    
    constructor(settings) {
        this.settings = settings
        this.url = this.settings.getHomePage()
    }

    setIDName(name) {
        this.idName = name
    }

    changeWebViewID(id) {
        this.idName = "webViewElement" + id
        this.webViewElement.id = this.idName
    }

    setURLBar(urlbar) {
        this.urlBar = urlbar
    }

    getID() {
        return this.idName
    }

    getURL() {
        return this.url
    }

    setWebViewElement(webviewelement) {
        this.webViewElement = webviewelement
    }

    setIFrameElement(iframeelement) {
        this.iframeElement = iframeelement
    }

    /**
     * Sets the web view link to another page
     * Incoming from url bar to web view
     * @param {string} url 
     */
    SetURL(url) {
        if (this.webViewElement != null) {
            this.webViewElement.src = this.formatURL(url)
            this.settings.addVisitedPage(url)
        }
    }

    formatURL(url) {
        console.log("URL", url);
        if (!url.includes("https://") && !url.includes("www") && !url.includes(".com")) {
            console.log("Does not include https:// www and .com")
            return `https://www.google.com/search?q=${url}`;
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

    /**
     * Checks if there are changes in the URL
     */
    checkURL() {
        this.activeCheck = setInterval(() => {
            if (this.currentURL != this.webViewElement.src) {
                console.log("current url", this.currentURL)
                console.log("src webview", this.webViewElement.src)
                this.currentURL = this.webViewElement.src
                console.log("current url - after", this.currentURL)
                this.settings.addVisitedPage(this.currentURL)
                this.urlBar.value = this.currentURL
            }
        }, 100)
    }

    /**
     * If the tab is no longer active and the web view is hidden then we don't need to check for changes in the URL
     */
    noMoreActive() {
        clearInterval(this.activeCheck)
    }

    setIFrameStyle() {
        this.iframeElement.style = "flex: 1 1 auto; width: 100%; height: 100%; border: 0px;"
    }

    changeActiveStatus() {
        this.isActive = !this.isActive
        if (!this.isActive) {
            this.webViewElement.classList.add("hide_web_view")
        } else {
            this.webViewElement.classList.remove("hide_web_view")
            this.urlBar.value = this.webViewElement.src    
        }
    }

    getActiveStatus() {
        return this.isActive
    }

    back() {
        if (this.webViewElement.canGoBack()) {
            this.webViewElement.goBack()
        } else {
            console.log("can not go back")
        }
    }

    forward() {
        if (this.webViewElement.canGoForward()) { 
            this.webViewElement.goForward()
        } else {
            console.log("can not go forward")
        }
    }

    refresh() {
        this.webViewElement.reload()
    }

    fullRefresh() {
        this.webViewElement.reloadIgnoringCache()
    }
}