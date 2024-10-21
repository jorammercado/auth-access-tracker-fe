import {
    LoginBackground,
    LoginHeader,
    LoginLabel,
    ErrorList,
    FormInput,
    LoginButton,
    OkButton
} from '../styles/loginElements'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import "./Login.css"
import Swal from 'sweetalert2'

const VITE_API_URL = import.meta.env.VITE_API_URL

const LoginMFA = ({ setCurrentUser }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const validatesEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const emailErrors = []

        if (!email.length)
            emailErrors.push('Email is required.')

        if (!emailRegex.test(email))
            emailErrors.push(`Invalid email format. Please enter a valid email address, e.g., example@domain.com.`)

        if (email.length < 5 || email.length > 150)
            emailErrors.push('Email must be between 5 and 150 characters.')

        return emailErrors
    }

    const validatesPassword = () => {
        const passwordErrors = []

        if (!password?.length)
            passwordErrors.push('Password is required.')

        if (!/\d/.test(password))
            passwordErrors.push('Password must contain at least one digit.')

        if (password.length < 8 || password.length > 150)
            passwordErrors.push('Password must be between 8 and 150 characters.')

        if (!/(?=.*[a-z])/.test(password))
            passwordErrors.push("Password must contain at least one lowercase letter.")

        if (!/(?=.*[A-Z])/.test(password))
            passwordErrors.push("Password must contain at least one uppercase letter.")

        if (!/(?=.*[\W_])/.test(password))
            passwordErrors.push("Password must contain at least one special character.")

        return passwordErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailErrors = validatesEmail()
        const passwordErrors = validatesPassword()

        if (emailErrors.length || passwordErrors.length) {
            setErrors([...emailErrors, ...passwordErrors])
            return
        }
        try {
            setLoading(true)
            const res = await axios.post(`${VITE_API_URL}/users/login-initiate`, {
                email,
                password
            })
            setLoading(false)
            if (res.data.error)
                throw new Error(res.data.error)
            if (res.data.err)
                throw new Error(res.data.err)
            Swal.fire({
                text: `OTP has been sent to your email. Please verify to continue.`,
                confirmButtonText: 'OK',
                confirmButtonColor: '#cf2e2e'
            }).then(() => {
                setErrors([])
                navigate(`/users/${res.data.user_id}/verify-otp-login`)
            })
        } catch (err) {
            console.error(err?.response?.data?.error)
            processLoginErrors(err?.response?.data?.error)
        }
    }

    const processLoginErrors = (serverRes) => {
        if (!serverRes) {
            setErrors(['An unexpected error occurred. Please try again.'])
        } else {
            setErrors([`Server response: ${serverRes}`])
        }
    }

    const handleOk = (event) => {
        event.preventDefault()
        setEmail("")
        setPassword("")
        setErrors([])
    }

    return (
        <div >
            <LoginBackground onSubmit={handleSubmit}>
                {
                    loading ?
                        <div className="spinner-container">
                            <div className="loading-spinner"></div>
                        </div>
                        :
                        !errors.length ?
                            <>
                                <LoginLabel>
                                    <LoginHeader>Login to Your Account</LoginHeader>
                                </LoginLabel>
                                <FormInput type="text" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="Email" />
                                <FormInput type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder="Password" />
                                <LoginButton >{'Sign In'}</LoginButton>
                                <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
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

export default LoginMFA