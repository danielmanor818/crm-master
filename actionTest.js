const BasePage = require(`./BasePage`);
const ClientsPage = require(`./ClientsPage`)
const ActionsPage = require(`./ActionsPage`)
const HomePage = require (`./HomePage`)

class ActionsPageTest{
    constructor(){
        this.selenium = new BasePage().selenium
        this.actionsPage = new ActionsPage(this.selenium)
        this.ClientsPage = new ClientsPage(this.selenium)
        this.homePage = new HomePage(this.selenium)
    }
    async addAndValidate(){
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClient("Daniel", "Manor", "Israel", "walter white", "Danielmanor5@gmail.com")
        // addes a new client with the given input
        await this.ClientsPage.navigateToClientsPage()
        await this.ClientsPage.validateClient("Email", "Danielmanor5@gmail.com")
        // vallidates the added by Email / full name in the client page//
    }
    async doubleAdd(){
        try{
            await this.actionsPage.navigateToActionsPage()
            await this.actionsPage.addNewClient("Daniel", "Manor", "Israel", "walter white", "Danielmanor5@gmail.com")
            // addes the input and clicks the "add" button //
            await this.selenium.sleep(3000)
            await this.selenium.clickElement("className", "add-client-btn")
            // clicks the "add" button the second time //
            await this.actionsPage.validatePopUp()
            await this.ClientsPage.navigateToClientsPage()
            await this.ClientsPage.searchClientBy("Name", "Daniel Manor")
            // we will search only by full name or email, beacuse we want to see if the client is uniq //
            await this.selenium.findElementListBy("className", "clientDetails")
            // returns an array of web elements, if the array is bigger than 1, the client is not uniq //
        }
        catch{
            console.error("got an error with doubleAdd()")
            
        }
    }
    async wrongUpDate(){
        await this.actionsPage.wrongUpDate("DanielManor", "FAKEOWNER", "FAK@EMAIL.COM","A")
    }
    

}
let actionsPageTest = new ActionsPageTest()
// actionsPageTest.addAndValidate()
actionsPageTest.doubleAdd()