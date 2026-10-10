import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Master from './Layout/User/Master'
import Home from './User/Home'
import About from './User/About'
import Contact from './User/Contact'
import Testimonials from './User/Testimonials'
import Register from './Authentication/Register'
import Login from './Authentication/Login'
import AdminLogin from './Authentication/AdminLogin'
import AdminMaster from './Layout/Admin/AdminMaster'

import { ToastContainer } from 'react-toastify'
import AddCategory from './Admin/AddCategory'
import ManageCategory from './Admin/ManageCategory'
import UpdateCategory from './Admin/UpdateCategory'
import AddVehicles from './Admin/AddVehicles'
import ManageVehicles from './Admin/ManageVehicles'
import UpdateVehicles from './Admin/UpdateVehicles'
import ManageEnquiries from './Admin/ManageEnquiries'
import Dashboard from './Admin/Dashboard'
import Vehicles from './User/Vehicles'
import ViewVehicles from './User/ViewVehicles'
import BookVehicles from './User/BookVehicles'
import ManageBookings from './Admin/ManageBookings'
import MyBookings from './User/MyBookings'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*USER */}
          <Route path="/" element={<Master />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/viewvehicles/:id" element={<ViewVehicles />} />
            <Route path="/bookvehicles/:id" element={<BookVehicles />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path='/my-bookings' element={<MyBookings/>}/>
          </Route>

          {/*ADMIN */}
          <Route path="/admin" element={<AdminMaster />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/addcategory" element={<AddCategory />} />
            <Route path="/admin/managecategory" element={<ManageCategory />} />
            <Route path="/admin/updatecategory/:id" element={<UpdateCategory />} />
            <Route path="/admin/addvehicles" element={<AddVehicles />} />
            <Route path="/admin/managevehicles" element={<ManageVehicles />} />
            <Route path="/admin/updatevehicles/:id" element={<UpdateVehicles />} />
            <Route path="/admin/managebookings" element={<ManageBookings/>}/>
            <Route path="/admin/manageenquiry" element={<ManageEnquiries />} />
          </Route>

        </Routes>

        <ToastContainer />
      </BrowserRouter>

    </>
  )
}
export default App
