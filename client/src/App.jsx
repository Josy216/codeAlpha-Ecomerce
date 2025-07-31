import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import Header from './components/header/Header';
import Home from './home/Home';
import Protected from './Protected/Protected';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;