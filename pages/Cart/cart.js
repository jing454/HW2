// Shopping Cart Management System

class ShoppingCart {
    constructor() {
        this.cartKey = 'restaurantCart';
        this.cart = this.loadCart();
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const savedCart = localStorage.getItem(this.cartKey);
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (e) {
            console.error('Error loading cart:', e);
            return [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
            this.updateCartIcon();
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }

    // Add item to cart
    addItem(id, name, price) {
        price = parseFloat(price);
        const existingItem = this.cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.showNotification(`${name} added to cart!`);
        renderCartIfOnPage();
    }

    // Remove item from cart
    removeItem(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
    }

    // Update item quantity
    updateQuantity(id, quantity) {
        const item = this.cart.find(item => item.id === id);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(id);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    // Clear entire cart
    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    // Get cart items
    getItems() {
        return this.cart;
    }

    // Get cart total
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get item count
    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }


// Update cart icon in navbar
updateCartIcon() {
    const cartLink = document.querySelector('a[href="../Cart/cart.html"]');
    if (!cartLink) return;

    const count = this.getItemCount();

    let badge = cartLink.querySelector('.cart-badge');

    if (count > 0) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            cartLink.appendChild(badge);
        }
        badge.textContent = count;
    } else if (badge) {
        badge.remove();
    }
}
}
// Create global cart instance
const cart = new ShoppingCart();

// Render cart items on cart page
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    if (!cartItemsContainer) return;

    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartItems = cart.getItems();

    cartItemsContainer.style.display = 'block';
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'flex';

        const summary = document.querySelector('.cart-summary');
        if (summary) summary.style.display = 'none';

        updateOrderSummary();
        return;
    }

    if (emptyCartMessage) emptyCartMessage.style.display = 'none';

    const summary = document.querySelector('.cart-summary');
    if (summary) summary.style.display = 'block';

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const itemTotal = (item.price * item.quantity).toFixed(2);

        cartItem.innerHTML = `
            <div class="item-info">
                <h3>${item.name}</h3>
                <p class="item-price">$${parseFloat(item.price).toFixed(2)}</p>
            </div>

            <div class="item-controls">
                <div class="quantity-control">
                    <button class="qty-btn minus-btn">-</button>
                    <input type="number" class="qty-input" value="${item.quantity}" min="1">
                    <button class="qty-btn plus-btn">+</button>
                </div>

                <p class="item-total">$${itemTotal}</p>

                <button class="btn-remove remove-btn">
                    Remove
                </button>
            </div>
        `;

        cartItem.querySelector('.minus-btn').addEventListener('click', () => {
            updateQty(item.id, item.quantity - 1);
        });

        cartItem.querySelector('.plus-btn').addEventListener('click', () => {
            updateQty(item.id, item.quantity + 1);
        });

        cartItem.querySelector('.qty-input').addEventListener('change', (e) => {
            updateQty(item.id, parseInt(e.target.value) || 1);
        });

        cartItem.querySelector('.remove-btn').addEventListener('click', () => {
            removeFromCart(item.id);
        });

        cartItemsContainer.appendChild(cartItem);
    });

    updateOrderSummary();
}

// Handle quantity change from input
function handleQtyChange(input) {
    const itemId = input.getAttribute('data-item-id');
    const newQuantity = parseInt(input.value) || 0;
    updateQty(itemId, newQuantity);
}

// Update quantity
function updateQty(itemId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) {
        removeFromCart(itemId);
    } else {
        cart.updateQuantity(itemId, newQuantity);
        renderCart();
    }
}

// Remove from cart
function removeFromCart(itemId) {
    cart.removeItem(itemId);
    renderCart();
}

// Update order summary with prices
function updateOrderSummary() {
    const subtotal = cart.getTotal();
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toFixed(2);
    if (taxEl) taxEl.textContent = '$' + tax.toFixed(2);
    if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
}

// Render cart if on cart page
function renderCartIfOnPage() {
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

// Initialize cart on page load
function initCartPage() {
    cart.updateCartIcon();

    if (document.getElementById('cartItemsContainer')) {
        renderCart();

        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear your cart?')) {
                    cart.clearCart();
                    renderCart();
                }
            });
        }

        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                const total = cart.getTotal() * 1.1;
                alert(`Proceeding to checkout. Total: $${total.toFixed(2)}`);
            });
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCartPage);
} else {
    initCartPage();
}