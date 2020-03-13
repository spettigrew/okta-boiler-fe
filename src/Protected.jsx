import React, { useState, useEffect } from 'react';
import store from 'store';
import axios from 'axios'
import { useOktaAuth } from '@okta/okta-react';


function Protected() {

    const { authState, authService } = useOktaAuth();
    const [userEmail, setUserEmail] = useState(null);
    const [userFirstName, setUserFirstName] = useState(null);
    const [userLastName, setUserLastName] = useState(null)
    // using an npm package to isolate the mail for an axios call
    const email = store.get('okta-token-storage').idToken.claims.email
    useEffect(() => {
        axios.get(`http://localhost:5500/users/${email}`)
            .then(res => {
                setUserEmail(res.data.email)
                setUserFirstName(res.data.firstName)
                setUserLastName(res.data.lastName)
                console.log(res)
            })
            .catch(err => {
                console.log("Error alert", err)
            })
    }, [userEmail])

    if (authState.isPending) {
        return <div>Loading...</div>;
    }

    const button = authState.isAuthenticated ?
        <button onClick={() => { authService.logout() }}>Logout</button> :
        <button onClick={() => { authService.login() }}>Login</button>;


    return (
        <div>
            {
                userEmail === null
                    ?
                    <h1>Loading...</h1>
                    :
                    <>
                        <h1>Your user info</h1>
                        <h2>Email: {userEmail}</h2>
                        <h2>Name: {userFirstName} {userLastName}</h2>
                        {button}
                    </>
            }
        </div>
    )
}

export default Protected
