const { Router } = require('express')
// controller
const {
    createProject,
    fetchPublicProjects,
    fetchPrivateProjects,
    updateProject,
    deleteProject
} = require('../../controllers/project')

// middleware
const {authenticateStytchSessionToken} = require('../../middleware/auth.middleware')
const { authenticateAndAuthorize } = require('../../middleware/auth.middleware')

// Initialization
const router = Router({ mergeParams: true });
router.use(authenticateStytchSessionToken)

// Requests
//get all public projects
router.get(
    '/public',
    authenticateAndAuthorize('project', 'read'),
    fetchPublicProjects
)
//get all private projects
router.get(
    '/private',
    authenticateAndAuthorize('project', 'read'),
    fetchPrivateProjects
)
// Create project
router.post(
    '/', 
    authenticateAndAuthorize('project', 'create'),
    createProject
)


// Update project 
router.put(
    '/:projectId',
    authenticateAndAuthorize('project', 'update'),
    updateProject
)
//delete project
router.delete(
    '/:projectId',
    authenticateAndAuthorize('project', 'delete'),
    deleteProject
)

module.exports = router