import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const ProtectedRoute = ({children}) =>{
        const {user} = useContext(AuthContext)
        console.log('USERRRR: ', user);
        if(user){
            return children
        }
        return <Navigate to='/'  />
}


export const AdminRoute = ({children})=>{
    const {admin} = useContext(AuthContext)
    if (admin){
        return children
    }
    return <Navigate to='/admin' />
}