const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const {  getUserRole} = require('../../helpers/user')

//create organization
const createOrg = async (organization, member) => {
    try{
        const customRole = getUserRole(member)
        console.log(customRole)
        
        // create org
        const newOrganization = await prisma.organization.create({
            data: {
                id: member.organization_id,
                name: organization.organization_name,
                slug: organization.organization_slug,
                logoUrl: organization.organization_logo_url,
            }
        });
        return newOrganization;
    }catch(error){
        console.error(error.message)
        throw new Error('Failed to create organization and member');
    }finally{
        await prisma.$disconnect()
    }
}

//get organization from db
const getOrg = async(organizationId) => {
    try{
        const organization = await prisma.organization.findUnique({
            where: {id: organizationId},
        })
        return organization;
    }catch(error){
        console.error(error.message)
        throw new Error('Could not get user', error.message)
    }finally{
        await prisma.$disconnect()
    }
}

//update organization in db
const updateOrg = async(org, member, departmentId, projectId) => {
    try{
        const updateData = {
            name: org.organization_name,
            logoUrl: org.organization_logo_url,
            slug: org.organization_slug,
        }
    
        if(member) updateData.members = {connect: {id: member.member_id}}
        if(departmentId) updateData.departments = {connect: {id: departmentId}}
        if(projectId) updateData.projects = {connect: {id: projectId}}
    
        const organization = await prisma.organization.update({
            where: {id: member.organization_id},
            data: updateData,
        }); 
        return organization;
    }catch(error){
        console.error(error.message)
        throw new Error('Failed to create organization and member');
    }finally{
        await prisma.$disconnect()
    }
};

//get all org members
const getAllOrgMembers = async(organizationId) => {
    try{
        const members = await prisma.user.findMany({
            where: {organizationId}
        })
        return members;
    }catch(error){
        console.error(error.message)
        throw new Error('Failed to create organization and member');
    }finally{
        await prisma.$disconnect()
    }
}

//Update each member or create new member in the db
const updateOrCreateOrgMembers = async(members, organizationId) => {
    try{
        const updatePromises = members.map((member) => {
            return prisma.user.upsert({
                where: { id: member.id },
                update: {
                    name: member.name,
                    email: member.email,
                    role: member.role,
                    status: member.status,
                    organization: { connect: { id: organizationId } },
                },
                create: {
                    id: member.id,
                    name: member.name,
                    email: member.email,
                    role: member.role,
                    status: member.status,
                    organization: { connect: { id: organizationId } },
                },
            })
        })
        await Promise.all(updatePromises)
    }catch(error){
        console.error(error.message)
        throw new Error('Failed to create organization and member');
    }finally{
        await prisma.$disconnect()
    }
}


module.exports = {
    createOrg,
    getOrg,
    updateOrg,
    getAllOrgMembers,
    updateOrCreateOrgMembers,
}