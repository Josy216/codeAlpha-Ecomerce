import pool from '../config/db.js';

const DeleteUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({
      success: false,
      message: '❌ Email and name are required',
    });
  }

  try {
    const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: '❌ User not found',
      });
    }

    const user = results[0];

    if (user.name !== name) {
      return res.status(403).json({
        success: false,
        message: '❌ Name does not match. Cannot proceed.',
      });
    }

    // Delete the user
    await pool.query('DELETE FROM users WHERE email = ?', [email]);

    console.log(`✅ Deleted user: ${email}`);

    res.status(200).json({
      success: true,
      message: `✅ User with email ${email} has been deleted`,
    });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: '❌ Unexpected server error',
    });
  }
};

export { DeleteUser };
