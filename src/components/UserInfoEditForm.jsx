import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import InputGroup from "react-bootstrap/InputGroup"
import {
    SignUpBackground
} from '../styles/signUpElements'
import {
    EditButton
} from '../styles/loginElements'
import "./SignUpForm.css"
import Swal from 'sweetalert2'
const API = import.meta.env.VITE_API_URL

export default function UserInfoEditForm({ setCurrentUser, currentUser }) {
    const [user, setUser] = useState(currentUser)
    const navigate = useNavigate()
    const editUser = () => {
        const token = localStorage.getItem('authToken')
        fetch(`${API}/users/${currentUser.user_id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error)
                }
                else if (data.err) {
                    throw new Error(data.err)
                }
                else {
                    Swal.fire({
                        title: 'Success!',
                        text: `User ${data.username} successfully updated`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#cf2e2e'
                    }).then(() => {
                        setCurrentUser(data)
                        navigate(`/users/${data.user_id}/profile`)
                    })
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33'
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
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        editUser()
    }

    const handleBack = () => {
        navigate(-1)
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
                                    placeholder="@"
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
                    <br></br>
                    <EditButton type="submit">
                        Update User
                    </EditButton>
                    <EditButton onClick={handleBack} type="button"  >
                        Back
                    </EditButton>

                </Form>
            </SignUpBackground>
        </div>
    )
}