//File src/components/Login.tsx
//rafce
import React from 'react';
import axios from 'axios';

const Login = () => {

    const loginData = {username:"admin", password:"admin"};

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Trying to login');

        try {
            // const response = await axios.post('http://localhost:5000/login', {
            //     username: 'admin',
            //     password: 'admin',
            // });
            
            const response = await axios.post('http://localhost:5000/login', loginData);
            

            console.log('Login response:', response.data);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <React.Fragment>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                Username<input></input>
                Password<input></input>
                <button type="submit">Login</button>
            </form>
        </React.Fragment>
    );
};

export default Login;