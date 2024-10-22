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
import { useNavigate, useParams } from 'react-router-dom'
import "./Login.css"
import Swal from 'sweetalert2'

const VITE_API_URL = import.meta.env.VITE_API_URL

const VerifyOtpLogin = ({ setCurrentUser }) => {
    const navigate = useNavigate()
    const { user_id } = useParams()
    const [otp, setOtp] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const validateOtp = () => {
        const otpErrors = []

        if (!otp.length)
            otpErrors.push('OTP is required')

        if (otp.length !== 6 || !/^[0-9]{6}$/.test(otp))
            otpErrors.push('OTP must be a 6-digit numeric code')

        return otpErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const otpErrors = validateOtp()

        if (otpErrors.length) {
            setErrors(otpErrors)
            return
        }

        setLoading(true)
        try {
            const res = await axios.post(`${VITE_API_URL}/auth/verify-otp`, { user_id, otp })
            setLoading(false)
            if (res.data.error)
                throw new Error(res.data.error)
            if (res.data.err)
                throw new Error(res.data.err)

            Swal.fire({
                text: `Success! Redirecting to your profile...`,
                confirmButtonText: 'OK',
                confirmButtonColor: '#cf2e2e'
            }).then(() => {
                setErrors([])
                setCurrentUser(res.data.oneUser, res.data.token)
                navigate(`/users/${user_id}/profile`)
            })
        } catch (err) {
            setLoading(false)
            console.error(err)
            Swal.fire({
                text: `Incorrect OTP! Redirecting to login page...`,
                confirmButtonText: 'OK',
                confirmButtonColor: '#cf2e2e'
            }).then(() => {
                navigate(`/login`)
            })
        }
    }

    const handleOk = (event) => {
        event.preventDefault()
        setOtp('')
        setErrors([])
    }

    return (
        <div>
            <LoginBackground onSubmit={handleSubmit}>
                {
                    loading ?
                        <div className="spinner-container">
                            <div className="loading-spinner"></div>
                        </div> :
                        !errors.length ?
                            <>
                                <LoginLabel>
                                    <LoginHeader>Verify OTP</LoginHeader>
                                </LoginLabel>
                                <FormInput type="text" value={otp} onChange={e => setOtp(e.currentTarget.value)} placeholder="Enter OTP" />
                                <LoginButton>{'Verify OTP'}</LoginButton>
                            </> :
                            <>
                                <ErrorList>
                                    {errors.map((error, i) => <li key={i}>&nbsp;{error}</li>)}
                                </ErrorList>
                                <OkButton onClick={handleOk}>OK</OkButton>
                            </>
                }
            </LoginBackground>
        </div>
    )
}

export default VerifyOtpLogin
