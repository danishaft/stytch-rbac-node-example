const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {getAuthenticatedUserInfo} = require('../helpers/auth/index')

// Middleware to attach user to request
const attachUser = async (req, res, next) => {
    try{
        const {member} = await getAuthenticatedUserInfo({req})
        req.user = await prisma.user.findUnique({
            where: {
                id: member.member_id,
            }
        }); 
        next();
    }catch(error){
        res.status(error.status_code || 500).json({
            message: error.message || 'error getting user from db',
        })
    }
};

module.exports = attachUser