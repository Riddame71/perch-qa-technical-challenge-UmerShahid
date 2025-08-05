Feature: Profile Page Functionality
  As a user
  I want to manage my profile information
  So that I can view and update my personal details

  Background:
    Given I am on the homepage

  Scenario: User can navigate to profile page
    When I click on the "Profile" button
    Then I should be navigated to the profile page
    And I should see the profile page URL

  Scenario: User can view profile page elements
    When I click on the "Profile" button
    Then I should see the profile page title "Your Profile"
    And I should see the "Back to Home" button
    And I should see the text "Personal Information"
    And I should see the text "Order History"
    And I should see the "Start Shopping" button

  Scenario: User can view personal information section
    When I click on the "Profile" button
    Then I should see the "Personal Information" section
    And I should see the "Name" field with current value
    And I should see the "Email" field with current value
    And I should see the "Edit Profile" button

  Scenario: User can enter edit mode for personal information
    When I click on the "Profile" button
    And I click on the "Edit Profile" button
    Then I should see the name field is editable
    And I should see the email field is editable
    And I should see the "Save Changes" button
    And I should see the "Cancel" button
    And I should not see the "Edit Profile" button

  Scenario: User can update name and save changes
    When I click on the "Profile" button
    And I click on the "Edit Profile" button
    And I clear the name field
    And I enter "valid name" in the name field
    And I click on the "Save Changes" button
    Then I should see the updated name displayed

  Scenario: User can update email and save changes
    When I click on the "Profile" button
    And I click on the "Edit Profile" button
    And I clear the email field
    And I enter "valid email" in the email field
    And I click on the "Save Changes" button
    Then I should see the updated email displayed

  Scenario: User sees validation error when name field is empty
    When I click on the "Profile" button
    And I click on the "Edit Profile" button
    And I clear the name field
    And I click outside the name field
    Then I should see the error message "Name must be at least 3 characters and contain only letters"
    And the "Save Changes" button should be disabled

  Scenario: User sees validation error when email field is empty
    When I click on the "Profile" button
    And I click on the "Edit Profile" button
    And I clear the email field
    And I click outside the profile email field
    Then I should see the error message "Please enter a valid email address"
    And the "Save Changes" button should be disabled

  Scenario: Save Changes button is disabled when name field is cleared
    When I click on the "Profile" button
    And I click on the "Edit Profile" button
    And I clear the name field
    Then the "Save Changes" button should be disabled

  Scenario: Save Changes button is disabled when email field is cleared
    When I click on the "Profile" button
    And I click on the "Edit Profile" button
    And I clear the email field
    Then the "Save Changes" button should be disabled

  Scenario: Save Changes button is disabled when both fields are cleared
    When I click on the "Profile" button
    And I click on the "Edit Profile" button
    And I clear the name field
    And I clear the email field
    Then the "Save Changes" button should be disabled

  Scenario: User can cancel edit mode without making changes
    When I click on the "Profile" button
    And I store the current name value
    And I store the current email value
    And I click on the "Edit Profile" button
    And I click on the "Cancel" button
    Then I should see the original name value is retained
    And I should see the original email value is retained
    And I should see the "Edit Profile" button
    And I should not see the "Save Changes" button
    And I should not see the "Cancel" button

  Scenario: User can cancel edit mode after making changes
    When I click on the "Profile" button
    And I store the current name value
    And I store the current email value
    And I click on the "Edit Profile" button
    And I clear the name field
    And I enter "test name" in the name field
    And I clear the email field
    And I enter "test email" in the email field
    And I click on the "Cancel" button
    Then I should see the original name value is retained
    And I should see the original email value is retained
    And I should see the "Edit Profile" button
    And I should not see the "Save Changes" button
    And I should not see the "Cancel" button

  Scenario: User can navigate back to homepage from profile page
    When I click on the "Profile" button
    And I click on the "Back to Home" button
    Then I should be navigated back to the homepage
    And I should see the page title "Product Catalog"

  Scenario: User can start shopping from profile page
    When I click on the "Profile" button
    And I click on the "Start Shopping" button
    Then I should be navigated back to the homepage
    And I should see the page title "Product Catalog"

  Scenario: User sees order history section
    When I click on the "Profile" button
    Then I should see the "Order History" section
    And I should see the text "You haven't placed any orders yet."
    And I should see the "Start Shopping" button in the order history section

  Scenario: User completes end-to-end purchase from profile page
    When I click on the "Profile" button
    And I click on the "Start Shopping" button
    Then I should be navigated back to the homepage
    When I click on "View Details" for the first product
    And I click on the "Add to Cart" button
    And I click on the "Proceed to Checkout" button
    And I fill in the delivery address information
    And I click on the "Continue to Payment" button
    And I fill in the payment information
    And I click on the "Place Order" button
    Then I should see the order confirmation page
    When I click on the "View Your Orders" button
    Then I should be navigated to the profile page
    And I should see the new order in order history

  Scenario: User can purchase multiple quantities and see correct cart total
    When I click on the "Profile" button
    And I click on the "Start Shopping" button
    When I click on "View Details" for the first product
    And I select quantity "2"
    And I click on the "Add to Cart" button
    Then the cart should show correct total for multiple items
    And the subtotal should reflect quantity times unit price

  Scenario: User completes purchase with multiple quantities and verifies order total
    When I click on the "Profile" button
    And I click on the "Start Shopping" button
    When I click on "View Details" for the first product
    And I select quantity "2"
    And I click on the "Add to Cart" button
    And I click on the "Proceed to Checkout" button
    And I fill in the delivery address information
    And I click on the "Continue to Payment" button
    And I fill in the payment information
    And I click on the "Place Order" button
    Then the order confirmation should show correct total amount
    When I click on the "View Your Orders" button
    Then the order history should display the correct purchase amount

  Scenario: User can select appropriate product quantities
    When I click on "View Details" for any product
    Then I should be able to select reasonable quantity options
    And the quantity selector should accommodate typical purchase needs

