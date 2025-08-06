class PaymentPage {
    elements = {
        // Main page
        paymentPage: () => cy.get('[data-testid="payment-page"]'),
        paymentForm: () => cy.get('[data-testid="payment-form"]'),
        
        // Form fields
        cardHolderInput: () => cy.get('[data-testid="cardholder-input"]'),
        cardNumberInput: () => cy.get('[data-testid="card-number-input"]'),
        expiryInput: () => cy.get('[data-testid="expiry-input"]'),
        cvvInput: () => cy.get('[data-testid="cvv-input"]'),
        
        // Actions
        placeOrderButton: () => cy.get('[data-testid="complete-payment"]'),
        backToAddressButton: () => cy.get('[data-testid="back-to-address"]')
    }

    // Fill payment form with fixture data
    fillPaymentInformation(paymentData) {
        cy.log('💳 Filling payment information');
        console.log('PaymentPage: Filling payment form');
        
        this.elements.cardHolderInput().clear().type(paymentData.cardHolderName);
        this.elements.cardNumberInput().clear().type(paymentData.cardNumber);
        this.elements.expiryInput().clear().type(paymentData.expiryDate);
        this.elements.cvvInput().clear().type(paymentData.cvv);
        
        cy.log('✅ Payment information filled successfully');
    }

    clickPlaceOrder() {
        cy.log('👆 Clicking Place Order button');
        console.log('PaymentPage: Clicking place order');
        this.elements.placeOrderButton().click();
        cy.log('✅ Place Order button clicked successfully');
        cy.wait(2000); // Wait for payment processing
        cy.log('⏳ Waiting for payment processing');
    }

    // Navigate directly to payment page
    visitDirectly(url = '/checkout/payment') {
        cy.log('🚀 Navigating directly to payment page');
        console.log('PaymentPage: Direct navigation to payment page');
        cy.visit(url);
        cy.log('✅ Direct navigation completed');
    }

    // Verify payment page URL is correct
    verifyPaymentPageURL() {
        cy.log('🔍 Verifying payment page URL');
        console.log('PaymentPage: Verifying URL structure');
        cy.url().should('include', '/checkout/payment');
        cy.log('✅ Payment page URL verified');
    }

    // Verify payment form elements are visible
    verifyPaymentFormElements() {
        cy.log('🔍 Verifying payment form elements');
        console.log('PaymentPage: Verifying form elements visibility');
        
        this.elements.paymentForm().should('be.visible');
        this.elements.cardHolderInput().should('be.visible');
        this.elements.cardNumberInput().should('be.visible');
        this.elements.expiryInput().should('be.visible');
        this.elements.cvvInput().should('be.visible');
        this.elements.placeOrderButton().should('be.visible');
        this.elements.backToAddressButton().should('be.visible');
        
        cy.log('✅ Payment form elements verified');
    }

    // Verify page title from fixture data
    verifyPageTitleFromFixture(expectedTitle) {
        cy.log(`🔍 Verifying page title from fixture: "${expectedTitle}"`);
        console.log(`PaymentPage: Verifying title from fixture - ${expectedTitle}`);
        cy.contains(expectedTitle).should('be.visible');
        cy.get('h1').should('contain.text', expectedTitle);
        cy.log(`✅ Page title "${expectedTitle}" verified from fixture`);
    }

    // Verify main title is displayed correctly
    verifyMainTitleDisplay(titleText) {
        cy.log(`🔍 Verifying main title display: "${titleText}"`);
        console.log(`PaymentPage: Verifying main title - ${titleText}`);
        cy.get('h1.product-name').should('be.visible').and('contain.text', titleText);
        cy.get('[aria-label="Payment Information"]').should('exist');
        cy.log(`✅ Main title "${titleText}" displayed correctly`);
    }

    // Click back to address button
    clickBackToAddressButton() {
        cy.log('👆 Clicking Back to Address button');
        console.log('PaymentPage: Clicking back to address button');
        this.elements.backToAddressButton().should('be.visible').click();
        cy.log('✅ Back to Address button clicked successfully');
    }

    // Click Place Order button without filling any fields for validation testing
    clickPlaceOrderWithoutFilling() {
        cy.log('👆 Clicking Place Order button without filling any fields');
        console.log('PaymentPage: Attempting to submit empty payment form');
        this.elements.placeOrderButton().click();
        cy.log('✅ Place Order button clicked on empty form');
    }

    // Verify HTML5 validation tooltip appears on the first invalid field
    verifyHTML5ValidationTooltip(expectedMessage) {
        cy.log(`🔍 Verifying HTML5 validation tooltip: "${expectedMessage}"`);
        console.log(`PaymentPage: Checking for HTML5 validation tooltip - ${expectedMessage}`);
        
        // Use a more direct approach - check the currently focused/active element
        // or check each field until we find one with a validation message
        cy.get('input:invalid').first().then($input => {
            const validationMessage = $input[0].validationMessage;
            cy.log(`🎯 Found validation tooltip: "${validationMessage}"`);
            expect(validationMessage).to.not.be.empty;
            if (expectedMessage) {
                expect(validationMessage).to.contain(expectedMessage);
            }
        });
        
        cy.log(`✅ HTML5 validation tooltip verified: "${expectedMessage}"`);
    }

    // Verify form was not submitted (still on payment page)
    verifyFormNotSubmitted() {
        cy.log('🔍 Verifying payment form was not submitted');
        console.log('PaymentPage: Verifying form not submitted');
        cy.url().should('include', '/checkout/payment');
        this.elements.paymentPage().should('be.visible');
        cy.log('✅ Payment form was not submitted - still on payment page');
    }

    // Verify user remains on payment page
    verifyRemainsOnPaymentPage() {
        cy.log('🔍 Verifying user remains on payment page');
        console.log('PaymentPage: Verifying still on payment page');
        cy.url().should('include', '/checkout/payment');
        cy.contains('Payment Information').should('be.visible');
        this.elements.paymentPage().should('be.visible');
        cy.log('✅ User remains on payment page verification successful');
    }

    // Click on specific field
    clickOnField(fieldName) {
        cy.log(`👆 Clicking on ${fieldName} field`);
        console.log(`PaymentPage: Clicking on ${fieldName} field`);
        
        // Map field names to match exactly what's in the source code
        switch (fieldName.toLowerCase()) {
            case 'card holder name':
                this.elements.cardHolderInput().click();
                break;
            case 'card number':
                this.elements.cardNumberInput().click();
                break;
            case 'expiry date':
                this.elements.expiryInput().click();
                break;
            case 'cvv':
                this.elements.cvvInput().click();
                break;
            // Additional variations to handle potential mismatches
            case 'cardholder':
            case 'cardholder name':
                this.elements.cardHolderInput().click();
                break;
            case 'cardnumber':
            case 'card_number':
                this.elements.cardNumberInput().click();
                break;
            case 'expiry':
            case 'expiry_date':
            case 'expirydate':
                this.elements.expiryInput().click();
                break;
            default:
                cy.log(`❌ ERROR: Unknown field: ${fieldName}`);
                cy.log(`📋 Available fields: Card Holder Name, Card Number, Expiry Date, CVV`);
                throw new Error(`Unknown payment field: ${fieldName}. Available fields: Card Holder Name, Card Number, Expiry Date, CVV`);
        }
        
        cy.log(`✅ ${fieldName} field clicked successfully`);
    }

    // Click somewhere else on the page to trigger blur event
    clickSomewhereElse() {
        cy.log('👆 Clicking somewhere else on the page to trigger blur');
        console.log('PaymentPage: Clicking elsewhere to trigger field blur');
        // Click on the page title to trigger blur
        cy.get('h1.product-name').click();
        cy.log('✅ Clicked elsewhere on page - blur event triggered');
    }

    // Type text in specific field
    typeInField(fieldName, text) {
        cy.log(`⌨️ Typing "${text}" in ${fieldName} field`);
        console.log(`PaymentPage: Typing "${text}" in ${fieldName} field`);
        
        // Map field names to input elements
        switch (fieldName.toLowerCase()) {
            case 'card holder name':
                this.elements.cardHolderInput().clear().type(text);
                break;
            case 'card number':
                this.elements.cardNumberInput().clear().type(text);
                break;
            case 'expiry date':
                this.elements.expiryInput().clear().type(text);
                break;
            case 'cvv':
                this.elements.cvvInput().clear().type(text);
                break;
            // Additional variations to handle potential mismatches
            case 'cardholder':
            case 'cardholder name':
                this.elements.cardHolderInput().clear().type(text);
                break;
            case 'cardnumber':
            case 'card_number':
                this.elements.cardNumberInput().clear().type(text);
                break;
            case 'expiry':
            case 'expiry_date':
            case 'expirydate':
                this.elements.expiryInput().clear().type(text);
                break;
            default:
                cy.log(`❌ ERROR: Unknown field for typing: ${fieldName}`);
                cy.log(`📋 Available fields: Card Holder Name, Card Number, Expiry Date, CVV`);
                throw new Error(`Unknown payment field for typing: ${fieldName}. Available fields: Card Holder Name, Card Number, Expiry Date, CVV`);
        }
        
        cy.log(`✅ Successfully typed "${text}" in ${fieldName} field`);
    }

    // Verify validation error message for specific field
    verifyValidationError(fieldName, expectedMessage) {
        cy.log(`🔍 Verifying validation error for ${fieldName}: "${expectedMessage}"`);
        console.log(`PaymentPage: Verifying validation error for ${fieldName} - ${expectedMessage}`);
        
        let fieldSelector;
        switch (fieldName.toLowerCase()) {
            case 'card holder name':
                fieldSelector = '[data-testid="cardholder-input"]';
                break;
            case 'card number':
                fieldSelector = '[data-testid="card-number-input"]';
                break;
            case 'expiry date':
                fieldSelector = '[data-testid="expiry-input"]';
                break;
            case 'cvv':
                fieldSelector = '[data-testid="cvv-input"]';
                break;
            // Additional variations to handle potential mismatches
            case 'cardholder':
            case 'cardholder name':
                fieldSelector = '[data-testid="cardholder-input"]';
                break;
            case 'cardnumber':
            case 'card_number':
                fieldSelector = '[data-testid="card-number-input"]';
                break;
            case 'expiry':
            case 'expiry_date':
            case 'expirydate':
                fieldSelector = '[data-testid="expiry-input"]';
                break;
            default:
                cy.log(`❌ ERROR: Unknown field for validation: ${fieldName}`);
                cy.log(`📋 Available fields: Card Holder Name, Card Number, Expiry Date, CVV`);
                throw new Error(`Unknown payment field for validation: ${fieldName}. Available fields: Card Holder Name, Card Number, Expiry Date, CVV`);
        }
        
        // Check for validation error message near the field (following the source code structure)
        cy.get(fieldSelector).parent().find('.error-message')
            .should('be.visible')
            .and('contain.text', expectedMessage);
        
        cy.log(`✅ Validation error verified for ${fieldName}: "${expectedMessage}"`);
    }

    // Click Place Order button for successful form submission
    clickPlaceOrder() {
        cy.log('👆 Clicking Place Order button for form submission');
        console.log('PaymentPage: Clicking Place Order for submission');
        this.elements.placeOrderButton().click();
        cy.log('✅ Place Order button clicked for submission');
    }

    verifyPaymentPage() {
        cy.log('🔍 Verifying payment information page');
        console.log('PaymentPage: Verifying payment page');
        this.elements.paymentPage().should('be.visible');
        cy.url().should('include', '/checkout/payment');
        cy.contains('Payment Information').should('be.visible');
        cy.log('✅ Payment page verification successful');
    }
}

export default new PaymentPage();