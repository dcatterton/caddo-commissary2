// Function to reset quantity dialog state
function resetQuantityDialogState() {
  // Clear all check icons
  const allCheckIcons = document.querySelectorAll('.quantity-check-icon');
  allCheckIcons.forEach(icon => {
    icon.style.display = 'none';
  });
  
  // Remove selected styling from all options
  const allOptions = document.querySelectorAll('.quantity-option');
  allOptions.forEach(option => {
    option.classList.remove('selected');
    // Reset any inline styles
    option.style.borderColor = '';
    option.style.backgroundColor = '';
    option.style.transform = '';
    option.style.boxShadow = '';
  });
  
  // Reset custom quantity inputs
  const desktopCustomInput = document.getElementById('custom-quantity-input');
  const mobileCustomInput = document.getElementById('mobile-custom-quantity-input');
  
  if (desktopCustomInput) {
    desktopCustomInput.value = '';
  }
  
  if (mobileCustomInput) {
    mobileCustomInput.value = '';
  }
  
  // Reset totals
  updateCustomQuantityTotal(0);
  updateMobileCustomQuantityTotal(0);
  
  // Reset remaining balance displays
  updateDialogRemainingBalance(0);
  updateMobileDialogRemainingBalance(0);
}

// Caddo Parish Commissary Products Data
const commissaryProducts = {
  "A": [
    { name: "Acetaminophen – 325MG 2PK", price: 1.25 },
    { name: "All-Stars Candy 3.75OZ", price: 2.75 },
    { name: "Andy's Hot Fries", price: 2.25 }
  ],
  "B": [
    { name: "Baby Oil 4 OZ", price: 1.95 },
    { name: "Beef Barbacoa 6 OZ", price: 4.50 },
    { name: "Beef Stew 11.25 OZ", price: 3.75 },
    { name: "Bic Single Blade Razor", price: 1.25 },
    { name: "Boston Best Coffee 3 OZ", price: 1.50 },
    { name: "Brush", price: 1.25 },
    { name: "Buffalo Wings Blue Chz Chips 1.5OZ K", price: 2.25 }
  ],
  "C": [
    { name: "Cappuccino", price: 1.50 },
    { name: "Cereal Bowl w/Lid 24 OZ", price: 6.99 },
    { name: "Cheese Cracker", price: 1.25 },
    { name: "Checkers Set", price: 3.00 },
    { name: "Cheesy Rice Spicy", price: 1.15 },
    { name: "Cheetos Flamin Hot 1.7OZ G", price: 2.25 },
    { name: "Cheez Its 1.5 OZ K", price: 2.25 },
    { name: "Chicken Breast", price: 4.50 },
    { name: "Chili No Beans 11.25 OZ", price: 3.75 },
    { name: "Choc Chip Cookie - Mini 6OZ HK", price: 2.75 },
    { name: "Cinnamon Roll 4OZ", price: 2.35 },
    { name: "Comb - 5 Inch", price: 1.25 },
    { name: "Conditioner 4 OZ", price: 1.89 },
    { name: "Cough Drops 9PK Stick", price: 1.25 },
    { name: "Cream Cheese w/Jalapeno 2OZ", price: 2.85 },
    { name: "Creamer 10 Packets", price: 1.50 }
  ],
  "D": [
    { name: "Dandruff Shampoo 4 OZ", price: 1.89 },
    { name: "Danish Blueberry", price: 2.35 },
    { name: "Denture Adhesive Cream", price: 2.75 },
    { name: "Deodorant - Sport", price: 1.95 },
    { name: "Deodorant - Suave 1.2 OZ", price: 1.95 },
    { name: "Dominoes", price: 3.00 },
    { name: "Doritos Nacho Cheese 1.75 OZ", price: 2.25 },
    { name: "Duplex Creme Cookies 5OZ HK", price: 2.11 }
  ],
  "F": [
    { name: "Fish Steaks in LA Hot Sauce 3.53 OZ HK", price: 2.50 },
    { name: "Foot Cream - Ath 1% Tolnaftate 0.5OZ", price: 3.45 },
    { name: "Fritos Chili Cheese", price: 2.25 }
  ],
  "G": [
    { name: "Gatorade Fruit Punch Drink Mix 7.5 OZ", price: 1.50 },
    { name: "Glazed Honey Bun 3.5OZ", price: 2.35 },
    { name: "Gummi Worms Sour 4.5OZ", price: 2.75 }
  ],
  "H": [
    { name: "Hair Food - Lusti 4OZ", price: 1.95 },
    { name: "Honey Grade A Pure 12 OZ K GK", price: 3.95 },
    { name: "Hot Sauce 10 Packets", price: 0.75 }
  ],
  "I": [
    { name: "Ibuprofen (2PK)", price: 1.25 },
    { name: "Iced Honey Bun 6OZ", price: 2.35 },
    { name: "Iced Oatmeal Cookies 6OZ HK", price: 2.75 },
    { name: "Indigent - Regular Kit", price: 0.00 },
    { name: "Indigent - Special Kit", price: 0.00 },
    { name: "ICS Phone Time - $1", price: 1.00 },
    { name: "ICS Phone Time - $10", price: 10.00 },
    { name: "ICS Phone Time - $5", price: 5.00 }
  ],
  "J": [
    { name: "Jalapeno Sliced 1 OZ GS", price: 1.30 },
    { name: "Jolly Ranchers Assorted 3.7 oz", price: 2.37 }
  ],
  "L": [
    { name: "Lemon Discs 4.5oz", price: 2.40 },
    { name: "Lip Balm", price: 1.99 },
    { name: "Lotion - Cocoa Butter 4 OZ", price: 1.95 }
  ],
  "M": [
    { name: "M&M w/ Peanuts 1.74OZ GK", price: 2.75 },
    { name: "Macaroni & Cheese 3OZ", price: 2.60 },
    { name: "Mackerel Fillets in Brine 3.53 OZ", price: 2.50 },
    { name: "Mackerel in Sriracha", price: 2.69 },
    { name: "Magic Shave Cream 6OZ", price: 8.25 },
    { name: "Maxi Pad 12PK", price: 4.95 },
    { name: "Maxi Pads w/Wings Long - Super 12PK", price: 4.25 },
    { name: "Mayo 10 Packets GHK", price: 3.00 },
    { name: "Mouthwash", price: 1.55 },
    { name: "Mustard 10 Packets GHK", price: 2.25 }
  ],
  "N": [
    { name: "Noodles - Cajun Shrimp 3OZ", price: 1.15 },
    { name: "Noodles - Chicken 3 OZ", price: 1.15 },
    { name: "Noodles - Chili 3 OZ", price: 1.15 },
    { name: "Noodles - LS Chicken 3 oz", price: 1.15 },
    { name: "Noodles - Spicy Vegetables 3OZ", price: 1.15 }
  ],
  "O": [
    { name: "Oatmeal Variety Creamy Fruit 8CT K", price: 4.95 },
    { name: "Oral Pain Relief Gel 0.33 OZ", price: 4.15 },
    { name: "Oysters Smoked in Oil 3OZ", price: 3.95 }
  ],
  "P": [
    { name: "Paper", price: 1.90 },
    { name: "Peanut Butter", price: 1.50 },
    { name: "Peanut Butter Wafers", price: 1.25 },
    { name: "Peanuts Roasted & Salted 1.75 OZ GK", price: 1.50 },
    { name: "Pen", price: 1.05 },
    { name: "Pepper 10 Packets K", price: 0.75 },
    { name: "Petroleum Jelly 1 OZ", price: 2.50 },
    { name: "Pickle", price: 2.75 },
    { name: "Playing Cards", price: 3.00 },
    { name: "Pork Rinds", price: 3.25 },
    { name: "Poptart 2PK - Blueberry", price: 2.00 },
    { name: "Poptart 2PK - Strawberry", price: 2.00 },
    { name: "Pretzels", price: 2.65 },
    { name: "Pro Glo Pomade Gel 4 OZ", price: 5.29 },
  ],
  "R": [
    { name: "Ranch", price: 1.25 },
    { name: "Reeses Peanut Butter Cups 1.5 OZ", price: 2.75 },
    { name: "Refried Beans 8OZ", price: 4.10 },
    { name: "Regular Potato Chips 1.5 OZ GSHK", price: 2.25 },
    { name: "Rice Krispie Treat 1.3 OZ", price: 2.20 },
    { name: "Rolaids - 1 Roll", price: 2.95 }
  ],
  "S": [
    { name: "Salt 10 Packets K", price: 0.75 },
    { name: "Saltine Crackers - 1 Sleeve HK", price: 1.65 },
    { name: "Sardines in Oil 3.53 OZ", price: 2.50 },
    { name: "Shabang Chips", price: 2.25 },
    { name: "Shampoo 4 OZ", price: 1.89 },
    { name: "Skittles 2.17OZ", price: 2.75 },
    { name: "Snack Crackers 1 Box 1.86OZ K", price: 5.45 },
    { name: "Snickers Candy Bar", price: 2.75 },
    { name: "Soap - Purple", price: 2.53 },
    { name: "Soap - White", price: 2.53 },
    { name: "Soap Box - Clear #5", price: 1.25 },
    { name: "Sour Cream & Onion Chips 1.5OZ GHK", price: 2.25 },
    { name: "Squeeze Cheese Jalapeno 2 OZ G", price: 2.85 },
    { name: "Squeeze Cheese, Sharp 2 OZ G", price: 2.85 },
    { name: "SS Fruit Punch K", price: 0.55 },
    { name: "SS Lemonade K", price: 0.55 },
    { name: "SS Tea w/Lemon K", price: 0.55 },
    { name: "Stamped Envelope", price: 0.92 },
    { name: "Starburst Original 2.07 OZ", price: 2.75 },
    { name: "Strawberry Creme Wafer SF 2.75OZ", price: 2.75 },
    { name: "Strawberry Danish", price: 2.35 },
    { name: "Sugar 10PK K", price: 1.00 },
    { name: "Sweetener", price: 1.15 }
  ],
  "T": [
    { name: "Tampons - Regular 20CT", price: 15.10 },
    { name: "Toothbrush 30 Tuft 4\" Handle", price: 1.20 },
    { name: "Toothpaste - Clear Ivory Gel Fluoride 4.6OZ", price: 3.45 },
    { name: "Toothpaste - Colgate", price: 2.89 },
    { name: "Toothpaste - Flouride 0.85OZ", price: 3.45 },
    { name: "Toothpaste - Sensitive", price: 6.39 },
    { name: "Tortillas", price: 2.65 },
    { name: "Tumbler with Lid 22 OZ", price: 1.60 },
    { name: "Tuna in Water 4.23OZ", price: 4.00 },
    { name: "Tuna w Jalapenos in Water 3.53OZ", price: 3.75 }
  ],
  "V": [
    { name: "Vanilla Creme Cookies 5 OZ HK", price: 2.11 },
    { name: "Vanilla Dairy Drink SS 10 OZ", price: 1.50 },
    { name: "Vanilla Wafer Bag HK", price: 3.39 },
    { name: "Vienna Sausage Bites", price: 3.29 }
  ],
  "W": [
    { name: "White Cheddar Popcorn 5 OZ", price: 3.25 },
    { name: "White Rain 3-in-1 Ocean Wave 15 OZ", price: 5.50 }
  ]
};

