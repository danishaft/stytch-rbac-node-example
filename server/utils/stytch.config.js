// Initializes the Stytch client with project credentials
const stytch = require('stytch')

const stytchClient = new stytch.B2BClient({
    project_id: process.env.STYTCH_PROJECT_ID,
    secret: process.env.STYTCH_SECRET,
})

module.exports = stytchClient
