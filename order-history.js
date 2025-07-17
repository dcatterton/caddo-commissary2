// Sample order data - in a real application, this would come from a database
const orderHistoryData = {
  "Aug 17, 2025": {
    items: [
      { name: "Acetaminophen – 325MG 2PK", price: 1.25, quantity: 2 },
      { name: "All-Stars Candy 3.75OZ", price: 2.75, quantity: 1 },
      { name: "Andy's Hot Fries", price: 2.25, quantity: 3 },
      { name: "Baby Oil 4 OZ", price: 1.95, quantity: 1 },
      { name: "Beef Barbacoa 6 OZ", price: 4.50, quantity: 2 },
      { name: "Beef Stew 11.25 OZ", price: 3.75, quantity: 1 },
      { name: "Bic Single Blade Razor", price: 1.25, quantity: 1 },
      { name: "Boston Best Coffee 3 OZ", price: 1.50, quantity: 1 },
      { name: "Brush", price: 1.25, quantity: 1 },
      { name: "Buffalo Wings Blue Chz Chips 1.5OZ K", price: 2.25, quantity: 1 },
      { name: "Cappuccino", price: 1.50, quantity: 2 },
      { name: "Cereal Bowl w/Lid 24 OZ", price: 6.99, quantity: 1 }
    ],
    total: 54.23
  },
  "Aug 8, 2025": {
    items: [
      { name: "Cheese Cracker", price: 1.25, quantity: 2 },
      { name: "Checkers Set", price: 3.00, quantity: 1 },
      { name: "Cheesy Rice Spicy", price: 1.15, quantity: 1 },
      { name: "Cheetos Flamin Hot 1.7OZ G", price: 2.25, quantity: 1 },
      { name: "Cheez Its 1.5 OZ K", price: 2.25, quantity: 1 },
      { name: "Chicken Breast", price: 4.50, quantity: 1 },
      { name: "Chili No Beans 11.25 OZ", price: 3.75, quantity: 1 },
      { name: "Choc Chip Cookie - Mini 6OZ HK", price: 2.75, quantity: 1 },
      { name: "Cinnamon Roll 4OZ", price: 2.35, quantity: 1 }
    ],
    total: 24.91
  },
  "Jul 28, 2025": {
    items: [
      { name: "Dandruff Shampoo 4 OZ", price: 1.89, quantity: 2 },
      { name: "Danish Blueberry", price: 2.35, quantity: 1 },
      { name: "Denture Adhesive Cream", price: 2.75, quantity: 1 },
      { name: "Deodorant - Sport", price: 1.95, quantity: 1 },
      { name: "Deodorant - Suave 1.2 OZ", price: 1.95, quantity: 1 },
      { name: "Dominoes", price: 3.00, quantity: 1 },
      { name: "Doritos Nacho Cheese 1.75 OZ", price: 2.25, quantity: 2 },
      { name: "Duplex Creme Cookies 5OZ HK", price: 2.11, quantity: 1 },
      { name: "Fish Steaks in LA Hot Sauce 3.53 OZ HK", price: 2.50, quantity: 1 },
      { name: "Foot Cream - Ath 1% Tolnaftate 0.5OZ", price: 3.45, quantity: 1 },
      { name: "Fritos Chili Cheese", price: 2.25, quantity: 1 },
      { name: "Gatorade Fruit Punch Drink Mix 7.5 OZ", price: 1.50, quantity: 2 },
      { name: "Glazed Honey Bun 3.5OZ", price: 2.35, quantity: 1 },
      { name: "Gummi Worms Sour 4.5OZ", price: 2.75, quantity: 1 },
      { name: "Hair Food - Lusti 4OZ", price: 1.95, quantity: 1 },
      { name: "Honey Grade A Pure 12 OZ K GK", price: 3.95, quantity: 1 },
      { name: "Hot Sauce 10 Packets", price: 0.75, quantity: 2 },
      { name: "Ibuprofen (2PK)", price: 1.25, quantity: 1 },
      { name: "Iced Honey Bun 6OZ", price: 2.35, quantity: 1 },
      { name: "Iced Oatmeal Cookies 6OZ HK", price: 2.75, quantity: 1 },
      { name: "Jalapeno Sliced 1 OZ GS", price: 1.30, quantity: 1 },
      { name: "Jolly Ranchers Assorted 3.7 oz", price: 2.37, quantity: 1 },
      { name: "Lemon Discs 4.5oz", price: 2.40, quantity: 1 }
    ],
    total: 71.52
  }
};

let currentReorderItems = [];

