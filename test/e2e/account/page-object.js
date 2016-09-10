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

  buttonSubmitRegiterAccount = By.id('submitRegisterAccount')
  field = field => By.id(field)

  sendKeys(field, keys) {
    return this.driver( this.field(field) ).sendKeys( keys )
  }

  navigate(url) {
    return this.driver.navigate().to( url )
  }

  getBodyElement() {
    return this.driver.findElement( By.css("body") )
  }

  registerAccount( account ) {
    for (let field in account) {
      this.driver.findElement(By.id(field)).sendKeys(account[field]);
    }
    return this.driver.findElement(By.id('submitRegisterAccount')).click();
  }

  loginAccount( account ) {
    for (let field in account) {
      this.driver.findElement(By.id(field)).sendKeys(account[field]);
    }
    return this.driver.findElement(By.id('submitLoginAccount')).click();
  }
}

export default AccountPage
