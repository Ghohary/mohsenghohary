// Product page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProductPage();
});

function initializeProductPage() {
    // Initialize all product page features
    initializeImageGallery();
    initializeSizeSelection();
    initializeColorSelection();
    initializeQuantityControls();
    initializeAddToCart();
    initializeProductAccordion();
    initializeRelatedProducts();
    
    // Load product data from URL params or default
    loadProductData();
}

// Image Gallery Functionality
function initializeImageGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('#product-thumbnails button');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            const newImageSrc = thumbnail.getAttribute('data-image');
            if (newImageSrc) {
                mainImage.src = newImageSrc;
                
                // Update active thumbnail
                thumbnails.forEach(thumb => thumb.classList.remove('border-black'));
                thumbnails.forEach(thumb => thumb.classList.add('border-transparent', 'hover:border-gray-300'));
                thumbnail.classList.remove('border-transparent', 'hover:border-gray-300');
                thumbnail.classList.add('border-black');
            }
        });
    });
    
    // Image navigation arrows
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    let currentImageIndex = 0;
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => navigateImage(-1));
        nextBtn.addEventListener('click', () => navigateImage(1));
    }
    
    function navigateImage(direction) {
        const images = Array.from(thumbnails);
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        images[currentImageIndex].click();
    }
}

// Size Selection
function initializeSizeSelection() {
    const sizeButtons = document.querySelectorAll('.size-option');
    let selectedSize = null;
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove previous selection
            sizeButtons.forEach(btn => {
                btn.classList.remove('bg-black', 'text-white');
                btn.classList.add('border-gray-300', 'hover:border-black');
            });
            
            // Add selection to clicked button
            button.classList.add('bg-black', 'text-white');
            button.classList.remove('border-gray-300', 'hover:border-black');
            
            selectedSize = button.getAttribute('data-size');
            updateAddToCartButton();
        });
    });
    
    // Make selected size available globally
    window.getSelectedSize = () => selectedSize;
}

// Color Selection
function initializeColorSelection() {
    const colorButtons = document.querySelectorAll('.color-option');
    const selectedColorText = document.getElementById('selected-color');
    let selectedColor = 'black'; // Default
    
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove previous selection
            colorButtons.forEach(btn => btn.classList.remove('ring-2', 'ring-black', 'ring-offset-2'));
            
            // Add selection to clicked button
            button.classList.add('ring-2', 'ring-black', 'ring-offset-2');
            
            selectedColor = button.getAttribute('data-color');
            const colorName = button.getAttribute('data-color-name');
            selectedColorText.textContent = `Selected: ${colorName}`;
            
            updateAddToCartButton();
        });
    });
    
    // Set default selection
    colorButtons[0].click();
    
    // Make selected color available globally
    window.getSelectedColor = () => selectedColor;
}

// Quantity Controls
function initializeQuantityControls() {
    const quantityDisplay = document.getElementById('quantity-display');
    const decreaseBtn = document.getElementById('quantity-decrease');
    const increaseBtn = document.getElementById('quantity-increase');
    let quantity = 1;
    
    function updateQuantityDisplay() {
        quantityDisplay.textContent = quantity;
        decreaseBtn.disabled = quantity <= 1;
        if (quantity <= 1) {
            decreaseBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            decreaseBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        updateAddToCartButton();
    }
    
    decreaseBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            updateQuantityDisplay();
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        if (quantity < 10) { // Max quantity limit
            quantity++;
            updateQuantityDisplay();
        }
    });
    
    updateQuantityDisplay();
    
    // Make quantity available globally
    window.getSelectedQuantity = () => quantity;
}

