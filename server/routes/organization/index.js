// Handles organization-related routes:

// POST /create: Creates a new organization
// GET /: Fetches the user's organization
// POST /invite: Invites a user to the organization

const { Router } = require('express')
// controller
const orgController = require('../../controllers/organization')
//middleware
const attachUser = require('../../middleware/user.middleware')
// const {authenticateAndAuthorize} = require('../middleware/auth.middleware')

// Initialization
const router = Router()
router.use(attachUser)

// Requests
//get all members of an org
router.get('/members', orgController.getOrganizationMembers)
//invite member to an org
router.post('/:id/invite', orgController.inviteMember)
//authenticate invite magic link token
router.post('/authenticate-invite-token', orgController.authenticateInviteToken)
//update member name
router.put('/members', orgController.updateInvitedUser)

module.exports = router
