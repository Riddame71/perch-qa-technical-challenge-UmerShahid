Feature: Address Page Form Validation and Navigation
  As a user
  I want to fill out my delivery address information
  So that I can proceed to payment with correct shipping details

  Background:
    Given I navigate directly to the address page using URL from fixtures

  # Basic Page Navigation and Display
  Scenario: User can navigate directly to address page via URL
    Then I should see the address page is displayed
    And I should see the page title from fixtures
    And I should see the address form is visible
    And I should see the "Back to Cart" button from fixtures
    And I should see the "Continue to Payment" button from fixtures

  # HTML5 Required Field Validation (Native Browser Tooltip)
  Scenario: User tries to submit form without filling any fields - HTML5 validation
    When I click the "Continue to Payment" button without filling any fields
    Then I should see the native browser validation tooltip for the first name field
    And I should remain on the address page
    And the form should not be submitted

  # Individual Field Required Validation (Custom Validation Messages)
  Scenario: User sees required message when unfocusing empty first name field
    When I click on the first name field
    And I click outside the first name field without entering any value
    Then I should see the required error message for the first name field

  Scenario: User sees required message when unfocusing empty email field
    When I click on the email field
    And I click outside the email field without entering any value
    Then I should see the required error message for the email field

  Scenario: User sees required message when unfocusing empty phone field
    When I click on the phone field
    And I click outside the phone field without entering any value
    Then I should see the required error message for the phone field

  Scenario: User sees required message when unfocusing empty street field
    When I click on the street address field
    And I click outside the street address field without entering any value
    Then I should see the required error message for the street address field

  Scenario: User sees required message when unfocusing empty city field
    When I click on the city field
    And I click outside the city field without entering any value
    Then I should see the required error message for the city field

  Scenario: User sees required message when unfocusing empty state field
    When I click on the state field
    And I click outside the state field without entering any value
    Then I should see the required error message for the state field

  Scenario: User sees required message when unfocusing empty zip code field
    When I click on the zip code field
    And I click outside the zip code field without entering any value
    Then I should see the required error message for the zip code field

  Scenario: User sees required message when unfocusing empty country field
    When I click on the country field
    And I click outside the country field without entering any value
    Then I should see the required error message for the country field

  # Email Validation Tests
  Scenario: User enters invalid email format and sees validation error
    When I click on the email field
    And I enter invalid email format from fixtures
    And I click outside the email field
    Then I should see the email validation error message from fixtures

  Scenario: User enters email without @ symbol and sees validation error
    When I click on the email field
    And I enter email without @ symbol from fixtures
    And I click outside the email field
    Then I should see the email validation error message from fixtures

  Scenario: User enters email without domain and sees validation error
    When I click on the email field
    And I enter email without domain from fixtures
    And I click outside the email field
    Then I should see the email validation error message from fixtures

  # Phone Number Validation Tests
  Scenario: User enters alphabetic characters in phone field and sees validation error
    When I click on the phone field
    And I enter alphabetic phone number from fixtures
    And I click outside the phone field
    Then I should see the phone validation error message from fixtures

  Scenario: User enters phone number with less than 10 digits and sees validation error
    When I click on the phone field
    And I enter short phone number from fixtures
    And I click outside the phone field
    Then I should see the phone validation error message from fixtures

  Scenario: User enters phone number with more than 15 digits and sees validation error
    When I click on the phone field
    And I enter long phone number from fixtures
    And I click outside the phone field
    Then I should see the phone validation error message from fixtures

  # ZIP Code Validation Tests
  Scenario: User enters alphabetic characters in zip code field and sees validation error
    When I click on the zip code field
    And I enter alphabetic zip code from fixtures
    And I click outside the zip code field
    Then I should see the zip code validation error message from fixtures

  Scenario: User enters zip code with less than 4 digits and sees validation error
    When I click on the zip code field
    And I enter short zip code from fixtures
    And I click outside the zip code field
    Then I should see the zip code validation error message from fixtures

  Scenario: User enters zip code with more than 5 digits and sees validation error
    When I click on the zip code field
    And I enter long zip code from fixtures
    And I click outside the zip code field
    Then I should see the zip code validation error message from fixtures

  Scenario: User enters zip code with special characters and sees validation error
    When I click on the zip code field
    And I enter zip code with special characters from fixtures
    And I click outside the zip code field
    Then I should see the zip code validation error message from fixtures

  # State Field Validation Tests
  Scenario: User enters numbers in state field and sees validation error
    When I click on the state field
    And I enter numeric state from fixtures
    And I click outside the state field
    Then I should see the state validation error message from fixtures

  Scenario: User enters special characters in state field and sees validation error
    When I click on the state field
    And I enter state with special characters from fixtures
    And I click outside the state field
    Then I should see the state validation error message from fixtures

  Scenario: User enters single character in state field and sees validation error
    When I click on the state field
    And I enter short state from fixtures
    And I click outside the state field
    Then I should see the state validation error message from fixtures

  # City Field Validation Tests
  Scenario: User enters numbers in city field and sees validation error
    When I click on the city field
    And I enter numeric city from fixtures
    And I click outside the city field
    Then I should see the city validation error message from fixtures

  Scenario: User enters special characters in city field and sees validation error
    When I click on the city field
    And I enter city with special characters from fixtures
    And I click outside the city field
    Then I should see the city validation error message from fixtures

  Scenario: User enters single character in city field and sees validation error
    When I click on the city field
    And I enter short city from fixtures
    And I click outside the city field
    Then I should see the city validation error message from fixtures

  # First Name Validation Tests
  Scenario: User enters numbers in first name field and sees validation error
    When I click on the first name field
    And I enter numeric first name from fixtures
    And I click outside the first name field
    Then I should see the first name validation error message from fixtures

  Scenario: User enters single character in first name field and sees validation error
    When I click on the first name field
    And I enter short first name from fixtures
    And I click outside the first name field
    Then I should see the first name validation error message from fixtures

  Scenario: User enters more than 30 characters in first name field and sees validation error
    When I click on the first name field
    And I enter long first name from fixtures
    And I click outside the first name field
    Then I should see the first name validation error message from fixtures

  # Street Address Validation Tests
  Scenario: User enters less than 5 characters in street address field and sees validation error
    When I click on the street address field
    And I enter short street address from fixtures
    And I click outside the street address field
    Then I should see the street validation error message from fixtures

  # Country Field Validation Tests
  Scenario: User enters numbers in country field and sees validation error
    When I click on the country field
    And I enter numeric country from fixtures
    And I click outside the country field
    Then I should see the country validation error message from fixtures

  Scenario: User enters special characters in country field and sees validation error
    When I click on the country field
    And I enter country with special characters from fixtures
    And I click outside the country field
    Then I should see the country validation error message from fixtures

  # Valid Data Entry Tests
  Scenario: User can enter valid data in all fields without validation errors
    When I enter valid address information from fixtures
    Then I should not see any validation error messages
    And all form fields should display the entered values correctly

  # Successful Form Submission
  Scenario: User can successfully submit form with valid data and navigate to payment page
    When I fill all address fields with valid data from fixtures
    And I click the "Continue to Payment" button
    Then I should be navigated to the payment page from fixtures
    And I should see the payment page URL from fixtures

  # Navigation Tests
  Scenario: User can navigate back to cart from address page
    When I click the "Back to Cart" button
    Then I should be navigated to the cart page from fixtures
    And I should see the cart page URL from fixtures

  # Form State Persistence Tests
  Scenario: Form retains validation errors when user attempts to submit with invalid data
    When I enter invalid data in multiple fields from fixtures
    And I click the "Continue to Payment" button
    Then I should see validation errors for all invalid fields from fixtures
    And I should remain on the address page
    And the invalid data should still be displayed in the form fields

  # Edge Case Tests
  Scenario: User can enter valid 4-digit ZIP code
    When I click on the zip code field
    And I enter valid 4-digit zip code from fixtures
    And I click outside the zip code field
    Then I should not see any validation error for the zip code field

  Scenario: User can enter valid 5-digit ZIP code
    When I click on the zip code field
    And I enter valid 5-digit zip code from fixtures
    And I click outside the zip code field
    Then I should not see any validation error for the zip code field

  Scenario: User can enter valid 10-digit phone number
    When I click on the phone field
    And I enter valid 10-digit phone number from fixtures
    And I click outside the phone field
    Then I should not see any validation error for the phone field

  Scenario: User can enter valid 15-digit phone number
    When I click on the phone field
    And I enter valid 15-digit phone number from fixtures
    And I click outside the phone field
    Then I should not see any validation error for the phone field

  Scenario: User can enter names with spaces in first name field
    When I click on the first name field
    And I enter name with spaces from fixtures
    And I click outside the first name field
    Then I should not see any validation error for the first name field

  # Alternate Valid Data Test
  Scenario: User can successfully submit form with alternate valid data set
    When I fill all address fields with alternate valid data from fixtures
    And I click the "Continue to Payment" button
    Then I should be navigated to the payment page from fixtures
    And I should see the payment page URL from fixtures
