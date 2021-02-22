const jwt = require('express-jwt');

const appConfig = require('config').appConfig;
const db = require('helpers').db;

const secret = appConfig.REST_API_SECRET;
const algorithms = appConfig.REST_API_SECRET_ALGORITHMS;

function authorize(roles = []) {
    if (typeof roles === 'string') roles = [ roles ];

    return [
        jwt({ secret, algorithms }),

        async (req, res, next) => {
            const user = await db.User.findById(req.user.id);

            if (!user || (roles.length && !roles.includes(user.role))) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            req.user.role = user.role;

            const refreshTokens = await db.RefreshToken.find({ user: user.id });
            req.user.ownsToken = token => !!refreshTokens.find(rt => rt.token === token);

            next();
        }
    ]
}

module.exports = authorize;
