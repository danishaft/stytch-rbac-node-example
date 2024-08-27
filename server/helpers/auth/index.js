const stytchClient = require('../../utils/stytch.config')

//Helper method to get authenticated member and organization info from the Stytch session.
const getAuthenticatedUserInfo = async ({req}) => {
    const sessionToken = req.cookies.session_token
    console.log('available', sessionToken)
   
    let response;
    try {
        response = await stytchClient.sessions.authenticate({  session_token: sessionToken })
    } catch (err) {
      console.error("Could not find member by session token", err);
    }
  
    return {
      member: response?.member,
      organization: response?.organization,
    };
  }

  module.exports = {
    getAuthenticatedUserInfo
  }