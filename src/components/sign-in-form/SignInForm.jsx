import React from 'react';
import {signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword} from '../../utilities/firebase/firebaseUtilities';
import FormInput from '../form-input/FormInput';
import './signInForm.styles.scss';
import Button from '../button/Button';

const SignInForm = () => {
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


    const [formFields, setFormFields] = React.useState({
        email: '',
        password: '',
    });

    const {email, password} = formFields;

    const signInWithGoogle = async () => {
        try {
            const response = await signInWithGooglePopup();
            console.log(response);
            const {user} = response;
            const userDocRef = await createUserDocumentFromAuth(user);
        } catch (error) {
            console.log(error);
        };
    };

    const handleInputChange = (event) => {
        const {value, name} = event.target;
        setFormFields(previousValues => {
            return {
                ...previousValues,
                [name]: value
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
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
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' onChange={handleInputChange} name='email' value={email} required type='email' />
                <FormInput label='Password' onChange={handleInputChange} name='password' value={password} required type='password' />

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType='google'>Sign In With Google</Button>
                    {/* <Button onClick={signInWithGoogleRedirect} buttonType='google'>Sign In With Google Redirect</Button> */}
                </div>
            </form>
        </div>
    );
};

export default SignInForm;