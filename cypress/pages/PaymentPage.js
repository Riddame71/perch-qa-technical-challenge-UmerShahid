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