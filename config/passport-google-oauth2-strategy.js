const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tell passport to use new strategy for google login 
passport.use(new googleStrategy({
        clientID:"803672811755-8hku4h5dt163fli5ujjn088cok0efhcp.apps.googleusercontent.com",
        clientSecret:"-482DTzNrfBXPKwU51NOtE0H",
        callbackURL:"http://localhost:8002/users/auth/google/callback",
    },

    function(accessToken,refreshToken,profile,done){
        //Find a User
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error in google strategy-passport",err);
                return;
            }
            console.log(profile);
            if(user){
                //if found , set this user as req.user
                return done(null,user);
            }else{
                //else not found, create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("Error in creating user",err);
                        return;
                    }
                    return done(null,user);
                });
            }
        });
    }
));

module.exports = passport;