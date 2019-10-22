const BasePage = require(`./BasePage`);
const ClientsPage = require(`./ClientsPage`)
const ActionsPage = require(`./ActionsPage`)
const HomePage = require(`./HomePage`)
const Analyticspage = require(`./AnalyticsPage`)

class AnalyticsTest {
    constructor() {
        this.selenium = new BasePage().selenium
        this.actionsPage = new ActionsPage(this.selenium)
        this.ClientsPage = new ClientsPage(this.selenium)
        this.homePage = new HomePage(this.selenium)
        this.analyticsPage = new Analyticspage(this.selenium)
    }
    async isEmailSent(){
        await this.analyticsPage.navigateToAnalyticsPage()
        await this.analyticsPage.getEmailNum()
        //  gets the number of emails sent (before we run the test)
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClient("Daniel", "Manor", "Israel", "walter white", "Danielmanor5@gmail.com")
        //  addes an new client, so by default he has no emails sent yet
        await this.selenium.write("Daniel Manor", "xpath", "/html/body/div/div/div[4]/div[1]/table/div/input")
        await this.analyticsPage.changeEmailType("A") // can change to "A" / "B" / "C" / "D" //
        // up dates the new user and sends the email //
        await this.selenium.sleep(1000)
        await this.selenium.clickElement("xpath", '//*[@id="change-email-type"]/th[3]/input')
        await this.actionsPage.validatePopUp()
        // logs if the Email up date worked  || or failed // 
        await this.analyticsPage.navigateToAnalyticsPage()
        await this.analyticsPage.getEmailNum()
        // get the number of emails sent after the test and logs it //
    }
    async isOutstandingClientsCorrect(getInfoArr){
        await this.analyticsPage.navigateToAnalyticsPage()
       let displayedNumber = await this.selenium.getTextFromElement("xpath", '/html/body/div/div/div[4]/div[1]/div[3]/div[1]')
       console.log(displayedNumber)
       if(displayedNumber)
       await this.clientsPage.getInfoArr("Sold", "No")
        
    }

}
 
let analyticsTest = new AnalyticsTest()
analyticsTest.isEmailSent()