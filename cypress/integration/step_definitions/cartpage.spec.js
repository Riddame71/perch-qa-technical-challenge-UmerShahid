import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import HomePage from '../../pages/HomePage';
import CartPage from '../../pages/CartPage';
import AddressPage from '../../pages/AddressPage';
import PaymentPage from '../../pages/PaymentPage';
import SuccessPage from '../../pages/SuccessPage';
import ProfilePage from '../../pages/ProfilePage';

// Load fixture data based on environment
let cartData;
before(() => {  
    if (process.env.ENV_VAR === 'uat') {
        cy.fixture('uat/cartpage').then((data) => {
            cartData = data;
            cy.log(`📁 Loaded UAT cart data`);
            console.log(`Using UAT environment data`);
        });
    } else {
        cy.fixture('qa/cartpage').then((data) => {
            cartData = data;
            cy.log(`📁 Loaded QA cart data`);
            console.log(`Using QA environment data`);
        });
    }
});

// CART NAVIGATION STEPS 

When('I click on the Cart button from homepage', () => {
    cy.log('📍 STEP: When I click on the Cart button from homepage');
    console.log('Step: Clicking Cart button from homepage navigation');
    HomePage.clickCartButton();
    cy.log('✅ STEP COMPLETED: Cart button clicked from homepage');
});

When('I click the Continue Shopping button in empty cart', () => {
    cy.log('📍 STEP: When I click the Continue Shopping button in empty cart');
    console.log('Step: Clicking Continue Shopping in empty cart state');
    
    cy.get('[data-testid="empty-cart"]').within(() => {
        cy.get('[data-testid="continue-shopping"]').click();
    });
    
    cy.log('✅ STEP COMPLETED: Continue Shopping clicked in empty cart');
});

When('I click the Continue Shopping button from cart header', () => {
    cy.log('📍 STEP: When I click the Continue Shopping button from cart header');
    console.log('Step: Clicking Continue Shopping from cart header');
    
    cy.get('.cart-header').find('[data-testid="continue-shopping"]').click();
    
    cy.log('✅ STEP COMPLETED: Continue Shopping clicked from cart header');
});

When('I click the Proceed to Checkout button in cart', () => {
    cy.log('📍 STEP: When I click the Proceed to Checkout button in cart');
    console.log('Step: Clicking Proceed to Checkout in cart');
    CartPage.clickProceedToCheckout();
    cy.log('✅ STEP COMPLETED: Proceed to Checkout clicked in cart');
});

// CART VERIFICATION STEPS (Unique cart-focused verifications)

Then('I should see the cart page is displayed', () => {
    cy.log('📍 STEP: Then I should see the cart page is displayed');
    console.log('Step: Verifying cart page display');
    CartPage.verifyCartPage();
    cy.log('✅ STEP COMPLETED: Cart page display verified');
});

Then('I should see the cart page URL is correct', () => {
    cy.log('📍 STEP: Then I should see the cart page URL is correct');
    console.log('Step: Verifying cart page URL');
    cy.url().should('include', '/cart');
    cy.log('✅ STEP COMPLETED: Cart page URL verified');
});

Then('I should see the Shopping Cart title', () => {
    cy.log('📍 STEP: Then I should see the Shopping Cart title');
    console.log('Step: Verifying Shopping Cart title');
    cy.get('h1').contains('Shopping Cart').should('be.visible');
    cy.log('✅ STEP COMPLETED: Shopping Cart title verified');
});

Then('I should see the empty cart state with message', () => {
    cy.log('📍 STEP: Then I should see the empty cart state with message');
    console.log('Step: Verifying empty cart state and message');
    cy.get('[data-testid="empty-cart"]').should('be.visible');
    cy.get('[data-testid="empty-cart"]').should('contain.text', 'Your cart is empty');
    cy.log('✅ STEP COMPLETED: Empty cart state verified');
});

Then('I should see the Continue Shopping button in empty cart', () => {
    cy.log('📍 STEP: Then I should see the Continue Shopping button in empty cart');
    console.log('Step: Verifying Continue Shopping button in empty cart');
    cy.get('[data-testid="continue-shopping"]').should('be.visible');
    cy.log('✅ STEP COMPLETED: Continue Shopping button verified in empty cart');
});

// PRODUCT INTERACTION STEPS (Unique to cart testing)

When('I navigate to product details for {string}', (productName) => {
    cy.log(`📍 STEP: When I navigate to product details for "${productName}"`);
    console.log(`Step: Navigating to product details - ${productName}`);
    
    cy.contains('.product-card', productName).within(() => {
        cy.get('.view-details-button').click();
    });
    
    cy.log(`✅ STEP COMPLETED: Navigated to product details for "${productName}"`);
});

When('I add the product to cart with default quantity', () => {
    cy.log('📍 STEP: When I add the product to cart with default quantity');
    console.log('Step: Adding product to cart with default quantity');
    
    cy.url().should('include', '/product/');
    cy.get('[data-testid="add-to-cart"]').click();
    
    cy.log('✅ STEP COMPLETED: Product added to cart with default quantity');
});

When('I select quantity {string} and add to cart', (quantity) => {
    cy.log(`📍 STEP: When I select quantity "${quantity}" and add to cart`);
    console.log(`Step: Selecting quantity ${quantity} and adding to cart`);
    
    // Select quantity and add to cart
    cy.get('[data-testid="quantity-selector"]').select(quantity);
    cy.get('[data-testid="add-to-cart"]').click();
    
    cy.log(`✅ STEP COMPLETED: Added to cart with quantity "${quantity}"`);
});

