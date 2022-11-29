import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'


const AuthContext = createContext(null);

export default AuthContext;

export const AuthProvider = ({children})=> {

    let [authToken,setAuthToken] = useState()
    let [user, setUser] = useState()
    let [admin, setAdmin] = useState()
    // let [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    


    let loginUser = async(e)=>{
        e.preventDefault()
        console.log('Form is submitted')

        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})

        })

        let data = await response.json()


        if(response.status === 200){
            setAuthToken(data)
            console.log(data)
            setUser(jwt_decode(data.access))
            console.log(user)
            localStorage.setItem('authToken', JSON.stringify(data))
            navigate('/home')

        }else{
            console.log('failed')
            Swal.fire({
                text:'Invalid Credentials!!',
                icon:'error'
            })
        }
    };

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        navigate('/')
    }

    const loginAdmin = async (e) => {
        e.preventDefault();
        if(e.target.username.value !==  'admin'){
            Swal.fire({
                text:'Only admin can access!!',
                icon:'error'
            })
            return navigate('/admin')
        }
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
          }),
        });
        const data = await response.json();
        if (response.status === 200) {
          setAuthToken(data);
          setAdmin(jwt_decode(data.access));
          localStorage.setItem("adminToken", JSON.stringify(data.access));
          navigate('/admin/panel');
        
      };
    }

    let logoutAdmin = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('adminToken')
        navigate('/admin')
    }

    

    let contextData = {
        user:user,
        admin:admin,
        authToken:authToken,
        loginUser:loginUser,
        logoutUser:logoutUser,
        loginAdmin:loginAdmin,
        logoutAdmin:logoutAdmin
    };
    

    

    // useEffect(()=> {
    //     let fourMinutes = 1000 * 60 * 10
    //     let interval = setInterval(()=> {
    //          if(authToken){
    //             updateToken()
    //             updateAdminToken()
    //          }
    //      }, fourMinutes)
    //      return ()=> clearInterval(interval)
 
    //  }, [authToken, loading])

    // useEffect(()=> {

    //     if(authToken){
    //         setUser(jwt_decode(authToken.access))
    //     }
    //     setLoading(false)


    // }, [authToken, loading])
 
     return (
         <AuthContext.Provider value={contextData}>
            {children}
         </AuthContext.Provider>
     );
    
};