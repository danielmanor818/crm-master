
class ActionsPage {
    constructor(selenium) {
        this.selenium = selenium
    }

    async navigateToActionsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/Actions")
        await this.selenium.validURL("Actions")
    }

    async addNewClient(fisrtName, lastName, country, owner, email) {
      try{
        await this.selenium.write(fisrtName, "id", "firstName")
        await this.selenium.write(lastName, "id", "lastName")
        await this.selenium.write(country, "id", "country")
        await this.selenium.write(owner, "xpath", '/html/body/div/div/div[4]/div[2]/div[2]/table/tr[4]/th[2]/input')
        await this.selenium.write(email, "id", "email")
        await this.selenium.sleep(2000)
        await this.selenium.clickElement("className", "add-client-btn")
        await this.validatePopUp()
      }
      catch{
          console.error("got an error with addNewClient");
          
      }
      

    }
    async wrongUpDate(wrongName, newOwner, emailType){
        try{
            await this.selenium.write(wrongName, "xpath", "/html/body/div/div/div[4]/div[1]/table/div/input")
            // takes wrong info, the idea is to insert  but its a string it can be anything //
            await this.selenium.write(newOwner, "xpath", "/html/body/div/div/div[4]/div[1]/table/table/tr[1]/th[2]/input")
            await this.selenium.write(emailType, "xpath", "/html/body/div/div/div[4]/div[1]/table/table/tr[2]/th[2]/input")
            await this.selenium.clickElement("xpath", "/html/body/div/div/div[4]/div[1]/table/table/tr[1]/th[3]/input")
            await this.validatePopUp()
            await this.selenium.clickElement("xpath", "/html/body/div/div/div[4]/div[1]/table/table/tr[2]/th[3]/input")
            await this.validatePopUp()
            await this.selenium.clickElement("xpath", "/html/body/div/div/div[4]/div[1]/table/table/tr[3]/th[2]/input")
            await this.validatePopUp()
            // the validation of the popups shows if the nagative test work or failed //
        }
        catch{
            console.error("got an error with wrongUpDate()");
            
        }
    }
        async validatePopUp(){
            try{
                let popUp = await this.selenium.getTextFromElement("xpath", '//*[@id="root"]/div/div[4]/div[4]')
                    if(popUp === "SOME DETAILS ARE MISSING") {
                        console.log(`${popUp}`)
                    }
                    if(popUp === "UPDATE SUCCESSFUL") {
                        console.log(`${popUp}`)
                    }
            } catch(error) {
                    console.log(`Couldnt get the pop-up: ${error}`)
            }
        }
    }

module.exports = ActionsPage;
