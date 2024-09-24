const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Find the custom role that was directly assigned, excluding stytch_admin and stytch_member
// const getUserRole = (member) => {
//     const customRole = member.roles.find(
//         (role) =>
//             role.sources.some(
//                 (source) => source.type === 'direct_assignment'
//             ) &&
//             !['stytch_admin', 'stytch_member'].includes(role.role_id)
//     )
//     return customRole;
// }
const getUserRole = (member) => {
    // First, try to find the stytch_admin role with direct_assignment
    const adminRole = member.roles.find(
        (role) => role.role_id === 'stytch_admin' && 
                  role.sources.some(source => source.type === 'direct_assignment')
    );
    
    if (adminRole) {
        return adminRole.role_id;
    }
    // If stytch_admin is not found, fall back to the first role with direct_assignment
    const anyDirectAssignmentRole = member.roles.find(
        (role) => role.sources.some(source => source.type === 'direct_assignment')
    );
    
    return anyDirectAssignmentRole ? anyDirectAssignmentRole.role_id : undefined;
};

//create a user
const createUser = async (member, departmentId, projectId) => {
    try{
        const customRole = getUserRole(member)
        console.log(customRole)
        const userData = {
            id: member.member_id,
            name: member.name,
            email: member.email_address,
            status: member.status,
            role: customRole,
            organization: { connect: {id: member.organization_id}}
        };
        
        if(departmentId) userData.department = { connect: { id: departmentId } };
        if(projectId) userData.project = { connect: { id: departmentId } };
        const user = await prisma.user.create({
            data: userData
        })
        return user;
    }catch(error){
        console.error(error.message)
        throw new Error('Failed to create organization and member');
    }finally{
        await prisma.$disconnect()
    }
};

//update a user
const updateUser = async (member) => {
    try{
        const customRole = getUserRole(member)
        const user = await prisma.user.update({
            where: {id: member.member_id},
            data: {
                name: member.name,
                status: member.status,
                role: customRole?.role_id,
            }
        })
        return user
    }catch(error){
        console.error(error.message);
        throw new Error('Failed to create organization and member');
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
        throw new Error('Failed to create organization and member');
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