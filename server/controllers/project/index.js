const { 
    addProject,
    getPublicProjects,
    getPrivateProjects,
    updateProjectDetails,
    removeProject
} = require('../../helpers/project');

// Get all public projects in the organization
const fetchPublicProjects = async (req, res) => {
    try{
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        const projects = await getPublicProjects(user.member.organization_id)
        res.status(200).json({message: 'success ', projects });
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error getting projects',
        )
    }
}
//Get all private projects
const fetchPrivateProjects = async (req, res) => {
    try{
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        const projects = await getPrivateProjects(user.member.organization_id, user.member.member_id)
        res.status(200).json({message: 'success ', projects });
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error getting projects',
        )
    }
}
//create a new project
const createProject = async (req, res) => {
    try{
        const user = req.user
        const body = req.body;
        console.log('creating projects')
        if (!user) {
            return res.status(400).json('No user found')
        }
        const project = await addProject(body, user.member.member_id, user.member.organization_id)
        console.log(project)
        res.status(200).json({message: 'project created successfully ', project});
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error creating project',
        )
    }
}








//Update project
const updateProject = async (req, res) => {
    try{
        const projectId = req.params.projectId
        const body = req.body;
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        const project = updateProjectDetails(projectId, body)
        res.status(200).json({message: 'project updated successfully', project });
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error updating project',
        )
    }
}

//delete projects
const deleteProject = async (req, res) => {
    try{
        const projectId = req.params.projectId
        await removeProject(projectId)
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error deleting project',
        )
    }
}



module.exports = {
    fetchPublicProjects,
    fetchPrivateProjects,
    createProject,
    updateProject,
    deleteProject
}