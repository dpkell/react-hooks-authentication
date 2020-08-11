import React, { useState, useEffect, useRef, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import LoginButton from '../login-button/login-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import { AuthContext } from '../../AuthContext';

import './sign-in.styles.scss';

const SignIn = ({ history }) => {
    
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const _isMounted = useRef(true);

    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, []);

    const { email, password } = userCredentials;

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