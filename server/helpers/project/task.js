const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//create project task
const addProjectTask = async (projectTask, projectId) => {
    try{
        const {title, status, description} = projectTask
        const task = await prisma.projectTask.create({
            data: {
                title,
                status,
                description,
                project: {
                    connect: {id: projectId}
                }
            }
        })
        return task
    }catch(error){
        console.error(error.message)
        throw new Error('Could not create projects task', error.message)
    }finally{
        await prisma.$disconnect()
    }
}
//get project tasks
const getProjectTasks = async (projectId) => {
    try{
        const tasks = await prisma.projectTask.findMany({
            where: {
                projectId
            }
        })
        return tasks
    }catch (error){
        console.error(error.message)
        throw new Error('Could not get project tasks', error.message)
    }
}

module.exports = {
    addProjectTask,
    getProjectTasks
}