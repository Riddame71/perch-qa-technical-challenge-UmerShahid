# Test Findings and Bug Report

## Overview
This document contains findings.


---
## NOTE
THE 4 FAILED AUTOMATED TEST CASES ARE BASICALLY BUGS #1, #2, #3, #9 YOU WILL FIND IN THIS FILE BELOW. SCRIPT ITSELF IS PERFECTLY FINE.

## FINDINGS SUMMARY
- **9 Functional Bugs** (calculation errors, sorting logic, validation issues)
- **6 Critical Broken Flows** (cart data loss, payment processing failures, navigation issues)
- **8 UI/UX Anomalies** (visual inconsistencies, data display issues)
- **1 UX Consideration** (quantity selector limitations)
---

## 🐛 **Bugs Identified**

### **Bug #1: Order Total Calculation Ignores Quantity in Order History**


#### **Description**
When users purchase multiple quantities of an item, the order total displayed in the order history shows only the unit price instead of the calculated total (unit price × quantity).

#### **Steps to Reproduce**
1. Navigate to any product page
2. Select quantity greater than 1 (e.g., quantity "2")
3. Add to cart
4. Complete checkout process
5. View order history in profile page

#### **Expected Behavior**
- Cart page shows: 2 × $149.99 = $299.98 ✅
- Order history should show: Total = $299.98

#### **Actual Behavior**
- Cart page shows: 2 × $149.99 = $299.98 ✅
- Order history shows: Total = $149.99 ❌

---

### **Bug #2: Price Sorting Shows Incorrect Initial Order**

#### **Description**
When users first visit the homepage, products are not sorted by price in ascending order as expected. The sorting uses string comparison instead of numeric comparison.

#### **Steps to Reproduce**
1. Navigate to homepage
2. Observe product price order

#### **Expected Behavior**
- Products should display in ascending price order: $79.99, $149.99, $199.99

#### **Actual Behavior**
- Products display in incorrect order: $149.99, $199.99, $79.99

---

### **Bug #3: Sort by Price Button Produces Wrong Order**

#### **Description**
When users click the "Sort by Price" button, products are not sorted correctly in descending order. The sorting logic treats prices as strings rather than numbers.

#### **Steps to Reproduce**
1. Navigate to homepage
2. Click "Sort by Price" button
3. Observe product price order

#### **Expected Behavior**
- Products should display in descending price order: $199.99, $149.99, $79.99

#### **Actual Behavior**
- Products display in incorrect order: $79.99, $199.99, $149.99

---

### **Bug #4: Cart Quantity Accumulation Without Validation**

#### **Description**
When adding the same product to cart multiple times, quantities accumulate without any maximum limit validation, allowing unrealistic quantities.

#### **Steps to Reproduce**
1. Add product to cart with quantity 5
2. Go back to product page
3. Add same product with quantity 5 again
4. Repeat multiple times

#### **Expected Behavior**
- System should enforce reasonable maximum quantities (e.g., 10-50 per product)
- Display warning when approaching limits

#### **Actual Behavior**
- Quantities accumulate indefinitely (could reach 999+ items)
- No validation or limits enforced

---

### **Bug #5: localStorage Key Mismatch in Order Processing**

#### **Description**
SuccessPage looks for cart data using 'shopping-cart' key but CartPage and PaymentPage use 'cart' key, causing orders to not save correctly.

#### **Steps to Reproduce**
1. Add items to cart
2. Complete checkout process
3. Check if order appears in profile order history

#### **Expected Behavior**
- Order should be saved with correct items and quantities
- Order should appear in profile order history

#### **Actual Behavior**
- SuccessPage reads empty cart due to wrong localStorage key
- Orders may not save or save with empty item list

---

### **Bug #6: Expired Credit Cards Accepted**

#### **Description**
Payment form validates credit card expiry date format but intentionally allows expired cards to be processed.

#### **Steps to Reproduce**
1. Go to payment page
2. Enter expired date (e.g., "01/20" for January 2020)
3. Complete payment

#### **Expected Behavior**
- System should reject expired credit cards
- Display error message for expired cards

#### **Actual Behavior**
- Expired cards are accepted and processed
- No validation for card expiration

