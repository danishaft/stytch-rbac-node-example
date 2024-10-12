const { Router } = require('express')
// controller
const {
    createDepartment, 
    getDepartments, 
    updateDepartment,
    deleteDepartment
} = require('../../controllers/department')

// middleware
const { authenticateAndAuthorize, authenticateStytchSessionToken } = require('../../middleware/auth.middleware')
const {attachUserInfo} = require('../../middleware/user.middleware')

// Initialization
const router = Router({ mergeParams: true });
router.use(authenticateStytchSessionToken)
router.use(attachUserInfo)

// Requests
//get all departments
router.get(
    '/',
    authenticateAndAuthorize('department', 'read'),
    getDepartments
)
// Create department
router.post(
    '/', 
    authenticateAndAuthorize('department', 'create'),
    createDepartment
)
// Update department name
router.put(
    '/:id',
    authenticateAndAuthorize('department', 'update'),
    updateDepartment
)
//delete department
router.delete(
    '/:deptId',
    authenticateAndAuthorize('department', 'delete'),
    deleteDepartment
)

module.exports = router
