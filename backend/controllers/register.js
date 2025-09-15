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

const getallUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email FROM users');  
    return res.status(200).json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  } 
};

const edituser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body; 
  if (!name || !email) {
    return res.status(400).json({ 
      success: false,
      message: 'Name and email are required' 
    });
  }
  try {
    const [result] = await pool.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const deleteuser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    } 
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  }
  catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};



export { register, getallUsers, edituser, deleteuser };