// Function to render products for a specific letter
function renderProductsForLetter(letter, products = null) {
  const productsToRender = products || commissaryProducts[letter] || [];
  if (productsToRender.length === 0) return '';
  
  return productsToRender.map(product => {
    // Escape the product name for use in HTML attributes
    const escapedName = product.name.replace(/'/g, "\\'").replace(/"/g, '\\"');
    
    // Calculate current order total and remaining balance
    const currentSubtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const remainingBalance = 617.94 - currentSubtotal;
    // Check if user can afford at least 1 of this item
    const canAffordItem = remainingBalance >= product.price;
    
    return `
    <forge-card>
      <div class="product-item">
        <div class="item-left">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/No-Image-Placeholder-landscape.svg/1200px-No-Image-Placeholder-landscape.svg.png" alt="${product.name}" />
          <div class="item-details">
            <p class="forge-typography--heading2">${product.name}</p>
            <p class="forge-typography--subheading2" id="price-${product.name.replace(/[^a-zA-Z0-9]/g, '-')}"><span class="item-price">$${product.price.toFixed(2)}</span></p>
          </div>
        </div>
        <div class="item-right">
          ${canAffordItem ? 
            `<forge-button variant="outlined" onclick="showQuantityDialog('${escapedName}', ${product.price})">Add</forge-button>` :
            `<forge-badge theme="error" title="Need $${(product.price - remainingBalance).toFixed(2)} more">Exceeds balance</forge-badge>`
          }
        </div>
      </div>
    </forge-card>
  `;
  }).join('');
}

// Function to render all products or filter by letter
function renderProducts(selectedLetter = 'all', searchTerm = '') {
  const productsContainer = document.getElementById('products-container');
  
  // Filter products based on search term
  let filteredProducts = {};
  
  if (searchTerm.trim() === '') {
    // No search term, show all products or letter-filtered products
    if (selectedLetter === 'all') {
      filteredProducts = commissaryProducts;
    } else {
      filteredProducts[selectedLetter] = commissaryProducts[selectedLetter] || [];
    }
  } else {
    // Search through all products
    const searchLower = searchTerm.toLowerCase();
    Object.keys(commissaryProducts).forEach(letter => {
      const matchingProducts = commissaryProducts[letter].filter(product => 
        product.name.toLowerCase().includes(searchLower)
      );
      if (matchingProducts.length > 0) {
        filteredProducts[letter] = matchingProducts;
      }
    });
  }
  
  // Render the filtered products
  if (Object.keys(filteredProducts).length === 0) {
    productsContainer.innerHTML = `
      <div class="no-results">
        <p class="forge-typography--body1">No products found matching "${searchTerm}"</p>
      </div>
    `;
    return;
  }
  
  let html = '';
  const sortedLetters = Object.keys(filteredProducts).sort();
  
  sortedLetters.forEach(letter => {
    const products = filteredProducts[letter];
    if (products && products.length > 0) {
      html += `
        <div class="category-divider">
          <p class="forge-typography--heading2">${letter}</p>
        </div>
        ${renderProductsForLetter(letter, products)}
      `;
    }
  });
  
  productsContainer.innerHTML = html;
  

}

// Quantity Dialog Functions
let currentQuantityDialogProduct = null;
let currentQuantityDialogPrice = null;

function showQuantityDialog(productName, price) {
  currentQuantityDialogProduct = productName;
  currentQuantityDialogPrice = price;
  
  // Use mobile dialog on mobile devices
  if (window.innerWidth < 1080) {
    // Create a completely new mobile dialog element each time
    createMobileQuantityDialog(productName, price);
  } else {
    // Use regular dialog on desktop
    const dialog = document.getElementById('quantity-selection-dialog');
    if (!dialog) return;
    
    // Populate the dialog with quantity options
    populateQuantityDialog(productName, price);
    
    // Open the dialog
    dialog.open = true;
  }
}

