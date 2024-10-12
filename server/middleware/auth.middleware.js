// Contains middleware functions for authentication:
// authenticateStytchSession: Verifies the Stytch session token
// isAuthenticated: Checks if a user is authenticated
// isOrganizationMember: Checks if a user belongs to an organization
const passport = require('passport')
const stytchClient = require('../utils/stytch.config')

//middleware for authenticating a user using passport
const authenticateStytchSessionToken = (req, res, next) => {
    passport.authenticate('stytch', { session: false }, (err, user, info) => {
        console.log('in authenticateStytchSessionToken')
        console.log(err)
        if (err) {
            return next(err)
        }
        if (!user) {
            return res
                .status(401)
                .json({ error: info.message || 'Unauthorized' })
        }
        req.user = user
        next()
    })(req, res, next)
}


// const authenticateStytchSessionToken = async (req, res, next) => {
//         console.log('here')
//         const sessionToken = req.cookies.session_token
//         if (!sessionToken) {
//             return res.status(401).json({error: 'No session token provided'})
//         }
//         console.log(sessionToken)
//         try {
//             const response = await stytchClient.sessions.authenticate({  session_token: sessionToken })
//             const { session_token} = response
//             req.stytchSession = {session_token}
//             next()
//         } catch (error) {
//             console.error('Stytch API Error:', error)
//             if (error.response) {
//                 console.error('Response:', error.response.data)
//             }
//             res.status(error.status_code || 500).json({
//                 error: error.error_type || 'Invalid or expired session',
//                 message:
//                     error.message || 'An error occurred during authentication',
//             })
//         }
    
// }




// middleware for ensuring the user requesting a route has permission to
//  do the thing they’re trying to do. This uses Stytch RBAC authorization checks
//  under the hood.
const authenticateAndAuthorize = (resource, action) => {
    return async (req, res, next) => {
        const user = req.user
        if (!user) {
            return res.status(400).json('No user found')
        }
        const sessionToken = req.cookies.stytch_session
        // console.log('available', sessionToken, user)
        try {
            const response = await stytchClient.sessions.authenticate({
                session_token: sessionToken,
                authorization_check: {
                    organization_id: user.member.organization_id,
                    resource_id: resource,
                    action,
                },
            })
            if (response.verdict?.authorized) {
                req.stytchSession = {
                    session_token: response.session_token,
                    member: response.member,
                    organization: response.organization,
                }
                next()
            } else {
                throw new Error('Unauthorized')
            }
        } catch (error) {
            console.log('eror', error.message)
            res.status(error.status_code || 401).json({
                message: error.message || 'Unauthorized',
            })
            res.end()
        }
    }
}

module.exports = {
    authenticateStytchSessionToken,
    authenticateAndAuthorize,
}
