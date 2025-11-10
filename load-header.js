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
    const accountBtn = document.getElementById('account-btn');
    
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
    });
}