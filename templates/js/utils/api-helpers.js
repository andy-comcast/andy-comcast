/**
 * Utility Functions
 * A collection of useful JavaScript helper functions
 */

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - Time in milliseconds to wait between calls
 * @returns {Function} - Debounced function
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  /**
   * Throttle function to limit how often a function can be called
   * @param {Function} func - The function to throttle
   * @param {number} limit - Time in milliseconds between allowed function calls
   * @returns {Function} - Throttled function
   */
  function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  /**
   * Get a cookie value by name
   * @param {string} name - Name of the cookie
   * @returns {string|null} - Cookie value or null if not found
   */
  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
  
  /**
   * Set a cookie
   * @param {string} name - Name of the cookie
   * @param {string} value - Value to store
   * @param {number} days - Days until expiration
   */
  function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
  }
  
  /**
   * Delete a cookie
   * @param {string} name - Name of the cookie to delete
   */
  function deleteCookie(name) {
    setCookie(name, '', -1);
  }
  
  /**
   * Format a date string
   * @param {string|Date} dateInput - Date to format
   * @param {string} format - Format string (e.g., 'MM/DD/YYYY')
   * @returns {string} - Formatted date string
   */
  function formatDate(dateInput, format = 'MM/DD/YYYY') {
    const date = new Date(dateInput);
    
    if (isNaN(date)) {
      return 'Invalid Date';
    }
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', year)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }
  
  /**
   * Generate a random string
   * @param {number} length - Length of the random string
   * @returns {string} - Random string
   */
  function randomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  /**
   * Check if an element is in viewport
   * @param {HTMLElement} element - Element to check
   * @param {number} offset - Offset in pixels
   * @returns {boolean} - True if element is in viewport
   */
  function isInViewport(element, offset = 0) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
      rect.bottom >= offset &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) - offset &&
      rect.right >= offset
    );
  }
  
  /**
   * Detect mobile device
   * @returns {boolean} - True if the user is on a mobile device
   */
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  /**
   * Create an element with attributes and content
   * @param {string} tagName - HTML tag name
   * @param {Object} attributes - Attributes to set on the element
   * @param {string|HTMLElement|Array} children - Child elements or content
   * @returns {HTMLElement} - Created element
   */
  function createElement(tagName, attributes = {}, children = null) {
    const element = document.createElement(tagName);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });
    
    // Add children
    if (children) {
      if (Array.isArray(children)) {
        children.forEach(child => {
          if (child instanceof HTMLElement) {
            element.appendChild(child);
          } else {
            element.appendChild(document.createTextNode(String(child)));
          }
        });
      } else if (children instanceof HTMLElement) {
        element.appendChild(children);
      } else {
        element.textContent = String(children);
      }
    }
    
    return element;
  }
  
  // Export all functions
  export {
    debounce,
    throttle,
    getCookie,
    setCookie,
    deleteCookie,
    formatDate,
    randomString,
    isInViewport,
    isMobileDevice,
    createElement
  };
