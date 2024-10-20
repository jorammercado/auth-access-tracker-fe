import {
    ProfileWrapper,
    SideRail,
    ProfileMain,
} from '../styles/portalElements'
import UserInfo from '../components/UserInfo'
function UserPortal({ currentUser, setCurrentUser, setToken, handleLogout }) {
    return (
        <ProfileWrapper>
            <SideRail />
            <ProfileMain>
                <UserInfo
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    setToken={setToken}
                    handleLogout={handleLogout} />
            </ProfileMain>
        </ProfileWrapper>
    )
}

export default UserPortal