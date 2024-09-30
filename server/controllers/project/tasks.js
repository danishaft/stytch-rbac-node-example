// db helpers 
const {
    addProjectTask,
    getProjectTasks
} = require('../../helpers/project/task')

const createProjectTask = async (req, res) => {
    try{
        const {projectId} = req.params;
        const {body} = req.body;
        console.log('creating project tasks', projectId)
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        const task = await addProjectTask(body, projectId)
        res.status(200).json({message: 'project task created successfully ', task });
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error creating project task',
        )
    }
}

const getAllProjectTasks = async (req, res) => {
    try{
        const {projectId} = req.params;
        const tasks = await getProjectTasks(projectId)
        res.status(200).json({ message: 'success', tasks})
    }catch(error){
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or projectId',
            message: error.message || 'An error occurred while getting projects tasks',
        })
    }
}

module.exports = {
    createProjectTask,
    getAllProjectTasks
}