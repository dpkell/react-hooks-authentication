import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import LoginButton from '../login-button/login-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';


import './sign-up.styles.scss';

const SignUp = ({history}) => {

    // User Credentials State

    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Loading State

    const [isLoading, setIsLoading] = useState(false);

    /**
     * useRef is used to becasue we a reference object pointed to the component for the full lifetime of the component.
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

    const { displayName, email, password, confirmPassword } = userCredentials;
    
    /**
     * Handles form submission. Ensures passwords are equal and sets loading state to true. Performs
     * the firebase user creation with email and password as well as creates the new user document within
     * firestore. After successfully completing, resets User Credentials state, and resets isLoading state.
     */
    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            if (_isMounted.current) {
                const { user } = await auth.createUserWithEmailAndPassword(email, password);
                await createUserProfileDocument(user, { displayName });
                history.push('/');
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            if (_isMounted.current) {
                setUserCredentials({
                    displayName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                setIsLoading(false);
            }
            
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span className='sub-title'>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput 
                    type = 'text'
                    name = 'displayName'
                    value = {displayName}
                    handleChange= {handleChange}
                    label = 'Display Name'
                    required
                />
                <FormInput 
                    type = 'email'
                    name = 'email'
                    value = {email}
                    handleChange= {handleChange}
                    label = 'Email'
                    required
                />
                <FormInput 
                    type = 'password'
                    name = 'password'
                    value = {password}
                    handleChange= {handleChange}
                    label = 'Password'
                    required
                />
                <FormInput 
                    type = 'password'
                    name = 'confirmPassword'
                    value = {confirmPassword}
                    handleChange= {handleChange}
                    label = 'Confirm Password'
                    required
                />

                <div className='form-button'>
                    <LoginButton type='submit'>SIGN UP</LoginButton>
                </div>
            </form>
        </div>
    );
    
};

export default withRouter(SignUp);