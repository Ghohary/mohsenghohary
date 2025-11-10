// Load footer component and initialize functionality
async function loadFooter() {
    try {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) {
            console.warn('Footer placeholder not found');
            return;
        }

        const response = await fetch('footer.html');
        if (!response.ok) {
            throw new Error(`Failed to load footer: ${response.status}`);
        }
        
        const footerHTML = await response.text();
        footerPlaceholder.innerHTML = footerHTML;
        
        // Initialize footer functionality after a short delay
        setTimeout(initializeFooter, 100);
        
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

function initializeFooter() {
    // Newsletter subscription functionality
    const newsletterForm = document.querySelector('footer input[type="email"]');
    const subscribeButton = document.querySelector('footer button');
    
    if (newsletterForm && subscribeButton) {
        subscribeButton.addEventListener('click', (e) => {
            e.preventDefault();
            handleNewsletterSubscription(newsletterForm.value);
        });
        
        newsletterForm.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNewsletterSubscription(newsletterForm.value);
            }
        });
    }
    
    // Social media tracking (optional)
    const socialLinks = document.querySelectorAll('footer a[href="#"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.querySelector('span').textContent;
            console.log(`Social click: ${platform}`);
            // Add analytics tracking here if needed
        });
    });
    
    // Smooth scroll for internal links
    const footerLinks = document.querySelectorAll('footer a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function handleNewsletterSubscription(email) {
    if (!email || !isValidEmail(email)) {
        showFooterNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate newsletter subscription
    showFooterNotification('Thank you for subscribing!', 'success');
    
    // Clear the input
    const newsletterForm = document.querySelector('footer input[type="email"]');
    if (newsletterForm) {
        newsletterForm.value = '';
    }
    
    // Here you would typically send the email to your backend
    console.log('Newsletter subscription:', email);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFooterNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.footer-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `footer-notification fixed bottom-4 right-4 px-6 py-3 rounded-lg font-sans text-sm tracking-wide z-50 transform translate-y-full transition-all duration-300 ${
        type === 'success' ? 'bg-green-600 text-white' : 
        type === 'error' ? 'bg-red-600 text-white' : 
        'bg-gray-800 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(full)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter);

// Export functions for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadFooter,
        handleNewsletterSubscription
    };
}