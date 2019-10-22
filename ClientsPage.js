class ClientsPage {
    constructor(selenium) {
        this.selenium = selenium
    }

    async navigateToClientsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/client")
        await this.selenium.validURL("client")
    }
    async validateClient(searchBy, input) {
        try {
            await this.selenium.write(searchBy, "className", "select-css")
            // the search key, full name || Email address //
            await this.selenium.write(input, "xpath", "//input[@type='text']")
            // the clients info //
            if (await this.selenium.isElementexists("className", "clientDetails")) {
                console.log("client added and validated successfuly")
            }
            else {
                console.error("could not validate client");

            }
        }
        catch{
            console.error("got an error with validateClient()");

        }
    }
    async searchClientBy(searchBy, input) {
        try {
            await this.selenium.write(searchBy, "className", "select-css")
            // the search key, full name or Email address to validate clients, any other search key to get info //
            await this.selenium.write(input, "xpath", "//input[@type='text']")
            // the clients info //
        }
        catch{
            console.error("got an error with search client");

        }
    }

    async deleteClient(input, searchBy) {
        try {
            await this.selenium.write(searchBy, "className", "select-css")
            // the search key, full name || Email address //
            await this.selenium.write(input, "xpath", "//input[@type='text']")
            // the clients info //
            await this.selenium.clickElement("className", "clientDetails")
            // should be the only client, full name and Email address are uniq //
            await this.selenium.clickElement("className", "delete-client-popup-btn")
            await this.selenium.sleep(2000) // helps with synchronicity so that the element would be deleted before the second check //
            if (await this.selenium.isElementexists("className", "clientDetails") == false) {
                console.log("element was deleted successfuly")
                return true
                // 0 clients found? good job. the client was deleted //
            }
            else {
                console.log("element was NOT deleted");
                return false
            }
        }
        catch{
            console.error(`got an error with deleteClient()`);

        }
    }
    async upDateCountry(input, searchBy, newCountry) {
        try {
            await this.selenium.write(searchBy, "className", "select-css")
            await this.selenium.write(input, "xpath", "//input[@type='text']")
            await this.selenium.clickElement("className", "clientDetails")
            await this.selenium.clearField("id", "country")
            await this.selenium.write(newCountry, "id", "country")
            await this.selenium.clickElement("className", "update-client-popup-btn")
            await this.selenium.clickElement("className", "cancel-client-popup-btn")
            await this.selenium.sleep(2000)
            if (await this.selenium.getTextFromElement("xpath", '//*[@id="root"]/div/div[4]/table/tr[2]/th[3]') == newCountry)
            // compares the text from our clients coundry info and the input of the newCountry we entered //
            {
                console.log(`changed clients country to ${newCountry} successfuly`);
                return true
            }
            else {
                console.error(`did not up date country to ${newCountry}`)
                return false

            }
        }
        catch{
            console.error("got an error with upDateCountry()");

        }

    }
    async wrongSearchInfo(input, searchBy) {
        try {
            // * gets the correct Info about the client but makes the search with the wrong key * // 

            await this.selenium.write(searchBy, "className", "select-css")
            await this.selenium.write(input, "xpath", "//input[@type='text']")
            if (await this.selenium.isElementexists("className", "clientDetails")) {
                console.log("client exists and found");

            }
            else {
                console.error("client was not found");

            }
        }
        catch{
            console.error("got an error with isClientExistStability()");

        }
    }

    async validatePopUp() {
        try {
            let popUp = await this.selenium.getTextFromElement("xpath", '//*[@id="root"]/div/div[4]/div[5]')
            if (popUp === "SOME DETAILS ARE MISSING") {
                console.log(`${popUp}`)
            }
            if (popUp === "UPDATE SUCCESSFUL") {
                console.log(`${popUp}`)
            }
        } catch (error) {
            console.log(`Couldnt get the pop-up: ${error}`)
        }
    }
    async getInfoArr(searchBy, input) {
        try {
            await this.searchClientBy(searchBy, input)
            let infoArray = []
            let totalPages = await this.selenium.getTextFromElement("xpath", '/html/body/div/div/div[4]/div[3]/span[3]')
            console.log(totalPages)
            let multiplyBy13 = totalPages - 1
            console.log(multiplyBy13)
            let addLastPage = multiplyBy13 * 13
            console.log(addLastPage)
            for (let i = 1; i < totalPages; i++) {
                await this.selenium.clickElement("xpath", "/html/body/div/div/div[4]/div[3]/img[2]")
            }
            let lastPage = await this.selenium.findElementListBy("className", "clientDetails")
            infoArray.push(addLastPage)
            console.log(addLastPage)
            infoArray.push(lastPage)
            console.log(lastPage)
            console.log(infoArray)
        }

        catch{
            console.error("got an error with getinfoArr");

        }



    }

}
module.exports = ClientsPage;