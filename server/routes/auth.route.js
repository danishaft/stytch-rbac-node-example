// Handles authentication routes:

// /login: Authenticates users and creates a session
// /magic-link: Sends a magic link for authentication
// /callback: Handles the magic link callback
// /logout: Logs out the user by revoking the Stytch session


const { Router } = require('express'); 

// controller
const authController = require('../controllers/auth.controller'); 

// Initialization 
const router = Router(); 

// Requests 
router.get('/signup', authController.signup); 
router.get('/login', authController.login); 
router.get('/logout', authController.logout); 

module.exports = router;
