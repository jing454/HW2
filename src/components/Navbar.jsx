import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../cart/CartContext';

export default function Navbar() {
  const { itemCount } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClassName = ({ isActive }) => (isActive ? 'shade active' : 'shade');

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="navbar">
      <div className="navbar-bar">
        <Link className="mobile-logo" to="/Home">
          <img src="/assets/logo.png" alt="Logo" width="50" height="50" />
          <span>Restaurant X</span>
        </Link>

        <div className="navbar-actions">
          <Link className="mobile-cart-link" to="/Cart" aria-label={`Cart with ${itemCount} items`}>
            <i className="fas fa-shopping-cart" />
            {itemCount > 0 ? <span className="cart-badge">{itemCount}</span> : null}
          </Link>

          <button
            type="button"
            className="hamburger"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(currentValue => !currentValue)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <ul className={isMenuOpen ? 'open' : ''}>
        <li className="logo desktop-logo">
          <Link to="/Home">
            <img src="/assets/logo.png" alt="Logo" width="50" height="50" />
            <span>Restaurant X</span>
          </Link>
        </li>
        <li><NavLink className={linkClassName} to="/Home">Home</NavLink></li>
        <li><NavLink className={linkClassName} to="/Menu">Menu</NavLink></li>
        <li><NavLink className={linkClassName} to="/Gallery">Gallery</NavLink></li>
        <li><NavLink className={linkClassName} to="/Contact">Contact</NavLink></li>
        <li className="desktop-cart-item">
          <NavLink className={linkClassName} to="/Cart">
            <i className="fas fa-shopping-cart" /> Cart
            {itemCount > 0 ? <span className="cart-badge">{itemCount}</span> : null}
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
