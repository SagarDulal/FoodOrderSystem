var express = require('express');
var router = express.Router();

// Get Users model
var User = require('../models/user');
var userController  = require('../controllers/users')
/*
 * GET register
 */
router.get('/register', userController.getUserRegister)

/*
 * POST register
 */
router.post('/register', userController.postUserRegister)

/*
 * GET login
 */
router.get('/login', userController.getLogin)

/*
 * POST login
 */
router.post('/login', userController.postLogin)

/*
 * GET logout
 */
router.get('/logout', userController.getLogout)

// Exports
module.exports = router;


