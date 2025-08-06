Feature: Shopping Cart Functionality
  As a user
  I want to manage items in my shopping cart
  So that I can review, modify, and purchase products

  Background:
    Given I am on the homepage

  # Basic Cart Navigation and Empty State  
  Scenario: User can navigate to cart from homepage and see empty cart
    When I click on the Cart button from homepage
    Then I should see the cart page is displayed
    And I should see the cart page URL is correct
    And I should see the Shopping Cart title
    And I should see the empty cart state with message
    And I should see the Continue Shopping button in empty cart

  Scenario: User can continue shopping from empty cart
    When I click on the Cart button from homepage
    And I should see the empty cart state with message
    And I click the Continue Shopping button in empty cart
    Then I should be navigated back to the homepage
    And I should see the page title "Product Catalog"

  # Single Item Addition - Default Quantity
  Scenario: User can add single item with default quantity to cart
    When I navigate to product details for "Classic White Sneakers"
    And I add the product to cart with default quantity
    Then I should see the cart page is displayed
    And I should see "Classic White Sneakers" in the cart
    And I should see the cart item quantity is "1"
    And I should see the cart subtotal displays "$79.99"

  Scenario: User can add Premium Leather Watch with default quantity
    When I navigate to product details for "Premium Leather Watch"
    And I add the product to cart with default quantity
    Then I should see the cart page is displayed
    And I should see "Premium Leather Watch" in the cart
    And I should see the cart item quantity is "1"
    And I should see the cart subtotal displays "$149.99"

  # Multiple Quantity Addition (Exposes calculation bugs naturally)
  Scenario: User can add item with quantity 2 (exposes calculation bug)
    When I navigate to product details for "Classic White Sneakers"
    And I select quantity "2" and add to cart
    Then I should see the cart page is displayed
    And I should see "Classic White Sneakers" in the cart
    And I should see the cart item quantity is "2"
    And the cart subtotal calculation should be correct for quantity "2"

  Scenario: User can add item with quantity 3
    When I navigate to product details for "Premium Leather Watch"
    And I select quantity "3" and add to cart
    Then I should see the cart page is displayed
    And I should see "Premium Leather Watch" in the cart
    And I should see the cart item quantity is "3"
    And I should see the cart subtotal displays "$449.97"

  # Item Removal Functionality
  Scenario: User can remove item from cart using remove button
    When I navigate to product details for "Classic White Sneakers"
    And I add the product to cart with default quantity
    And I remove the first item from cart
    Then the cart should return to empty state

  Scenario: User can remove item by setting quantity to 0
    When I navigate to product details for "Classic White Sneakers"
    And I select quantity "2" and add to cart
    And I update the first item quantity to "0"
    Then the cart should return to empty state

  # Cart Quantity Management
  Scenario: User can update item quantity in cart
    When I navigate to product details for "Classic White Sneakers"
    And I add the product to cart with default quantity
    And I update the first item quantity to "3"
    Then I should see the cart item quantity is "3"
    And I should see the cart subtotal displays "$239.97"

  Scenario: User can verify quantity selector limitations (UX issue)
    When I navigate to product details for "Classic White Sneakers"
    Then the quantity selector should show options up to "5"

  # Multiple Items in Cart
  Scenario: User can add multiple different products to cart
    When I navigate to product details for "Classic White Sneakers"
    And I select quantity "2" and add to cart
    And I click the Continue Shopping button from cart header
    And I navigate to product details for "Wireless Headphones"
    And I add the product to cart with default quantity
    Then I should see multiple items in the cart
    And I should see "Classic White Sneakers" in the cart
    And I should see "Wireless Headphones" in the cart

  # Basic Checkout Flow
  Scenario: User completes successful checkout with single item
    When I navigate to product details for "Classic White Sneakers"
    And I add the product to cart with default quantity
    And I proceed through checkout with cart data
    Then I should reach the order confirmation page

  # Checkout with Multiple Quantities (Naturally exposes order calculation bugs)
  Scenario: User completes checkout with multiple quantities
    When I navigate to product details for "Classic White Sneakers"
    And I select quantity "2" and add to cart
    And I proceed through checkout with cart data
    Then I should reach the order confirmation page