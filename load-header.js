// Load header into all pages
console.log('Loading header...');
fetch('header.html')
    .then(response => {
        console.log('Header response:', response.status);
        return response.text();
    })
    .then(data => {
        console.log('Header data loaded, length:', data.length);
        const placeholder = document.getElementById('header-placeholder');
        console.log('Header placeholder found:', !!placeholder);
        if (placeholder) {
            placeholder.innerHTML = data;
            console.log('Header inserted into placeholder');
            
            // Wait for elements to be in DOM, then initialize
            setTimeout(function() {
                console.log('Initializing header...');
                initializeHeader();
            }, 100);
        }
    })
    .catch(error => console.error('Error loading header:', error));

function initializeHeader() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const mainNav = document.getElementById('main-nav');
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchBtn = document.getElementById('close-search-btn');
    const accountBtn = document.getElementById('account-btn');
    const cartBtn = document.getElementById('cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const closeCartBtn = document.getElementById('close-cart-btn');
    
    let isScrolled = false;
    
    // Function to change header to white/black
    function changeToWhite() {
        mainNav.classList.add('bg-white', 'shadow-md');
        mainNav.classList.remove('bg-transparent');
        
        // Change ALL buttons and their SVGs to black
        const allButtons = mainNav.querySelectorAll('button');
        allButtons.forEach(function(btn) {
            btn.classList.remove('text-white');
            btn.classList.add('text-gray-900');
        });
        
        // Change hamburger lines to black
        const hamburgerLines = document.querySelectorAll('.hamburger-line');
        hamburgerLines.forEach(function(line) {
            line.classList.remove('text-white');
            line.classList.add('text-gray-900');
        });
        
        // Change search icon elements to black
        const searchElements = document.querySelectorAll('.search-circle, .search-handle');
        searchElements.forEach(function(element) {
            element.classList.remove('border-white', 'bg-white');
            element.classList.add('border-gray-900', 'bg-gray-900');
        });
        
        // Change account icon elements to black
        const accountElements = document.querySelectorAll('.account-head, .account-body');
        accountElements.forEach(function(element) {
            element.classList.remove('border-white');
            element.classList.add('border-gray-900');
        });
        
        // Change cart icon elements to black
        const cartElements = document.querySelectorAll('.cart-body, .cart-handle-left, .cart-handle-right');
        cartElements.forEach(function(element) {
            element.classList.remove('border-white');
            element.classList.add('border-gray-900');
        });
        
        // Change logo to black
        const logo = mainNav.querySelector('a[href="index.html"]');
        if (logo) {
            logo.classList.remove('text-white');
            logo.classList.add('text-gray-900');
        }
        
        // Change menu links to black
        const desktopLinks = mainNav.querySelectorAll('.hidden.md\\:flex a');
        desktopLinks.forEach(function(link) {
            link.classList.remove('text-white');
            link.classList.add('text-gray-900');
        });
    }
    
    // Function to change header to transparent/white
    function changeToTransparent() {
        mainNav.classList.remove('bg-white', 'shadow-md');
        mainNav.classList.add('bg-transparent');
        
        // Change ALL buttons and their SVGs to white
        const allButtons = mainNav.querySelectorAll('button');
        allButtons.forEach(function(btn) {
            btn.classList.remove('text-gray-900');
            btn.classList.add('text-white');
        });
        
        // Change hamburger lines to white
        const hamburgerLines = document.querySelectorAll('.hamburger-line');
        hamburgerLines.forEach(function(line) {
            line.classList.remove('text-gray-900');
            line.classList.add('text-white');
        });
        
        // Change search icon elements to white
        const searchElements = document.querySelectorAll('.search-circle, .search-handle');
        searchElements.forEach(function(element) {
            element.classList.remove('border-gray-900', 'bg-gray-900');
            element.classList.add('border-white', 'bg-white');
        });
        
        // Change account icon elements to white
        const accountElements = document.querySelectorAll('.account-head, .account-body');
        accountElements.forEach(function(element) {
            element.classList.remove('border-gray-900');
            element.classList.add('border-white');
        });
        
        // Change cart icon elements to white
        const cartElements = document.querySelectorAll('.cart-body, .cart-handle-left, .cart-handle-right');
        cartElements.forEach(function(element) {
            element.classList.remove('border-gray-900');
            element.classList.add('border-white');
        });
        
        // Change logo to white
        const logo = mainNav.querySelector('a[href="index.html"]');
        if (logo) {
            logo.classList.remove('text-gray-900');
            logo.classList.add('text-white');
        }
        
        // Change menu links to white
        const desktopLinks = mainNav.querySelectorAll('.hidden.md\\:flex a');
        desktopLinks.forEach(function(link) {
            link.classList.remove('text-gray-900');
            link.classList.add('text-white');
        });
    }
    
    // Header is now transparent with white icons by default - perfect for video background
    
    // Enhanced hamburger menu functionality
    if (hamburgerBtn && mobileMenu) {
        const hamburgerIcon = document.getElementById('hamburger-icon');
        const closeIcon = document.getElementById('close-icon');
        let isMenuOpen = false;
        
        hamburgerBtn.addEventListener('click', function() {
            if (!isMenuOpen) {
                // Open menu with luxury animations
                mobileMenu.classList.remove('hidden');
                
                // Toggle icons
                if (hamburgerIcon && closeIcon) {
                    hamburgerIcon.style.opacity = '0';
                    closeIcon.style.opacity = '1';
                }
                
                // Fade in menu overlay
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0');
                    mobileMenu.classList.add('opacity-100');
                }, 10);
                
                // Stagger animate menu items
                const menuItems = mobileMenu.querySelectorAll('.menu-item');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.style.transition = 'all 0.6s ease-out';
                    }, 200 + (index * 100));
                });
                
                // Animate social links
                const socialLinks = mobileMenu.querySelectorAll('.social-link');
                socialLinks.forEach((link, index) => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                        link.style.transition = 'all 0.4s ease-out';
                    }, 600 + (index * 50));
                });
                
                document.body.style.overflow = 'hidden';
                isMenuOpen = true;
            } else {
                closeMenu();
            }
        });
        
        // Function to close menu with animations
        function closeMenu() {
            if (isMenuOpen) {
                // Toggle icons back
                if (hamburgerIcon && closeIcon) {
                    hamburgerIcon.style.opacity = '1';
                    closeIcon.style.opacity = '0';
                }
                
                // Fade out menu
                mobileMenu.classList.remove('opacity-100');
                mobileMenu.classList.add('opacity-0');
                
                // Reset menu items
                const menuItems = mobileMenu.querySelectorAll('.menu-item');
                menuItems.forEach((item) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    item.style.transition = 'all 0.3s ease-in';
                });
                
                // Hide menu after animation
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    // Reset styles for next open
                    menuItems.forEach((item) => {
                        item.style.opacity = '';
                        item.style.transform = '';
                        item.style.transition = '';
                    });
                    const socialLinks = mobileMenu.querySelectorAll('.social-link');
                    socialLinks.forEach((link) => {
                        link.style.opacity = '';
                        link.style.transform = '';
                        link.style.transition = '';
                    });
                }, 300);
                
                document.body.style.overflow = 'auto';
                isMenuOpen = false;
            }
        }
        
        // Close menu button
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', closeMenu);
        }
        
        // Close menu when clicking on menu links with smooth animation
        const menuItems = mobileMenu.querySelectorAll('.menu-item');
        menuItems.forEach(function(link) {
            link.addEventListener('click', function() {
                // Add click effect
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                    closeMenu();
                }, 150);
            });
        });
        
        // Close menu when clicking outside with fade effect
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMenu();
            }
        });
        
        // Enhanced escape key functionality
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
    }
    
    // Enhanced search functionality with luxury animations
    if (searchBtn && searchOverlay) {
        let isSearchOpen = false;
        
        searchBtn.addEventListener('click', function() {
            if (!isSearchOpen) {
                // Open search with luxury animations
                searchOverlay.classList.remove('hidden');
                
                // Fade in overlay
                setTimeout(() => {
                    searchOverlay.classList.remove('opacity-0');
                    searchOverlay.classList.add('opacity-100');
                }, 10);
                
                // Animate search sections with stagger
                const brandSection = searchOverlay.querySelector('.search-brand-section');
                const inputSection = searchOverlay.querySelector('.search-input-section');
                const categoriesSection = searchOverlay.querySelector('.search-categories-section');
                
                // Brand section animation
                setTimeout(() => {
                    if (brandSection) {
                        brandSection.style.opacity = '1';
                        brandSection.style.transform = 'translateY(0)';
                        brandSection.style.transition = 'all 0.6s ease-out';
                    }
                }, 200);
                
                // Input section animation
                setTimeout(() => {
                    if (inputSection) {
                        inputSection.style.opacity = '1';
                        inputSection.style.transform = 'translateY(0)';
                        inputSection.style.transition = 'all 0.6s ease-out';
                    }
                }, 400);
                
                // Categories section animation
                setTimeout(() => {
                    if (categoriesSection) {
                        categoriesSection.style.opacity = '1';
                        categoriesSection.style.transform = 'translateY(0)';
                        categoriesSection.style.transition = 'all 0.6s ease-out';
                    }
                }, 600);
                
                // Animate category buttons individually
                const categoryBtns = searchOverlay.querySelectorAll('.search-category-btn');
                categoryBtns.forEach((btn, index) => {
                    btn.style.opacity = '0';
                    btn.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        btn.style.opacity = '1';
                        btn.style.transform = 'translateY(0)';
                        btn.style.transition = 'all 0.4s ease-out';
                    }, 800 + (index * 50));
                });
                
                // Animate trending searches
                const trendingSearches = searchOverlay.querySelectorAll('.trending-search');
                trendingSearches.forEach((search, index) => {
                    search.style.opacity = '0';
                    search.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        search.style.opacity = '1';
                        search.style.transform = 'scale(1)';
                        search.style.transition = 'all 0.3s ease-out';
                    }, 1100 + (index * 100));
                });
                
                document.body.style.overflow = 'hidden';
                isSearchOpen = true;
                
                // Focus on search input after animation
                setTimeout(() => {
                    const searchInput = document.getElementById('search-input');
                    if (searchInput) searchInput.focus();
                }, 800);
            }
        });
        
        // Function to close search with animations
        function closeSearch() {
            if (isSearchOpen) {
                // Fade out overlay
                searchOverlay.classList.remove('opacity-100');
                searchOverlay.classList.add('opacity-0');
                
                // Reset all sections
                const sections = searchOverlay.querySelectorAll('.search-brand-section, .search-input-section, .search-categories-section');
                sections.forEach((section) => {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(-20px)';
                    section.style.transition = 'all 0.3s ease-in';
                });
                
                // Reset category buttons and trending searches
                const animatedElements = searchOverlay.querySelectorAll('.search-category-btn, .trending-search');
                animatedElements.forEach((element) => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(-10px) scale(0.9)';
                    element.style.transition = 'all 0.2s ease-in';
                });
                
                // Hide overlay after animation
                setTimeout(() => {
                    searchOverlay.classList.add('hidden');
                    
                    // Reset all styles for next open
                    sections.forEach((section) => {
                        section.style.opacity = '';
                        section.style.transform = '';
                        section.style.transition = '';
                    });
                    
                    animatedElements.forEach((element) => {
                        element.style.opacity = '';
                        element.style.transform = '';
                        element.style.transition = '';
                    });
                }, 300);
                
                document.body.style.overflow = 'auto';
                isSearchOpen = false;
            }
        }
        
        // Close search button
        if (closeSearchBtn) {
            closeSearchBtn.addEventListener('click', closeSearch);
        }
        
        // Add functionality to category buttons
        const categoryButtons = searchOverlay.querySelectorAll('.search-category-btn');
        categoryButtons.forEach((btn) => {
            btn.addEventListener('click', function() {
                // Add click effect
                btn.style.transform = 'scale(0.95) translateY(-2px)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1.05) translateY(-2px)';
                    // Here you could navigate to the category page
                    // For now, just close the search
                    setTimeout(closeSearch, 200);
                }, 150);
            });
        });
        
        // Add functionality to trending searches
        const trendingSearches = searchOverlay.querySelectorAll('.trending-search');
        trendingSearches.forEach((search) => {
            search.addEventListener('click', function() {
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.value = search.textContent;
                    searchInput.focus();
                }
            });
        });
        
        // Enhanced search input functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    // Add search functionality here
                    const query = searchInput.value.trim();
                    if (query) {
                        // For now, just show an alert - replace with actual search
                        console.log('Searching for:', query);
                        closeSearch();
                    }
                }
            });
        }
        
        // Close search when clicking outside
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });
    }
    
    // Account button functionality
    if (accountBtn) {
        accountBtn.addEventListener('click', function() {
            // Add click animation
            accountBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                accountBtn.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    accountBtn.style.transform = 'scale(1)';
                    // Navigate to account page
                    window.location.href = 'account.html';
                }, 150);
            }, 100);
        });
    }
    
    // Enhanced shopping cart functionality
    if (cartBtn && cartOverlay && cartBackdrop) {
        let isCartOpen = false;
        
        // Open cart
        cartBtn.addEventListener('click', function() {
            if (!isCartOpen) {
                // Add click animation to cart button
                cartBtn.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    cartBtn.style.transform = 'scale(1)';
                }, 150);
                
                // Show cart overlay
                cartBackdrop.classList.remove('hidden');
                setTimeout(() => {
                    cartBackdrop.classList.remove('opacity-0');
                    cartBackdrop.classList.add('opacity-100');
                }, 10);
                
                cartOverlay.style.transform = 'translateX(0)';
                document.body.style.overflow = 'hidden';
                isCartOpen = true;
                
                // Initialize cart if not already done
                initializeCart();
            }
        });
        
        // Close cart function
        function closeCart() {
            if (isCartOpen) {
                cartBackdrop.classList.remove('opacity-100');
                cartBackdrop.classList.add('opacity-0');
                cartOverlay.style.transform = 'translateX(100%)';
                
                setTimeout(() => {
                    cartBackdrop.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }, 300);
                
                isCartOpen = false;
            }
        }
        
        // Close cart button
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', closeCart);
        }
        
        // Close cart when clicking backdrop
        cartBackdrop.addEventListener('click', closeCart);
        
        // Make closeCart globally accessible for inline onclick
        window.closeCart = closeCart;
    }
    
    // Close search when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay && !searchOverlay.classList.contains('hidden')) {
            const closeSearch = searchOverlay.querySelector('#close-search-btn');
            if (closeSearch) {
                closeSearch.click();
            }
        }
        
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            const closeMenu = mobileMenu.querySelector('#close-menu-btn');
            if (closeMenu) {
                closeMenu.click();
            }
        }
        
        if (e.key === 'Escape' && cartOverlay && cartOverlay.style.transform === 'translateX(0px)') {
            if (window.closeCart) {
                window.closeCart();
            }
        }
    });
}

