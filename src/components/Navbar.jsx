// src/components/Navbar.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isVerified, updateEmail } from '../state/userSlice';

const Navbar = () => {
    const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const {email,verified}= useSelector((state)=>state.userReducer)
console.log(email,verified)
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">CourseApp</div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white">Dashboard</Link>
          <Link to="/createcourse" className="text-white">Create Course</Link>
          <Link to="/student-dashboard" className="text-white">My Courses</Link>
          {email?(<div onClick={()=>
            {
                localStorage.removeItem("token");
                dispatch(updateEmail(null));
                dispatch(isVerified(false));

            }}>Logout</div>):(<><Link to="/auth/login" className="text-white">Login</Link>
            <Link to="/auth/register" className="text-white">Signup</Link></>)}
          
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block text-white">Dashboard</Link>
          <Link to="/createcourse" className="block text-white">Create Course</Link>
          <Link to="/student-dashboard" className="block text-white">My Courses</Link>
          <Link to="/auth/login" className="block text-white">Login</Link>
          <Link to="/auth/register" className="block text-white">Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
