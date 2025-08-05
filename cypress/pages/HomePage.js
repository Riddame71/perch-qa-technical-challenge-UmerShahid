class HomePage {
    elements = {
        mainContent: () => cy.get('[data-testid="home-page"]'),
        pageTitle: () => cy.get('h1').contains('Product Catalog'),
        profileButton: () => cy.get('[data-testid="nav-to-profile"]'),
        cartButton: () => cy.get('[data-testid="nav-to-cart"]'),
        searchBar: () => cy.get('[data-testid="product-search"]'),
        sortButton: () => cy.get('[data-testid="sort-price"]'),
        productsGrid: () => cy.get('.products-grid'),
        productCards: () => cy.get('.product-card'),
        productImages: () => cy.get('.product-image'),
        productNames: () => cy.get('.product-name'),
        productPrices: () => cy.get('.product-price'),
        productDescriptions: () => cy.get('.product-description'),
        viewDetailsButtons: () => cy.get('.view-details-button'),
        firstViewDetailsButton: () => cy.get('.view-details-button').first(),
        noResultsMessage: () => cy.contains('No products found matching your search.'),
        backToProductsButton: () => cy.contains('Back to Products')
    }

    visit() {
        cy.log('🏠 Navigating to homepage');
        console.log('HomePage: Visiting http://localhost:3000/');
        cy.visit('http://localhost:3000/');
        cy.log('✅ Successfully navigated to homepage');
    }

    verifyMainContent() {
        cy.log('🔍 Verifying main content is visible');
        console.log('HomePage: Verifying main content visibility');
        this.elements.mainContent().should('be.visible');
        cy.log('✅ Main content is visible');
    }

    verifyPageTitle(expectedTitle) {
        cy.log(`🔍 Verifying page title contains: "${expectedTitle}"`);
        console.log(`HomePage: Verifying page title - Expected: ${expectedTitle}`);
        this.elements.pageTitle().should('be.visible').and('contain.text', expectedTitle);
        cy.log(`✅ Page title verification successful: "${expectedTitle}"`);
    }

    verifyProfileButton() {
        cy.log('🔍 Verifying Profile button is visible and contains correct text');
        console.log('HomePage: Verifying Profile button');
        this.elements.profileButton().should('be.visible').and('contain.text', 'Profile');
        cy.log('✅ Profile button verification successful');
    }

    verifyCartButton() {
        cy.log('🔍 Verifying Cart button is visible and contains correct text');
        console.log('HomePage: Verifying Cart button');
        this.elements.cartButton().should('be.visible').and('contain.text', 'Cart');
        cy.log('✅ Cart button verification successful');
    }

    verifySearchBar() {
        cy.log('🔍 Verifying search bar is visible with correct placeholder');
        console.log('HomePage: Verifying search bar');
        this.elements.searchBar().should('be.visible').and('have.attr', 'placeholder', 'Search products...');
        cy.log('✅ Search bar verification successful');
    }

    verifySortButton() {
        cy.log('🔍 Verifying Sort by Price button is visible and contains correct text');
        console.log('HomePage: Verifying Sort button');
        this.elements.sortButton().should('be.visible').and('contain.text', 'Sort by Price');
        cy.log('✅ Sort button verification successful');
    }

    verifyProductsGrid() {
        cy.log('🔍 Verifying products grid is visible and contains products');
        console.log('HomePage: Verifying products grid');
        this.elements.productsGrid().should('be.visible');
        this.elements.productCards().should('have.length.greaterThan', 0);
        
        // Log the number of products found
        this.elements.productCards().then(($cards) => {
            cy.log(`✅ Products grid verification successful - Found ${$cards.length} products`);
            console.log(`HomePage: Found ${$cards.length} product cards`);
        });
    }

    verifyProductElements(expectedElements) {
        cy.log(`🔍 Verifying each product displays required elements: ${expectedElements.join(', ')}`);
        console.log(`HomePage: Verifying product elements - Expected: ${expectedElements.join(', ')}`);
        
        // Verify that each product displays all required elements
        this.elements.productCards().each(($card, index) => {
            cy.log(`🔍 Checking product card ${index + 1}`);
            cy.wrap($card).within(() => {
                if (expectedElements.includes('Image')) {
                    cy.log('🖼️ Verifying product image');
                    cy.get('.product-image').should('be.visible');
                }
                if (expectedElements.includes('Title')) {
                    cy.log('📝 Verifying product title');
                    cy.get('.product-name').should('be.visible').and('not.be.empty');
                }
                if (expectedElements.includes('Price')) {
                    cy.log('💰 Verifying product price');
                    cy.get('.product-price').should('be.visible').and('contain.text', '$');
                }
                if (expectedElements.includes('Description')) {
                    cy.log('📄 Verifying product description');
                    cy.get('.product-description').should('be.visible').and('not.be.empty');
                }
                if (expectedElements.includes('View Details')) {
                    cy.log('🔗 Verifying View Details button');
                    cy.get('.view-details-button').should('be.visible').and('contain.text', 'View Details');
                }
            });
            cy.log(`✅ Product card ${index + 1} verification complete`);
        });
        cy.log('✅ All product elements verification successful');
    }

    clickViewDetailsForFirstProduct() {
        cy.log('👆 Clicking View Details button for first product');
        console.log('HomePage: Clicking first View Details button');
        this.elements.firstViewDetailsButton().click();
        cy.log('✅ View Details button clicked successfully');
    }

    // Method for cart testing - click product by name
    clickProductByName(productName) {
        cy.log(`👆 Clicking product: "${productName}"`);
        console.log(`HomePage: Clicking product - ${productName}`);
        cy.contains('.product-card', productName).within(() => {
            cy.get('.view-details-button').click();
        });
        cy.log(`✅ Product "${productName}" clicked successfully`);
    }

    verifyNavigationToProductPage() {
        cy.log('🔍 Verifying navigation to product detail page');
        console.log('HomePage: Verifying navigation to product page');
        cy.url().should('include', '/product/');
        // Wait for navigation to complete
        cy.get('body').should('be.visible');
        cy.url().then((url) => {
            cy.log(`✅ Successfully navigated to product page: ${url}`);
            console.log(`HomePage: Navigated to URL: ${url}`);
        });
    }

    // Search functionality methods
    searchForProduct(searchTerm) {
        cy.log(`🔍 Searching for product: "${searchTerm}"`);
        console.log(`HomePage: Searching for product - Term: ${searchTerm}`);
        this.elements.searchBar().clear().type(searchTerm);
        cy.log(`📝 Typed "${searchTerm}" in search bar`);
        // Wait for search to process
        cy.wait(500);
        cy.log('⏳ Waiting for search results to load');
    }

    verifySearchResults(searchTerm) {
        cy.log(`🔍 Verifying search results contain: "${searchTerm}"`);
        console.log(`HomePage: Verifying search results for term: ${searchTerm}`);
        
        // Parameter validation with logging
        if (!searchTerm) {
            cy.log('❌ ERROR: searchTerm is undefined or empty');
            console.error('HomePage: searchTerm parameter is undefined or empty');
            throw new Error('searchTerm parameter is required but was undefined or empty');
        }
        
        // Check if there are any products displayed
        this.elements.productCards().then(($cards) => {
            cy.log(`📊 Found ${$cards.length} product cards in search results`);
            console.log(`HomePage: Search results count: ${$cards.length}`);
            
            if ($cards.length > 0) {
                cy.log('✅ Products found - Verifying they contain search term');
                console.log('HomePage: Products exist, checking if they match search term');
                // If products are found, verify they contain the search term
                this.elements.productNames().each(($name, index) => {
                    cy.wrap($name).invoke('text').then((text) => {
                        cy.log(`🔍 Product ${index + 1} name: "${text}"`);
                        console.log(`HomePage: Product ${index + 1} name: ${text}`);
                        
                        // Additional validation logging
                        if (!text) {
                            cy.log(`⚠️ WARNING: Product ${index + 1} has empty or undefined name`);
                            console.warn(`HomePage: Product ${index + 1} has empty name`);
                        }
                        
                        expect(text.toLowerCase()).to.include(searchTerm.toLowerCase());
                        cy.log(`✅ Product ${index + 1} name contains search term "${searchTerm}"`);
                    });
                });
            } else {
                cy.log(`ℹ️ No products found in search results for term "${searchTerm}"`);
                console.log(`HomePage: No products found in search results for term: ${searchTerm}`);
                cy.log('✅ Search results verification complete - No products to check (expected for no-results scenario)');
            }
        });
    }

    verifyNoResultsMessage(message) {
        cy.log(`🔍 Verifying no results message: "${message}"`);
        console.log(`HomePage: Verifying no results message - Expected: ${message}`);
        this.elements.noResultsMessage().should('be.visible').and('contain.text', message);
        cy.log(`✅ No results message verification successful: "${message}"`);
    }

    verifyProductsMatchSearch(searchTerm) {
        cy.log(`🔍 Verifying products match search term: "${searchTerm}"`);
        console.log(`HomePage: Verifying products match search term: ${searchTerm}`);
        
        // Parameter validation with logging
        if (!searchTerm) {
            cy.log('❌ ERROR: searchTerm is undefined or empty in verifyProductsMatchSearch');
            console.error('HomePage: searchTerm parameter is undefined or empty in verifyProductsMatchSearch');
            throw new Error('searchTerm parameter is required but was undefined or empty');
        }
        
        cy.log('🔍 Checking that products exist before verifying search match');
        console.log('HomePage: Ensuring products are displayed before checking search match');
        this.elements.productCards().should('have.length.greaterThan', 0);
        cy.log('✅ Confirmed products are displayed');
        
        this.verifySearchResults(searchTerm);
        cy.log(`✅ All products match search term: "${searchTerm}"`);
    }

    verifyNoProductCards() {
        cy.log('🔍 Verifying no product cards are displayed');
        console.log('HomePage: Verifying no product cards exist');
        this.elements.productCards().should('not.exist');
        cy.log('✅ Confirmed no product cards are displayed');
    }

    verifyNoSearchResults(searchTerm) {
        cy.log(`🔍 Verifying no search results for term: "${searchTerm}"`);
        console.log(`HomePage: Verifying no search results for term: ${searchTerm}`);
        
        // Parameter validation with logging
        if (!searchTerm) {
            cy.log('❌ ERROR: searchTerm is undefined or empty in verifyNoSearchResults');
            console.error('HomePage: searchTerm parameter is undefined or empty in verifyNoSearchResults');
            throw new Error('searchTerm parameter is required but was undefined or empty');
        }
        
        // Verify no products are displayed
        this.elements.productCards().should('not.exist');
        cy.log(`✅ Confirmed no products are displayed for search term: "${searchTerm}"`);
        console.log(`HomePage: Confirmed no products found for search term: ${searchTerm}`);
    }

    // Price sorting functionality methods
    clickSortByPriceButton() {
        cy.log('👆 Clicking Sort by Price button');
        console.log('HomePage: Clicking Sort by Price button');
        this.elements.sortButton().click();
        cy.log('✅ Sort by Price button clicked successfully');
        // Wait for sorting to complete
        cy.wait(500);
        cy.log('⏳ Waiting for sorting to complete');
    }

    verifyPriceSortingAscending() {
        cy.log('🔍 Verifying products are sorted by price in ascending order (low to high)');
        console.log('HomePage: Verifying ascending price sorting');
        
        // Get all product prices and verify they are in ascending order
        this.elements.productPrices().then(($prices) => {
            const prices = [];
            
            // Extract prices from all products
            cy.wrap($prices).each(($price, index) => {
                cy.wrap($price).invoke('text').then((priceText) => {
                    // Remove $ sign and convert to number
                    const numericPrice = parseFloat(priceText.replace('$', ''));
                    prices.push(numericPrice);
                    cy.log(`💰 Product ${index + 1} price: $${numericPrice}`);
                    console.log(`HomePage: Product ${index + 1} price: $${numericPrice}`);
                });
            }).then(() => {
                // Verify ascending order
                cy.log(`🔍 Checking price order: ${prices.join(', ')}`);
                console.log(`HomePage: Price order: ${prices.join(', ')}`);
                
                for (let i = 0; i < prices.length - 1; i++) {
                    const currentPrice = prices[i];
                    const nextPrice = prices[i + 1];
                    
                    cy.log(`🔍 Comparing: $${currentPrice} <= $${nextPrice}`);
                    console.log(`HomePage: Comparing: $${currentPrice} <= $${nextPrice}`);
                    
                    expect(currentPrice).to.be.at.most(nextPrice);
                    cy.log(`✅ Price comparison ${i + 1} passed: $${currentPrice} <= $${nextPrice}`);
                }
                
                cy.log('✅ All products are sorted in ascending order (low to high)');
                console.log('HomePage: Ascending price sorting verification complete');
            });
        });
    }

    verifyPriceSortingDescending() {
        cy.log('🔍 Verifying products are sorted by price in descending order (high to low)');
        console.log('HomePage: Verifying descending price sorting');
        
        // Get all product prices and verify they are in descending order
        this.elements.productPrices().then(($prices) => {
            const prices = [];
            
            // Extract prices from all products
            cy.wrap($prices).each(($price, index) => {
                cy.wrap($price).invoke('text').then((priceText) => {
                    // Remove $ sign and convert to number
                    const numericPrice = parseFloat(priceText.replace('$', ''));
                    prices.push(numericPrice);
                    cy.log(`💰 Product ${index + 1} price: $${numericPrice}`);
                    console.log(`HomePage: Product ${index + 1} price: $${numericPrice}`);
                });
            }).then(() => {
                // Verify descending order
                cy.log(`🔍 Checking price order: ${prices.join(', ')}`);
                console.log(`HomePage: Price order: ${prices.join(', ')}`);
                
                for (let i = 0; i < prices.length - 1; i++) {
                    const currentPrice = prices[i];
                    const nextPrice = prices[i + 1];
                    
                    cy.log(`🔍 Comparing: $${currentPrice} >= $${nextPrice}`);
                    console.log(`HomePage: Comparing: $${currentPrice} >= $${nextPrice}`);
                    
                    expect(currentPrice).to.be.at.least(nextPrice);
                    cy.log(`✅ Price comparison ${i + 1} passed: $${currentPrice} >= $${nextPrice}`);
                }
                
                cy.log('✅ All products are sorted in descending order (high to low)');
                console.log('HomePage: Descending price sorting verification complete');
            });
        });
    }

    verifySortButtonWithAscendingIndicator() {
        cy.log('🔍 Verifying sort button shows ascending indicator (↑)');
        console.log('HomePage: Verifying sort button ascending indicator');
        this.elements.sortButton().should('be.visible').and('contain.text', '↑');
        cy.log('✅ Sort button with ascending indicator (↑) verified successfully');
    }

    verifySortButtonWithDescendingIndicator() {
        cy.log('🔍 Verifying sort button shows descending indicator (↓)');
        console.log('HomePage: Verifying sort button descending indicator');
        this.elements.sortButton().should('be.visible').and('contain.text', '↓');
        cy.log('✅ Sort button with descending indicator (↓) verified successfully');
    }

    // New navigation functionality methods with comprehensive logging
    clickProfileButton() {
        cy.log('👆 Clicking Profile button for navigation');
        console.log('HomePage: Clicking Profile button to navigate to profile page');
        this.elements.profileButton().click();
        cy.log('✅ Profile button clicked successfully');
        // Wait for navigation to complete
        cy.wait(500);
        cy.log('⏳ Waiting for navigation to profile page');
    }

    clickCartButton() {
        cy.log('👆 Clicking Cart button for navigation');
        console.log('HomePage: Clicking Cart button to navigate to cart page');
        this.elements.cartButton().click();
        cy.log('✅ Cart button clicked successfully');
        // Wait for navigation to complete
        cy.wait(500);
        cy.log('⏳ Waiting for navigation to cart page');
    }

    verifyNavigationToProfilePage() {
        cy.log('🔍 Verifying navigation to profile page');
        console.log('HomePage: Verifying navigation to profile page');
        cy.url().should('include', '/profile');
        cy.get('body').should('be.visible');
        cy.url().then((url) => {
            cy.log(`✅ Successfully navigated to profile page: ${url}`);
            console.log(`HomePage: Navigated to profile URL: ${url}`);
        });
    }

    verifyNavigationToCartPage() {
        cy.log('🔍 Verifying navigation to cart page');
        console.log('HomePage: Verifying navigation to cart page');
        cy.url().should('include', '/cart');
        cy.get('body').should('be.visible');
        cy.url().then((url) => {
            cy.log(`✅ Successfully navigated to cart page: ${url}`);
            console.log(`HomePage: Navigated to cart URL: ${url}`);
        });
    }

    verifyProfilePageURL() {
        cy.log('🔍 Verifying profile page URL structure');
        console.log('HomePage: Verifying profile page URL');
        cy.url().should('include', '/profile');
        cy.url().then((url) => {
            cy.log(`✅ Profile page URL verified: ${url}`);
            console.log(`HomePage: Profile page URL confirmed: ${url}`);
        });
    }

    verifyCartPageURL() {
        cy.log('🔍 Verifying cart page URL structure');
        console.log('HomePage: Verifying cart page URL');
        cy.url().should('include', '/cart');
        cy.url().then((url) => {
            cy.log(`✅ Cart page URL verified: ${url}`);
            console.log(`HomePage: Cart page URL confirmed: ${url}`);
        });
    }

    clickViewDetailsForAllProducts() {
        cy.log('🔍 Starting to click View Details for all products');
        console.log('HomePage: Starting View Details navigation for all products');
        
        // Get all view details buttons and click each one
        this.elements.viewDetailsButtons().then(($buttons) => {
            const totalProducts = $buttons.length;
            cy.log(`📊 Found ${totalProducts} products to navigate through`);
            console.log(`HomePage: Found ${totalProducts} products for detail navigation`);
            
            // Store product information for logging
            const productInfo = [];
            
            // First, collect all product information
            this.elements.productCards().each(($card, index) => {
                cy.wrap($card).within(() => {
                    cy.get('.product-name').invoke('text').then((name) => {
                        productInfo.push({ index: index + 1, name: name.trim() });
                        cy.log(`📝 Product ${index + 1}: "${name.trim()}"`);
                        console.log(`HomePage: Product ${index + 1} name: ${name.trim()}`);
                    });
                });
            }).then(() => {
                // Then navigate through each product
                for (let i = 0; i < totalProducts; i++) {
                    const productNum = i + 1;
                    const productName = productInfo[i]?.name || `Product ${productNum}`;
                    
                    cy.log(`👆 Clicking View Details for Product ${productNum}: "${productName}"`);
                    console.log(`HomePage: Clicking View Details for Product ${productNum}: ${productName}`);
                    
                    // Click the view details button for current product
                    this.elements.viewDetailsButtons().eq(i).click();
                    
                    // Verify navigation to product detail page
                    cy.url().should('include', '/product/');
                    cy.url().then((url) => {
                        cy.log(`✅ Successfully navigated to product detail page: ${url}`);
                        console.log(`HomePage: Product ${productNum} detail URL: ${url}`);
                    });
                    
                    // Wait for page to load
                    cy.get('body').should('be.visible');
                    cy.wait(500);
                    
                    // Click Back to Products button
                    cy.log(`👆 Clicking "Back to Products" for Product ${productNum}`);
                    console.log(`HomePage: Clicking Back to Products for Product ${productNum}`);
                    this.elements.backToProductsButton().click();
                    
                    // Verify navigation back to homepage
                    cy.url().should('not.include', '/product/');
                    cy.url().then((url) => {
                        cy.log(`✅ Successfully navigated back to homepage: ${url}`);
                        console.log(`HomePage: Back to homepage URL: ${url}`);
                    });
                    
                    // Wait for homepage to load
                    cy.get('body').should('be.visible');
                    this.elements.productsGrid().should('be.visible');
                    cy.wait(500);
                    
                    cy.log(`✅ Product ${productNum} navigation cycle completed`);
                    console.log(`HomePage: Product ${productNum} navigation cycle completed`);
                }
                
                cy.log(`✅ All ${totalProducts} products navigation completed successfully`);
                console.log(`HomePage: All ${totalProducts} products navigation completed`);
            });
        });
    }

    verifyNavigationToEachProductDetailPage() {
        cy.log('🔍 Verifying navigation to each product detail page');
        console.log('HomePage: Verifying navigation to product detail pages');
        
        // This method will be called after clicking each product
        cy.url().should('include', '/product/');
        cy.get('body').should('be.visible');
        cy.url().then((url) => {
            cy.log(`✅ Product detail page verification successful: ${url}`);
            console.log(`HomePage: Product detail page verified: ${url}`);
        });
    }

    verifyEachProductDetailPageURL() {
        cy.log('🔍 Verifying each product detail page URL structure');
        console.log('HomePage: Verifying product detail page URL structure');
        
        cy.url().should('include', '/product/');
        cy.url().then((url) => {
            cy.log(`✅ Product detail page URL verified: ${url}`);
            console.log(`HomePage: Product detail page URL confirmed: ${url}`);
        });
    }

    clickBackToProductsFromEachDetailPage() {
        cy.log('👆 Clicking "Back to Products" from product detail page');
        console.log('HomePage: Clicking Back to Products button from detail page');
        
        this.elements.backToProductsButton().click();
        cy.log('✅ Back to Products button clicked successfully');
        // Wait for navigation back to homepage
        cy.wait(500);
        cy.log('⏳ Waiting for navigation back to homepage');
    }

    verifyNavigationBackToHomepage() {
        cy.log('🔍 Verifying navigation back to homepage');
        console.log('HomePage: Verifying navigation back to homepage');
        
        cy.url().should('not.include', '/product/');
        cy.url().should('not.include', '/profile');
        cy.url().should('not.include', '/cart');
        this.elements.productsGrid().should('be.visible');
        
        cy.url().then((url) => {
            cy.log(`✅ Successfully navigated back to homepage: ${url}`);
            console.log(`HomePage: Back to homepage URL verified: ${url}`);
        });
    }
}

export default new HomePage();