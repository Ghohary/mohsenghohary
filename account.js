// Account page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize form functionality
    initializeForms();
    
    // Initialize custom checkboxes
    initializeCheckboxes();
});

function initializeAnimations() {
    // Trigger slide-up animations for elements with animation delays
    const animatedElements = document.querySelectorAll('.animate-slide-up[style*="animation-delay"]');
    
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.classList.add('animate-slide-up');
        }, 100 + (index * 100));
    });
    
    // Trigger benefit animations
    const benefitElements = document.querySelectorAll('.animate-slide-up[style*="opacity: 0"]');
    
    // Use Intersection Observer for benefits section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.style.animationDelay || '0s';
                const delayMs = parseFloat(delay) * 1000;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.classList.add('animate-slide-up');
                }, delayMs);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px 0px'
    });
    
    benefitElements.forEach((element) => {
        observer.observe(element);
    });
}

function initializeForms() {
    // Login form
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Enhanced input animations
    const inputs = document.querySelectorAll('.luxury-input');
    inputs.forEach(input => {
        // Handle input focus/blur for label animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

function initializeCheckboxes() {
    // Custom checkbox for "Remember Me"
    const rememberCheckbox = document.getElementById('remember-me');
    const checkboxBg = document.getElementById('checkbox-bg');
    const checkboxCheck = document.getElementById('checkbox-check');
    
    if (rememberCheckbox && checkboxBg && checkboxCheck) {
        rememberCheckbox.addEventListener('change', function() {
            if (this.checked) {
                checkboxBg.style.opacity = '1';
                checkboxCheck.style.opacity = '1';
            } else {
                checkboxBg.style.opacity = '0';
                checkboxCheck.style.opacity = '0';
            }
        });
    }
    
    // Style other checkboxes
    const otherCheckboxes = document.querySelectorAll('#newsletter, #terms');
    otherCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.style.background = '#000';
                this.style.borderColor = '#000';
            } else {
                this.style.background = 'transparent';
                this.style.borderColor = '#d1d5db';
            }
        });
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'SIGNING IN...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Get form data
    const formData = new FormData(e.target);
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    // Simulate API call
    setTimeout(() => {
        // Here you would normally send data to your backend
        console.log('Login attempt:', {
            email,
            password,
            rememberMe
        });
        
        // Show success animation
        submitBtn.textContent = 'WELCOME BACK';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            // Redirect to dashboard or previous page
            showSuccessMessage('Welcome back! Redirecting to your account...');
            
            // In a real application, you would redirect here
            // window.location.href = 'dashboard.html';
        }, 1000);
        
    }, 2000);
}

function handleSignup(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Validate passwords match (if you had confirm password field)
    const password = document.getElementById('signup-password').value;
    const terms = document.getElementById('terms').checked;
    
    if (!terms) {
        showErrorMessage('Please agree to the Terms & Conditions to continue.');
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'CREATING ACCOUNT...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Get form data
    const formData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('signup-email').value,
        password: password,
        newsletter: document.getElementById('newsletter').checked,
        terms: terms
    };
    
    // Simulate API call
    setTimeout(() => {
        // Here you would normally send data to your backend
        console.log('Signup attempt:', formData);
        
        // Show success animation
        submitBtn.textContent = 'ACCOUNT CREATED';
        submitBtn.style.background = '#10b981';
        submitBtn.style.borderColor = '#10b981';
        submitBtn.style.color = 'white';
        
        setTimeout(() => {
            showSuccessMessage('Welcome to Mohsen Ghohary! Please check your email to verify your account.');
            
            // In a real application, you might redirect to email verification page
            // window.location.href = 'verify-email.html';
        }, 1000);
        
    }, 2000);
}

function showSuccessMessage(message) {
    createNotification(message, 'success');
}

function showErrorMessage(message) {
    createNotification(message, 'error');
}

function createNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-24 right-6 z-50 max-w-md p-6 border-l-4 shadow-lg transform translate-x-full transition-all duration-500 ease-out ${
        type === 'success' 
            ? 'bg-white border-green-500 text-green-800' 
            : 'bg-white border-red-500 text-red-800'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0 mr-4">
                ${type === 'success' 
                    ? '<span class="text-2xl">✓</span>' 
                    : '<span class="text-2xl">⚠</span>'
                }
            </div>
            <div class="flex-1">
                <p class="font-sans text-sm tracking-[0.05em] leading-relaxed">${message}</p>
            </div>
            <button class="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200" onclick="this.parentElement.parentElement.remove()">
                <span class="text-lg">&times;</span>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger slide-in animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 500);
    }, 5000);
}

// Password strength indicator (optional enhancement)
function addPasswordStrengthIndicator() {
    const passwordInputs = document.querySelectorAll('#signup-password, #login-password');
    
    passwordInputs.forEach(input => {
        if (input.id === 'signup-password') {
            const strengthIndicator = document.createElement('div');
            strengthIndicator.className = 'password-strength mt-2';
            strengthIndicator.innerHTML = `
                <div class="flex space-x-1">
                    <div class="strength-bar h-1 bg-gray-200 rounded-full flex-1"></div>
                    <div class="strength-bar h-1 bg-gray-200 rounded-full flex-1"></div>
                    <div class="strength-bar h-1 bg-gray-200 rounded-full flex-1"></div>
                    <div class="strength-bar h-1 bg-gray-200 rounded-full flex-1"></div>
                </div>
                <p class="text-xs font-sans tracking-[0.05em] text-gray-500 mt-1">PASSWORD STRENGTH</p>
            `;
            
            input.parentElement.appendChild(strengthIndicator);
            
            input.addEventListener('input', function() {
                const strength = calculatePasswordStrength(this.value);
                updatePasswordStrengthIndicator(strengthIndicator, strength);
            });
        }
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return score;
}

function updatePasswordStrengthIndicator(indicator, strength) {
    const bars = indicator.querySelectorAll('.strength-bar');
    const strengthText = indicator.querySelector('p');
    
    const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-500'];
    const labels = ['VERY WEAK', 'WEAK', 'FAIR', 'GOOD', 'STRONG'];
    
    bars.forEach((bar, index) => {
        bar.className = 'strength-bar h-1 rounded-full flex-1 ' + 
            (index < strength ? colors[Math.min(strength - 1, 4)] : 'bg-gray-200');
    });
    
    strengthText.textContent = strength > 0 ? `PASSWORD STRENGTH: ${labels[Math.min(strength - 1, 4)]}` : 'PASSWORD STRENGTH';
}

// Initialize password strength indicator
// addPasswordStrengthIndicator();