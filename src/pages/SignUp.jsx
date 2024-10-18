import SignUpForm from "../components/SignUpForm"

function SignUp({ setCurrentUser }) {
    return (
        <div >
            <SignUpForm setCurrentUser={setCurrentUser} />
        </div>
    )
}

export default SignUp
