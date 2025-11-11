// Admin Dashboard JavaScript - Enhanced Version
let products = [];
let currentEditingProduct = null;
let productImages = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

function initializeAdmin() {
    loadProducts();
    initializeForm();
    updateInventoryStats();
    populateProductsTable();
    generateSKU();
}

// Form Management
function initializeForm() {
    const form = document.getElementById('product-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProduct();
    });
}

// Image Management
function addImageFromURL() {
    const input = document.getElementById('image-url-input');
    const url = input.value.trim();
    
    if (!url) {
        showNotification('Please enter an image URL', 'error');
        return;
    }
    
    if (!url.match(/\.(jpg|jpeg|png|webp|gif)/i) && !url.includes('unsplash.com')) {
        showNotification('Please enter a valid image URL', 'error');
        return;
    }
    
    productImages.push(url);
    displayImagePreview();
    input.value = '';
    showNotification('Image added successfully!', 'success');
}

function handleFileUpload(event) {
    const files = event.target.files;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                productImages.push(e.target.result);
                displayImagePreview();
            };
            reader.readAsDataURL(file);
        }
    }
    
    showNotification(`${files.length} image(s) uploaded!`, 'success');
}

function displayImagePreview() {
    const preview = document.getElementById('image-preview');
    preview.innerHTML = '';
    
    productImages.forEach((url, index) => {
        const div = document.createElement('div');
        div.className = 'preview-image relative';
        div.innerHTML = `
            <img src="${url}" alt="Product ${index + 1}" class="w-full h-32 object-cover rounded-lg border-2 border-gray-200">
            <div class="remove-image" onclick="removeImage(${index})">×</div>
            ${index === 0 ? '<span class="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Main</span>' : ''}
        `;
        preview.appendChild(div);
    });
    
    // Update upload container state
    const uploadContainer = document.querySelector('.image-upload-container');
    if (productImages.length > 0) {
        uploadContainer.classList.add('has-image');
    } else {
        uploadContainer.classList.remove('has-image');
    }
}

function removeImage(index) {
    productImages.splice(index, 1);
    displayImagePreview();
    showNotification('Image removed', 'success');
}

// Size & Color Selection
function toggleSize(element) {
    element.classList.toggle('selected');
}

function toggleColor(element) {
    element.classList.toggle('selected');
}

function getSelectedSizes() {
    const selected = document.querySelectorAll('.size-option.selected');
    return Array.from(selected).map(el => el.dataset.size);
}

function getSelectedColors() {
    const selected = document.querySelectorAll('.color-option.selected');
    return Array.from(selected).map(el => ({
        color: el.dataset.color,
        name: el.dataset.colorName
    }));
}

// Product Management
function saveProduct() {
    const name = document.getElementById('product-name').value.trim();
    const category = document.getElementById('product-category').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const description = document.getElementById('product-description').value.trim();
    const details = document.getElementById('product-details').value.trim();
    const featured = document.getElementById('product-featured').checked;
    const sizes = getSelectedSizes();
    const colors = getSelectedColors();
    
    // Validation
    if (!name || !category || !price || !stock || !description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (productImages.length === 0) {
        showNotification('Please add at least one product image', 'error');
        return;
    }
    
    if (sizes.length === 0) {
        showNotification('Please select at least one size', 'error');
        return;
    }
    
    if (colors.length === 0) {
        showNotification('Please select at least one color', 'error');
        return;
    }
    
    const productData = {
        id: currentEditingProduct ? currentEditingProduct.id : Date.now().toString(),
        sku: document.getElementById('product-sku').value || generateSKU(),
        name: name,
        category: category,
        price: price,
        stock: stock,
        description: description,
        details: details,
        images: [...productImages],
        sizes: sizes,
        colors: colors,
        featured: featured,
        dateAdded: currentEditingProduct ? currentEditingProduct.dateAdded : new Date().toISOString(),
        status: 'active'
    };
    
    if (currentEditingProduct) {
        const index = products.findIndex(p => p.id === currentEditingProduct.id);
        if (index !== -1) {
            products[index] = productData;
            showNotification('Product updated successfully!', 'success');
        }
    } else {
        products.push(productData);
        showNotification('Product added successfully!', 'success');
    }
    
    saveProducts();
    clearForm();
    populateProductsTable();
    updateInventoryStats();
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentEditingProduct = product;
    
    // Populate form
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-details').value = product.details || '';
    document.getElementById('product-sku').value = product.sku;
    document.getElementById('product-featured').checked = product.featured || false;
    
    // Set images
    productImages = [...product.images];
    displayImagePreview();
    
    // Set sizes
    document.querySelectorAll('.size-option').forEach(el => {
        if (product.sizes.includes(el.dataset.size)) {
            el.classList.add('selected');
        } else {
            el.classList.remove('selected');
        }
    });
    
    // Set colors
    document.querySelectorAll('.color-option').forEach(el => {
        const isSelected = product.colors.some(c => c.color === el.dataset.color);
        if (isSelected) {
            el.classList.add('selected');
        } else {
            el.classList.remove('selected');
        }
    });
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showNotification('Editing product...', 'success');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        populateProductsTable();
        updateInventoryStats();
        showNotification('Product deleted successfully!', 'success');
    }
}

