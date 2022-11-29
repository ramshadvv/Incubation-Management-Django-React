import AdminNavbar from "../../components/Navbar/AdminNavbar";
import React, { useContext, useEffect, useState } from "react";
// import { Button } from "@material-tailwind/react"
import AuthContext from "../../context/AuthContext";
import Axios from "axios";
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'


const baseUrl = 'http://127.0.0.1:8000/'
function AdminPanel() {
  const [pending, setPending] = useState([])
    const token = JSON.parse(localStorage.getItem('adminToken'))
    console.log(token.access)
    const navigate = useNavigate();

    useEffect( () => {
        Axios.get(baseUrl+'pendinglist',
        {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer  ${token}`
            }
        }).then((response) => {
            setPending(response.data)
            console.log(response.data)

        })
    },[])

    const handleApprove = (booking_id)=>{
      Swal.fire({
          title: 'Confirm!',
          text: 'Do you want to Approve ?',
          icon: 'info',
          confirmButtonText: 'Continue',
          showCancelButton:true
      }).then((result)=>{
          if(result.isConfirmed){
              console.log('srrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
              try{
                  Axios.post(baseUrl+'approving/'+ booking_id+'/').then(res =>{
                      Swal.fire('Success','Form is Approved successfully')
                      console.log('successssssssssssssssssssssssss')
                      window.location.reload()
                      navigate('/admin/panel')
                  })
              } catch (err) {
                  Swal.fire('Error', 'Form has not been approved.')
              }
          } else {
              Swal.fire('', 'Form has not been Approved.')
          }
      })
  }


  const handleDecline = (declining_id)=>{
    Swal.fire({
        title: 'Confirm!',
        text: 'Do you want to Decline ?',
        icon: 'info',
        confirmButtonText: 'Continue',
        showCancelButton:true
    }).then((result)=>{
        if(result.isConfirmed){
            console.log('srrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            try{
                Axios.post(baseUrl+'declining/'+ declining_id+'/').then(res =>{
                    Swal.fire('Success','Form is Declined successfully')
                    navigate('/admin/panel')
                    // window.location.reload(false);
                    window.location.reload()
                    console.log('successssssssssssssssssssssssss')
                })
            } catch (err) {
                Swal.fire('Error', 'Form has not been declined.')
            }
        } else {
            Swal.fire('', 'Form has not been Declined.')
        }
    })
  }


  return (
    <div className="flex">
      <div>
        <AdminNavbar />
      </div>
      <div style={{flexGrow:1}}>
        <div>
          <h1 className="text-center fs-5 fw-bold mt-5">APPLICATION </h1>
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
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {pending.length>=1 ? pending.map((data,index)=>{
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
                                    <td className="px-6 py-4 text-sm font-medium text-center text-right whitespace-nowrap">
                                        <button
                                          onClick={()=>handleApprove(data.id)}
                                            className="text-green-500 hover:text-green-700 me-2"
                                            
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={()=>handleDecline(data.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Decline
                                        </button>
                                    </td>
                                </tr>
                                )
                              }):<p className="text-center">No pending bookings</p>}
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

export default AdminPanel;
