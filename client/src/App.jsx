import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Header from './components/header/Header';
import Home from './home/Home';
import Protected from './Protected/Protected';
import Order from './order/Order';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import HowItWorks from './components/howitwork/Howitwork';
import ResetPassword from './auth/ResetPassword';
import Product from './product/Product';
import Cart from './cart/Cart'; // Make sure to import the Cart component

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevItems, product];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <>
      <Header cartItems={cartItems} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/howitwork" element={<HowItWorks />} />
        <Route element={<Protected />}>
          <Route path="/order" element={<Order />} />
        </Route>
        
        <Route 
          path="/products" 
          element={<Product addToCart={addToCart} />} 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cartItems={cartItems} 
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          } 
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;