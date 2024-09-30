const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//get all public projects in db
const getPublicProjects = async (organizationId) => {
    try{
        const projects = await prisma.project.findMany({
            where: {
                organizationId,
                status: 'public',
            }
        })
        return projects
    }catch(error){
        console.error(error.message)
        throw new Error('Could not get all public projects', error.message)
    }finally{
        await prisma.$disconnect();
    }
}
//get all private projects in db
const getPrivateProjects = async (organizationId, managerId) => {
    try{
        const projects = await prisma.project.findMany({
            where: {
                organizationId,
                managerId,
                status: 'private'
            }
        })
        return projects
    }catch(error){
        console.error(error.message)
        throw new Error('Could not get all private projects', error.message)
    }finally{
        await prisma.$disconnect();
    }
}
//create a new project in db
const addProject = async (data, managerId, orgId) => {
    try{
        const { name, description, members = [] } = data;
        const allMembers = [managerId, ...members];
        const status = allMembers.length > 1 ? "public" : "private";
        const projectData = {
            name,
            description,
            status,
            organization: {
                connect: { id: orgId }
            },
            manager: {
                connect: { id: managerId }
            },
            members: {
                connect: allMembers.map(memberId => ({ id: memberId }))
            }
        };

        const project = await prisma.project.create({
            data: projectData
        })
        return project
    }catch (error){
        console.error(error.message)
        throw new Error('Could not create project', error.message)
    }finally{
        await prisma.$disconnect()
    }
}




//add new member to a project in db
const addMemberToProject = async(projectId, userId) => {
    const updatedProject = await prisma.project.update({
        where: {id: projectId},
        data: {
            status: 'public', // automatically set to public when members are more than one
            members: {
                connect: { id: userId}
            }
        },
        include: {
            members: true
        }
    })
    return updatedProject;
}

module.exports = {
    addProject,
    getPublicProjects,
    getPrivateProjects,
    // updateProjectDetails,
    // removeProject,
    addMemberToProject
}