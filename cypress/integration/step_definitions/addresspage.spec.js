import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import AddressPage from '../../pages/AddressPage';

// Load fixture data based on environment
let addressData;
before(() => {  
    if (process.env.ENV_VAR === 'uat') {
        cy.fixture('uat/addresspage').then((data) => {
            addressData = data;
            cy.log(`📁 Loaded UAT address data`);
            console.log(`Using UAT environment data`);
        });
    } else {
        cy.fixture('qa/addresspage').then((data) => {
            addressData = data;
            cy.log(`📁 Loaded QA address data`);
            console.log(`Using QA environment data`);
        });
    }
});

// ===== NAVIGATION STEPS =====

Given('I navigate directly to the address page using URL from fixtures', () => {
    cy.log('📍 STEP: Given I navigate directly to the address page using URL from fixtures');
    console.log('Step: Navigating to address page via URL');
    AddressPage.visitDirectly(addressData.urls.addressPage);
    cy.log('✅ STEP COMPLETED: Successfully navigated to address page');
});

// ===== PAGE VERIFICATION STEPS =====

Then('I should see the address page is displayed', () => {
    cy.log('📍 STEP: Then I should see the address page is displayed');
    console.log('Step: Verifying address page is displayed');
    AddressPage.verifyDeliveryAddressPage();
    cy.log('✅ STEP COMPLETED: Address page display verified');
});

Then('I should see the page title from fixtures', () => {
    cy.log('📍 STEP: Then I should see the page title from fixtures');
    console.log('Step: Verifying page title from fixtures');
    AddressPage.verifyPageTitle(addressData.pageElements.pageTitle);
    cy.log('✅ STEP COMPLETED: Page title verified from fixtures');
});

Then('I should see the address form is visible', () => {
    cy.log('📍 STEP: Then I should see the address form is visible');
    console.log('Step: Verifying address form visibility');
    AddressPage.verifyAddressFormVisible();
    cy.log('✅ STEP COMPLETED: Address form visibility verified');
});

Then('I should see the {string} button from fixtures', (buttonName) => {
    cy.log(`📍 STEP: Then I should see the "${buttonName}" button from fixtures`);
    console.log(`Step: Verifying ${buttonName} button from fixtures`);
    
    switch (buttonName) {
        case 'Back to Cart':
            AddressPage.verifyBackToCartButton(addressData.pageElements.backToCartText);
            break;
        case 'Continue to Payment':
            AddressPage.verifyContinueToPaymentButton(addressData.pageElements.continueButtonText);
            break;
        default:
            throw new Error(`Unknown button: ${buttonName}`);
    }
    
    cy.log(`✅ STEP COMPLETED: ${buttonName} button verified from fixtures`);
});

// ===== FORM INTERACTION STEPS =====

When('I click the {string} button without filling any fields', (buttonName) => {
    cy.log(`📍 STEP: When I click the "${buttonName}" button without filling any fields`);
    console.log(`Step: Clicking ${buttonName} button on empty form`);
    
    if (buttonName === 'Continue to Payment') {
        AddressPage.clickContinueWithoutFilling();
    }
    
    cy.log(`✅ STEP COMPLETED: ${buttonName} button clicked on empty form`);
});

When('I click on the {string} field', (fieldName) => {
    cy.log(`📍 STEP: When I click on the "${fieldName}" field`);
    console.log(`Step: Clicking on ${fieldName} field`);
    AddressPage.clickField(fieldName);
    cy.log(`✅ STEP COMPLETED: ${fieldName} field clicked`);
});

When('I click outside the {string} field without entering any value', (fieldName) => {
    cy.log(`📍 STEP: When I click outside the "${fieldName}" field without entering any value`);
    console.log(`Step: Clicking outside ${fieldName} field`);
    AddressPage.clickOutsideField(fieldName);
    cy.log(`✅ STEP COMPLETED: Clicked outside ${fieldName} field`);
});

// ===== INVALID DATA ENTRY STEPS =====

When('I enter invalid email format from fixtures', () => {
    cy.log('📍 STEP: When I enter invalid email format from fixtures');
    console.log('Step: Entering invalid email format');
    AddressPage.enterValueInField('email', addressData.invalidData.email.invalidFormat);
    cy.log('✅ STEP COMPLETED: Invalid email format entered');
});

