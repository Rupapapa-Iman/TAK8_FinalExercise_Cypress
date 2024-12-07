const {page_object_manager, ItemCategory } = require("../support/page_object_manager");
const {randomizers, random_Qty} = require ('../support/customFunctions')

/* To save time during testing,only those that appear in the Hot Sellers 
section on the main page product are choosen
*/
describe('Choose Produt(s)', () => {
    const pom = new page_object_manager()
    const Item_Category = new ItemCategory()
    beforeEach(() => {
        cy.fixture('dummy_valid_account.json').then((valid_data) => {
            cy.login_func(valid_data.email, valid_data.password);
            cy.check_cart();
        });
        
    });

    it('Success to Choose Product', {retries: 3}, () => {
        var temp_prdct = pom.prdct_item[randomizers(pom.prdct_item)];
        cy.get(temp_prdct).click();
        cy.get(':nth-child(2) > .greet > .logged-in')
        .should('exist')
        var crrnt_qty = Cypress.env('cart_count');
        const inpt_qty = random_Qty(1, 10); // Average available item
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
        cy.waitting();
        cy.get('.message-success')
        .should('contain', 'You added');    
        cy.get(pom.prdct_cart_count)
        .should('be.visible')
        .and('contain', crrnt_qty + inpt_qty);
    });

    it('Failed to Choose Product without choose size variant', () => {
        var temp_randomizer = randomizers(pom.prdct_item) - 2;
        temp_randomizer = (temp_randomizer < 0) ? temp_randomizer + 2 : temp_randomizer;// due the last item hasn't size or colour availability
        var temp_prdct = pom.prdct_item[temp_randomizer];
        cy.get(temp_prdct).click();
        cy.get(':nth-child(2) > .greet > .logged-in')
        .should('exist')
        const inpt_qty = random_Qty(1, 10); // Average available item
        var crrnt_qty = Cypress.env('cart_count');
        cy.title().then((title) => {
            cy.get('#maincontent > div.columns > div > div.product-info-main > div.page-title-wrapper.product > h1 > span').should('be.visible')
            .and('have.text', title)
        });
        cy.get('.product-add-form')
        .should('be.visible').wait(1500);
        switch (temp_prdct) {
            case pom.prdct_item[0]: //Radiant Tee
                //temp local element locator
                var size = Item_Category.size[randomizers(Item_Category.size)];
                var colour = [
                    Item_Category.colour.blue, 
                    Item_Category.colour.orange,
                    Item_Category.colour.purple
                ];
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
                cy.get(colour[randomizers(colour)]).click();
                cy.get(pom.prdct_qty).clear().type(inpt_qty);
                cy.get(pom.prdct_add2cart).click();                
                break;    
            case pom.prdct_item[2]: //Argus All-Weather Tank
                //temp local element locator
                var size = Item_Category.size[randomizers(Item_Category.size)];
                var colour = Item_Category.colour.grey
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
                cy.get(colour[randomizers(colour)]).click();
                cy.get(pom.prdct_qty).clear().type(inpt_qty);
                cy.get(pom.prdct_add2cart).click();                
                break;                  
            default: /*Fusion Backpack and Push it Messengger Bag */
                cy.get(pom.prdct_qty).clear().type(inpt_qty);
                cy.get(pom.prdct_add2cart).click().wait(2000);
        };
        cy.waitting();
        cy.get('.mage-error', )
        .should('be.visible')
        .and('have.text', 'This is a required field.')
        cy.get(pom.prdct_cart_count)
        .should('be.visible')
        .and('contain', crrnt_qty);
    });

    it('Failed to Choose Product without choose size Color', {retries: 3}, () => {
        var temp_randomizer = randomizers(pom.prdct_item) - 2;
        temp_randomizer = (temp_randomizer < 0) ? temp_randomizer + 2 : temp_randomizer;// due the last item hasn't size or colour availability
        var temp_prdct = pom.prdct_item[temp_randomizer];
        cy.get(temp_prdct).click();
        cy.get(':nth-child(2) > .greet > .logged-in')
        .should('exist')
        const inpt_qty = random_Qty(1, 10); // Average available item
        var crrnt_qty = Cypress.env('cart_count');
        cy.title().then((title) => {
            cy.get('#maincontent > div.columns > div > div.product-info-main > div.page-title-wrapper.product > h1 > span').should('be.visible')
            .and('have.text', title)
        });
        cy.get('.product-add-form')
        .should('be.visible').wait(1500);
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
                cy.get(pom.prdct_qty).clear().type(inpt_qty);
                cy.get(pom.prdct_add2cart).click();                
                break;    
            case pom.prdct_item[2]: //Argus All-Weather Tank
                //temp local element locator
                var size = Item_Category.size[randomizers(Item_Category.size)];
                var colour = Item_Category.colour.grey
                cy.get(size).click();
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
                cy.get(pom.prdct_qty).clear().type(inpt_qty);
                cy.get(pom.prdct_add2cart).click();                
                break;                  
            default: /*Fusion Backpack and Push it Messengger Bag */
                cy.get(pom.prdct_qty).clear().type(inpt_qty);
                cy.get(pom.prdct_add2cart).click().wait(2000);
        };
        cy.waitting();
        cy.get('.mage-error', )
        .should('be.visible')
        .and('have.text', 'This is a required field.')
        cy.get(pom.prdct_cart_count)
        .should('be.visible')
        .and('contain', crrnt_qty);
    });

    it('Failed to Choose Product with outer range Quantity', {retries: 3}, () => {
        var temp_prdct = pom.prdct_item[randomizers(pom.prdct_item)];
        cy.get(temp_prdct).click();
        cy.get(':nth-child(2) > .greet > .logged-in')
        .should('exist')
        var crrnt_qty = Cypress.env('cart_count');
        var out_range =[-1, 10001]
        const inpt_qty = out_range[randomizers(out_range)]; // Average available item
        cy.title().then((title) => {
            cy.get('#maincontent > div.columns > div > div.product-info-main > div.page-title-wrapper.product > h1 > span').should('be.visible')
            .and('have.text', title)
        });
        cy.get('.product-add-form')
        .should('be.visible').wait(1500);
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
        cy.waitting();
        if(inpt_qty === -1 ){
            var err_mssg = 'Please enter a quantity greater than 0.';
            cy.log("over");
        } else{
            var err_mssg = 'The maximum you may purchase is 10000.';
            cy.log("lower");
        };
        cy.get('.mage-error', )
        .should('be.visible')
        .and('have.text', err_mssg);
    });

    it('Failed to Choose Product with invalid quantity format', {retries: 3}, () => {
        var temp_prdct = pom.prdct_item[randomizers(pom.prdct_item)];
        cy.get(temp_prdct).click();
        cy.get(':nth-child(2) > .greet > .logged-in')
        .should('exist')
        var crrnt_qty = Cypress.env('cart_count');
        const inpt_qty = "e"; // invalid input
        cy.title().then((title) => {
            cy.get('#maincontent > div.columns > div > div.product-info-main > div.page-title-wrapper.product > h1 > span').should('be.visible')
            .and('have.text', title)
        });
        cy.get('.product-add-form')
        .should('be.visible').wait(1500);
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
        cy.waitting();
        cy.get('.mage-error', )
        .should('be.visible')
        .and('have.text', 'Please enter a valid number in this field.')
    });
});