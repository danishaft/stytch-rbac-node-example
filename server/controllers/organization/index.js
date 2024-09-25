// Methods(tasks) to be executed on routes
// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
const stytchClient = require('../../utils/stytch.config')

const {
    updateOrg, 
    getOrg, 
    createOrg,
    updateOrCreateOrgMembers,
    getAllOrgMembers
} = require('../../helpers/organization')

const { 
    getUser, 
    createUser, 
    updateUser 
} = require('../../helpers/user')


//create organization and user
const addOrgAndMember = async (req, res) => {
    try {
        const { org, member } = req.body
        //check if org exist
        const existingOrg = await getOrg(org.organization_id)
        console.log(org)
        let newOrg = false
        if (!existingOrg) {
            newOrg = await createOrg(org, member)
            // isNewOrg = true
        }

        //check if member exist
        const existingMember = await getUser(member.member_id)
        let newUser = false
        if(!existingMember){
            newUser = await createUser(member)
            // isNewUser = true
        }
        
        res.status(200).json({ message: 'success', newOrg, newUser })
    } catch (error) {
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message: error.message || 'An error occurred while adding member',
        })
    }
}

//update org and member
const updateOrgAndMember = async (req, res) => {
    try {
        const sessionToken = req.cookies.stytch_session
        const { member } = req.user
        const name = `${req.body.firstName} ${req.body.lastName}`
        const orgName = req.body.workspaceName

        const memberResponse = await stytchClient.organizations.members.update(
            {
                organization_id: member?.organization_id,
                member_id: member?.member_id,
                name,
            },
            {
                authorization: {
                    session_token: sessionToken,
                },
            }
        )

        const updatedMember = await updateUser(memberResponse.member);

        const orgResponse = await stytchClient.organizations.update(
            {
                organization_id: member?.organization_id,
                organization_name: orgName,
            },
            {
                authorization: {
                    session_token: sessionToken,
                },
            }
        )
      
        const updatedOrg = await updateOrg(orgResponse.organization, memberResponse.member)
        res.status(200).json({
            message: 'success',
            newUser: updatedMember,
            newOrg: updatedOrg,
        })
    } catch (error) {
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message: error.message || 'An error occurred while updating member',
        })
    }
}

//get all members of the org(workspace)
const getOrganizationMembers = async (req, res) => {
    try {
        const sessionToken = req.cookies.stytch_session
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        // get org members from stytch
        const response = await stytchClient.organizations.members.search(
            {
                organization_ids: [user.member.organization_id],
            },
            {
                authorization: {
                    session_token: sessionToken,
                },
            }
        )

        // Update or create org members
        await updateOrCreateOrgMembers(response.members, user.member.organization_id);

        // Fetch the updated org members
        const organizationMembers = await getAllOrgMembers(user.member.organization_id);
        console.log(organizationMembers)
        
        res.status(200).json({message: 'success', organizationMembers })
    } catch (error) {
        console.error('Error in getOrganizationMembers controller:', error)
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message:
                error.message || 'An error occurred while getting org members',
        })
    }
}

//add member to org
const addInvitedMember = async (req, res) => {
    try{
        const { member, departmentId } = req.body
        const invitedUser = await createUser(member, departmentId)
        res.status(200).json({ message: 'success', invitedUser })
    }catch (error) {
        console.error('Error in  addMemberToOrg controller:', error)
        res.status(error.status_code || 500).json({
            error: error.error_type || 'Invalid or expired session or orgId',
            message:
                error.message || 'An error occurred while adding member to org',
        })
    }
}




/////////////////////////////////////////////////////
//get organization
// const getOrganization = async (req, res) => {
//     try{
//         const user = req.user
//         if (!user) {
//             return res.status(400).json('No user found')
//         }
//         const response = await stytchClient.organizations.get(
//             {
//                 organization_id: user.organizationId
//             }
//         );
//         const organization = await updateOrg(user.organizationId, response.organization)
//         res.status(200).json({ organization })
//     }catch(error){
//         console.error('Error in getOrganization controller:', error)
//         res.status(error.status_code || 500).json({
//             error: error.error_type || 'Invalid or expired session or orgId',
//             message:
//                 error.message || 'An error occurred while getting org',
//         })
//     }
// }


// //invite a member to the workspace
// const inviteMember = async (req, res) => {
//     const { email, role } = req.body
//     const user = req.user
//     if (!user) {
//         return res.status(400).json('No user found')
//     }

//     try {
//         const response = await stytchClient.magicLinks.email.invite(
//             {
//                 email_address: email,
//                 organization_id: user.organizationId,
//                 roles: [role],
//             },
//             {
//                 authorization: {
//                     session_token: req.cookies.session_token,
//                 },
//             }
//         )

//         // Create invited user in your database
//         const newUser = await prisma.user.create({
//             data: {
//                 id: response.member_id,
//                 email: response.member.email_address,
//                 role,
//                 status: response.member.status,
//                 organizationId: response.member.organization_id,
//             },
//         })

//         res.json({ message: 'Invitation sent successfully', newUser })
//     } catch (error) {
//         console.error(error)
//         res.status(error.status_code || 500).json({
//             error: error.error_type || 'Failed to send invitation',
//         })
//     }
// }

// //authenticate invite magic link token
// const authenticateInviteToken = async (req, res) => {
//     try {
//         const token = req.body.token
//         console.log(`token:${token}`)
//         if (!token) {
//             console.error('Token not present ')
//             return res.status(400).json('Token is required')
//         }
//         const response = await stytchClient.magicLinks.authenticate({
//             magic_links_token: token,
//         })
//         const { session_token } = response
//         res.status(200).json({
//             session_token,
//         })
//         console.log(response)
//     } catch (error) {
//         console.error(error)
//         res.status(error.status_code || 500).json(
//             error.error_type || 'Authentication error'
//         )
//     }
// }

// //update Invited user name
// const updateInvitedUser = async (req, res) => {
//     const user = req.user
//     if (!user) {
//         return res.status(400).json('No user found')
//     }
//     try {
//         const name = req.body.name
//         const response = await stytchClient.organizations.members.update(
//             {
//                 organization_id: user.organizationId,
//                 member_id: user.id,
//                 name,
//             },
//             {
//                 authorization: {
//                     session_token: req.cookies.session_token,
//                 },
//             }
//         )
//         const { member } = response
//         //update the user detail in the db
//         const updatedUser = await prisma.user.update({
//             where: { id: user.id },
//             data: { name: member.name },
//         })
//         res.status(200).json({
//             message: 'User name updated successfully',
//             user: updatedUser,
//         })
//     } catch (error) {
//         console.error(error)
//         res.status(error.status_code || 500).json(
//             error.error_type || 'Error updating user name'
//         )
//     }
// }

// Export of all methods as object
module.exports = {
    addOrgAndMember,
    updateOrgAndMember,
    addInvitedMember,
    // getOrganization,
    getOrganizationMembers,
    // inviteMember,
    // authenticateInviteToken,
    // updateInvitedUser,
}
