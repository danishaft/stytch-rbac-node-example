// auth Methods(tasks) to be executed on routes
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const stytchClient = require('../../utils/stytch.config')
const {getAuthenticatedUserInfo} = require('../../helpers/auth')
const { createOrgWithMember } = require('../../helpers/organization')


//send magic link to provided email
const sendMagicLink = async (req, res) => {
    try {
        const email = req.body.email
        console.log(email)
        if (!email) {
            return res.status(400).json('Email is required')
        }
        const response = await stytchClient.magicLinks.email.discovery.send({
            email_address: email,
        })
        res.status(200).json({ message: `Check your email. Magic link has been sent to ${email}` })
        console.log(response)
    } catch (error) {
        console.error('Stytch API Error:', error);
        console.error('Error details:', error.response?.data);
        res.status(error.status_code || 500).json(
            error.error_type || 'Error requesting magic link',
        )
    }
}

//authenticate magic link token
const authenticateMagicLink = async (req, res) => {
    try {
        const token = req.body.token
        console.log(`token:${token}`)
        if (!token) {
            console.error('Token not present ')
            return res.status(400).json('Token is required')
        }
        const response = await stytchClient.magicLinks.discovery.authenticate({
            discovery_magic_links_token: token,
        })
		const {intermediate_session_token, discovered_organizations, email_address} = response 
        const organizations = discovered_organizations.map(
            (discovered) => ({
                organization_id: discovered.organization.organization_id,
                organization_name: discovered.organization.organization_name,
            })
        )
		console.log(`ist:${intermediate_session_token}`)
        res.status(200).json({
            organizations,
            email: email_address,
            ist: intermediate_session_token,
        })
        console.log(response)
    } catch (error) {
        console.error(error)
        res.status(error.status_code || 500).json(
            error.error_type || 'Authentication error',
        )
    }
}

//sign-in to an existing organization by switching ist for session
const signIn = async (req, res) => {
    const orgId = req.params.orgId
    const ist = req.cookies.intermediate_session_token
    console.log(orgId, ist)
    if (!ist) {
        console.error('no ist')
        return res.status(400).json('No IST found')
    }
    try {
        const response =
            await stytchClient.discovery.intermediateSessions.exchange({
                intermediate_session_token: ist,
                organization_id: orgId,
            })
        console.log(response)
        req.cookies.intermediate_session_token = null
		const {session_token, status_code, member} = response
        //check if user exist in db
        const existingOrg = await prisma.organization.findUnique({
            where: {id: member.organization_id},
            include: {
                members: {
                    where: {id: member.member_id}
                }
            }
        })
        const existingUser = existingOrg.members[0]
        if (existingUser) {
            res.status(200).json({
                status: status_code,
                message: 'Signed in successfully',
                session_token,
                organization: existingOrg,
            })
        }else {
            res.status(400).json({
                message: 'Unauthorized action, get an invitation from your admin to sign-in'
            })
        }
    } catch (error) {
        console.error(error)
        res.status(error.status_code || 500).json(
            error.error_type || 'Error logging into org',
        )
    }
}

//create a new organization by switching ist for session
const createOrg = async (req, res) => { 
    const ist = req.cookies.intermediate_session_token
    const name = `${req.body.first_name} ${req.body.last_name}`
    const organization_name = req.body.organization_name

    console.log(ist)
    if (!ist) { 
        console.error('no ist')
        return res.status(400).json('No IST found')
    }
    try {
        const response = await stytchClient.discovery.organizations.create({
            intermediate_session_token: ist,
            organization_name,
        })
        req.cookies.intermediate_session_token = null
        const {session_token, status_code} = response
        //update first member role to "admin"
        const updatedMember = await stytchClient.organizations.members.update(
            {
                organization_id: response.member.organization_id,
                member_id: response.member.member_id,
                roles: ["admin"],
                name: name
            },
            {
                authorization: {
                    session_token
                }
            }
        )
        console.log('updatedMember', updatedMember)
        console.log('updatedMember ROLE', updatedMember.member.roles)
        const {member, organization} = updatedMember
        // Create org and user in the database
        const newOrg = await createOrgWithMember(organization, member)
        console.log(newOrg)
        {/**/}
        console.log(session_token)
        res.status(200).json({
			status: status_code,
            message: 'Organization created successfully',
            session_token,
            organization: newOrg
        })
    } catch (error) {
        console.error(error)
        res.status(error.status_code || 500).json(
			error.error_type || 'Error creating org',
        )
    }
}


const isAuthenticated = async(req, res) => {
	try {
        console.log('isAuthenticated controller reached');
        const { session_token} = req.stytchSession
        console.log('Session data:', {session_token});
        res.status(200).json({authenticated: true, session_token});
        console.log('Response sent');
    } catch (error) {
        console.error('Error in isAuthenticated controller:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

const logout = async (req, res) => {
    const { member } = await getAuthenticatedUserInfo({req});
  
     await stytchClient.sessions.revoke({ member_id: member.member_id });
  
     req.cookies.session_token = null
  
    res.redirect(new URL("/sign-in", process.env.APP_URL).toString());
  }


// Export of all methods as object
module.exports = {
    sendMagicLink,
    authenticateMagicLink,
    signIn,
    createOrg,
	isAuthenticated,
    logout
}
