import {useState} from 'react';
import {useDispatch} from 'react-redux';
// import {signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../utilities/firebase/firebaseUtilities';

import FormInput from '../form-input/FormInput';
import Button, {BUTTON_TYPE_CLASSES} from '../button/Button.jsx';

import { signInWithGoogle, signInWithEmail } from '../../store/user/user-action';

import {SignInContainer, ButtonsContainer} from './signInForm.styles.jsx';

const SignInForm = () => {
    const dispatch = useDispatch();

    // remove redirect sign in method
    // React.useEffect(() => {
    //     const signInWithRedirect = async () => {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);
    //         if(response) {
    //             const {user} = response;
    //             const userDocRef = await createUserDocumentFromAuth(user);
    //             return () => {};
    //         };
    //     };
    
    //     signInWithRedirect();
    // }, []);


    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formFields;

    const handleInputChange = (event) => {
        const {value, name} = event.target;
        setFormFields(previousValues => {
            return {
                ...previousValues,
                [name]: value
            };
        });
    };

    const googleSignIn = async () => {
        dispatch(signInWithGoogle());
        // try {
        //     const response = await signInWithGooglePopup();
        //     console.log(response);
        //     await signInWithGooglePopup();
        // } catch (error) {
        //     console.log(error);
        // };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(signInWithEmail(email, password));
            // const response = await signInAuthUserWithEmailAndPassword(email, password);
            // console.log(response);
            // const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            // await signInAuthUserWithEmailAndPassword(email, password);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert(`Error: incorrect password for email`);
                    break;
                case 'auth/user-not-found':
                    alert(`Error: no user associated with this email`);
                    break;
                default:
                    console.log(error);
            };
        };
    };

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' onChange={handleInputChange} name='email' value={email} required type='email' />
                <FormInput label='Password' onChange={handleInputChange} name='password' value={password} required type='password' />

                <ButtonsContainer>
                    <Button type='submit' buttonType={BUTTON_TYPE_CLASSES.base}>Sign In</Button>
                    <Button type='button' onClick={googleSignIn} buttonType={BUTTON_TYPE_CLASSES.google}>Sign In With Google</Button>
                    {/* <Button onClick={signInWithGoogleRedirect} buttonType='google'>Sign In With Google Redirect</Button> */}
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;