const { Router } = require('express')
const {
    getAllDeptProjects,
    createDepartmentProject
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
router.get('/', getAllDeptProjects)

//create department projects
router.post(
    '/',
    authenticateAndAuthorize('department-project', 'create'),
    createDepartmentProject
)


module.exports = router