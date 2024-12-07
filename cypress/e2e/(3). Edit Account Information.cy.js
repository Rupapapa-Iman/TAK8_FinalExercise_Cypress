const {page_object_manager} = require("../support/page_object_manager");

describe('Edit Account Information', () => {
    const pom = new page_object_manager();
    before(() => {
        cy.fixture('dummy_valid_account.json').then((valid_data) => {
            Cypress.env('randomData', valid_data);
        });
    });

    beforeEach(() => {
        cy.wrap(null).then(() => {
            const randomizeData = Cypress.env('randomData');
            cy.log('Random Data:', randomizeData);
            cy.login_func(randomizeData.email, randomizeData.password);
        });
    });

    it('Success edit Account Information', () => {
        cy.waitting();
        cy.get(pom.edt_drop_down_btn).should('be.visible').wait(2000).click();
        cy.get(pom.edt_myacc_btn).click();
        cy.get(pom.edt_to_edit).should('be.visible').click();
        cy.get(pom.edt_email_check_box).should('be.visible').click();
        cy.get(pom.edt_pass_check_box).click();
        cy.get('.fieldset.password > .legend > span').should('be.visible');
        cy.fixture('dummy_valid_account.json').then((valid_data) => {
            cy.randomizer().then((randomData) => {
                const { firstname, lastname, email, password, confirmpass } = randomData;
                cy.get(pom.edt_firstname).clear().type(firstname);
                cy.get(pom.edt_lastname).clear().type(lastname);
                cy.get(pom.edt_email_field).clear().type(email);
                cy.get(pom.edt_crrnt_pass_field).type(valid_data.password);
                cy.get(pom.edt_new_pass).type(password);
                cy.get(pom.edt_confrm_new_pass).type(confirmpass);
                cy.get(pom.edt_save_btn).click();
                cy.get('.message-success > div')
                .should('be.visible')
                .and('contain', "You saved the account information.");
                cy.wrap(null).then(() => {
                    Cypress.env('randomData', randomData); 
                    cy.log('Updated randomData:', Cypress.env('randomData').email);
                });
                cy.task('update_data', { firstname, lastname, email, password });
                
            });
        });
    });

    it('Failed to edit Account Information with empty firstname', () => {
        cy.waitting();
        cy.get(pom.edt_drop_down_btn).should('be.visible').wait(2000).click();
        cy.get(pom.edt_myacc_btn).click();
        cy.get(pom.edt_to_edit).should('be.visible').click();
        cy.get(pom.edt_email_check_box).should('be.visible').click();
        cy.get(pom.edt_pass_check_box).click();
        cy.get('.fieldset.password > .legend > span').should('be.visible');
        cy.randomizer().then((randomData) => {
            const { firstname, lastname, email, password, confirmpass } = randomData;
            const randomizeData = Cypress.env('randomData');
            cy.get(pom.edt_firstname).clear();
            cy.get(pom.edt_lastname).clear().type(lastname);
            cy.get(pom.edt_email_field).clear().type(email);
            cy.get(pom.edt_crrnt_pass_field).type(randomizeData.password);
            cy.get(pom.edt_new_pass).type(password);
            cy.get(pom.edt_confrm_new_pass).type(confirmpass);
            cy.get(pom.edt_save_btn).click();
            cy.get('#firstname-error')
            .should('be.visible')
            .and('contain', "This is a required field.");
        });
    });

    it('Failed to edit Account Information with empty lastname', () => {
        cy.waitting();
        cy.get(pom.edt_drop_down_btn).should('be.visible').wait(2000).click();
        cy.get(pom.edt_myacc_btn).click();
        cy.get(pom.edt_to_edit).should('be.visible').click();
        cy.get(pom.edt_email_check_box).should('be.visible').click();
        cy.get(pom.edt_pass_check_box).click();
        cy.get('.fieldset.password > .legend > span').should('be.visible');
        cy.randomizer().then((randomData) => {
            const randomizeData = Cypress.env('randomData');
            const { firstname, lastname, email, password, confirmpass } = randomData;
            cy.get(pom.edt_firstname).clear().type(firstname);
            cy.get(pom.edt_lastname).clear();
            cy.get(pom.edt_email_field).clear().type(email);
            cy.get(pom.edt_crrnt_pass_field).type(randomizeData.password);
            cy.get(pom.edt_new_pass).type(password);
            cy.get(pom.edt_confrm_new_pass).type(confirmpass);
            cy.get(pom.edt_save_btn).click();
            cy.get('#lastname-error')
            .should('be.visible')
            .and('contain', "This is a required field.");
        });
    });

    it('Failed to edit Account Information with empty email', () => {
        cy.waitting();
        cy.get(pom.edt_drop_down_btn).should('be.visible').wait(2000).click();
        cy.get(pom.edt_myacc_btn).click();
        cy.get(pom.edt_to_edit).should('be.visible').click();
        cy.get(pom.edt_email_check_box).should('be.visible').click();
        cy.get(pom.edt_pass_check_box).click();
        cy.get('.fieldset.password > .legend > span').should('be.visible');
        cy.randomizer().then((randomData) => {
            const randomizeData = Cypress.env('randomData');
            const { firstname, lastname, email, password, confirmpass } = randomData;
            cy.get(pom.edt_firstname).clear().type(firstname);
            cy.get(pom.edt_lastname).clear().type(lastname);
            cy.get(pom.edt_email_field).clear();
            cy.get(pom.edt_crrnt_pass_field).type(randomizeData.password);
            cy.get(pom.edt_new_pass).type(password);
            cy.get(pom.edt_confrm_new_pass).type(confirmpass);
            cy.get(pom.edt_save_btn).click();
            cy.get('#email-error')
            .should('be.visible')
            .and('contain', "This is a required field.");
        });
    });
    
    it('Failed to edit Account Information with invalid email format', () => {
        cy.waitting();
        cy.get(pom.edt_drop_down_btn).should('be.visible').wait(2000).click();
        cy.get(pom.edt_myacc_btn).click();
        cy.get(pom.edt_to_edit).should('be.visible').click();
        cy.get(pom.edt_email_check_box).should('be.visible').click();
        cy.get(pom.edt_pass_check_box).click();
        cy.get('.fieldset.password > .legend > span').should('be.visible');
        cy.randomizer().then((randomData) => {
            const randomizeData = Cypress.env('randomData');
            const { firstname, lastname, email, password, confirmpass } = randomData;
            cy.get(pom.edt_firstname).clear().type(firstname);
            cy.get(pom.edt_lastname).clear().type(lastname);
            cy.get(pom.edt_email_field).clear().type(email.slice(0, -3));
            cy.get(pom.edt_crrnt_pass_field).type(randomizeData.password);
            cy.get(pom.edt_new_pass).type(password);
            cy.get(pom.edt_confrm_new_pass).type(confirmpass);
            cy.get(pom.edt_save_btn).click();
            cy.get('#email-error')
            .should('be.visible')
            .and('contain', "Please enter a valid email address.");
        });
    });

    it('Failed to edit Account Information with empty New Password', () => {
        cy.waitting();
        cy.get(pom.edt_drop_down_btn).should('be.visible').wait(2000).click();
        cy.get(pom.edt_myacc_btn).click();
        cy.get(pom.edt_to_edit).should('be.visible').click();
        cy.get(pom.edt_email_check_box).should('be.visible').click();
        cy.get(pom.edt_pass_check_box).click();
        cy.get('.fieldset.password > .legend > span').should('be.visible');
        cy.randomizer().then((randomData) => {
            const randomizeData = Cypress.env('randomData');
            const { firstname, lastname, email, password, confirmpass } = randomData;
            cy.get(pom.edt_firstname).clear().type(firstname);
            cy.get(pom.edt_lastname).clear().type(lastname);
            cy.get(pom.edt_email_field).clear().type(email);
            cy.get(pom.edt_crrnt_pass_field).type(randomizeData.password);
            cy.get(pom.edt_confrm_new_pass).type(confirmpass);
            cy.get(pom.edt_save_btn).click();
            cy.get('#password-error')
            .should('be.visible')
            .and('contain', "This is a required field.");
        });
    });

    it('Failed to edit Account Information with empty Confirm New Password', () => {
        cy.waitting();
        cy.get(pom.edt_drop_down_btn).should('be.visible').wait(2000).click();
        cy.get(pom.edt_myacc_btn).click();
        cy.get(pom.edt_to_edit).should('be.visible').click();
        cy.get(pom.edt_email_check_box).should('be.visible').click();
        cy.get(pom.edt_pass_check_box).click();
        cy.get('.fieldset.password > .legend > span').should('be.visible');
        cy.randomizer().then((randomData) => {
            const randomizeData = Cypress.env('randomData');
            const { firstname, lastname, email, password, confirmpass } = randomData;
            cy.get(pom.edt_firstname).clear().type(firstname);
            cy.get(pom.edt_lastname).clear().type(lastname);
            cy.get(pom.edt_email_field).clear().type(email.slice(0, -3));
            cy.get(pom.edt_crrnt_pass_field).type(randomizeData.password);
            cy.get(pom.edt_new_pass).type(password);
            cy.get(pom.edt_save_btn).click();
            cy.get('#password-confirmation-error')
            .should('be.visible')
            .and('contain', "This is a required field.");
        });
    });
    
    it('Failed to edit Account Information with unmatched new password', () => {
        cy.waitting();
        cy.get(pom.edt_drop_down_btn).should('be.visible').wait(2000).click();
        cy.get(pom.edt_myacc_btn).click();
        cy.get(pom.edt_to_edit).should('be.visible').click();
        cy.get(pom.edt_email_check_box).should('be.visible').click();
        cy.get(pom.edt_pass_check_box).click();
        cy.get('.fieldset.password > .legend > span').should('be.visible');
        cy.randomizer().then((randomData) => {
            const { firstname, lastname, email, password, confirmpass } = randomData;
            const randomizeData = Cypress.env('randomData');
            cy.get(pom.edt_firstname).clear().type(firstname);
            cy.get(pom.edt_lastname).clear().type(lastname);
            cy.get(pom.edt_email_field).clear().type(email);
            cy.get(pom.edt_crrnt_pass_field).type(randomizeData.password);
            cy.get(pom.edt_new_pass).type(password);
            cy.get(pom.edt_confrm_new_pass).type(confirmpass.slice(0, -1));
            cy.get(pom.edt_save_btn).click();
            cy.get('#password-confirmation-error')
            .should('be.visible')
            .and('contain', "Please enter the same value again.");
        });
    });

    it('Failed to edit Account Information with empty current password', () => {
        cy.waitting();
        cy.get(pom.edt_drop_down_btn).should('be.visible').wait(2000).click();
        cy.get(pom.edt_myacc_btn).click();
        cy.get(pom.edt_to_edit).should('be.visible').click();
        cy.get(pom.edt_email_check_box).should('be.visible').click();
        cy.get(pom.edt_pass_check_box).click();
        cy.get('.fieldset.password > .legend > span').should('be.visible');
        cy.randomizer().then((randomData) => {
            const { firstname, lastname, email, password, confirmpass } = randomData;
            const randomizeData = Cypress.env('randomData');
            cy.get(pom.edt_firstname).clear().type(firstname);
            cy.get(pom.edt_lastname).clear().type(lastname);
            cy.get(pom.edt_email_field).clear().type(email);
            cy.get(pom.edt_new_pass).type(password);
            cy.get(pom.edt_confrm_new_pass).type(confirmpass);
            cy.get(pom.edt_save_btn).click();
            cy.get('#current-password-error')
            .should('be.visible')
            .and('contain', "This is a required field.");
        });
    });

    it('Failed to edit Account Information with invalid current password', () => {
        cy.waitting();
        cy.get(pom.edt_drop_down_btn).should('be.visible').wait(2000).click();
        cy.get(pom.edt_myacc_btn).click();
        cy.get(pom.edt_to_edit).should('be.visible').click();
        cy.get(pom.edt_email_check_box).should('be.visible').click();
        cy.get(pom.edt_pass_check_box).click();
        cy.get('.fieldset.password > .legend > span').should('be.visible');
        cy.randomizer().then((randomData) => {
            const { firstname, lastname, email, password, confirmpass } = randomData;
            cy.get(pom.edt_firstname).clear().type(firstname);
            cy.get(pom.edt_lastname).clear().type(lastname);
            cy.get(pom.edt_email_field).clear().type(email);
            cy.get(pom.edt_crrnt_pass_field).type(password);
            cy.get(pom.edt_new_pass).type(password);
            cy.get(pom.edt_confrm_new_pass).type(confirmpass);
            cy.get(pom.edt_save_btn).click();
            cy.get('.message-error > div')
            .should('be.visible').wait(3000)
            .and('contain', "The password doesn't match this account. Verify the password and try again.");
        });
    });
}); 