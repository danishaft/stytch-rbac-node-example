const {
    getDeptProjectTasks,
    addDeptProjectTask,
    removeDeptProjectTask
} = require('../../helpers/department/projectTasks')

//get all department project task
const getAllDeptProjectTasks = async (req, res) => {
    try {
        const {projectId} = req.params
        const deptProjectTasks = await getDeptProjectTasks(projectId)
        res.status(200).json({ message: 'success', deptProjectTasks})
    } catch (error) {
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or projectId',
            message: error.message || 'An error occurred while getting department-projects',
        })
    }
}

//create a new department project task
const createDeptProjectTask = async (req, res) => {
    try{
        const {deptId, projectId} = req.params
        const {body} = req.body;
        console.log('craeting dept project task', deptId, projectId)
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        const deptProjectTask = await addDeptProjectTask(body, deptId, projectId)
        console.log(deptProjectTask)
        res.status(200).json({message: 'department created successfully ', deptProjectTask });
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error creating department project task',
        )
    }
}

const deleteDeptProjectTask = async (req, res) => {
    try{
        const {projectId, taskId} = req.params
        await removeDeptProjectTask(projectId, taskId)
        console.log('deleted')
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error deleting department project',
        )
    }
}


module.exports = {
    createDeptProjectTask,
    getAllDeptProjectTasks,
    deleteDeptProjectTask
}