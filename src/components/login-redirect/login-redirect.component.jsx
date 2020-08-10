import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

import SignInAndSignUp from '../../pages/sign-in-sign-up-page/sign-in-sign-up-page.component';

const LoginRedirectRoute = ({component={SignInAndSignUp}, ...otherProps}) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route 
            {...otherProps}

            render = { () => 
                !currentUser ? (
                    <SignInAndSignUp />
                ) : (
                    <Redirect to='/' />
                )
            }
        />
    );
};

export default LoginRedirectRoute;
