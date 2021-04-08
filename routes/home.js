//AUTH RELATED ROUTES

const router = require("express").Router()

//SIGNUP ROUTES
//one
router.get("/auth/signup", (req, res) => {
    res.render("auth/signup")
});
//two
router.post("/auth/signup", (req, res) => {
    res.send("signup post")
});

//LOGIN ROUTES
//one
router.get("/auth/login", (req, res) => {
    res.send("login get")
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