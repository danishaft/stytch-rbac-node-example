const { Router } = require('express')

const {
    getAllDeptProjectTasks,
    createDeptProjectTask,
    deleteDeptProjectTask
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
//delete department project task
router.delete(
    '/:taskId',
    authenticateAndAuthorize('department-project-task', 'delete'),
    deleteDeptProjectTask
)

module.exports = router