// Handles authentication routes:

// /login: Authenticates users and creates a session
// /magic-link: Sends a magic link for authentication
// /callback: Handles the magic link callback
// /logout: Logs out the user by revoking the Stytch session
const { Router } = require('express')
// controller
const authController = require('../../controllers/auth')
//middleware
const {authenticateStytchSessionToken} = require('../../middleware/auth.middleware')
// Initialization
const router = Router()

// Requests
router.post('/send-magic-link', authController.sendMagicLink)
router.post('/authenticate-token', authController.authenticateMagicLink)
router.get('/sign-in/:orgId', authController.signIn)
router.post('/create-org', authController.createOrg)
router.post('/check-auth-status', authenticateStytchSessionToken, authController.isAuthenticated)
router.get('/log-out', authController.logout)

module.exports = router
