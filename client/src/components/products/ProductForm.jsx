import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styles from './productform.module.css';

function ProductForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditMode) {
      if (location.state?.product) {
        setFormData(location.state.product);
      } else {
        const fetchProduct = async () => {
          try {
            const res = await axios.get(`https://backend-codealpha-3.onrender.com/api/products/${id}`);
            setFormData(res.data.product);
          } catch (err) {
            console.error(err);
            setError('Failed to fetch product data');
          }
        };
        fetchProduct();
      }
    }
  }, [id, isEditMode, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditMode) {
        await axios.put(`https://backend-codealpha-3.onrender.com/api/products/${id}`, formData);
        setSuccess('Course updated successfully!');
      } else {
        await axios.post(`https://backend-codealpha-3.onrender.com/api/products`, formData);
        setSuccess('Course added successfully!');
      }

      setTimeout(() => {
        navigate('/course');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.msg || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {isEditMode ? 'Edit Course' : 'Add New Course'}
        </h2>

        {error && (
          <div className={styles.alertError}>
            <span className={styles.closeBtn} onClick={() => setError('')}>&times;</span>
            {error}
          </div>
        )}

        {success && (
          <div className={styles.alertSuccess}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="Enter course title"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
              required
              placeholder="Enter course description"
              rows="4"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Price ($)</label>
            <input
              type="number"
              name="price"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="0.00"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div className={styles.imagePreview}>
                <img
                  src={formData.image}
                  alt="Preview"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                {isEditMode ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              isEditMode ? 'Update Course' : 'Add Course'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
