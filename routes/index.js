var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// =============
// ROUTE
// =============
// Root Route
router.get("/", function(req, res){
    res.render("landing");
});


// =============
// AUTH ROUTE
// =============

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to yelpCamp " + user.username);
           res.redirect("/campgrounds"); 
        });
    });
});

// Login
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req, res) {
});

// Logout
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("error", "Logged you out!")
    res.redirect("/campgrounds");
});



module.exports = router;