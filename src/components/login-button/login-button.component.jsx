import React from 'react';

import './login-button.styles.scss';

const LoginButton = ({children, isGoogleSignIn, ...otherProps }) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} login-button`} {...otherProps}>
        {children}
    </button>
);

export default LoginButton;