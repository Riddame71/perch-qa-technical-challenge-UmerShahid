Feature: Homepage Navigation
  As a user
  I want to navigate to the homepage
  So that I can view all available products and interact with the UI

  Background:
    Given I am on the homepage

  Scenario: User can view homepage elements
    Then I should see the page title "Product Catalog"
    And I should see the Profile button
    And I should see the Cart button
    And I should see the search bar
    And I should see the Sort by Price button

  Scenario: User can see the product list
    Then I should see the full list of products
    And each product should display:
      | Image         |
      | Title         |
      | Price         |
      | Description   |
      | View Details  |

  Scenario: User can navigate to product details
    When I click on "View Details" for any product
    Then I should be navigated to that product's detail page

  Scenario: User can search for an existing product
    When I search for "sneaker"
    Then I should see search results containing "sneaker"
    And I should see products that match the search term

  Scenario: User searches for a non-existing product
    When I search for "nonexistentproduct"
    Then I should see the message "No products found matching your search."
    And I should not see any product cards

  Scenario: User can verify initial price sorting (ascending order)
    Then I should see products sorted by price in ascending order
    And I should see the sort button with ascending indicator

  Scenario: User can sort products by price in descending order
    When I click on the "Sort by Price" button
    Then I should see products sorted by price in descending order
    And I should see the sort button with descending indicator

  Scenario: User can navigate to Profile page
    When I click on the "Profile" button
    Then I should be navigated to the profile page
    And I should see the profile page URL

  Scenario: User can navigate to Cart page
    When I click on the "Cart" button
    Then I should be navigated to the cart page
    And I should see the cart page URL

  Scenario: User can navigate through all product details and return to homepage
    When I click on "View Details" for each product
    Then I should be navigated to each product's detail page
    And I should see each product detail page URL
    When I click on "Back to Products" from each product detail page
    Then I should be navigated back to the homepage