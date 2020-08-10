import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/hooks-logo-outline.svg';
import SignInSignOutLink from '../sign-in-sign-out-link/sign-in-sign-out-link.component';

import './header.styles.scss';

const Header = () => (
    <div className='header-container'>
        <div className='logo-title-container'>
            <Link to='/'>
                <Logo className='logo' />
            </Link>

            <h1 className='header-title'>Mastering Hooks</h1>
        </div>

        <SignInSignOutLink />
    </div>
);

export default Header;