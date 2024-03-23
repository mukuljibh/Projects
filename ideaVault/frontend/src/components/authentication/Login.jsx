import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserDetails, authenticateUser } from '../dashboard/DatabaseReq';
import Header from '../dashboard/Header';
import Footer from '../dashboard/Footer';

function Login() {
    let Navigate = useNavigate(true);
    const [flag, setFlag] = useState(false);
    const [valid, setValid] = useState(false);
    const [user, setUser] = useState({
        Username: "",
        password: ""
    });

    function handleChange(event) {
        let type = event.target.placeholder;
        let name = event.target.value;
        setUser((prev) => {
            return {
                ...prev, [type]: name
            }
        });
    }

    async function login() {
        let userNoteData = await authenticateUser(user);
        if (userNoteData) {
            Navigate('/app', { state: user.Username });
        }
        setValid(userNoteData);
    }

    async function register() {
        let message = await registerUserDetails(user)
        setFlag(message ? true : false);
    }

    async function authenticate() {
        let a = await authenticateUser(user);
        setValid(a);
    }

    return (
        <div className="login-container">
            <Header />
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                onChange={handleChange}
                className="input-field"
            />
            <input
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="input-field"
            />
            <button onClick={login} className="login-btn">Login</button>
            <button onClick={register} className="register-btn">Register</button>
            <button onClick={authenticate} className="auth-btn">Authenticate</button>
            {flag ? <h1 className="success-msg">Successfully registered</h1> : <h1 className="error-msg">Username already exists</h1>}
            {valid ? <h1 className="auth-msg">Authorized</h1> : <h1 className="auth-msg">Not authorized</h1>}
            <Footer />
        </div >
    );
}

export default Login;