// Shopping Cart Management System
let cartItems = [];
let cartTotal = 0;

function initializeCart() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('luxuryCart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay();
    }
    
    // Initialize promo code functionality
    const applyPromoBtn = document.getElementById('apply-promo');
    const promoInput = document.getElementById('promo-code');
    
    if (applyPromoBtn && promoInput) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
        promoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyPromoCode();
            }
        });
    }
    
    // Initialize checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
}

function addToCart(item) {
    const existingItemIndex = cartItems.findIndex(cartItem => 
        cartItem.id === item.id && cartItem.size === item.size
    );
    
    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += item.quantity || 1;
    } else {
        cartItems.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            size: item.size,
            color: item.color,
            quantity: item.quantity || 1
        });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    showCartNotification(`${item.name} added to your bag`);
    
    // Animate cart badge
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartBadge.style.transform = 'scale(1)';
        }, 200);
    }
}

function removeFromCart(itemId, size) {
    cartItems = cartItems.filter(item => !(item.id === itemId && item.size === size));
    updateCartDisplay();
    saveCartToStorage();
}

function updateCartQuantity(itemId, size, newQuantity) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId && item.size === size);
    if (itemIndex > -1) {
        if (newQuantity > 0) {
            cartItems[itemIndex].quantity = newQuantity;
        } else {
            removeFromCart(itemId, size);
        }
        updateCartDisplay();
        saveCartToStorage();
    }
}

