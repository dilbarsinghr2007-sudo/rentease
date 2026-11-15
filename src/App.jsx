
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { auth, db } from './Firebase'

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

// Protected Admin Route
function ProtectedAdminRoute({ children }) {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    let active = true

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (active) setStatus('denied')
        return
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid))

        if (
          userDoc.exists() &&
          userDoc.data().userType === 'admin'
        ) {
          if (active) setStatus('allowed')
        } else {
          await signOut(auth)
          if (active) setStatus('denied')
        }
      } catch (error) {
        console.error('Admin verification failed:', error)
        if (active) setStatus('denied')
      }
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  if (status === 'checking') {
    return <div>Checking admin access...</div>
  }

  if (status === 'denied') {
    return <Navigate to="/adminlogin" replace />
  }

  return children
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* USER */}
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
            <Route path="/my-bookings" element={<MyBookings />} />
          </Route>

          {/* PROTECTED ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminMaster />
              </ProtectedAdminRoute>
            }
          >
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/addcategory" element={<AddCategory />} />
            <Route path="/admin/managecategory" element={<ManageCategory />} />
            <Route path="/admin/updatecategory/:id" element={<UpdateCategory />} />
            <Route path="/admin/addvehicles" element={<AddVehicles />} />
            <Route path="/admin/managevehicles" element={<ManageVehicles />} />
            <Route path="/admin/updatevehicles/:id" element={<UpdateVehicles />} />
            <Route path="/admin/managebookings" element={<ManageBookings />} />
            <Route path="/admin/manageenquiry" element={<ManageEnquiries />} />
          </Route>
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
