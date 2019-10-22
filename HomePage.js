const BasePage = require(`./BasePage`)

class HomePage {
    constructor() {
        this.BasePage = BasePage
    }
    async navigateToHomePage() {
        await this.selenium.getURL(`https://lh-crm.herokuapp.com/`)
    }

    /*
    btn can be: 
    */
    async clickOnPage(btn) {
        await this.selenium.clickElement('css', `.nav-btn[value='${btn}'`)
        if (btn == "clients") {
            return await this.selenium.validURL("client")
        }
        return await this.selenium.validURL(btn)
    }
}
module.exports = HomePage