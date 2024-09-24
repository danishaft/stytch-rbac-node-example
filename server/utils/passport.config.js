// Configures Passport.js to use a custom Stytch strategy for authentication
const passport = require('passport')
const stytchClient = require('../utils/stytch.config')

class StytchStrategy extends passport.Strategy {
    constructor() {
        super()
        this.name = 'stytch'
    }

    async authenticate(req) {
        const sessionToken = req.cookies.stytch_session
        if (!sessionToken) {
            return this.fail({ message: 'No session token provided' }, 401)
        }
        try {
            const response = await stytchClient.sessions.authenticate({
                session_token: sessionToken,
            })
            if (response.session_token) {
                const { member, organization } = response
                const user = { member, organization }
                this.success(user)
            } else {
                this.fail({ message: 'Invalid session' }, 401)
            }
        } catch (error) {
            this.error(error)
        }
    }
}

module.exports = StytchStrategy

