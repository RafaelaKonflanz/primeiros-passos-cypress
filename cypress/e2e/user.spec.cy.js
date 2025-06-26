import userData from '../fixtures/userData.json'

describe('orange hrm tests', () => {

    const selectorsList = {
      usernameField: "[name='username']",
      passwordField: "[name='password']",
      loginButton: "[type='submit']",
      sectionTitleTopBar: ".oxd-topbar-header-breadcrumb-module",
      dashboardGrid: ".orangehrm-dashboard-grid",
      wrongCredentialAlert: "[role='alert']",
      myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
      firstNameField: "[name='firstName']",
      lastNameField: "[name='lastName']",
      genericField: ".oxd-input--active",
      dateField: "[placeholder='yyyy-dd-mm']",
      dateCloseButton: ".--close",
      submitButton: "[type='submit']"
    }

  it.only('User Info Update - success ', () => {

    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid)
    cy.get(selectorsList.myInfoButton).click()
    cy.get(selectorsList.firstNameField).clear().type('FirstNameTest')
    cy.get(selectorsList.lastNameField).clear().type('LastNameTest')
    cy.get(':nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type('Employee')
    cy.get(selectorsList.genericField).eq(5).clear().type('OtherIdTest')
    cy.get(':nth-child(2) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type('DriverLice')
    cy.get(selectorsList.genericField).eq(7).clear().type('2025-06-29')
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.submitButton).eq(0).click()
    cy.get('body').should('contain','Successfully Updated')
    
  })
  it('Login Fail ', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })
})