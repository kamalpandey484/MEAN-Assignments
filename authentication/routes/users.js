const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../passport');

//Login Page
router.get('/login', (req, res)=>res.render('login'));

//Register Page
router.get('/register', (req, res)=>res.render('register'));

//Register User
router.post('/register', (req, res) => {
    const {name, email, password} = req.body;

    const newUser = new User({
       name,
       email,
       password
    });

    newUser.save()
        .then(()=>{res.redirect('/users/login')})
});

//Login  User
router.post('/login', (req, res, next)=>{
        passport.authenticate('local' ,
        {
            successRedirect: '/dashboard',
            failureRedirect: '/users/login'
        })(req, res, next);
    });

//Logout user
router.get('/logout', (req,res)=>{
   req.logout();
   res.redirect('/users/login');
});

//facebook login
router.get( "/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

router.get("/facebookLogin",
    passport.authenticate("facebook", { scope: ["email"] }),
    (req, res, next) => {
        res.end();
    }
);


module.exports = router;