function createMobileQuantityDialog(productName, price) {
  // Remove any existing mobile dialog
  const existingDialog = document.getElementById('mobile-quantity-dialog');
  if (existingDialog) {
    existingDialog.remove();
  }
  
  // Temporarily hide the mobile order sheet to prevent conflicts
  const mobileOrderSheet = document.getElementById('mobile-order-sheet');
  if (mobileOrderSheet) {
    mobileOrderSheet.style.display = 'none';
    mobileOrderSheet.style.visibility = 'hidden';
    mobileOrderSheet.style.opacity = '0';
    mobileOrderSheet.style.pointerEvents = 'none';
  }
  
  // Create new mobile dialog
  const mobileDialog = document.createElement('div');
  mobileDialog.id = 'mobile-quantity-dialog';
  mobileDialog.className = 'mobile-quantity-overlay';
  mobileDialog.style.display = 'flex';
  
  mobileDialog.innerHTML = `
    <div class="mobile-quantity-content">
      <div class="mobile-quantity-header">
        <h2 class="forge-typography--heading3">Add ${productName} to order</h2>
        <forge-icon-button aria-label="Close dialog" onclick="closeMobileQuantityDialog()">
          <forge-icon name="close" external></forge-icon>
        </forge-icon-button>
      </div>
      
      <div class="mobile-quantity-body">
      <p class="forge-typography--subheading3" style="margin: 0px;">Select quantity</p>
        <div class="quantity-options-grid" id="mobile-quantity-options-container">
          <!-- Quantity options will be dynamically generated here -->
        </div>
        
        <div class="custom-quantity-section">
          <h3 class="forge-typography--subheading3">Other quantity</h3>
          <div class="custom-quantity-row">
            <forge-text-field>
              <input type="number" id="mobile-custom-quantity-input" min="1" placeholder="Enter custom quantity">
            </forge-text-field>
            <div class="custom-quantity-total">
              <span class="total-label">Total:</span>
              <span class="total-amount" id="mobile-custom-quantity-total">$0.00</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mobile-quantity-footer">
        <div class="mobile-quantity-balance">
          <div class="quantity-dialog-balance-section">
            <p class="forge-typography--body1">Remaining balance: <span class="balance-amount forge-typography--heading2" id="mobile-quantity-remaining-balance">$617.94</span></p>
            <forge-meter id="mobile-quantity-dialog-meter" max="100" density="small" theme="success"></forge-meter>
          </div>
        </div>
        <div class="mobile-quantity-buttons">
          <forge-button variant="outlined" onclick="closeMobileQuantityDialog()">
            Cancel
          </forge-button>
          <forge-button variant="raised" id="mobile-add-to-order-btn" theme="success">
            Add to order
          </forge-button>
        </div>
      </div>
    </div>
  `;
  
  // Add to document
  document.body.appendChild(mobileDialog);
  
  // Populate the dialog
  populateMobileQuantityDialogContent(productName, price);
  
  // Add click handler to overlay to close dialog when clicking outside
  mobileDialog.addEventListener('click', function(event) {
    if (event.target === mobileDialog) {
      closeMobileQuantityDialog();
    }
  });
  
  // Add keyboard event listener for Escape key
  const handleKeyDown = function(event) {
    if (event.key === 'Escape') {
      closeMobileQuantityDialog();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
  document.addEventListener('keydown', handleKeyDown);
}

function populateMobileQuantityDialogContent(productName, price) {
  const quantityOptionsContainer = document.getElementById('mobile-quantity-options-container');
  const customQuantityInput = document.getElementById('mobile-custom-quantity-input');
  const remainingBalanceElement = document.getElementById('mobile-quantity-remaining-balance');
  const meterElement = document.getElementById('mobile-quantity-dialog-meter');
  
  // Reset dialog state
  resetQuantityDialogState();
  
  if (remainingBalanceElement) {
    // Initialize with current remaining balance (no item selected yet)
    updateMobileDialogRemainingBalance(0);
  }
  
  // Initialize meter with current order state
  if (meterElement) {
    const currentSubtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const initialBalance = 617.94;
    const usedBalance = Math.min(currentSubtotal, initialBalance);
    const meterProgress = Math.round((usedBalance / initialBalance) * 100);
    const clampedValue = Math.max(0, Math.min(100, meterProgress));
    meterElement.value = clampedValue;
  }
  
  // Generate quantity options (1-20)
  if (quantityOptionsContainer) {
    let optionsHtml = '';
    
    // Create 4 rows of 5 options each (left to right)
    for (let row = 0; row < 4; row++) {
      optionsHtml += '<div class="quantity-row">';
      for (let col = 0; col < 5; col++) {
        const i = row * 5 + col + 1;
        const totalPrice = price * i;
        const currentSubtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalAfterAdd = currentSubtotal + totalPrice;
        const remainingBalance = 617.94;
        const isDisabled = totalAfterAdd > remainingBalance;
        
        optionsHtml += `
          <div class="quantity-option ${isDisabled ? 'disabled' : ''}" data-quantity="${i}" data-disabled="${isDisabled}">
            <div class="quantity-option-content">
              <div class="quantity-info">
                <span class="quantity-number">${i}</span>
                <span class="quantity-price">$${totalPrice.toFixed(2)}</span>
              </div>
              <div class="quantity-check-icon" id="mobile-check-${i}">
                <forge-icon name="check_circle" external></forge-icon>
              </div>
            </div>
          </div>
        `;
      }
      optionsHtml += '</div>';
    }
    
    quantityOptionsContainer.innerHTML = optionsHtml;
    
    // Add event listeners to quantity options
    const quantityOptions = quantityOptionsContainer.querySelectorAll('.quantity-option');
    quantityOptions.forEach(option => {
      option.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const quantity = parseInt(this.getAttribute('data-quantity'));
        const isDisabled = this.getAttribute('data-disabled') === 'true';
        
        if (!isDisabled) {
          selectMobileQuantityOption(quantity, isDisabled, event);
        }
      });
    });
    

  }
  
  // Reset custom quantity input
  if (customQuantityInput) {
    customQuantityInput.value = '';
    
    // Initialize the total display
    updateMobileCustomQuantityTotal(0);
    
    // Add event listener to clear check icons when user types
    customQuantityInput.addEventListener('input', function() {
      // Hide all check icons
      const allCheckIcons = document.querySelectorAll('.quantity-check-icon');
      allCheckIcons.forEach(icon => {
        icon.style.display = 'none';
      });
      
      // Remove selected styling from all options
      const allOptions = document.querySelectorAll('.quantity-option');
      allOptions.forEach(option => {
        option.classList.remove('selected');
      });
      
      // Update remaining balance based on custom quantity
      const customQuantity = parseInt(this.value) || 0;
      updateMobileDialogRemainingBalance(customQuantity);
      
      // Update the total cost display
      updateMobileCustomQuantityTotal(customQuantity);
    });
  }
  
  // Add event listener to the mobile Add to Order button
  const mobileAddToOrderBtn = document.getElementById('mobile-add-to-order-btn');
  if (mobileAddToOrderBtn) {
    mobileAddToOrderBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      
      // Call the mobile add function
      addSelectedQuantityToMobileOrder();
    });
  }
}

function selectMobileQuantityOption(quantity, isDisabled, event) {
  if (isDisabled) return;
  
  // Prevent event bubbling
  if (event) {
    event.stopPropagation();
  }
  
  // Hide all check icons first
  const allCheckIcons = document.querySelectorAll('.quantity-check-icon');
  allCheckIcons.forEach(icon => {
    icon.style.display = 'none';
  });
  
  // Show the selected check icon
  const selectedCheckIcon = document.getElementById(`mobile-check-${quantity}`);
  if (selectedCheckIcon) {
    selectedCheckIcon.style.display = 'flex';
  }
  
  // Update the custom quantity input
  const customQuantityInput = document.getElementById('mobile-custom-quantity-input');
  if (customQuantityInput) {
    customQuantityInput.value = quantity;
  }
  
  // Add visual feedback by updating the selected option styling
  const allOptions = document.querySelectorAll('.quantity-option');
  allOptions.forEach(option => {
    option.classList.remove('selected');
  });
  
  const selectedOption = document.querySelector(`.quantity-option[data-quantity="${quantity}"]`);
  if (selectedOption) {
    selectedOption.classList.add('selected');
  }
  
  // Update the remaining balance display
  updateMobileDialogRemainingBalance(quantity);
  
  // Update the custom quantity total display
  updateMobileCustomQuantityTotal(quantity);
}

function updateMobileDialogRemainingBalance(selectedQuantity) {
  const remainingBalanceElement = document.getElementById('mobile-quantity-remaining-balance');
  const meterElement = document.getElementById('mobile-quantity-dialog-meter');
  
  if (!remainingBalanceElement || !currentQuantityDialogPrice) return;
  
  // Calculate current order total
  const currentSubtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate the cost of the selected quantity
  const selectedItemCost = currentQuantityDialogPrice * selectedQuantity;
  
  // Calculate remaining balance after adding this item
  const totalAfterAdd = currentSubtotal + selectedItemCost;
  const remainingBalance = Math.max(0, 617.94 - totalAfterAdd);
  
  // Update the display
  remainingBalanceElement.textContent = `$${remainingBalance.toFixed(2)}`;
  
  // Update the meter value
  if (meterElement) {
    const initialBalance = 617.94;
    const usedBalance = Math.min(totalAfterAdd, initialBalance);
    const meterProgress = Math.round((usedBalance / initialBalance) * 100);
    const clampedValue = Math.max(0, Math.min(100, meterProgress));
    meterElement.value = clampedValue;
  }
  
  // Change color based on whether this would exceed balance
  if (totalAfterAdd > 617.94) {
    remainingBalanceElement.style.color = 'var(--forge-theme-error)';
  } else {
    remainingBalanceElement.style.color = 'var(--forge-theme-success)';
  }
}

function updateMobileCustomQuantityTotal(quantity) {
  const totalElement = document.getElementById('mobile-custom-quantity-total');
  if (!totalElement || !currentQuantityDialogPrice) return;
  
  const totalCost = currentQuantityDialogPrice * quantity;
  totalElement.textContent = `$${totalCost.toFixed(2)}`;
}

function addSelectedQuantityToMobileOrder() {
  if (!currentQuantityDialogProduct || !currentQuantityDialogPrice) {
    return;
  }
  
  const customQuantityInput = document.getElementById('mobile-custom-quantity-input');
  const quantity = parseInt(customQuantityInput.value) || 0;
  
  if (quantity <= 0) {
    alert('Please select a valid quantity.');
    return;
  }
  
  // Calculate if adding this item would exceed the balance
  const currentSubtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const newItemTotal = currentQuantityDialogPrice * quantity;
  const totalSubtotalAfterAdd = currentSubtotal + newItemTotal;
  const totalAfterTax = totalSubtotalAfterAdd; // No sales tax
  const remainingBalance = 617.94;
  
  if (totalAfterTax > remainingBalance) {
    alert(`Cannot add item. This would exceed your remaining balance of $${remainingBalance.toFixed(2)}.`);
    return;
  }
  
  // Check if item already exists in order
  const existingItem = currentOrder.find(item => item.name === currentQuantityDialogProduct);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    currentOrder.push({
      name: currentQuantityDialogProduct,
      price: currentQuantityDialogPrice,
      quantity: quantity
    });
  }
  
  updateOrderDisplay();
  
  // Save order to localStorage
  saveOrderToStorage();
  
  // Show toast notification for added items
  showAddToOrderToast(quantity, currentQuantityDialogProduct);
  
  // Close the mobile dialog by removing it from DOM
  closeMobileQuantityDialog();
}