function toggleProductStatus(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.status = product.status === 'active' ? 'inactive' : 'active';
        saveProducts();
        populateProductsTable();
        showNotification(`Product ${product.status === 'active' ? 'activated' : 'deactivated'}!`, 'success');
    }
}

// Table Population
function populateProductsTable() {
    const tbody = document.getElementById('products-table-body');
    tbody.innerHTML = '';
    
    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                    <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                    <p class="text-lg mb-2">No products yet</p>
                    <p class="text-sm">Add your first product using the form above</p>
                </td>
            </tr>
        `;
        return;
    }
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 transition-colors';
        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <img src="${product.images[0] || ''}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg mr-4 border-2 border-gray-200">
                    <div>
                        <div class="font-medium text-gray-900">${product.name}</div>
                        <div class="text-xs text-gray-500">SKU: ${product.sku}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900 capitalize">${product.category.replace('-', ' ')}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">$${product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            <td class="px-6 py-4 text-sm">
                <span class="font-medium ${getStockColorClass(product.stock)}">${product.stock}</span>
            </td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 text-xs font-medium rounded-full ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }">
                    ${product.status.toUpperCase()}
                </span>
            </td>
            <td class="px-6 py-4 text-sm space-x-3">
                <button onclick="editProduct('${product.id}')" class="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                <button onclick="toggleProductStatus('${product.id}')" class="text-yellow-600 hover:text-yellow-800 font-medium">
                    ${product.status === 'active' ? 'Disable' : 'Enable'}
                </button>
                <button onclick="deleteProduct('${product.id}')" class="text-red-600 hover:text-red-800 font-medium">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Inventory Management
function updateInventoryStats() {
    const totalProducts = products.length;
    const inStock = products.filter(p => p.stock > 5).length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    
    document.getElementById('total-products').textContent = totalProducts;
    document.getElementById('in-stock').textContent = inStock;
    document.getElementById('low-stock').textContent = lowStock;
    document.getElementById('out-of-stock').textContent = outOfStock;
}

// Utility Functions
function generateSKU() {
    const sku = 'MG' + Date.now().toString().slice(-8);
    const skuInput = document.getElementById('product-sku');
    if (skuInput) {
        skuInput.value = sku;
    }
    return sku;
}

function getStockColorClass(stock) {
    if (stock === 0) return 'text-red-600';
    if (stock <= 5) return 'text-yellow-600';
    return 'text-green-600';
}

function clearForm() {
    document.getElementById('product-form').reset();
    productImages = [];
    displayImagePreview();
    currentEditingProduct = null;
    
    // Clear selections
    document.querySelectorAll('.size-option.selected').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.color-option.selected').forEach(el => el.classList.remove('selected'));
    
    // Generate new SKU
    generateSKU();
    
    showNotification('Form cleared', 'success');
}

// Data Persistence
function saveProducts() {
    localStorage.setItem('mg_products', JSON.stringify(products));
}

function loadProducts() {
    const savedProducts = localStorage.getItem('mg_products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        // Add sample product
        products = [
            {
                id: '1',
                sku: 'MG00001',
                name: 'Elegant Evening Dress',
                category: 'couture',
                price: 2850,
                stock: 12,
                description: 'Crafted from the finest silk with hand-sewn details, this elegant evening dress embodies timeless sophistication.',
                details: '• Material: 100% Silk\n• Made in Italy\n• Dry clean only\n• Hand-sewn beadwork',
                images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'],
                sizes: ['36', '38', '40', '42', '44'],
                colors: [
                    {color: 'black', name: 'Black'},
                    {color: 'navy', name: 'Navy'},
                    {color: 'burgundy', name: 'Burgundy'}
                ],
                featured: true,
                dateAdded: new Date().toISOString(),
                status: 'active'
            }
        ];
        saveProducts();
    }
}

// Export Functions
function exportProducts() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `mg-products-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Products exported successfully!', 'success');
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Global function exports for HTML onclick handlers
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.toggleProductStatus = toggleProductStatus;
window.addImageFromURL = addImageFromURL;
window.handleFileUpload = handleFileUpload;
window.removeImage = removeImage;
window.toggleSize = toggleSize;
window.toggleColor = toggleColor;
window.clearForm = clearForm;
window.exportProducts = exportProducts;