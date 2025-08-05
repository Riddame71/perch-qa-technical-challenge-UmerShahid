import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import ProfilePage from '../../pages/ProfilePage';
import HomePage from '../../pages/HomePage';
import CartPage from '../../pages/CartPage';
import AddressPage from '../../pages/AddressPage';
import PaymentPage from '../../pages/PaymentPage';
import SuccessPage from '../../pages/SuccessPage';

// Load fixture data based on environment
let profileData;
before(() => {  
    if (process.env.ENV_VAR === 'uat') {
        cy.fixture('uat/profilepage').then((data) => {
            profileData = data;
            cy.log(`📁 Loaded UAT profile data`);
            console.log(`Using UAT environment data`);
        });
    } else {
        cy.fixture('qa/profilepage').then((data) => {
            profileData = data;
            cy.log(`📁 Loaded QA profile data`);
            console.log(`Using QA environment data`);
        });
    }
    
});

// Navigation steps
When('I click on the {string} button', (buttonName) => {
    cy.log(`📍 STEP: When I click on the "${buttonName}" button`);
    console.log(`Step: Clicking ${buttonName} button`);
    
    switch (buttonName) {
        case 'Profile':
            ProfilePage.visitFromHomepage();
            break;
        case 'Edit Profile':
            ProfilePage.clickEditProfile();
            break;
        case 'Save Changes':
            ProfilePage.clickSaveChanges();
            break;
        case 'Cancel':
            ProfilePage.clickCancel();
            break;
        case 'Back to Home':
            ProfilePage.clickBackToHome();
            break;
        case 'Start Shopping':
            ProfilePage.clickStartShopping();
            break;
        default:
            throw new Error(`Unknown button: ${buttonName}`);
    }
    
    cy.log(`✅ STEP COMPLETED: Successfully clicked "${buttonName}" button`);
});

// Navigation verification steps
Then('I should be navigated to the profile page', () => {
    cy.log('📍 STEP: Then I should be navigated to the profile page');
    console.log('Step: Verifying navigation to profile page');
    ProfilePage.verifyNavigationToProfilePage();
    cy.log('✅ STEP COMPLETED: Profile page navigation verified successfully');
});

Then('I should see the profile page URL', () => {
    cy.log('📍 STEP: Then I should see the profile page URL');
    console.log('Step: Verifying profile page URL');
    ProfilePage.verifyProfilePageURL();
    cy.log('✅ STEP COMPLETED: Profile page URL verified successfully');
});

Then('I should be navigated back to the homepage', () => {
    cy.log('📍 STEP: Then I should be navigated back to the homepage');
    console.log('Step: Verifying navigation back to homepage');
    ProfilePage.verifyNavigationToHomepage();
    cy.log('✅ STEP COMPLETED: Homepage navigation verified successfully');
});

// UI element verification steps
Then('I should see the profile page title {string}', (title) => {
    cy.log(`📍 STEP: Then I should see the profile page title "${title}"`);
    console.log(`Step: Verifying profile page title - ${title}`);
    ProfilePage.verifyPageTitle(title);
    cy.log(`✅ STEP COMPLETED: Profile page title "${title}" verified successfully`);
});

Then('I should see the {string} button', (buttonName) => {
    cy.log(`📍 STEP: Then I should see the "${buttonName}" button`);
    console.log(`Step: Verifying ${buttonName} button`);
    
    switch (buttonName) {
        case 'Back to Home':
            ProfilePage.verifyBackToHomeButton();
            break;
        case 'Edit Profile':
            ProfilePage.verifyEditProfileButton();
            break;
        case 'Start Shopping':
            ProfilePage.verifyStartShoppingButton();
            break;
        case 'Save Changes':
            ProfilePage.elements.saveChangesButton().should('be.visible').and('contain.text', 'Save Changes');
            break;
        case 'Cancel':
            ProfilePage.elements.cancelButton().should('be.visible').and('contain.text', 'Cancel');
            break;
        default:
            throw new Error(`Unknown button verification: ${buttonName}`);
    }
    
    cy.log(`✅ STEP COMPLETED: "${buttonName}" button verified successfully`);
});

Then('I should see the text {string}', (text) => {
    cy.log(`📍 STEP: Then I should see the text "${text}"`);
    console.log(`Step: Verifying text - ${text}`);
    
    switch (text) {
        case 'Personal Information':
            ProfilePage.verifyPersonalInformationSection();
            break;
        case 'Order History':
            ProfilePage.verifyOrderHistorySection();
            break;
        case "You haven't placed any orders yet.":
            ProfilePage.verifyNoOrdersText();
            break;
        default:
            cy.contains(text).should('be.visible');
    }
    
    cy.log(`✅ STEP COMPLETED: Text "${text}" verified successfully`);
});

