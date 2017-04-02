// Objct Page
// http://marmelab.com/blog/2016/04/19/e2e-testing-with-node-and-es6.html
// http://martinfowler.com/bliki/PageObject.html
// http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/

import webdriver from 'selenium-webdriver'
const { By, until, Key } = webdriver

class AccountPage {
  constructor(driver) {
    this.driver = driver
  }

  setDriver = (driver) => this.driver = driver

  navigate = (url) => this.driver.navigate().to( url )
  waitFor = ({query, time}) => this.driver.wait(until.elementLocated(
      By.js( (query) => document.querySelector(query), query)
    ), time)

  click = ({query}) => this.driver.findElement(
      By.js((query) => document.querySelector(query), query)
    ).click()

  buttonSubmitRegiterAccount = By.id('submitRegisterAccount')
  field = field => By.id(field)

  sendKeys = ({query, keys}) => this.driver.findElement(
      By.js( (query) => document.querySelector(query), query)
    ).sendKeys( keys )

  getBodyElement() {
    return this.driver.findElement( By.css("body") )
  }

  // Enter a keyDown by key code
  keyByCode = ({query, keyCode}) => this.driver.executeScript(
         (_query, _keyCode) => {
           var element = document.querySelector(_query)
           var e = new KeyboardEvent(
             "keydown",
             {
               bubbles : true,
               cancelable : true,
               // 13 enter
               // 32 space
               // 40 arroy down
               keyCode: _keyCode,
               // key : "Q",
               // char : "Q",
               shiftKey : true
             }
           );
           element.dispatchEvent(e);
         },
         query,
         keyCode
       )

  locationGoogleSDropdownSelector = async ({query, defaultLocation}) => {
    let element = await this.driver.findElement(
      By.js( (_query) => document.querySelector(_query), query)
    )
    let {x, y} = await element.getLocation()
    let {height} = await element.getSize()
    // Write value
    await this.sendKeys({query, keys: defaultLocation})
    // Focus element
    await this.driver.executeScript(
     (_query) => {
        var elemnt = document.querySelector(_query)
        elemnt.focus()
     },
     query
    )
    // Await by google api
    await new Promise((resolve, reject)=>setTimeout(()=>resolve(true), 500))
    // keyDown space
    await this.keyByCode({query, keyCode: 32})
    // click first dropdown element
    return this.driver.actions()
    .mouseMove(
     element,
     {x: 10, y: height + 10}  // pixel offset from top left
    )
    .click()
    .perform();
  }

  registerAccount( account ) {
    for (let field in account) {
      this.sendKeys({
        query: `input[placeholder=${field}]`,
        keys: account[field]
      })
    }
    return this.click({query: 'button[type=submit]'})
  }

  loginAccount( account ) {
    for (let field in account) {
      this.driver.findElement(By.id(field)).sendKeys(account[field]);
    }
    return this.click({query: '#loginForm input[type=submit]'})
  }
}

export default AccountPage
