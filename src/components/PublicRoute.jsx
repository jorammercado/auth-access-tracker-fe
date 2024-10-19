
import {
    Navigate,
    Route
} from 'react-router-dom'

const PublicRoute = ({ element: Component,
    currentUser,
    setCurrentUser }) => {
    return !currentUser ?
        <Component setCurrentUser={setCurrentUser} currentUser={currentUser} /> :
        <Navigate to={`/users/${currentUser.user_id}/profile`} />
}

export default PublicRoute
