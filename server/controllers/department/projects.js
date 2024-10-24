const {
    getDeptprojects, 
    addDeptProject,
    removeDeptProject
} = require('../../helpers/department/projects')
//get all department project
const getAllDeptProjects = async (req, res) => {
    try {
        const deptId = req.params.deptId
        const deptProjects = await getDeptprojects(deptId)
        res.status(200).json({ message: 'success', deptProjects})
    } catch (error) {
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or deptId',
            message: error.message || 'An error occurred while getting department-projects',
        })
    }
}

const createDepartmentProject = async (req, res) => {
    try{
        const deptId = req.params.deptId
        const body = req.body;
        console.log('creating dept-project', deptId)
        const user = req.user
        if(!user){
            return res.status(400).json('No user found')
        }
        const deptProject = await addDeptProject(body, deptId);
        res.status(200).json({message: 'department project created successfully ', deptProject });
    }catch(error){
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or deptId',
            message: error.message || 'An error occurred while creating department-projects',
        })
    }
}

const deleteDepartmentProject = async (req, res) => {
    try{
        const {deptId, projectId} = req.params
        await removeDeptProject(projectId, deptId)
        console.log('deleted')
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error deleting department project',
        )
    }
}

module.exports = {
    getAllDeptProjects,
    createDepartmentProject,
    deleteDepartmentProject
}