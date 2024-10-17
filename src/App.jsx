import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <div className='app'>
      <Router>
        <div className="nav">
          <NavBar currentUser={currentUser}
            setCurrentUser={setCurrentUser} />
        </div>
        <main>
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
                <Navigate to="/login" />
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
      </Router>
    </div>
  )
}

export default App
