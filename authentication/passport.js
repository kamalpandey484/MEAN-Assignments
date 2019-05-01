const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');

let register = (user) => {
    let newUser = User({
        name: user.name,
        password: user.password,
        email: user.email
    });

    return  newUser.save()

};

passport.use(
    new LocalStrategy({usernameField: 'email'} , (email, password, done)=>{
        //Match User
        User.findOne({email: email})
            .then(user=>{
                if(!user){
                    return done(null, false)
                }

                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user)
                    }else {
                        return done(null, false)
                    }
                });
            })
            .catch(err=>{console.log(err)})
    })
);

passport.use(
    new FacebookStrategy(
        {
            clientID: '414953629327151',
            clientSecret: '175c4eaff93a3748272d659cb5a91016',
            callbackURL: 'http://localhost:4000/users/facebook/callback',
            profileFields: ["id", "email", "name"]
        },
        function(accessToken, refreshToken, profile, done) {
            const { email, last_name, first_name } = profile._json;
            const tempUser = {
                name: `${first_name} ${last_name}`,
                email,
                password: "NA"
            };

            User.findOne({email:email})
                .then(res => {
                    if (!res) {
                        return register(tempUser);
                    }
                })
                .then(res => {
                    done(null, tempUser);
                })
                .catch(err => {
                    console.log("internal errror", err);
                });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});



passport.deserializeUser((user, done) => {

    User.findOne({email:user.email}, (err, user)=>{
        done(err, user);
    })
});


module.exports = passport;