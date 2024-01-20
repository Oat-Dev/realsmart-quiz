const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

//config
app.use(
  cors({
    credentials: true,
    origin: [
      process.env.API_URL ? process.env.API_URL : "http://localhost:3000",
      process.env.WWW_URL ? process.env.WWW_URL : "http://localhost:8080",
    ],
  })
);
dotenv.config();
app.use(express.json());

//mongodb connect
const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect MongoDB!");
  })
  .catch((err) => console.log(err));

//BodyParsing
app.use(
  express.urlencoded({
    extended: false,
  })
);

//router
app.use("/user", require("./routes/user.routes"));

//port
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log("Server is start for port: " + PORT + " 🚀"));