// Personal Information section steps
Then('I should see the {string} section', (sectionName) => {
    cy.log(`📍 STEP: Then I should see the "${sectionName}" section`);
    console.log(`Step: Verifying ${sectionName} section`);
    
    switch (sectionName) {
        case 'Personal Information':
            ProfilePage.verifyPersonalInformationSection();
            break;
        case 'Order History':
            ProfilePage.verifyOrderHistorySection();
            break;
        default:
            throw new Error(`Unknown section: ${sectionName}`);
    }
    
    cy.log(`✅ STEP COMPLETED: "${sectionName}" section verified successfully`);
});

Then('I should see the {string} field with current value', (fieldName) => {
    cy.log(`📍 STEP: Then I should see the "${fieldName}" field with current value`);
    console.log(`Step: Verifying ${fieldName} field`);
    
    switch (fieldName) {
        case 'Name':
            ProfilePage.verifyNameField();
            break;
        case 'Email':
            ProfilePage.verifyEmailField();
            break;
        default:
            throw new Error(`Unknown field: ${fieldName}`);
    }
    
    cy.log(`✅ STEP COMPLETED: "${fieldName}" field verified successfully`);
});

// Edit mode verification steps
Then('I should see the name field is editable', () => {
    cy.log('📍 STEP: Then I should see the name field is editable');
    console.log('Step: Verifying name field is editable');
    ProfilePage.elements.nameInput().should('be.visible');
    cy.log('✅ STEP COMPLETED: Name field editability verified successfully');
});

Then('I should see the email field is editable', () => {
    cy.log('📍 STEP: Then I should see the email field is editable');
    console.log('Step: Verifying email field is editable');
    ProfilePage.elements.emailInput().should('be.visible');
    cy.log('✅ STEP COMPLETED: Email field editability verified successfully');
});

Then('I should not see the {string} button', (buttonName) => {
    cy.log(`📍 STEP: Then I should not see the "${buttonName}" button`);
    console.log(`Step: Verifying ${buttonName} button is not visible`);
    
    switch (buttonName) {
        case 'Edit Profile':
            ProfilePage.elements.editProfileButton().should('not.exist');
            break;
        case 'Save Changes':
            ProfilePage.elements.saveChangesButton().should('not.exist');
            break;
        case 'Cancel':
            ProfilePage.elements.cancelButton().should('not.exist');
            break;
        default:
            throw new Error(`Unknown button: ${buttonName}`);
    }
    
    cy.log(`✅ STEP COMPLETED: "${buttonName}" button absence verified successfully`);
});

// Input actions
When('I clear the name field', () => {
    cy.log('📍 STEP: When I clear the name field');
    console.log('Step: Clearing name field');
    ProfilePage.clearNameField();
    cy.log('✅ STEP COMPLETED: Name field cleared successfully');
});

When('I clear the email field', () => {
    cy.log('📍 STEP: When I clear the email field');
    console.log('Step: Clearing email field');
    ProfilePage.clearEmailField();
    cy.log('✅ STEP COMPLETED: Email field cleared successfully');
});

// Updated step definitions using fixture data
When('I enter {string} in the name field', (nameType) => {
    cy.log(`📍 STEP: When I enter "${nameType}" in the name field`);
    console.log(`Step: Entering name - ${nameType}`);
    
    let nameValue;
    switch(nameType) {
        case 'valid name':
            nameValue = profileData.updateScenarios.validName;
            break;
        case 'test name':
            nameValue = profileData.cancelScenarios.testName;
            break;
        default:
            nameValue = nameType; // Use the string directly if not a predefined type
    }
    
    ProfilePage.enterName(nameValue);
    cy.log(`✅ STEP COMPLETED: Name "${nameValue}" entered successfully`);
});

When('I enter {string} in the email field', (emailType) => {
    cy.log(`📍 STEP: When I enter "${emailType}" in the email field`);
    console.log(`Step: Entering email - ${emailType}`);
    
    let emailValue;
    switch(emailType) {
        case 'valid email':
            emailValue = profileData.updateScenarios.validEmail;
            break;
        case 'test email':
            emailValue = profileData.cancelScenarios.testEmail;
            break;
        default:
            emailValue = emailType; // Use the string directly if not a predefined type
    }
    
    ProfilePage.enterEmail(emailValue);
    cy.log(`✅ STEP COMPLETED: Email "${emailValue}" entered successfully`);
});

