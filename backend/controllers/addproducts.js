import pool from '../config/db.js';

// Add product
const addproducts = async (req, res) => {
    const { title, description, price, image } = req.body;
    
    // Validate required fields
    if (!title || !description || !price || !image) {
        return res.status(400).json({
            success: false,
            msg: 'Please fill all fields'
        });
    }

    // Validate price is a valid number
    if (isNaN(price) || parseFloat(price) <= 0) {
        return res.status(400).json({
            success: false,
            msg: 'Price must be a positive number'
        });
    }

    try {
        const productData = `INSERT INTO products (title, description, price, image) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.query(productData, [title, description, price, image]);
        
        res.status(201).json({
            success: true,
            msg: 'Product added successfully',
            productId: result.insertId
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({
            success: false,
            msg: 'Error occurred while adding product',
            error: err.message
        });
    }
};

// Get all products
const getproducts = async (req, res) => {
    try {
        const [products] = await pool.query('SELECT * FROM products');
        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({
            success: false,
            msg: 'Error fetching products',
            error: err.message
        });
    }
};

// Get single product
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                msg: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            product: product[0]
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({
            success: false,
            msg: 'Error fetching product',
            error: err.message
        });
    }
};

// Update product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, image } = req.body;
    
    try {
        const [result] = await pool.query(
            'UPDATE products SET title = ?, description = ?, price = ?, image = ? WHERE id = ?',
            [title, description, price, image, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                msg: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            msg: 'Product updated successfully'
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({
            success: false,
            msg: 'Error updating product',
            error: err.message
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                msg: 'Product not found'
            });
        }
        
        res.status(200).json({
            success: true,
            msg: 'Product deleted successfully'
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({
            success: false,
            msg: 'Error deleting product',
            error: err.message
        });
    }
};

export { addproducts, getproducts, getProductById, updateProduct, deleteProduct };