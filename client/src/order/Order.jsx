import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './order.css';

function Order() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="order-renamed__container">
      <h1 className="order-renamed__title">Your Order Summary</h1>
      
      {cartItems.length === 0 ? (
        <div className="order-renamed__empty">
          <p className="order-renamed__empty-text">No items in your order</p>
          <Link to="/products" className="order-renamed__shop-btn">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="order-renamed__items-list">
            {cartItems.map(item => (
              <div key={item.id} className="order-renamed__item-card">
                <div className="order-renamed__item-image-wrapper">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="order-renamed__item-img"
                  />
                </div>
                <div className="order-renamed__item-content">
                  <h2 className="order-renamed__item-title">{item.title}</h2>
                  <div className="order-renamed__item-price">${item.price.toFixed(2)}</div>
                  <div className="order-renamed__item-qty">Quantity: {item.quantity}</div>
                  <div className="order-renamed__item-subtotal">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="order-renamed__total-summary">
            <h2 className="order-renamed__summary-title">Order Total</h2>
            <div className="order-renamed__summary-row">
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="order-renamed__summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="order-renamed__summary-row order-renamed__summary-row--total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="order-renamed__action-buttons">
            <button className="order-renamed__checkout-btn">Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Order;