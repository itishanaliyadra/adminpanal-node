const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const registerData = require('../models/registerModels');
const bcrypt = require('bcrypt');
passport.use(new passportLocal({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        let user = await registerData.findOne({ email: email })
        if (!user || user.password !=password) {
            
            return done(null, false)
        }
        return done(null, user)
    } catch (error) {
        console.log(error);
        return
    }
}));
passport.serializeUser((user, done) => {
    return done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    try {
        let Data = await registerData.findById(id)
        return done(null , Data)
    } catch (error) {
        return done(error, false)
    }
})
passport.checkAuthenticated= (req,res,next)=>{
    if(req.isAuthenticated()){
       return next();
    }
    return res.redirect('/')
}
passport.setpassportr= (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
   return next();
}


module.exports = passport;