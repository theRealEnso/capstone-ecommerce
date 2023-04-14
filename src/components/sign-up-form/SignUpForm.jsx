import {useState} from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utilities/firebase/firebaseUtilities';
import FormInput from '../form-input/FormInput';
import {SignUpContainer} from './signUpForm.styles.jsx';
import Button, {BUTTON_TYPE_CLASSES} from '../button/Button';

const SignUpForm = () => {

    const [formFields, setFormFields] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {displayName, email, password, confirmPassword} = formFields;

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
        if(password !== confirmPassword) {
            alert(`Error! Passwords do not match!`);
            return;
        };

        try {
            // const response = await signInWithGooglePopup();
            // console.log(response);
            const {user} = await createAuthUserWithEmailAndPassword(email, password); // destructure user from response object. Then create user with email and password
            
            await createUserDocumentFromAuth(user, {displayName}); // then the same user data to create user document
            setFormFields({displayName: '', email: '', password: '', confirmPassword:''});
        } catch (error) {
            error.code === 'auth/email-already-in-use' ? alert(`Cannot create user, email already in use`) : console.log(`user creation encountered an error: ${error}`);
        };
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' onChange={handleInputChange} name='displayName' value={displayName} type='text' required />

                <FormInput label='Email' onChange={handleInputChange} name='email' value={email} required type='email' />

                <FormInput label='Password' onChange={handleInputChange} name='password' value={password} required type='password' />

                <FormInput label='Confirm Password' onChange={handleInputChange} name='confirmPassword' value={confirmPassword} required type='password' />
                <Button type='submit' buttonType={BUTTON_TYPE_CLASSES.base}>Sign Up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;