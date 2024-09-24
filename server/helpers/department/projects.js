const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//get all department projects
const getDeptprojects = async (deptId) => {
    try{
        const deptProjects = await prisma.departmentProject.findMany({
            where: {
                departmentId: deptId
            }
        })
        return deptProjects;
    }catch(error){
        console.error(error.message)
        throw new Error('Could not get department projects', error.message)
    }finally{
        await prisma.$disconnect()
    }
}

const addDeptProject = async (project, deptId) => {
    try{
        const {name, description} = project
        const deptProject = await prisma.departmentProject.create({
            data: {
                name,
                description,
                department: {
                    connect: {id: deptId}
                }
            }
        })
        return deptProject
    } catch (error){
        console.error(error.message)
        throw new Error('Could not create department projects', error.message)
    }finally{
        await prisma.$disconnect()
    }
}

module.exports ={
    getDeptprojects,
    addDeptProject
}