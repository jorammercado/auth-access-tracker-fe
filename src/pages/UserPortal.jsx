import {
    ProfileWrapper,
    SideRail,
    ProfileMain,
} from '../styles/portalElements'
import UserInfo from '../components/UserInfo'
function UserPortal({ currentUser, setCurrentUser, setToken }) {
    return (
        <ProfileWrapper>
            <SideRail />
            <ProfileMain>
                <UserInfo currentUser={currentUser} setCurrentUser={setCurrentUser} setToken={setToken} />
            </ProfileMain>
        </ProfileWrapper>
    )
}

export default UserPortal