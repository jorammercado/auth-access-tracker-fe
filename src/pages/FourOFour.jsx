import React from 'react'
import {
    ProfileButton
} from '../styles/loginElements'
import { Link } from "react-router-dom"
import "./FourOFour.css"

const FourOFour = () => {
    return (
        <div className="error-container d-flex justify-content-center align-items-center min-vh-50 bg-light">
            <div className="text-center">
                <div className="error-code display-1 fw-bold text-dark">404</div>
                <p className="error-message fs-4 text-secondary">Oops! The page you're looking for cannot be found.</p>
                <Link to="/" replace> <ProfileButton>Go Back Home</ProfileButton></Link>
            </div>
        </div>
    )
}

export default FourOFour
