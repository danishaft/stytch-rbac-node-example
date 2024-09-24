const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//get all department project tasks
const getDeptProjectTasks = async (projectId) => {
    try{
        const deptProjectTasks = await prisma.departmentProjectTask.findMany({
            where: {
                projectId
            }
        })
        return deptProjectTasks;
    }catch(error){
        console.error(error.message)
        throw new Error('Could not get department project tasks', error.message)
    }finally{
        await prisma.$disconnect()
    }
}

const addDeptProjectTask = async (projectTask, deptId, projectId) => {
    try{
        const {title, status, description} = projectTask
        console.log(projectId)
        
        const deptProjectTask = await prisma.departmentProjectTask.create({
            data: {
                title,
                status,
                description,
                project: {
                    connect: {id: projectId}
                },
            }
        })
        return deptProjectTask
    } catch (error){
        console.error(error.message)
        throw new Error('Could not create department projects task', error.message)
    }finally{
        await prisma.$disconnect()
    }
}

module.exports ={
    addDeptProjectTask,
    getDeptProjectTasks
} 