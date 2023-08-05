import axios from 'axios';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [item, setItem] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    })
    const [error, setError] = useState(false)


    // ROUTING
    const navigate = useNavigate();
    const location = useLocation();

    const itemId = location.pathname.split("/")[2];


    // METHODS TO HANDLE ACTIONS
    const handleChange = (e) => {
        setItem(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8008/items/${itemId}`, item);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className='form'>
            <h1>Update Item</h1>
            <input type="text" placeholder='title' onChange={handleChange} name='title' />
            <input type="text" placeholder='description' onChange={handleChange} name='description' />
            <input type="number" placeholder='price' onChange={handleChange} name='price' />
            <input type="text" placeholder='cover' onChange={handleChange} name='cover' />

            <button onClick={handleClick}>Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    )
}

export default Update