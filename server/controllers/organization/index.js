// Methods(tasks) to be executed on routes
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const stytchClient = require('../../utils/stytch.config')

const {updateOrg, getAllOrgMembers, updateOrCreateOrgMembers} = require('../../helpers/organization')
const { getUserRole } = require('../../helpers/user')

//get organization
const getOrganization = async (req, res) => {
    try{
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        const response = await stytchClient.organizations.get(
            {
                organization_id: user.organizationId
            }
        );
        const organization = await updateOrg(user.organizationId, response.organization)
        res.status(200).json({ organization })
    }catch(error){
        console.error('Error in getOrganization controller:', error)
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message:
                error.message || 'An error occurred while getting org',
        })
    }
}

//get all members of the org(workspace)
const getOrganizationMembers = async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        // get org members from stytch
        const response = await stytchClient.organizations.members.search(
            {
                organization_ids: [user.organizationId],
            },
            {
                authorization: {
                    session_token: req.cookies.session_token,
                },
            }
        )
        const members = response.members.map((member) => {
            //get user role from stytch member object
            const customRole = getUserRole(member)
            return {
                id: member.member_id,
                name: member.name,
                email: member.email_address,
                status: member.status,
                role: customRole?.role_id,
            }
        })

        // Update or create org members
        await updateOrCreateOrgMembers(members, user.organizationId);

        // Fetch the updated org members
        const organizationMembers = await getAllOrgMembers(user.organizationId);
        console.log(organizationMembers)
        
        res.status(200).json({ organizationMembers })
    } catch (error) {
        console.error('Error in getMembers controller:', error)
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message:
                error.message || 'An error occurred while getting org members',
        })
    }
}

//invite a member to the workspace
const inviteMember = async (req, res) => {
    const { email, role } = req.body
    const user = req.user
    if (!user) {
        return res.status(400).json('No user found')
    }

    try {
        const response = await stytchClient.magicLinks.email.invite(
            {
                email_address: email,
                organization_id: user.organizationId,
                roles: [role],
            },
            {
                authorization: {
                    session_token: req.cookies.session_token,
                },
            }
        )

        // Create invited user in your database
        const newUser = await prisma.user.create({
            data: {
                id: response.member_id,
                email: response.member.email_address,
                role,
                status: response.member.status,
                organizationId: response.member.organization_id,
            },
        })

        res.json({ message: 'Invitation sent successfully', newUser })
    } catch (error) {
        console.error(error)
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Failed to send invitation',
        })
    }
}

//authenticate invite magic link token
const authenticateInviteToken = async (req, res) => {
    try {
        const token = req.body.token
        console.log(`token:${token}`)
        if (!token) {
            console.error('Token not present ')
            return res.status(400).json('Token is required')
        }
        const response = await stytchClient.magicLinks.authenticate({
            magic_links_token: token,
        })
        const { session_token } = response
        res.status(200).json({
            session_token,
        })
        console.log(response)
    } catch (error) {
        console.error(error)
        res.status(error.status_code || 500).json(
            error.error_type || 'Authentication error'
        )
    }
}

//update Invited user name
const updateInvitedUser = async (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(400).json('No user found')
    }
    try {
        const name = req.body.name
        const response = await stytchClient.organizations.members.update(
            {
                organization_id: user.organizationId,
                member_id: user.id,
                name,
            },
            {
                authorization: {
                    session_token: req.cookies.session_token,
                },
            }
        )
        const { member } = response
        //update the user detail in the db
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { name: member.name },
        })
        res.status(200).json({
            message: 'User name updated successfully',
            user: updatedUser,
        })
    } catch (error) {
        console.error(error)
        res.status(error.status_code || 500).json(
            error.error_type || 'Error updating user name'
        )
    }
}

// Export of all methods as object
module.exports = {
    getOrganization,
    getOrganizationMembers,
    inviteMember,
    authenticateInviteToken,
    updateInvitedUser,
}
