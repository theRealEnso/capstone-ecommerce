import { signInWithGooglePopup, createUserDocumentFromAuth} from "../../utilities/firebase/firebaseUtilities";

const SignIn = () => {
    const logGoogleUser = async () => {
        try {
            const response = await signInWithGooglePopup();
            console.log(response);
            const {user} = response;
            createUserDocumentFromAuth(user);
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div>
            <h1>I am the sign-in page!</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    );
};

export default SignIn;