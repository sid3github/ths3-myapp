const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/register');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/login');
const mongoose = require('mongoose');
const config = require('./oauth.js');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

mongoose.connect('mongodb://localhost/authtest');
mongoose.Promise = Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({
    secret: 'node auth',
    resave: false,
    saveUninitialized: false
}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.use(new GoogleStrategy({
//         clientID: config.google.clientID,
//         clientSecret: config.google.clientSecret,
//         callbackURL: config.google.callbackURL,
//         passReqToCallback: true
//     },
passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));


app.set('view engine', 'ejs');

app.use('/' ,dataRoutes);

app.listen(1337,function(){
    console.log('server is running at port 1337');
});

