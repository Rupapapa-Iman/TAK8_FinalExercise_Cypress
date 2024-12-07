
class page_object_manager{
    //register
    reg_firstname = '#firstname';
    reg_lastname ='#lastname';
    reg_email = '#email_address';
    reg_pass = '#password';
    reg_passConfirm  = '#password-confirmation';
    reg_createAcc_btn = '#form-validate > .actions-toolbar > div.primary > .action';
    //Login
    log_email = '#email';
    log_pass = '.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass';
    log_signIn_btn = '.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2 > span';
    //edit account
    edt_drop_down_btn = ':nth-child(2) > .customer-welcome > .customer-name > .action';
    edt_myacc_btn = ':nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a';
    edt_to_edit = ':nth-child(7) > a';
    edt_firstname = '#firstname';
    edt_lastname = '#lastname';
    edt_email_check_box = '#change-email';
    edt_pass_check_box = '#change-password';
    edt_email_field = '#email';
    edt_crrnt_pass_field = '#current-password';
    edt_new_pass = '#password';
    edt_confrm_new_pass = '#password-confirmation';
    edt_save_btn = '#form-validate > .actions-toolbar > div.primary > .action > span';
    //Choose Prouduct
    prdct_cart_count = '.counter-number';
    prdct_item = [
        ':nth-child(1) > .product-item-info > .product-item-details > .product-item-name > .product-item-link', // Radiant Tee
        ':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link', // Breathe-Easy Tank
        ':nth-child(3) > .product-item-info > .product-item-details > .product-item-name > .product-item-link', // Argus All-Weather Tank
        ':nth-child(4) > .product-item-info > .product-item-details > .product-item-name > .product-item-link', // Hero Hoodie
        ':nth-child(5) > .product-item-info > .product-item-details > .product-item-name > .product-item-link', // Fussion Backpack
        ':nth-child(6) > .product-item-info > .product-item-details >.product-item-name > .product-item-link' // Push it Messenger Bag
    ];
    prdct_qty = '#qty';
    prdct_add2cart = '#product-addtocart-button';
    //Proceed to Checkout
    ptc_logged_in_indicator = ':nth-child(2) > .greet > .logged-in';
    ptc_chart_logo = '.showcart';
    ptc_checkout_btn = '#top-cart-btn-checkout';
    ptc_loading_logo = '#checkout-loader';
    ptc_shipping_info_layer = '#checkout-step-shipping';
    ptc_company_field = '[name="shippingAddress.company"]';
    ptc_address_field = '#shipping-new-address-form > fieldset > div > div.field._required';
    ptc_city_field = '[name="shippingAddress.city"]';
    ptc_country_radio = 'select[name="country_id"]';
    ptc_states_field = '[name="shippingAddress.region"]';
    ptc_zip_field = '[name="shippingAddress.postcode"]';
    ptc_phone_field = '[name="shippingAddress.telephone"]';
    ptc_loading_mask = '.loading-mask';
    ptc_submit_btn = '.button';
    ptc_confirmation_layer = '#co-payment-form > :nth-child(2)';
    ptc_proceed2_co = '.payment-method-content > :nth-child(4) > div.primary > .action';
    ptc_response = '.base';
};

class ItemCategory{
    size = [ 
        '#option-label-size-143-item-166', //XS
        '#option-label-size-143-item-167', //S
        '#option-label-size-143-item-168', //M
        '#option-label-size-143-item-169', //L
        '#option-label-size-143-item-170'  //XL
    ];
    colour ={
        blue : '#option-label-color-93-item-50', //BLUE
        orange : '#option-label-color-93-item-56', //ORANGE
        purple : '#option-label-color-93-item-57', //PURPLE
        white : '#option-label-color-93-item-59', //WHITE
        yellow : '#option-label-color-93-item-60', //YELLOW
        black : '#option-label-color-93-item-49', //BLACK
        grey : '#option-label-color-93-item-52', //GREY
        green : '#option-label-color-93-item-53'  //GREEN
    };

}

module.exports = {page_object_manager, ItemCategory};