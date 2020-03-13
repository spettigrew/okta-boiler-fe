import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import RegisterForm from './RegisterForm';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';

const AppWithRouterAccess = () => {
    const history = useHistory();
    const onAuthRequired = () => {
        history.push('/login');
    };

    return (
        <Security issuer='https://dev-436238.okta.com/oauth2/default'
            clientId='0oa3nw5q4C9pkoILO4x6'
            redirectUri={window.location.origin + '/implicit/callback'}
            onAuthRequired={onAuthRequired}
            pkce={true} >
            <Route path='/' exact={true} component={Home} />
            <SecureRoute path='/protected' component={Protected} />
            <Route path='/login' render={() => <Login baseUrl='https://dev-436238.okta.com' />} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/implicit/callback' component={LoginCallback} />
        </Security>
    );
};
export default AppWithRouterAccess;