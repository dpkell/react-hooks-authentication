import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import LoginButton from '../login-button/login-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = ({ history }) => {
    
    // User Credentials State
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    /**
     * useRef is used to becasue we need a reference object pointed to the component for the full lifetime of the component.
     * This is especially true since we are using async functions within the component and need to make sure that the 
     * component properly unmounts using useEffect after our async calls to firebase successfully executes.
     */
    const _isMounted = useRef(true);

    // Component clean-up/unsubscribe function. Sets .current property of our useRef object to false.
    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, []);

    // Deconstruction of User Credentials to make available for handleChange and handleSubmit functions
    const { email, password } = userCredentials;

    /**
     * Handles form submission. Once signInWithEmailAndPassword completes, resets userCredentials, and pushes user back to homepage.
     */
    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        try {
            if (_isMounted.current) {
                await auth.signInWithEmailAndPassword(email, password);
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (_isMounted.current) {
                setIsLoading(false);
                setUserCredentials({
                    email: '',
                    password: ''
                });
            }
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span className='sub-title'>Sign in using your email and password</span>
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <FormInput 
                    type = 'email'
                    name = 'email'
                    value = {email}
                    handleChange = {handleChange}
                    label='Email'
                    required
                />
                <FormInput 
                    type = 'password'
                    name = 'password'
                    value = {password}
                    handleChange= {handleChange}
                    label='Password'
                    required
                />
                <div className='buttons'>
                    <LoginButton type='submit'>Sign In</LoginButton>
                    <LoginButton type='button' onClick={signInWithGoogle} isGoogleSignIn>
                        Sign In with Google
                    </LoginButton>
                </div>
            </form>
        </div>
    );
};

export default withRouter(SignIn);