//IMPORTING THE SCHEMA FOR MONGOOS
const { Schema, model } = require("../db/connection.js");

//IMAGE SCHEMA
const Image = new Schema({
    text: String,
})

//USER SCHEMA
const UserImageSchema = new Schema({

    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    //this puts the image schema into an array
    images: [Image]}, 
    { timestamps: true })

//USER MODEL
const User = model("User", UserSchema)

//EXPORT THE USER MODEL
module.exports = User