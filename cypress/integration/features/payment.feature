Feature: Payment Page Navigation and Verification
  As a user
  I want to access and verify the payment page
  So that I can complete my purchase with confidence

  Scenario: User can navigate directly to payment page using URL
    When I navigate directly to the payment page using URL
    Then I should see the payment page is displayed
    And I should see the payment page URL is correct
    And I should see the payment form elements

  Scenario: User can verify the payment page title
    When I navigate directly to the payment page using URL
    Then I should see the payment page title from fixture data
    And I should see the main title "Payment Information" is displayed correctly

  Scenario: User can navigate back to address page using back button
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I click the "Back to Address" button on payment page
    Then I should be navigated to the address page
    And I should see the address page URL is correct
    And I should see the delivery address form

  Scenario: User sees validation tooltip when trying to place order without filling required fields
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I click the "Place Order" button on payment page without filling any fields
    Then I should see HTML5 validation tooltip "Please fill out this field"
    And the payment form should not be submitted
    And I should remain on the payment page

  Scenario: User sees validation messages when clicking on fields and then clicking elsewhere
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I click on the "Card Holder Name" field on payment page
    And I click somewhere else on the page
    Then I should see the validation error "This field is required" for the "Card Holder Name" field
    When I click on the "Card Number" field on payment page
    And I click somewhere else on the page
    Then I should see the validation error "This field is required" for the "Card Number" field
    When I click on the "Expiry Date" field on payment page
    And I click somewhere else on the page
    Then I should see the validation error "This field is required" for the "Expiry Date" field
    When I click on the "CVV" field on payment page
    And I click somewhere else on the page
    Then I should see the validation error "This field is required" for the "CVV" field

  Scenario: User sees validation error when typing invalid characters in Card Holder Name field
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I type "32525" in the "Card Holder Name" field on payment page
    And I click somewhere else on the page
    Then I should see the validation error "Card holder name must be 2-50 characters and contain only letters" for the "Card Holder Name" field

  Scenario: User sees validation error when typing special characters in Card Holder Name field
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I type "&^(%*^" in the "Card Holder Name" field on payment page
    And I click somewhere else on the page
    Then I should see the validation error "Card holder name must be 2-50 characters and contain only letters" for the "Card Holder Name" field

  Scenario: User sees validation error when typing incomplete card number
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I type "2463 364" in the "Card Number" field on payment page
    And I click somewhere else on the page
    Then I should see the validation error "Card number must be 16 digits" for the "Card Number" field

  Scenario: User sees validation error when typing invalid expiry date format
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I type "3" in the "Expiry Date" field on payment page
    And I click somewhere else on the page
    Then I should see the validation error "Expiry date must be in MM/YY format" for the "Expiry Date" field

  Scenario: User sees validation error when typing invalid month in expiry date
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I type "3535" in the "Expiry Date" field on payment page
    And I click somewhere else on the page
    Then I should see the validation error "Expiry date must be in MM/YY format" for the "Expiry Date" field

  Scenario: User sees validation error when typing alphabetic characters in CVV field
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I type "abc" in the "CVV" field on payment page
    And I click somewhere else on the page
    Then I should see the validation error "CVV must be 3 or 4 digits" for the "CVV" field

  Scenario: User sees validation error when typing insufficient digits in CVV field
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I type "1" in the "CVV" field on payment page
    And I click somewhere else on the page
    Then I should see the validation error "CVV must be 3 or 4 digits" for the "CVV" field

  Scenario: User sees HTML5 tooltip for card number when only card holder name is filled
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I type "Umer" in the "Card Holder Name" field on payment page
    And I click the "Place Order" button on payment page without filling any fields
    Then I should see HTML5 validation tooltip "Please fill out this field"
    And the payment form should not be submitted

  Scenario: User sees HTML5 tooltip for expiry date when card holder and card number are filled
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I type "Umer" in the "Card Holder Name" field on payment page
    And I type "4111111111111111" in the "Card Number" field on payment page
    And I click the "Place Order" button on payment page without filling any fields
    Then I should see HTML5 validation tooltip "Please fill out this field"
    And the payment form should not be submitted

  Scenario: User sees HTML5 tooltip for CVV when card holder, card number and expiry date are filled
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I type "Umer" in the "Card Holder Name" field on payment page
    And I type "4111111111111111" in the "Card Number" field on payment page
    And I type "1225" in the "Expiry Date" field on payment page
    And I click the "Place Order" button on payment page without filling any fields
    Then I should see HTML5 validation tooltip "Please fill out this field"
    And the payment form should not be submitted

  Scenario: User successfully completes payment when all fields are filled correctly
    When I navigate directly to the payment page using URL
    And I should see the payment page is displayed
    When I type "Umer" in the "Card Holder Name" field on payment page
    And I type "4111111111111111" in the "Card Number" field on payment page
    And I type "1225" in the "Expiry Date" field on payment page
    And I type "123" in the "CVV" field on payment page
    And I click the "Place Order" button on payment page
    Then I should be navigated to the success page
    And I should see the success page URL is correct