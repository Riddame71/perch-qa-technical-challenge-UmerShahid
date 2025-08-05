class ProfilePage {
    elements = {
        // Main page elements
        profilePage: () => cy.get('[data-testid="profile-page"]'),
        pageTitle: () => cy.get('h1').contains('Your Profile'),
        backToHomeButton: () => cy.get('[data-testid="back-to-home"]'),
        
        // Personal Information section
        personalInfoSection: () => cy.contains('h2', 'Personal Information'),
        profileName: () => cy.get('[data-testid="profile-name"]'),
        profileEmail: () => cy.get('[data-testid="profile-email"]'),
        nameInput: () => cy.get('[data-testid="profile-name-input"]'),
        emailInput: () => cy.get('[data-testid="profile-email-input"]'),
        
        // Action buttons
        editProfileButton: () => cy.get('[data-testid="edit-profile"]'),
        saveChangesButton: () => cy.get('[data-testid="save-profile"]'),
        cancelButton: () => cy.get('[data-testid="cancel-edit"]'),
        
        // Order History section
        orderHistorySection: () => cy.contains('h2', 'Order History'),
        noOrdersSection: () => cy.get('[data-testid="no-orders"]'),
        noOrdersText: () => cy.get('[data-testid="no-orders"]').find('p'),
        startShoppingButton: () => cy.get('[data-testid="start-shopping"]'),
        
        // Error messages
        nameErrorMessage: () => cy.get('[data-testid="profile-name-input"]').parent().find('.error-message'),
        emailErrorMessage: () => cy.get('[data-testid="profile-email-input"]').parent().find('.error-message'),
        errorMessages: () => cy.get('.error-message'),
        
        // Navigation elements from HomePage
        profileNavButton: () => cy.get('[data-testid="nav-to-profile"]')
    }

    // Navigation methods
    visitFromHomepage() {
        cy.log('🏠 Navigating to profile page from homepage');
        console.log('ProfilePage: Clicking profile button from homepage');
        this.elements.profileNavButton().click();
        cy.log('✅ Successfully clicked profile button');
        cy.wait(500);
        cy.log('⏳ Waiting for navigation to profile page');
    }

    clickBackToHome() {
        cy.log('👆 Clicking Back to Home button');
        console.log('ProfilePage: Clicking Back to Home button');
        this.elements.backToHomeButton().click();
        cy.log('✅ Back to Home button clicked successfully');
        cy.wait(500);
        cy.log('⏳ Waiting for navigation to homepage');
    }

    clickStartShopping() {
        cy.log('👆 Clicking Start Shopping button');
        console.log('ProfilePage: Clicking Start Shopping button');
        this.elements.startShoppingButton().click();
        cy.log('✅ Start Shopping button clicked successfully');
        cy.wait(500);
        cy.log('⏳ Waiting for navigation to homepage');
    }

    // Verification methods
    verifyProfilePageURL() {
        cy.log('🔍 Verifying profile page URL');
        console.log('ProfilePage: Verifying profile page URL');
        cy.url().should('include', '/profile');
        cy.url().then((url) => {
            cy.log(`✅ Profile page URL verified: ${url}`);
            console.log(`ProfilePage: Profile page URL confirmed: ${url}`);
        });
    }

    verifyNavigationToProfilePage() {
        cy.log('🔍 Verifying navigation to profile page');
        console.log('ProfilePage: Verifying navigation to profile page');
        cy.url().should('include', '/profile');
        this.elements.profilePage().should('be.visible');
        cy.url().then((url) => {
            cy.log(`✅ Successfully navigated to profile page: ${url}`);
            console.log(`ProfilePage: Navigated to profile URL: ${url}`);
        });
    }

    verifyNavigationToHomepage() {
        cy.log('🔍 Verifying navigation back to homepage');
        console.log('ProfilePage: Verifying navigation back to homepage');
        cy.url().should('not.include', '/profile');
        cy.get('h1').contains('Product Catalog').should('be.visible');
        cy.url().then((url) => {
            cy.log(`✅ Successfully navigated back to homepage: ${url}`);
            console.log(`ProfilePage: Back to homepage URL verified: ${url}`);
        });
    }

    verifyPageTitle(expectedTitle) {
        cy.log(`🔍 Verifying page title: "${expectedTitle}"`);
        console.log(`ProfilePage: Verifying page title - Expected: ${expectedTitle}`);
        this.elements.pageTitle().should('be.visible').and('contain.text', expectedTitle);
        cy.log(`✅ Page title verification successful: "${expectedTitle}"`);
    }

    verifyBackToHomeButton() {
        cy.log('🔍 Verifying Back to Home button is visible');
        console.log('ProfilePage: Verifying Back to Home button');
        this.elements.backToHomeButton().should('be.visible').and('contain.text', 'Back to Home');
        cy.log('✅ Back to Home button verification successful');
    }

    verifyPersonalInformationSection() {
        cy.log('🔍 Verifying Personal Information section');
        console.log('ProfilePage: Verifying Personal Information section');
        this.elements.personalInfoSection().should('be.visible');
        cy.log('✅ Personal Information section verification successful');
    }

    verifyOrderHistorySection() {
        cy.log('🔍 Verifying Order History section');
        console.log('ProfilePage: Verifying Order History section');
        this.elements.orderHistorySection().should('be.visible');
        cy.log('✅ Order History section verification successful');
    }

    verifyStartShoppingButton() {
        cy.log('🔍 Verifying Start Shopping button is visible');
        console.log('ProfilePage: Verifying Start Shopping button');
        this.elements.startShoppingButton().should('be.visible').and('contain.text', 'Start Shopping');
        cy.log('✅ Start Shopping button verification successful');
    }

    verifyNoOrdersText() {
        cy.log('🔍 Verifying "You haven\'t placed any orders yet." text');
        console.log('ProfilePage: Verifying no orders text');
        this.elements.noOrdersText().should('be.visible').and('contain.text', "You haven't placed any orders yet.");
        cy.log('✅ No orders text verification successful');
    }

    // Profile information methods
    verifyNameField() {
        cy.log('🔍 Verifying name field is visible');
        console.log('ProfilePage: Verifying name field');
        this.elements.profileName().should('be.visible');
        cy.log('✅ Name field verification successful');
    }

    verifyEmailField() {
        cy.log('🔍 Verifying email field is visible');
        console.log('ProfilePage: Verifying email field');
        this.elements.profileEmail().should('be.visible');
        cy.log('✅ Email field verification successful');
    }

    verifyEditProfileButton() {
        cy.log('🔍 Verifying Edit Profile button is visible');
        console.log('ProfilePage: Verifying Edit Profile button');
        this.elements.editProfileButton().should('be.visible').and('contain.text', 'Edit Profile');
        cy.log('✅ Edit Profile button verification successful');
    }

    // Edit mode methods
    clickEditProfile() {
        cy.log('👆 Clicking Edit Profile button');
        console.log('ProfilePage: Clicking Edit Profile button');
        this.elements.editProfileButton().click();
        cy.log('✅ Edit Profile button clicked successfully');
        cy.wait(500);
        cy.log('⏳ Waiting for edit mode to activate');
    }

    verifyEditMode() {
        cy.log('🔍 Verifying edit mode is active');
        console.log('ProfilePage: Verifying edit mode');
        this.elements.nameInput().should('be.visible');
        this.elements.emailInput().should('be.visible');
        this.elements.saveChangesButton().should('be.visible');
        this.elements.cancelButton().should('be.visible');
        this.elements.editProfileButton().should('not.exist');
        cy.log('✅ Edit mode verification successful');
    }

    verifyViewMode() {
        cy.log('🔍 Verifying view mode is active');
        console.log('ProfilePage: Verifying view mode');
        this.elements.profileName().should('be.visible');
        this.elements.profileEmail().should('be.visible');
        this.elements.editProfileButton().should('be.visible');
        this.elements.saveChangesButton().should('not.exist');
        this.elements.cancelButton().should('not.exist');
        cy.log('✅ View mode verification successful');
    }

    // Input methods
    clearNameField() {
        cy.log('🗑️ Clearing name field');
        console.log('ProfilePage: Clearing name field');
        this.elements.nameInput().clear();
        cy.log('✅ Name field cleared successfully');
    }

    clearEmailField() {
        cy.log('🗑️ Clearing email field');
        console.log('ProfilePage: Clearing email field');
        this.elements.emailInput().clear();
        cy.log('✅ Email field cleared successfully');
    }

    enterName(name) {
        cy.log(`📝 Entering name: "${name}"`);
        console.log(`ProfilePage: Entering name - ${name}`);
        this.elements.nameInput().type(name);
        cy.log(`✅ Name entered successfully: "${name}"`);
    }

    enterEmail(email) {
        cy.log(`📝 Entering email: "${email}"`);
        console.log(`ProfilePage: Entering email - ${email}`);
        this.elements.emailInput().type(email);
        cy.log(`✅ Email entered successfully: "${email}"`);
    }

    clickOutsideNameField() {
        cy.log('👆 Clicking outside name field to trigger validation');
        console.log('ProfilePage: Clicking outside name field');
        this.elements.personalInfoSection().click();
        cy.log('✅ Clicked outside name field');
    }

    clickOutsideEmailField() {
        cy.log('👆 Clicking outside email field to trigger validation');
        console.log('ProfilePage: Clicking outside email field');
        this.elements.personalInfoSection().click();
        cy.log('✅ Clicked outside email field');
    }

    // Button actions
    clickSaveChanges() {
        cy.log('👆 Clicking Save Changes button');
        console.log('ProfilePage: Clicking Save Changes button');
        this.elements.saveChangesButton().click();
        cy.log('✅ Save Changes button clicked successfully');
        cy.wait(500);
        cy.log('⏳ Waiting for changes to be saved');
    }

    clickCancel() {
        cy.log('👆 Clicking Cancel button');
        console.log('ProfilePage: Clicking Cancel button');
        this.elements.cancelButton().click();
        cy.log('✅ Cancel button clicked successfully');
        cy.wait(500);
        cy.log('⏳ Waiting for edit mode to exit');
    }

    // Verification methods for updated values
    verifyNameValue(expectedName) {
        cy.log(`🔍 Verifying name value: "${expectedName}"`);
        console.log(`ProfilePage: Verifying name value - Expected: ${expectedName}`);
        this.elements.profileName().should('contain.text', expectedName);
        cy.log(`✅ Name value verification successful: "${expectedName}"`);
    }

    verifyEmailValue(expectedEmail) {
        cy.log(`🔍 Verifying email value: "${expectedEmail}"`);
        console.log(`ProfilePage: Verifying email value - Expected: ${expectedEmail}`);
        this.elements.profileEmail().should('contain.text', expectedEmail);
        cy.log(`✅ Email value verification successful: "${expectedEmail}"`);
    }

    // Error validation methods
    verifyNameErrorMessage(expectedMessage) {
        cy.log(`🔍 Verifying name error message: "${expectedMessage}"`);
        console.log(`ProfilePage: Verifying name error message - Expected: ${expectedMessage}`);
        this.elements.nameErrorMessage().should('be.visible').and('contain.text', expectedMessage);
        cy.log(`✅ Name error message verification successful: "${expectedMessage}"`);
    }

    verifyEmailErrorMessage(expectedMessage) {
        cy.log(`🔍 Verifying email error message: "${expectedMessage}"`);
        console.log(`ProfilePage: Verifying email error message - Expected: ${expectedMessage}`);
        this.elements.emailErrorMessage().should('be.visible').and('contain.text', expectedMessage);
        cy.log(`✅ Email error message verification successful: "${expectedMessage}"`);
    }

    verifySaveButtonDisabled() {
        cy.log('🔍 Verifying Save Changes button is disabled');
        console.log('ProfilePage: Verifying Save Changes button is disabled');
        this.elements.saveChangesButton().should('be.disabled');
        cy.log('✅ Save Changes button disabled verification successful');
    }

    verifySaveButtonEnabled() {
        cy.log('🔍 Verifying Save Changes button is enabled');
        console.log('ProfilePage: Verifying Save Changes button is enabled');
        this.elements.saveChangesButton().should('not.be.disabled');
        cy.log('✅ Save Changes button enabled verification successful');
    }

    // Value storage and retrieval for cancel scenarios
    storeCurrentNameValue() {
        cy.log('💾 Storing current name value');
        console.log('ProfilePage: Storing current name value');
        this.elements.profileName().invoke('text').then((text) => {
            cy.wrap(text).as('originalName');
            cy.log(`💾 Stored original name: "${text}"`);
            console.log(`ProfilePage: Stored original name: ${text}`);
        });
    }

    storeCurrentEmailValue() {
        cy.log('💾 Storing current email value');
        console.log('ProfilePage: Storing current email value');
        this.elements.profileEmail().invoke('text').then((text) => {
            cy.wrap(text).as('originalEmail');
            cy.log(`💾 Stored original email: "${text}"`);
            console.log(`ProfilePage: Stored original email: ${text}`);
        });
    }

    verifyNameHasValue() {
        cy.log('🔍 Verifying name field has a value');
        console.log('ProfilePage: Verifying name field has a value');
        this.elements.profileName().should('be.visible').and('not.be.empty').then(($el) => {
            const nameValue = $el.text().trim();
            cy.log(`📝 Current name value: "${nameValue}"`);
            console.log(`ProfilePage: Current name value: ${nameValue}`);
        });
    }

    verifyEmailHasValue() {
        cy.log('🔍 Verifying email field has a value');
        console.log('ProfilePage: Verifying email field has a value');
        this.elements.profileEmail().should('be.visible').and('not.be.empty').then(($el) => {
            const emailValue = $el.text().trim();
            cy.log(`📧 Current email value: "${emailValue}"`);
            console.log(`ProfilePage: Current email value: ${emailValue}`);
        });
    }
}

export default new ProfilePage();
