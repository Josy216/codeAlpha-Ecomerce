import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Course.module.css';
import { ScaleLoader } from "react-spinners";


function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://backend-codealpha-3.onrender.com/api/products');
        setCourses(response.data.products);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  const handleEdit = (course) => {
    navigate(`/edit-products/${course.id}`, { state: { product: course } });
  };

  const confirmDelete = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://backend-codealpha-3.onrender.com/api/products/${courseToDelete.id}`);
      setCourses(courses.filter(course => course.id !== courseToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      setError('Failed to delete course');
      console.log(err);
    }
  };

  if (loading) return <div className={styles.loading}><ScaleLoader/></div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Confirm Delete</h3>
            <p className={styles.modalMessage}>Are you sure you want to delete "{courseToDelete.title}"?</p>
            <div className={styles.modalButtons}>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmButton}
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{textAlign:'right'}}>
        <Link to='/add-products' ><button 
                  className={styles.editButton}>Add Course</button></Link>
      </div>
      <h1 className={styles.header}>Available Courses</h1>
      <div className={styles.grid}>
        {courses.map((course) => (
          <div key={course.id} className={styles.card}>
            <img 
              src={course.image} 
              alt={course.title} 
              className={styles.image} 
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x169';
              }}
            />
            <h2 className={styles.title}>{course.title}</h2>
            <p className={styles.description}>{course.description}</p>
            <div className={styles.footer}>
              <span className={styles.price}>${parseFloat(course.price).toFixed(2)}</span>
              <div className={styles.actions}>
                <button 
                  className={styles.enrollButton}
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  Enroll Now
                </button>
                <button 
                  className={styles.editButton}
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => confirmDelete(course)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course;