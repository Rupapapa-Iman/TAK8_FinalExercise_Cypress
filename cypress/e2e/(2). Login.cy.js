const valid_account = require("../fixtures/dummy_valid_account.json");
const {page_object_manager} = require("../support/page_object_manager");

describe('Login', () => {
    const pom = new page_object_manager();
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit(`${Cypress.config('baseUrl')}customer/account/login/`);
        cy.wait(1500);
    });

    it('Success Login with valid account', {retries: 3}, () => {
        cy.get(pom.log_email).clear().type(valid_account.email);
        cy.get(pom.log_pass).clear().type(valid_account.password);
        cy.get(pom.log_signIn_btn).wait(500).click();
        cy.url()
        .should('include', `${Cypress.config('baseUrl')}`);
    });
    
    it('Failed to Login with empty email', {retries: 3}, () => {
        cy.get(pom.log_pass).clear().type(valid_account.password);
        cy.get(pom.log_signIn_btn).click();
        cy.get('#email-error')
        .should(`be.visible`)
        .and('contain', "This is a required field.").wait(500);
    });

    it('Failed to Login with invalid email format', {retries: 3}, () => {
        cy.get(pom.log_email).clear().type(valid_account.email.slice(0, -3));
        cy.get(pom.log_pass).clear().type(valid_account.password);
        cy.get(pom.log_signIn_btn).click();
        cy.get('#email-error')
        .should(`be.visible`)
        .and('contain', "Please enter a valid email address").wait(500);
    });

    it('Failed to Login with empty password', {retries: 3}, () => {
        cy.get(pom.log_email).clear().type(valid_account.email);
        cy.get(pom.log_signIn_btn).click();
        cy.get('#pass-error')
        .should(`be.visible`)
        .and('contain', "This is a required field.").wait(500);
    });

    it('Failed to Login with invalid password', {retries: 3}, () => {
        cy.get(pom.log_email).clear().type(valid_account.email);
        cy.get(pom.log_pass).clear().type(valid_account.password.slice(0, -1));
        cy.get(pom.log_signIn_btn).click();
        cy.get('.message-error > div')
        .should('be.visible')
        .and('contain', "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.").wait(500);
    });
});