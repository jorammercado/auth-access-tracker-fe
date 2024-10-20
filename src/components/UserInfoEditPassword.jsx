import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import InputGroup from "react-bootstrap/InputGroup"
import {
    PasswordUpdateBackground
} from '../styles/signUpElements'
import {
    EditButton
} from '../styles/loginElements'
import "./SignUpForm.css"
import Swal from 'sweetalert2'
const API = import.meta.env.VITE_API_URL

export default function UserInfoEditForm({ setCurrentUser, currentUser }) {
    const [passwords, setPasswords] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    })
    const navigate = useNavigate()
    const editUser = () => {
        const token = localStorage.getItem('authToken')
        fetch(`${API}/users/${currentUser.user_id}/password`, {
            method: "PUT",
            body: JSON.stringify({
                password: passwords.password,
                newPassword: passwords.newPassword
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then((data) => {
                if (data?.error) {
                    throw new Error(data?.error)
                }
                else if (data.err) {
                    throw new Error(data?.err)
                }
                else {
                    Swal.fire({
                        text: `User ${data?.username} successfully updated`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#cf2e2e'
                    }).then(() => {
                        setCurrentUser(data)
                        navigate(`/users/${data?.user_id}/profile`)
                    })
                }
            })
            .catch((error) => {
                Swal.fire({
                    text: error?.message,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33'
                })
                console.error(error)
            })
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target

        setPasswords(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (passwords.newPassword !== passwords.confirmPassword) {
            Swal.fire({
                text: 'New password and confirm password do not match.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33'
            });
        } else {
            editUser()
        }
    }

    const handleBack = () => {
        navigate(-1)
    }


    return (
        <div className="form-new-user">
            <PasswordUpdateBackground >

                <Form className="form" noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="password">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="bi bi-shield-lock-fill"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="edit-style"
                                    required
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    value={passwords.password}
                                    onChange={handlePasswordChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
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
                    <EditButton type="submit">
                        Update Password
                    </EditButton>
                    <EditButton onClick={handleBack} type="button"  >
                        Back
                    </EditButton>

                </Form>
            </PasswordUpdateBackground>
        </div>
    )
}