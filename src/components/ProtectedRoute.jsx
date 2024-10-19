import {
    Navigate
} from 'react-router-dom'

const ProtectedRoute = ({ element: Component,
    currentUser,
    setCurrentUser }) => {

    const token = localStorage.getItem('authToken')

    return token ?
        <Component currentUser={currentUser} setCurrentUser={setCurrentUser} /> :
        <Navigate to="/login" />
}

export default ProtectedRoute