function populateQuantityDialog(productName, price) {
  const dialogTitle = document.getElementById('quantity-dialog-title');
  const quantityOptionsContainer = document.getElementById('quantity-options-container');
  const customQuantityInput = document.getElementById('custom-quantity-input');
  const remainingBalanceElement = document.getElementById('quantity-dialog-remaining-balance');
  const meterElement = document.getElementById('quantity-dialog-meter');
  
  // Reset dialog state first
  resetQuantityDialogState();
  
  if (dialogTitle) {
    dialogTitle.textContent = `Add ${productName} to order`;
  }
  
  if (remainingBalanceElement) {
    // Initialize with current remaining balance (no item selected yet)
    updateDialogRemainingBalance(0);
  }
  
  // Initialize meter with current order state
  if (meterElement) {
    const currentSubtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const initialBalance = 617.94;
    const usedBalance = Math.min(currentSubtotal, initialBalance);
    const meterProgress = Math.round((usedBalance / initialBalance) * 100);
    const clampedValue = Math.max(0, Math.min(100, meterProgress));
    meterElement.value = clampedValue;
  }
  
  // Generate quantity options (1-20)
  if (quantityOptionsContainer) {
    let optionsHtml = '';
    
    // Create 4 rows of 5 options each (left to right)
    for (let row = 0; row < 4; row++) {
      optionsHtml += '<div class="quantity-row">';
      for (let col = 0; col < 5; col++) {
        const i = row * 5 + col + 1;
        const totalPrice = price * i;
        const currentSubtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalAfterAdd = currentSubtotal + totalPrice;
        const remainingBalance = 617.94;
        const isDisabled = totalAfterAdd > remainingBalance;
        
        optionsHtml += `
          <div class="quantity-option ${isDisabled ? 'disabled' : ''}" data-quantity="${i}" data-disabled="${isDisabled}">
            <div class="quantity-option-content">
              <div class="quantity-info">
                <span class="quantity-number">${i}</span>
                <span class="quantity-price">$${totalPrice.toFixed(2)}</span>
              </div>
              <div class="quantity-check-icon" id="check-${i}">
                <forge-icon name="check_circle" external></forge-icon>
              </div>
            </div>
          </div>
        `;
      }
      optionsHtml += '</div>';
    }
    
    quantityOptionsContainer.innerHTML = optionsHtml;
    
    // Add event listeners to quantity options
    const quantityOptions = quantityOptionsContainer.querySelectorAll('.quantity-option');
    quantityOptions.forEach(option => {
      option.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const quantity = parseInt(this.getAttribute('data-quantity'));
        const isDisabled = this.getAttribute('data-disabled') === 'true';
        
        if (!isDisabled) {
          selectQuantityOption(quantity, isDisabled, event);
        }
      });
    });
    

  }
  
  // Reset custom quantity input
  if (customQuantityInput) {
    customQuantityInput.value = '';
    
    // Initialize the total display
    updateCustomQuantityTotal(0);
    
    // Add event listener to clear check icons when user types
    customQuantityInput.addEventListener('input', function() {
      // Hide all check icons
      const allCheckIcons = document.querySelectorAll('.quantity-check-icon');
      allCheckIcons.forEach(icon => {
        icon.style.display = 'none';
      });
      
      // Remove selected styling from all options
      const allOptions = document.querySelectorAll('.quantity-option');
      allOptions.forEach(option => {
        option.classList.remove('selected');
      });
      
      // Update remaining balance based on custom quantity
      const customQuantity = parseInt(this.value) || 0;
      updateDialogRemainingBalance(customQuantity);
      
      // Update the total cost display
      updateCustomQuantityTotal(customQuantity);
    });
  }
  
  // Add event listener to the Add to Order button
  const addToOrderBtn = document.getElementById('add-to-order-btn');
  if (addToOrderBtn) {
    // Remove any existing listeners
    addToOrderBtn.replaceWith(addToOrderBtn.cloneNode(true));
    
    // Get the new button reference
    const newAddToOrderBtn = document.getElementById('add-to-order-btn');
    newAddToOrderBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      
      // Call the function without event parameter
      addSelectedQuantityToOrder();
    });
  }
}

function selectQuantityOption(quantity, isDisabled, event) {
  if (isDisabled) return;
  
  // Prevent event bubbling
  if (event) {
    event.stopPropagation();
  }
  
  // Hide all check icons first
  const allCheckIcons = document.querySelectorAll('.quantity-check-icon');
  allCheckIcons.forEach(icon => {
    icon.style.display = 'none';
  });
  
  // Show the selected check icon
  const selectedCheckIcon = document.getElementById(`check-${quantity}`);
  if (selectedCheckIcon) {
    selectedCheckIcon.style.display = 'flex';
  }
  
  // Update the custom quantity input
  const customQuantityInput = document.getElementById('custom-quantity-input');
  if (customQuantityInput) {
    customQuantityInput.value = quantity;
  }
  
  // Add visual feedback by updating the selected option styling
  const allOptions = document.querySelectorAll('.quantity-option');
  allOptions.forEach(option => {
    option.classList.remove('selected');
  });
  
  const selectedOption = document.querySelector(`.quantity-option[data-quantity="${quantity}"]`);
  if (selectedOption) {
    selectedOption.classList.add('selected');
  }
  
  // Update the remaining balance display
  updateDialogRemainingBalance(quantity);
  
  // Update the custom quantity total display
  updateCustomQuantityTotal(quantity);
}

function selectQuantity(quantity) {
  // This function is now used for the custom quantity input
  const customQuantityInput = document.getElementById('custom-quantity-input');
  if (customQuantityInput) {
    customQuantityInput.value = quantity;
  }
}

function clearRadioSelection() {
  // Hide all check icons
  const allCheckIcons = document.querySelectorAll('.quantity-check-icon');
  allCheckIcons.forEach(icon => {
    icon.style.display = 'none';
  });
  
  // Remove selected styling from all options
  const allOptions = document.querySelectorAll('.quantity-option');
  allOptions.forEach(option => {
    option.classList.remove('selected');
  });
  
  // Reset remaining balance to original state
  updateDialogRemainingBalance(0);
  
  // Reset custom quantity total
  updateCustomQuantityTotal(0);
}

function updateDialogRemainingBalance(selectedQuantity) {
  const remainingBalanceElement = document.getElementById('quantity-dialog-remaining-balance');
  const meterElement = document.getElementById('quantity-dialog-meter');
  
  if (!remainingBalanceElement || !currentQuantityDialogPrice) return;
  
  // Calculate current order total
  const currentSubtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate the cost of the selected quantity
  const selectedItemCost = currentQuantityDialogPrice * selectedQuantity;
  
  // Calculate remaining balance after adding this item
  const totalAfterAdd = currentSubtotal + selectedItemCost;
  const remainingBalance = Math.max(0, 617.94 - totalAfterAdd);
  
  // Update the display
  remainingBalanceElement.textContent = `$${remainingBalance.toFixed(2)}`;
  
  // Update the meter value
  if (meterElement) {
    const initialBalance = 617.94;
    const usedBalance = Math.min(totalAfterAdd, initialBalance);
    const meterProgress = Math.round((usedBalance / initialBalance) * 100);
    const clampedValue = Math.max(0, Math.min(100, meterProgress));
    meterElement.value = clampedValue;
  }
  
  // Change color based on whether this would exceed balance
  if (totalAfterAdd > 617.94) {
    remainingBalanceElement.style.color = 'var(--forge-theme-error)';
  } else {
    remainingBalanceElement.style.color = 'var(--forge-theme-success)';
  }
}

function updateCustomQuantityTotal(quantity) {
  const totalElement = document.getElementById('custom-quantity-total');
  if (!totalElement || !currentQuantityDialogPrice) return;
  
  const totalCost = currentQuantityDialogPrice * quantity;
  totalElement.textContent = `$${totalCost.toFixed(2)}`;
}

