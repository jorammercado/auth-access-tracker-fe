import {
    LoginBackground,
    LoginHeader,
    LoginLabel,
    ErrorList,
    FormInput,
    LoginButton,
    OkButton
} from '../styles/loginElements'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import "./Login.css"

const VITE_API_URL = import.meta.env.VITE_API_URL

const Login = ({ setCurrentUser }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

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

    const validatesPassword = () => {

        const passwordErrors = []

        if (!password.length) {
            passwordErrors.push('Password is required.')
            return passwordErrors
        }

        if (!/\d/.test(password)) {
            passwordErrors.push('Password must include at least one numeric character.')
        }
        if (password.length < 8 || password.length > 150 || !/^[\x00-\x7F]*$/.test(password)) {
            passwordErrors.push('Password must be between 8 and 50 ASCII characters.')
        }

        return passwordErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post(`${VITE_API_URL}/users/login`, {
            email,
            password
        })
            .then(res => {
                const { token, oneUser } = res.data
                setCurrentUser(oneUser, token)
                setErrors([])
                navigate(`/users/${oneUser.user_id}/profile`)
            })
            .catch(err => {
                console.error(err?.response?.data?.error)
                processLoginErrors(err?.response?.data?.error)
            })
    }

    const processLoginErrors = (serverRes) => {
        if (!serverRes)
            setErrors([...validatesPassword(), ...validatesEmail()])
        else
            setErrors([...validatesPassword(), ...validatesEmail(), `server response: ${serverRes}`])
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
                    !errors.length ?
                        <>
                            <LoginLabel>
                                <LoginHeader>Login to Your Account</LoginHeader>
                            </LoginLabel>
                            <FormInput type="text" onChange={e => setEmail(e.currentTarget.value)} placeholder="Email" />
                            <FormInput type="password" onChange={e => setPassword(e.currentTarget.value)} placeholder="Password" />
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

export default Login