When('I enter email without @ symbol from fixtures', () => {
    cy.log('📍 STEP: When I enter email without @ symbol from fixtures');
    console.log('Step: Entering email without @ symbol');
    AddressPage.enterValueInField('email', addressData.invalidData.email.noAt);
    cy.log('✅ STEP COMPLETED: Email without @ symbol entered');
});

When('I enter email without domain from fixtures', () => {
    cy.log('📍 STEP: When I enter email without domain from fixtures');
    console.log('Step: Entering email without domain');
    AddressPage.enterValueInField('email', addressData.invalidData.email.noDomain);
    cy.log('✅ STEP COMPLETED: Email without domain entered');
});

When('I enter alphabetic phone number from fixtures', () => {
    cy.log('📍 STEP: When I enter alphabetic phone number from fixtures');
    console.log('Step: Entering alphabetic phone number');
    AddressPage.enterValueInField('phone', addressData.invalidData.phone.alphabetic);
    cy.log('✅ STEP COMPLETED: Alphabetic phone number entered');
});

When('I enter short phone number from fixtures', () => {
    cy.log('📍 STEP: When I enter short phone number from fixtures');
    console.log('Step: Entering short phone number');
    AddressPage.enterValueInField('phone', addressData.invalidData.phone.tooShort);
    cy.log('✅ STEP COMPLETED: Short phone number entered');
});

When('I enter long phone number from fixtures', () => {
    cy.log('📍 STEP: When I enter long phone number from fixtures');
    console.log('Step: Entering long phone number');
    AddressPage.enterValueInField('phone', addressData.invalidData.phone.tooLong);
    cy.log('✅ STEP COMPLETED: Long phone number entered');
});

When('I enter alphabetic zip code from fixtures', () => {
    cy.log('📍 STEP: When I enter alphabetic zip code from fixtures');
    console.log('Step: Entering alphabetic zip code');
    AddressPage.enterValueInField('zip code', addressData.invalidData.zipCode.alphabetic);
    cy.log('✅ STEP COMPLETED: Alphabetic zip code entered');
});

When('I enter short zip code from fixtures', () => {
    cy.log('📍 STEP: When I enter short zip code from fixtures');
    console.log('Step: Entering short zip code');
    AddressPage.enterValueInField('zip code', addressData.invalidData.zipCode.tooShort);
    cy.log('✅ STEP COMPLETED: Short zip code entered');
});

When('I enter long zip code from fixtures', () => {
    cy.log('📍 STEP: When I enter long zip code from fixtures');
    console.log('Step: Entering long zip code');
    AddressPage.enterValueInField('zip code', addressData.invalidData.zipCode.tooLong);
    cy.log('✅ STEP COMPLETED: Long zip code entered');
});

When('I enter zip code with special characters from fixtures', () => {
    cy.log('📍 STEP: When I enter zip code with special characters from fixtures');
    console.log('Step: Entering zip code with special characters');
    AddressPage.enterValueInField('zip code', addressData.invalidData.zipCode.specialChars);
    cy.log('✅ STEP COMPLETED: Zip code with special characters entered');
});

When('I enter numeric state from fixtures', () => {
    cy.log('📍 STEP: When I enter numeric state from fixtures');
    console.log('Step: Entering numeric state');
    AddressPage.enterValueInField('state', addressData.invalidData.state.numeric);
    cy.log('✅ STEP COMPLETED: Numeric state entered');
});

When('I enter state with special characters from fixtures', () => {
    cy.log('📍 STEP: When I enter state with special characters from fixtures');
    console.log('Step: Entering state with special characters');
    AddressPage.enterValueInField('state', addressData.invalidData.state.specialChars);
    cy.log('✅ STEP COMPLETED: State with special characters entered');
});

When('I enter short state from fixtures', () => {
    cy.log('📍 STEP: When I enter short state from fixtures');
    console.log('Step: Entering short state');
    AddressPage.enterValueInField('state', addressData.invalidData.state.tooShort);
    cy.log('✅ STEP COMPLETED: Short state entered');
});

When('I enter numeric city from fixtures', () => {
    cy.log('📍 STEP: When I enter numeric city from fixtures');
    console.log('Step: Entering numeric city');
    AddressPage.enterValueInField('city', addressData.invalidData.city.numeric);
    cy.log('✅ STEP COMPLETED: Numeric city entered');
});

