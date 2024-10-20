import { useNavigate, Link } from "react-router-dom"
import "./UserInfo.css"
import {
    ProfileButton
} from '../styles/loginElements'

const API = import.meta.env.VITE_API_URL

const UserInfo = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate()

    const handleDelete = () => {
        const token = localStorage.getItem('authToken')
        const httpOptions = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}` 
            }
        }
        fetch(`${API}/users/${currentUser.user_id}`, httpOptions)
            .then((res) => res.json())
            .then(data => {
                if (data.error)
                    throw new Error(data.error)
                else if (data.err)
                    throw new Error(data.err)
                else {
                    setCurrentUser(null)
                    navigate("/login")
                }
            })
            .catch((error) => console.error(error))
    }

    return (
        <div >
            <article className="wrapper">
                <table className="table table-bordered table-responsive table-dark table-striped ">
                    <tbody>
                        <tr >
                            <th colSpan="4" className="centered-content">
                                {
                                    currentUser?.profile_img === "profile image" ?
                                        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                            </svg>
                                        </div>
                                        :
                                        <img className="headshot" src={currentUser?.profile_img} />
                                }
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="4">
                                <div className="row-content">
                                    <span className="label">Full Name:</span>
                                    <span className="value">{currentUser.firstname} {currentUser.lastname}</span>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="4">
                                <div className="row-content">
                                    <span className="label">Email:</span>
                                    <span className="value">{currentUser.email}</span>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="4">
                                <div className="row-content">
                                    <span className="label">Username:</span>
                                    <span className="value">{currentUser.username}</span>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="4">
                                <div className="row-content">
                                    <span className="label">DOB:</span>
                                    <span className="value">{currentUser.dob}</span>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="4">
                                <div className="row-content">
                                    <span className="label">Member Since:</span>
                                    <span className="value">{currentUser.registration_date.split("T")[0]},&nbsp;&nbsp;{currentUser.registration_date.split("T")[1].replace("Z", " UTC")}</span>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div className="show-navigation">
                    <ProfileButton onClick={() => { navigate(`/users/${currentUser.user_id}/profile/edit`) }}>
                        edit
                    </ProfileButton>
                    <ProfileButton onClick={handleDelete}>
                        delete account
                    </ProfileButton>
                    <ProfileButton onClick={() => {
                        localStorage.removeItem('authToken')
                        setCurrentUser(null)
                        navigate(`/`)
                    }}>
                        logout
                    </ProfileButton>
                </div>
                <br></br>
            </article>
        </div>
    )
}
export default UserInfo