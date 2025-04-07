/**
 * Navigation Component
 * 
 * This file contains JavaScript functionality for navigation elements.
 * It handles mobile navigation toggle, smooth scrolling, and active states.
 * 
 * @author {{author-name}}
 * @date {{creation-date}}
 */

/**
 * Navigation functionality to be initialized when the DOM is loaded
 */
class Navigation {
    /**
     * Initialize the navigation component
     */
    constructor() {
      // Element selectors
      this.header = document.querySelector('.site-header');
      this.nav = document.querySelector('.main-nav');
      this.navLinks = document.querySelector('.nav-links');
      this.navItems = document.querySelectorAll('.nav-links a');
      this.mobileToggle = document.querySelector('.mobile-menu-toggle');
      this.hamburgerBars = document.querySelectorAll('.mobile-menu-toggle .bar');
      
      // State
      this.isScrolled = false;
      this.isMobileMenuOpen = false;
      
      // Initialize
      this.init();
    }
    
    /**
     * Initialize event listeners and set up navigation
     */
    init() {
      if (!this.nav) return;
      
      // Mobile menu toggle
      if (this.mobileToggle) {
        this.mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
      }
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', this.handleOutsideClick.bind(this));
      
      // Smooth scroll for navigation links
      this.navItems.forEach(link => {
        link.addEventListener('click', this.smoothScroll.bind(this));
      });
      
      // Scroll event for header styling
      window.addEventListener('scroll', this.handleScroll.bind(this));
      
      // Set active nav item based on current page or section
      this.setActiveNavItem();
      
      // Initialize scroll spy
      this.initScrollSpy();
      
      // Check initial scroll position
      this.handleScroll();
    }
    
    /**
     * Handle mobile menu toggle
     * @param {Event} event - Click event
     */
    toggleMobileMenu(event) {
      event.preventDefault();
      
      // Toggle mobile menu active state
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      this.navLinks.classList.toggle('nav-active', this.isMobileMenuOpen);
      
      // Animate hamburger to X
      if (this.isMobileMenuOpen) {
        this.animateHamburgerToX();
      } else {
        this.animateXToHamburger();
      }
      
      // Prevent scrolling on body when menu is open
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
    
    /**
     * Animate hamburger icon to X
     */
    animateHamburgerToX() {
      if (!this.hamburgerBars.length) return;
      
      this.hamburgerBars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
      this.hamburgerBars[1].style.opacity = '0';
      this.hamburgerBars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    }
    
    /**
     * Animate X icon back to hamburger
     */
    animateXToHamburger() {
      if (!this.hamburgerBars.length) return;
      
      this.hamburgerBars[0].style.transform = 'none';
      this.hamburgerBars[1].style.opacity = '1';
      this.hamburgerBars[2].style.transform = 'none';
    }
    
    /**
     * Handle clicks outside the navigation to close mobile menu
     * @param {Event} event - Click event
     */
    handleOutsideClick(event) {
      if (!this.isMobileMenuOpen) return;
      
      if (!event.target.closest('.nav-links') && 
          !event.target.closest('.mobile-menu-toggle')) {
        this.isMobileMenuOpen = false;
        this.navLinks.classList.remove('nav-active');
        this.animateXToHamburger();
        document.body.style.overflow = '';
      }
    }
    
    /**
     * Handle smooth scrolling when clicking navigation links
     * @param {Event} event - Click event
     */
    smoothScroll(event) {
      const link = event.currentTarget;
      const targetId = link.getAttribute('href');
      
      // Skip if not an anchor link
      if (!targetId || targetId.charAt(0) !== '#' || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      event.preventDefault();
      
      // Close mobile menu if open
      if (this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
        this.navLinks.classList.remove('nav-active');
        this.animateXToHamburger();
        document.body.style.overflow = '';
      }
      
      // Get header height for offset
      const headerHeight = this.header ? this.header.offsetHeight : 0;
      const additionalOffset = 20; // Extra padding
      
      // Scroll to target
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight - additionalOffset,
        behavior: 'smooth'
      });
      
      // Update URL hash
      window.history.pushState(null, null, targetId);
      
      // Update active link
      this.setActiveNavItem(targetId);
    }
    
    /**
     * Handle scroll events for sticky header
     */
    handleScroll() {
      const scrollPosition = window.scrollY;
      
      // Check if page is scrolled for header styling
      if (this.header) {
        const wasScrolled = this.isScrolled;
        this.isScrolled = scrollPosition > 50;
        
        if (wasScrolled !== this.isScrolled) {
          this.header.classList.toggle('scrolled', this.isScrolled);
        }
      }
    }
    
    /**
     * Set active navigation item based on href or current section
     * @param {string} [targetId] - Optional target ID to set as active
     */
    setActiveNavItem(targetId = null) {
      // Remove active class from all links
      this.navItems.forEach(link => {
        link.classList.remove('active');
      });
      
      if (targetId) {
        // Set active based on targetId
        const activeLink = document.querySelector(`.nav-links a[href="${targetId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      } else {
        // Set active based on current URL
        const currentPath = window.location.pathname;
        
        this.navItems.forEach(link => {
          const linkPath = link.getAttribute('href');
          
          // For non-hash links, check if path matches
          if (linkPath && !linkPath.startsWith('#') && currentPath.endsWith(linkPath)) {
            link.classList.add('active');
          }
          
          // For hash links on homepage, check if it's the homepage
          if (linkPath && linkPath.startsWith('#') && (currentPath === '/' || currentPath.endsWith('index.html'))) {
            // Check if section is in view for initial load
            const section = document.querySelector(linkPath);
            if (section && this.isElementInViewport(section)) {
              link.classList.add('active');
            }
          }
        });
      }
    }
    
    /**
     * Initialize scroll spy functionality to update active nav based on scroll position
     */
    initScrollSpy() {
      // Get all sections that should be tracked
      const sections = document.querySelectorAll('section[id]');
      if (!sections.length) return;
      
      // Use debounced scroll event to check which section is in view
      window.addEventListener('scroll', this.debounce(() => {
        // Get current scroll position
        const scrollPosition = window.scrollY;
        const headerHeight = this.header ? this.header.offsetHeight : 0;
        
        // Find the current section
        let currentSection = null;
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop - headerHeight - 100; // Buffer
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && 
              scrollPosition < sectionTop + sectionHeight) {
            currentSection = `#${section.getAttribute('id')}`;
          }
        });
        
        // Update active nav item if we have a current section
        if (currentSection) {
          this.setActiveNavItem(currentSection);
        }
      }, 100));
    }
    
    /**
     * Check if an element is in the viewport
     * @param {HTMLElement} element - The element to check
     * @returns {boolean} - True if element is in viewport
     */
    isElementInViewport(element) {
      const rect = element.getBoundingClientRect();
      const headerHeight = this.header ? this.header.offsetHeight : 0;
      
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - headerHeight &&
        rect.bottom >= headerHeight
      );
    }
    
    /**
     * Simple debounce function for performance optimization
     * @param {Function} func - The function to debounce
     * @param {number} wait - The wait time in milliseconds
     * @returns {Function} - Debounced function
     */
    debounce(func, wait = 100) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }
  }
  
  // Initialize navigation when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const navigation = new Navigation();
  });
