import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
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
  return (
    <div className='app-wrapper'>
      <Router>
        <div className="nav">
          <NavBar currentUser={currentUser}
            setCurrentUser={setCurrentUser} />
        </div>
        <main className="main-content">
          <Routes>
            <Route path="/login"
              element={
                <PublicRoute
                  element={Login}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
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
                  setCurrentUser={setCurrentUser}
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
