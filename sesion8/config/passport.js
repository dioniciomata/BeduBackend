const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
}, function(email,password,done){
    User.findOne({where: {email: email}})
    .then(function(user){
        if (!user || !user.validarPassword(password)){
            return done(null, false, {errors: {'email or password' : 'wrong'}})
        }
        return done(null, user);
    }).catch(done);
}));