function updateCartDisplay() {
    const cartItemsCount = document.getElementById('cart-items-count');
    const cartCount = document.getElementById('cart-count');
    const emptyCart = document.getElementById('empty-cart');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartFooter = document.getElementById('cart-footer');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update counts
    if (cartItemsCount) cartItemsCount.textContent = totalItems;
    if (cartCount) {
        cartCount.textContent = totalItems;
        if (totalItems > 0) {
            cartCount.style.opacity = '1';
            cartCount.style.transform = 'scale(1)';
        } else {
            cartCount.style.opacity = '0';
            cartCount.style.transform = 'scale(0)';
        }
    }
    
    // Update totals
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${subtotal.toFixed(2)}`;
    
    if (totalItems === 0) {
        // Show empty state
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartItemsList) cartItemsList.classList.add('hidden');
        if (cartFooter) cartFooter.classList.add('hidden');
    } else {
        // Show cart items
        if (emptyCart) emptyCart.style.display = 'none';
        if (cartItemsList) {
            cartItemsList.classList.remove('hidden');
            renderCartItems();
        }
        if (cartFooter) cartFooter.classList.remove('hidden');
    }
}

function renderCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    if (!cartItemsList) return;
    
    cartItemsList.innerHTML = cartItems.map(item => `
        <div class="cart-item flex items-start space-x-4 p-4 border border-gray-100 hover:shadow-md transition-all duration-300">
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover">
            <div class="flex-1">
                <h4 class="font-light tracking-wide text-lg mb-1">${item.name}</h4>
                <p class="text-sm font-sans tracking-[0.05em] text-gray-500 mb-2">
                    ${item.color ? `${item.color} • ` : ''}${item.size ? `Size ${item.size}` : ''}
                </p>
                <p class="text-lg font-light tracking-wide mb-3">$${item.price.toFixed(2)}</p>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center border border-gray-200">
                        <button onclick="updateCartQuantity('${item.id}', '${item.size}', ${item.quantity - 1})" 
                                class="px-3 py-1 hover:bg-gray-100 transition-colors duration-200">−</button>
                        <span class="px-4 py-1 border-l border-r border-gray-200 font-sans text-sm">${item.quantity}</span>
                        <button onclick="updateCartQuantity('${item.id}', '${item.size}', ${item.quantity + 1})" 
                                class="px-3 py-1 hover:bg-gray-100 transition-colors duration-200">+</button>
                    </div>
                    
                    <button onclick="removeFromCart('${item.id}', '${item.size}')" 
                            class="text-gray-400 hover:text-red-500 transition-colors duration-200 text-sm font-sans tracking-[0.1em]">
                        REMOVE
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function applyPromoCode() {
    const promoInput = document.getElementById('promo-code');
    const promoDiscount = document.getElementById('promo-discount');
    const applyBtn = document.getElementById('apply-promo');
    
    if (!promoInput || !applyBtn) return;
    
    const code = promoInput.value.trim().toUpperCase();
    
    // Show loading state
    applyBtn.textContent = 'APPLYING...';
    applyBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const validCodes = {
            'WELCOME10': 10,
            'LUXURY15': 15,
            'VIP20': 20
        };
        
        if (validCodes[code]) {
            const discount = validCodes[code];
            const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const discountAmount = subtotal * (discount / 100);
            const newTotal = subtotal - discountAmount;
            
            // Show discount
            if (promoDiscount) {
                promoDiscount.style.display = 'flex';
                promoDiscount.querySelector('span:last-child').textContent = `-$${discountAmount.toFixed(2)}`;
            }
            
            // Update total
            const cartTotal = document.getElementById('cart-total');
            if (cartTotal) cartTotal.textContent = `$${newTotal.toFixed(2)}`;
            
            showCartNotification(`${discount}% discount applied!`);
            promoInput.style.borderColor = '#10b981';
            applyBtn.textContent = 'APPLIED';
            applyBtn.style.background = '#10b981';
        } else {
            showCartNotification('Invalid promo code', 'error');
            promoInput.style.borderColor = '#ef4444';
            applyBtn.textContent = 'APPLY';
            applyBtn.disabled = false;
        }
    }, 1000);
}

function proceedToCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cartItems.length === 0) {
        showCartNotification('Your cart is empty', 'error');
        return;
    }
    
    // Show loading state
    checkoutBtn.textContent = 'PROCESSING...';
    checkoutBtn.disabled = true;
    
    // Simulate checkout process
    setTimeout(() => {
        showCartNotification('Redirecting to secure checkout...');
        // In a real application, redirect to checkout page
        // window.location.href = 'checkout.html';
        
        checkoutBtn.textContent = 'SECURE CHECKOUT';
        checkoutBtn.disabled = false;
    }, 2000);
}

function saveCartToStorage() {
    localStorage.setItem('luxuryCart', JSON.stringify(cartItems));
}

function showCartNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `cart-notification fixed top-24 right-6 z-50 max-w-sm p-4 border-l-4 shadow-lg transform translate-x-full transition-all duration-500 ease-out ${
        type === 'success' 
            ? 'bg-white border-green-500 text-green-800' 
            : 'bg-white border-red-500 text-red-800'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="text-lg mr-3">${type === 'success' ? '✓' : '⚠'}</span>
            <p class="font-sans text-sm tracking-[0.05em]">${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 500);
    }, 3000);
}

// Make cart functions globally accessible
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;