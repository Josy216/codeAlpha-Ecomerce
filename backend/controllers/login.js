import pool from '../config/db.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: '❌ Email and password are required'
    });
  }

  try {
    const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      console.log(`error `);
      
      return res.status(404).json({
        success: false,
        message: '❌ User not found'
      });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
console.log(`Comparing:`, {
  inputPassword: password,
  storedHash: user.password,
  matchResult: isMatch
});

console.log(`password here: ${user.password}`);

    
    if (!isMatch) {
      console.log(`password did not match `);
      return res.status(401).json({
        success: false,
        message: '❌ Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'jocode_secret_key',
      { expiresIn: '1d' }
    );

    console.log(`✅ Logged in: ${email}`);
    res.status(200).json({
      success: true,
      message: `✅ Welcome back ${user.name}`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: '❌ Unexpected server error'
    });
  }
};

export { login };