import React, { useState, useEffect } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios'

const RegisterForm = (props) => {
    const [data, setData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    })
    console.log(props.history)

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5500/users/register", data)
            .then(res => {
                setData({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: ''
                })
                props.history.push('/login')
            })
            .catch(err => {
                console.log('Error', err)
            })
    };


    return (
        <form onSubmit={handleSubmit}>

            <input type="email" name='email' placeholder='Enter your Email' value={data.email} onChange={handleChange} />
            <input type="text" name='firstName' placeholder='Enter your First Name' value={data.firstName} onChange={handleChange} />
            <input type="text" name='lastName' placeholder='Enter your Last Name' value={data.lastName} onChange={handleChange} />
            <input type="password" name='password' placeholder='Enter a password' value={data.password} onChange={handleChange} />

            <button type='submit'>Submit</button>

        </form>
    );
};
export default RegisterForm;