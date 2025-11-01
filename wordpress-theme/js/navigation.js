/**
 * Navigation functionality
 */
(function() {
    'use strict';

    // Mobile menu toggle (if you add mobile menu later)
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    const navigation = document.querySelector('.main-navigation');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navigation.classList.toggle('active');
            this.setAttribute('aria-expanded', navigation.classList.contains('active'));
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navigation && !navigation.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            navigation.classList.remove('active');
            if (mobileMenuButton) {
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Add active class to menu items on scroll
    const sections = document.querySelectorAll('section[id]');
    const menuItems = document.querySelectorAll('.main-navigation a[href^="#"]');

    function highlightMenuOnScroll() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightMenuOnScroll);
})();