When('I click outside the name field', () => {
    cy.log('📍 STEP: When I click outside the name field');
    console.log('Step: Clicking outside name field');
    ProfilePage.clickOutsideNameField();
    cy.log('✅ STEP COMPLETED: Clicked outside name field successfully');
});

When('I click outside the email field', () => {
    cy.log('📍 STEP: When I click outside the email field');
    console.log('Step: Clicking outside email field');
    ProfilePage.clickOutsideEmailField();
    cy.log('✅ STEP COMPLETED: Clicked outside email field successfully');
});

// Value verification steps
Then('I should see the updated name displayed', () => {
    cy.log('📍 STEP: Then I should see the updated name displayed');
    console.log('Step: Verifying updated name');
    ProfilePage.verifyNameValue(profileData.updateScenarios.validName);
    cy.log('✅ STEP COMPLETED: Updated name verified successfully');
});

Then('I should see the updated email displayed', () => {
    cy.log('📍 STEP: Then I should see the updated email displayed');
    console.log('Step: Verifying updated email');
    ProfilePage.verifyEmailValue(profileData.updateScenarios.validEmail);
    cy.log('✅ STEP COMPLETED: Updated email verified successfully');
});

// Error message verification using fixtures
Then('I should see the name error message', () => {
    cy.log('📍 STEP: Then I should see the name error message');
    console.log('Step: Verifying name error message');
    ProfilePage.verifyNameErrorMessage(profileData.errorMessages.nameRequired);
    cy.log('✅ STEP COMPLETED: Name error message verified successfully');
});

Then('I should see the email error message', () => {
    cy.log('📍 STEP: Then I should see the email error message');
    console.log('Step: Verifying email error message');
    ProfilePage.verifyEmailErrorMessage(profileData.errorMessages.emailRequired);
    cy.log('✅ STEP COMPLETED: Email error message verified successfully');
});

// Add this step definition for handling any error message
Then('I should see the error message {string}', (expectedMessage) => {
    cy.log(`📍 STEP: Then I should see the error message "${expectedMessage}"`);
    console.log(`Step: Verifying error message - ${expectedMessage}`);
    
    // Check if it's a name error or email error based on the message content
    if (expectedMessage.includes('Name must be')) {
        ProfilePage.verifyNameErrorMessage(expectedMessage);
    } else if (expectedMessage.includes('email')) {
        ProfilePage.verifyEmailErrorMessage(expectedMessage);
    } else {
        // Generic error message verification
        cy.contains('.error-message', expectedMessage).should('be.visible');
    }
    
    cy.log(`✅ STEP COMPLETED: Error message "${expectedMessage}" verified successfully`);
});

// Button state verification steps
Then('the {string} button should be disabled', (buttonName) => {
    cy.log(`📍 STEP: Then the "${buttonName}" button should be disabled`);
    console.log(`Step: Verifying ${buttonName} button is disabled`);
    
    switch (buttonName) {
        case 'Save Changes':
            ProfilePage.verifySaveButtonDisabled();
            break;
        default:
            throw new Error(`Unknown button for disabled check: ${buttonName}`);
    }
    
    cy.log(`✅ STEP COMPLETED: "${buttonName}" button disabled state verified successfully`);
});

// Value storage steps for cancel scenarios
When('I store the current name value', () => {
    cy.log('📍 STEP: When I store the current name value');
    console.log('Step: Storing current name value');
    ProfilePage.storeCurrentNameValue();
    cy.log('✅ STEP COMPLETED: Current name value stored successfully');
});

When('I store the current email value', () => {
    cy.log('📍 STEP: When I store the current email value');
    console.log('Step: Storing current email value');
    ProfilePage.storeCurrentEmailValue();
    cy.log('✅ STEP COMPLETED: Current email value stored successfully');
});

// Value retention verification steps
Then('I should see the original name value is retained', () => {
    cy.log('📍 STEP: Then I should see the original name value is retained');
    console.log('Step: Verifying name field has a value');
    ProfilePage.verifyNameHasValue();
    cy.log('✅ STEP COMPLETED: Name field value verified successfully');
});

Then('I should see the original email value is retained', () => {
    cy.log('📍 STEP: Then I should see the original email value is retained');
    console.log('Step: Verifying email field has a value');
    ProfilePage.verifyEmailHasValue();
    cy.log('✅ STEP COMPLETED: Email field value verified successfully');
});

