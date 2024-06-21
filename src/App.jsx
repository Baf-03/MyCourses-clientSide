import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup/Signup";
import AuthRoute from "./Routes/authRoute";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
    <ToastContainer />
    <Navbar/>
      <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />

        <Route path="/createcourse" element={"u dont have rights to create course"} />
        {/* <Route path="/createcourse" element={<CreateCourse />} /> */}
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
