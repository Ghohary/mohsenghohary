// Admin Dashboard JavaScript
let products = [];
let currentEditingProduct = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

function initializeAdmin() {
    loadProducts();
    initializeTabs();
    initializeForm();
    initializeSearch();
    updateInventoryStats();
    populateProductsTable();
    populateInventoryTable();
}

// Tab Management
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-black', 'text-white');
                btn.classList.add('text-gray-600', 'hover:text-gray-800');
            });
            button.classList.add('active', 'bg-black', 'text-white');
            button.classList.remove('text-gray-600', 'hover:text-gray-800');
            
            // Show correct tab content
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(`${tabName}-tab`).classList.remove('hidden');
            
            // Update data when switching tabs
            if (tabName === 'inventory') {
                updateInventoryStats();
                populateInventoryTable();
            }
        });
    });
    
    // Set default active tab
    document.querySelector('[data-tab="products"]').click();
}

// Form Management
function initializeForm() {
    const form = document.getElementById('product-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProduct();
    });
}

// Search and Filter
function initializeSearch() {
    const searchInput = document.getElementById('search-products');
    const categoryFilter = document.getElementById('filter-category');
    
    searchInput.addEventListener('input', () => {
        populateProductsTable();
    });
    
    categoryFilter.addEventListener('change', () => {
        populateProductsTable();
    });
}

// Product Management
function saveProduct() {
    const formData = {
        id: currentEditingProduct ? currentEditingProduct.id : Date.now().toString(),
        name: document.getElementById('product-name').value.trim(),
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        description: document.getElementById('product-description').value.trim(),
        colors: getSelectedCheckboxValues('.color-checkbox'),
        sizes: getSelectedCheckboxValues('.size-checkbox'),
        stock: parseInt(document.getElementById('product-stock').value) || 0,
        images: currentEditingProduct ? currentEditingProduct.images : [],
        dateAdded: currentEditingProduct ? currentEditingProduct.dateAdded : new Date().toISOString(),
        status: 'active',
        sku: currentEditingProduct ? currentEditingProduct.sku : generateSKU()
    };
    
    // Validation
    if (!formData.name || !formData.price || formData.colors.length === 0 || formData.sizes.length === 0) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (currentEditingProduct) {
        // Update existing product
        const index = products.findIndex(p => p.id === currentEditingProduct.id);
        if (index !== -1) {
            products[index] = { ...formData };
            showNotification('Product updated successfully!', 'success');
        }
    } else {
        // Add new product
        products.push(formData);
        showNotification('Product added successfully!', 'success');
    }
    
    saveProducts();
    clearForm();
    populateProductsTable();
    updateInventoryStats();
    populateInventoryTable();
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentEditingProduct = product;
    
    // Populate form with product data
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-stock').value = product.stock;
    
    // Set checkboxes
    setCheckboxValues('.color-checkbox', product.colors);
    setCheckboxValues('.size-checkbox', product.sizes);
    
    // Update form button
    const submitButton = document.querySelector('#product-form button[type="submit"]');
    submitButton.textContent = 'UPDATE PRODUCT';
    
    // Scroll to form
    document.querySelector('#product-form').scrollIntoView({ behavior: 'smooth' });
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        populateProductsTable();
        updateInventoryStats();
        populateInventoryTable();
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

// Image Handling
function handleImageUpload(input) {
    const files = input.files;
    const preview = document.getElementById('image-preview');
    preview.innerHTML = '';
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'relative';
                imageContainer.innerHTML = `
                    <img src="${e.target.result}" class="w-full h-20 object-cover rounded border">
                    <button type="button" onclick="this.parentElement.remove()" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600">×</button>
                `;
                preview.appendChild(imageContainer);
            };
            reader.readAsDataURL(file);
        }
    }
}

