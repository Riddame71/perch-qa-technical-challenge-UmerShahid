class SuccessPage {
    elements = {
        // Main page
        successPage: () => cy.get('[data-testid="success-page"]'),
        orderInfo: () => cy.get('[data-testid="order-info"]'),
        orderNumber: () => cy.get('[data-testid="order-number"]'),
        
        // Actions
        continueShoppingButton: () => cy.get('[data-testid="continue-shopping"]'),
        viewOrdersButton: () => cy.get('[data-testid="view-orders"]')
    }

    verifyOrderConfirmationPage() {
        cy.log('🔍 Verifying order confirmation page');
        console.log('SuccessPage: Verifying success page');
        this.elements.successPage().should('be.visible');
        cy.url().should('include', '/checkout/success');
        cy.contains('Thank You for Your Purchase!').should('be.visible');
        cy.log('✅ Order confirmation page verification successful');
    }

    verifyOrderNumber() {
        cy.log('🔍 Verifying order number is displayed');
        console.log('SuccessPage: Verifying order number');
        this.elements.orderNumber().should('be.visible').and('contain.text', '#');
        cy.log('✅ Order number verification successful');
    }

    clickViewYourOrders() {
        cy.log('👆 Clicking View Your Orders button');
        console.log('SuccessPage: Clicking view orders');
        this.elements.viewOrdersButton().click();
        cy.log('✅ View Your Orders button clicked successfully');
        cy.wait(500);
        cy.log('⏳ Waiting for navigation to profile page');
    }
}

export default new SuccessPage();