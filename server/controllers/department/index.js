const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all departments in the organization
const getDepartments = async (req, res) => {
    try{
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        //get all departments 
        const departments = await prisma.department.findMany({
            where: {
                organizationId: user.organizationId,
            }
        })
        res.status(200).json({message: 'departments retrieved successfully ', departments });
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
        const { name, managerId } = req.body;
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        const department = await prisma.department.create({
            data: {
                name,
                organizationId: req.user.organizationId,
                managerId,
            }
        })
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
        const { id } = req.params
        const { name } = req.body;
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        const department = await prisma.department.update({
            where: {id},
            data: {name}
        })
        res.status(200).json({message: 'department updated successfully', department });
    }catch(error){
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error updating department',
        )
    }
}

module.exports = {
    getDepartments,
    createDepartment,
    updateDepartment
}