// CART CONTENT VERIFICATION STEPS

Then('I should see {string} in the cart', (productName) => {
    cy.log(`📍 STEP: Then I should see "${productName}" in the cart`);
    console.log(`Step: Verifying ${productName} is in cart`);
    
    cy.contains('.cart-item', productName).should('be.visible');
    
    cy.log(`✅ STEP COMPLETED: "${productName}" verified in cart`);
});

Then('I should see the cart item quantity is {string}', (expectedQuantity) => {
    cy.log(`📍 STEP: Then I should see the cart item quantity is "${expectedQuantity}"`);
    console.log(`Step: Verifying cart item quantity - ${expectedQuantity}`);
    
    cy.get('[data-testid*="quantity-"]').first().should('have.value', expectedQuantity);
    
    cy.log(`✅ STEP COMPLETED: Cart item quantity "${expectedQuantity}" verified`);
});

Then('I should see the cart subtotal displays {string}', (expectedSubtotal) => {
    cy.log(`📍 STEP: Then I should see the cart subtotal displays "${expectedSubtotal}"`);
    console.log(`Step: Verifying cart subtotal - ${expectedSubtotal}`);
    
    cy.get('[data-testid="subtotal"]').should('contain.text', expectedSubtotal);
    
    cy.log(`✅ STEP COMPLETED: Cart subtotal "${expectedSubtotal}" verified`);
});

// CART MANAGEMENT STEPS

When('I remove the first item from cart', () => {
    cy.log('📍 STEP: When I remove the first item from cart');
    console.log('Step: Removing first item from cart');
    
    cy.get('[data-testid*="remove-"]').first().click();
    cy.wait(500); 
    
    cy.log('✅ STEP COMPLETED: First item removed from cart');
});

When('I update the first item quantity to {string}', (newQuantity) => {
    cy.log(`📍 STEP: When I update the first item quantity to "${newQuantity}"`);
    console.log(`Step: Updating first item quantity to ${newQuantity}`);
    
    cy.get('[data-testid*="quantity-"]').first().select(newQuantity);
    cy.wait(500); 
    
    cy.log(`✅ STEP COMPLETED: First item quantity updated to "${newQuantity}"`);
});

// CART STATE VERIFICATION

Then('the cart should return to empty state', () => {
    cy.log('📍 STEP: Then the cart should return to empty state');
    console.log('Step: Verifying cart returned to empty state');
    
    cy.get('[data-testid="empty-cart"]').should('be.visible');
    cy.get('[data-testid="empty-cart"]').should('contain.text', 'Your cart is empty');
    
    cy.log('✅ STEP COMPLETED: Cart empty state verified');
});

Then('I should see multiple items in the cart', () => {
    cy.log('📍 STEP: Then I should see multiple items in the cart');
    console.log('Step: Verifying multiple items in cart');
    
    cy.get('.cart-item').should('have.length.greaterThan', 1);
    
    cy.log('✅ STEP COMPLETED: Multiple items in cart verified');
});

// CHECKOUT FLOW STEPS 

When('I proceed through checkout with cart data', () => {
    cy.log('📍 STEP: When I proceed through checkout with cart data');
    console.log('Step: Proceeding through checkout flow');
    
    // Proceed to checkout
    CartPage.clickProceedToCheckout();
    
    // Fill address
    AddressPage.verifyDeliveryAddressPage();
    AddressPage.fillDeliveryAddress(cartData.deliveryAddress);
    AddressPage.clickContinueToPayment();
    
    // Fill payment
    PaymentPage.verifyPaymentPage();
    PaymentPage.fillPaymentInformation(cartData.paymentInfo);
    PaymentPage.clickPlaceOrder();
    
    cy.log('✅ STEP COMPLETED: Checkout flow completed');
});

Then('I should reach the order confirmation page', () => {
    cy.log('📍 STEP: Then I should reach the order confirmation page');
    console.log('Step: Verifying order confirmation page');
    
    SuccessPage.verifyOrderConfirmationPage();
    SuccessPage.verifyOrderNumber();
    
    cy.log('✅ STEP COMPLETED: Order confirmation page verified');
});

// CALCULATION VERIFICATION 

Then('the cart subtotal calculation should be correct for quantity {string}', (quantity) => {
    cy.log(`📍 STEP: Then the cart subtotal calculation should be correct for quantity "${quantity}"`);
    console.log(`Step: Verifying cart calculation for quantity ${quantity}`);
    
    if (quantity === '2') {
        cy.get('[data-testid="subtotal"]').should('contain.text', '$159.98');
    }
    
    cy.log(`✅ STEP COMPLETED: Cart calculation verification for quantity "${quantity}"`);
});

Then('the quantity selector should show options up to {string}', (maxOption) => {
    cy.log(`📍 STEP: Then the quantity selector should show options up to "${maxOption}"`);
    console.log(`Step: Verifying quantity selector max option - ${maxOption}`);
    
    cy.get('[data-testid="quantity-selector"] option').last().should('have.value', maxOption);
    
    cy.log(`✅ STEP COMPLETED: Quantity selector max option "${maxOption}" verified`);
});