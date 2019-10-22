const {Builder, By, Key , until} = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

class SeleniumInfra{
    constructor(){
        this.driver = new Builder().forBrowser(`chrome`).build()
    }
    async getURL(URL){ // opens the driver
        await this.driver.get(URL)
        await this.driver.wait(until.urlIs(URL),5000)
    };
    async sleep(num){
        await this.driver.sleep(num)
    }

    async close(){ // Close browser
        setTimeout(()=>{
            this.driver.quit()
        }, 1000)
    }
    // validates the URL of the page name
    async validURL(input){
        if(this.driver.wait(until.urlContains(input),10000)){
            console.log(`${input} is the Right URL`)
            return true
            }
            else{
                console.log("this is the WRONG URL")
                return false
            }
        }

        //  clickes on the given element
        async clickElement(locatorType, locatorValue, element, fromElement) {
            try {
                await this.driver.wait(until.elementIsVisible(this.driver.findElement(By[locatorType](locatorValue))), 5000)
                if (!element) {
                    if (fromElement) {
                        element = await fromElement.findElement(By[locatorType](locatorValue))
                    } else {
                        element = await this.driver.findElement(By[locatorType](locatorValue))
                    }
                }
                await element.click()
                console.log(`Clicked on element with ${locatorType} and value ${locatorValue}`)
            } catch (error) {
                console.error(`Got error while trying to click on element with ${locatorType} and value ${locatorValue}`)
            }
        }
    //  sends keys and writes the in the webpage
    async write(data, locatorType = "id", locatorValue = "", element, fromElement){
        try{
            if(!element){
                if(fromElement){
                    fromElement = await fromElement.findElement(By[locatorType](locatorValue))
                }
                else{
                    element = this.driver.findElement(By[locatorType](locatorValue))
                }

            }
            await element.sendKeys(data)
            console.log(`sent keys to element with ${locatorType} = ${locatorValue}`)

        }
        catch(error){
            console.error(`got an error trying to send keys to ${locatorType} = ${locatorValue}`)
        }
    }
    // find an element and returns beck text
    async getTextFromElement(locatorType = "id", locatorValue = "", element, fromElement){
        try{
            if(!element){
                if(fromElement){
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                    }
                    else{
                        element = await this.driver.findElement(By[locatorType](locatorValue))
                    }
                }
                console.log(`got text from element with ${locatorType} = ${locatorValue}`)
                return element.getText()
            }
            catch(error){
                console.error(`got an error while trying to get text from ${locatorType} = ${locatorValue}`)
            }
        }
        // finds an element (a text input) and clears its field
        async clearField(locatorType, locatorValue, element, fromElement){
            try{
            if(!element){
                if(fromElement){
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                }
                else{
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
                await element.clear()
                console.log(`cleared the field with ${locatorType} = ${locatorValue}`)
            }
        }
            catch(error){
                console.error(`got an error tying to clear the field with ${locatorType} = ${locatorValue}`)
            }
        }
        // a func to check rather an element exist or not (boolean)
        async isElementexists(locatorType, locatorValue){
            let element
            try{
                element = await this.driver.findElement(By[locatorType](locatorValue))
                return true
            }
            catch{
                return false
            }
        }
        //  finds an element
        async findElementBy(locatorType, locatorValue, fromElement){
            let element
            try{
                if(fromElement){
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                }
                else{
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
                console.log(`found an element with ${locatorType} = ${locatorValue}`)
                return element
            }
            catch(error){
                console.error(`got an error trying to find an elemnet by ${locatorType} = ${locatorValue}`)
            }
        }
        // finds an element list
        async findElementListBy(locatorType, locatorValue, fromElement = null) {
            let elementList = []
            try {
                if (fromElement) {
                    elementList = await fromElement.findElements(By[locatorType](locatorValue))
                }
                else {
                    elementList = await this.driver.findElements(By[locatorType](locatorValue))
                }
                console.log(`Find element with ${locatorType} = ${locatorValue} `)
                console.log(elementList);
                
                return elementList
            } catch{
                console.error(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
            }
        }
    
    
}

module.exports = SeleniumInfra