// Table Population
function populateProductsTable() {
    const tbody = document.getElementById('products-table-body');
    const searchTerm = document.getElementById('search-products').value.toLowerCase();
    const categoryFilter = document.getElementById('filter-category').value;
    
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    
    tbody.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-gray-200 rounded mr-4 flex items-center justify-center">
                        <span class="text-xs font-sans text-gray-500">IMG</span>
                    </div>
                    <div>
                        <div class="font-sans text-sm font-medium text-gray-900">${product.name}</div>
                        <div class="font-sans text-xs text-gray-500">SKU: ${product.sku}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 font-sans text-sm text-gray-900 capitalize">${product.category}</td>
            <td class="px-6 py-4 font-sans text-sm text-gray-900">$${product.price.toFixed(2)}</td>
            <td class="px-6 py-4 font-sans text-sm">
                <span class="${getStockColorClass(product.stock)}">${product.stock}</span>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-sans rounded-full ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }">
                    ${product.status}
                </span>
            </td>
            <td class="px-6 py-4 font-sans text-sm space-x-2">
                <button onclick="editProduct('${product.id}')" class="text-blue-600 hover:text-blue-800">Edit</button>
                <button onclick="toggleProductStatus('${product.id}')" class="text-yellow-600 hover:text-yellow-800">
                    ${product.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button onclick="deleteProduct('${product.id}')" class="text-red-600 hover:text-red-800">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    if (filteredProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-8 text-center text-gray-500 font-sans">
                    No products found
                </td>
            </tr>
        `;
    }
}

function populateInventoryTable() {
    const tbody = document.getElementById('inventory-table-body');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="font-sans text-sm font-medium text-gray-900">${product.name}</div>
                <div class="font-sans text-xs text-gray-500">${product.category}</div>
            </td>
            <td class="px-6 py-4 font-sans text-sm text-gray-900">${product.sku}</td>
            <td class="px-6 py-4 font-sans text-sm">
                <span class="${getStockColorClass(product.stock)}">${product.stock}</span>
            </td>
            <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                    <input type="number" value="${product.stock}" min="0" class="w-20 border border-gray-300 rounded px-2 py-1 text-sm" onchange="updateProductStock('${product.id}', this.value)">
                    <span class="font-sans text-xs text-gray-500">units</span>
                </div>
            </td>
            <td class="px-6 py-4 font-sans text-sm space-x-2">
                <button onclick="restockProduct('${product.id}')" class="text-green-600 hover:text-green-800">Restock</button>
                <button onclick="editProduct('${product.id}')" class="text-blue-600 hover:text-blue-800">Edit</button>
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

function updateProductStock(productId, newStock) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.stock = parseInt(newStock) || 0;
        saveProducts();
        updateInventoryStats();
        populateProductsTable();
        showNotification('Stock updated successfully!', 'success');
    }
}

function restockProduct(productId) {
    const amount = prompt('Enter restock amount:');
    if (amount && !isNaN(amount)) {
        const product = products.find(p => p.id === productId);
        if (product) {
            product.stock += parseInt(amount);
            saveProducts();
            updateInventoryStats();
            populateInventoryTable();
            populateProductsTable();
            showNotification(`Added ${amount} units to ${product.name}!`, 'success');
        }
    }
}

// Utility Functions
function generateSKU() {
    return 'MG' + Date.now().toString().slice(-6);
}

function getStockColorClass(stock) {
    if (stock === 0) return 'text-red-600 font-medium';
    if (stock <= 5) return 'text-yellow-600 font-medium';
    return 'text-green-600 font-medium';
}

function getSelectedCheckboxValues(selector) {
    const checkboxes = document.querySelectorAll(selector);
    const values = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            values.push(checkbox.value);
        }
    });
    return values;
}

function setCheckboxValues(selector, values) {
    const checkboxes = document.querySelectorAll(selector);
    checkboxes.forEach(checkbox => {
        checkbox.checked = values.includes(checkbox.value);
    });
}

function clearForm() {
    document.getElementById('product-form').reset();
    document.getElementById('image-preview').innerHTML = '';
    currentEditingProduct = null;
    
    const submitButton = document.querySelector('#product-form button[type="submit"]');
    submitButton.textContent = 'ADD PRODUCT';
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
        // Add sample products
        products = [
            {
                id: '1',
                name: 'Elegant Evening Dress',
                category: 'dresses',
                price: 2850,
                description: 'Crafted from the finest silk with hand-sewn details, this elegant evening dress embodies timeless sophistication.',
                colors: ['black', 'navy', 'burgundy'],
                sizes: ['XS', 'S', 'M', 'L'],
                stock: 15,
                images: [],
                dateAdded: new Date().toISOString(),
                status: 'active',
                sku: 'MG001'
            },
            {
                id: '2',
                name: 'Classic Abaya',
                category: 'abayas',
                price: 1850,
                description: 'Modern abaya with traditional elegance, perfect for special occasions.',
                colors: ['black', 'navy'],
                sizes: ['S', 'M', 'L', 'XL'],
                stock: 8,
                images: [],
                dateAdded: new Date().toISOString(),
                status: 'active',
                sku: 'MG002'
            }
        ];
        saveProducts();
    }
}

// Export/Backup Functions
function exportProducts() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `mg-products-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Products exported successfully!', 'success');
}

function backupProducts() {
    const backup = {
        products: products,
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    
    localStorage.setItem('mg_products_backup', JSON.stringify(backup));
    showNotification('Products backed up successfully!', 'success');
}

// Notification System
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.admin-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `admin-notification fixed top-4 right-4 px-6 py-4 rounded-lg font-sans text-sm tracking-wide z-50 transform translate-x-full transition-all duration-300 shadow-lg ${
        type === 'success' ? 'bg-green-600 text-white' : 
        type === 'error' ? 'bg-red-600 text-white' : 
        'bg-gray-800 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Global functions for HTML onclick handlers
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.toggleProductStatus = toggleProductStatus;
window.updateProductStock = updateProductStock;
window.restockProduct = restockProduct;
window.handleImageUpload = handleImageUpload;
window.clearForm = clearForm;
window.exportProducts = exportProducts;
window.backupProducts = backupProducts;