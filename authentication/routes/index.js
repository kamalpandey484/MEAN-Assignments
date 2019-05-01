const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));


router.get('/dashboard' , ensureAuthenticated, (req, res) =>
    res.render('dashboard')
);

function ensureAuthenticated (req,res,next){
    if (req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = router;