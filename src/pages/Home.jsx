import React from 'react'
import { Link } from "react-router-dom"
import {
    ProfileButton
} from '../styles/loginElements'
import "./Home.css"

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero-section-home text-white text-center" >
                <div className="container">
                    <h1 className="display-4">Welcome to Our User Access Management System</h1>
                    <p className="lead">Manage users, track access, and enhance security with ease.</p>
                    <Link to="/signup" > <ProfileButton>Get Started</ProfileButton></Link>
                </div>
            </section>

            <section className="feature-section-home py-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4">
                            <div className="card feature-card-home">
                                <div className="card-body">
                                    <i className="bi bi-shield-lock" ></i>
                                    <h5 className="card-title mt-3">Secure Authentication</h5>
                                    <p className="card-text">Our system offers industry-standard user authentication with advanced security features.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card feature-card-home">
                                <div className="card-body">
                                    <i className="bi bi-file-earmark-person" ></i>
                                    <h5 className="card-title mt-3">User Management</h5>
                                    <p className="card-text">Easily create, update, or delete users and manage their information effectively.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card feature-card-home">
                                <div className="card-body">
                                    <i className="bi bi-envelope" ></i>
                                    <h5 className="card-title mt-3">Email Notifications</h5>
                                    <p className="card-text">Receive automatic email notifications for suspicious activity, password resets, and more.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
