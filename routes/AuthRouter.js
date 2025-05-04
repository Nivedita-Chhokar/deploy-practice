const {login, register, logout} = require('../controllers/authController');
const express = require('express');
const ensureAuth = require('../middleware/authMiddleware');

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register); 
authRouter.post('/logout', ensureAuth, logout); 

module.exports = authRouter;