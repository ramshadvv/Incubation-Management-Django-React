import {useState,useEffect, useContext} from "react";
import AuthContext from "../../context/AuthContext";
import Axios  from "axios";
// import { Button } from "@material-tailwind/react";
import AdminNavbar from "../../components/Navbar/AdminNavbar";



export default function Declined() {
    const [decline, setDecline] = useState([]) 
    const { authToken } = useContext(AuthContext);
    const token = JSON.parse(localStorage.getItem('adminToken'))
    useEffect(()=> {
        Axios.get('http://127.0.0.1:8000/declinedlist', 
        {
            
            headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer  ${token}`
            }
          }).then((response) =>{
            console.log('jjjjjjjjjjjjjjjjjjjjjjjj',response)
            setDecline(response.data)
             console.log(response.status)
        console.log(response.data) 
        if(response.status === 200){
          setDecline(response.data)
        }
          })

    }, [])

    return(
        <div className="flex">
      <div>
        <AdminNavbar />
      </div>
      <div style={{flexGrow:1}}>
        <div>
          <h1 className="text-center fs-5 fw-bold mt-5">DECLINED LIST </h1>
        </div>
        <div className="flex flex-col mt-5">
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Address
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {decline.map((data,index)=>{
                                return(

                                
                                <tr key={data.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {index+1}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {data.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {data.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {data.phone}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {data.address}
                                    </td>
                                </tr>
                                )
                              })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    );

}