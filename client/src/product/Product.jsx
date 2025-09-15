import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './Product.css';
import { ScaleLoader } from "react-spinners";
function Product({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data = await response.json();
        setProducts(data.products);
        
        const initialQuantities = {};
        data.products.forEach(product => {
          initialQuantities[product.id] = 0;
        });
        setQuantities(initialQuantities);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      (prev + 1) % selectedProduct.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const incrementQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const decrementQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0)
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      addToCart({
        ...product,
        quantity: quantity
      });
      setQuantities(prev => ({
        ...prev,
        [product.id]: 0
      }));
    }
  };

  if (loading) {
    return (
      <div className="product-container">
        <h1>Jocode Products</h1>
        <div className="loading"><ScaleLoader /></div>
      </div>
    );
  }

  return (
    <div className="product-container">
      <h1>Jocode Products</h1>
      
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="product-image" 
              onClick={() => openModal(product)}
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <div className="product-rating">
              Rating: {product.rating} ({product.stock} in stock)
            </div>
            
            <div className="quantity-controls">
              <button 
                className="quantity-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  decrementQuantity(product.id);
                }}
                disabled={!quantities[product.id]}
              >
                <FaMinus />
              </button>
              <span className="quantity-display">{quantities[product.id] || 0}</span>
              <button 
                className="quantity-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  incrementQuantity(product.id);
                }}
              >
                <FaPlus />
              </button>
            </div>
            
            <button 
              className="add-to-cart"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              disabled={!quantities[product.id]}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>{selectedProduct.title}</h2>
            
            <div className="modal-image-container">
              <div className="main-image-wrapper">
                <img 
                  src={selectedProduct.images[currentImageIndex]} 
                  alt={selectedProduct.title} 
                  className="modal-main-image" 
                />
                <button className="image-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
                <button className="image-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
              </div>
              
              <div className="thumbnail-gallery">
                {selectedProduct.images.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`${selectedProduct.title} ${index + 1}`}
                    className={`modal-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); selectImage(index); }}
                  />
                ))}
              </div>
            </div>
            
            <div className="modal-details">
              <p><strong>Price:</strong> ${selectedProduct.price} 
                {selectedProduct.discountPercentage > 0 && (
                  <span className="discount"> ({selectedProduct.discountPercentage}% off)</span>
                )}
              </p>
              <p><strong>Rating:</strong> {selectedProduct.rating} ⭐ ({selectedProduct.stock} in stock)</p>
              <p><strong>Brand:</strong> {selectedProduct.brand}</p>
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              
              <div className="modal-description">
                <h3>Description</h3>
                <p>{selectedProduct.description}</p>
              </div>
            </div>
            
            <div className="modal-quantity-controls">
              <button 
                className="quantity-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  decrementQuantity(selectedProduct.id);
                }}
                disabled={!quantities[selectedProduct.id]}
              >
                <FaMinus />
              </button>
              <span className="quantity-display">
                {quantities[selectedProduct.id] || 0}
              </span>
              <button 
                className="quantity-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  incrementQuantity(selectedProduct.id);
                }}
              >
                <FaPlus />
              </button>
            </div>
            
          
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;