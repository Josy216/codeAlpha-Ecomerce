import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from "react-spinners";
import styles from './Course.module.css';

function UserCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  if (loading) return <div className={styles.loading}><ScaleLoader /></div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCourses;
