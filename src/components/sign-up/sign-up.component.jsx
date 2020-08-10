import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import LoginButton from '../login-button/login-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const SignUp = () => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Submission Failed: Passwords do not match');
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword( 
                userCredentials.email, 
                userCredentials.password
            );

            await createUserProfileDocument(userCredentials, { displayName });

            setUserCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.log(error);
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

export default SignUp;