import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from "../services/auth.service"

const Login = () => {
    const [details, setDetails] = useState({
        username: "",
        password: ""
    })

    // ROUTING
    const navigate = useNavigate();

    //HASHING
    // const sha256 = require('js-sha256');


    // METHODS TO HANDLE ACTIONS
    const handleChange = (e) => {
        setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleClick = async e => {
        e.preventDefault();
        try {
            const status = await axios.post("http://localhost:8008/admin-login", details);
            console.log(status.data);
            if (status.data) {
                authService.setToken(true);
                console.log("login successful");
                navigate("/"); // Go back to home once successfully added new item
            } else console.log("login failed");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='form'>
            <h1>Admin Login</h1>
            <input type="text" placeholder='username' onChange={handleChange} name='username' />
            <input type="password" placeholder='password' onChange={handleChange} name='password' />

            <button className='formButton' onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login