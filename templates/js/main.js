/**
 * Project: Web Project Starter
 * Author: Your Name
 * Date: April 2025
 * Description: Main JavaScript file for the project
 */

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contact-form');
const yearSpan = document.getElementById('year');

// Set current year in footer
yearSpan.textContent = new Date().getFullYear();

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
  
  // Animate hamburger menu
  const bars = document.querySelectorAll('.bar');
  bars.forEach(bar => bar.classList.toggle('active'));
  
  // First bar transforms to X (top part)
  if (navLinks.classList.contains('nav-active')) {
    bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
  } else {
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('nav-active') && 
      !e.target.closest('.nav-links') && 
      !e.target.closest('.mobile-menu')) {
    navLinks.classList.remove('nav-active');
    
    // Reset hamburger menu
    const bars = document.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Close mobile menu when clicking a link
    if (navLinks.classList.contains('nav-active')) {
      navLinks.classList.remove('nav-active');
      
      // Reset hamburger menu
      const bars = document.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});

// Form validation and submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (name === '' || email === '' || message === '') {
      showFormAlert('Please fill in all fields', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showFormAlert('Please enter a valid email address', 'error');
      return;
    }
    
    // Simulate form submission
    // In a real project, you would send this data to a server
    showFormAlert('Thank you! Your message has been sent.', 'success');
    contactForm.reset();
    
    // Here you would typically add your AJAX call or form submission logic
  });
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to show form alerts
function showFormAlert(message, type) {
  // Remove any existing alerts
  const existingAlert = document.querySelector('.form-alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  // Create alert element
  const alertDiv = document.createElement('div');
  alertDiv.className = `form-alert ${type}`;
  alertDiv.textContent = message;
  
  // Add styles
  alertDiv.style.padding = '10px';
  alertDiv.style.marginBottom = '15px';
  alertDiv.style.borderRadius = '4px';
  
  if (type === 'error') {
    alertDiv.style.backgroundColor = '#f8d7da';
    alertDiv.style.color = '#721c24';
    alertDiv.style.border = '1px solid #f5c6cb';
  } else {
    alertDiv.style.backgroundColor = '#d4edda';
    alertDiv.style.color = '#155724';
    alertDiv.style.border = '1px solid #c3e6cb';
  }
  
  // Insert alert before the form
  contactForm.parentNode.insertBefore(alertDiv, contactForm);
  
  // Remove alert after 5 seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// Add scroll event to handle sticky header effects
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Display loading animation when page is loading (if needed)
window.addEventListener('load', () => {
  // Code to hide a loading spinner would go here
  console.log('Page loaded successfully!');
});
