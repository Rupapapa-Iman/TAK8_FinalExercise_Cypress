const {page_object_manager} = require("../support/page_object_manager");

describe('Proceed to Checkout', () => {
    const pom = new page_object_manager()
    
    beforeEach( () => {
        cy.fixture('dummy_valid_account.json').then((valid_data) => {
            cy.create_new_acc();
            cy.visit(Cypress.config('baseUrl'));
            cy.check_cart().then(() => {
                let temp = Cypress.env('cart_count');
                if(temp === 0 ){
                    cy.log("item are empty try to add some items")
                    cy.takeItem2Cart();
                    cy.check_cart();
                };
            });         
        });
    });

    it('Succes to proceed to checkout ', () => {
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

    it('Failed to proceed to checkout with Empty Street Address', () => {
        cy.identity_generator().then((identity_generator) => {
            cy.get(pom.ptc_logged_in_indicator)
            .should('exist')
            .and('contain', 'Welcome');
            cy.get(pom.ptc_chart_logo).click().wait(500);
            cy.get(pom.ptc_checkout_btn).click();
            cy.get(pom.ptc_loading_logo).should('not.exist');
            cy.get(pom.ptc_shipping_info_layer).should('be.visible');
            cy.get(pom.ptc_company_field).type(identity_generator.company_name);
            //cy.get(pom.ptc_address_field).type(identity_generator.street_address);
            cy.get(pom.ptc_city_field).type(identity_generator.city);
            cy.get(pom.ptc_country_radio)
            .select(identity_generator.country)
            .should('contain', identity_generator.country);
            cy.get(pom.ptc_states_field).type(identity_generator.state);
            cy.get(pom.ptc_zip_field).type(identity_generator.zip);
            cy.get(pom.ptc_phone_field).type(identity_generator.phone_number);
            cy.get(pom.ptc_loading_mask).should('exist');
            cy.get(pom.ptc_submit_btn).click();
            cy.get('fieldset.field')
            .find('.field-error')
            .should('be.visible')
            .and('contain', 'This is a required field.')
        })
    });

    it('Failed to proceed to checkout with Empty City', () => {
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
            //cy.get(pom.ptc_city_field).type(identity_generator.city);
            cy.get(pom.ptc_country_radio)
            .select(identity_generator.country)
            .should('contain', identity_generator.country);
            cy.get(pom.ptc_states_field).type(identity_generator.state);
            cy.get(pom.ptc_zip_field).type(identity_generator.zip);
            cy.get(pom.ptc_phone_field).type(identity_generator.phone_number);
            cy.get(pom.ptc_loading_mask).should('exist');
            cy.get(pom.ptc_submit_btn).click();
            cy.get('div.field')
            .find('.field-error')
            .should('be.visible')
            .and('contain', 'This is a required field.')
        })
    });

    it('Failed to proceed to checkout with selecting Empty Country', () => {
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
            .select("")
            .should('contain', "");
            cy.get(pom.ptc_states_field).type(identity_generator.state);
            cy.get(pom.ptc_zip_field).type(identity_generator.zip);
            cy.get(pom.ptc_phone_field).type(identity_generator.phone_number);
            cy.get(pom.ptc_submit_btn).click();
            cy.get('div.field')
            .find('.field-error')
            .should('be.visible')
            .and('contain', 'This is a required field.')
        });
    });

    it('Failed to proceed to checkout with Empty Phone Number', () => {
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
            //cy.get(pom.ptc_phone_field).type(identity_generator.phone_number);
            cy.get(pom.ptc_loading_mask).should('exist');
            cy.get(pom.ptc_submit_btn).click();
            cy.get('div.field')
            .find('.field-error')
            .should('be.visible')
            .and('contain', 'This is a required field.')
        })
    });
});