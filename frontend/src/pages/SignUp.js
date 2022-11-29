import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import NavBar from "../components/Navbar/NavBar"

const baseUrl = "http://127.0.0.1:8000/register/";

function SignUp() {

    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    // const [isSubmit, setIsSubmit] = useState(false);
    const [userData, setUserData] = useState({
      first_name: "",
      last_name:"",
      username: "",
      email: "",
      phone: "",
      password: "",
      password2: "",
    });
    
    const handleChange= (e) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    };

    console.log(userData);

    const submitForm = async (e) => {
      e.preventDefault();
      await setFormErrors(validate(userData));
      Axios.post(baseUrl, {
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        password2: userData.password2,
      }).then((response) => {
   
        console.log("Submitted",response.data);
        navigate("/");
        
  
      }).catch((err)=>{
        console.log(err);
      });
    };

    useEffect(() => {
      if (Object.keys(formErrors).length === 0) {
        console.log(userData);
      }
    }, [formErrors, userData]);
   
    const validate = (values) => {

      const errors = {};
      if (!values.first_name) {
        errors.first_name = "First name is required";
  
        console.log(errors.first_name, "oooooo");
      }
      if (!values.last_name) {
        errors.last_name = "Last name is required";
      }
      if (!values.email) {
        errors.email = "Email  is required";
      }
      if (!values.username) {
        errors.username = "Username is required";
      }
      if (!values.phone || parseInt(values.phone.length) !== 10){
        errors.phone = "Phone number is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      if (!values.password.length < 4) {
        errors.password = "Password length more than 4 characters";
      }
      if (values.password !== values.password2) {
        errors.password2 = "Confrim password does not match";
      }
      return errors;
    };

  return (
    <div>
        <NavBar />
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 my-5 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
                Sign Up
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Firstname
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="first_name"
                            id="first_name"
                            placeholder="Firstname"
                        />
                        <p className="text-red-600">{formErrors.first_name}</p>
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Lastname
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="last_name"
                            id="last_name"
                            placeholder="Lastname"
                        />
                        <p className="text-red-600">{formErrors.last_name}</p>
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="username"
                            id="username"
                            placeholder="username"
                        />
                        <p className="text-red-600">{formErrors.username}</p>
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="email"
                            id="email"
                            placeholder="email"
                        />
                        <p className="text-red-600">{formErrors.email}</p>
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone
                        </label>
                        <input
                            onChange={handleChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="phone"
                            id="phone"
                            placeholder="phone"
                        />
                        <p className="text-red-600">{formErrors.phone}</p>
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="******************"
                        />
                        <p className="text-red-600">{formErrors.password}</p>
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Confirm Password
                        </label>
                        <input
                            onChange={handleChange}
                            name="password2"
                            id="password"
                            type="password"
                            placeholder="******************"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <p className="text-red-600">{formErrors.password2}</p>
                    </div>
                    <div className="mt-6">
                        <button onClick={submitForm} type="sumbit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Submit
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have an account?{" "}
                    <a
                        href="/"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    </div>
  )
}

export default SignUp