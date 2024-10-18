import {
    ProfileWrapper,
    SideRail,
    ProfileMain,
} from '../styles/portalElements'
import UserInfo from '../components/UserInfo'
function UserPortal({ currentUser, setCurrentUser }) {
    return (
        <ProfileWrapper>
            <SideRail />
            <ProfileMain>
                <UserInfo currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </ProfileMain>
        </ProfileWrapper>
    )
}

export default UserPortal