function openReorderDrawer(orderDate, itemCount, orderTotal) {
  const drawer = document.getElementById('reorder-drawer');
  const itemsContainer = document.getElementById('reorder-items-container');
  const reorderTotal = document.getElementById('reorder-total');
  const reorderSubtotal = document.getElementById('reorder-subtotal');
  const reorderTax = document.getElementById('reorder-tax');
  
  if (!drawer || !itemsContainer) return;
  
  // Get the order data for this date
  const orderData = orderHistoryData[orderDate];
  if (!orderData) {
    console.error('Order data not found for date:', orderDate);
    return;
  }
  
  currentReorderItems = [...orderData.items];
  
  // Render the order items
  let html = '';
  let subtotal = 0;
  
  orderData.items.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
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
            <forge-icon-button aria-label="Decrease quantity" onclick="decreaseReorderQuantity('${escapedName}')" ${item.quantity <= 1 ? 'disabled' : ''}>
              <forge-icon name="minus" external></forge-icon>
            </forge-icon-button>
            <forge-text-field density="extra-small">
              <input type="number" value="${item.quantity}" min="1" onchange="updateReorderQuantity('${escapedName}', this.value)" oninput="updateReorderQuantity('${escapedName}', this.value)">
            </forge-text-field>
            <forge-icon-button aria-label="Increase quantity" onclick="increaseReorderQuantity('${escapedName}')">
              <forge-icon name="plus" external></forge-icon>
            </forge-icon-button>
          </div>
          <forge-button variant="text" onclick="removeReorderItem('${escapedName}')" class="remove-btn" theme="error">
            <forge-icon slot="start" name="remove" external></forge-icon>
            Remove
          </forge-button>
        </div>
      </div>
    `;
  });
  
  // Calculate sales tax and total
  const salesTax = subtotal * 0.09;
  const total = subtotal + salesTax;
  
  itemsContainer.innerHTML = html;
  reorderTotal.textContent = `$${total.toFixed(2)}`;
  reorderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  reorderTax.textContent = `$${salesTax.toFixed(2)}`;
  
  // Open the drawer
  drawer.open = true;
}

function closeReorderDrawer() {
  const drawer = document.getElementById('reorder-drawer');
  if (drawer) {
    drawer.open = false;
  }
}

function increaseReorderQuantity(productName) {
  const item = currentReorderItems.find(item => item.name === productName);
  if (!item) return;
  
  item.quantity += 1;
  updateReorderDisplay();
}

function decreaseReorderQuantity(productName) {
  const item = currentReorderItems.find(item => item.name === productName);
  if (!item || item.quantity <= 1) return;
  
  item.quantity -= 1;
  updateReorderDisplay();
}

function updateReorderQuantity(productName, newQuantity) {
  const item = currentReorderItems.find(item => item.name === productName);
  if (!item) return;
  
  const quantity = parseInt(newQuantity) || 1;
  if (quantity < 1) {
    item.quantity = 1;
  } else {
    item.quantity = quantity;
  }
  
  updateReorderDisplay();
}

function removeReorderItem(productName) {
  currentReorderItems = currentReorderItems.filter(item => item.name !== productName);
  updateReorderDisplay();
}

function updateReorderDisplay() {
  const itemsContainer = document.getElementById('reorder-items-container');
  const reorderTotal = document.getElementById('reorder-total');
  const reorderSubtotal = document.getElementById('reorder-subtotal');
  const reorderTax = document.getElementById('reorder-tax');
  
  if (!itemsContainer || !reorderTotal) return;
  
  if (currentReorderItems.length === 0) {
    itemsContainer.innerHTML = '<p class="forge-typography--body2 order-empty-message">No items in reorder</p>';
    reorderTotal.textContent = '$0.00';
    reorderSubtotal.textContent = '$0.00';
    reorderTax.textContent = '$0.00';
    return;
  }
  
  // Re-render the items with updated quantities
  let html = '';
  let subtotal = 0;
  
  currentReorderItems.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
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
            <forge-icon-button aria-label="Decrease quantity" onclick="decreaseReorderQuantity('${escapedName}')" ${item.quantity <= 1 ? 'disabled' : ''}>
              <forge-icon name="minus" external></forge-icon>
            </forge-icon-button>
            <forge-text-field density="small">
              <input type="number" value="${item.quantity}" min="1" onchange="updateReorderQuantity('${escapedName}', this.value)" oninput="updateReorderQuantity('${escapedName}', this.value)">
            </forge-text-field>
            <forge-icon-button aria-label="Increase quantity" onclick="increaseReorderQuantity('${escapedName}')">
              <forge-icon name="plus" external></forge-icon>
            </forge-icon-button>
          </div>
          <forge-button variant="text" onclick="removeReorderItem('${escapedName}')" class="remove-btn" theme="error">
            <forge-icon slot="start" name="remove" external></forge-icon>
            Remove
          </forge-button>
        </div>
      </div>
    `;
  });
  
  // Calculate sales tax and total
  const salesTax = subtotal * 0.09;
  const total = subtotal + salesTax;
  
  itemsContainer.innerHTML = html;
  reorderTotal.textContent = `$${total.toFixed(2)}`;
  reorderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  reorderTax.textContent = `$${salesTax.toFixed(2)}`;
}

function addReorderToCart() {
  if (currentReorderItems.length === 0) {
    alert('No items to add to cart.');
    return;
  }
  
  const subtotal = currentReorderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const salesTax = subtotal * 0.09;
  const total = subtotal + salesTax;
  
  if (confirm(`Add ${currentReorderItems.length} items to your cart for $${total.toFixed(2)}?`)) {
    // Here you would typically add the items to the current order
    // For now, we'll just show a success message
    alert('Items added to cart successfully!');
    
    // Close the drawer
    closeReorderDrawer();
    
    // Reset the reorder items
    currentReorderItems = [];
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Any initialization code can go here
  console.log('Order history page loaded');
}); 