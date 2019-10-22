
const SeleniumInfra = require("./SeleniumInfra");

class BasePage {
  constructor() {
    this.selenium = new SeleniumInfra();
  }
  async navigateToClientPage() {
    await this.selenium.getURL("https://lh-crm.herokuapp.com/client")
    await this.selenium.validURL("client")
  }
  async navigateToActionsPage() {
    await this.selenium.getURL("https://lh-crm.herokuapp.com/Actions")
    await this.selenium.validURL("Actions")
  }
  async navigateToAnalyticsPage() {
    await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
    await this.selenium.validURL("analytics")
  }
}

module.exports = BasePage;
