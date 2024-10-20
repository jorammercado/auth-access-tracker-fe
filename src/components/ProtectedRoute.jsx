import {
    Navigate
} from 'react-router-dom'

const ProtectedRoute = ({ element: Component,
    currentUser,
    setCurrentUser,
    setToken }) => {

    const token = localStorage.getItem('authToken')

    return token ?
        <Component currentUser={currentUser} setCurrentUser={setCurrentUser} setToken={setToken} /> :
        <Navigate to="/login" />
}

export default ProtectedRoute
