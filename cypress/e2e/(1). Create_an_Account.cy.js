const {page_object_manager} = require("../support/page_object_manager");

describe('Create an Account', () => {
  const pom = new page_object_manager();
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit(`${Cypress.config('baseUrl')}customer/account/create/`);
    cy.waitting();
  });

  it('Success Create an Account', () => {
    cy.create_new_acc();
  });

  it('Failed to Create Account with empty firstname field', () => {
    cy.waitting();
    cy.randomizer().then((randomData) => {
      cy.get(pom.reg_lastname).type(randomData.lastname);
      cy.get(pom.reg_email).type(randomData.email);
      cy.get(pom.reg_pass).type(randomData.password);
      cy.get(pom.reg_passConfirm).type(randomData.confirmpass);
      cy.get(pom.reg_createAcc_btn).click();
      cy.waitting();
      cy.get('#firstname-error')
      .should('be.visible')
      .and('contain', "This is a required field.");
    });
  });

  it('Failed to Create Account with empty lastname field', () => {
    cy.waitting();
    cy.randomizer().then((randomData) => {
      cy.get(pom.reg_firstname).type(randomData.firstname);
      cy.get(pom.reg_email).type(randomData.email);
      cy.get(pom.reg_pass).type(randomData.password);
      cy.get(pom.reg_passConfirm).type(randomData.confirmpass);
      cy.get(pom.reg_createAcc_btn).click();
      cy.waitting();
      cy.get('#lastname-error')
      .should('be.visible')
      .and('contain', "This is a required field.");
    });
  });

  it('Failed to Create Account with empty email field', () => {
    cy.waitting();
    cy.randomizer().then((randomData) => {
      cy.get(pom.reg_firstname).type(randomData.firstname);
      cy.get(pom.reg_lastname).type(randomData.lastname);
      cy.get(pom.reg_pass).type(randomData.password);
      cy.get(pom.reg_passConfirm).type(randomData.confirmpass);
      cy.get(pom.reg_createAcc_btn).click();
      cy.waitting();
      cy.get('#email_address-error')
      .should('be.visible')
      .and('contain', "This is a required field.");
    });
  });

  it('Failed to Create Account with invalid email format', () => {
    cy.waitting();
    cy.randomizer().then((randomData) => {
      cy.get(pom.reg_firstname).type(randomData.firstname);
      cy.get(pom.reg_lastname).type(randomData.lastname);
      cy.get(pom.reg_email).type(randomData.email.slice(0, -3));
      cy.get(pom.reg_pass).type(randomData.password);
      cy.get(pom.reg_passConfirm).type(randomData.confirmpass);
      cy.get(pom.reg_createAcc_btn).click();
      cy.waitting();
      cy.get('#email_address-error')
      .should('be.visible')
      .and('contain', "Please enter a valid email address")
    });
  });

  it('Failed to Create Account with empty password field', () => {
    cy.waitting();
    cy.randomizer().then((randomData) => {
      cy.get(pom.reg_firstname).type(randomData.firstname);
      cy.get(pom.reg_lastname).type(randomData.lastname);
      cy.get(pom.reg_email).type(randomData.email);
      cy.get(pom.reg_passConfirm).type(randomData.confirmpass);
      cy.get(pom.reg_createAcc_btn).click();
      cy.waitting();
      cy.get('#password-error')
      .should('be.visible')
      .and('contain', "This is a required field.");
    });
  });

  it('Failed to Create Account with password lesser than 8 symbols', () => {
    cy.waitting();
    cy.randomizer().then((randomData) => {
      cy.get(pom.reg_firstname).type(randomData.firstname);
      cy.get(pom.reg_lastname).type(randomData.lastname);
      cy.get(pom.reg_email).type(randomData.email);
      cy.get(pom.reg_pass).type(randomData.password.slice(0. -4));
      cy.get(pom.reg_passConfirm).type(randomData.confirmpass);
      cy.get(pom.reg_createAcc_btn).click();
      cy.waitting();
      cy.get('#password-error')
      .should('be.visible')
      .and('contain', "Minimum length of this field must be equal or greater than 8 symbols.")
    });
  });

  it('Failed to Create Account with greater than 8 symbols but same class', () => {
    cy.waitting();
    cy.randomizer().then((randomData) => {
      cy.get(pom.reg_firstname).type(randomData.firstname);
      cy.get(pom.reg_lastname).type(randomData.lastname);
      cy.get(pom.reg_email).type(randomData.email);
      cy.get(pom.reg_pass).type("ASDFasdf");
      cy.get(pom.reg_passConfirm).type(randomData.confirmpass);
      cy.get(pom.reg_createAcc_btn).click();
      cy.waitting();
      cy.get('#password-error')
      .should('be.visible')
      .and('contain', "Minimum of different classes of characters in password is 3. Classes of characters")
    });
  });

  it('Failed to Create Account with diffrent confirm password', () => {
    cy.waitting();
    cy.randomizer().then((randomData) => {
      cy.get(pom.reg_firstname).type(randomData.firstname);
      cy.get(pom.reg_lastname).type(randomData.lastname);
      cy.get(pom.reg_email).type(randomData.email);
      cy.get(pom.reg_pass).type(randomData.password);
      cy.get(pom.reg_passConfirm).type(randomData.confirmpass.slice(0, -1));
      cy.get(pom.reg_createAcc_btn).click();
      cy.waitting();
      cy.get('#password-confirmation-error')
      .should('be.visible')
      .and('contain', "Please enter the same value again.")
    });
  });

  it('Failed to Create Account with existing account', () => {
    cy.waitting();
    cy.fixture('dummy_valid_account.json').then((valid_account) => {
      cy.get(pom.reg_firstname).type(valid_account.firstname);
      cy.get(pom.reg_lastname).type(valid_account.lastname);
      cy.get(pom.reg_email).type(valid_account.email);
      cy.get(pom.reg_pass).type(valid_account.password);
      cy.get(pom.reg_passConfirm).type(valid_account.password);
      cy.get(pom.reg_createAcc_btn).click();
      cy.waitting();
      cy.get('.message-error > div')
      .should('be.visible')
      .and('contain', "There is already an account with this email address.")
    });
  });

});