const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Find the custom role that was directly assigned, excluding stytch_admin and stytch_member
const getUserRole = (member) => {
    const customRole = member.roles.find(
        (role) =>
            role.sources.some(
                (source) => source.type === 'direct_assignment'
            ) &&
            !['stytch_admin', 'stytch_member'].includes(role.role_id)
    )
    return customRole;
}

//create a user
const createUser = async (member, organizationId, departmentId, projectId) => {
    try{
        const customRole = getUserRole(member)
        const userData = {
            id: member.member_id,
            name: member.name,
            email: member.email_address,
            status: member.status,
            role: customRole?.role_id,
        };
        if(organizationId) userData.organization = { connect: { id: organizationId } }
        if(departmentId) userData.department = { connect: { id: departmentId } };
        if(projectId) userData.project = { connect: { id: departmentId } };
        const user = await prisma.user.create({
            data: userData
        })
        return user;
    }catch(error){
        console.error(error.message)
    }finally{
        await prisma.$disconnect()
    }
};

//update a user
const updateUser = async (member, userId) => {
    try{
        const customRole = getUserRole(member)
        const user = await prisma.user.update({
            where: {id: userId},
            data: {
                name: member.name,
                status: member.status,
                role: customRole?.role_id,
            }
        })
        return user
    }catch(error){
        console.error(error.message);
    }finally{
        await prisma.$disconnect()
    }
};

//get a user
const getUser = async (userId) => {
    try{
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        return user;
    }catch(error){
        console.error(error.message);
    }finally{
        await prisma.$disconnect()
    }
}

module.exports = {
    getUserRole,
    getUser,
    createUser,
    updateUser
}