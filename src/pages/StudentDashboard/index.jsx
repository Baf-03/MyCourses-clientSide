// src/components/StudentDashboard.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Bounce, toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_API_URL;

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const userEmail = useSelector((state) => state.userReducer.email);
  const navigate =useNavigate()
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.post(`${apiUrl}/api/enrolled-courses`,  { email: userEmail });
        setEnrolledCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };
    if (userEmail) {
      fetchEnrolledCourses();
    }
    else{
      toast('login to see enrolled courses', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        })
      navigate("/")
    }
  }, [userEmail]);

  return (
    <>
    {enrolledCourses?.length>0?( <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Enrolled Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        
        {enrolledCourses.map(course => (
          <Link key={course._id} to={`/course/${course._id}`} className="bg-white shadow-md rounded-lg p-4">
            <img src={course.thumbnail} alt={course.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{course.name}</h3>
              <p className="text-gray-700 mb-2">{course.description}</p>
              <p className="text-gray-700 mb-2"><strong>Instructor:</strong> {course.instructor}</p>
              <p className="text-gray-700 mb-2"><strong>Duration:</strong> {course.duration}</p>
              <p className="text-gray-700 mb-2"><strong>Location:</strong> {course.location}</p>
              <p className="text-gray-700 mb-2"><strong>Status:</strong> {course.enrollmentStatus}</p>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(course.students.find(student => student.email === userEmail).progress.filter(Boolean).length / course.syllabus.length) * 100}%` }}></div>
              </div>
              <p className="text-gray-700 mt-2">{course.students.find(student => student.email === userEmail).progress.filter(Boolean).length} of {course.syllabus.length} weeks completed</p>
            </div>
          </Link>
        ))}
      </div>
    </div>):(<div className='flex justify-center items-center h-[90vh] '><img src="https://i.pinimg.com/564x/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.jpg" alt=""  /></div>)}
    </>
    
   
  );
};

export default StudentDashboard;
