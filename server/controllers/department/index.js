const { 
    getAllDepartments,
    removeDepartments, 
    addDepartment,
    updateDeptDetails
} = require('../../helpers/department');

// Get all departments in the organization
const getDepartments = async (req, res) => {
    try{
        const user = req.user
        const userInfo = req.userInfo
        if (!user) {
            return res.status(400).json('No user found')
        }
        //get all departments 
        const departments = await getAllDepartments(user.member,  userInfo.departmentId)
        res.status(200).json({message: 'success ', departments });
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error getting departments',
        )
    }
}
//create a new department
const createDepartment = async (req, res) => {
    try{
        const body = req.body;
        console.log('craeting dept')
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        const department = await addDepartment(body, user.member.organization_id)
        console.log(department)
        res.status(200).json({message: 'department created successfully ', department });
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error creating department',
        )
    }
}

//Update department name
const updateDepartment = async (req, res) => {
    try{
        const deptId = req.params.deptId
        const body = req.body;
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        const department = updateDeptDetails(deptId, body)
        res.status(200).json({message: 'department updated successfully', department });
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error updating department',
        )
    }
}

//delete department 
const deleteDepartment = async (req, res) => {
    try{
        const deptId = req.params.deptId
        await removeDepartments(deptId)
        console.log('deleted')
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error deleting department',
        )
    }
}



module.exports = {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
}