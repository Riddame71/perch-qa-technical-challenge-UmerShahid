class CartPage {
    elements = {
        // Main cart page
        cartPage: () => cy.get('[data-testid="cart-page"]'),
        cartSummary: () => cy.get('[data-testid="cart-summary"]'),
        subtotal: () => cy.get('[data-testid="subtotal"]'),
        proceedToCheckoutButton: () => cy.get('[data-testid="proceed-to-checkout"]'),
        
        // Empty cart
        emptyCart: () => cy.get('[data-testid="empty-cart"]'),
        continueShoppingButton: () => cy.get('[data-testid="continue-shopping"]'),
        
        // Cart items
        cartItem: (itemId) => cy.get(`[data-testid="cart-item-${itemId}"]`),
        itemPrice: (itemId) => cy.get(`[data-testid="item-price-${itemId}"]`),
        quantity: (itemId) => cy.get(`[data-testid="quantity-${itemId}"]`),
        removeButton: (itemId) => cy.get(`[data-testid="remove-${itemId}"]`)
    }

    // Verification methods
    verifyCartPage() {
        cy.log('🔍 Verifying shopping cart page');
        console.log('CartPage: Verifying cart page');
        this.elements.cartPage().should('be.visible');
        cy.url().should('include', '/cart');
        cy.log('✅ Cart page verification successful');
    }

    verifySelectedProductInCart() {
        cy.log('🔍 Verifying selected product is in cart');
        console.log('CartPage: Verifying product in cart');
        this.elements.cartSummary().should('be.visible');
        this.elements.subtotal().should('be.visible').and('not.contain.text', '$0.00');
        cy.log('✅ Product in cart verification successful');
    }

    // Actions
    clickProceedToCheckout() {
        cy.log('👆 Clicking Proceed to Checkout button');
        console.log('CartPage: Clicking proceed to checkout');
        this.elements.proceedToCheckoutButton().click();
        cy.log('✅ Proceed to Checkout button clicked successfully');
        cy.wait(500);
        cy.log('⏳ Waiting for navigation to checkout');
    }
}

export default new CartPage();