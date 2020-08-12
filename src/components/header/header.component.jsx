import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/hooks-logo-outline.svg';


import { AuthContext } from '../../AuthContext';
import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className='header-container'>
            <div className='logo-title-container'>
                <Link to='/'>
                    <Logo className='logo' />
                </Link>

                <h1 className='header-title'>Mastering Hooks</h1>
            </div>

            <div className='options-container'>
                {
                    currentUser ? (
                        <Link as='div' to='/' onClick={() => auth.signOut()}>Sign Out</Link>
                    ) : (
                        <Link to='/signin'>SIGN IN</Link>
                    )
                }
            </div>
        </div>
);

}

export default Header;