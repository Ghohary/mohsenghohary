// Graff-style Header JavaScript
// Load header into all pages
console.log('Loading Graff-style header...');
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
                console.log('Initializing Graff header...');
                initializeGraffHeader();
            }, 100);
        }
    })
    .catch(error => console.error('Error loading header:', error));

function initializeGraffHeader() {
    // Get elements for Graff-style header
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const cartBtn = document.getElementById('cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const wishlistBtn = document.getElementById('wishlist-btn');
    
    // Mobile Menu functionality
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function() {
            console.log('Hamburger clicked');
            openMobileMenu();
        });
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            console.log('Close menu clicked');
            closeMobileMenu();
        });
    }
    
    // Cart functionality
    if (cartBtn && cartOverlay) {
        cartBtn.addEventListener('click', function() {
            console.log('Cart button clicked');
            openCart();
        });
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function() {
            console.log('Close cart clicked');
            closeCart();
        });
    }
    
    // Wishlist functionality
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            console.log('Wishlist clicked');
            // Add wishlist functionality here
        });
    }
    
    // Escape key to close overlays
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                closeMobileMenu();
            }
            if (cartOverlay && !cartOverlay.classList.contains('translate-x-full')) {
                closeCart();
            }
        }
    });
    
    // Load cart items on page load
    updateCartDisplay();
    
    console.log('Graff header initialized successfully');
}

// Mobile Menu functions
function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('opacity-0');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
        document.body.style.overflow = 'auto';
    }
}

// Cart functions
function openCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
        cartOverlay.classList.remove('translate-x-full');
    }
}

function closeCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
        cartOverlay.classList.add('translate-x-full');
    }
}

// Cart management functions (simplified)
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('luxuryCart') || '[]');
    
    // Check if item already exists
    const existingItem = cart.find(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.color === product.color
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('luxuryCart', JSON.stringify(cart));
    updateCartDisplay();
    openCart();
}

function removeFromCart(productId, size, color) {
    let cart = JSON.parse(localStorage.getItem('luxuryCart') || '[]');
    cart = cart.filter(item => 
        !(item.id === productId && item.size === size && item.color === color)
    );
    localStorage.setItem('luxuryCart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartQuantity(productId, size, color, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('luxuryCart') || '[]');
    const item = cart.find(item => 
        item.id === productId && item.size === size && item.color === color
    );
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId, size, color);
        } else {
            item.quantity = newQuantity;
            localStorage.setItem('luxuryCart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('luxuryCart') || '[]');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCart = document.getElementById('empty-cart');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartFooter = document.getElementById('cart-footer');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        if (emptyCart) emptyCart.classList.remove('hidden');
        if (cartItemsList) cartItemsList.classList.add('hidden');
        if (cartFooter) cartFooter.classList.add('hidden');
    } else {
        if (emptyCart) emptyCart.classList.add('hidden');
        if (cartItemsList) cartItemsList.classList.remove('hidden');
        if (cartFooter) cartFooter.classList.remove('hidden');
        
        // Update cart items
        if (cartItemsList) {
            cartItemsList.innerHTML = cart.map(item => `
                <div class="flex space-x-4 pb-4 border-b border-gray-100">
                    <div class="w-20 h-20 bg-gray-100 rounded">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover rounded">
                    </div>
                    <div class="flex-1">
                        <h4 class="font-medium text-sm">${item.name}</h4>
                        <p class="text-sm text-gray-600">${item.size} ${item.color ? '/ ' + item.color : ''}</p>
                        <div class="flex items-center justify-between mt-2">
                            <div class="flex items-center space-x-2">
                                <button onclick="updateCartQuantity('${item.id}', '${item.size}', '${item.color}', ${item.quantity - 1})" class="w-6 h-6 flex items-center justify-center border border-gray-300 text-sm">-</button>
                                <span class="text-sm">${item.quantity}</span>
                                <button onclick="updateCartQuantity('${item.id}', '${item.size}', '${item.color}', ${item.quantity + 1})" class="w-6 h-6 flex items-center justify-center border border-gray-300 text-sm">+</button>
                            </div>
                            <button onclick="removeFromCart('${item.id}', '${item.size}', '${item.color}')" class="text-red-600 text-sm hover:text-red-800">Remove</button>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-medium">$${(parseFloat(item.price.replace(/[\$,]/g, '')) * item.quantity).toLocaleString()}</p>
                    </div>
                </div>
            `).join('');
        }
        
        // Update totals
        const subtotal = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[\$,]/g, ''));
            return sum + (price * item.quantity);
        }, 0);
        
        if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toLocaleString()}`;
        if (cartTotal) cartTotal.textContent = `$${subtotal.toLocaleString()}`;
    }
}

// Checkout function
function checkout() {
    const cart = JSON.parse(localStorage.getItem('luxuryCart') || '[]');
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    // For demo purposes - in real implementation, this would process payment
    alert('Thank you for your purchase! This is a demo checkout.');
    
    // Clear cart
    localStorage.removeItem('luxuryCart');
    updateCartDisplay();
    closeCart();
}

// Add checkout button functionality
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', checkout);
        }
    }, 200);
});

// Global functions (for use in other files)
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.closeCart = closeCart;