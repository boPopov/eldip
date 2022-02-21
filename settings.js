export default class Settings {
    homePage = "https://www.google.com"
    history = []
    
    constructor() {}

    getHomePage() {
        return this.homePage
    }

    changeHomePageURL(newHomePage) {
        this.homePage = newHomePage
    }

    addVisitedPage(page) {
        this.history.push(page)
    }

    getHistory() {
        return this.history
    }
}