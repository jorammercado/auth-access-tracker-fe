import React from 'react'
import {
    LoginBackground,
    LoginLabel,
    ErrorList,
    LoginButton,
    OkButton,
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post(`${VITE_API_URL}/auth/forgot-password`, {
            email
        }, {
            headers: {
                'Authorization': ''//remove token
            }
        })
            .then(res => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Password reset instructions have been sent to your email.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#cf2e2e'
                }).then(() => {
                    navigate(`/login`)
                })
            })
            .catch(err => {
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
        const emailErrors = []

        if (!email.length) {
            emailErrors.push('Email is required.')
            return emailErrors
        }

        if (email.split(".").length !== 2 || email.split("@").length !== 2) {
            emailErrors.push(`Email must contain one '@' and one '.'`)
        }
        if (email.length < 5 || email.length > 150) {
            emailErrors.push('Email must be between 5 and 150 characters.')
        }

        return emailErrors
    }


    return (
        <div >
            <LoginBackground onSubmit={handleSubmit}>
                {
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
                            <OkButton onClick={handleOk}>
                                OK
                            </OkButton>
                        </>
                }
            </LoginBackground>
        </div>
    )
}

export default ForgotPassword
