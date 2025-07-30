import express from 'express';
const route = express.Router();
import db from '../config/db.js'; 
import bcrypt from 'bcrypt';
import { install } from '../controllers/install.js';

route.get('/install', install);

route.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const usersData = `INSERT INTO users(name, email, password) VALUES (?, ?, ?)`;

    db.query(usersData, [name, email, hashPassword], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Registration failed' });
      }

      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Hashing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export { route };
