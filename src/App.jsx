import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import Home from "./pages/Home"
import UserPortal from "./pages/UserPortal"
import ProtectedRoute from "./components/ProtectedRoute"
import UserInfoEditForm from "./components/UserInfoEditForm"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import PublicRoute from "./components/PublicRoute"
import FourOFour from "./pages/FourOFour"
import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('authToken') || null)

  const handleLogin = (user, jwtToken) => {
    setCurrentUser(user)
    setToken(jwtToken)
    localStorage.setItem('authToken', jwtToken)

    const { exp } = jwtDecode(jwtToken)
    const expirationTime = exp * 1000 - Date.now()

    setTimeout(() => {
      handleLogout()
    }, expirationTime)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const { exp } = jwtDecode(token)
      const expirationTime = exp * 1000 - Date.now()

      if (expirationTime > 0) {
        setTimeout(() => {
          handleLogout()
        }, expirationTime)
      } else {
        handleLogout()
      }
    } else {
      delete axios.defaults.headers.common['Authorization']
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
              path="/users/:user_id/profile"
              element={
                <ProtectedRoute
                  element={UserPortal}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
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
