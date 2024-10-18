import { Link } from "react-router-dom"
import "./NavBar.css"
import logo from "../assets/red-canary-logo.png"

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid">
                <div className="main-links">
                    <Link to="/users/:user_id/profile">
                        <p >User</p>
                    </Link>
                    <Link to="/signup">
                        <p >Sign Up</p>
                    </Link>
                </div>
                <span className="navbar-text" >
                    <p>User Authentication and Access Tracking System - Test </p>
                </span>
                <span className="image" >
                    <Link to="/">
                        <img src={logo} alt="Logo"  />
                    </Link>
                </span>
            </div>
        </nav>
    )
}

