const express = require("express");
const app = express();
//importing bcrypt
const bcrypt = require("bcrypt")
//setting the view engine
app.set("view engine", "ejs")
//importing User model
const User = require("./models/User")

//GETTING THE PORT AND SECRET FROM THE .ENV FILE
const PORT = process.env.PORT || "3000";
const SECRET = process.env.SECRET || "secret"

//GETTING THE ROUTERS INSIDE home.js
//I need to do this to get data to render on the page
const HomeRouter = require("./routes/home.js")
app.use("/", HomeRouter)

app.listen(PORT, () =>
  console.log("🚀 Server Launch 🚀", `Listening on Port ${PORT}`)
);