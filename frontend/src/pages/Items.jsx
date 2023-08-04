import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Items = () => {
    const [items, setItems] = useState([]);

    useEffect(()=> {
        const fetchAllItems = async ()=>{
            try {
                const res = await axios.get("http://localhost:8008/items");
                setItems(res.data);
            } catch(err) {
                console.log(err)
            }
        }

        fetchAllItems();
    })
    return (
        <div>
            <h1>Shop</h1>
            <div className="items">
                {items.map(item => (
                    <div className="item" key={item.id}>
                        { item.cover && <img src={item.cover} alt="" /> }
                        <h2>{ item.title }</h2>
                        <p>{ item.description }</p>
                        <span>{ item.price }</span>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Add new item</Link></button>
        </div>
    )
}

export default Items