---

### **Bug #7: Restrictive ZIP Code Validation**

#### **Description**
Address form only accepts 4-5 digit ZIP codes, rejecting valid international postal codes that contain letters or different formats.

#### **Steps to Reproduce**
1. Go to address page
2. Enter international postal code (e.g., "SW1A 1AA" for UK)
3. Try to continue

#### **Expected Behavior**
- Accept valid international postal code formats
- Support alphanumeric postal codes

#### **Actual Behavior**
- Rejects valid international postal codes
- Only accepts 4-5 digit numbers

---

### **Bug #8: Duplicate Order Total Calculation Bug in PaymentPage**

#### **Description**
PaymentPage also has the same quantity calculation bug as SuccessPage - order totals ignore item quantities when saving to order history.

#### **Steps to Reproduce**
1. Add multiple quantities of any product to cart
2. Complete checkout process
3. Check order total calculation in payment processing

#### **Expected Behavior**
- Order total should be calculated as: sum of (price × quantity) for each item

#### **Actual Behavior**
- Order total calculated as: sum of unit prices only, ignoring quantities

---

### **Bug #9: localStorage Key Mismatch Between Payment and Success Pages**

#### **Description**
PaymentPage stores cart data using 'cart' localStorage key, but SuccessPage attempts to retrieve cart data using 'shopping-cart' key, causing order data to be lost during checkout completion.

#### **Steps to Reproduce**
1. Add items to cart and proceed to payment
2. Complete payment process (data stored in 'cart' key)
3. Navigate to success page (looks for 'shopping-cart' key)
4. Observe that cart data cannot be retrieved

#### **Expected Behavior**
- Consistent localStorage key usage across all pages
- Cart data should be accessible on success page after payment

#### **Actual Behavior**
- PaymentPage stores cart data in localStorage key 'cart'
- SuccessPage looks for cart data in localStorage key 'shopping-cart'
- Cart data is not found, orders may not be properly saved

---

## 🔗 **Broken Application Flows**

### **Broken Flow #1: Cart Data Completely Lost on App Startup**

#### **Description**
The application clears all cart and shopping data every time it starts up, breaking the fundamental e-commerce user experience where cart should persist across sessions.

#### **Location**
- File: `src/App.js` lines 12-18

#### **Steps to Reproduce**
1. Add items to cart
2. Refresh the browser page
3. Check cart - all items are gone

#### **Expected Behavior**
- Cart should persist across browser sessions
- Only clear cart after successful order completion

#### **Actual Behavior**
- App.js executes `localStorage.removeItem('cart')` on every startup
- Users lose all shopping progress on page refresh
- Completely breaks normal e-commerce shopping experience

---

### **Broken Flow #2: Payment Success Never Triggers Order Saving**

#### **Description**
PaymentPage completes payment processing but doesn't set the `paymentStatus` flag that SuccessPage requires to save orders, resulting in orders never being saved to order history.

#### **Location**
- PaymentPage: `src/pages/PaymentPage.js` lines 100-129
- SuccessPage: `src/pages/SuccessPage.js` lines 9-32

#### **Steps to Reproduce**
1. Complete entire checkout flow
2. Successfully submit payment
3. Navigate to success page
4. Check profile - no order in history

#### **Expected Behavior**
- Successful payment should save order to history
- SuccessPage should display order confirmation

#### **Actual Behavior**
- PaymentPage doesn't set `localStorage.setItem('paymentStatus', 'success')`
- SuccessPage checks for this flag before saving order
- Order is never saved due to missing flag

---

### **Broken Flow #3: Double Order Creation Logic**

#### **Description**
Both PaymentPage and SuccessPage contain order creation logic, but they use different localStorage keys for cart data, potentially creating duplicate or missing orders.

#### **Location**
- PaymentPage: `src/pages/PaymentPage.js` lines 103-116 (uses 'cart' key)
- SuccessPage: `src/pages/SuccessPage.js` lines 11-27 (uses 'shopping-cart' key)

#### **Steps to Reproduce**
1. Complete payment with items in cart
2. Observe PaymentPage creates order using 'cart' data
3. Navigate to SuccessPage 
4. SuccessPage attempts to create order using 'shopping-cart' data

