import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import InputGroup from "react-bootstrap/InputGroup"
import {
    SignUpBackground,
    SignUpButton
} from '../styles/signUpElements'
import "./SignUpForm.css"
import Swal from 'sweetalert2'
const API = import.meta.env.VITE_API_URL

export default function SignUpForm({ setCurrentUser }) {
    const [user, setUser] = useState({
        user_id: 0,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        dob: "",
        registration_date: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const addUser = () => {
        fetch(`${API}/users`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
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
                        title: 'Success!',
                        text: `User ${data?.createdUser?.username} successfully created`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#cf2e2e'
                    }).then(() => {
                        setCurrentUser(data?.createdUser, data?.token)
                        navigate(`/users/${data?.createdUser?.user_id}/profile`)
                        setUser({
                            user_id: 0,
                            firstname: "",
                            lastname: "",
                            username: "",
                            email: "",
                            password: "",
                            dob: "",
                            registration_date: ""
                        })
                    })
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#cf2e2e'
                })
                console.error(error)
            })
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setUser({
            ...user,
            [name]: type === "checkbox" ? checked : value,
        })
        if (name === "confirm-password") {
            setConfirmPassword(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user.password !== confirmPassword) {
            Swal.fire({
                title: 'Error',
                text: 'Passwords do not match. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#cf2e2e'
            })
        } else {
            addUser()
        }
    }

    return (
        <div className="form-new-user">
            <SignUpBackground >

                <Form className="form" noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="username">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="bi bi-person-fill"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="edit-style"
                                    required
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    value={user.username}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="email">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="bi bi-envelope"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="edit-style"
                                    name="email"
                                    type="text"
                                    placeholder="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="firstname">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="small-icon" >FN</i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="edit-style"
                                    name="firstname"
                                    type="text"
                                    placeholder="first name"
                                    value={user.firstname}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="lastname">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="small-icon" >LN</i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="edit-style"
                                    name="lastname"
                                    type="text"
                                    placeholder="last name"
                                    value={user.lastname}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="dob">
                            <InputGroup>
                                <InputGroup.Text >
                                    <i className="bi bi-cake2"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="edit-style"
                                    name="dob"
                                    type="text"
                                    placeholder="DOB"
                                    value={user.dob}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="password">
                            <InputGroup>
                                <InputGroup.Text >
                                    <i className="bi bi-shield-lock  "></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="edit-style"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="confirm-password">
                            <InputGroup>
                                <InputGroup.Text >
                                    <i className="bi bi-shield-lock  "></i>
                                </InputGroup.Text>
                                <Form.Control
                                    className="edit-style"
                                    name="confirm-password"
                                    type="password"
                                    placeholder="confirm password"
                                    value={confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <SignUpButton type="submit">
                        Create User
                    </SignUpButton>
                </Form>
            </SignUpBackground>
        </div>
    )
}