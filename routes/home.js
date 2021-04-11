//AUTH RELATED ROUTES

// const User = require("../models/User");
const router = require("express").Router()

//importing bcrypt
const bcrypt = require("bcrypt")

//importing User model
const User = require("../models/User")


//SIGNUP ROUTES
//one
router.get("/auth/signup", (req, res) => {
    res.render("auth/signup")
});
//two
router.post("/auth/signup", async (req, res) => {
    try {
        //generate salt for hashing
        const salt = await bcrypt.genSalt(10)
        //hash the password
        req.body.password = await bcrypt.hash(req.body.password, salt)
        //CREATE THE USER
        await User.create(req.body)
        //redirect to login page
        res.redirect("/auth/login")

        console.log(User)
    } catch (error) {
        res.json(error)
    }
});

//LOGIN ROUTES
//one
router.get("/auth/login", (req, res) => {
    res.render("auth/login")
});
//two
router.post("/auth/login", (req, res) => {
    res.send("login post")
});

//LOGOUT ROUTE
router.get("/auth/logout", (req, res) => {
    res.send("logout")
})

module.exports = router