#### **Expected Behavior**
- Single, consistent order creation logic
- Same localStorage key used throughout

#### **Actual Behavior**
- Two different order creation systems
- Different localStorage keys cause data mismatch
- Potential for duplicate or missing orders

---

### **Broken Flow #4: Direct Success Page Access Bypasses Order Saving**

#### **Description**
Users can navigate directly to `/checkout/success` URL without completing payment, and no order will be saved due to missing payment validation.

#### **Location**
- SuccessPage: `src/pages/SuccessPage.js` lines 14-32

#### **Steps to Reproduce**
1. Manually navigate to `http://localhost:3000/checkout/success`
2. Page loads successfully
3. No order is saved (no paymentStatus flag)
4. User sees success message without completing purchase

#### **Expected Behavior**
- Success page should redirect to cart if no valid payment completed
- Order saving should be guaranteed for legitimate purchases

#### **Actual Behavior**
- Success page accessible without payment completion
- Shows success message even for invalid access
- No order validation or saving occurs

---

### **Broken Flow #5: Product Not Found Error Provides No User Feedback**

#### **Description**
When users visit an invalid product URL, they're silently redirected to homepage without any explanation or error message.

#### **Location**
- ProductPage: `src/pages/ProductPage.js` lines 13-16

#### **Steps to Reproduce**
1. Navigate to invalid product URL like `/product/999`
2. User is immediately redirected to homepage
3. No error message or explanation provided

#### **Expected Behavior**
- Show "Product not found" error message
- Provide navigation options (search, browse categories)
- Clear user feedback about why redirect occurred

#### **Actual Behavior**
- Silent redirect to homepage
- User has no idea why they were redirected
- Confusing experience for users with bookmarked product links

---

### **Broken Flow #6: Inconsistent Checkout Route Navigation**

#### **Description**
The application has duplicate routes (`/checkout` and `/checkout/address`) both pointing to AddressPage, and different pages use different navigation paths, creating inconsistent user experience.

#### **Location**
- App.js: `src/App.js` lines 26-27 (duplicate routes)
- CartPage: `src/pages/CartPage.js` line 39 (navigates to `/checkout/address`)

#### **Steps to Reproduce**
1. Navigate to `/checkout` - goes to AddressPage
2. Navigate to `/checkout/address` - also goes to AddressPage
3. Cart "Proceed to Checkout" uses `/checkout/address`

#### **Expected Behavior**
- Single, consistent checkout route
- Clear route hierarchy for checkout process

#### **Actual Behavior**
- Two routes for same page
- Inconsistent navigation patterns
- Potential confusion in URL structure

---

## 🎨 **UX Considerations**

### **UX Issue #1: Limited Quantity Selection Range**

#### **Description**
Product quantity selector only allows selection of 1-5 items, which may not accommodate users wanting to purchase larger quantities for bulk orders, gifts, or business purposes.

#### **Current Behavior**
- Quantity dropdown shows options: 1, 2, 3, 4, 5
- No option for quantities above 5

#### **Potential Impact**
- **User Frustration:** Users wanting 6+ items must make multiple orders
- **Lost Sales:** Bulk purchasers may abandon cart due to limitation
- **Poor UX:** Forces workarounds for legitimate purchase needs

#### **Recommendation**
Consider expanding quantity range to 10+ options or implementing text input for custom quantities with reasonable maximum limits.

---

## 🔍 **UI/UX Anomalies**

### **Anomaly #1: Cart Loses All Items on Page Refresh**

#### **Description**
When users refresh the browser or navigate back to the site, their entire shopping cart is emptied, which is highly unusual for e-commerce sites.

#### **Steps to Reproduce**
1. Add items to cart
2. Refresh the browser page
3. Check cart contents

#### **Expected Behavior**
- Cart should persist items across browser sessions
- Items should remain until user manually removes them

#### **Actual Behavior**
- All cart items disappear on page refresh
- Users lose their shopping progress

---

### **Anomaly #2: Same Default Profile for All Users**

#### **Description**
Every user sees the same hardcoded profile information ("John Doe", "john.doe@example.com") instead of personalized or empty profile data.

