import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';

import LoginRedirectRoute from './components/login-redirect/login-redirect.component';

import { AuthProvider } from './AuthContext';

import './App.scss';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <LoginRedirectRoute exact path='/signin' />
      </Switch>
    </AuthProvider>
  );
}

export default App;
