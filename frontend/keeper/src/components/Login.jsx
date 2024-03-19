import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Login() {
    let Navigate = useNavigate();
    const [obj, setobj] = new useState({
        Username: "",
        password: ""
    });
    function handleChange(event) {
        let type = event.target.placeholder;
        let name = event.target.value
        setobj((prev) => {
            return {
                ...prev, [type]: name
            }
        })
    }
    function handleButton() {
        Navigate('/app');
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
            <button onClick={handleButton}>Login</button>
        </div >
    )
}


export default Login;