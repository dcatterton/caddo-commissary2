// Simple Quantity Field Component
class QuantityField extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--forge-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
        }
        
        .container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .inner {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .label {
          font-size: 12px;
          font-weight: 500;
          color: var(--forge-text-primary, rgba(0, 0, 0, 0.87));
          margin-bottom: 4px;
        }
        
        .text-field {
          flex: 1;
          position: relative;
        }
        
        .text-field input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--forge-field-border-color, rgba(0, 0, 0, 0.23));
          border-radius: 4px;
          font-size: 16px;
          background: var(--forge-field-background, #fff);
          color: var(--forge-text-primary, rgba(0, 0, 0, 0.87));
          box-sizing: border-box;
        }
        
        .text-field input:focus {
          outline: none;
          border-color: var(--forge-primary-color, #1976d2);
          border-width: 2px;
        }
        
        .button {
          width: 40px;
          height: 40px;
          border: 1px solid var(--forge-field-border-color, rgba(0, 0, 0, 0.23));
          background: var(--forge-field-background, #fff);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          color: var(--forge-text-primary, rgba(0, 0, 0, 0.87));
        }
        
        .button:hover {
          background: var(--forge-hover-background, rgba(0, 0, 0, 0.04));
        }
        
        .button:active {
          background: var(--forge-active-background, rgba(0, 0, 0, 0.08));
        }
        
        .support-text {
          font-size: 12px;
          color: var(--forge-text-secondary, rgba(0, 0, 0, 0.6));
        }
      </style>
      
      <div class="container">
        <div class="label" id="label"></div>
        <div class="inner">
          <button class="button" id="decrement" aria-label="Decrement">−</button>
          <div class="text-field">
            <slot></slot>
          </div>
          <button class="button" id="increment" aria-label="Increment">+</button>
        </div>
        <div class="support-text" id="support-text"></div>
      </div>
    `;
  }

  setupEventListeners() {
    const decrementBtn = this.shadowRoot.getElementById('decrement');
    const incrementBtn = this.shadowRoot.getElementById('increment');
    const input = this.querySelector('input');
    
    if (decrementBtn && input) {
      decrementBtn.addEventListener('click', () => {
        input.stepDown();
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
    
    if (incrementBtn && input) {
      incrementBtn.addEventListener('click', () => {
        input.stepUp();
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  }

  static get observedAttributes() {
    return ['label', 'support-text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateContent();
    }
  }

  updateContent() {
    const label = this.getAttribute('label');
    const supportText = this.getAttribute('support-text');
    
    if (label) {
      const labelElement = this.shadowRoot.getElementById('label');
      if (labelElement) {
        labelElement.textContent = label;
      }
    }
    
    if (supportText) {
      const supportElement = this.shadowRoot.getElementById('support-text');
      if (supportElement) {
        supportElement.textContent = supportText;
      }
    }
  }
}

// Register the custom element
customElements.define('forge-quantity-field', QuantityField); 