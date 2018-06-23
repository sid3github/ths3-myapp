const express = require('express');
const router = express.Router();
const User = require('../models/login');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
// let bcrypt = require('bcrypt');

router.get('/home',(req,res)=>{
   res.render('home');
});

router.get('/userpage',(req,res)=>{
    User.find(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.render('userdata' , {data: data})
        }
    })


});


router.get('/signupdata', (req,res) => {
    res.render('register');

});

router.post('/signupdata' ,(req,res) => {

    // console.log('registering user');

    User.register({username:req.body.username}, req.body.password, function(err,data) {
        if (err) {
            console.log('error while user register!', err);
        }

            console.log(data);
            res.redirect('/userpage');

        })
    //
    // let Data = new User({
    //     username: req.body.username,
    //     password: req.body.password
    // });
    //
    // Data.save(function (err) {
    //     if (err) throw err;
    // });

});

router.get('/logindata',(req,res)=>{
    res.render('log');
});

router.post('/logindata', passport.authenticate('local',
    {
        successRedirect: '/userpage',
        failureRedirect: '/logindata'
    }),(req,res)=>{
});


router.get('/logout',(req,res)=>{
    req.logout('/userpage');
    res.redirect('/signupdata');
});

router.get('/auth/google',
    passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read']}
    ));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/signupdata' }),
    function(req, res) {
        res.redirect('/userpage');
    });

//  ensureAuthenticated((req, res, next)=>{
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/signupdata');
// });

module.exports = router;









