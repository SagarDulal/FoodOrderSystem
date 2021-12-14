const User = require('../models/user')
const bcrypt = require('bcryptjs')
const passport  = require('passport')

const getUserRegister = (req,res)=>{

    res.render('register', {
        title: 'Register'
    });
}

const postUserRegister = async (req,res)=>{

    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required!').notEmpty();
    req.checkBody('email', 'Email is required!').isEmail();
    req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('password', 'Password is required!').notEmpty();
    req.checkBody('password2', 'Passwords do not match!').equals(password);

    const errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors,
            user: null,
            title: 'Register'
        });
    } else {
       await User.findOne({username: username}, function (err, user) {
            if (err)
                console.log(err);

            if (user) {
                req.flash('danger', 'Username exists, choose another!');
                res.redirect('/users/register');
            } else {
                const user = new User({
                    name: name,
                    email: email,
                    username: username,
                    password: password,
                    admin: 0
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err)
                            console.log(err);

                        user.password = hash;

                        user.save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                req.flash('success', 'You are now registered!');
                                res.redirect('/users/login')
                            }
                        });
                    });
                });
            }
        });
    }


    
}

const getLogin = (req,res)=>{
    if (res.locals.user) res.redirect('/');
    
    res.render('login', {
        title: 'Log in'
    });
}

const postLogin = (req,res, next)=>{
    
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
    
}


const getLogout = (req,res)=>{
    req.logout();
    
    req.flash('success', 'You are logged out!');
    res.redirect('/users/login');

}

module.exports = {
    getUserRegister,
    postUserRegister,
    getLogin,
    postLogin,
    getLogout

}