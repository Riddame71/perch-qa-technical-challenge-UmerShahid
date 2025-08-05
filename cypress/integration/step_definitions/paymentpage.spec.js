import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import PaymentPage from '../../pages/PaymentPage';
import AddressPage from '../../pages/AddressPage';

// Load fixture data based on environment
let paymentData;
before(() => {  
    if (process.env.ENV_VAR === 'uat') {
        cy.fixture('uat/paymentpage').then((data) => {
            paymentData = data;
            cy.log(`📁 Loaded UAT payment data`);
            console.log(`Using UAT environment data`);
        });
    } else {
        cy.fixture('qa/paymentpage').then((data) => {
            paymentData = data;
            cy.log(`📁 Loaded QA payment data`);
            console.log(`Using QA environment data`);
        });
    }
});

// ===== NAVIGATION STEPS =====

When('I navigate directly to the payment page using URL', () => {
    cy.log('📍 STEP: When I navigate directly to the payment page using URL');
    console.log('Step: Navigating to payment page via direct URL');
    PaymentPage.visitDirectly(paymentData.navigationPaths.directURL);
    cy.log('✅ STEP COMPLETED: Successfully navigated to payment page via URL');
});

// ===== PAGE VERIFICATION STEPS =====

Then('I should see the payment page is displayed', () => {
    cy.log('📍 STEP: Then I should see the payment page is displayed');
    console.log('Step: Verifying payment page is displayed');
    PaymentPage.verifyPaymentPage();
    cy.log('✅ STEP COMPLETED: Payment page display verified');
});

Then('I should see the payment page URL is correct', () => {
    cy.log('📍 STEP: Then I should see the payment page URL is correct');
    console.log('Step: Verifying payment page URL structure');
    PaymentPage.verifyPaymentPageURL();
    cy.log('✅ STEP COMPLETED: Payment page URL verified');
});

Then('I should see the payment form elements', () => {
    cy.log('📍 STEP: Then I should see the payment form elements');
    console.log('Step: Verifying payment form elements visibility');
    PaymentPage.verifyPaymentFormElements();
    cy.log('✅ STEP COMPLETED: Payment form elements verified');
});

// ===== TITLE VERIFICATION STEPS =====

Then('I should see the payment page title from fixture data', () => {
    cy.log('📍 STEP: Then I should see the payment page title from fixture data');
    console.log('Step: Verifying payment page title from fixture');
    PaymentPage.verifyPageTitleFromFixture(paymentData.pageInfo.title);
    cy.log('✅ STEP COMPLETED: Payment page title verified from fixture data');
});

Then('I should see the main title {string} is displayed correctly', (titleText) => {
    cy.log(`📍 STEP: Then I should see the main title "${titleText}" is displayed correctly`);
    console.log(`Step: Verifying main title display - ${titleText}`);
    
    // Validation logging
    if (!titleText) {
        cy.log('⚠️ WARNING: titleText parameter is empty or undefined');
        console.warn('Step: titleText parameter is empty or undefined');
    }
    
    PaymentPage.verifyMainTitleDisplay(titleText);
    cy.log(`✅ STEP COMPLETED: Main title "${titleText}" display verified`);
});

// ===== ADDITIONAL HELPER STEPS =====

Then('I should see the payment page title matches fixture', () => {
    cy.log('📍 STEP: Then I should see the payment page title matches fixture');
    console.log('Step: Verifying payment page title matches fixture data');
    
    // Verify the title from pageLabels section of fixture
    PaymentPage.verifyMainTitleDisplay(paymentData.pageLabels.mainTitle);
    cy.log('✅ STEP COMPLETED: Payment page title matches fixture data');
});

Then('I should see all payment form fields are visible', () => {
    cy.log('📍 STEP: Then I should see all payment form fields are visible');
    console.log('Step: Comprehensive verification of all payment form fields');
    
    // Verify main page elements
    cy.get(`[data-testid="${paymentData.pageInfo.testId}"]`).should('be.visible');
    cy.get(`[data-testid="${paymentData.formElements.paymentForm}"]`).should('be.visible');
    
    // Verify all form inputs
    cy.get(`[data-testid="${paymentData.formElements.cardHolderInput}"]`).should('be.visible');
    cy.get(`[data-testid="${paymentData.formElements.cardNumberInput}"]`).should('be.visible');
    cy.get(`[data-testid="${paymentData.formElements.expiryInput}"]`).should('be.visible');
    cy.get(`[data-testid="${paymentData.formElements.cvvInput}"]`).should('be.visible');
    
    // Verify action buttons
    cy.get(`[data-testid="${paymentData.formElements.completePaymentButton}"]`).should('be.visible');
    cy.get(`[data-testid="${paymentData.formElements.backToAddressButton}"]`).should('be.visible');
    
    cy.log('✅ STEP COMPLETED: All payment form fields visibility verified');
});

