import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../cart/CartContext';

export default function CartPage() {
  const { cartItems, clearCart, removeItem, subtotal, updateQuantity } = useCart();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = () => {
    window.alert(`Proceeding to checkout. Total: $${total.toFixed(2)}`);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  return (
    <main>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <i className="fas fa-shopping-cart" />
          <p>Your cart is empty</p>
          <Link to="/Menu" className="btn-continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <section className="cart-items-section">
            <h2>Your Items</h2>
            <div className="cart-items">
              {cartItems.map(item => {
                const itemTotal = item.price * item.quantity;

                return (
                  <article className="cart-item" key={item.id}>
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="item-controls">
                      <div className="quantity-control">
                        <button className="qty-btn minus-btn" type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <input
                          type="number"
                          className="qty-input"
                          value={item.quantity}
                          min="1"
                          onChange={event => updateQuantity(item.id, Number(event.target.value) || 1)}
                        />
                        <button className="qty-btn plus-btn" type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>

                      <p className="item-total">${itemTotal.toFixed(2)}</p>

                      <button className="btn-remove remove-btn" type="button" onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-content">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span id="subtotal">${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%):</span>
                <span id="tax">${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span id="total">${total.toFixed(2)}</span>
              </div>
              <button id="checkoutBtn" className="btn-checkout" type="button" onClick={handleCheckout}>Proceed to Checkout</button>
              <button id="clearCartBtn" className="btn-clear" type="button" onClick={handleClearCart}>Clear Cart</button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