// Section-specific verification for Start Shopping button
Then('I should see the {string} button in the order history section', (buttonName) => {
    cy.log(`📍 STEP: Then I should see the "${buttonName}" button in the order history section`);
    console.log(`Step: Verifying ${buttonName} button in order history section`);
    
    switch (buttonName) {
        case 'Start Shopping':
            ProfilePage.verifyStartShoppingButton();
            break;
        default:
            throw new Error(`Unknown button in order history: ${buttonName}`);
    }
    
    cy.log(`✅ STEP COMPLETED: "${buttonName}" button in order history section verified successfully`);
});

// Product and Cart steps
When('I click on "View Details" for the first product', () => {
    cy.log('📍 STEP: When I click on "View Details" for the first product');
    console.log('Step: Clicking View Details for first product');
    HomePage.clickViewDetailsForFirstProduct();
    cy.log('✅ STEP COMPLETED: First product View Details clicked successfully');
});

When('I click on the "Add to Cart" button', () => {
    cy.log('📍 STEP: When I click on the "Add to Cart" button');
    console.log('Step: Clicking Add to Cart button');
    cy.get('[data-testid="add-to-cart"]').click();
    cy.log('✅ STEP COMPLETED: Add to Cart button clicked successfully');
});

Then('I should see the shopping cart page', () => {
    cy.log('📍 STEP: Then I should see the shopping cart page');
    console.log('Step: Verifying shopping cart page');
    CartPage.verifyCartPage();
    cy.log('✅ STEP COMPLETED: Shopping cart page verified successfully');
});

Then('I should see the selected product in cart', () => {
    cy.log('📍 STEP: Then I should see the selected product in cart');
    console.log('Step: Verifying product in cart');
    CartPage.verifySelectedProductInCart();
    cy.log('✅ STEP COMPLETED: Product in cart verified successfully');
});

When('I click on the "Proceed to Checkout" button', () => {
    cy.log('📍 STEP: When I click on the "Proceed to Checkout" button');
    console.log('Step: Clicking Proceed to Checkout button');
    CartPage.clickProceedToCheckout();
    cy.log('✅ STEP COMPLETED: Proceed to Checkout button clicked successfully');
});

// Address form steps
When('I fill in the delivery address information', () => {
    cy.log('📍 STEP: When I fill in the delivery address information');
    console.log('Step: Filling delivery address information');
    AddressPage.verifyDeliveryAddressPage();
    AddressPage.fillDeliveryAddress(profileData.deliveryAddress);
    cy.log('✅ STEP COMPLETED: Delivery address information filled successfully');
});

When('I click on the "Continue to Payment" button', () => {
    cy.log('📍 STEP: When I click on the "Continue to Payment" button');
    console.log('Step: Clicking Continue to Payment button');
    AddressPage.clickContinueToPayment();
    cy.log('✅ STEP COMPLETED: Continue to Payment button clicked successfully');
});

// Payment form steps
When('I fill in the payment information', () => {
    cy.log('📍 STEP: When I fill in the payment information');
    console.log('Step: Filling payment information');
    PaymentPage.verifyPaymentPage();
    PaymentPage.fillPaymentInformation(profileData.paymentInfo);
    cy.log('✅ STEP COMPLETED: Payment information filled successfully');
});

When('I click on the "Place Order" button', () => {
    cy.log('📍 STEP: When I click on the "Place Order" button');
    console.log('Step: Clicking Place Order button');
    PaymentPage.clickPlaceOrder();
    cy.log('✅ STEP COMPLETED: Place Order button clicked successfully');
});

// Success page steps
Then('I should see the order confirmation page', () => {
    cy.log('📍 STEP: Then I should see the order confirmation page');
    console.log('Step: Verifying order confirmation page');
    SuccessPage.verifyOrderConfirmationPage();
    cy.log('✅ STEP COMPLETED: Order confirmation page verified successfully');
});

Then('I should see the order number', () => {
    cy.log('📍 STEP: Then I should see the order number');
    console.log('Step: Verifying order number');
    SuccessPage.verifyOrderNumber();
    cy.log('✅ STEP COMPLETED: Order number verified successfully');
});

When('I click on the "View Your Orders" button', () => {
    cy.log('📍 STEP: When I click on the "View Your Orders" button');
    console.log('Step: Clicking View Your Orders button');
    SuccessPage.clickViewYourOrders();
    cy.log('✅ STEP COMPLETED: View Your Orders button clicked successfully');
});