// Add to Cart Functionality
function initializeAddToCart() {
    const addToCartBtn = document.getElementById('add-to-cart');
    
    addToCartBtn.addEventListener('click', () => {
        const productData = {
            id: getProductId(),
            name: document.getElementById('product-title').textContent,
            price: parsePrice(document.getElementById('product-price').textContent),
            image: document.getElementById('main-product-image').src,
            size: window.getSelectedSize(),
            color: window.getSelectedColor(),
            quantity: window.getSelectedQuantity()
        };
        
        if (!productData.size) {
            showNotification('Please select a size', 'error');
            return;
        }
        
        // Add to cart using the existing cart system
        if (window.addToCart) {
            window.addToCart(productData);
            showNotification('Product added to cart!', 'success');
            
            // Add animation to button
            addToCartBtn.classList.add('bg-green-600');
            addToCartBtn.textContent = 'ADDED TO CART';
            
            setTimeout(() => {
                addToCartBtn.classList.remove('bg-green-600');
                addToCartBtn.textContent = 'ADD TO CART';
            }, 2000);
        } else {
            console.log('Adding to cart:', productData);
            showNotification('Product added to cart!', 'success');
        }
    });
}

function updateAddToCartButton() {
    const addToCartBtn = document.getElementById('add-to-cart');
    const selectedSize = window.getSelectedSize ? window.getSelectedSize() : null;
    
    if (!selectedSize) {
        addToCartBtn.classList.add('opacity-50', 'cursor-not-allowed');
        addToCartBtn.textContent = 'SELECT SIZE';
    } else {
        addToCartBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        addToCartBtn.textContent = 'ADD TO CART';
    }
}

// Product Details Accordion
function initializeProductAccordion() {
    const accordionButtons = document.querySelectorAll('.product-detail-section button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const arrow = button.querySelector('svg');
            
            if (content.classList.contains('hidden')) {
                // Close all other accordions
                accordionButtons.forEach(otherButton => {
                    if (otherButton !== button) {
                        const otherId = otherButton.getAttribute('data-target');
                        const otherContent = document.getElementById(otherId);
                        const otherArrow = otherButton.querySelector('svg');
                        
                        otherContent.classList.add('hidden');
                        otherArrow.classList.remove('rotate-180');
                    }
                });
                
                // Open clicked accordion
                content.classList.remove('hidden');
                arrow.classList.add('rotate-180');
            } else {
                // Close clicked accordion
                content.classList.add('hidden');
                arrow.classList.remove('rotate-180');
            }
        });
    });
}

// Related Products
function initializeRelatedProducts() {
    const relatedProducts = document.querySelectorAll('section:last-of-type .group');
    
    relatedProducts.forEach(product => {
        product.addEventListener('click', () => {
            // Simulate navigation to another product
            showNotification('Loading product...', 'info');
            // In a real app, you would navigate to the clicked product
            console.log('Navigate to related product');
        });
    });
}

// Utility Functions
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'elegant-evening-dress';
}

function parsePrice(priceString) {
    return parseFloat(priceString.replace(/[$,]/g, ''));
}

function loadProductData() {
    const productId = getProductId();
    
    // In a real application, you would fetch this from an API
    const productData = {
        'elegant-evening-dress': {
            name: 'Elegant Evening Dress',
            category: 'DRESSES',
            price: '$2,850',
            description: 'Crafted from the finest silk with hand-sewn details, this elegant evening dress embodies timeless sophistication. The flowing silhouette and intricate beadwork make it perfect for special occasions where elegance is paramount.',
            images: [
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
                'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=800&q=80',
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
                'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80'
            ]
        }
    };
    
    const product = productData[productId];
    if (product) {
        updateProductDisplay(product);
    }
}

function updateProductDisplay(product) {
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('category-link').textContent = product.category.toLowerCase();
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.product-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `product-notification fixed top-20 right-4 px-6 py-4 rounded-lg font-sans text-sm tracking-wide z-50 transform translate-x-full transition-all duration-300 shadow-lg ${
        type === 'success' ? 'bg-green-600 text-white' : 
        type === 'error' ? 'bg-red-600 text-white' : 
        'bg-gray-800 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeProductPage,
        loadProductData,
        showNotification
    };
}