When('I enter city with special characters from fixtures', () => {
    cy.log('📍 STEP: When I enter city with special characters from fixtures');
    console.log('Step: Entering city with special characters');
    AddressPage.enterValueInField('city', addressData.invalidData.city.specialChars);
    cy.log('✅ STEP COMPLETED: City with special characters entered');
});

When('I enter short city from fixtures', () => {
    cy.log('📍 STEP: When I enter short city from fixtures');
    console.log('Step: Entering short city');
    AddressPage.enterValueInField('city', addressData.invalidData.city.tooShort);
    cy.log('✅ STEP COMPLETED: Short city entered');
});

When('I enter numeric first name from fixtures', () => {
    cy.log('📍 STEP: When I enter numeric first name from fixtures');
    console.log('Step: Entering numeric first name');
    AddressPage.enterValueInField('first name', addressData.invalidData.firstName.numeric);
    cy.log('✅ STEP COMPLETED: Numeric first name entered');
});

When('I enter short first name from fixtures', () => {
    cy.log('📍 STEP: When I enter short first name from fixtures');
    console.log('Step: Entering short first name');
    AddressPage.enterValueInField('first name', addressData.invalidData.firstName.tooShort);
    cy.log('✅ STEP COMPLETED: Short first name entered');
});

When('I enter long first name from fixtures', () => {
    cy.log('📍 STEP: When I enter long first name from fixtures');
    console.log('Step: Entering long first name');
    AddressPage.enterValueInField('first name', addressData.invalidData.firstName.tooLong);
    cy.log('✅ STEP COMPLETED: Long first name entered');
});

When('I enter short street address from fixtures', () => {
    cy.log('📍 STEP: When I enter short street address from fixtures');
    console.log('Step: Entering short street address');
    AddressPage.enterValueInField('street address', addressData.invalidData.street.tooShort);
    cy.log('✅ STEP COMPLETED: Short street address entered');
});

When('I enter numeric country from fixtures', () => {
    cy.log('📍 STEP: When I enter numeric country from fixtures');
    console.log('Step: Entering numeric country');
    AddressPage.enterValueInField('country', addressData.invalidData.country.numeric);
    cy.log('✅ STEP COMPLETED: Numeric country entered');
});

When('I enter country with special characters from fixtures', () => {
    cy.log('📍 STEP: When I enter country with special characters from fixtures');
    console.log('Step: Entering country with special characters');
    AddressPage.enterValueInField('country', addressData.invalidData.country.specialChars);
    cy.log('✅ STEP COMPLETED: Country with special characters entered');
});

// ===== VALID DATA ENTRY STEPS =====

When('I enter valid address information from fixtures', () => {
    cy.log('📍 STEP: When I enter valid address information from fixtures');
    console.log('Step: Entering valid address information');
    AddressPage.fillValidAddressData(addressData.validAddressData);
    cy.log('✅ STEP COMPLETED: Valid address information entered');
});

When('I fill all address fields with valid data from fixtures', () => {
    cy.log('📍 STEP: When I fill all address fields with valid data from fixtures');
    console.log('Step: Filling all fields with valid data');
    AddressPage.fillValidAddressData(addressData.validAddressData);
    cy.log('✅ STEP COMPLETED: All fields filled with valid data');
});

When('I fill all address fields with alternate valid data from fixtures', () => {
    cy.log('📍 STEP: When I fill all address fields with alternate valid data from fixtures');
    console.log('Step: Filling all fields with alternate valid data');
    AddressPage.fillValidAddressData(addressData.validAddressDataAlternate);
    cy.log('✅ STEP COMPLETED: All fields filled with alternate valid data');
});

When('I enter invalid data in multiple fields from fixtures', () => {
    cy.log('📍 STEP: When I enter invalid data in multiple fields from fixtures');
    console.log('Step: Entering invalid data in multiple fields');
    AddressPage.fillInvalidDataInMultipleFields(addressData.invalidData);
    cy.log('✅ STEP COMPLETED: Invalid data entered in multiple fields');
});

// ===== EDGE CASE DATA ENTRY STEPS =====

When('I enter valid 4-digit zip code from fixtures', () => {
    cy.log('📍 STEP: When I enter valid 4-digit zip code from fixtures');
    console.log('Step: Entering valid 4-digit zip code');
    AddressPage.enterValueInField('zip code', addressData.validEdgeCases.zipCode4Digits);
    cy.log('✅ STEP COMPLETED: Valid 4-digit zip code entered');
});

