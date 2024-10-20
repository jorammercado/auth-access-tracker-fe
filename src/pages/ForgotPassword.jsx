import React from 'react'
import {
    LoginBackground,
    LoginLabel,
    ErrorList,
    LoginButton,
    OkButtonPasswordReset,
    ForgotPasswordHeader,
    ForgotPasswordSubHeader,
    FormInputForgotEmail
} from '../styles/loginElements'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import Swal from 'sweetalert2'
import "./Login.css"

const VITE_API_URL = import.meta.env.VITE_API_URL

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailErrors = validatesEmail()
        if (emailErrors.length > 0) {
            setErrors(emailErrors)
            return
        }

        setLoading(true)
        axios.post(`${VITE_API_URL}/auth/forgot-password`, {
            email
        }, {
            headers: {
                'Authorization': ''//remove token
            }
        })
            .then(res => {
                setLoading(false)
                Swal.fire({
                    text: 'If an account is associated with this email, a reset link was sent.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#cf2e2e'
                }).then(() => {
                    navigate(`/login`)
                })
            })
            .catch(err => {
                setLoading(false)
                console.error(err, err?.response?.data?.error)
                processLoginErrors(err?.response?.data?.error)
            })
    }

    const processLoginErrors = (serverRes) => {
        setErrors([...validatesEmail(), `server response: ${serverRes}`])
    }

    const handleOk = (event) => {
        event.preventDefault()
        setEmail("")
        setErrors([])
    }


    const validatesEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const emailErrors = []

        if (!email?.length)
            emailErrors.push('Email is required.')

        if (!emailRegex.test(email))
            emailErrors.push(`Invalid email format. Please enter a valid email address, e.g., example@domain.com.`)

        if (email?.length < 6 || email?.length > 150)
            emailErrors.push('Email must be between 6 and 150 characters.')

        return emailErrors
    }


    return (
        <div >
            <LoginBackground onSubmit={handleSubmit}>
                {
                    loading ?
                        <div className="spinner-container">
                            <div className="loading-spinner"></div>
                        </div> :
                        !errors.length ?
                            <>
                                <LoginLabel>
                                    <ForgotPasswordHeader>Forgot Your Password</ForgotPasswordHeader>
                                    <ForgotPasswordSubHeader>Please enter your email address. If we have an account associated with it, you'll receive password reset instructions.</ForgotPasswordSubHeader>
                                </LoginLabel>
                                <FormInputForgotEmail type="text" onChange={e => setEmail(e.currentTarget.value)} placeholder="Email" />

                                <LoginButton >{'Request Reset Link'}</LoginButton>
                                <Link to="/login" className="forgot-password-link">Back To Login</Link>
                            </> :
                            <>
                                <ErrorList>
                                    {errors.length > 0 ? errors.map((error, i) => <li key={`${i}`}>&nbsp;{error}</li>) : ""}
                                </ErrorList>
                                <OkButtonPasswordReset onClick={handleOk}>
                                    OK
                                </OkButtonPasswordReset>
                            </>
                }
            </LoginBackground>
        </div>
    )
}

export default ForgotPassword