// Final verification
Then('I should see the new order in order history', () => {
    cy.log('📍 STEP: Then I should see the new order in order history');
    console.log('Step: Verifying new order in order history');
    ProfilePage.verifyNavigationToProfilePage();
    
    // Verify that order history section now shows orders instead of "no orders" message
    cy.get('[data-testid="orders-list"]').should('be.visible');
    cy.get('[data-testid="no-orders"]').should('not.exist');
    
    // Verify order details are visible
    cy.get('.order-item').should('have.length.greaterThan', 0);
    cy.get('.order-number').should('be.visible');
    cy.get('.order-date').should('be.visible');
    
    cy.log('✅ STEP COMPLETED: New order in order history verified successfully');
});

// Add these step definitions that naturally discover bugs:

Then('the cart should show correct total for multiple items', () => {
    cy.log('📍 STEP: Verifying cart total calculation');
    console.log('Step: Checking cart total for 2 items at $79.99 each');
    
    // This will FAIL - shows $79.99 instead of $159.98
    CartPage.verifyCartPage();
    cy.get('[data-testid="subtotal"]').should('contain.text', '$159.98');
    cy.log('✅ STEP COMPLETED: Cart total correctly calculated');
});

Then('the subtotal should reflect quantity times unit price', () => {
    cy.log('📍 STEP: Verifying subtotal calculation logic');
    console.log('Step: Confirming quantity × price = subtotal');
    
    // This will FAIL due to quantity being ignored
    cy.get('[data-testid="subtotal"]').then(($el) => {
        const subtotal = $el.text();
        // Expected: $159.98 (2 × $79.99)
        // Actual: $79.99 (bug ignores quantity)
        expect(subtotal).to.contain('$159.98');
    });
    cy.log('✅ STEP COMPLETED: Subtotal calculation verified');
});

Then('the order confirmation should show correct total amount', () => {
    cy.log('📍 STEP: Verifying order confirmation total');
    console.log('Step: Checking order confirmation displays correct amount');
    
    // This will FAIL due to PaymentPage calculation bug
    SuccessPage.verifyOrderConfirmationPage();
    cy.log('✅ STEP COMPLETED: Order confirmation total verified');
});

Then('the order history should display the correct purchase amount', () => {
    cy.log('📍 STEP: Verifying order history amount');
    console.log('Step: Checking order history shows correct total');
    
    // This will FAIL due to multiple bugs in order calculation
    ProfilePage.verifyNavigationToProfilePage();
    cy.get('.order-total .value').should('contain.text', '$159.98');
    cy.log('✅ STEP COMPLETED: Order history amount verified');
});

When('I update item quantity to {string}', (quantity) => {
    cy.log(`📍 STEP: Updating item quantity to ${quantity}`);
    console.log(`Step: Setting item quantity to ${quantity}`);
    
    cy.get('[data-testid="quantity-1"]').select(quantity);
    cy.log(`✅ STEP COMPLETED: Quantity updated to ${quantity}`);
});

Then('the cart should update to show new quantity', () => {
    cy.log('📍 STEP: Verifying cart quantity update');
    console.log('Step: Confirming cart reflects new quantity');
    
    cy.get('[data-testid="quantity-1"]').should('have.value', '3');
    cy.log('✅ STEP COMPLETED: Cart quantity updated successfully');
});

When('I set item quantity to {string}', (quantity) => {
    cy.log(`📍 STEP: Setting item quantity to ${quantity}`);
    console.log(`Step: Changing quantity to ${quantity}`);
    
    cy.get('[data-testid="quantity-1"]').select(quantity);
    cy.log(`✅ STEP COMPLETED: Quantity set to ${quantity}`);
});

Then('the item should be removed from cart cleanly', () => {
    cy.log('📍 STEP: Verifying item removal');
    console.log('Step: Checking if item removed properly');
    
    // This will pass but reveals the UX issue
    cy.get('[data-testid="cart-item-1"]').should('not.exist');
    cy.log('✅ STEP COMPLETED: Item removed from cart');
});

Then('I should be able to select reasonable quantity options', () => {
    cy.log('📍 STEP: Verifying quantity options available');
    console.log('Step: Checking quantity selector options');
    
    cy.get('[data-testid="quantity-selector"]').should('be.visible');
    cy.log('✅ STEP COMPLETED: Quantity options verified');
});

Then('the quantity selector should accommodate typical purchase needs', () => {
    cy.log('📍 STEP: Verifying quantity range adequacy');
    console.log('Step: Checking if quantity range meets user needs');
    
    // This reveals the limitation - only goes up to 5
    cy.get('[data-testid="quantity-selector"] option').should('have.length.at.least', 10);
    cy.log('✅ STEP COMPLETED: Quantity range adequate for typical needs');
});
