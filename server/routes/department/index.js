const { Router } = require('express')
// controller
const deptController = require('../../controllers/department')

// middleware
const attachUser = require('../../middleware/user.middleware')
const { authenticateAndAuthorize } = require('../../middleware/auth.middleware')

// Initialization
const router = Router()
router.use(attachUser)

// Requests
//get all departments
router.get(
    '/',
    authenticateAndAuthorize('department', 'read'),
    deptController.getDepartments
)
// Create department
router.post(
    '/', 
    authenticateAndAuthorize('department', 'create'),
    deptController.createDepartment
)
// Update department name
router.put(
    '/:id',
    authenticateAndAuthorize('department', 'update'),
    deptController.updateDepartment
)
// delete department
//update department manager

module.exports = router