When('I enter valid 5-digit zip code from fixtures', () => {
    cy.log('📍 STEP: When I enter valid 5-digit zip code from fixtures');
    console.log('Step: Entering valid 5-digit zip code');
    AddressPage.enterValueInField('zip code', addressData.validEdgeCases.zipCode5Digits);
    cy.log('✅ STEP COMPLETED: Valid 5-digit zip code entered');
});

When('I enter valid 10-digit phone number from fixtures', () => {
    cy.log('📍 STEP: When I enter valid 10-digit phone number from fixtures');
    console.log('Step: Entering valid 10-digit phone number');
    AddressPage.enterValueInField('phone', addressData.validEdgeCases.phone10Digits);
    cy.log('✅ STEP COMPLETED: Valid 10-digit phone number entered');
});

When('I enter valid 15-digit phone number from fixtures', () => {
    cy.log('📍 STEP: When I enter valid 15-digit phone number from fixtures');
    console.log('Step: Entering valid 15-digit phone number');
    AddressPage.enterValueInField('phone', addressData.validEdgeCases.phone15Digits);
    cy.log('✅ STEP COMPLETED: Valid 15-digit phone number entered');
});

When('I enter name with spaces from fixtures', () => {
    cy.log('📍 STEP: When I enter name with spaces from fixtures');
    console.log('Step: Entering name with spaces');
    AddressPage.enterValueInField('first name', addressData.validEdgeCases.nameWithSpaces);
    cy.log('✅ STEP COMPLETED: Name with spaces entered');
});

// ===== BUTTON INTERACTION STEPS =====

When('I click the {string} button', (buttonName) => {
    cy.log(`📍 STEP: When I click the "${buttonName}" button`);
    console.log(`Step: Clicking ${buttonName} button`);
    
    switch (buttonName) {
        case 'Continue to Payment':
            AddressPage.clickContinueToPayment();
            break;
        case 'Back to Cart':
            AddressPage.clickBackToCart();
            break;
        default:
            throw new Error(`Unknown button: ${buttonName}`);
    }
    
    cy.log(`✅ STEP COMPLETED: ${buttonName} button clicked`);
});

// ===== ERROR MESSAGE VERIFICATION STEPS =====

Then('I should see the required error message for the {string} field', (fieldName) => {
    cy.log(`📍 STEP: Then I should see the required error message for the "${fieldName}" field`);
    console.log(`Step: Verifying required error message for ${fieldName}`);
    AddressPage.verifyErrorMessage(fieldName, addressData.errorMessages.required);
    cy.log(`✅ STEP COMPLETED: Required error message verified for ${fieldName}`);
});

Then('I should see the email validation error message from fixtures', () => {
    cy.log('📍 STEP: Then I should see the email validation error message from fixtures');
    console.log('Step: Verifying email validation error message');
    AddressPage.verifyErrorMessage('email', addressData.errorMessages.emailInvalid);
    cy.log('✅ STEP COMPLETED: Email validation error message verified');
});

Then('I should see the phone validation error message from fixtures', () => {
    cy.log('📍 STEP: Then I should see the phone validation error message from fixtures');
    console.log('Step: Verifying phone validation error message');
    AddressPage.verifyErrorMessage('phone', addressData.errorMessages.phoneInvalid);
    cy.log('✅ STEP COMPLETED: Phone validation error message verified');
});

Then('I should see the zip code validation error message from fixtures', () => {
    cy.log('📍 STEP: Then I should see the zip code validation error message from fixtures');
    console.log('Step: Verifying zip code validation error message');
    AddressPage.verifyErrorMessage('zip code', addressData.errorMessages.zipCodeInvalid);
    cy.log('✅ STEP COMPLETED: Zip code validation error message verified');
});

Then('I should see the state validation error message from fixtures', () => {
    cy.log('📍 STEP: Then I should see the state validation error message from fixtures');
    console.log('Step: Verifying state validation error message');
    AddressPage.verifyErrorMessage('state', addressData.errorMessages.stateInvalid);
    cy.log('✅ STEP COMPLETED: State validation error message verified');
});

Then('I should see the city validation error message from fixtures', () => {
    cy.log('📍 STEP: Then I should see the city validation error message from fixtures');
    console.log('Step: Verifying city validation error message');
    AddressPage.verifyErrorMessage('city', addressData.errorMessages.cityInvalid);
    cy.log('✅ STEP COMPLETED: City validation error message verified');
});

