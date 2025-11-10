// Load header into all pages
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        
        // Wait for elements to be in DOM, then initialize
        setTimeout(function() {
            initializeHeader();
        }, 100);
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
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            isScrolled = true;
            changeToWhite();
        } else {
            isScrolled = false;
            changeToTransparent();
        }
    });
    
    // Hover effect
    if (mainNav) {
        mainNav.addEventListener('mouseenter', function() {
            changeToWhite();
        });
        
        mainNav.addEventListener('mouseleave', function() {
            // Only change back to transparent if not scrolled
            if (!isScrolled) {
                changeToTransparent();
            }
        });
    }
    
    // Enhanced hamburger menu functionality
    if (hamburgerBtn && mobileMenu) {
        // Get hamburger lines for animation
        const hamburgerLines = hamburgerBtn.querySelectorAll('.hamburger-line');
        let isMenuOpen = false;
        
        hamburgerBtn.addEventListener('click', function() {
            if (!isMenuOpen) {
                // Open menu with luxury animations
                mobileMenu.classList.remove('hidden');
                
                // Animate hamburger to X
                if (hamburgerLines.length >= 3) {
                    hamburgerLines[0].style.transform = 'translateY(8px) rotate(45deg)';
                    hamburgerLines[1].style.opacity = '0';
                    hamburgerLines[1].style.transform = 'translateX(-10px)';
                    hamburgerLines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
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
            }
        });
        
        // Function to close menu with animations
        function closeMenu() {
            if (isMenuOpen) {
                // Animate hamburger back to normal
                if (hamburgerLines.length >= 3) {
                    hamburgerLines[0].style.transform = 'translateY(0) rotate(0)';
                    hamburgerLines[1].style.opacity = '1';
                    hamburgerLines[1].style.transform = 'translateX(0)';
                    hamburgerLines[2].style.transform = 'translateY(0) rotate(0)';
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
    
    // Search functionality
    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', function() {
            searchOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close search
    if (closeSearchBtn && searchOverlay) {
        closeSearchBtn.addEventListener('click', function() {
            searchOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close search when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay && !searchOverlay.classList.contains('hidden')) {
            searchOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}