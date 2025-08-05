class AddressPage {
    elements = {
        // Main page
        addressPage: () => cy.get('[data-testid="address-page"]'),
        addressForm: () => cy.get('[data-testid="address-form"]'),
        
        // Form fields
        firstNameInput: () => cy.get('[data-testid="firstname-input"]'),
        emailInput: () => cy.get('[data-testid="email-input"]'),
        phoneInput: () => cy.get('[data-testid="phone-input"]'),
        streetInput: () => cy.get('[data-testid="street-input"]'),
        cityInput: () => cy.get('[data-testid="city-input"]'),
        stateInput: () => cy.get('[data-testid="state-input"]'),
        zipCodeInput: () => cy.get('[data-testid="zipcode-input"]'),
        countryInput: () => cy.get('[data-testid="country-input"]'),
        
        // Actions
        continueToPaymentButton: () => cy.get('[data-testid="continue-to-payment"]'),
        backToCartButton: () => cy.get('[data-testid="back-to-cart"]'),
        
        // Error messages
        errorMessages: () => cy.get('.error-message'),
        firstNameError: () => cy.get('[data-testid="firstname-input"]').parent().find('.error-message'),
        emailError: () => cy.get('[data-testid="email-input"]').parent().find('.error-message'),
        phoneError: () => cy.get('[data-testid="phone-input"]').parent().find('.error-message'),
        streetError: () => cy.get('[data-testid="street-input"]').parent().find('.error-message'),
        cityError: () => cy.get('[data-testid="city-input"]').parent().find('.error-message'),
        stateError: () => cy.get('[data-testid="state-input"]').parent().find('.error-message'),
        zipCodeError: () => cy.get('[data-testid="zipcode-input"]').parent().find('.error-message'),
        countryError: () => cy.get('[data-testid="country-input"]').parent().find('.error-message'),
        
        // Page elements
        pageTitle: () => cy.contains('Delivery Address'),
        backToCartText: () => cy.contains('← Back to Cart'),
        continueButtonText: () => cy.contains('Continue to Payment')
    }

    // Fill address form with fixture data
    fillDeliveryAddress(addressData) {
        cy.log('📝 Filling delivery address information');
        console.log('AddressPage: Filling address form');
        
        this.elements.firstNameInput().clear().type(addressData.firstName);
        this.elements.emailInput().clear().type(addressData.email);
        this.elements.phoneInput().clear().type(addressData.phone);
        this.elements.streetInput().clear().type(addressData.streetAddress);
        this.elements.cityInput().clear().type(addressData.city);
        this.elements.stateInput().clear().type(addressData.state);
        this.elements.zipCodeInput().clear().type(addressData.zipCode);
        this.elements.countryInput().clear().type(addressData.country);
        
        cy.log('✅ Delivery address information filled successfully');
    }

    clickContinueToPayment() {
        cy.log('👆 Clicking Continue to Payment button');
        console.log('AddressPage: Clicking continue to payment');
        this.elements.continueToPaymentButton().click();
        cy.log('✅ Continue to Payment button clicked successfully');
        cy.wait(500);
        cy.log('⏳ Waiting for navigation to payment page');
    }

    verifyDeliveryAddressPage() {
        cy.log('🔍 Verifying delivery address page');
        console.log('AddressPage: Verifying address page');
        this.elements.addressPage().should('be.visible');
        cy.url().should('include', '/checkout/address');
        cy.contains('Delivery Address').should('be.visible');
        cy.log('✅ Delivery address page verification successful');
    }

    // Additional elements for validation testing
    visitDirectly(url) {
        cy.log(`🏠 Navigating directly to address page: ${url}`);
        console.log(`AddressPage: Visiting ${url}`);
        cy.visit(url);
        cy.log('✅ Successfully navigated to address page');
    }

    // Page verification methods
    verifyPageTitle(expectedTitle) {
        cy.log(`🔍 Verifying page title: "${expectedTitle}"`);
        console.log(`AddressPage: Verifying page title - ${expectedTitle}`);
        this.elements.pageTitle().should('be.visible').and('contain.text', expectedTitle);
        cy.log(`✅ Page title verification successful: "${expectedTitle}"`);
    }

    verifyAddressFormVisible() {
        cy.log('🔍 Verifying address form is visible');
        console.log('AddressPage: Verifying address form visibility');
        this.elements.addressForm().should('be.visible');
        cy.log('✅ Address form is visible');
    }

    verifyBackToCartButton(expectedText) {
        cy.log(`🔍 Verifying Back to Cart button: "${expectedText}"`);
        console.log(`AddressPage: Verifying Back to Cart button - ${expectedText}`);
        this.elements.backToCartText().should('be.visible').and('contain.text', expectedText);
        cy.log(`✅ Back to Cart button verification successful`);
    }

    verifyContinueToPaymentButton(expectedText) {
        cy.log(`🔍 Verifying Continue to Payment button: "${expectedText}"`);
        console.log(`AddressPage: Verifying Continue to Payment button - ${expectedText}`);
        this.elements.continueButtonText().should('be.visible').and('contain.text', expectedText);
        cy.log(`✅ Continue to Payment button verification successful`);
    }

    // Field interaction methods
    clickField(fieldName) {
        cy.log(`👆 Clicking on ${fieldName} field`);
        console.log(`AddressPage: Clicking ${fieldName} field`);
        
        switch (fieldName) {
            case 'first name':
                this.elements.firstNameInput().click();
                break;
            case 'email':
                this.elements.emailInput().click();
                break;
            case 'phone':
                this.elements.phoneInput().click();
                break;
            case 'street address':
                this.elements.streetInput().click();
                break;
            case 'city':
                this.elements.cityInput().click();
                break;
            case 'state':
                this.elements.stateInput().click();
                break;
            case 'zip code':
                this.elements.zipCodeInput().click();
                break;
            case 'country':
                this.elements.countryInput().click();
                break;
            default:
                throw new Error(`Unknown field: ${fieldName}`);
        }
        cy.log(`✅ Successfully clicked ${fieldName} field`);
    }

    clickOutsideField(fieldName) {
        cy.log(`👆 Clicking outside ${fieldName} field to trigger blur`);
        console.log(`AddressPage: Clicking outside ${fieldName} field`);
        
        // Ensure the field is focused first, then blur it
        switch (fieldName) {
            case 'street address':
                cy.get('[data-testid="street-input"]').focus().blur();
                break;
            case 'city':
                cy.get('[data-testid="city-input"]').focus().blur();
                break;
            case 'state':
                cy.get('[data-testid="state-input"]').focus().blur();
                break;
            case 'first name':
                cy.get('[data-testid="firstname-input"]').focus().blur();
                break;
            case 'email':
                cy.get('[data-testid="email-input"]').focus().blur();
                break;
            case 'phone':
                cy.get('[data-testid="phone-input"]').focus().blur();
                break;
            case 'zip code':
                cy.get('[data-testid="zipcode-input"]').focus().blur();
                break;
            case 'country':
                cy.get('[data-testid="country-input"]').focus().blur();
                break;
            default:
                throw new Error(`Unknown field: ${fieldName}`);
        }
        
        // Wait for validation to complete after blur event
        cy.wait(1000);
        
        cy.log(`✅ Successfully triggered blur for ${fieldName} field`);
    }

    enterValueInField(fieldName, value) {
        cy.log(`📝 Entering "${value}" in ${fieldName} field`);
        console.log(`AddressPage: Entering value in ${fieldName} field - ${value}`);
        
        switch (fieldName) {
            case 'first name':
                this.elements.firstNameInput().clear().type(value);
                break;
            case 'email':
                this.elements.emailInput().clear().type(value);
                break;
            case 'phone':
                this.elements.phoneInput().clear().type(value);
                break;
            case 'street address':
                this.elements.streetInput().clear().type(value);
                break;
            case 'city':
                this.elements.cityInput().clear().type(value);
                break;
            case 'state':
                this.elements.stateInput().clear().type(value);
                break;
            case 'zip code':
                this.elements.zipCodeInput().clear().type(value);
                break;
            case 'country':
                this.elements.countryInput().clear().type(value);
                break;
            default:
                throw new Error(`Unknown field: ${fieldName}`);
        }
        cy.log(`✅ Successfully entered value in ${fieldName} field`);
    }

    // Error message verification methods
    verifyErrorMessage(fieldName, expectedMessage) {
        cy.log(`🔍 Verifying error message for ${fieldName}: "${expectedMessage}"`);
        console.log(`AddressPage: Verifying error message for ${fieldName} - ${expectedMessage}`);
        
        // Wait for validation to complete after blur
        cy.wait(1500);
        
        switch (fieldName) {
            case 'first name':
                cy.get('[data-testid="firstname-input"]').parent().within(() => {
                    cy.get('.error-message', { timeout: 10000 }).should('be.visible').and('contain.text', expectedMessage);
                });
                break;
            case 'email':
                cy.get('[data-testid="email-input"]').parent().within(() => {
                    cy.get('.error-message', { timeout: 10000 }).should('be.visible').and('contain.text', expectedMessage);
                });
                break;
            case 'phone':
                cy.get('[data-testid="phone-input"]').parent().within(() => {
                    cy.get('.error-message', { timeout: 10000 }).should('be.visible').and('contain.text', expectedMessage);
                });
                break;
            case 'street address':
                cy.get('[data-testid="street-input"]').parent().within(() => {
                    cy.get('.error-message', { timeout: 10000 }).should('be.visible').and('contain.text', expectedMessage);
                });
                break;
            case 'city':
                cy.get('[data-testid="city-input"]').parent().within(() => {
                    cy.get('.error-message', { timeout: 10000 }).should('be.visible').and('contain.text', expectedMessage);
                });
                break;
            case 'state':
                cy.get('[data-testid="state-input"]').parent().within(() => {
                    cy.get('.error-message', { timeout: 10000 }).should('be.visible').and('contain.text', expectedMessage);
                });
                break;
            case 'zip code':
                cy.get('[data-testid="zipcode-input"]').parent().within(() => {
                    cy.get('.error-message', { timeout: 10000 }).should('be.visible').and('contain.text', expectedMessage);
                });
                break;
            case 'country':
                cy.get('[data-testid="country-input"]').parent().within(() => {
                    cy.get('.error-message', { timeout: 10000 }).should('be.visible').and('contain.text', expectedMessage);
                });
                break;
            default:
                throw new Error(`Unknown field: ${fieldName}`);
        }
        cy.log(`✅ Error message verification successful for ${fieldName}`);
    }

    verifyNoErrorMessage(fieldName) {
        cy.log(`🔍 Verifying no error message for ${fieldName}`);
        console.log(`AddressPage: Verifying no error message for ${fieldName}`);
        
        switch (fieldName) {
            case 'first name':
                this.elements.firstNameError().should('not.exist');
                break;
            case 'email':
                this.elements.emailError().should('not.exist');
                break;
            case 'phone':
                this.elements.phoneError().should('not.exist');
                break;
            case 'street address':
                this.elements.streetError().should('not.exist');
                break;
            case 'city':
                this.elements.cityError().should('not.exist');
                break;
            case 'state':
                this.elements.stateError().should('not.exist');
                break;
            case 'zip code':
                this.elements.zipCodeError().should('not.exist');
                break;
            case 'country':
                this.elements.countryError().should('not.exist');
                break;
            default:
                throw new Error(`Unknown field: ${fieldName}`);
        }
        cy.log(`✅ No error message verification successful for ${fieldName}`);
    }

    verifyNoValidationErrors() {
        cy.log('🔍 Verifying no validation error messages are displayed');
        console.log('AddressPage: Verifying no validation errors');
        this.elements.errorMessages().should('not.exist');
        cy.log('✅ No validation errors verification successful');
    }

    // Form filling methods with fixture data
    fillValidAddressData(addressData) {
        cy.log('📝 Filling form with valid address data from fixtures');
        console.log('AddressPage: Filling valid address data');
        
        this.elements.firstNameInput().clear().type(addressData.firstName);
        this.elements.emailInput().clear().type(addressData.email);
        this.elements.phoneInput().clear().type(addressData.phone);
        this.elements.streetInput().clear().type(addressData.street);
        this.elements.cityInput().clear().type(addressData.city);
        this.elements.stateInput().clear().type(addressData.state);
        this.elements.zipCodeInput().clear().type(addressData.zipCode);
        this.elements.countryInput().clear().type(addressData.country);
        
        cy.log('✅ Valid address data filled successfully');
    }

    fillInvalidDataInMultipleFields(invalidData) {
        cy.log('📝 Filling form with invalid data in multiple fields');
        console.log('AddressPage: Filling invalid data');
        
        this.elements.emailInput().clear().type(invalidData.email.invalidFormat);
        this.elements.phoneInput().clear().type(invalidData.phone.alphabetic);
        this.elements.zipCodeInput().clear().type(invalidData.zipCode.tooShort);
        this.elements.stateInput().clear().type(invalidData.state.numeric);
        
        cy.log('✅ Invalid data filled in multiple fields');
    }

    verifyFormFieldValues(addressData) {
        cy.log('🔍 Verifying form field values match entered data');
        console.log('AddressPage: Verifying form field values');
        
        this.elements.firstNameInput().should('have.value', addressData.firstName);
        this.elements.emailInput().should('have.value', addressData.email);
        this.elements.phoneInput().should('have.value', addressData.phone);
        this.elements.streetInput().should('have.value', addressData.street);
        this.elements.cityInput().should('have.value', addressData.city);
        this.elements.stateInput().should('have.value', addressData.state);
        this.elements.zipCodeInput().should('have.value', addressData.zipCode);
        this.elements.countryInput().should('have.value', addressData.country);
        
        cy.log('✅ Form field values verification successful');
    }

    // Navigation methods
    clickBackToCart() {
        cy.log('👆 Clicking Back to Cart button');
        console.log('AddressPage: Clicking Back to Cart button');
        this.elements.backToCartButton().click();
        cy.log('✅ Back to Cart button clicked successfully');
        cy.wait(500);
    }

    verifyNavigationToPaymentPage() {
        cy.log('🔍 Verifying navigation to payment page');
        console.log('AddressPage: Verifying navigation to payment page');
        cy.url().should('include', '/checkout/payment');
        cy.log('✅ Navigation to payment page verified');
    }

    verifyNavigationToCartPage() {
        cy.log('🔍 Verifying navigation to cart page');
        console.log('AddressPage: Verifying navigation to cart page');
        cy.url().should('include', '/cart');
        cy.log('✅ Navigation to cart page verified');
    }

    verifyPageURL(expectedURL) {
        cy.log(`🔍 Verifying page URL contains: "${expectedURL}"`);
        console.log(`AddressPage: Verifying URL contains - ${expectedURL}`);
        cy.url().should('include', expectedURL);
        cy.log(`✅ Page URL verification successful: "${expectedURL}"`);
    }

    verifyRemainsOnAddressPage() {
        cy.log('🔍 Verifying user remains on address page');
        console.log('AddressPage: Verifying still on address page');
        cy.url().should('include', '/checkout/address');
        this.elements.addressPage().should('be.visible');
        cy.log('✅ Verified user remains on address page');
    }

    verifyFormNotSubmitted() {
        cy.log('🔍 Verifying form was not submitted');
        console.log('AddressPage: Verifying form not submitted');
        cy.url().should('include', '/checkout/address');
        cy.log('✅ Form was not submitted - still on address page');
    }

    // HTML5 validation methods
    verifyNativeBrowserValidation() {
        cy.log('🔍 Verifying native browser validation tooltip');
        console.log('AddressPage: Checking for HTML5 validation');
        
        // HTML5 validation will prevent form submission
        // The first required field will show native browser tooltip
        this.elements.firstNameInput().then($input => {
            expect($input[0].validationMessage).to.not.be.empty;
        });
        
        cy.log('✅ Native browser validation verified');
    }

    clickContinueWithoutFilling() {
        cy.log('👆 Clicking Continue to Payment button without filling any fields');
        console.log('AddressPage: Attempting to submit empty form');
        this.elements.continueToPaymentButton().click();
        cy.log('✅ Continue button clicked on empty form');
    }

    // Validation error checking for multiple fields
    verifyValidationErrorsForInvalidFields(errorMessages) {
        cy.log('🔍 Verifying validation errors for multiple invalid fields');
        console.log('AddressPage: Verifying multiple validation errors');
        
        // Check for email error
        this.elements.emailError().should('be.visible').and('contain.text', errorMessages.emailInvalid);
        
        // Check for phone error
        this.elements.phoneError().should('be.visible').and('contain.text', errorMessages.phoneInvalid);
        
        // Check for zip code error
        this.elements.zipCodeError().should('be.visible').and('contain.text', errorMessages.zipCodeInvalid);
        
        // Check for state error
        this.elements.stateError().should('be.visible').and('contain.text', errorMessages.stateInvalid);
        
        cy.log('✅ Multiple validation errors verified successfully');
    }
}

export default new AddressPage();