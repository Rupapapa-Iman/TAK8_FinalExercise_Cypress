const {page_object_manager} = require("../support/page_object_manager");
const pom = new page_object_manager()

describe('All positive test suite', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.visit(Cypress.config('baseUrl'));
    });

    it('(1). Create_an_Account', () => {
        cy.create_new_acc();
    });
  
    it('(2). Login', () => {
        cy.wrap(Cypress.env('randomData')).then((valid_data) => {
            cy.login_func(valid_data.email, valid_data.password);
            cy.check_cart();
        });
    });

    it('(3). Edit Account Information', () => {
        cy.waitting();
        cy.wrap(Cypress.env('randomData')).then((valid_data) => {
            cy.login_func(valid_data.email, valid_data.password);
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
                cy.get(pom.edt_crrnt_pass_field).type(valid_data.password);
                cy.get(pom.edt_new_pass).type(password);
                cy.get(pom.edt_confrm_new_pass).type(confirmpass);
                cy.get(pom.edt_save_btn).click();
                cy.get('.message-success > div')
                .should('be.visible')
                .and('contain', "You saved the account information.");
                cy.wrap(null).then(() => {
                    Cypress.env('randomData', randomData); 
                    cy.log('Updated randomData:', cy.wrap(Cypress.env('randomData')).email);
                });
                cy.task('update_data', { firstname, lastname, email, password });
            });
        });
    });
    
    it('(4). Choose product(s)', () => {
        cy.wrap(Cypress.env('randomData')).then((valid_data) => {
            cy.login_func(valid_data.email, valid_data.password);
        });
        cy.takeItem2Cart();
    });

    it('(5). Proceed to Checkout', () => {
        cy.wrap(Cypress.env('randomData')).then((valid_data) => {
            cy.login_func(valid_data.email, valid_data.password);
        });
        cy.identity_generator().then((identity_generator) => {
            cy.get(pom.ptc_logged_in_indicator)
            .should('exist')
            .and('contain', 'Welcome');
            cy.get(pom.ptc_chart_logo).click().wait(500);
            cy.get(pom.ptc_checkout_btn).click();
            cy.get(pom.ptc_loading_logo).should('not.exist');
            cy.get(pom.ptc_shipping_info_layer).should('be.visible');
            cy.get(pom.ptc_company_field).type(identity_generator.company_name);
            cy.get(pom.ptc_address_field).type(identity_generator.street_address);
            cy.get(pom.ptc_city_field).type(identity_generator.city);
            cy.get(pom.ptc_country_radio)
            .select(identity_generator.country)
            .should('contain', identity_generator.country);
            cy.get(pom.ptc_states_field).type(identity_generator.state);
            cy.get(pom.ptc_zip_field).type(identity_generator.zip);
            cy.get(pom.ptc_phone_field).type(identity_generator.phone_number);
            cy.get(pom.ptc_loading_mask).should('exist');
            cy.get(pom.ptc_submit_btn).click();
            cy.waitting();
            cy.get(pom.ptc_confirmation_layer).should('exist');
            cy.get(pom.ptc_proceed2_co).click();
            cy.get(pom.ptc_response).should('have.text', "Thank you for your purchase!")
            cy.check_cart().then(() => {
                expect(Cypress.env('cart_count')).to.eq(0);
            });
        })

    });
});