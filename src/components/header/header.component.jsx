import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/hooks-logo-outline.svg';

import './header.styles.scss';

const Header = () => (
    <div className='header-container'>
        <div className='logo-title-container'>
            <Link to='/'>
                <Logo className='logo' />
            </Link>

            <h1 className='header-title'>Mastering Hooks</h1>
        </div>

        <div className='options-container'>
            <Link to='/signin'>Sign In</Link>
        </div>
    </div>
);

export default Header;