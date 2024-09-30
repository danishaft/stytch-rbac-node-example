const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all departments in the db
const getAllDepartments = async (organizationId) => {
    try{
        const departments = await prisma.department.findMany({
            where: {
                organizationId,
            }
        })
        return departments
    }catch (error){
        console.error(error.message)
        throw new Error('Could not get department', error.message)
    }finally{
        await prisma.$disconnect()
    }
}

const addDepartment = async (dept, orgId) => {
    try{
        const { name, managerId, slug, description } = dept
        const departmentData = {
            name,
            slug,
            description,
            organization: {
                connect: { id: orgId }
            }
        };
        
        if (managerId) {
            departmentData.manager = {
                connect: { id: managerId }
            };
        }

        const department = await prisma.department.create({
            data: departmentData
        })
        return department
    }catch (error){
        console.error(error.message)
        throw new Error('Could not create department', error.message)
    }finally{
        await prisma.$disconnect()
    }
}

const updateDeptDetails = async (deptId, dept) => {
    try{
        const department = await prisma.department.update({
            where: {id: deptId},
            data: dept
        })
        return department;
    }catch (error){
        console.error(error.message)
        throw new Error('Could not update department', error.message)
    }finally{
        await prisma.$disconnect()
    }
}

const removeDepartments = async (deptId) => {
    try{
        await prisma.department.delete({
            where: {id: deptId},
            
        })
    }catch (error){
        console.error(error.message)
        throw new Error('Could not remove department', error.message)
    }finally{
        await prisma.$disconnect()
    }
}

module.exports ={
    getAllDepartments,
    addDepartment,
    updateDeptDetails,
    removeDepartments
}