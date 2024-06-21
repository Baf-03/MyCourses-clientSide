import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const apiUrl = import.meta.env.VITE_API_URL;

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState([]);
  const {email}= useSelector((state)=>state.userReducer)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getcourse/${id}`);
        setCourse(response.data);

        const student = response.data.students.find(student => student.email === email);
        if (student) {
          setIsEnrolled(true);
          setProgress(student.progress);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [id, email]);

  const handleEnroll = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/enroll/${id}`, { email });
      setCourse(response.data);
      setIsEnrolled(true);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleProgressChange = async (weekIndex) => {
    const updatedProgress = [...progress];
    updatedProgress[weekIndex] = !updatedProgress[weekIndex];

    setProgress(updatedProgress);

    try {
      await axios.post(`${apiUrl}/api/updateprogress/${id}`, { email, progress: updatedProgress });
      if (updatedProgress.every(Boolean)) {
        await axios.post(`${apiUrl}/api/completecourse/${id}`, { email });
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const completedWeeks = progress.filter(Boolean).length;
  const totalWeeks = course.syllabus.length;
  const progressPercentage = (completedWeeks / totalWeeks) * 100;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{course.name}</h2>
      <img src={course.thumbnail} alt={course.name} className="w-full h-64 object-cover rounded mb-4" />
      <p className="text-gray-700 mb-2"><strong>Instructor:</strong> {course.instructor}</p>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {course.description}</p>
      <p className="text-gray-700 mb-2"><strong>Enrollment Status:</strong> {course.enrollmentStatus}</p>
      <p className="text-gray-700 mb-2"><strong>Duration:</strong> {course.duration}</p>
      <p className="text-gray-700 mb-2"><strong>Schedule:</strong> {course.schedule}</p>
      <p className="text-gray-700 mb-2"><strong>Location:</strong> {course.location}</p>
      <p className="text-gray-700 mb-2"><strong>Prerequisites:</strong> {course.prerequisites.join(', ')}</p>
      <details className="text-gray-700 mb-4">
        <summary className="font-bold cursor-pointer">Syllabus</summary>
        {course.syllabus.map((week, index) => (
          <div key={index} className="ml-4 mt-2">
            <div className="flex items-center mb-2">
              {isEnrolled && (
                <>
                  <input
                    id={`week-${index}`}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-green-500"
                    checked={progress[index] || false}
                    onChange={() => handleProgressChange(index)}
                  />
                  <label htmlFor={`week-${index}`} className="ml-2 text-gray-700">
                    <strong>Week {week.week}:</strong> {week.topic}
                  </label>
                </>
              )}
              {!isEnrolled && (
                <label className="ml-2 text-gray-700">
                  <strong>Week {week.week}:</strong> {week.topic}
                </label>
              )}
            </div>
            <p className="ml-8 text-gray-600">{week.content}</p>
          </div>
        ))}
      </details>
      {isEnrolled && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <p className="text-gray-700 mt-2">{completedWeeks} of {totalWeeks} weeks completed</p>
        </div>
      )}
      {email ? (
        <>
          {!isEnrolled && (
            <button
              onClick={handleEnroll}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              Enroll in this Course
            </button>
          )}
        </>
      ) : (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => navigate("/auth/login")}
        >
          Login to Enroll in this Course
        </button>
      )}
    </div>
  );
};

export default CourseDetails;
