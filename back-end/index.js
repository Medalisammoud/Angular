//require express
const express = require('express');
const path = require("path")
const app = express();
const cors = require('cors');

const connectDB = require('./config/connectDB');

//require .env
require('dotenv').config();

//PORT
const PORT = process.env.PORT

//Connect DataBase
connectDB();


// middleware global
app.use(cors());
app.use(express.json())

// router
app.use("/api/user", require("./routes/users"));
app.use("/api/category", require("./routes/categorie"));
app.use("/api/product", require("./routes/produit"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//Connect Server
app.listen(PORT, (err) =>
    err ? console.error(err)
        : console.log(`Running Server http://localhost:${PORT}`))