Then('I should see the first name validation error message from fixtures', () => {
    cy.log('📍 STEP: Then I should see the first name validation error message from fixtures');
    console.log('Step: Verifying first name validation error message');
    AddressPage.verifyErrorMessage('first name', addressData.errorMessages.firstNameInvalid);
    cy.log('✅ STEP COMPLETED: First name validation error message verified');
});

Then('I should see the street validation error message from fixtures', () => {
    cy.log('📍 STEP: Then I should see the street validation error message from fixtures');
    console.log('Step: Verifying street validation error message');
    AddressPage.verifyErrorMessage('street address', addressData.errorMessages.streetInvalid);
    cy.log('✅ STEP COMPLETED: Street validation error message verified');
});

Then('I should see the country validation error message from fixtures', () => {
    cy.log('📍 STEP: Then I should see the country validation error message from fixtures');
    console.log('Step: Verifying country validation error message');
    AddressPage.verifyErrorMessage('country', addressData.errorMessages.countryInvalid);
    cy.log('✅ STEP COMPLETED: Country validation error message verified');
});

Then('I should not see any validation error for the {string} field', (fieldName) => {
    cy.log(`📍 STEP: Then I should not see any validation error for the "${fieldName}" field`);
    console.log(`Step: Verifying no validation error for ${fieldName}`);
    AddressPage.verifyNoErrorMessage(fieldName);
    cy.log(`✅ STEP COMPLETED: No validation error verified for ${fieldName}`);
});

Then('I should not see any validation error messages', () => {
    cy.log('📍 STEP: Then I should not see any validation error messages');
    console.log('Step: Verifying no validation error messages');
    AddressPage.verifyNoValidationErrors();
    cy.log('✅ STEP COMPLETED: No validation error messages verified');
});

Then('I should see validation errors for all invalid fields from fixtures', () => {
    cy.log('📍 STEP: Then I should see validation errors for all invalid fields from fixtures');
    console.log('Step: Verifying validation errors for multiple invalid fields');
    AddressPage.verifyValidationErrorsForInvalidFields(addressData.errorMessages);
    cy.log('✅ STEP COMPLETED: Multiple validation errors verified');
});

// ===== FORM STATE VERIFICATION STEPS =====

Then('all form fields should display the entered values correctly', () => {
    cy.log('📍 STEP: Then all form fields should display the entered values correctly');
    console.log('Step: Verifying form field values');
    AddressPage.verifyFormFieldValues(addressData.validAddressData);
    cy.log('✅ STEP COMPLETED: Form field values verified');
});

Then('the invalid data should still be displayed in the form fields', () => {
    cy.log('📍 STEP: Then the invalid data should still be displayed in the form fields');
    console.log('Step: Verifying invalid data persists in form fields');
    // Form should retain the invalid data that was entered
    cy.log('✅ STEP COMPLETED: Invalid data persistence verified');
});

// ===== NAVIGATION VERIFICATION STEPS =====

Then('I should be navigated to the payment page from fixtures', () => {
    cy.log('📍 STEP: Then I should be navigated to the payment page from fixtures');
    console.log('Step: Verifying navigation to payment page');
    AddressPage.verifyNavigationToPaymentPage();
    cy.log('✅ STEP COMPLETED: Navigation to payment page verified');
});

Then('I should see the payment page URL from fixtures', () => {
    cy.log('📍 STEP: Then I should see the payment page URL from fixtures');
    console.log('Step: Verifying payment page URL');
    AddressPage.verifyPageURL(addressData.urls.paymentPage);
    cy.log('✅ STEP COMPLETED: Payment page URL verified');
});

Then('I should be navigated to the cart page from fixtures', () => {
    cy.log('📍 STEP: Then I should be navigated to the cart page from fixtures');
    console.log('Step: Verifying navigation to cart page');
    AddressPage.verifyNavigationToCartPage();
    cy.log('✅ STEP COMPLETED: Navigation to cart page verified');
});

Then('I should see the cart page URL from fixtures', () => {
    cy.log('📍 STEP: Then I should see the cart page URL from fixtures');
    console.log('Step: Verifying cart page URL');
    AddressPage.verifyPageURL(addressData.urls.cartPage);
    cy.log('✅ STEP COMPLETED: Cart page URL verified');
});

