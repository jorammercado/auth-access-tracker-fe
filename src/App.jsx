import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import Swal from 'sweetalert2'

import Home from "./pages/Home"
import UserPortal from "./pages/UserPortal"
import ProtectedRoute from "./components/ProtectedRoute"
import UserInfoEditForm from "./components/UserInfoEditForm"
import UserInfoEditPassword from "./components/UserInfoEditPassword"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import PublicRoute from "./components/PublicRoute"
import FourOFour from "./pages/FourOFour"
import NavBar from "./components/NavBar"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('authToken') || null)
  const timeoutIdRef = useRef(null)

  const handleLogin = (user, jwtToken) => {
    setCurrentUser(user)
    setToken(jwtToken)
    localStorage.setItem('authToken', jwtToken)

    try {
      const { exp } = jwtDecode(jwtToken)
      const expirationTime = exp * 1000 - Date.now()

      timeoutIdRef.current = setTimeout(() => {
        handleLogout(true)
      }, expirationTime)
    } catch (error) {
      console.error('Invalid token during login:', error)
      handleLogout(false)
    }
  }

  const handleLogout = (isTimeout = false) => {
    setCurrentUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
    clearTimeout(timeoutIdRef.current)

    if (isTimeout) {
      Swal.fire({
        title: 'Session Timed Out',
        text: 'Your session has timed out. Please log in again.',
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#cf2e2e'
      })
    } else {
      Swal.fire({
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#cf2e2e'
      })
    }
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { exp } = jwtDecode(token)
      const expirationTime = exp * 1000 - Date.now()

      if (expirationTime > 0) {
        timeoutIdRef.current = setTimeout(() => {
          handleLogout(true)
        }, expirationTime)
      } else {
        handleLogout(true)
      }
    } else {
      delete axios.defaults.headers.common['Authorization']
    }

    return () => {
      clearTimeout(timeoutIdRef.current)
    }
  }, [token])

  return (
    <div className='app-wrapper'>
      <Router>
        <div className="nav">
          <NavBar token={token}
            setToken={setToken}
            handleLogout={handleLogout}
          />
        </div>
        <main className="main-content">
          <Routes>
            <Route path="/login"
              element={
                <PublicRoute
                  element={Login}
                  currentUser={currentUser}
                  setCurrentUser={handleLogin}
                />
              }
            />

            <Route path="/forgot-password"
              element={
                <PublicRoute
                  element={ForgotPassword}
                  currentUser={currentUser}
                />
              }
            />

            <Route path="/reset-password/:token"
              element={
                <PublicRoute
                  element={ResetPassword}
                  currentUser={currentUser}
                />
              }
            />

            <Route path="/"
              element={
                <ProtectedRoute
                  element={Home}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route path="/signup"
              element={
                <PublicRoute
                  element={SignUp}
                  currentUser={currentUser}
                  setCurrentUser={handleLogin}
                />
              }
            />

            <Route
              path="/users/:user_id/profile/edit"
              element={
                <ProtectedRoute
                  element={UserInfoEditForm}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/users/:user_id/profile/password"
              element={
                <ProtectedRoute
                  element={UserInfoEditPassword}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/users/:user_id/profile"
              element={
                <ProtectedRoute
                  element={UserPortal}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setToken={setToken}
                  handleLogout={handleLogout}
                />
              }
            />

            <Route
              path="/home"
              element={
                <ProtectedRoute
                  element={Home}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="*"
              element={
                <PublicRoute
                  element={FourOFour}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          </Routes>
        </main>
        <footer className="footer bg-dark text-white text-center py-3">
          <p>&copy; 2024 User Authentication and Access Tracking System. All rights reserved.</p>
        </footer>
      </Router>
    </div>
  )
}

export default App
