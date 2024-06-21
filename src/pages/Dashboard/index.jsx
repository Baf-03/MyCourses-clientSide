// src/components/Dashboard.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;


const Dashboard = () => {

    const [loading,setLoading]=useState(true)
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try{
                const resp = await axios.get(`${apiUrl}/api/fetchcourses`);
                setCourses(resp.data.data); 
                setFilteredCourses(resp.data.data);
                setLoading(false)
            }
           catch(err){
            console.log(err)
           }
        }
        getData();
    }, []);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = courses.filter(course =>
            course.name.toLowerCase().includes(lowerCaseQuery) ||
            course.instructor.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredCourses(filtered);
    }, [searchQuery, courses]);

    return (
        <>
        {loading?(<div className="flex justify-center w-100 h-[90vh] items-center">
    loading...
        </div>
):(<div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Course Dashboard</h2>
            <input
                type="text"
                placeholder="Search by course name or instructor"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-6 p-2 border rounded w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                    <Link to={`/course/${course._id}`} key={course._id} className="bg-white shadow-md rounded-lg p-4">
                        <img src={course.thumbnail} alt={course.name} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                            <p className="text-gray-700 mb-2"><strong>Description: </strong>{course.description}</p>
                            <p className="text-gray-700 mb-2"><strong>Instructor:</strong> {course.instructor}</p>
                            <p className="text-gray-700 mb-2"><strong>Duration:</strong> {course.duration}</p>
                            <p className="text-gray-700 mb-2"><strong>Status:</strong> {course.enrollmentStatus}</p>
                            <p className="underline text-blue-500">More details</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>)}
        </>
        
    );
};

export default Dashboard;