function addSelectedQuantityToOrder(event = null) {
  // Prevent event bubbling to avoid triggering quantity option clicks
  if (event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
  
  if (!currentQuantityDialogProduct || !currentQuantityDialogPrice) return;
  
  const customQuantityInput = document.getElementById('custom-quantity-input');
  const quantity = parseInt(customQuantityInput.value) || 0;
  
  if (quantity <= 0) {
    alert('Please select a valid quantity.');
    return;
  }
  
  // Calculate if adding this item would exceed the balance
  const currentSubtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const newItemTotal = currentQuantityDialogPrice * quantity;
  const totalSubtotalAfterAdd = currentSubtotal + newItemTotal;
  const totalAfterTax = totalSubtotalAfterAdd; // No sales tax
  const remainingBalance = 617.94;
  
  if (totalAfterTax > remainingBalance) {
    alert(`Cannot add item. This would exceed your remaining balance of $${remainingBalance.toFixed(2)}.`);
    return;
  }
  
  // Check if item already exists in order
  const existingItem = currentOrder.find(item => item.name === currentQuantityDialogProduct);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    currentOrder.push({
      name: currentQuantityDialogProduct,
      price: currentQuantityDialogPrice,
      quantity: quantity
    });
  }
  
  updateOrderDisplay();
  
  // Save order to localStorage
  saveOrderToStorage();
  
  // Show toast notification for added items
  showAddToOrderToast(quantity, currentQuantityDialogProduct);
  
    // Force close the dialog using multiple methods
  const dialog = document.getElementById('quantity-selection-dialog');
  if (dialog) {
    // Method 1: Direct property setting
    dialog.open = false;
    
    // Method 2: Dispatch close event
    dialog.dispatchEvent(new Event('close'));
    
    // Method 3: Force close after a small delay
    setTimeout(() => {
      if (dialog.open) {
        dialog.open = false;
      }
    }, 10);
    
    // Method 4: Mobile-specific force close
    if (window.innerWidth < 1080) {
      // Try multiple approaches for mobile
      setTimeout(() => {
        dialog.open = false;
        dialog.style.display = 'none';
        dialog.removeAttribute('open');
      }, 50);
      
      // Additional mobile force close
      setTimeout(() => {
        if (dialog.open || dialog.style.display !== 'none') {
          dialog.open = false;
          dialog.style.display = 'none';
          dialog.removeAttribute('open');
          // Force remove from DOM temporarily
          const parent = dialog.parentNode;
          if (parent) {
            parent.removeChild(dialog);
            setTimeout(() => {
              parent.appendChild(dialog);
            }, 100);
          }
        }
      }, 200);
      
      // Final mobile force close - try to close by clicking outside
      setTimeout(() => {
        if (dialog.open) {
          // Simulate clicking the backdrop
          const backdrop = document.querySelector('.forge-dialog-backdrop');
          if (backdrop) {
            backdrop.click();
          }
          // Force close one more time
          dialog.open = false;
        }
      }, 300);
      
      // Nuclear option - hide the entire dialog container
      setTimeout(() => {
        const dialogContainer = dialog.closest('.forge-dialog-container') || dialog.parentElement;
        if (dialogContainer) {
          dialogContainer.style.display = 'none';
          dialogContainer.style.visibility = 'hidden';
          dialogContainer.style.opacity = '0';
        }
        // Also hide the dialog itself
        dialog.style.display = 'none';
        dialog.style.visibility = 'hidden';
        dialog.style.opacity = '0';
        dialog.style.pointerEvents = 'none';
      }, 400);
    }
  }
  
  // Reset dialog state
  currentQuantityDialogProduct = null;
  currentQuantityDialogPrice = null;
  
  // Clear all selections immediately
  const allCheckIcons = document.querySelectorAll('.quantity-check-icon');
  allCheckIcons.forEach(icon => {
    icon.style.display = 'none';
  });
  
  const allOptions = document.querySelectorAll('.quantity-option');
  allOptions.forEach(option => {
    option.classList.remove('selected');
  });
  
  // Reset custom quantity input
  if (customQuantityInput) {
    customQuantityInput.value = '';
  }
}

// Order management
let currentOrder = [];

// Local storage keys
const ORDER_STORAGE_KEY = 'caddo_commissary_order';
const ORDER_TIMESTAMP_KEY = 'caddo_commissary_order_timestamp';
const ORDER_EXPIRY_HOURS = 24; // Orders expire after 24 hours

// Save order to localStorage
function saveOrderToStorage() {
  try {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(currentOrder));
    localStorage.setItem(ORDER_TIMESTAMP_KEY, Date.now().toString());
    console.log('Order saved to localStorage:', currentOrder);
    
    // Update clear button visibility
    updateClearSavedOrderButton();
  } catch (error) {
    console.error('Error saving order to localStorage:', error);
  }
}

// Load order from localStorage
function loadOrderFromStorage() {
  try {
    const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
    const savedTimestamp = localStorage.getItem(ORDER_TIMESTAMP_KEY);
    
    if (savedOrder && savedTimestamp) {
      const orderAge = Date.now() - parseInt(savedTimestamp);
      const orderAgeHours = orderAge / (1000 * 60 * 60);
      
      // Check if order has expired (older than 24 hours)
      if (orderAgeHours > ORDER_EXPIRY_HOURS) {
        console.log('Saved order has expired, clearing localStorage');
        clearOrderFromStorage();
        return false;
      }
      
      const parsedOrder = JSON.parse(savedOrder);
      if (Array.isArray(parsedOrder)) {
        currentOrder = parsedOrder;
        console.log('Order loaded from localStorage:', currentOrder);
        return true;
      }
    }
  } catch (error) {
    console.error('Error loading order from localStorage:', error);
    clearOrderFromStorage();
  }
  return false;
}

// Clear order from localStorage
function clearOrderFromStorage() {
  try {
    localStorage.removeItem(ORDER_STORAGE_KEY);
    localStorage.removeItem(ORDER_TIMESTAMP_KEY);
    console.log('Order cleared from localStorage');
    
    // Update clear button visibility
    updateClearSavedOrderButton();
  } catch (error) {
    console.error('Error clearing order from localStorage:', error);
  }
}

// Check if there's a saved order on page load
function checkForSavedOrder() {
  const hasSavedOrder = loadOrderFromStorage();
  if (hasSavedOrder && currentOrder.length > 0) {
    // Show a notification that a saved order was found
    showSavedOrderNotification();
  }
}

// Show notification about saved order
function showSavedOrderNotification() {
  const toast = document.createElement('div');
  toast.className = 'custom-toast';
  
  toast.innerHTML = `
    <div class="custom-toast-content">
      <forge-icon name="restore" external></forge-icon>
      <span class="custom-toast-message">Previous order restored from ${formatOrderAge()}</span>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

// Format the age of the saved order
function formatOrderAge() {
  try {
    const savedTimestamp = localStorage.getItem(ORDER_TIMESTAMP_KEY);
    if (savedTimestamp) {
      const orderAge = Date.now() - parseInt(savedTimestamp);
      const orderAgeMinutes = Math.floor(orderAge / (1000 * 60));
      
      if (orderAgeMinutes < 1) {
        return 'just now';
      } else if (orderAgeMinutes < 60) {
        return `${orderAgeMinutes} minute${orderAgeMinutes === 1 ? '' : 's'} ago`;
      } else {
        const orderAgeHours = Math.floor(orderAgeMinutes / 60);
        return `${orderAgeHours} hour${orderAgeHours === 1 ? '' : 's'} ago`;
      }
    }
  } catch (error) {
    console.error('Error formatting order age:', error);
  }
  return 'recently';
}

// Clear saved order function
function clearSavedOrder() {
  if (confirm('Are you sure you want to clear your saved order? This action cannot be undone.')) {
    currentOrder = [];
    clearOrderFromStorage();
    updateOrderDisplay();
    updateClearSavedOrderButton();
    
    // Show confirmation toast
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    
    toast.innerHTML = `
      <div class="custom-toast-content">
        <forge-icon name="delete" external></forge-icon>
        <span class="custom-toast-message">Saved order cleared</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

// Update clear saved order button visibility
function updateClearSavedOrderButton() {
  const clearButton = document.getElementById('clear-saved-order');
  if (clearButton) {
    const hasSavedOrder = localStorage.getItem(ORDER_STORAGE_KEY) !== null;
    clearButton.style.display = hasSavedOrder ? 'flex' : 'none';
  }
}

// This function is now replaced by addSelectedQuantityToOrder()
// Keeping for backward compatibility but it's no longer used
function addToOrder(productName, price) {
  // This function is deprecated - use showQuantityDialog instead
  showQuantityDialog(productName, price);
}



function showMobileOrderDialog() {
  const dialog = document.getElementById('mobile-order-dialog');
  if (dialog) {
    // Update the dialog content
    updateMobileOrderDialog();
    
    // Open the dialog
    dialog.open = true;
  }
}

function closeMobileOrderDialog() {
  const dialog = document.getElementById('mobile-order-dialog');
  if (dialog) {
    dialog.open = false;
  }
}

function updateMobileOrderDialog() {
  const dialogContent = document.querySelector('.mobile-order-dialog-content');
  const dialogTotal = document.getElementById('mobile-dialog-total');
  const mobileSubtotal = document.getElementById('mobile-subtotal');
  const mobileTax = document.getElementById('mobile-tax');
  
  if (!dialogContent || !dialogTotal) return;
  
  if (currentOrder.length === 0) {
    dialogContent.innerHTML = '<p class="forge-typography--body2 order-empty-message">No items in order</p>';
    dialogTotal.textContent = '$0.00';
    if (mobileSubtotal) mobileSubtotal.textContent = '$0.00';
    if (mobileTax) mobileTax.textContent = '$0.00';
    return;
  }
  
  let html = '';
  let subtotal = 0;
  
  currentOrder.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    // Escape the item name for use in HTML attributes
    const escapedName = item.name.replace(/'/g, "\\'").replace(/"/g, '\\"');
    
    html += `
      <div class="order-item">
        <div class="order-item-header">
          <div class="order-item-left">
            <div class="order-item-details">
              <p class="forge-typography--body2 product-name">${item.name}</p>
              <p class="forge-typography--subheading3">$${item.price.toFixed(2)} each</p>
            </div>
          </div>
          <p class="forge-typography--heading2 product-price">$${itemTotal.toFixed(2)}</p>
        </div>
        <div class="order-item-controls">
          <div class="order-item-quantity-controls">
            <forge-icon-button aria-label="Decrease quantity" onclick="decreaseOrderQuantity('${escapedName}')" ${item.quantity <= 1 ? 'disabled' : ''}>
              <forge-icon name="minus" external></forge-icon>
            </forge-icon-button>
            <forge-text-field density="small">
              <input type="number" value="${item.quantity}" min="1" onchange="updateOrderQuantity('${escapedName}', this.value)" oninput="updateOrderQuantity('${escapedName}', this.value)">
            </forge-text-field>
            <forge-icon-button aria-label="Increase quantity" onclick="increaseOrderQuantity('${escapedName}')">
              <forge-icon name="plus" external></forge-icon>
            </forge-icon-button>
          </div>
          <forge-button variant="text" onclick="removeFromOrder('${escapedName}')" class="remove-btn" theme="error">
            Remove
          </forge-button>
        </div>
      </div>
    `;
  });
  
  // Calculate sales tax (0%)
  const salesTax = subtotal * 0.00;
  const orderTotal = subtotal + salesTax;
  
  dialogContent.innerHTML = html;
  dialogTotal.textContent = `$${orderTotal.toFixed(2)}`;
  
  // Update the mobile cost breakdown
  if (mobileSubtotal) mobileSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (mobileTax) mobileTax.textContent = `$${salesTax.toFixed(2)}`;
}

