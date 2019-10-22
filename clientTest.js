const BasePage = require(`./BasePage`);
const ClientsPage = require(`./ClientsPage`)

class ClientsPageTest {
    constructor() {
        this.selenium = new BasePage().selenium
        this.clientsPage = new ClientsPage(this.selenium)
    }
    async clientTest() {
        await this.clientsPage.navigateToClientsPage();
        // await this.clientsPage.deleteClient("Daniel Manor", "Name")
        // await this.clientsPage.upDateCountry()
        // await this.clientsPage.wrongSearchInfo("DanielManor5@gmail.com", "Name")
        await this.clientsPage.getInfoArr("Sold", "No")
        await this.selenium.close()
    }

}

let clientPageTest = new ClientsPageTest();
clientPageTest.clientTest()


