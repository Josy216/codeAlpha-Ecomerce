import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log('Validation failed - missing fields');
    return res.status(400).json({ 
      success: false,
      message: 'All fields are required' 
    });
  }

  try {
    console.log(`Attempting to register user: ${email}`);

    // Check if user exists
    const [existingUsers] = await pool.query(
      'SELECT email FROM users WHERE email = ?', 
      [email]
    );

    if (existingUsers.length > 0) {
      console.log('Registration failed - user already exists');
      return res.status(409).json({ 
        success: false,
        message: 'Email already registered' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    
const hashPassword = await bcrypt.hash(password, salt);
console.log('Generated hash:', hashPassword); 

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users(name, email, password) VALUES (?, ?, ?)',
      [name, email, hashPassword]
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: result.insertId,
        email: email
      },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1d' }
    );

    console.log(`✅ User registered successfully: ${email}`);
    return res.status(201).json({ 
      success: true,
      message: 'Registration successful!',
      token: token,
      user: {
        id: result.insertId,
        name: name,
        email: email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false,
      message: error.message || 'Internal server error' 
    });
  }
};

export { register };