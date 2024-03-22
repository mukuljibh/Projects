import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserDetails, authenticateUser } from './DatabaseReq';
function Login() {
    let Navigate = useNavigate(true);
    const [flag, setFlag] = useState();
    const [valid, setvalid] = useState(false);
    const [user, setUser] = new useState({
        Username: "",
        password: ""
    });
    function handleChange(event) {
        let type = event.target.placeholder;
        let name = event.target.value
        setUser((prev) => {
            return {
                ...prev, [type]: name
            }
        })
    }
    async function login() {
        let a = await authenticateUser(user);
        if (a) {
            Navigate('/app', { state: user.Username });
        }
        setvalid(a)
    }
    async function register() {
        let message = await registerUserDetails(user)
        if (message) {
            setFlag(true)
        }
        else {
            setFlag(false)
        }

    }
    async function authenticate() {
        let a = await authenticateUser(user);
        setvalid(a)
    }
    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="password"
                onChange={handleChange}
            />
            <button onClick={login}>Login</button>
            <button onClick={register}>register</button>
            <button onClick={authenticate}>authen</button>
            {flag ? <h1>succesfully register</h1> : <h1>username already exists</h1>}
            {valid ? <h1>authorized</h1> : <h1>Not authorized</h1>}
        </div >
    )
}


export default Login;