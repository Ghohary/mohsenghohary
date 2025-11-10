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
    
    // Open hamburger menu
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close hamburger menu
    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close menu when clicking on a link
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = 'auto';
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