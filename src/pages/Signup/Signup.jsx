import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import zxcvbn from 'zxcvbn';
const apiUrl = import.meta.env.VITE_API_URL;
const Signup = () => {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData((prev) => ({
      ...prev,
      email,
    }));

    if (!validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Invalid email format',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: '',
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData((prev) => ({
      ...prev,
      password,
    }));

    const result = zxcvbn(password);
    setPasswordStrength(result.score);

    if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password must be at least 8 characters long',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: '',
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log('submit howa');

    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email.');
      return;
    }

    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    try{
        const loginRsp = await axios.post(`${apiUrl}/api/signup`,formData)
        console.log(loginRsp);
        toast.success(`user Created Now Login`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        navigate("/auth/login")
    }catch(err){
        toast.error("something went wrong"+err?.response?.data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        console.error("mae",err)
        setLoading(false)
    }
  
    // Proceed with form submission
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-[90vh]">
      <div className="hidden md:block relative w-full h-full">
  <img
    src="https://www.imhafiz.com/uploads/2/7/2/5/27255691/published/online-courses.jpg?1603090223"
    alt="Placeholder Image"
    className="object-cover w-full h-full"
  />
  <div className="absolute inset-0 bg-black opacity-50"></div>
</div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Signup</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="text"
              disabled={loading}
              id="email"
              name="email"
              className={`w-full border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
              placeholder="test@gmail.com"
              onChange={handleEmailChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
            disabled={loading}
              type="password"
              id="password"
              name="password"
              className={`w-full border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            <div className="mt-2">
              <div
                className={`h-2 rounded-full ${
                  passwordStrength === 0
                    ? 'bg-gray-300'
                    : passwordStrength === 1
                    ? 'bg-red-500'
                    : passwordStrength === 2
                    ? 'bg-yellow-500'
                    : passwordStrength === 3
                    ? 'bg-blue-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${(passwordStrength + 1) * 20}%` }}
              ></div>
              <p className="text-gray-600 text-sm mt-1">
                Password strength: {passwordStrength?(passwordStrength):(0) }/4
              </p>
            </div>
          </div>

          

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            {loading?("loading"):"Signup"}
          </button>
        </form>

        <div className="mt-6 text-blue-500 text-center" disabled={loading}>
          <Link to="/auth/login" className="hover:underline">
            Already Logged In ...login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;