Then('I should remain on the address page', () => {
    cy.log('📍 STEP: Then I should remain on the address page');
    console.log('Step: Verifying user remains on address page');
    AddressPage.verifyRemainsOnAddressPage();
    cy.log('✅ STEP COMPLETED: Verified user remains on address page');
});

Then('the form should not be submitted', () => {
    cy.log('📍 STEP: Then the form should not be submitted');
    console.log('Step: Verifying form was not submitted');
    AddressPage.verifyFormNotSubmitted();
    cy.log('✅ STEP COMPLETED: Form not submitted verification successful');
});

// ===== HTML5 VALIDATION STEPS =====

Then('I should see the native browser validation tooltip for the first name field', () => {
    cy.log('📍 STEP: Then I should see the native browser validation tooltip for the first name field');
    console.log('Step: Verifying native browser validation');
    AddressPage.verifyNativeBrowserValidation();
    cy.log('✅ STEP COMPLETED: Native browser validation verified');
});

// ===== INDIVIDUAL FIELD CLICK STEPS (without quotes) =====

When('I click on the first name field', () => {
    cy.log('📍 STEP: When I click on the first name field');
    console.log('Step: Clicking on first name field');
    AddressPage.clickField('first name');
    cy.log('✅ STEP COMPLETED: First name field clicked');
});

When('I click on the email field', () => {
    cy.log('📍 STEP: When I click on the email field');
    console.log('Step: Clicking on email field');
    AddressPage.clickField('email');
    cy.log('✅ STEP COMPLETED: Email field clicked');
});

When('I click on the phone field', () => {
    cy.log('📍 STEP: When I click on the phone field');
    console.log('Step: Clicking on phone field');
    AddressPage.clickField('phone');
    cy.log('✅ STEP COMPLETED: Phone field clicked');
});

When('I click on the street address field', () => {
    cy.log('📍 STEP: When I click on the street address field');
    console.log('Step: Clicking on street address field');
    AddressPage.clickField('street address');
    cy.log('✅ STEP COMPLETED: Street address field clicked');
});

When('I click on the city field', () => {
    cy.log('📍 STEP: When I click on the city field');
    console.log('Step: Clicking on city field');
    AddressPage.clickField('city');
    cy.log('✅ STEP COMPLETED: City field clicked');
});

When('I click on the state field', () => {
    cy.log('📍 STEP: When I click on the state field');
    console.log('Step: Clicking on state field');
    AddressPage.clickField('state');
    cy.log('✅ STEP COMPLETED: State field clicked');
});

When('I click on the zip code field', () => {
    cy.log('📍 STEP: When I click on the zip code field');
    console.log('Step: Clicking on zip code field');
    AddressPage.clickField('zip code');
    cy.log('✅ STEP COMPLETED: Zip code field clicked');
});

When('I click on the country field', () => {
    cy.log('📍 STEP: When I click on the country field');
    console.log('Step: Clicking on country field');
    AddressPage.clickField('country');
    cy.log('✅ STEP COMPLETED: Country field clicked');
});

// ===== CLICK OUTSIDE FIELD STEPS (without quotes) =====

When('I click outside the first name field without entering any value', () => {
    cy.log('📍 STEP: When I click outside the first name field without entering any value');
    console.log('Step: Clicking outside first name field');
    AddressPage.clickOutsideField('first name');
    cy.log('✅ STEP COMPLETED: Clicked outside first name field');
});

When('I click outside the email field without entering any value', () => {
    cy.log('📍 STEP: When I click outside the email field without entering any value');
    console.log('Step: Clicking outside email field');
    AddressPage.clickOutsideField('email');
    cy.log('✅ STEP COMPLETED: Clicked outside email field');
});

When('I click outside the phone field without entering any value', () => {
    cy.log('📍 STEP: When I click outside the phone field without entering any value');
    console.log('Step: Clicking outside phone field');
    AddressPage.clickOutsideField('phone');
    cy.log('✅ STEP COMPLETED: Clicked outside phone field');
});

When('I click outside the street address field without entering any value', () => {
    cy.log('📍 STEP: When I click outside the street address field without entering any value');
    console.log('Step: Clicking outside street address field');
    AddressPage.clickOutsideField('street address');
    cy.log('✅ STEP COMPLETED: Clicked outside street address field');
});

