import {useEffect,useState,useContext} from 'react'
import NavBar from '../components/Navbar/NavBar'
import { Navigate } from 'react-router-dom'
import CheckLogin from '../utils/checkLogin';
import axios from 'axios'


const HomePage = () => {
  const [apps,setApps] = useState({})
  const token = JSON.parse(localStorage.getItem('authToken'))

  useEffect(() => {
    fetchApplications()

}, [])

  const fetchApplications = async () => {
    const result = await axios.get(`http://127.0.0.1:8000/userapplication/`, { headers: {"Authorization" : `Bearer ${token.access  }`} })
    setApps(result.data)
    console.log(result.data)
  }

  

  if(CheckLogin() === false){
    return <Navigate to="/" />
  }

  return (
    <div>
      <NavBar/>
      {/* <button onClick={getIN} className="bg-violet-900 hover:bg-violet-800 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-between">New application</button> */}
      <div className='text-center'>
        <a href="/booking"><button className="bg-violet-900 hover:bg-violet-800 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{marginTop:'5rem'}}>New application</button></a>
      </div>
      <div style={{flexGrow:1}}>
        <div>
          <h1 className="text-center fs-5 fw-bold mt-5">APPLICATIOS</h1>
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
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {apps.length>1?apps.map((data,index)=>{
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
                                        {data.declined ? <p className='fw-bold'>Not Allotted</p>:data.allotted ? <p className='fw-bold'>{data.date_allotted}</p>:<p className='fw-bold'>Allotted Soon</p>}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {data.approved && <p className='text-success fw-bold'>Approved</p>}
                                        {data.declined && <p className='text-red-500 fw-bold'>Declined</p>}
                                        {data.pending && <p className='text-blue-500 fw-bold'>Pending</p>}
                                    </td>
                                </tr>
                                )
                              }):<p>You have not applied yet</p>};
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage