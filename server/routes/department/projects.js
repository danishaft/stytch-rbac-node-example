const { Router } = require('express')
const {
    getAllDeptProjects,
    createDepartmentProject,
    deleteDepartmentProject
} = require('../../controllers/department/projects')


//middleware
const {
    authenticateStytchSessionToken, 
    authenticateAndAuthorize
} = require('../../middleware/auth.middleware')

// Initialization
// const router = Router()
const router = Router({ mergeParams: true });
router.use(authenticateStytchSessionToken)

// Requests
//get all department projects
router.get(
    '/', 
    authenticateAndAuthorize('department-project', 'read'),
    getAllDeptProjects
)

//create department projects
router.post(
    '/',
    authenticateAndAuthorize('department-project', 'create'),
    createDepartmentProject
)
//delete department project
router.delete(
    '/:projectId',
    authenticateAndAuthorize('department-project', 'delete'),
    deleteDepartmentProject
)


module.exports = router