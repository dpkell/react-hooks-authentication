import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import LoginButton from '../login-button/login-button.component';

import './sign-in.styles.scss';

const SignIn = () => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const { email, password } = userCredentials;

    const handleSubmit = event => {
        event.prevetDefault();

        //Sign-in authorization
    }

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
                />
                <div className='buttons'>
                    <LoginButton type='submit'>Sign In</LoginButton>
                    <LoginButton type='button' isGoogleSignIn>
                        Sign In with Google
                    </LoginButton>
                </div>
            </form>
        </div>
    );
};

export default SignIn;