Then('I should see the payment page URL matches fixture', () => {
    cy.log('📍 STEP: Then I should see the payment page URL matches fixture');
    console.log('Step: Verifying payment page URL matches fixture data');
    cy.url().should('include', paymentData.pageInfo.url);
    cy.log('✅ STEP COMPLETED: Payment page URL matches fixture data');
});

// ===== BACK TO ADDRESS NAVIGATION STEPS =====

When('I click the {string} button on payment page', (buttonText) => {
    cy.log(`📍 STEP: When I click the "${buttonText}" button on payment page`);
    console.log(`Step: Clicking the ${buttonText} button on payment page`);
    
    // Validation logging
    if (!buttonText) {
        cy.log('⚠️ WARNING: buttonText parameter is empty or undefined');
        console.warn('Step: buttonText parameter is empty or undefined');
    }
    
    // Handle different button types specific to payment page
    if (buttonText.toLowerCase().includes('back to address')) {
        cy.log('🔍 Identified as Back to Address button click');
        console.log('Step: Clicking Back to Address button');
        PaymentPage.clickBackToAddressButton();
    } else if (buttonText.toLowerCase().includes('place order') || buttonText.toLowerCase().includes('complete payment')) {
        cy.log('🔍 Identified as Place Order button click');
        console.log('Step: Clicking Place Order button');
        PaymentPage.clickPlaceOrder();
    } else {
        cy.log(`⚠️ WARNING: Unrecognized payment page button: "${buttonText}"`);
        console.warn(`Step: Unrecognized payment page button: ${buttonText}`);
        // Fallback to generic button click
        cy.contains(buttonText).click();
        cy.log(`👆 Clicked button containing text: "${buttonText}"`);
    }
    
    cy.log(`✅ STEP COMPLETED: Successfully clicked "${buttonText}" button on payment page`);
});

Then('I should be navigated to the address page', () => {
    cy.log('📍 STEP: Then I should be navigated to the address page');
    console.log('Step: Verifying navigation to address page');
    AddressPage.verifyDeliveryAddressPage();
    cy.log('✅ STEP COMPLETED: Navigation to address page verified');
});

Then('I should see the address page URL is correct', () => {
    cy.log('📍 STEP: Then I should see the address page URL is correct');
    console.log('Step: Verifying address page URL structure');
    cy.url().should('include', '/checkout/address');
    cy.log('✅ STEP COMPLETED: Address page URL verified');
});

Then('I should see the delivery address form', () => {
    cy.log('📍 STEP: Then I should see the delivery address form');
    console.log('Step: Verifying delivery address form is visible');
    AddressPage.verifyAddressFormVisible();
    cy.log('✅ STEP COMPLETED: Delivery address form visibility verified');
});

// ===== HTML5 VALIDATION STEPS =====

When('I click the {string} button on payment page without filling any fields', (buttonText) => {
    cy.log(`📍 STEP: When I click the "${buttonText}" button on payment page without filling any fields`);
    console.log(`Step: Clicking ${buttonText} button without filling any fields`);
    
    // Validation logging
    if (!buttonText) {
        cy.log('⚠️ WARNING: buttonText parameter is empty or undefined');
        console.warn('Step: buttonText parameter is empty or undefined');
    }
    
    // Handle different button types for empty form submission
    if (buttonText.toLowerCase().includes('place order') || buttonText.toLowerCase().includes('complete payment')) {
        cy.log('🔍 Identified as Place Order button click without filling fields');
        console.log('Step: Clicking Place Order button on empty form');
        PaymentPage.clickPlaceOrderWithoutFilling();
    } else {
        cy.log(`⚠️ WARNING: Unrecognized payment button for empty form: "${buttonText}"`);
        console.warn(`Step: Unrecognized payment button for empty form: ${buttonText}`);
        // Fallback to generic button click
        cy.contains(buttonText).click();
        cy.log(`👆 Clicked button containing text: "${buttonText}" on empty form`);
    }
    
    cy.log(`✅ STEP COMPLETED: Successfully clicked "${buttonText}" button without filling fields`);
});

Then('I should see HTML5 validation tooltip {string}', (expectedMessage) => {
    cy.log(`📍 STEP: Then I should see HTML5 validation tooltip "${expectedMessage}"`);
    console.log(`Step: Verifying HTML5 validation tooltip - ${expectedMessage}`);
    
    // Validation logging
    if (!expectedMessage) {
        cy.log('⚠️ WARNING: expectedMessage parameter is empty or undefined');
        console.warn('Step: expectedMessage parameter is empty or undefined');
    }
    
    PaymentPage.verifyHTML5ValidationTooltip(expectedMessage);
    cy.log(`✅ STEP COMPLETED: HTML5 validation tooltip "${expectedMessage}" verified`);
});

Then('the payment form should not be submitted', () => {
    cy.log('📍 STEP: Then the payment form should not be submitted');
    console.log('Step: Verifying payment form was not submitted');
    PaymentPage.verifyFormNotSubmitted();
    cy.log('✅ STEP COMPLETED: Payment form not submitted verification successful');
});

