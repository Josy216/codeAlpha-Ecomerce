import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Header from './components/header/Header';
import Home from './home/Home';
import Protected from './Protected/Protected';
import Order from './order/Order';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Protected />}>
          <Route path="/order" element={<Order />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;