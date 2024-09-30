const { Router } = require('express')
// controller
const {
    createDepartment, 
    getDepartments, 
    updateDepartment,
} = require('../../controllers/department')

// middleware
const {authenticateStytchSessionToken} = require('../../middleware/auth.middleware')
const { authenticateAndAuthorize } = require('../../middleware/auth.middleware')

// Initialization
const router = Router({ mergeParams: true });
router.use(authenticateStytchSessionToken)

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

)

module.exports = router