function submitOrder() {
  if (currentOrder.length === 0) {
    alert('No items in order to submit.');
    return;
  }
  
  // Show the confirmation dialog instead of simple confirm
  showOrderConfirmationDialog();
}

function updateOrderDisplay() {
  const orderContainer = document.querySelector('aside');
  const totalElement = document.getElementById('order-total');
  const mobileOrderTotal = document.getElementById('mobile-order-total');
  const mobileRemainingBalance = document.getElementById('mobile-remaining-balance');
  const headerMeter = document.getElementById('meter');
  const headerRemainingBalance = document.querySelector('.header-card-right .balance-amount');
  const clearOrderBtn = document.querySelector('.clear-order-btn');
  const drawerSubtotal = document.getElementById('drawer-subtotal');
  const drawerTax = document.getElementById('drawer-tax');
  const itemCountElement = document.querySelector('.item-count');
  
  // Re-render products to update the "exceeds balance" badges
  renderProducts(currentSelectedLetter, currentSearchTerm);
  
  if (currentOrder.length === 0) {
    const emptyMessage = '<p class="forge-typography--body2 order-empty-message">No items in order</p>';
    if (orderContainer) orderContainer.innerHTML = emptyMessage;
    if (totalElement) totalElement.textContent = '$0.00';
    if (mobileOrderTotal) mobileOrderTotal.textContent = '$0.00';
    if (mobileRemainingBalance) mobileRemainingBalance.textContent = '$617.94';
    if (headerRemainingBalance) headerRemainingBalance.textContent = '$617.94';
    if (headerMeter) headerMeter.value = 0;
    if (clearOrderBtn) clearOrderBtn.style.display = 'none';
    if (drawerSubtotal) drawerSubtotal.textContent = '$0.00';
    if (drawerTax) drawerTax.textContent = '$0.00';
    if (itemCountElement) itemCountElement.textContent = '0 items';
    
    // Hide mobile order dialog when no items
    const mobileOrderDialog = document.getElementById('mobile-order-sheet');
    if (mobileOrderDialog) {
      mobileOrderDialog.open = false;
    }
    return;
  }
  
  // Show clear order button when there are items
  if (clearOrderBtn) clearOrderBtn.style.display = 'flex';
  
  // Show mobile order dialog when there are items
  const mobileOrderDialog = document.getElementById('mobile-order-sheet');
  if (mobileOrderDialog) {
    mobileOrderDialog.open = true;
  }
  
  let html = '';
  let total = 0;
  let totalItems = 0;
  
  currentOrder.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    totalItems += item.quantity;
    
    // Escape the item name for use in HTML attributes
    const escapedName = item.name.replace(/'/g, "\\'").replace(/"/g, '\\"');
    
    html += `
      <div class="order-item">
        <div class="order-item-header">
          <p class="forge-typography--body1 product-name">${item.name}</p>
          <p class="forge-typography--heading2 product-price">$${itemTotal.toFixed(2)}</p>
        </div>
        <div class="order-item-controls">
          <div class="order-item-quantity-controls">
            <forge-icon-button aria-label="Decrease quantity" onclick="decreaseOrderQuantity('${escapedName}')" ${item.quantity <= 1 ? 'disabled' : ''}>
              <forge-icon name="minus" external></forge-icon>
            </forge-icon-button>
            <forge-text-field density="extra-small">
              <input type="number" value="${item.quantity}" min="1" onchange="updateOrderQuantity('${escapedName}', this.value)" oninput="updateOrderQuantity('${escapedName}', this.value)">
            </forge-text-field>
            <forge-icon-button aria-label="Increase quantity" onclick="increaseOrderQuantity('${escapedName}')">
              <forge-icon name="plus" external></forge-icon>
            </forge-icon-button>
          </div>
          <forge-button variant="text" onclick="removeFromOrder('${escapedName}')" class="remove-btn" theme="error">
            Remove
          </forge-button>
        </div>
      </div>
    `;
  });
  
  // Calculate sales tax and total
  const salesTax = total * 0.00;
  const orderTotal = total + salesTax;
  
  const totalText = `$${orderTotal.toFixed(2)}`;
  const remainingBalance = Math.max(0, 617.94 - orderTotal);
  
  // Calculate meter progress based on used balance (including tax)
  // Meter should show the percentage of balance used, not remaining
  const initialBalance = 617.94;
  const usedBalance = Math.min(orderTotal, initialBalance);
  const meterProgress = Math.round((usedBalance / initialBalance) * 100);
  
  if (orderContainer) orderContainer.innerHTML = html;
  if (totalElement) totalElement.textContent = totalText;
  if (mobileOrderTotal) mobileOrderTotal.textContent = `$${orderTotal.toFixed(2)}`;
  if (mobileRemainingBalance) mobileRemainingBalance.textContent = `$${remainingBalance.toFixed(2)}`;
  if (headerRemainingBalance) headerRemainingBalance.textContent = `$${remainingBalance.toFixed(2)}`;
  
  // Update drawer tax and subtotal information
  if (drawerSubtotal) drawerSubtotal.textContent = `$${total.toFixed(2)}`;
  if (drawerTax) drawerTax.textContent = `$${salesTax.toFixed(2)}`;
  
  // Update item count in drawer header
  if (itemCountElement) {
    const itemText = totalItems === 1 ? '1 item' : `${totalItems} items`;
    itemCountElement.textContent = itemText;
  }
  
  // Update header meter - ensure it's a number and clamp to 0-100
  if (headerMeter) {
    const clampedValue = Math.max(0, Math.min(100, meterProgress));
    headerMeter.value = clampedValue;
  }
  
  // Update mobile dialog if it's open
  const mobileDialog = document.getElementById('mobile-order-dialog');
  if (mobileDialog && mobileDialog.open) {
    updateMobileOrderDialog();
  }
  
  // Re-render products to update badges after a small delay to ensure order updates are complete
  setTimeout(() => {
    renderProducts(currentSelectedLetter, currentSearchTerm);
  }, 50);
  
  // Ensure mobile order sheet state is correct for current screen size
  if (window.innerWidth < 1080) {
    handleDrawerVisibility();
  }
}

