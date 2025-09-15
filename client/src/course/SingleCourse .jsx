import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import singleCourseStyles from './SingleCourse.module.css';

import { ScaleLoader } from "react-spinners";
function SingleCourse() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://backend-codealpha-3.onrender.com/api/products/${id}`);
        setCourse(response.data.product);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch course');
        setLoading(false);
        console.log(err);
      }
    };
    fetchCourse();
  }, [id]);

  const handlePurchase = () => {
    navigate('/');
  };

  if (loading) return <div className={singleCourseStyles.loading}><ScaleLoader /></div>;
  if (error) return <div className={singleCourseStyles.error}>{error}</div>;
  if (!course) return <div className={singleCourseStyles.error}>Course not found</div>;

  return (
    <div className={singleCourseStyles.container}>
      <div className={singleCourseStyles.card}>
        <img 
          src={course.image} 
          alt={course.title} 
          className={singleCourseStyles.image}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x225';
          }}
        />
        <div className={singleCourseStyles.details}>
          <h1 className={singleCourseStyles.title}>{course.title}</h1>
          <p className={singleCourseStyles.description}>{course.description}</p>
          <div className={singleCourseStyles.instructor}>
            <img 
              src="/josy.jpg"
              style={{objectFit:'contain', background:'#deeffd'}}
              alt="Instructor"
              className={singleCourseStyles.instructorImage}
            />
            <div>
              <h3 className={singleCourseStyles.instructorName}>Course Instructor</h3>
              <p className={singleCourseStyles.instructorTitle}>Joseph Teka</p>
            </div>
          </div>
          <div className={singleCourseStyles.purchase}>
            <span className={singleCourseStyles.price}>${parseFloat(course.price).toFixed(2)}</span>
            <button 
              className={singleCourseStyles.buyButton}
              onClick={handlePurchase}
            >
              Buy Now
            </button>
          </div>
        </div>
        <button 
          className={singleCourseStyles.backButton}
          onClick={() => navigate('/course')}
        >
          Back to Courses
        </button>
      </div>
    </div>
  );
}

export default SingleCourse;