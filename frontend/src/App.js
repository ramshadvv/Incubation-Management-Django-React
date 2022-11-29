import './App.css';
import { Route, Routes} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import BookingPage from './pages/BookingPage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminPanel from './pages/admin/AdminPanel';
import Approved from './pages/admin/Approved';
import Declined from './pages/admin/Declined';
import Slotted from './pages/admin/Slotted';
// import PrivateRoute from './utils/PrivateRoute'
// import {ProtectedRoute} from './utils/protectRoute'

function App() {
  return (
    <div className="App">
        <AuthProvider>
          <Routes>
            {/* admin routers */}
            
            <Route element={<AdminLoginPage />} path="/admin" />
            <Route element={<AdminPanel />} path="/admin/panel" />
            <Route element={<Approved />} path="/admin/approved" />
            <Route element={<Declined />} path="/admin/declined" />
            <Route element={<Slotted />} path="/admin/slotted" />

            {/* user routers */}

            <Route element={<LoginPage />} path='/' exact />
            <Route element={<HomePage />} path="/home" />
            <Route element={<SignUp />} path="/register" />
            <Route element={<BookingPage />} path="/booking" />
          </Routes>

        </AuthProvider>

    </div>
  );
}

export default App;