function removeFromOrder(productName) {
  currentOrder = currentOrder.filter(item => item.name !== productName);
  updateOrderDisplay();
  
  // Save order to localStorage
  saveOrderToStorage();
}

// New functions for order quantity management
function increaseOrderQuantity(productName) {
  const item = currentOrder.find(item => item.name === productName);
  if (!item) return;
  
      // Calculate if increasing would exceed balance (no sales tax)
    const currentSubtotal = currentOrder.reduce((sum, orderItem) => {
      if (orderItem.name === productName) {
        return sum + (orderItem.price * (orderItem.quantity + 1));
      }
      return sum + (orderItem.price * orderItem.quantity);
    }, 0);
    
    const totalAfterTax = currentSubtotal; // No sales tax
    const remainingBalance = 617.94;
    
    if (totalAfterTax > remainingBalance) {
      alert(`Cannot increase quantity. This would exceed your remaining balance of $${remainingBalance.toFixed(2)}.`);
      return;
    }
  
  item.quantity += 1;
  updateOrderDisplay();
  
  // Save order to localStorage
  saveOrderToStorage();
}

function decreaseOrderQuantity(productName) {
  const item = currentOrder.find(item => item.name === productName);
  if (!item || item.quantity <= 1) return;
  
  item.quantity -= 1;
  updateOrderDisplay();
  
  // Save order to localStorage
  saveOrderToStorage();
}

function updateOrderQuantity(productName, newQuantity) {
  const item = currentOrder.find(item => item.name === productName);
  if (!item) return;
  
  const quantity = parseInt(newQuantity) || 1;
  if (quantity < 1) {
    // Reset to 1 if invalid input
    item.quantity = 1;
    updateOrderDisplay();
    return;
  }
  
      // Calculate if the new quantity would exceed balance (no sales tax)
    const currentSubtotal = currentOrder.reduce((sum, orderItem) => {
      if (orderItem.name === productName) {
        return sum + (orderItem.price * quantity);
      }
      return sum + (orderItem.price * orderItem.quantity);
    }, 0);
    
    const totalAfterTax = currentSubtotal; // No sales tax
    const remainingBalance = 617.94;
    
    if (totalAfterTax > remainingBalance) {
      alert(`Cannot set quantity to ${quantity}. This would exceed your remaining balance of $${remainingBalance.toFixed(2)}.`);
      // Reset to previous valid quantity
      updateOrderDisplay();
      return;
    }
  
  item.quantity = quantity;
  updateOrderDisplay();
  
  // Save order to localStorage
  saveOrderToStorage();
}

function clearOrder() {
  if (confirm('Are you sure you want to clear your entire order?')) {
    currentOrder = [];
    updateOrderDisplay();
    
    // Clear order from localStorage
    clearOrderFromStorage();
  }
}

// Custom toast notification for adding items to order
function showAddToOrderToast(quantity, productName) {
  // Create custom toast element
  const toast = document.createElement('div');
  toast.className = 'custom-toast';
  
  // Set toast content
  toast.innerHTML = `
    <div class="custom-toast-content">
      <forge-icon name="check_circle" external></forge-icon>
      <span class="custom-toast-message">${quantity} ${quantity === 1 ? 'item' : 'items'} added to order</span>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(toast);
  
  // Debug: Log toast creation
  console.log('Toast created for mobile:', window.innerWidth < 1080);
  console.log('Toast element:', toast);
  console.log('Toast in DOM:', document.body.contains(toast));
  
  // Show the toast with animation
  setTimeout(() => {
    toast.classList.add('show');
    console.log('Toast shown, classes:', toast.className);
    console.log('Toast visible:', toast.offsetHeight > 0);
    
    // Fallback: If toast is not visible after 100ms, show alert
    setTimeout(() => {
      if (toast.offsetHeight === 0 || toast.offsetWidth === 0) {
        console.log('Toast not visible, showing alert fallback');
        alert(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to order`);
      }
    }, 100);
  }, 10);
  
  // Remove toast after duration
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
        console.log('Toast removed');
      }
    }, 300); // Wait for fade out animation
  }, 3000);
}

// Global variables for current state
let currentSelectedLetter = 'all';
let currentSearchTerm = '';

// Order Confirmation Dialog Functions
function showOrderConfirmationDialog() {
  const dialog = document.getElementById('order-confirmation-dialog');
  if (!dialog) return;
  
  // Populate the confirmation dialog with current order data
  populateConfirmationDialog();
  
  // Open the dialog
  dialog.open = true;
}

function closeOrderConfirmationDialog() {
  const dialog = document.getElementById('order-confirmation-dialog');
  if (dialog) {
    dialog.open = false;
  }
}

function populateConfirmationDialog() {
  // Calculate order totals
  const subtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const salesTax = subtotal * 0.00;
  const orderTotal = subtotal + salesTax;
  const remainingBalance = 617.94 - orderTotal;
  
  // Set current date
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Update order date
  const orderDateElement = document.getElementById('order-date');
  if (orderDateElement) {
    orderDateElement.textContent = dateString;
  }
  
  // Update remaining balance
  const remainingBalanceElement = document.getElementById('remaining-balance-confirmation');
  if (remainingBalanceElement) {
    remainingBalanceElement.textContent = `$${remainingBalance.toFixed(2)}`;
  }
  
  // Update order details
  const subtotalElement = document.getElementById('confirmation-subtotal');
  const taxElement = document.getElementById('confirmation-tax');
  const totalElement = document.getElementById('confirmation-total');
  
  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  if (taxElement) taxElement.textContent = `$${salesTax.toFixed(2)}`;
  if (totalElement) totalElement.textContent = `$${orderTotal.toFixed(2)}`;
  
  // Populate order items
  const itemsListElement = document.getElementById('confirmation-items-list');
  if (itemsListElement) {
    let itemsHtml = '';
    
    currentOrder.forEach(item => {
      const itemTotal = item.price * item.quantity;
      itemsHtml += `
        <div class="confirmation-item">
          <div class="confirmation-item-name">${item.name}</div>
          <div class="confirmation-item-details">
            <div class="confirmation-item-quantity">Qty: ${item.quantity}</div>
            <div class="confirmation-item-price">$${itemTotal.toFixed(2)}</div>
          </div>
        </div>
      `;
    });
    
    itemsListElement.innerHTML = itemsHtml;
  }
}

function confirmAndSubmitOrder() {
  // Here you would typically send the order to your backend
  // For now, we'll show a success message
  
  // Close the confirmation dialog
  closeOrderConfirmationDialog();
  
  // Show success message
  showOrderSuccessMessage();
  
  // Clear the order
  currentOrder = [];
  updateOrderDisplay();
  updateMobileOrderDialog();
  
  // Clear order from localStorage
  clearOrderFromStorage();
  
  // Close mobile dialog if open
  const mobileDialog = document.getElementById('mobile-order-dialog');
  if (mobileDialog && mobileDialog.open) {
    mobileDialog.open = false;
  }
}

