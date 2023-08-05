import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// DB CONNECTION TO MYSQL SERVER
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "shop"
})

app.use(express.json());
app.use(cors());

// DEFAULT ROUTE: LANDING PAGE
app.get("/", (req, res) => {
    res.json("hello this is the backend");
})

// READ -- TO GET ALL ITEMS FROM DB & RETURN TO THIS ENDPOINT
app.get("/items", (req, res) => {
    const q = "SELECT * FROM ITEMS";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

// CREATE -- TO ADD NEW ITEM INTO THE DB -- POST METHOD
app.post("/items", (req, res) => {
    const q = "INSERT INTO ITEMS ( `title`, `description`, `cover`, `price`) VALUES (?)";
    const values = [
        req.body.title, req.body.description, req.body.cover, req.body.price
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Item has been created successfully");
    })
})

// DELETE -- TO REMOVE ITEM FROM DB
app.delete("/items/:id", (req, res) => {
    const itemsId = req.params.id;
    const q = " DELETE FROM ITEMS WHERE id = ? ";

    db.query(q, [itemsId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});
//TODO: continue from tutorial
//UPDATE -- TO UPDATE EXISTING VALUE
app.put("/items/:id", (req, res) => {
    const itemId = req.params.id;
    const q = "UPDATE items SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, itemId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});


// APPLICATION RUNS ON PORT 8008
app.listen(8008, () => {
    console.log("Connected to backend!!!");
})