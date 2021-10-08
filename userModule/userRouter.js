/* eslint-disable */

const express = require('express');
const userController = require('./userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/signup', userController.signup); 
router.post('/login', userController.login);
router.get('/signout', userController.signOut);
router.get('/welcome', authMiddleware, userController.welcome);
module.exports = router;
