/**
 * Modal Component
 * 
 * A reusable modal dialog component that can be used to display content
 * in a modal window. The modal can be opened and closed programmatically
 * or using data attributes.
 * 
 * @author {{author-name}}
 * @date {{creation-date}}
 */

class Modal {
    /**
     * Initialize a new modal instance
     * @param {string|HTMLElement} selector - Modal element or selector
     * @param {Object} options - Configuration options
     */
    constructor(selector, options = {}) {
      // Store the modal element
      this.modal = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector;
      
      if (!this.modal) {
        console.error('Modal element not found');
        return;
      }
  
      // Default options
      this.options = {
        closeOnEscape: true,
        closeOnOutsideClick: true,
        removeOnClose: false,
        showCloseButton: true,
        onOpen: null,
        onClose: null,
        ...options
      };
  
      // Element references
      this.closeButton = this.modal.querySelector('[data-modal-close]');
      this.backdrop = null;
      
      // State
      this.isOpen = false;
  
      // Bind methods to maintain 'this' context
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
  
      // Initialize
      this.init();
    }
  
    /**
     * Initialize the modal
     */
    init() {
      // Create close button if needed
      if (this.options.showCloseButton && !this.closeButton) {
        this.closeButton = document.createElement('button');
        this.closeButton.setAttribute('data-modal-close', '');
        this.closeButton.setAttribute('aria-label', 'Close modal');
        this.closeButton.className = 'modal-close';
        this.closeButton.innerHTML = '&times;';
        
        // Find the modal header or content to append the button
        const modalHeader = this.modal.querySelector('.modal-header');
        if (modalHeader) {
          modalHeader.appendChild(this.closeButton);
        } else {
          this.modal.insertBefore(this.closeButton, this.modal.firstChild);
        }
      }
  
      // Add event listeners
      if (this.closeButton) {
        this.closeButton.addEventListener('click', this.close);
      }
  
      // Initialize any triggers that reference this modal
      document.querySelectorAll(`[data-modal-target="${this.modal.id}"]`).forEach(trigger => {
        trigger.addEventListener('click', this.open);
      });
    }
  
    /**
     * Create backdrop element
     * @returns {HTMLElement} The backdrop element
     */
    createBackdrop() {
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop';
      backdrop.addEventListener('click', this.handleOutsideClick);
      document.body.appendChild(backdrop);
      return backdrop;
    }
  
    /**
     * Open the modal
     * @param {Event} event - The event that triggered the open (optional)
     */
    open(event) {
      if (event) {
        event.preventDefault();
      }
  
      if (this.isOpen) return;
  
      // Create backdrop
      this.backdrop = this.createBackdrop();
      
      // Show modal
      this.modal.classList.add('modal-active');
      this.modal.setAttribute('aria-hidden', 'false');
      
      // Add event listeners for closing
      if (this.options.closeOnEscape) {
        document.addEventListener('keydown', this.handleKeydown);
      }
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      
      // Update state
      this.isOpen = true;
      
      // Set focus to the first focusable element
      this.setFocusTrap();
      
      // Call onOpen callback if provided
      if (typeof this.options.onOpen === 'function') {
        this.options.onOpen(this);
      }
    }
  
    /**
     * Close the modal
     * @param {Event} event - The event that triggered the close (optional)
     */
    close(event) {
      if (event) {
        event.preventDefault();
      }
  
      if (!this.isOpen) return;
  
      // Hide modal
      this.modal.classList.remove('modal-active');
      this.modal.setAttribute('aria-hidden', 'true');
      
      // Remove backdrop
      if (this.backdrop) {
        this.backdrop.removeEventListener('click', this.handleOutsideClick);
        document.body.removeChild(this.backdrop);
        this.backdrop = null;
      }
      
      // Remove event listeners
      if (this.options.closeOnEscape) {
        document.removeEventListener('keydown', this.handleKeydown);
      }
      
      // Restore body scrolling
      document.body.style.overflow = '';
      
      // Update state
      this.isOpen = false;
      
      // Remove from DOM if needed
      if (this.options.removeOnClose) {
        this.modal.remove();
      }
      
      // Call onClose callback if provided
      if (typeof this.options.onClose === 'function') {
        this.options.onClose(this);
      }
    }
  
    /**
     * Handle keydown events (for Escape key)
     * @param {KeyboardEvent} event - The keydown event
     */
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    /**
     * Handle clicks outside the modal
     * @param {MouseEvent} event - The click event
     */
    handleOutsideClick(event) {
      if (this.options.closeOnOutsideClick && event.target === this.backdrop) {
        this.close();
      }
    }
  
    /**
     * Set up focus trap within the modal
     */
    setFocusTrap() {
      // Store the element that had focus before opening the modal
      this.previouslyFocused = document.activeElement;
      
      // Get all focusable elements
      const focusableElements = this.modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        // Focus the first focusable element
        focusableElements[0].focus();
        
        // Set up focus trap
        this.modal.addEventListener('keydown', (event) => {
          if (event.key === 'Tab') {
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            // If shift + tab and first element is focused, move to last element
            if (event.shiftKey && document.activeElement === firstFocusable) {
              event.preventDefault();
              lastFocusable.focus();
            } 
            // If tab and last element is focused, move to first element
            else if (!event.shiftKey && document.activeElement === lastFocusable) {
              event.preventDefault();
              firstFocusable.focus();
            }
          }
        });
      }
    }
  
    /**
     * Destroy the modal instance by removing event listeners
     */
    destroy() {
      if (this.isOpen) {
        this.close();
      }
      
      if (this.closeButton) {
        this.closeButton.removeEventListener('click', this.close);
      }
      
      document.querySelectorAll(`[data-modal-target="${this.modal.id}"]`).forEach(trigger => {
        trigger.removeEventListener('click', this.open);
      });
    }
  }
  
  // Initialize all modals with data-modal attribute
  document.addEventListener('DOMContentLoaded', () => {
    const modalElements = document.querySelectorAll('[data-modal]');
    
    // Store modal instances on window for easy access
    window.modals = {};
    
    modalElements.forEach(modalElement => {
      const modalId = modalElement.id;
      if (modalId) {
        window.modals[modalId] = new Modal(modalElement);
      }
    });
  });
  
  // Export Modal class
  export default Modal;