function showOrderSuccessMessage() {
  // Create success toast
  const toast = document.createElement('div');
  toast.className = 'custom-toast';
  
  toast.innerHTML = `
    <div class="custom-toast-content">
      <forge-icon name="check_circle" external></forge-icon>
      <span class="custom-toast-message">Order submitted successfully!</span>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

// Full screen functionality
function requestFullScreen() {
  const elem = document.documentElement;
  
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { // Safari
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE11
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { // Safari
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE11
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement && 
      !document.webkitFullscreenElement && 
      !document.msFullscreenElement && 
      !document.mozFullScreenElement) {
    requestFullScreen();
  } else {
    exitFullScreen();
  }
}

// Check if full screen is supported
function isFullScreenSupported() {
  return document.fullscreenEnabled || 
         document.webkitFullscreenEnabled || 
         document.msFullscreenEnabled || 
         document.mozFullScreenEnabled;
}

// Update full screen button state
function updateFullScreenButtonState() {
  const fullscreenToggle = document.getElementById('fullscreen-toggle');
  if (!fullscreenToggle) return;
  
  const isFullScreen = !!(document.fullscreenElement || 
                         document.webkitFullscreenElement || 
                         document.msFullscreenElement || 
                         document.mozFullScreenElement);
  
  const icon = fullscreenToggle.querySelector('forge-icon');
  if (icon) {
    icon.name = isFullScreen ? 'fullscreen_exit' : 'fullscreen';
  }
  
  // Disable button if full screen is not supported
  if (!isFullScreenSupported()) {
    fullscreenToggle.disabled = true;
    fullscreenToggle.title = 'Full screen not supported';
  } else {
    fullscreenToggle.disabled = false;
    fullscreenToggle.title = isFullScreen ? 'Exit full screen' : 'Enter full screen';
  }
}

function closeQuantityDialog() {
  const dialog = document.getElementById('quantity-selection-dialog');
  if (dialog) {
    dialog.open = false;
  }
  
  // Reset dialog state
  currentQuantityDialogProduct = null;
  currentQuantityDialogPrice = null;
  
  // Clear any selected states
  const allCheckIcons = document.querySelectorAll('.quantity-check-icon');
  allCheckIcons.forEach(icon => {
    icon.style.display = 'none';
  });
  
  const allOptions = document.querySelectorAll('.quantity-option');
  allOptions.forEach(option => {
    option.classList.remove('selected');
  });
  
  // Reset custom quantity input
  const customQuantityInput = document.getElementById('custom-quantity-input');
  if (customQuantityInput) {
    customQuantityInput.value = '';
  }
}

function closeMobileQuantityDialog() {
  const mobileDialog = document.getElementById('mobile-quantity-dialog');
  
  if (mobileDialog) {
    // Method 1: Try to remove from DOM
    try {
      mobileDialog.remove();
    } catch (error) {
      console.log('Error removing dialog:', error);
    }
    
    // Method 2: Fallback - hide with CSS
    if (document.body.contains(mobileDialog)) {
      mobileDialog.style.display = 'none';
      mobileDialog.style.visibility = 'hidden';
      mobileDialog.style.opacity = '0';
      mobileDialog.style.pointerEvents = 'none';
      mobileDialog.style.zIndex = '-1';
      
      // Method 3: Force remove after a delay
      setTimeout(() => {
        if (document.body.contains(mobileDialog)) {
          try {
            mobileDialog.remove();
          } catch (error) {
            console.log('Error in force remove:', error);
          }
        }
      }, 100);
    }
  }
  
  // Restore the mobile order sheet
  const mobileOrderSheet = document.getElementById('mobile-order-sheet');
  
  if (mobileOrderSheet) {
    mobileOrderSheet.style.display = '';
    mobileOrderSheet.style.visibility = '';
    mobileOrderSheet.style.opacity = '';
    mobileOrderSheet.style.pointerEvents = '';
    
    // Ensure it's open if there are items in the order
    if (currentOrder && currentOrder.length > 0) {
      mobileOrderSheet.open = true;
    }
  }
  
  // Reset dialog state
  currentQuantityDialogProduct = null;
  currentQuantityDialogPrice = null;
  
  // Clear any selected states
  const allCheckIcons = document.querySelectorAll('.quantity-check-icon');
  allCheckIcons.forEach(icon => {
    icon.style.display = 'none';
  });
  
  const allOptions = document.querySelectorAll('.quantity-option');
  allOptions.forEach(option => {
    option.classList.remove('selected');
  });
  
  // Reset custom quantity input
  const mobileCustomQuantityInput = document.getElementById('mobile-custom-quantity-input');
  if (mobileCustomQuantityInput) {
    mobileCustomQuantityInput.value = '';
  }
}

// Handle responsive drawer behavior
function handleDrawerVisibility() {
  const drawer = document.querySelector('forge-drawer');
  const mobileOrderDialog = document.getElementById('mobile-order-sheet');
  const isSmallScreen = window.innerWidth < 1080;
  
  if (isSmallScreen) {
    // Hide drawer on small screens
    if (drawer) {
      drawer.style.display = 'none';
    }
    // Show mobile order dialog only when there are items
    if (mobileOrderDialog) {
      mobileOrderDialog.style.display = 'block';
      // Always check current order state when switching to mobile
      if (currentOrder && currentOrder.length > 0) {
        mobileOrderDialog.open = true;
      } else {
        mobileOrderDialog.open = false;
      }
    }
  } else {
    // Show drawer on large screens
    if (drawer) {
      drawer.style.display = '';
    }
    // Hide mobile order dialog on large screens
    if (mobileOrderDialog) {
      mobileOrderDialog.style.display = 'none';
      mobileOrderDialog.open = false; // Close it if it was open
    }
  }
}

// Full screen functionality
function requestFullScreen() {
  const elem = document.documentElement;
  
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { // Safari
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE11
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { // Safari
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE11
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement && 
      !document.webkitFullscreenElement && 
      !document.msFullscreenElement && 
      !document.mozFullScreenElement) {
    requestFullScreen();
  } else {
    exitFullScreen();
  }
}

// Check if full screen is supported
function isFullScreenSupported() {
  return document.fullscreenEnabled || 
         document.webkitFullscreenEnabled || 
         document.msFullscreenEnabled || 
         document.mozFullScreenEnabled;
}

// Update full screen button state
function updateFullScreenButtonState() {
  const fullscreenToggle = document.getElementById('fullscreen-toggle');
  if (!fullscreenToggle) return;
  
  const isFullScreen = !!(document.fullscreenElement || 
                         document.webkitFullscreenElement || 
                         document.msFullscreenElement || 
                         document.mozFullScreenElement);
  
  const icon = fullscreenToggle.querySelector('forge-icon');
  if (icon) {
    icon.name = isFullScreen ? 'fullscreen_exit' : 'fullscreen';
  }
  
  // Disable button if full screen is not supported
  if (!isFullScreenSupported()) {
    fullscreenToggle.disabled = true;
    fullscreenToggle.title = 'Full screen not supported';
  } else {
    fullscreenToggle.disabled = false;
    fullscreenToggle.title = isFullScreen ? 'Exit full screen' : 'Enter full screen';
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Set initial full screen button state
  updateFullScreenButtonState();
  
  // Don't automatically request full screen on page load
  // Users should manually trigger full screen if they want it
  
  // Render all products initially
  renderProducts();

  // Check for saved order and load it if available
  checkForSavedOrder();
  
  // Initialize order display (will show saved order if available)
  updateOrderDisplay();
  
  // Initialize clear saved order button visibility
  updateClearSavedOrderButton();
  
  // Ensure "All" category is selected by default
  setTimeout(() => {
    const allChip = document.querySelector('#category-chips forge-chip[value="all"]');
    if (allChip) {
      allChip.selected = true;
    }
  }, 50);
  
  // Add search functionality
  const searchInput = document.querySelector('.order-search-field input[type="search"]');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentSearchTerm = this.value;
      
      // Auto-select "All" category when searching
      if (currentSearchTerm.trim() !== '') {
        selectCategory('all');
      } else {
        // When search is cleared, ensure "All" is selected
        selectCategory('all');
      }
      
      renderProducts(currentSelectedLetter, currentSearchTerm);
    });
  }
  
  // Initial check
  handleDrawerVisibility();
  
  // Listen for window resize
  window.addEventListener('resize', handleDrawerVisibility);
  
  // Add keyboard shortcuts for full screen
  document.addEventListener('keydown', function(event) {
    // F11 key to toggle full screen
    if (event.key === 'F11') {
      event.preventDefault();
      toggleFullScreen();
    }
    // Escape key to exit full screen
    if (event.key === 'Escape' && (document.fullscreenElement || 
                                   document.webkitFullscreenElement || 
                                   document.msFullscreenElement || 
                                   document.mozFullScreenElement)) {
      exitFullScreen();
    }
  });
  
  // Listen for full screen changes
  document.addEventListener('fullscreenchange', handleFullScreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
  document.addEventListener('msfullscreenchange', handleFullScreenChange);
  document.addEventListener('mozfullscreenchange', handleFullScreenChange);
  
  function handleFullScreenChange() {
    // Update the full screen toggle button state
    updateFullScreenButtonState();
    
    const isFullScreen = !!(document.fullscreenElement || 
                           document.webkitFullscreenElement || 
                           document.msFullscreenElement || 
                           document.mozFullScreenElement);
    
    // You can add any additional logic here when full screen state changes
    console.log('Full screen state changed:', isFullScreen);
  }
  
  // Update category chip functionality
  const chipSet = document.getElementById('category-chips');
  const chips = chipSet.querySelectorAll('forge-chip');
  
  chips.forEach(chip => {
    chip.addEventListener('click', function(event) {
      event.stopPropagation();
      
      const selectedValue = this.value;
      selectCategory(selectedValue);
    });
  });
  
  // Function to select a category and update UI
  function selectCategory(categoryValue) {
    // Prevent infinite recursion by checking if already selected
    if (currentSelectedLetter === (categoryValue === 'all' ? 'all' : categoryValue.toUpperCase())) {
      return;
    }
    
    // Deselect all chips using a more direct approach
    chips.forEach(c => {
      if (c.selected) {
        c.removeAttribute('selected');
      }
    });
    
    // Find and select the target chip
    const targetChip = Array.from(chips).find(chip => chip.value === categoryValue);
    if (targetChip) {
      targetChip.setAttribute('selected', '');
    }
    
    // Update current selection
    currentSelectedLetter = categoryValue === 'all' ? 'all' : 
                           categoryValue.toUpperCase();
    
    // Render products with current selection and search term
    renderProducts(currentSelectedLetter, currentSearchTerm);
  }
});