// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('waitting', () => {
    cy.get('body').should('be.visible');
});

Cypress.Commands.add('randomizer', () => {
    return cy.fixture('dummy_data.json').then((dummy_data) => {
        const {randomizers} = require ('./customFunctions')
        const customEmail = Math.random().toString(36).substr(2,6);
        const cust_password = dummy_data[randomizers(dummy_data)].password;
        const randomData = {
            firstname: dummy_data[randomizers(dummy_data)].firstname,
            lastname: dummy_data[randomizers(dummy_data)].lastname,
            email: `${dummy_data[randomizers(dummy_data)].lastname}.${dummy_data[randomizers(dummy_data)].firstname}.${customEmail}@yahoo.edu`,
            password: cust_password,
            confirmpass: cust_password
        };
        cy.wrap(randomData).as('randomData');
    });
});

Cypress.Commands.add('login_func', (email, password) =>{
    const {page_object_manager} = require("../support/page_object_manager");
    const pom = new page_object_manager();
    cy.viewport(1920, 1080);
    cy.visit(Cypress.config('baseUrl'));
    cy.get('.panel > .header > .authorization-link > a').click();
    cy.waitting();
    cy.get(pom.log_email).clear().type(email);
    cy.get(pom.log_pass).clear().type(password);
    cy.get(pom.log_signIn_btn).click();
    cy.waitting();
    cy.url()
    .should('include', `${Cypress.config('baseUrl')}`)
});

Cypress.Commands.add('check_cart', () =>{
    cy.get(':nth-child(2) > .greet > .logged-in')
    .should('exist')
    .and('contain', 'Welcome')
    cy.get('.page-header > .content').wait(1600).then((body) => {
        const counter =  body.find('.counter-number');
        if( counter.length > 0 ){
            cy.wrap(counter).invoke('text').then((cart_count) => {
                const count = parseInt(cart_count.trim());
                cy.log(count);
                if (count === 0) {
                    Cypress.env('cart_count', 0);
                    cy.log('cart item are empty')              
                } else {
                    Cypress.env('cart_count', count);
                    cy.log('cart has ' + Cypress.env('cart_count') + ' items')
                };
            });     
        } else {
        Cypress.env('cart_count', 0);
        cy.log('cart item are empty');
        }
    });
});

