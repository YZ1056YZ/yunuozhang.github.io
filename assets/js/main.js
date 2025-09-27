/**
 * Main JavaScript for Academic Portfolio
 * Author: [Your Name]
 * Description: Interactive functionality for academic portfolio website
 * Features: Mobile menu, smooth scrolling, dynamic content updates
 */

/**
 * Wait for DOM to be fully loaded before initializing
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initMobileMenu();
    initSmoothScrolling();
    updateCopyrightYear();
});

/**
 * Initialize mobile menu functionality
 * Creates hamburger menu button and handles toggle behavior
 */
function initMobileMenu() {
    // Get navigation elements
    const header = document.querySelector('.main-header');
    const navMenu = document.querySelector('.nav-menu');
    
    // Exit if nav menu doesn't exist
    if (!navMenu) return;
    
    // Create hamburger menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Create three lines for hamburger icon
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Insert button into navigation bar
    const topNav = document.querySelector('.top-nav');
    topNav.appendChild(mobileMenuBtn);
    
    // Toggle menu visibility on button click
    mobileMenuBtn.addEventListener('click', function() {
        // Toggle active class on menu
        navMenu.classList.toggle('active');
        
        // Toggle active class on button for animation
        this.classList.toggle('active');
        
        // Update ARIA expanded attribute for accessibility
        const isExpanded = navMenu.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking outside (optional enhancement)
    document.addEventListener('click', function(event) {
        // Check if click is outside menu and button
        if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Initialize smooth scrolling for anchor links
 * Provides smooth scroll behavior for in-page navigation
 */
function initSmoothScrolling() {
    // Select all links that start with #
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Add click handler to each anchor link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default jump behavior
            e.preventDefault();
            
            // Get target element ID from href
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" without ID
            if (targetId === '#') return;
            
            // Find target element on page
            const targetElement = document.querySelector(targetId);
            
            // Exit if target doesn't exist
            if (!targetElement) return;
            
            // Calculate scroll position (with offset for fixed header)
            const headerHeight = 80; // Adjust based on actual header height
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash without jumping
            history.pushState(null, null, targetId);
        });
    });
}

/**
 * Automatically update copyright year in footer
 * Ensures footer always shows current year
 */
function updateCopyrightYear() {
    // Find footer copyright element
    const yearElement = document.querySelector('footer .footer-container p');
    
    // Exit if element doesn't exist
    if (!yearElement) return;
    
    // Get current year
    const currentYear = new Date().getFullYear();
    
    // Replace any 4-digit year with current year
    const updatedText = yearElement.textContent.replace(/\d{4}/, currentYear);
    yearElement.textContent = updatedText;
}

/**
 * Optional: Add scroll progress indicator
 * Shows reading progress as user scrolls
 */
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent-color);
        z-index: 1000;
        transition: width 0.2s;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        // Calculate scroll percentage
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        // Update progress bar width
        progressBar.style.width = scrollPercentage + '%';
    });
}

/**
 * Optional: Add active section highlighting in navigation
 * Highlights current section in nav menu based on scroll position
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    // Exit if no sections or nav links
    if (!sections.length || !navLinks.length) return;
    
    // Function to update active nav item
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        // Find current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = section.getAttribute('id');
                
                // Update nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial update
    updateActiveNav();
}

/**
 * Optional: Initialize lazy loading for images
 * Loads images only when they're about to enter viewport
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    // Exit if no lazy images
    if (!images.length) return;
    
    // Create intersection observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Load image
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                
                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, {
        // Start loading when image is 200px away from viewport
        rootMargin: '200px'
    });
    
    // Observe all lazy images
    images.forEach(img => imageObserver.observe(img));
}
