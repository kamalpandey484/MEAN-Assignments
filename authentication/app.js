const express = require('express');
const app = new express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");



//DB Connectivity
mongoose.connect('mongodb://localhost/auth-app', {useNewUrlParser: true})
    .then(()=>{console.log("MongoDB Connected")})
    .catch((err)=>{console.log(err)});

//Storing Session
app.use(cookieParser());
app.use(expressSession({
    secret: 'secret',
    secure:"false"
}))

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function(req, res, next) {
    user = req.user;
    console.log(user);
    next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



const PORT = 4000;
app.listen(PORT, console.log(`server started on port ${PORT}`));