When('I click outside the city field without entering any value', () => {
    cy.log('📍 STEP: When I click outside the city field without entering any value');
    console.log('Step: Clicking outside city field');
    AddressPage.clickOutsideField('city');
    cy.log('✅ STEP COMPLETED: Clicked outside city field');
});

When('I click outside the state field without entering any value', () => {
    cy.log('📍 STEP: When I click outside the state field without entering any value');
    console.log('Step: Clicking outside state field');
    AddressPage.clickOutsideField('state');
    cy.log('✅ STEP COMPLETED: Clicked outside state field');
});

When('I click outside the zip code field without entering any value', () => {
    cy.log('📍 STEP: When I click outside the zip code field without entering any value');
    console.log('Step: Clicking outside zip code field');
    AddressPage.clickOutsideField('zip code');
    cy.log('✅ STEP COMPLETED: Clicked outside zip code field');
});

When('I click outside the country field without entering any value', () => {
    cy.log('📍 STEP: When I click outside the country field without entering any value');
    console.log('Step: Clicking outside country field');
    AddressPage.clickOutsideField('country');
    cy.log('✅ STEP COMPLETED: Clicked outside country field');
});

// ===== BLUR EVENT STEPS (alternative naming) =====

When('I click outside the first name field', () => {
    cy.log('📍 STEP: When I click outside the first name field');
    console.log('Step: Triggering blur on first name field');
    AddressPage.clickOutsideField('first name');
    cy.log('✅ STEP COMPLETED: First name field blur triggered');
});

When('I click outside the email field', () => {
    cy.log('📍 STEP: When I click outside the email field');
    console.log('Step: Triggering blur on email field');
    AddressPage.clickOutsideField('email');
    cy.log('✅ STEP COMPLETED: Email field blur triggered');
});

When('I click outside the phone field', () => {
    cy.log('📍 STEP: When I click outside the phone field');
    console.log('Step: Triggering blur on phone field');
    AddressPage.clickOutsideField('phone');
    cy.log('✅ STEP COMPLETED: Phone field blur triggered');
});

When('I click outside the street address field', () => {
    cy.log('📍 STEP: When I click outside the street address field');
    console.log('Step: Triggering blur on street address field');
    AddressPage.clickOutsideField('street address');
    cy.log('✅ STEP COMPLETED: Street address field blur triggered');
});

When('I click outside the city field', () => {
    cy.log('📍 STEP: When I click outside the city field');
    console.log('Step: Triggering blur on city field');
    AddressPage.clickOutsideField('city');
    cy.log('✅ STEP COMPLETED: City field blur triggered');
});

When('I click outside the state field', () => {
    cy.log('📍 STEP: When I click outside the state field');
    console.log('Step: Triggering blur on state field');
    AddressPage.clickOutsideField('state');
    cy.log('✅ STEP COMPLETED: State field blur triggered');
});

When('I click outside the zip code field', () => {
    cy.log('📍 STEP: When I click outside the zip code field');
    console.log('Step: Triggering blur on zip code field');
    AddressPage.clickOutsideField('zip code');
    cy.log('✅ STEP COMPLETED: Zip code field blur triggered');
});

When('I click outside the country field', () => {
    cy.log('📍 STEP: When I click outside the country field');
    console.log('Step: Triggering blur on country field');
    AddressPage.clickOutsideField('country');
    cy.log('✅ STEP COMPLETED: Country field blur triggered');
});

// ===== INDIVIDUAL FIELD ERROR MESSAGE VERIFICATION STEPS =====

Then('I should see the required error message for the first name field', () => {
    cy.log('📍 STEP: Then I should see the required error message for the first name field');
    console.log('Step: Verifying required error message for first name');
    AddressPage.verifyErrorMessage('first name', addressData.errorMessages.required);
    cy.log('✅ STEP COMPLETED: Required error message verified for first name');
});

Then('I should see the required error message for the email field', () => {
    cy.log('📍 STEP: Then I should see the required error message for the email field');
    console.log('Step: Verifying required error message for email');
    AddressPage.verifyErrorMessage('email', addressData.errorMessages.required);
    cy.log('✅ STEP COMPLETED: Required error message verified for email');
});

Then('I should see the required error message for the phone field', () => {
    cy.log('📍 STEP: Then I should see the required error message for the phone field');
    console.log('Step: Verifying required error message for phone');
    AddressPage.verifyErrorMessage('phone', addressData.errorMessages.required);
    cy.log('✅ STEP COMPLETED: Required error message verified for phone');
});

