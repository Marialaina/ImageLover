//AUTH RELATED ROUTES

// const User = require("../models/User");
const router = require("express").Router()
//importing bcrypt
const bcrypt = require("bcrypt")
//importing User model
const User = require("../models/User")

//MIDDLEWARE TO CHECK IF USERID IS IN SESSIONS AND CREATE REQ.USER
const addUserToRequest = async (req, res, next) => {
    if (req.session.userId) {
        req.user = await User.findById(req.session.userId)
        next()
    } else {
        next()
    }
    console.log(req)
}

//AUTH MIDDLEWARE
const isAuthorized = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect("/auth/login")
    }
}
//router specified middleware
router.use(addUserToRequest)
//router routes
router.get("/", (req, res) => {
    res.render("home")
})

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
                res.json({ error: "User does not exist"})
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
//Logout Route
router.get("/auth/logout", (req, res) => {
  // remove the user property from the session
  req.session.userId = null
  // redirect back to the main page
  res.redirect("/")
})

// Goals Index Route render view (we will include new form on index page) (protected by auth middleware)
router.get("/images", isAuthorized, async (req, res) => {
    const user = await User.findOne({ username: req.user.username })

    res.render("images", {
        images: req.user.images
    })
})

//images being created when the form submitted
router.post("/images", isAuthorized, async (req, res) => {
    //fetch up to date user
    const user = await User.findOne({ username: req.user.username })
    //push new goal and save
    user.images.push(req.body)
    await user.save()
    //redirectc back to images index
    res.redirect("/images")
    
})

module.exports = router