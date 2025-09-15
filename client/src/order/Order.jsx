import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './order.css';

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const items = location.state?.cartItems || savedCartItems;
    setCartItems(items);
    saveCartToStorage(items);
  }, [location.state]);

  const saveCartToStorage = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = () => {
    // In a real app, you would send this to your backend
    const orderData = {
      items: cartItems,
      total: calculateTotal(),
      date: new Date().toISOString(),
      status: 'pending'
    };

    // Save order to localStorage (simulating database)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart and show confirmation
    localStorage.removeItem('cartItems');
    setCartItems([]);
    setOrderPlaced(true);
    navigate('/')
  };

  if (orderPlaced) {
    return (
      <div className="order-renamed__container">
        <h1 className="order-renamed__title">Order Confirmation</h1>
        <div className="order-renamed__success">
          <p>Your order has been placed successfully!</p>
          <p>Thank you for shopping with us.</p>
          <div className="order-renamed__action-buttons">
            <Link to="/products" className="order-renamed__shop-btn">
              Continue Shopping
            </Link>
            <Link to="/orders" className="order-renamed__orders-btn">
              View Your Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <div key={`${item.id}-${item.size || 'none'}`} className="order-renamed__item-card">
                <div className="order-renamed__item-image-wrapper">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="order-renamed__item-img"
                    onError={(e) => {
                      e.target.src = '/placeholder-product.png'; // Fallback image
                    }}
                  />
                </div>
                <div className="order-renamed__item-content">
                  <h2 className="order-renamed__item-title">{item.title}</h2>
                  {item.size && <div className="order-renamed__item-size">Size: {item.size}</div>}
                  {item.color && <div className="order-renamed__item-color">Color: {item.color}</div>}
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
            <button 
              className="order-renamed__checkout-btn"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
      
          </div>
        </>
      )}
    </div>
  );
}

export default Order;