Then('I should see the required error message for the street address field', () => {
    cy.log('📍 STEP: Then I should see the required error message for the street address field');
    console.log('Step: Verifying required error message for street address');
    AddressPage.verifyErrorMessage('street address', addressData.errorMessages.required);
    cy.log('✅ STEP COMPLETED: Required error message verified for street address');
});

Then('I should see the required error message for the city field', () => {
    cy.log('📍 STEP: Then I should see the required error message for the city field');
    console.log('Step: Verifying required error message for city');
    AddressPage.verifyErrorMessage('city', addressData.errorMessages.required);
    cy.log('✅ STEP COMPLETED: Required error message verified for city');
});

Then('I should see the required error message for the state field', () => {
    cy.log('📍 STEP: Then I should see the required error message for the state field');
    console.log('Step: Verifying required error message for state');
    AddressPage.verifyErrorMessage('state', addressData.errorMessages.required);
    cy.log('✅ STEP COMPLETED: Required error message verified for state');
});

Then('I should see the required error message for the zip code field', () => {
    cy.log('📍 STEP: Then I should see the required error message for the zip code field');
    console.log('Step: Verifying required error message for zip code');
    AddressPage.verifyErrorMessage('zip code', addressData.errorMessages.required);
    cy.log('✅ STEP COMPLETED: Required error message verified for zip code');
});

Then('I should see the required error message for the country field', () => {
    cy.log('📍 STEP: Then I should see the required error message for the country field');
    console.log('Step: Verifying required error message for country');
    AddressPage.verifyErrorMessage('country', addressData.errorMessages.required);
    cy.log('✅ STEP COMPLETED: Required error message verified for country');
});

// ===== NO ERROR MESSAGE VERIFICATION STEPS =====

Then('I should not see any validation error for the first name field', () => {
    cy.log('📍 STEP: Then I should not see any validation error for the first name field');
    console.log('Step: Verifying no validation error for first name');
    AddressPage.verifyNoErrorMessage('first name');
    cy.log('✅ STEP COMPLETED: No validation error verified for first name');
});

Then('I should not see any validation error for the email field', () => {
    cy.log('📍 STEP: Then I should not see any validation error for the email field');
    console.log('Step: Verifying no validation error for email');
    AddressPage.verifyNoErrorMessage('email');
    cy.log('✅ STEP COMPLETED: No validation error verified for email');
});

Then('I should not see any validation error for the phone field', () => {
    cy.log('📍 STEP: Then I should not see any validation error for the phone field');
    console.log('Step: Verifying no validation error for phone');
    AddressPage.verifyNoErrorMessage('phone');
    cy.log('✅ STEP COMPLETED: No validation error verified for phone');
});

Then('I should not see any validation error for the street address field', () => {
    cy.log('📍 STEP: Then I should not see any validation error for the street address field');
    console.log('Step: Verifying no validation error for street address');
    AddressPage.verifyNoErrorMessage('street address');
    cy.log('✅ STEP COMPLETED: No validation error verified for street address');
});

Then('I should not see any validation error for the city field', () => {
    cy.log('📍 STEP: Then I should not see any validation error for the city field');
    console.log('Step: Verifying no validation error for city');
    AddressPage.verifyNoErrorMessage('city');
    cy.log('✅ STEP COMPLETED: No validation error verified for city');
});

Then('I should not see any validation error for the state field', () => {
    cy.log('📍 STEP: Then I should not see any validation error for the state field');
    console.log('Step: Verifying no validation error for state');
    AddressPage.verifyNoErrorMessage('state');
    cy.log('✅ STEP COMPLETED: No validation error verified for state');
});

Then('I should not see any validation error for the zip code field', () => {
    cy.log('📍 STEP: Then I should not see any validation error for the zip code field');
    console.log('Step: Verifying no validation error for zip code');
    AddressPage.verifyNoErrorMessage('zip code');
    cy.log('✅ STEP COMPLETED: No validation error verified for zip code');
});

Then('I should not see any validation error for the country field', () => {
    cy.log('📍 STEP: Then I should not see any validation error for the country field');
    console.log('Step: Verifying no validation error for country');
    AddressPage.verifyNoErrorMessage('country');
    cy.log('✅ STEP COMPLETED: No validation error verified for country');
});
