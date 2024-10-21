import React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import InputGroup from "react-bootstrap/InputGroup"
import {
    PasswordResetBackground
} from '../styles/signUpElements'
import {
    ResetPasswordButton
} from '../styles/loginElements'
import "../components/SignUpForm.css"
import "./Login.css"
import Swal from 'sweetalert2'
const API = import.meta.env.VITE_API_URL

export default function UserInfoEditForm() {
    const [user_id, setUserId] = useState(-1)
    const [isTokenVerified, setIsTokenVerified] = useState(false)
    const { token } = useParams()
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: "",
    })
    const navigate = useNavigate()

    const verifyToken = () => {
        fetch(`${API}/auth/verify-reset-token`, {
            method: "POST",
            body: JSON.stringify({
                token: token
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then((data) => {
                if (data?.error) {
                    throw new Error(data?.error)
                }
                else if (data?.err) {
                    throw new Error(data?.err)
                }
                else {
                    Swal.fire({
                        text: `Please update your password.`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#cf2e2e'
                    }).then(() => {
                        setUserId(data.user_id)
                        setIsTokenVerified(true)
                    })
                }
            })
            .catch((error) => {
                Swal.fire({
                    text: `Invalid or expired token!`,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#cf2e2e'
                })
                navigate(`/login`)
                console.error(error)
            })
    }

    useEffect(() => {
        if(!token) 
            navigate(`/login`)
        verifyToken()
    }, [token])

    const handlePasswordChange = (e) => {
        const { name, value } = e.target

        setPasswords(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const editUser = () => {
        fetch(`${API}/users/${user_id}/password-reset`, {
            method: "PUT",
            body: JSON.stringify({
                password: passwords.newPassword
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then((data) => {
                if (data?.error) {
                    throw new Error(data?.error)
                }
                else if (data?.err) {
                    throw new Error(data?.err)
                }
                else {
                    Swal.fire({
                        text: `User ${data?.username} successfully updated password.`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#cf2e2e'
                    }).then(() => {
                        navigate(`/login`)
                    })
                }
            })
            .catch((error) => {
                Swal.fire({
                    text: `Error updating password: ${error?.message}.`,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#cf2e2e'
                })
                console.error(error)
                navigate(`/login`)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (passwords.newPassword !== passwords.confirmPassword) {
            Swal.fire({
                text: 'New password and confirm new password do not match.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#cf2e2e'
            });
        } else {
            editUser()
        }
    }


    return (
        <>
            {
                isTokenVerified ?
                    <div className="form-new-user">
                        <PasswordResetBackground >
                            <Form className="form" noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="newPassword">
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <i className="bi bi-shield-lock"></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                className="edit-style"
                                                name="newPassword"
                                                type="password"
                                                placeholder="new password"
                                                value={passwords.newPassword}
                                                onChange={handlePasswordChange}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="confirmPassword">
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <i className="bi bi-shield-lock"></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                className="edit-style"
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="confirm new password"
                                                value={passwords.confirmPassword}
                                                onChange={handlePasswordChange}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <br></br>
                                <ResetPasswordButton type="submit">
                                    Update Password
                                </ResetPasswordButton>

                            </Form>
                        </PasswordResetBackground>
                    </div>
                    :
                    <div className="spinner-container">
                        <div className="loading-spinner"></div>
                    </div>
            }
        </>
    )
}