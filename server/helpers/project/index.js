const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//create a new project in db
const createProject = async (name, description, organizationId, managerId) => {
    const newProject = await prisma.project.create({
        data: {
            name,
            description,
            organization: {connect: {id: organizationId}},
            manager: {connect: {id: managerId}},
            members: {connect: {id: managerId}} // Add the manager as the first member
        },
        include: {
            manager: true,
            members: true,
            tasks: true
        }
    })
    return newProject;
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
    createProject,
    addMemberToProject
}