Then('I should remain on the payment page', () => {
    cy.log('📍 STEP: Then I should remain on the payment page');
    console.log('Step: Verifying user remains on payment page');
    PaymentPage.verifyRemainsOnPaymentPage();
    cy.log('✅ STEP COMPLETED: User remains on payment page verification successful');
});

// ===== FIELD BLUR VALIDATION STEPS =====

When('I click on the {string} field on payment page', (fieldName) => {
    cy.log(`📍 STEP: When I click on the "${fieldName}" field on payment page`);
    console.log(`Step: Clicking on ${fieldName} field on payment page`);
    
    // Validation logging
    if (!fieldName) {
        cy.log('⚠️ WARNING: fieldName parameter is empty or undefined');
        console.warn('Step: fieldName parameter is empty or undefined');
    }
    
    PaymentPage.clickOnField(fieldName);
    cy.log(`✅ STEP COMPLETED: Successfully clicked on "${fieldName}" field on payment page`);
});

When('I click somewhere else on the page', () => {
    cy.log('📍 STEP: When I click somewhere else on the page');
    console.log('Step: Clicking somewhere else to trigger field blur');
    PaymentPage.clickSomewhereElse();
    cy.log('✅ STEP COMPLETED: Successfully clicked elsewhere to trigger blur');
});

Then('I should see the validation error {string} for the {string} field', (expectedMessage, fieldName) => {
    cy.log(`📍 STEP: Then I should see the validation error "${expectedMessage}" for the "${fieldName}" field`);
    console.log(`Step: Verifying validation error for ${fieldName} - ${expectedMessage}`);
    
    // Validation logging
    if (!expectedMessage) {
        cy.log('⚠️ WARNING: expectedMessage parameter is empty or undefined');
        console.warn('Step: expectedMessage parameter is empty or undefined');
    }
    if (!fieldName) {
        cy.log('⚠️ WARNING: fieldName parameter is empty or undefined');
        console.warn('Step: fieldName parameter is empty or undefined');
    }
    
    PaymentPage.verifyValidationError(fieldName, expectedMessage);
    cy.log(`✅ STEP COMPLETED: Validation error "${expectedMessage}" verified for "${fieldName}" field`);
});

// ===== INVALID INPUT VALIDATION STEPS =====

When('I type {string} in the {string} field on payment page', (text, fieldName) => {
    cy.log(`📍 STEP: When I type "${text}" in the "${fieldName}" field on payment page`);
    console.log(`Step: Typing "${text}" in ${fieldName} field on payment page`);
    
    // Validation logging
    if (!text) {
        cy.log('⚠️ WARNING: text parameter is empty or undefined');
        console.warn('Step: text parameter is empty or undefined');
    }
    if (!fieldName) {
        cy.log('⚠️ WARNING: fieldName parameter is empty or undefined');
        console.warn('Step: fieldName parameter is empty or undefined');
    }
    
    PaymentPage.typeInField(fieldName, text);
    cy.log(`✅ STEP COMPLETED: Successfully typed "${text}" in "${fieldName}" field on payment page`);
});

// ===== PROGRESSIVE FORM FILLING AND SUCCESS STEPS =====

When('I click the {string} button on payment page', (buttonText) => {
    cy.log(`📍 STEP: When I click the "${buttonText}" button on payment page`);
    console.log(`Step: Clicking "${buttonText}" button on payment page for submission`);
    
    // Validation logging
    if (!buttonText) {
        cy.log('⚠️ WARNING: buttonText parameter is empty or undefined');
        console.warn('Step: buttonText parameter is empty or undefined');
    }
    
    // Handle Place Order button for successful submission
    if (buttonText.toLowerCase().includes('place order')) {
        cy.log('🔍 Identified as Place Order button for form submission');
        console.log('Step: Clicking Place Order for form submission');
        PaymentPage.clickPlaceOrder();
    } else {
        cy.log(`⚠️ WARNING: Unrecognized button for payment submission: "${buttonText}"`);
        console.warn(`Step: Unrecognized button: ${buttonText}`);
        // Fallback to generic button click
        cy.contains(buttonText).click();
        cy.log(`👆 Clicked button containing text: "${buttonText}"`);
    }
    
    cy.log(`✅ STEP COMPLETED: Successfully clicked "${buttonText}" button on payment page`);
});

Then('I should be navigated to the success page', () => {
    cy.log('📍 STEP: Then I should be navigated to the success page');
    console.log('Step: Verifying navigation to success page');
    cy.url().should('include', '/checkout/success');
    cy.log('✅ STEP COMPLETED: Navigation to success page verified');
});

Then('I should see the success page URL is correct', () => {
    cy.log('📍 STEP: Then I should see the success page URL is correct');
    console.log('Step: Verifying success page URL structure');
    cy.url().should('include', '/checkout/success');
    cy.log('✅ STEP COMPLETED: Success page URL verified');
});