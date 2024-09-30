const { Router } = require('express')

const {
    createProjectTask,
    getAllProjectTasks
} = require('../../controllers/project/tasks')


// middleware
const {authenticateStytchSessionToken} = require('../../middleware/auth.middleware')
const { authenticateAndAuthorize } = require('../../middleware/auth.middleware')

// Initialization
const router = Router({ mergeParams: true });
router.use(authenticateStytchSessionToken)

//create project task
router.post(
    '/',
    authenticateAndAuthorize('project-task', 'create'),
    createProjectTask
)

router.get(
    '/',
    authenticateAndAuthorize('project-task', 'read'),
    getAllProjectTasks
)


module.exports = router