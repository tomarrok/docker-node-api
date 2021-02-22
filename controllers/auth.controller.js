const Joi = require('joi');

const validateRequest = require('middlewares').validateRequest;
const authService = require('services').authService;
const Role = require('helpers').Role;

function signSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

    validateRequest(req, next, schema);
}

function signup(req, res, next) {
    const { email, password } = req.body;

    authService.signup({ email, password })
    .then(() => {
        res.json({ message: 'Registration succeeded' });
    })
    .catch(next);
}

function signin(req, res, next) {
    const { email, password } = req.body;
    const ipAddress = req.ip;

    authService.signin({ email, password, ipAddress })
    .then(({ refreshToken, ...user }) => {
        setTokenCookie(res, refreshToken);
        res.json(user);
    })
    .catch(next);
}

function refreshToken(req, res, next) {
    const token = req.cookies.refreshToken;
    const ipAddress = req.ip;

    authService.refreshToken({ token, ipAddress })
    .then(({ refreshToken, ...user }) => {
        setTokenCookie(res, refreshToken);
        res.json(user);
    })
    .catch(next);
}

function revokeTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().empty('')
    });

    validateRequest(req, next, schema);
}


function revokeToken(req, res, next) {
    const token = req.body.token || req.cookies.refreshToken;
    const ipAddress = req.ip;

    if (!token) return res.status(400).json({ message: 'Token is required' });

    if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    authService.revokeToken({ token, ipAddress })
    .then(() => res.json({ message: 'Token revoked' }))
    .catch(next);
}

function getRefreshTokens(req, res, next) {
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    authService.getRefreshTokens(req.params.id)
    .then(tokens => tokens ? res.json(tokens) : res.sendStatus(404))
    .catch(next);
}

function setTokenCookie(res, token) {
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    };

    res.cookie('refreshToken', token, cookieOptions);
}

module.exports = {
    signSchema,
    signup,
    signin,
    refreshToken,
    revokeTokenSchema,
    revokeToken,
    getRefreshTokens
}
