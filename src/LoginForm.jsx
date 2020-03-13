import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OktaAuth from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';

const LoginForm = ({ baseUrl }) => {
    const { authService } = useOktaAuth();
    const [sessionToken, setSessionToken] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const oktaAuth = new OktaAuth({ url: baseUrl });
        oktaAuth.signIn({ username, password })
            .then(res => setSessionToken(res.sessionToken))
            .catch(err => console.log('Found an error', err));
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    if (sessionToken) {
        authService.redirect({ sessionToken });
        return null;
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
    <input
                        id="username" type="text"
                        value={username}
                        onChange={handleUsernameChange} />
                </label>
                <label>
                    Password:
    <input
                        id="password" type="password"
                        value={password}
                        onChange={handlePasswordChange} />
                </label>
                <input id="submit" type="submit" value="Submit" />
            </form>
            <Link to='/register'>Don't have an account? Register here!</Link>
        </>

    );
};
export default LoginForm;