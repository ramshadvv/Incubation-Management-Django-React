import React, {useState, useEffect, useContext} from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar/NavBar"
import AuthContext from "../context/AuthContext"
import Swal from 'sweetalert2'

const baseUrl = "http://127.0.0.1:8000/booking/";

function BookingPage() {

  const [currentUser, setCurrentUser] = useState({})
  const token = JSON.parse(localStorage.getItem('authToken'));

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()
      
    let { authToken } = useContext(AuthContext);
      
    const navigate = useNavigate();
    
    
    useEffect(() => {
      fetchUserDetails()
        if (authToken !== null) {
          navigate("/booking");
        } else {
          navigate("/home");
        }
    }, [authToken, navigate]);
    const fetchUserDetails=async()=>{
      console.log(token)
      const result = await axios.get(`http://127.0.0.1:8000/me/`, { headers: {"Authorization" : `Bearer ${token.access  }`} })
      setCurrentUser(result.data)
  
    }
    const [bookingData, setBookingData] = useState({
        user:currentUser.username,
        name:"",
        address: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        company_name: "",
        team_background: "",
        company_products: "",
        solve: "",
        solution: "",
        incubation_needed: "",
        business_proposal: "",
    });
    bookingData.user = currentUser.id
    console.log(typeof(bookingData.user))
    
    const handleChange= (e) => {
        setBookingData({
        ...bookingData,
        [e.target.name]: e.target.value,
      });
    };
      
      const onSubmit = async ()=> {
        try {
          await axios.post(baseUrl, bookingData,{
            headers:{
              "Authorization": `Bearer ${token.access}`,
              'Content-Type' :'multipart/form-data', 
            }
          }).then((response) => {
            console.log(response.data)
            navigate('/home')
          });
        } catch (error) {
          console.log(error);
          setBookingData({
            status: false,
          });
          Swal.fire("Error", "Something went wrong");
        }
      };

  return (
    <div>
        <NavBar />
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 my-5 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
                New Application
                </h1>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Name
                        </label>
                        <input
                            {...register("name", {
                                required: "Name is required",
                                pattern: {
                                  value: /^[A-Za-z\s]{3,}$/,
                                  message:
                                    "Must be Characters & should not be less than 3",
                                },
                            })}
                            onChange={handleChange} 
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="name"
                            id="name"
                            placeholder='name'
                        />
                        {errors.name && (
                      <small className="text-red-500">
                        {errors.name.message}
                      </small>
                        )}
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Address
                        </label>
                        <input
                            {...register("address", { required: "Address required" })}
                            value={bookingData.address}
                            onChange={handleChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="address"
                            id="address"
                            placeholder="address"
                        />
                        {errors.address && (
                      <small className="text-red-500">
                        {errors.address.message}
                      </small>
                    )}
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email required",
                                pattern: {
                                  value: /^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{2,3}$/,
                                  message: "Invalid email",
                                },
                              })}
                            onChange={handleChange}
                            value={bookingData.email}
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="email"
                            id="email"
                            placeholder="email"
                        />
                        {errors.email && (
                      <small className="text-red-500">
                        {errors.email.message}
                      </small>
                    )}
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone
                        </label>
                        <input
                            {...register("phone", {
                                required: "Number required",
                                pattern: {
                                  value: /^\d{10}$/,
                                  message: "Invalid number",
                                },
                              })}
                            onChange={handleChange}
                            value={bookingData.phone}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="phone"
                            id="phone"
                            placeholder="phone"
                        />
                        {errors.phone && (
                      <small className="text-red-500">
                        {errors.phone.message}
                      </small>
                        )}
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            city
                        </label>
                        <input
                            {...register("city", { required: "Field required" })}
                            onChange={handleChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="city"
                            placeholder="city"
                        />
                        {errors.city && (
                      <small className="text-red-500">
                        {errors.city.message}
                      </small>
                    )}
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            state
                        </label>
                        <input
                            {...register("state", { required: "Field required" })}
                            onChange={handleChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="state"
                            id="state"
                            placeholder="state"
                        />
                        {errors.state && (
                      <small className="text-red-500">
                        {errors.state.message}
                      </small>
                    )}
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            company_name
                        </label>
                        <input
                            {...register("company_name", {
                                required: "Field required",
                            })}
                            onChange={handleChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="company_name"
                            id="company_name"
                            placeholder="company_name"
                        />
                        {errors.company_name && (
                      <small className="text-red-500">
                        {errors.company_name.message}
                      </small>
                    )}
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            team_background
                        </label>
                        <textarea 
                            {...register("team_background", {
                                required: "Field required",
                              })}
                            onChange={handleChange}
                            style={{height:'10rem'}}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="team_background"
                            id="team_background"
                            placeholder="team_background"
                        />
                        {errors.team_background && (
                        <small className="text-red-500">
                          {errors.team_background.message}
                        </small>
                      )}
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            company_products
                        </label>
                        <textarea 
                            {...register("company_products", {
                                required: "Field required",
                            })}
                            onChange={handleChange}
                            style={{height:'10rem'}}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="company_products"
                            id="company_products"
                            placeholder="company_products"
                            
                        />
                        {errors.company_products && (
                        <small className="text-red-500">
                          {errors.company_products.message}
                        </small>
                      )}
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            solve
                        </label>
                        <textarea 
                            {...register("solve", { required: "Field required" })}
                            onChange={handleChange}
                            style={{height:'10rem'}}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="solve"
                            id="solve"
                            placeholder="solve"
                        />
                        {errors.solve && (
                        <small className="text-red-500">
                          {errors.solve.message}
                        </small>
                      )}
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Solution
                        </label>
                        <textarea 
                            {...register("solution", {
                                required: "Field required",
                              })}
                            onChange={handleChange}
                            style={{height:'10rem'}}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="solution"
                            id="solution"
                            placeholder="solution"
                        />
                        {errors.solution && (
                        <small className="text-red-500">
                          {errors.solution.message}
                        </small>
                      )}
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Type of incubation needed
                        </label>
                        <div className='flex mt-4'>
                          <div className='ms-5 me-3 mb-3'>
                          <input
                              {...register("incubation_needed", {
                                  required: "Choose one option",
                                })}
                              onChange={handleChange}
                              type="radio"
                              value={"Physical Incubation"}
                              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              name="incubation_needed"
                              id="incubation_needed"
                              placeholder="incubation_needed"
                          /></div>
                          <div>Physical Incubation</div> 

                        </div>
                        <div className='flex mb-4'>
                          <div className='ms-5 me-3'>
                        <input
                            {...register("incubation_needed", {
                                required: "Choose one option",
                              })}
                            onChange={handleChange}
                            type="radio"
                            value={"Virtual Incubation"}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="incubation_needed"
                            id="incubation_needed"
                            placeholder="incubation_needed"
                        /></div>
                        <div>Virtual Incubation</div> 
                        </div>
                        <p>
                        {" "}
                        {errors.incubation_needed && (
                          <small className="text-red-500">
                            {errors.incubation_needed.message}
                          </small>
                        )}{" "}
                      </p>
                    </div>
                    <div className="mb-2">
                        <label
                            for="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            business_proposal
                        </label>
                        <textarea 
                            {...register("business_proposal", {
                                required: "Field required",
                            })}
                            onChange={handleChange}
                            style={{height:'10rem'}}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name="business_proposal"
                            id="business_proposal"
                            placeholder="business_proposal"
                        />
                        {errors.business_proposal && (
                        <small className="text-red-500">
                          {errors.business_proposal.message}
                        </small>
                      )}
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default BookingPage