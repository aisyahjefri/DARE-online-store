import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Items = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const res = await axios.get("http://localhost:8008/items");
                setItems(res.data);
            } catch (err) {
                console.log(err)
            }
        }

        fetchAllItems();
    })

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8008/items/${id}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Shop</h1>
            <div className="items">
                {items.map(item => (
                    <div className="item" key={item.id}>
                        {item.cover && <img src={item.cover} alt="" />}
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <span>{item.price}</span>
                        <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                        <button className="update"><Link to={`/update/${item.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Add new item</Link></button>
        </div>
    )
}

export default Items