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
router.post("/auth/login", async (req,res) => {
    try{
        //check if the user exists (must use findOne and not find)
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            //create user session property
            const result = await bcrypt.compare(req.body.password, user.password)
            if (result) {
                req.session.userId = user._id
                //redirect to /images
                res.redirect("/images")
            } 
            //send error is password does not match
            else {
                res.json({ error: "User does not exist "})
            }
        } 
        //send error if user does not match
        else {
            res.json({ error: "user does not exist"})
          }
        } catch (error) {
        res.json(error)
    }
})

//LOGOUT ROUTE
router.get("/auth/logout", async (req, res) => {
    // remover the userId property from the session
    res.session.userId = null
    //redirect back to the main page
    res.redirect("/")
})

module.exports = router