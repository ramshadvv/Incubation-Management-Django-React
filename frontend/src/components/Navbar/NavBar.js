import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

function NavBar() {

  let {logoutUser} = useContext(AuthContext)
  const [user, setUser] = useState({})
  const token = JSON.parse(localStorage.getItem('authToken'))
  const fetchUserDetails=async()=>{
    console.log(token)
    const result = await axios.get(`http://127.0.0.1:8000/me/`, { headers: {"Authorization" : `Bearer ${token.access  }`} })
    setUser(result.data)

  }
  useEffect(() => {
  fetchUserDetails()
  }, [])
  return (
    

    <div className='bg-blue-900 flex justify-between me-3' style={{height:'5rem', width:'100%'}}>
        <Link to="/home" className='ms-5'> {user && <p className='text-white mb-2 mt-4 mr-2'>  {user.username} </p> }</Link>
        {localStorage.getItem('authToken') ? (
          <button className='text-white bg-violet-700 font-bold py-1 px-4 mb-2 mt-2 ml-2 rounded focus:outline-none me-5' onClick={logoutUser}>Logout</button> 
        ):(
          <Link to="/" className='text-white me-5 bg-violet-700 font-bold py-2 px-4 mb-2 mt-2 ml-2 rounded focus:outline-none'> Login</Link>
        )}
    </div>
  )
}

export default NavBar