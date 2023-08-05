import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [items, setItems] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    })

    // ROUTING
    const navigate = useNavigate();

    // METHODS TO HANDLE ACTIONS
    const handleChange = (e) => {
        setItems(prev => ({...prev, [e.target.name]: e.target.value }))
    }
    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8008/items", items);
            navigate("/"); // Go back to home once successfully added new item
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className='form'>
            <h1>Add New Item</h1>
            <input type="text" placeholder='title' onChange={handleChange} name='title'/>
            <input type="text" placeholder='description' onChange={handleChange} name='description'/>
            <input type="number" placeholder='price' onChange={handleChange} name='price'/>
            <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>

            <button className='formButton' onClick={handleClick}>Add Item</button>
        </div>
    )
}

export default Add