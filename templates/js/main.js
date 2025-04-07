/**
 * Main JavaScript for {{project-name}}
 * Author: {{author-name}}
 * Date: {{creation-date}}
 * 
 * This file contains the main JavaScript functionality for the project.
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileMenu();
  initSmoothScrolling();
  initFormValidation();
  setCurrentYear();
  
  // Add any other initialization functions here
});

/**
* Mobile Menu Functionality
* Handles the mobile menu toggle button and menu display
*/
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!mobileMenuToggle || !navLinks) return;
  
  mobileMenuToggle.addEventListener('click', function() {
      // Toggle the nav-active class to show/hide the menu
      navLinks.classList.toggle('nav-active');
      
      // Toggle the active class on the hamburger icon
      const bars = this.querySelectorAll('.bar');
      if (navLinks.classList.contains('nav-active')) {
          // Transform to X icon
          bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
          bars[1].style.opacity = '0';
          bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
          // Reset to hamburger icon
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
      }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
      if (navLinks.classList.contains('nav-active') && 
          !event.target.closest('.nav-links') && 
          !event.target.closest('.mobile-menu-toggle')) {
          
          navLinks.classList.remove('nav-active');
          
          // Reset hamburger icon
          const bars = mobileMenuToggle.querySelectorAll('.bar');
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
      }
  });
}

/**
* Smooth Scrolling for Navigation Links
* Handles smooth scrolling when clicking on navigation links
*/
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  links.forEach(link => {
      link.addEventListener('click', function(e) {
          // Get the target element
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (!targetElement) return;
          
          e.preventDefault();
          
          // Close mobile menu if open
          if (navLinks && navLinks.classList.contains('nav-active')) {
              navLinks.classList.remove('nav-active');
              
              // Reset hamburger icon
              if (mobileMenuToggle) {
                  const bars = mobileMenuToggle.querySelectorAll('.bar');
                  bars[0].style.transform = 'none';
                  bars[1].style.opacity = '1';
                  bars[2].style.transform = 'none';
              }
          }
          
          // Calculate header height for offset
          const header = document.querySelector('.site-header');
          const headerHeight = header ? header.offsetHeight : 0;
          
          // Scroll to target
          window.scrollTo({
              top: targetElement.offsetTop - headerHeight - 20, // Extra padding
              behavior: 'smooth'
          });
          
          // Update active link
          updateActiveLink(targetId);
      });
  });
  
  // Update active link on scroll
  window.addEventListener('scroll', debounce(function() {
      const scrollPosition = window.scrollY;
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
      
      // Get all sections
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop - headerHeight - 100; // Buffer
          const sectionHeight = section.offsetHeight;
          const sectionId = '#' + section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              updateActiveLink(sectionId);
          }
      });
  }, 100));
}

/**
* Update Active Navigation Link
* @param {string} targetId - The ID of the active section
*/
function updateActiveLink(targetId) {
  // Remove active class from all links
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
  });
  
  // Add active class to matching link
  const activeLink = document.querySelector(`.nav-links a[href="${targetId}"]`);
  if (activeLink) {
      activeLink.classList.add('active');
  }
}

/**
* Form Validation
* Validates the contact form before submission
*/
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form inputs
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Check if inputs exist
      if (!nameInput || !emailInput || !messageInput) return;
      
      // Validate inputs
      let isValid = true;
      
      // Name validation
      if (nameInput.value.trim() === '') {
          showError(nameInput, 'Please enter your name');
          isValid = false;
      } else {
          clearError(nameInput);
      }
      
      // Email validation
      if (emailInput.value.trim() === '') {
          showError(emailInput, 'Please enter your email');
          isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
          showError(emailInput, 'Please enter a valid email');
          isValid = false;
      } else {
          clearError(emailInput);
      }
      
      // Message validation
      if (messageInput.value.trim() === '') {
          showError(messageInput, 'Please enter your message');
          isValid = false;
      } else {
          clearError(messageInput);
      }
      
      // If all validations pass, we can submit the form
      if (isValid) {
          // Here you would normally send the form data to a server
          // For template purposes, we'll just show a success message
          showFormMessage('Thank you! Your message has been sent.', 'success');
          contactForm.reset();
      }
  });
}

/**
* Show error message for form input
* @param {HTMLElement} input - The input element
* @param {string} message - The error message
*/
function showError(input, message) {
  // Get the form group
  const formGroup = input.closest('.form-group');
  
  // Clear any existing error
  clearError(input);
  
  // Add error class to the form group
  formGroup.classList.add('error');
  
  // Create error message element
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  errorElement.style.color = 'var(--color-error)';
  errorElement.style.fontSize = 'var(--font-size-sm)';
  errorElement.style.marginTop = 'var(--spacing-xs)';
  
  // Append error message
  formGroup.appendChild(errorElement);
  
  // Highlight input
  input.style.borderColor = 'var(--color-error)';
}

/**
* Clear error message for form input
* @param {HTMLElement} input - The input element
*/
function clearError(input) {
  // Get the form group
  const formGroup = input.closest('.form-group');
  
  // Remove error class
  formGroup.classList.remove('error');
  
  // Remove any existing error message
  const errorElement = formGroup.querySelector('.error-message');
  if (errorElement) {
      formGroup.removeChild(errorElement);
  }
  
  // Reset input style
  input.style.borderColor = '';
}

/**
* Show form message (success, error, etc.)
* @param {string} message - The message to display
* @param {string} type - The message type (success, error)
*/
function showFormMessage(message, type) {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  // Remove any existing form message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
      existingMessage.remove();
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `form-message form-message-${type}`;
  messageElement.textContent = message;
  
  // Style the message
  if (type === 'success') {
      messageElement.style.backgroundColor = 'var(--color-success)';
  } else if (type === 'error') {
      messageElement.style.backgroundColor = 'var(--color-error)';
  }
  
  messageElement.style.color = 'white';
  messageElement.style.padding = 'var(--spacing-sm) var(--spacing-md)';
  messageElement.style.borderRadius = 'var(--border-radius-sm)';
  messageElement.style.marginBottom = 'var(--spacing-md)';
  
  // Insert message before the form
  contactForm.parentNode.insertBefore(messageElement, contactForm);
  
  // Remove message after 5 seconds
  setTimeout(() => {
      messageElement.remove();
  }, 5000);
}

/**
* Check if an email is valid
* @param {string} email - The email to validate
* @returns {boolean} - True if the email is valid
*/
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
* Set current year in footer copyright
*/
function setCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
  }
}

/**
* Debounce function for performance optimization
* @param {function} func - The function to debounce
* @param {number} wait - The wait time in milliseconds
* @returns {function} - The debounced function
*/
function debounce(func, wait) {
  let timeout;
  return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          func.apply(context, args);
      }, wait);
  };
}