import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
// import { Button } from "@material-tailwind/react";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom'


const baseUrl = 'http://127.0.0.1:8000/'
export default function Slotted() {
  const [slotted, setSlotted] = useState([]);
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const token = JSON.parse(localStorage.getItem('adminToken'))
  const navigate = useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/slottedlist", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${token}`,
      },
    }).then((response) => {
    //   console.log("jjjjjjjjjjjjjjjjjjjjjjjj", response);
      setSlotted(response.data);
    //   console.log(response.status);
    //   console.log(response.data);
      if (response.status === 200) {
        setSlotted(response.data);
      }
    });
  },[]);

 

  const changeState = (e) => {
    e.preventDefault()
    setDate(e.target.value)
    console.log('hhhhhhhhhhhhhhhhhhhhhh')
  };
//   console.log(date)



  const handleSlotting = (booking_id) => {
      console.log('srrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
      try{
          axios.post(baseUrl+'slotbooking/'+ booking_id+'/'+date+'/').then((res) =>{
              
              console.log('successssssssssssssssssssssssss')
              window.location.reload()
              console.log('hey')
          })
      } catch (err) {
          Swal.fire('Error', 'Form has not been approved.')
      }
    };



  return (
    <>
    <div className="flex">
      <div>
        <AdminNavbar />
      </div>
      <div style={{ flexGrow: 1 }}>
        <div>
          <h1 className="text-center fs-5 fw-bold mt-5">BOOKING SLOT</h1>
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
                        Date Confirmed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {slotted.map((data, index) => {
                      return (
                        <tr key={data.id}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {index + 1}
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
                            {
                              (data.date_allotted = "2022-01-01" && !data.allotted ? (
                                <p>Allotted Soon</p>
                              ) : (
                                <p>{data.date_allotted}</p>
                              ))
                            }
                          </td>
                          <td>{!data.allotted?
                            <button
                            onClick={handleShow}
                              className="text-success fw-bold hover:text-red-700"
                            >
                              Book
                            </button>
                            :""}
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Confirm Booking</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <label>Choose Date : </label> <input type="date" className="ms-5" onChange={changeState}></input>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button className="btn btn-outline-danger" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button className="btn btn-outline-primary" onClick={()=>{handleSlotting(data.id);handleClose();}}>
                                    Save Changes
                                </Button>
                                </Modal.Footer>
                            </Modal>
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

        <div>
      
        </div>
      </div>
    </div>
  </>
  );
}
