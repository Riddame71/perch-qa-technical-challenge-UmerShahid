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
        backToCartButton: () => cy.get('[data-testid="back-to-cart"]')
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
}

export default new AddressPage();