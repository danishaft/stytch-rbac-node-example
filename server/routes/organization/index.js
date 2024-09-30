// Handles organization-related routes:
// POST /create: Creates a new organization
// GET /: Fetches the user's organization
// POST /invite: Invites a user to the organization

const { Router } = require('express')
// controller
const {
    addOrgAndMember, 
    updateOrgAndMember,
    getOrganizationMembers,
    addInvitedMember
} = require('../../controllers/organization')

//middleware
const {authenticateStytchSessionToken} = require('../../middleware/auth.middleware')

// Initialization
const router = Router({ mergeParams: true });
router.use(authenticateStytchSessionToken)

// Requests
//create org and user if they don't exist
router.post('/', addOrgAndMember)
//update org and user
router.put('/', updateOrgAndMember)

//get all members of an org
router.get('/members', getOrganizationMembers)
//create member and add to org
router.post('/members', addInvitedMember)




//get all members of an org
// router.get('/members', getOrganizationMembers)
// //invite member to an org
// router.post('/:id/invite', inviteMember)
// //authenticate invite magic link token
// router.post('/authenticate-invite-token', authenticateInviteToken)
// //update member name
// router.put('/members', updateInvitedUser)

module.exports = router
