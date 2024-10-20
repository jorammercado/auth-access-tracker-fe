import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import logo from "../assets/red-canary-logo.png"

export default function NavBar({ token, setToken, handleLogout }) {
    const navigate = useNavigate()
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid">

                <span className="image" >
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </span>

                <span className="navbar-text" >
                    {screenWidth >= 587 ? <>User Authentication and Access Tracking System - Test </> : <>UAATS - Test</>}
                </span>
                {!token ?
                    <div className="main-links">
                        <Link to="/login">
                            Log In
                        </Link>
                        <Link to="/signup">
                            Sign Up
                        </Link>
                    </div> :
                    <div className="main-links">
                        <Link to="/users/:user_id/profile">
                            Profile
                        </Link>
                        <button
                            onClick={() => handleLogout(false)}
                            className="link-button"
                        >
                            Log Out
                        </button>
                    </div>
                }
            </div>
        </nav>
    )
}