Cypress.Commands.add('takeItem2Cart', () => {
    const {page_object_manager, ItemCategory } = require("../support/page_object_manager");
    const {randomizers, random_Qty} = require ('../support/customFunctions');

    const pom = new page_object_manager();
    const Item_Category = new ItemCategory();

    var crrnt_qty = Cypress.env('cart_count');
    const inpt_qty = random_Qty(1, 10); // Average available item
    function add2cart(){
        var temp_prdct = pom.prdct_item[randomizers(pom.prdct_item)];
        cy.get(temp_prdct).click();
        cy.get(':nth-child(2) > .greet > .logged-in')
        .should('exist')
        cy.title().then((title) => {
            cy.get('#maincontent > div.columns > div > div.product-info-main > div.page-title-wrapper.product > h1 > span').should('be.visible')
            .and('have.text', title)
        });
        cy.get('.product-add-form')
        .should('be.visible')
        .wait(1500)
        switch (temp_prdct) {
            case pom.prdct_item[0]: //Radiant Tee
                //temp local element locator
                var size = Item_Category.size[randomizers(Item_Category.size)];
                var colour = [
                    Item_Category.colour.blue, 
                    Item_Category.colour.orange,
                    Item_Category.colour.purple
                ];
                cy.get(size).click();
                cy.get(colour[randomizers(colour)]).click();
                cy.get(pom.prdct_qty).clear().type(inpt_qty);
                cy.get(pom.prdct_add2cart).click();
                break;
            case pom.prdct_item[1]: //Breath-Easy Tank
                //temp local element locator
                var size = Item_Category.size[randomizers(Item_Category.size)];
                var colour = [
                    Item_Category.colour.purple, //PURPLE
                    Item_Category.colour.white, //WHITE
                    Item_Category.colour.yellow  //YELLOW
                ];
                cy.get(size).click();
                cy.get(colour[randomizers(colour)]).click();
                cy.get(pom.prdct_qty).clear().type(inpt_qty);
                cy.get(pom.prdct_add2cart).click();                
                break;    
            case pom.prdct_item[2]: //Argus All-Weather Tank
                //temp local element locator
                var size = Item_Category.size[randomizers(Item_Category.size)];
                var colour = Item_Category.colour.grey
                cy.get(size).click();
                cy.get(colour).click();
                cy.get(pom.prdct_qty).clear().type(inpt_qty);
                cy.get(pom.prdct_add2cart).click();                
                break;    
            case pom.prdct_item[3]: //Hero Hoodie
                //temp local element locator
                var size = Item_Category.size[randomizers(Item_Category.size)];
                var colour = [
                    Item_Category.colour.black,
                    Item_Category.colour.grey,
                    Item_Category.colour.green
                ];
                cy.get(size).click();
                cy.get(colour[randomizers(colour)]).click();
                cy.get(pom.prdct_qty).clear().type(inpt_qty);
                cy.get(pom.prdct_add2cart).click();                
                break;                  
            default: /*Fusion Backpack and Push it Messengger Bag */
                cy.get(pom.prdct_qty).clear().type(inpt_qty);
                cy.get(pom.prdct_add2cart).click().wait(2000);
        };
        cy.get('.loader > img').should('not.exist');
        cy.get(pom.prdct_cart_count).invoke('text').then((count) =>{
            if(parseInt(count.trim()) !== (crrnt_qty + inpt_qty)){
                cy.log('item cannot add to cart, retry add another item')
                cy.visit(Cypress.config('baseUrl'))
                add2cart();
            };
        });
    }
    add2cart();
    cy.waitting();
    cy.get('.message-success')
    .should('contain', 'You added');    
    cy.visit(Cypress.config('baseUrl'))
});

Cypress.Commands.add('create_new_acc', ()=> {
    const {page_object_manager} = require("../support/page_object_manager");
    const pom = new page_object_manager();
    cy.viewport(1920, 1080)
    cy.visit(Cypress.config('baseUrl'));
    cy.get('.panel.wrapper > .panel > .header').should('exist')
    cy.contains('Create an Account'/*'body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(3) > a'*/).click();
    cy.get('#form-validate').should('exist');
    cy.randomizer().then((randomData) => {
        const { firstname, lastname, email, password, confirmpass } = randomData;
        cy.get(pom.reg_firstname).type(firstname);
        cy.get(pom.reg_lastname).type(lastname);
        cy.get(pom.reg_email).type(email);
        cy.get(pom.reg_pass).type(password);
        cy.get(pom.reg_passConfirm).type(confirmpass);
        cy.get(pom.reg_createAcc_btn).click();
        cy.waitting();
        cy.get('.box-content > p')
        .should('be.visible')
        .and('contain', `${randomData.firstname} ${randomData.lastname}`)
        .and('contain', randomData.email);
        cy.wrap(null).then(() => {
          Cypress.env('randomData', randomData); 
          cy.log('Updated randomData:', Cypress.env('randomData').email);
        });
        cy.task('update_data', { firstname, lastname, email, password });
      });
});

Cypress.Commands.add('identity_generator', ()=> {
    return cy.fixture('dummy_identity.json').then((dummy_identity) => {
        const {randomizers} = require ('./customFunctions')
        const identity_generator = {
            company_name: dummy_identity[randomizers(dummy_identity)].company_name,
            street_address: dummy_identity[randomizers(dummy_identity)].street_address,
            city: dummy_identity[randomizers(dummy_identity)].city,
            state: dummy_identity[randomizers(dummy_identity)].state,
            zip: dummy_identity[randomizers(dummy_identity)].zip,
            country: dummy_identity[randomizers(dummy_identity)].country,
            phone_number: dummy_identity[randomizers(dummy_identity)].phone_number
        };
        cy.wrap(identity_generator).as('identity_generator')
    });
});