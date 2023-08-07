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

// LOGGING
let now = new Date();

app.use(express.json());
app.use(cors());

// DEFAULT ENDPOINT: LANDING PAGE
app.get("/", (req, res) => {
    console.log("GET ENDPOINT");
    console.log(res);
    console.log("---");
})

// READ -- TO GET ALL ITEMS FROM DB & RETURN TO THIS ENDPOINT
app.get("/items", (req, res) => {
    console.log("GET ITEM: ", now);

    const q = "SELECT * FROM ITEMS";
    db.query(q, (err, data) => {
        if (err) {
            console.log("QUERY FAILURE: " + q)
            return res.json(err);
        }
        console.log("QUERY SUCCESS: " + q);
        return res.json(data);
    })
    console.log("---");
})

// CREATE -- TO ADD NEW ITEM INTO THE DB -- POST METHOD
app.post("/items", (req, res) => {
    console.log("POST ITEM: ", now);
    const q = "INSERT INTO ITEMS ( `title`, `description`, `cover`, `price`) VALUES (?)";
    const values = [
        req.body.title, req.body.description, req.body.cover, req.body.price
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.log("QUERY FAILURE: " + q);
            return res.json(err);
        }

        console.log("QUERY SUCCESS: " + q);
        return res.json("Item has been created successfully");
    })
    console.log("---");
})

// DELETE -- TO REMOVE ITEM FROM DB
app.delete("/items/:id", (req, res) => {
    console.log("DELETE ITEM: ", now);
    const itemsId = req.params.id;
    const q = " DELETE FROM ITEMS WHERE id = ? ";

    db.query(q, [itemsId], (err, data) => {
        if (err) {
            console.log("QUERY FAILURE: " + q);
            return res.send(err);
        }

        console.log("QUERY SUCCESS: " + q);
        return res.json(data);
    });
    console.log("---");
});

//UPDATE -- TO UPDATE EXISTING VALUE
app.put("/items/:id", (req, res) => {
    console.log("PUT ITEM: ", now);
    const itemId = req.params.id;
    const q = "UPDATE items SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, itemId], (err, data) => {
        if (err) {
            console.log("QUERY FAILURE: " + q);
            return res.send(err);
        }

        console.log("QUERY SUCCESS: " + q);
        return res.json(data);
    });
    console.log("---");
});

// GET ITEMS IN THE CART - ID PASSED IN AS A STRING
app.post("/get-cart", (req, res) => {
    console.log("GET CART: ", now);
    // GET USER DETAILS FROM DB [ADMIN]
    const q = "SELECT * from items WHERE id IN (?)";
    var values = "";
    console.log(req.body);
    if (req.body.id.length > 0) {
        values = req.body["id"].split(",");
        var intVal = [];
        for (var i = 0; i < values.length; i++) intVal.push(parseInt(values[i]))

        console.log(values);

        // EXECUTE QUERY
        db.query(q, intVal, (err, data) => {
            if (err) {
                console.log("QUERY FAILURE: " + q);
                return res.json(err);
            }

            console.log(data);
            console.log("QUERY SUCCESS: " + q);
            return res.json(data);
        })
    }
    console.log("---");
})

// GET USER FROM DB & VALIDATE (AUTHENTICATION)
app.post("/admin-login", (req, res) => {
    console.log("ADMIN LOGIN: ", now);
    // GET USER DETAILS FROM DB [ADMIN]
    const q = "SELECT username, password from login WHERE username = ? AND password = ?";

    const values = [req.body.username, req.body.password];

    db.query(q, values, (err, data) => {
        if (err) {
            console.log("ADMIN LOGIN FAILURE: ", now);
            return res.send(err);
        }

        if (data.length > 0) {
            console.log("ADMIN LOGIN SUCCESS: ", now);
            return res.send(true)
        }
        console.log("ADMIN LOGIN FAILURE: ", now);
        return res.send(false)
    })
    console.log("---");
})

// APPLICATION RUNS ON PORT 8008
app.listen(8008, () => {
    console.log("Connected to backend!!!");
})