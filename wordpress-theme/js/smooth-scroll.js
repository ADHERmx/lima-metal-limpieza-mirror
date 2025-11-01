/**
 * Smooth scroll functionality
 */
(function() {
    'use strict';

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                
                const headerOffset = 80; // Height of fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navigation = document.querySelector('.main-navigation');
                if (navigation && navigation.classList.contains('active')) {
                    navigation.classList.remove('active');
                }
            }
        });
    });

    // Add header shadow on scroll
    const header = document.querySelector('.site-header');
    
    function addHeaderShadow() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', addHeaderShadow);
})();