#### **Steps to Reproduce**
1. Navigate to Profile page
2. Observe default profile information

#### **Expected Behavior**
- New users should see empty profile fields
- Returning users should see their saved information

#### **Actual Behavior**
- All users see identical "John Doe" profile data
- No user personalization or authentication

---

### **Anomaly #3: Inconsistent Button Styling Across Pages**

#### **Description**
The "Proceed to Checkout" button on the cart page has completely different styling (blue with rounded corners) compared to all other buttons in the application (green with square corners).

#### **Steps to Reproduce**
1. Compare "Add to Cart" buttons on product pages (green, square)
2. Compare "Proceed to Checkout" button on cart page (blue, rounded)
3. Compare other action buttons throughout the site

#### **Expected Behavior**
- Consistent button styling across the entire application
- Primary action buttons should have unified appearance

#### **Actual Behavior**
- Cart checkout button looks like it belongs to a different application
- Visual inconsistency breaks design coherence

---

### **Anomaly #4: Cart Quantity Dropdown Shows "0" Despite Correct Calculation**

#### **Description**
In the shopping cart, the quantity dropdown displays "0" but the subtotal calculation shows the correct amount for the actual quantity, creating confusing visual inconsistency.

#### **Steps to Reproduce**
1. Add any product with quantity 2 to cart
2. Go to cart page
3. Observe quantity dropdown shows "0"
4. Observe subtotal shows correct calculation for 2 items

#### **Expected Behavior**
- Quantity dropdown should show the actual quantity (e.g., "2")
- Visual consistency between quantity display and calculations

#### **Actual Behavior**
- Dropdown shows "0" but calculations are for actual quantity
- Confusing user experience

---

### **Anomaly #5: Products Display in Seemingly Random Order**

#### **Description**
On the homepage, products appear in an order that doesn't follow any logical pattern (not by price, name, or popularity), making it difficult for users to find what they're looking for.

#### **Steps to Reproduce**
1. Visit homepage
2. Observe product order: $149.99, $199.99, $79.99

#### **Expected Behavior**
- Products should be sorted logically (by price, popularity, or alphabetically)
- Consistent sorting that helps users browse

#### **Actual Behavior**
- Products appear in seemingly random order
- Most expensive item appears first, cheapest last

---

### **Anomaly #6: Confusing Sort Button Behavior**

#### **Description**
The "Sort by Price" button shows an up arrow (↑) but actually sorts in alphabetical string order rather than numeric order, leading to incorrect sorting results that don't match the visual indicator.

#### **Steps to Reproduce**
1. Observe initial sort button shows "Sort by Price ↑"
2. Check if products are actually sorted by ascending price
3. Click button and observe results

#### **Expected Behavior**
- Up arrow (↑) should mean ascending price order: $79.99 → $199.99
- Down arrow (↓) should mean descending price order: $199.99 → $79.99

#### **Actual Behavior**
- Arrow indicators don't match actual sort behavior
- Sorting follows string comparison instead of numeric comparison

---

### **Anomaly #7: Missing Visual Feedback for Form Errors**

#### **Description**
While error messages appear below form fields, there's no visual indicator (red border, icon) on the actual input fields to help users quickly identify which fields have errors.

#### **Steps to Reproduce**
1. Go to any form (address, payment, profile)
2. Submit with invalid data
3. Observe error styling

#### **Expected Behavior**
- Invalid fields should have red borders or error styling
- Clear visual indication of which specific fields have errors

#### **Actual Behavior**
- Only text error messages below fields
- No visual styling on the input fields themselves

---

### **Anomaly #8: Order History Shows Individual Item Price Instead of Line Total**

#### **Description**
In the profile order history, each line item shows the unit price ($149.99) rather than the line total (unit price × quantity), which is confusing when viewing past orders with multiple quantities.

#### **Steps to Reproduce**
1. Complete order with quantity 2 of any item
2. View order history in profile
3. Observe item pricing display

#### **Expected Behavior**
- Should show line total: "2 × $149.99 = $299.98"
- Or clearly separate unit price from line total

#### **Actual Behavior**
- Shows quantity "2" and price "$149.99" separately
- Unclear whether price is per unit or total

---


