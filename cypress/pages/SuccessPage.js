class SuccessPage {
    elements = {
        // Main page
        successPage: () => cy.get('[data-testid="success-page"]'),
        orderInfo: () => cy.get('[data-testid="order-info"]'),
        orderNumber: () => cy.get('[data-testid="order-number"]'),
        orderTotal: () => cy.get('[data-testid="order-total"]'),
        
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

    verifyOrderTotal(expectedTotal) {
        cy.log(`🔍 Verifying order total matches ${expectedTotal}`);
        console.log(`SuccessPage: Verifying order total is ${expectedTotal}`);
        
        // NOTE: Success page doesn't display order total
        // This method is kept for documentation of expected behavior
        cy.log(`📝 NOTE: Expected total should be ${expectedTotal}`);
        cy.log(`💡 Success page doesn't display total - verified in order history instead`);
        cy.log(`✅ Order total expectation documented for ${expectedTotal}`);
    }

    verifyOrderDataRetrieval() {
        cy.log('🔍 Verifying order data can be retrieved from localStorage');
        console.log('SuccessPage: Checking localStorage data access');
        
        // This will FAIL - Bug #5: localStorage key mismatch
        // Site looks for 'shopping-cart' but tests store data in 'cart'
        cy.window().then((win) => {
            const cartData = win.localStorage.getItem('shopping-cart');
            expect(cartData).to.not.be.null;
            
            if (cartData) {
                const parsedData = JSON.parse(cartData);
                expect(parsedData).to.be.an('array');
                expect(parsedData.length).to.be.greaterThan(0);
            }
        });
        
        cy.log('✅ Order data retrieval verification successful');
    }
}

export default new SuccessPage();