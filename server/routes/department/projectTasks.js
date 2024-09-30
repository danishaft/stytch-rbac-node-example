const { Router } = require('express')

const {
    getAllDeptProjectTasks,
    createDeptProjectTask
} = require('../../controllers/department/projectTasks')

//middleware
const {
    authenticateStytchSessionToken, 
    authenticateAndAuthorize
} = require('../../middleware/auth.middleware')

// Initialization
const router = Router({ mergeParams: true });
router.use(authenticateStytchSessionToken)

//Requests

//get all dept project task
router.get(
    '/', 
    authenticateAndAuthorize('department-project-task', 'read'),
    getAllDeptProjectTasks)

//create dept project task
router.post(
    '/',
    authenticateAndAuthorize('department-project-task', 'create'),
    createDeptProjectTask
)

module.exports = router