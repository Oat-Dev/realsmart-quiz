const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');

//config
app.use(cors({
    credentials: true,
    origin: [ process.env.API_URL ? process.env.API_URL :"http://localhost:8000", process.env.WWW_URL ? process.env.WWW_URL : "http://localhost:3000"]
  }));
dotenv.config();
app.use(express.json());

//BodyParsing
app.use(express.urlencoded({
    extended: false
}));

//router
// app.set('view engine', 'ejs');
app.use('/user', require('./routes/user.routes'));

//port
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log("Server is start for port: " + PORT + " 🚀"))