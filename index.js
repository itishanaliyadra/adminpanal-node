const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/mongoose')
const cookie = require('cookie-parser')
app.use(express.static(path.join(__dirname, './public')));
app.use('/ulplodesImg', express.static(path.join('ulplodesImg')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());


//passport js
const passport = require('passport');
const passportLocal = require('./config/passport-Local-strag');
const session = require('express-session');
app.use(session({
    name: "rnw",
    secret: "demo",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setpassportr);
app.use(cookie());




app.use('/', require('./routes'))
app.listen(8080, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log("Server :-" + 8080);
})