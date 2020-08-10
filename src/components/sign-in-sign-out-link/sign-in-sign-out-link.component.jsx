import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

import { auth } from '../../firebase/firebase.utils';

import './sign-in-sign-out-link.styles.scss'

const SignInSignOutLink = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className='options-container'>
            {
                currentUser ? (
                    <Link as='div' to='/' onClick={() => auth.signOut()}>Sign Out</Link>
                ) : (
                    <Link to='/signin'>SIGN IN</Link>
                )
            }
        </div>
    );
};

export default SignInSignOutLink;