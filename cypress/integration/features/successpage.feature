Feature: Order Success Page Functionality
  As a customer
  I want to see my order confirmation details on the success page
  So that I can verify my purchase was completed successfully

  Background:
    Given I have completed a purchase and am on the success page

  Scenario: Success page displays correctly after order completion
    Then I should see the success page
    And I should see the order confirmation message
    And I should see my order number
    And I should see the order summary

  Scenario: Order total should reflect correct calculation with quantities
    Then the order total should match the actual purchase amount
    And the total should include quantity calculations

  Scenario: Order details should be accessible from localStorage
    Then the order information should be properly retrieved
    And cart data should be available for order display

  Scenario: Navigation from success page works correctly
    When I click on the "View Your Orders" button
    Then I should be navigated to the profile page
    And I should see my order in the order history

  Scenario: Success page should handle direct access properly
    Given I navigate directly to the success page URL
    Then the page should load without errors
    And appropriate order information should be displayed

  Scenario: Order number should be unique and properly formatted
    Then the order number should be displayed
    And the order number should be properly formatted
    And the order number should be unique

  Scenario: Cart data should be accessible after payment completion
    Given I have cart data stored with PaymentPage key format
    When I visit the success page
    Then the success page should be able to retrieve cart data
    And order processing should work seamlessly across pages

  Scenario: Continue Shopping navigation works correctly
    When I click on the "Continue Shopping" button
    Then I should be navigated to the homepage
    And the URL should be the homepage URL

  Scenario: View Your Orders navigation works correctly
    When I click on the "View Your Orders" button
    Then I should be navigated to the profile page
    And the URL should be the profile page URL