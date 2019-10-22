class AnalysticsPage{
    constructor(selenium){
        this.selenium = selenium
    }
    async navigateToAnalyticsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
        await this.selenium.validURL("analytics")
    }
    async getEmailNum(){
        await this.selenium.sleep(2000)
    let getEmailNum = await this.selenium.getTextFromElement("xpath", "/html/body/div/div/div[4]/div[1]/div[2]/div[1]")
        console.log(`the number of Emails sent is ${getEmailNum}`)
    }
    async changeEmailType(emailType){
        await this.selenium.write(emailType, "xpath", "/html/body/div/div/div[4]/div[1]/table/table/tr[2]/th[2]/input")
    }



}
module.exports = AnalysticsPage